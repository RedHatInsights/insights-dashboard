// import * as AppActions from '../../AppActions';
import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';

// import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
// import { UI_BASE } from '../../AppConstants';
// import { connect } from 'react-redux';
// import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventory = () => {
    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle='System inventory and status'>
        </TemplateCardHeader>
        <TemplateCardBody>
            <NumberDescription
                data="2013"
                dataSize="xl"
                linkDescription="Connected systems"
            />
            <NumberDescription
                data="451"
                dataSize="md"
                linkDescription="Not checked-in last 7 days"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

SystemInventory.propTypes = {
    fetchCriticalVulnerabilities: PropTypes.func,
    criticalVulnerabilities: PropTypes.object,
    criticalVulnerabilitiesFetchStatus: PropTypes.string,
    fetchLatestVulnerabilities: PropTypes.func,
    latestVulnerabilities: PropTypes.object,
    latestVulnerabilitiesFetchStatus: PropTypes.string,
    fetchVulnerabilities: PropTypes.func,
    vulnerabilities: PropTypes.object,
    vulnerabilitiesFetchStatus: PropTypes.string
};

// const mapStateToProps = (state, ownProps) => ({
//     criticalVulnerabilities: state.DashboardStore.criticalVulnerabilities,
//     criticalVulnerabilitiesFetchStatus: state.DashboardStore.criticalVulnerabilitiesFetchStatus,
//     latestVulnerabilities: state.DashboardStore.latestVulnerabilities,
//     latestVulnerabilitiesFetchStatus: state.DashboardStore.latestVulnerabilitiesFetchStatus,
//     vulnerabilities: state.DashboardStore.vulnerabilities,
//     vulnerabilitiesFetchStatus: state.DashboardStore.vulnerabilitiesFetchStatus,
//     ...ownProps
// });

// const mapDispatchToProps = dispatch => ({
//     fetchCriticalVulnerabilities: (url) => dispatch(AppActions.fetchCriticalVulnerabilities(url)),
//     fetchLatestVulnerabilities: (url) => dispatch(AppActions.fetchLatestVulnerabilities(url)),
//     fetchVulnerabilities: (url) => dispatch(AppActions.fetchVulnerabilities(url))
// });

export default SystemInventory;
