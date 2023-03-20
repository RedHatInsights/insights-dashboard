import * as ActionTypes from './AppConstants';
import API from './Utilities/Api';

const fetchData = async (url, headers, options) => {
    return (await API.get(url, headers, options)).data;
};

export const fetchComplianceSummary = (options) => ({
    type: ActionTypes.COMPLIANCE_FETCH,
    payload: fetchData(ActionTypes.COMPLIANCE_FETCH_URL, {}, options)
});

export const fetchVulnerabilities = (options) => ({
    type: ActionTypes.VULNERABILITIES_FETCH,
    payload: fetchData(ActionTypes.VULNERABILITIES_FETCH_URL, {}, options)
});

export const advisorFetchStatsRecs = (options) => ({
    type: ActionTypes.ADVISOR_STATS_REC_FETCH,
    payload: fetchData(ActionTypes.ADVISOR_STATS_REC_FETCH_URL, {}, options)
});

export const advisorFetchStatsSystems = (options) => ({
    type: ActionTypes.ADVISOR_STATS_SYSTEMS_FETCH,
    payload: fetchData(ActionTypes.ADVISOR_STATS_SYSTEMS_FETCH_URL, {}, options)
});

export const advisorFetchIncidents = (options) => ({
    type: ActionTypes.ADVISOR_INCIDENTS_FETCH,
    payload: fetchData(ActionTypes.ADVISOR_INCIDENTS_FETCH_URL, {}, options)
});

export const patchmanFetchSystems = (options) => ({
    type: ActionTypes.PATCHMAN_SYSTEMS_FETCH,
    payload: fetchData(ActionTypes.PATCHMAN_SYSTEMS_FETCH_URL, {}, options)
});

export const patchmanFetchAdvisories = (options) => ({
    type: ActionTypes.PATCHMAN_ADVISORIES_FETCH,
    payload: fetchData(ActionTypes.PATCHMAN_ADVISORIES_FETCH_URL, {}, options)
});

export const subscriptionsUtilizedProductOneFetch = (id, options) => ({
    type: ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH,
    payload: Promise.all([
        fetchData(`${ActionTypes.SUBSCRIPTIONS_UTILIZED_REPORT_FETCH_URL}${id}`, {}, options),
        fetchData(`${ActionTypes.SUBSCRIPTIONS_UTILIZED_CAPACITY_FETCH_URL}${id}`, {}, options)
    ])
});

export const subscriptionsUtilizedProductTwoFetch = (id, options) => ({
    type: ActionTypes.SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH,
    payload: Promise.all([
        fetchData(`${ActionTypes.SUBSCRIPTIONS_UTILIZED_REPORT_FETCH_URL}${id}`, {}, options),
        fetchData(`${ActionTypes.SUBSCRIPTIONS_UTILIZED_CAPACITY_FETCH_URL}${id}`, {}, options)
    ])
});

export const fetchInventorySummary = (options) => ({
    type: ActionTypes.INVENTORY_FETCH,
    payload: fetchData(ActionTypes.INVENTORY_FETCH_URL, {}, options)
});

export const fetchInventoryTotalSummary = (options) => ({
    type: ActionTypes.INVENTORY_TOTAL_FETCH,
    payload: fetchData(ActionTypes.INVENTORY_TOTAL_FETCH_URL, {}, options)
});

export const fetchInventoryStaleSummary = (options) => ({
    type: ActionTypes.INVENTORY_STALE_FETCH,
    payload: fetchData(ActionTypes.INVENTORY_STALE_FETCH_URL, {}, options)
});

export const fetchInventoryWarningSummary = (options) => ({
    type: ActionTypes.INVENTORY_WARNING_FETCH,
    payload: fetchData(ActionTypes.INVENTORY_WARNING_FETCH_URL, {}, options)
});

export const fetchRemediations = (options) => ({
    type: ActionTypes.REMEDIATIONS_FETCH,
    payload: fetchData(ActionTypes.REMEDIATIONS_FETCH_URL, {}, options)
});

export const fetchRosIsConfigured = (options) => ({
    type: ActionTypes.ROS_IS_CONFIGURED_FETCH,
    payload: fetchData(ActionTypes.ROS_IS_CONFIGURED_FETCH_URL, {}, options)
});

export const fetchDrift = (options) => ({
    type: ActionTypes.DRIFT_EVENTS_PAYLOAD_FETCH,
    payload: fetchData(ActionTypes.DRIFT_EVENTS_PAYLOAD_FETCH_URL, {}, options)
});

export const setSelectedTags = (tags) => ({
    type: ActionTypes.SELECTED_TAGS_SET,
    payload: tags
});

export const setWorkloads = (data) => ({
    type: ActionTypes.WORKLOADS_SET,
    payload: data
});

export const setSIDs = (data) => ({
    type: ActionTypes.SID_SET,
    payload: data
});
