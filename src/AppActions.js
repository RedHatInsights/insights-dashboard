import * as ActionTypes from './AppConstants';
import API from './Utilities/Api';

const fetchData = async (url, headers, options) => (await API.get(url, headers, options)).data;

export const fetchComplianceSummary = (options) => ({
    type: ActionTypes.COMPLIANCE_FETCH,
    payload: fetchData(ActionTypes.COMPLIANCE_FETCH_URL, {}, options)
});
