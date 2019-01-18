import moment from 'moment';

export const AWS_SUMMARY_FETCH = 'AWS_SUMMARY_FETCH';
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const CONFIG_ASSESSMENT_FETCH = 'CONFIG_ASSESSMENT_SUMMARY_FETCH';
export const OCP_SUMMARY_FETCH = 'OCP_SUMMARY_FETCH';
export const CRITICAL_VULNERABILITIES_FETCH = 'CRITICAL_VULNERABILITIES_FETCH';
export const LATEST_VULNERABILITIES_FETCH = 'LATEST_VULNERABILITIES_FETCH';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_FETCH';

const BASE_URL = '/r/insights/platform';
const COST = '/cost-management/api/v1/reports';
const VULN_CVES = '/vulnerability/v1/vulnerabilities/cves';

export const AWS_SUMMARY_FETCH_URL = `${BASE_URL}${COST}/costs/aws/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=total`;
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles?per_page=2`;
export const CONFIG_ASSESSMENT_FETCH_URL = `${BASE_URL}/advisor/v1/stats/`;
export const OCP_SUMMARY_FETCH_URL = `${BASE_URL}${COST}/charges/ocp/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=charge`;
export const CRITICAL_VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?cvss_from=5`;
export const LATEST_VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?public_from=
									${moment().subtract(7, 'days').format('YYYY-MM-DD') }`;
export const VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?page_size=1`;
