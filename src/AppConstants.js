/* eslint-disable max-len */
import * as urijs from 'urijs';

const BASE_URL = '/api';
export const UI_BASE = './rhel';

// Compliance App Constants
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles`;

// Vulnerability App Constants
const VULN_CVES = '/vulnerability/v1/report/executive';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_FETCH';
export const VULNERABILITIES_FETCH_URL = urijs(`${BASE_URL}${VULN_CVES}`);

// Advisor App Constants
const ADV_BASE = '/insights/v1';
export const ADVISOR_STATS_REC_FETCH_URL = `${BASE_URL}${ADV_BASE}/stats/rules/`;
export const ADVISOR_STATS_REC_FETCH = 'ADVISOR_STATS_REC_FETCH';
export const ADVISOR_STATS_SYSTEMS_FETCH_URL = `${BASE_URL}${ADV_BASE}/stats/systems/`;
export const ADVISOR_STATS_SYSTEMS_FETCH = 'ADVISOR_STATS_SYSTEMS_FETCH';
export const ADVISOR_INCIDENTS_FETCH = 'ADVISOR_INCIDENTS_FETCH';
export const ADVISOR_INCIDENTS_FETCH_URL = `${BASE_URL}/insights/v1/rule/?impacting=true&reports_shown=true&sort=-publish_date&offset=0&limit=10&incident=true`;

// Patchman App Constants
export const PATCHMAN_ID = 'patch';
export const PATCHMAN_VER = 'v1';
export const PATCHMAN_SYSTEMS_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/systems`;
export const PATCHMAN_SYSTEMS_FETCH = 'PATCHMAN_SYSTEMS_FETCH';
export const PATCHMAN_SECURITY_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/advisories?filter[advisory_type]=3`;
export const PATCHMAN_SECURITY_FETCH = 'PATCHMAN_SECURITY_FETCH';
export const PATCHMAN_BUGS_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/advisories?filter[advisory_type]=2`;
export const PATCHMAN_BUGS_FETCH = 'PATCHMAN_BUGS_FETCH';
export const PATCHMAN_ENHANCEMENTS_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/advisories/?filter[advisory_type]=1`;
export const PATCHMAN_ENHANCEMENTS_FETCH = 'PATCHMAN_ENHANCEMENTS_FETCH';

// Subscriptions Utilized Constants
export const SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH = 'SUBSCRIPTIONS_UTILIZED_PRODUCT_ONE_FETCH';
export const SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH = 'SUBSCRIPTIONS_UTILIZED_PRODUCT_TWO_FETCH';
export const SUBSCRIPTIONS_UTILIZED_REPORT_FETCH_URL = `${BASE_URL}/rhsm-subscriptions/v1/tally/products/`;
export const SUBSCRIPTIONS_UTILIZED_CAPACITY_FETCH_URL = `${BASE_URL}/rhsm-subscriptions/v1/capacity/products/`;
