const BASE_URL = '/api';
export const UI_BASE = '/insights';
export const SELECTED_TAGS_SET = 'SELECTED_TAGS_SET';
export const WORKLOADS_SET = 'WORKLOADS_SET';
export const SEVERITY_MAP = {
  critical: 4,
  important: 3,
  moderate: 2,
  low: 1,
};

// Compliance App Constants
export const COMPLIANCE_FETCH = 'COMPLIANCE_SUMMARY_FETCH';
export const COMPLIANCE_FETCH_URL = `${BASE_URL}/compliance/v2/reports?filter=with_reported_systems=true`;

// Vulnerability App Constants
const VULN_BASE = '/vulnerability/v1';
export const VULNERABILITIES_FETCH = 'VULNERABILITIES_FETCH';
export const VULNERABILITIES_FETCH_URL = `${BASE_URL}${VULN_BASE}/dashboard`;

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
export const PATCHMAN_VER = 'v3';
export const PATCHMAN_SYSTEMS_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/systems/?limit=1`;
export const PATCHMAN_SYSTEMS_FETCH = 'PATCHMAN_SYSTEMS_FETCH';
export const PATCHMAN_ADVISORIES_FETCH_URL = `${BASE_URL}/${PATCHMAN_ID}/${PATCHMAN_VER}/advisories/?limit=1`;
export const PATCHMAN_ADVISORIES_FETCH = 'PATCHMAN_ADVISORIES_FETCH';

// Inventory Constants
export const INVENTORY_BASE = '/inventory/v1';
const INVENTORY_PER_PAGE = 'per_page=1';
export const INVENTORY_TOTAL_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?${INVENTORY_PER_PAGE}`;
export const INVENTORY_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?registered_with=puptoo&${INVENTORY_PER_PAGE}`;
export const INVENTORY_STALE_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?staleness=stale&registered_with=puptoo&${INVENTORY_PER_PAGE}`;
export const INVENTORY_WARNING_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?staleness=stale_warning&registered_with=puptoo&${INVENTORY_PER_PAGE}`;
export const INVENTORY_CENTOS_FETCH_URL = `${BASE_URL}${INVENTORY_BASE}/hosts?per_page=1&page=1&filter[system_profile][operating_system][CentOS Linux][version][gte]=0`;

// Remediations App Constants
const REMEDIATIONS_BASE = '/remediations/v1';
export const REMEDIATIONS_FETCH = 'REMEDIATIONS_FETCH';
export const REMEDIATIONS_FETCH_URL = `${BASE_URL}${REMEDIATIONS_BASE}/remediations?sort=-updated_at&limit=4&offset=0&fields[data]=playbook_runs`;

// Resource Optimization Constants
const ROS_BASE = '/ros/v1';
export const ROS_IS_CONFIGURED_FETCH = 'ROS_IS_CONFIGURED_FETCH';
export const ROS_IS_CONFIGURED_FETCH_URL = `${BASE_URL}${ROS_BASE}/is_configured`;

export const KESSEL_API_BASE_URL = '/api/kessel/v1beta2';
