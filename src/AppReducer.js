import Immutable from 'seamless-immutable';
import * as ActionTypes from './AppConstants';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    awsSummary: {},
    awsSummaryFetchStatus: '',
    complianceSummary: {},
    complianceFetchStatus: '',
    configAssessment: {},
    configAssessmentFetchStatus: '',
    ocpSummary: {},
    ocpSummaryFetchStatus: '',
    criticalVulnerabilities: {},
    criticalVulnerabilitiesFetchStatus: '',
    latestVulnerabilities: {},
    latestVulnerabilitiesFetchStatus: ''
});

export const DashboardStore = (state = initialState, action) => {
    switch (action.type) {
        case `${ActionTypes.AWS_SUMMARY_FETCH}_PENDING`:
            return state.set('awsSummaryFetchStatus', 'pending');
        case `${ActionTypes.AWS_SUMMARY_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                awsSummary: action.payload,
                awsSummaryFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.AWS_SUMMARY_FETCH}_REJECTED`:
            return state.set('awsSummaryFetchStatus', 'rejected');

        case `${ActionTypes.COMPLIANCE_FETCH}_PENDING`:
            return state.set('complianceFetchStatus', 'pending');
        case `${ActionTypes.COMPLIANCE_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                complianceSummary: action.payload,
                complianceFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.COMPLIANCE_FETCH}_REJECTED`:
            return state.set('complianceFetchStatus', 'rejected');

        case `${ActionTypes.CONFIG_ASSESSMENT_FETCH}_PENDING`:
            return state.set('configAssessmentFetchStatus', 'pending');
        case `${ActionTypes.CONFIG_ASSESSMENT_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                configAssessment: action.payload,
                configAssessmentFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONFIG_ASSESSMENT_FETCH}_REJECTED`:
            return state.set('configAssessmentFetchStatus', 'rejected');

        case `${ActionTypes.OCP_SUMMARY_FETCH}_PENDING`:
            return state.set('ocpSummaryFetchStatus', 'pending');
        case `${ActionTypes.OCP_SUMMARY_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                ocpSummary: action.payload,
                ocpSummaryFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.OCP_SUMMARY_FETCH}_REJECTED`:
            return state.set('ocpSummaryFetchStatus', 'rejected');

        case `${ActionTypes.CRITICAL_VULNERABILITIES_FETCH}_PENDING`:
            return state.set('criticalVulnerabilitiesFetchStatus', 'pending');
        case `${ActionTypes.CRITICAL_VULNERABILITIES_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                criticalVulnerabilities: action.payload,
                criticalVulnerabilitiesFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CRITICAL_VULNERABILITIES_FETCH}_REJECTED`:
            return state.set('criticalVulnerabilitiesFetchStatus', 'rejected');

        case `${ActionTypes.LATEST_VULNERABILITIES_FETCH}_PENDING`:
            return state.set('latestVulnerabilitiesFetchStatus', 'pending');
        case `${ActionTypes.LATEST_VULNERABILITIES_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                latestVulnerabilities: action.payload,
                latestVulnerabilitiesFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.LATEST_VULNERABILITIES_FETCH}_REJECTED`:
            return state.set('latestVulnerabilitiesFetchStatus', 'rejected');

        default:
            return state;
    }
};
