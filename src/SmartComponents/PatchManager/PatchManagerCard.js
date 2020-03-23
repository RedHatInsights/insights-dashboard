import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { patchmanFetchBugs, patchmanFetchEnhancements, patchmanFetchSecurity, patchmanFetchSystems } from '../../AppActions';
import { PATCHMAN_ID, UI_BASE } from '../../AppConstants';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';

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

    const isLoaded = [systemsStatus, securityStatus, bugsStatus, enhancementsStatus].every(item => item === 'fulfilled');

    const pieChartData = [
        { x: 'security advisories', y: security, fill: '#004b95' },
        { x: 'bug fixes', y: bugs, fill: '#06c' },
        { x: 'enhancements', y: enhancements, fill: '#519de9' }
    ];
    const pieChartLegendData = pieChartData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'circle' } }));
    const colorScale = ['#004b95', '#06c', '#519de9'];
    const pieChartPadding = { bottom: 0, left: 0, right: 220, top: 0 };
    return <TemplateCard appName='PatchManager'>
        <TemplateCardHeader subtitle='Patch manager'/>
        <TemplateCardBody>
            {!isLoaded ? <Loading/> :
                <React.Fragment>
                    <Button
                        component="a"
                        href={ `${UI_BASE}/${PATCHMAN_ID}/systems` }
                        variant="link"
                        isInline
                        style={ { textAlign: 'left', zIndex: 3 } }
                    >
                        <span>{systems} systems affected</span>
                    </Button>
                    <PieChart
                        className="ins-c-pie-chart"
                        containerWidth={ 275 }
                        containerHeight={ 90 }
                        ariaDesc="Operating systems used"
                        ariaTitle="Pie chart operating systems"
                        constrainToVisibleArea={ true }
                        data={ pieChartData }
                        height={ 150 }
                        labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                        legendData={ pieChartLegendData }
                        legendOrientation="vertical"
                        legendPosition="right"
                        padding={ pieChartPadding }
                        width={ 290 }
                        colorScale={ colorScale }
                    />
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
