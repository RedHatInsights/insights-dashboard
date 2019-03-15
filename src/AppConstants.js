import moment from 'moment';

export const AWS_SUMMARY_FETCH = 'AWS_SUMMARY_FETCH';
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const INSIGHTS_FETCH = 'INSIGHTS_SUMMARY_FETCH';
export const OCP_SUMMARY_FETCH = 'OCP_SUMMARY_FETCH';
export const CRITICAL_VULNERABILITIES_FETCH = 'CRITICAL_VULNERABILITIES_FETCH';
export const LATEST_VULNERABILITIES_FETCH = 'LATEST_VULNERABILITIES_FETCH';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_FETCH';

const BASE_URL = '/api';
const COST = '/cost-management/v1/reports';
const VULN_CVES = '/vulnerability/v1/vulnerabilities/cves';

export const AWS_SUMMARY_FETCH_URL = `${BASE_URL}${COST}/aws/costs/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=cost`;
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles`;
export const INSIGHTS_FETCH_URL = `${BASE_URL}/advisor/v1/stats/`;
export const OCP_SUMMARY_FETCH_URL = `${BASE_URL}${COST}/openshift/costs/?filter[time_scope_units]=mon
									th&filter[time_scope_value]=-1&filter[resolution]=monthly&delta=cost`;
export const CRITICAL_VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?cvss_from=7`;
export const LATEST_VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?public_from=
									${moment().subtract(7, 'days').format('YYYY-MM-DD') }`;
export const VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_CVES}?page_size=1`;
