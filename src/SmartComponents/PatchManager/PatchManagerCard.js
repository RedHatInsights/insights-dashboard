/* eslint-disable camelcase */
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { patchmanFetchBugs, patchmanFetchEnhancements, patchmanFetchSecurity, patchmanFetchSystems } from '../../AppActions';
import { PATCHMAN_ID, UI_BASE } from '../../AppConstants';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import messages from '../../Messages';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import './PatchManagerCard.scss';
import {
    chart_color_blue_200,
    chart_color_blue_300,
    chart_color_blue_400
} from '@patternfly/react-tokens';
import FailState from '../../PresentationalComponents/FailState/FailState';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const PatchManagerCard = ({ systems, systemsStatus, fetchSystems, fetchSecurity, securityStatus,
    security, bugs, fetchBugs, bugsStatus, enhancements, fetchEnhancements, enhancementsStatus }) => {

    React.useEffect(() => {
        fetchSystems();
        fetchSecurity();
        fetchBugs();
        fetchEnhancements();
    }, [fetchSystems, fetchSecurity, fetchBugs, fetchEnhancements]);

    const intl = useIntl();
    const isLoaded = [systemsStatus, securityStatus, bugsStatus, enhancementsStatus].every(item => item === 'fulfilled');

    const pieChartData = [
        { x: intl.formatMessage(messages.securityAdvisories, { count: security }), y: security, fill: chart_color_blue_400.value },
        { x: intl.formatMessage(messages.bugfixAdvisories, { count: bugs }), y: bugs, fill: chart_color_blue_200.value },
        { x: intl.formatMessage(messages.enhancementAdvisories, { count: enhancements }), y: enhancements, fill: chart_color_blue_300.value }
    ];
    const pieChartLegendData = pieChartData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'circle' } }));
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    const colorScale = [
        chart_color_blue_400.value,
        chart_color_blue_300.value,
        chart_color_blue_200.value
    ];

    if (systemsStatus === 'rejected') {
        return (
            <TemplateCard appName='PatchManager' className={ 'ins-c-dashboard__card--Patch' }>
                <TemplateCardHeader subtitle={ intl.formatMessage(messages.patchTitle) }/>
                <TemplateCardBody><FailState appName='Patch' isSmall/></TemplateCardBody>
            </TemplateCard>
        );
    }

    return <TemplateCard appName='PatchManager' className={ 'ins-c-dashboard__card--Patch' }>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.patchTitle) }/>
        <TemplateCardBody>
            {!isLoaded ? <Loading/> :
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
    enhancementsStatus: PropTypes.string
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
        enhancementsStatus: DashboardStore.patchmanEnhancementsStatus
    }),
    dispatch => ({
        fetchSystems: (url) => dispatch(patchmanFetchSystems(url)),
        fetchSecurity: (url) => dispatch(patchmanFetchSecurity(url)),
        fetchBugs: (url) => dispatch(patchmanFetchBugs(url)),
        fetchEnhancements: (url) => dispatch(patchmanFetchEnhancements(url))
    })
)(PatchManagerCard);
