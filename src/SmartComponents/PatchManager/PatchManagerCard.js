import './PatchManagerCard.scss';

import { PATCHMAN_ID, UI_BASE } from '../../AppConstants';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { chart_color_blue_200, chart_color_blue_300, chart_color_blue_400 } from '@patternfly/react-tokens';
import { patchmanFetchBugs, patchmanFetchEnhancements, patchmanFetchSecurity, patchmanFetchSystems } from '../../AppActions';
import { sapFilter, workloadsPropType } from '../../Utilities/Common';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        { x: intl.formatMessage(messages.securityAdvisories, { count: security }), y: security, fill: chart_color_blue_400.value },
        { x: intl.formatMessage(messages.bugfixAdvisories, { count: bugs }), y: bugs, fill: chart_color_blue_300.value },
        { x: intl.formatMessage(messages.enhancementAdvisories, { count: enhancements }), y: enhancements, fill: chart_color_blue_200.value }
    ];
    const pieChartLegendData = pieChartData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'circle' } }));
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const colorScale = [
        chart_color_blue_400.value,
        chart_color_blue_300.value,
        chart_color_blue_200.value
    ];

    useEffect(() => {
        const options = { ...sapFilter(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        fetchSystems(options);
        fetchSecurity(options);
        fetchBugs(options);
        fetchEnhancements(options);
    }, [fetchSystems, fetchSecurity, fetchBugs, fetchEnhancements, workloads, SID, selectedTags]);

    if (systemsStatus === 'rejected') {
        return (
            <TemplateCard appName='PatchManager' className={ 'ins-c-dashboard__card--Patch' }>
                <TemplateCardHeader subtitle={ intl.formatMessage(messages.patchTitle) } />
                <TemplateCardBody><FailState appName='Patch' isSmall /></TemplateCardBody>
            </TemplateCard>
        );
    }

    return <TemplateCard appName='PatchManager' className={ 'ins-c-dashboard__card--Patch' }>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.patchTitle) } />
        <TemplateCardBody>
            {!isLoaded ? <Loading /> :
                <React.Fragment>
                    <Button
                        component="a"
                        href={ `${UI_BASE}/${PATCHMAN_ID}/systems` }
                        variant="link"
                        isInline
                    >
                        <span>{intl.formatMessage(messages.systemsAffected, { count: systems })}</span>
                    </Button>
                    <div className="ins-c-patch__chart">
                        <PieChart
                            ariaDesc="Patch systems chart"
                            ariaTitle="Patch systems chart"
                            constrainToVisibleArea={ true }
                            data={ pieChartData }
                            labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                            padding={ pieChartPadding }
                            height={ 65 }
                            width={ 65 }
                            colorScale={ colorScale }
                            legend="true"
                            legendData={ pieChartLegendData }
                            legendOrientation="vertical"
                            legendHeight={ 75 }
                            legendWidth={ 200 }
                        />
                    </div>
                </React.Fragment>
            }
        </TemplateCardBody>
    </TemplateCard>;
};

PatchManagerCard.propTypes = {
    systems: PropTypes.number,
    systemsStatus: PropTypes.string,
    fetchSystems: PropTypes.func,
    fetchSecurity: PropTypes.func,
    security: PropTypes.number,
    securityStatus: PropTypes.string,
    fetchBugs: PropTypes.func,
    bugs: PropTypes.number,
    bugsStatus: PropTypes.string,
    fetchEnhancements: PropTypes.func,
    enhancements: PropTypes.number,
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
