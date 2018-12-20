import * as ActionTypes from './AppConstants';
import API from './Utilities/Api';

const fetchData = async (url, headers, options) => (await API.get(url, headers, options)).data;

export const fetchComplianceSummary = (options) => ({
    type: ActionTypes.COMPLIANCE_FETCH,
    payload: fetchData(ActionTypes.COMPLIANCE_FETCH_URL, {}, options)
});

export const fetchOcpSummary = (options) => ({
    type: ActionTypes.OCP_SUMMARY_FETCH,
    payload: fetchData(ActionTypes.OCP_SUMMARY_FETCH_URL, {}, options)
});
