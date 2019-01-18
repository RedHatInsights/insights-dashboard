import * as ActionTypes from './AppConstants';
import API from './Utilities/Api';

const fetchData = async (url, headers, options) => {
    await window.insights.chrome.auth.getUser();
    return (await API.get(url, headers, options)).data;
};

export const fetchAwsSummary = (options) => ({
    type: ActionTypes.AWS_SUMMARY_FETCH,
    payload: fetchData(ActionTypes.AWS_SUMMARY_FETCH_URL, {}, options)
});

export const fetchComplianceSummary = (options) => ({
    type: ActionTypes.COMPLIANCE_FETCH,
    payload: fetchData(ActionTypes.COMPLIANCE_FETCH_URL, {}, options)
});

export const fetchConfigAssessment = (options) => ({
    type: ActionTypes.CONFIG_ASSESSMENT_FETCH,
    payload: fetchData(ActionTypes.CONFIG_ASSESSMENT_FETCH_URL, {}, options)
});

export const fetchOcpSummary = (options) => ({
    type: ActionTypes.OCP_SUMMARY_FETCH,
    payload: fetchData(ActionTypes.OCP_SUMMARY_FETCH_URL, {}, options)
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
