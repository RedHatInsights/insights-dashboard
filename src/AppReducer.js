import Immutable from 'seamless-immutable';
import * as ActionTypes from './AppConstants';
import { applyReducerHash } from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    rule: {},
    ruleFetchStatus: '',
    rules: {},
    rulesFetchStatus: ''
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
