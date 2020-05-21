/* eslint-disable max-len */
import * as urijs from 'urijs';

const BASE_URL = '/api';
export const UI_BASE = './insights';

// Compliance App Constants
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/profiles?search=has_test_results=true`;

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
export const ADVISOR_INCIDENTS_FETCH_URL = `${BASE_URL}/insights/v1/rule/?impacting=true&limit=1&incident=true`;

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

// Inventory Constants
export const INVENTORY_BASE = '/inventory/v1';
export const INVENTORY_TOTAL_FETCH = 'INVENTORY_TOTAL_FETCH';
export const INVENTORY_TOTAL_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts`;
export const INVENTORY_FETCH = 'INVENTORY_FETCH';
export const INVENTORY_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?registered_with=insights`;
export const INVENTORY_STALE_FETCH = 'INVENTORY_STALE_FETCH';
export const INVENTORY_STALE_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?staleness=stale&registered_with=insights`;
export const INVENTORY_WARNING_FETCH = 'INVENTORY_WARNING_FETCH';
export const INVENTORY_WARNING_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?staleness=stale_warning&registered_with=insights`;

// Remediations App Constants
const REMEDIATIONS_BASE = '/remediations/v1';
export const REMEDIATIONS_FETCH = 'REMEDIATIONS_FETCH';
export const REMEDIATIONS_FETCH_URL = `${BASE_URL}${REMEDIATIONS_BASE}/remediations?sort=-updated_at&limit=4&offset=0`;
export const REMEDIATIONS_PLAYBOOK_RUNS_FETCH = 'REMEDIATIONS_PLAYBOOK_RUNS_FETCH';
export const REMEDIATIONS_PLAYBOOK_RUNS_FETCH_URL = `${BASE_URL}${REMEDIATIONS_BASE}/remediations/`;
