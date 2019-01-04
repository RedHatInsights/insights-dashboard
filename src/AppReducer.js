import Immutable from 'seamless-immutable';
import * as ActionTypes from './AppConstants';
import { applyReducerHash } from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    complianceSummary: {},
    complianceFetchStatus: '',
    configAssessment: {},
    configAssessmentFetchStatus: '',
    ocpSummary: {},
    ocpSummaryFetchStatus: ''

});

export const DashboardStore = (state = initialState, action) => {
    switch (action.type) {
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
                configAssessmentSummary: action.payload,
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

        case `${ActionTypes.VULNERABILITIES_FETCH}_PENDING`:
            return state.set('vulnerabilitiesFetchStatus', 'pending');
        case `${ActionTypes.VULNERABILITIES_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                vulnerabilitiesSummary: action.payload,
                vulnerabilitiesFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.VULNERABILITIES_FETCH}_REJECTED`:
            return state.set('vulnerabilitiesFetchStatus', 'rejected');

        default:
            return state;
    }
};

export function entitiesDetailsReducer (ActionTypes) {
    return applyReducerHash(
        {
            [`${ActionTypes.LOAD_ENTITY}_FULFILLED`]: enableApplications
        },
        {}
    );
}

function enableApplications (state) {
    return {
        ...state,
        loaded: true,
        activeApps: [
            { title: 'Configuration Assessment', name: 'configuration_assessment' }

        ]
    };
}
