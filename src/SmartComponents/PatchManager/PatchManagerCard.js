import './PatchManagerCard.scss';

import { Flex } from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { capitalize, globalFilters, workloadsPropType } from '../../Utilities/Common';
import { patchmanFetchAdvisories, patchmanFetchSystems } from '../../AppActions';

import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { chart_color_blue_200, chart_color_blue_300, chart_color_blue_400, global_disabled_color_100 } from '@patternfly/react-tokens';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';
import { Spinner } from '@patternfly/react-core';

/**
 * Card for showing the systems and ratios of current advisories.
 */
const PatchManagerCard = ({
    systems, systemsStatus, fetchSystems,
    advisories, advisoriesStatus, fetchAdvisories,
    selectedTags, workloads, SID
}) => {
    const intl = useIntl();
    const isLoaded = [systemsStatus, advisoriesStatus].every(item => item === 'fulfilled');
    const { security, bugfix: bugs, enhancement: enhancements } = advisories || {};
    const pieChartData = [
        {
            x: intl.formatMessage(messages.securityAdvisories, { count: security }), y: security, fill: chart_color_blue_400.value,
            url: `/advisories?offset=0&filter%5Badvisory_type_name%5D=security`
        },
        {
            x: intl.formatMessage(messages.bugfixAdvisories, { count: bugs }), y: bugs, fill: chart_color_blue_300.value,
            url: `/advisories?offset=0&filter%5Badvisory_type_name%5D=bugfix`
        },
        {
            x: intl.formatMessage(messages.enhancementAdvisories, { count: enhancements }), y: enhancements, fill: chart_color_blue_200.value,
            url: `/advisories?offset=0&filter%5Badvisory_type_name%5D=enhancement`
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
        fetchAdvisories(options);
    }, [fetchSystems, fetchAdvisories, workloads, SID, selectedTags]);

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
            {!isLoaded ? <Spinner /> :
                <Flex direction={{ default: 'column' }}>
                    <InsightsLink app='patch' to='/systems' className='pf-v5-c-button pf-m-link pf-m-inline'>
                        <span>{intl.formatMessage(messages.systemsAffected, { count: systems })}</span>
                    </InsightsLink>
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
                                    <InsightsLink app='patch' key={item.url} to={item.url} className='insd-c-legend__item'>
                                        <span className='insd-c-legend__dot'
                                            style={{ '--insd-c-legend__dot--BackgroundColor': `${colorScale[index]}` }} />
                                        <span className='insd-c-legend__text'>{item.y} {capitalize(item.x)}</span>
                                    </InsightsLink>
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
    advisories: PropTypes.any,
    advisoriesStatus: PropTypes.string,
    fetchAdvisories: PropTypes.func,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

export default connect(
    ({ DashboardStore }) => ({
        systems: DashboardStore.patchmanSystems,
        systemsStatus: DashboardStore.patchmanSystemsStatus,
        advisories: DashboardStore.patchmanAdvisories,
        advisoriesStatus: DashboardStore.patchmanAdvisoriesStatus,
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    }),
    dispatch => ({
        fetchSystems: (options) => dispatch(patchmanFetchSystems(options)),
        fetchAdvisories: (options) => dispatch(patchmanFetchAdvisories(options))
    })
)(PatchManagerCard);
