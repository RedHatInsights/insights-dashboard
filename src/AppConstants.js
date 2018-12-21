export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const OCP_SUMMARY_FETCH = 'OCP_SUMMARY_FETCH';

const BASE_URL = '/r/insights/platform';

export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles`;
export const OCP_SUMMARY_FETCH_URL = `${BASE_URL}/cost-management/api/v1/reports/charges/ocp/?filter[time_scope_units]=mon
									  th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=charge`;
