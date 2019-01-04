export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const CONFIG_ASSESSMENT_FETCH = 'CONFIG_ASSESSMENT_SUMMARY_FETCH';
export const OCP_SUMMARY_FETCH = 'OCP_SUMMARY_FETCH';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_SUMMARY_FETCH';

const BASE_URL = '/r/insights/platform';

export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles`;
export const CONFIG_ASSESSMENT_FETCH_URL = `${BASE_URL}/advisor/v1/stats/`;
export const OCP_SUMMARY_FETCH_URL = `${BASE_URL}/cost-management/api/v1/reports/charges/ocp/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=charge`;
export const VULNERABILITIES_FETCH_URL = `${BASE_URL}/vulnerability/v1/vulnerabilities/cves?cvss_from=8`;
