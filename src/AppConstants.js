import moment from 'moment';
import * as urijs from 'urijs';

export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const CRITICAL_VULNERABILITIES_FETCH = 'CRITICAL_VULNERABILITIES_FETCH';
export const LATEST_VULNERABILITIES_FETCH = 'LATEST_VULNERABILITIES_FETCH';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_FETCH';
export const UI_BASE = './rhel';

const BASE_URL = '/api';
const VULN_CVES = '/vulnerability/v1/vulnerabilities/cves';

export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles`;

export const CRITICAL_VULNERABILITIES_FETCH_URL = urijs(`${BASE_URL}${VULN_CVES}`)
.addSearch('cvss_from', 7)
.toString();

export const LATEST_VULNERABILITIES_FETCH_URL = urijs(`${BASE_URL}${VULN_CVES}`)
.addSearch('show_all', 'true')
.addSearch('public_from', moment().subtract(7, 'days').format('YYYY-MM-DD'))
.toString();

export const VULNERABILITIES_FETCH_URL = urijs(`${BASE_URL}${VULN_CVES}`)
.addSearch('page_size', 1)
.toString();
