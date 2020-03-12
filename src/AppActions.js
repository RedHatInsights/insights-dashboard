import * as ActionTypes from './AppConstants';

import API from './Utilities/Api';

const fetchData = async (url, headers, options) => {
    await window.insights.chrome.auth.getUser();
    return (await API.get(url, headers, options)).data;
};

export const fetchComplianceSummary = (options) => ({
    type: ActionTypes.COMPLIANCE_FETCH,
    payload: fetchData(ActionTypes.COMPLIANCE_FETCH_URL, {}, options)
});

export const fetchCriticalVulnerabilities = (options) => ({
    type: ActionTypes.CRITICAL_VULNERABILITIES_FETCH,
    payload: fetchData(ActionTypes.CRITICAL_VULNERABILITIES_FETCH_URL, {}, options)
});

export const fetchLatestVulnerabilities = (options) => ({
    type: ActionTypes.LATEST_VULNERABILITIES_FETCH,
    payload: fetchData(ActionTypes.LATEST_VULNERABILITIES_FETCH_URL, {}, options)
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
