import './PatchManagerCard.scss';

import { Flex } from '@patternfly/react-core/dist/esm/layouts';
import { PATCHMAN_ID, UI_BASE } from '../../AppConstants';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { capitalize, globalFilters, workloadsPropType } from '../../Utilities/Common';
import { patchmanFetchBugs, patchmanFetchEnhancements, patchmanFetchSecurity, patchmanFetchSystems } from '../../AppActions';

import { Button } from '@patternfly/react-core/dist/esm/components';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import chart_color_blue_200 from '@patternfly/react-tokens/dist/esm/chart_color_blue_200';
import chart_color_blue_300 from '@patternfly/react-tokens/dist/esm/chart_color_blue_300';
import chart_color_blue_400 from '@patternfly/react-tokens/dist/esm/chart_color_blue_400';
import { connect } from 'react-redux';
import global_disabled_color_100 from '@patternfly/react-tokens/dist/esm/global_disabled_color_100';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const PatchManagerCard = ({ systems, systemsStatus, fetchSystems, fetchSecurity, securityStatus,
    security, bugs, fetchBugs, bugsStatus, enhancements, fetchEnhancements, enhancementsStatus,
    selectedTags, workloads, SID }) => {
    const intl = useIntl();
    const isLoaded = [systemsStatus, securityStatus, bugsStatus, enhancementsStatus].every(item => item === 'fulfilled');
    const pieChartData = [
        {
            x: intl.formatMessage(messages.securityAdvisories, { count: security }), y: security, fill: chart_color_blue_400.value,
            url: `${UI_BASE}/${PATCHMAN_ID}/advisories?offset=0&filter%5Badvisory_type_name%5D=security`
        },
        {
            x: intl.formatMessage(messages.bugfixAdvisories, { count: bugs }), y: bugs, fill: chart_color_blue_300.value,
            url: `${UI_BASE}/${PATCHMAN_ID}/advisories?offset=0&filter%5Badvisory_type_name%5D=bugfix`
        },
        {
            x: intl.formatMessage(messages.enhancementAdvisories, { count: enhancements }), y: enhancements, fill: chart_color_blue_200.value,
            url: `${UI_BASE}/${PATCHMAN_ID}/advisories?offset=0&filter%5Badvisory_type_name%5D=enhancement`
        }
    ];

    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const colorScale = [
        chart_color_blue_200.value,
        chart_color_blue_300.value,
        chart_color_blue_400.value
    ];

    useEffect(() => {
        const options = { ...globalFilters(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        fetchSystems(options);
        fetchSecurity(options);
        fetchBugs(options);
        fetchEnhancements(options);
    }, [fetchSystems, fetchSecurity, fetchBugs, fetchEnhancements, workloads, SID, selectedTags]);

    if (systemsStatus === 'rejected') {
        return (
            <TemplateCard appName='PatchManager' className={'insd-c-dashboard__card--Patch'}>
                <TemplateCardHeader subtitle={intl.formatMessage(messages.patchTitle)} />
                <TemplateCardBody><FailState appName='Patch' isSmall /></TemplateCardBody>
            </TemplateCard>
        );
    }

    return <ExpandableCardTemplate appName='PatchManager'
        isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_patch') || 'true')}
        isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_patch', isExpanded)}
        title={intl.formatMessage(messages.patchTitle)}
        className={'insd-c-dashboard__card--Patch insd-m-toggle-right-on-md'}
        body={<TemplateCardBody>
            {!isLoaded ? <Loading /> :
                <Flex direction={{ default: 'column' }}>
                    <Button
                        component='a'
                        href={`${UI_BASE}/${PATCHMAN_ID}/systems`}
                        variant='link'
                        isInline>
                        <span>{intl.formatMessage(messages.systemsAffected, { count: systems })}</span>
                    </Button>
                    <div className="insd-c-dashboard__card-chart-container">
                        <div className="insd-c-dashboard__card-pie-chart">
                            <PieChart
                                colorScale={isLoaded && (security === 0 && bugs === 0 && enhancements === 0) ? [global_disabled_color_100.value]
                                    : colorScale}
                                ariaDesc='Patch systems chart'
                                ariaTitle='Patch systems chart'
                                constrainToVisibleArea={true}
                                data={pieChartData}
                                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                padding={pieChartPadding}
                            />
                        </div>
                        <div className='insd-c-dashboard__card-pie-chart-legend'>
                            <div className="insd-c-legend">
                                {pieChartData.map((item, index) =>
                                    <a key={item.url} href={item.url} className='insd-c-legend__item'>
                                        <span className='insd-c-legend__dot'
                                            style={{ '--insd-c-legend__dot--BackgroundColor': `${colorScale[index]}` }} />
                                        <span className='insd-c-legend__text'>{item.y} {capitalize(item.x)}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </Flex>
            }
        </TemplateCardBody>}
    />;
};

PatchManagerCard.propTypes = {
    systems: PropTypes.any,
    systemsStatus: PropTypes.string,
    fetchSystems: PropTypes.func,
    fetchSecurity: PropTypes.func,
    security: PropTypes.any,
    securityStatus: PropTypes.string,
    fetchBugs: PropTypes.func,
    bugs: PropTypes.any,
    bugsStatus: PropTypes.string,
    fetchEnhancements: PropTypes.func,
    enhancements: PropTypes.any,
    enhancementsStatus: PropTypes.string,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

export default connect(
    ({ DashboardStore }) => ({
        systems: DashboardStore.patchmanSystems,
        systemsStatus: DashboardStore.patchmanSystemsStatus,
        security: DashboardStore.patchmanSecurity,
        securityStatus: DashboardStore.patchmanSecurityStatus,
        bugs: DashboardStore.patchmanBugs,
        bugsStatus: DashboardStore.patchmanBugsStatus,
        enhancements: DashboardStore.patchmanEnhancements,
        enhancementsStatus: DashboardStore.patchmanEnhancementsStatus,
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    }),
    dispatch => ({
        fetchSystems: (options) => dispatch(patchmanFetchSystems(options)),
        fetchSecurity: (options) => dispatch(patchmanFetchSecurity(options)),
        fetchBugs: (options) => dispatch(patchmanFetchBugs(options)),
        fetchEnhancements: (options) => dispatch(patchmanFetchEnhancements(options))
    })
)(PatchManagerCard);
