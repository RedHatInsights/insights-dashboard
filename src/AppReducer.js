import * as ActionTypes from './AppConstants';

import Immutable from 'seamless-immutable';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    complianceSummary: {},
    complianceFetchStatus: '',
    vulnerabilities: {},
    vulnerabilitiesFetchStatus: '',
    advisorStatsRecs: {},
    advisorStatsRecsStatus: '',
    advisorStatsSystems: {},
    advisorStatsSystemsStatus: '',
    advisorIncidents: {},
    advisorIncidentsStatus: '',
    patchmanSystems: {},
    patchmanSystemsStatus: '',
    patchmanSecurity: {},
    patchmanSecurityStatus: '',
    patchmanBugs: {},
    patchmanBugsStatus: '',
    patchmanEnhancements: {},
    patchmanEnhancementsStatus: '',
    subscriptionsUtilizedProductOne: [],
    subscriptionsUtilizedProductOneFetchStatus: '',
    subscriptionsUtilizedProductTwo: [],
    subscriptionsUtilizedProductTwoFetchStatus: '',
    inventorySummary: {},
    inventoryFetchStatus: '',
    inventoryStaleSummary: {},
    inventoryStaleFetchStatus: '',
    inventoryWarningSummary: {},
    inventoryWarningFetchStatus: '',
    inventoryTotalSummary: {},
    inventoryTotalFetchStatus: '',
    remediations: {},
    remediationsFetchStatus: '',
    rosIsConfigured: {},
    rosIsConfiguredFetchStatus: '',
    selectedTags: [],
    workloads: {},
    SID: {}
});

export const DashboardStore = (state = initialState, action) => {
    switch (action.type) {
        // GLOBAL
        case ActionTypes.SELECTED_TAGS_SET:
            return Immutable.merge(state, {
                selectedTags: action.payload
            });

        case ActionTypes.WORKLOADS_SET:
            return Immutable.merge(state, {
                workloads: action.payload
            });

        case ActionTypes.SID_SET:
            return Immutable.merge(state, {
                SID: action.payload
            });

        // COMPLIANCE
        case `${ActionTypes.COMPLIANCE_FETCH}_PENDING`:
            return state.set('complianceFetchStatus', 'pending');
        case `${ActionTypes.COMPLIANCE_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                complianceSummary: action.payload,
                complianceFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.COMPLIANCE_FETCH}_REJECTED`:
            return state.set('complianceFetchStatus', 'rejected');

        // VULN
        case `${ActionTypes.VULNERABILITIES_FETCH}_PENDING`:
            return state.set('vulnerabilitiesFetchStatus', 'pending');
        case `${ActionTypes.VULNERABILITIES_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                vulnerabilities: action.payload,
                vulnerabilitiesFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.VULNERABILITIES_FETCH}_REJECTED`:
            return state.set('vulnerabilitiesFetchStatus', 'rejected');

        // Advisor
        case `${ActionTypes.ADVISOR_STATS_REC_FETCH}_PENDING`:
            return state.set('advisorStatsRecsStatus', 'pending');
        case `${ActionTypes.ADVISOR_STATS_REC_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                advisorStatsRecs: action.payload,
                advisorStatsRecsStatus: 'fulfilled'
            });
        case `${ActionTypes.ADVISOR_STATS_REC_FETCH}_REJECTED`:
            return state.set('advisorStatsRecsStatus', 'rejected');

        case `${ActionTypes.ADVISOR_STATS_SYSTEMS_FETCH}_PENDING`:
            return state.set('advisorStatsSystemsStatus', 'pending');
        case `${ActionTypes.ADVISOR_STATS_SYSTEMS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                advisorStatsSystems: action.payload,
                advisorStatsSystemsStatus: 'fulfilled'
            });
        case `${ActionTypes.ADVISOR_STATS_SYSTEMS_FETCH}_REJECTED`:
            return state.set('advisorStatsSystemsStatus', 'rejected');

        case `${ActionTypes.ADVISOR_INCIDENTS_FETCH}_PENDING`:
            return state.set('advisorIncidentsStatus', 'pending');
        case `${ActionTypes.ADVISOR_INCIDENTS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                advisorIncidents: action.payload,
                advisorIncidentsStatus: 'fulfilled'
            });
        case `${ActionTypes.ADVISOR_INCIDENTS_FETCH}_REJECTED`:
            return state.set('advisorIncidentsStatus', 'rejected');

        // Patch
        case `${ActionTypes.PATCHMAN_SYSTEMS_FETCH}_PENDING`:
            return state.set('patchmanSystemsStatus', 'pending');

        case `${ActionTypes.PATCHMAN_SYSTEMS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                patchmanSystems: action.payload.meta.total_items,
                patchmanSystemsStatus: 'fulfilled'
            });
        case `${ActionTypes.PATCHMAN_SYSTEMS_FETCH}_REJECTED`:
            return state.set('patchmanSystemsStatus', 'rejected');

        case `${ActionTypes.PATCHMAN_SECURITY_FETCH}_PENDING`:
            return state.set('patchmanSecurityStatus', 'pending');

        case `${ActionTypes.PATCHMAN_SECURITY_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                patchmanSecurity: action.payload.meta.total_items,
                patchmanSecurityStatus: 'fulfilled'
            });

        case `${ActionTypes.PATCHMAN_SECURITY_FETCH}_REJECTED`:
            return state.set('patchmanBugsStatus', 'rejected');

        case `${ActionTypes.PATCHMAN_BUGS_FETCH}_PENDING`:
            return state.set('patchmanBugsStatus', 'pending');

        case `${ActionTypes.PATCHMAN_BUGS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                patchmanBugs: action.payload.meta.total_items,
                patchmanBugsStatus: 'fulfilled'
            });

        case `${ActionTypes.PATCHMAN_BUGS_FETCH}_REJECTED`:
            return state.set('patchmanBugsStatus', 'rejected');

        case `${ActionTypes.PATCHMAN_ENHANCEMENTS_FETCH}_PENDING`:
            return state.set('patchmanEnhancementsStatus', 'pending');

        case `${ActionTypes.PATCHMAN_ENHANCEMENTS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                patchmanEnhancements: action.payload.meta.total_items,
                patchmanEnhancementsStatus: 'fulfilled'
            });

        case `${ActionTypes.PATCHMAN_ENHANCEMENTS_FETCH}_REJECTED`:
            return state.set('patchmanEnhancementsStatus', 'rejected');

        // SubsUtilized Product One
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH}_PENDING`:
            return state.set('subscriptionsUtilizedProductOneFetchStatus', 'pending');
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                subscriptionsUtilizedProductOne: action.payload,
                subscriptionsUtilizedProductOneFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH}_REJECTED`:
            return Immutable.merge(state, {
                subscriptionsUtilizedProductOne: action.payload.response,
                subscriptionsUtilizedProductOneFetchStatus: 'rejected'
            });

        // SubsUtilized Product Two
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH}_PENDING`:
            return state.set('subscriptionsUtilizedProductTwoFetchStatus', 'pending');
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                subscriptionsUtilizedProductTwo: action.payload,
                subscriptionsUtilizedProductTwoFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH}_REJECTED`:
            return Immutable.merge(state, {
                subscriptionsUtilizedProductTwo: action.payload.response,
                subscriptionsUtilizedProductTwoFetchStatus: 'rejected'
            });

        // Inventory
        case `${ActionTypes.INVENTORY_FETCH}_PENDING`:
            return state.set('inventoryFetchStatus', 'pending');
        case `${ActionTypes.INVENTORY_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                inventorySummary: action.payload,
                inventoryFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.INVENTORY_FETCH}_REJECTED`:
            return state.set('inventoryFetchStatus', 'rejected');

        case `${ActionTypes.INVENTORY_STALE_FETCH}_PENDING`:
            return state.set('inventoryStaleFetchStatus', 'pending');
        case `${ActionTypes.INVENTORY_STALE_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                inventoryStaleSummary: action.payload,
                inventoryStaleFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.INVENTORY_STALE_FETCH}_REJECTED`:
            return state.set('inventoryStaleFetchStatus', 'rejected');

        case `${ActionTypes.INVENTORY_WARNING_FETCH}_PENDING`:
            return state.set('inventoryWarningFetchStatus', 'pending');
        case `${ActionTypes.INVENTORY_WARNING_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                inventoryWarningSummary: action.payload,
                inventoryWarningFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.INVENTORY_WARNING_FETCH}_REJECTED`:
            return state.set('inventoryWarningFetchStatus', 'rejected');

        case `${ActionTypes.INVENTORY_TOTAL_FETCH}_PENDING`:
            return state.set('inventoryTotalFetchStatus', 'pending');
        case `${ActionTypes.INVENTORY_TOTAL_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                inventoryTotalSummary: action.payload,
                inventoryTotalFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.INVENTORY_TOTAL_FETCH}_REJECTED`:
            return state.set('inventoryTotalFetchStatus', 'rejected');

        // REMEDIATIONS
        case `${ActionTypes.REMEDIATIONS_FETCH}_PENDING`:
            return state.set('remediationsFetchStatus', 'pending');
        case `${ActionTypes.REMEDIATIONS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                remediations: action.payload,
                remediationsFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.REMEDIATIONS_FETCH}_REJECTED`:
            return state.set('remediationsFetchStatus', 'rejected');

        // Resource Optimization
        case `${ActionTypes.ROS_IS_CONFIGURED_FETCH}_PENDING`:
            return state.set('rosIsConfiguredFetchStatus', 'pending');
        case `${ActionTypes.ROS_IS_CONFIGURED_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                rosIsConfigured: action.payload,
                rosIsConfiguredFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.ROS_IS_CONFIGURED_FETCH}_REJECTED`:
            return state.set('rosIsConfiguredFetchStatus', 'rejected');

        default:
            return state;

    }
};
