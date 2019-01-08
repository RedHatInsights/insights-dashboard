import moment from 'moment';

export const AWS_SUMMARY_FETCH = 'AWS_SUMMARY_FETCH';
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const CONFIG_ASSESSMENT_FETCH = 'CONFIG_ASSESSMENT_SUMMARY_FETCH';
export const OCP_SUMMARY_FETCH = 'OCP_SUMMARY_FETCH';
export const CRITICAL_VULNERABILITIES_FETCH = 'VULNERABILITIES_SUMMARY_FETCH';

const BASE_URL = '/r/insights/platform';

export const AWS_SUMMARY_FETCH_URL = `${BASE_URL}/cost-management/api/v1/reports/charges/aws/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=charge`;
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles?per_page=2`;
export const CONFIG_ASSESSMENT_FETCH_URL = `${BASE_URL}/advisor/v1/stats/`;
export const OCP_SUMMARY_FETCH_URL = `${BASE_URL}/cost-management/api/v1/reports/charges/ocp/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=charge`;
export const CRITICAL_VULNERABILITIES_FETCH_URL = `${BASE_URL}/vulnerability/v1/vulnerabilities/cves?cvss_from=5`;
export const LATEST_VULNERABILITIES_FETCH_URL = `${BASE_URL}/vulnerability/v1/vulnerabilities/cves?public_from=
									${moment().subtract(7, 'days').format('YYYY-MM-DD') }`;
