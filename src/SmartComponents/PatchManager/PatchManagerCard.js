import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { patchmanFetchBugs, patchmanFetchEnhancements, patchmanFetchSecurity, patchmanFetchSystems } from '../../AppActions';
import { PATCHMAN_ID, UI_BASE } from '../../AppConstants';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import messages from '../../Messages';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import './PatchManagerCard.scss';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const PatchManagerCard = ({ systems, systemsStatus, fetchSystems, fetchSecurity, securityStatus,
    security, bugs, fetchBugs, bugsStatus, enhancements, fetchEnhancements, enhancementsStatus, intl }) => {

    React.useEffect(() => {
        fetchSystems();
        fetchSecurity();
        fetchBugs();
        fetchEnhancements();
    }, [fetchSystems, fetchSecurity, fetchBugs, fetchEnhancements]);

    const isLoaded = [systemsStatus, securityStatus, bugsStatus, enhancementsStatus].every(item => item === 'fulfilled');

    const pieChartData = [
        { x: intl.formatMessage(messages.securityAdvisories, { count: security }), y: security, fill: '#004b95' },
        { x: intl.formatMessage(messages.bugfixAdvisories, { count: bugs }), y: bugs, fill: '#06c' },
        { x: intl.formatMessage(messages.enhancementAdvisories, { count: enhancements }), y: enhancements, fill: '#519de9' }
    ];
    const pieChartLegendData = pieChartData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'circle' } }));
    const colorScale = ['#004b95', '#06c', '#519de9'];
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    return <TemplateCard appName='PatchManager' className={ 'ins-c-dashboard__card--Patch' }>
        <TemplateCardHeader subtitle='Patch manager'/>
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
                <PieChart
                    ariaDesc="Operating systems used"
                    ariaTitle="Pie chart operating systems"
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
    intl: PropTypes.any
};

export default injectIntl(connect(
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
)(PatchManagerCard));
