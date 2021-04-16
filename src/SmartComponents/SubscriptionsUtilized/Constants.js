import { UI_BASE, UI_BASE_OPENSHIFT } from '../../AppConstants';

export const RHSM_API_RESPONSE_DATA = 'data';

export const RHSM_API_RESPONSE_DATA_TYPES = {
    CORES: 'cores',
    DATE: 'date',
    SOCKETS: 'sockets',
    HAS_DATA: 'has_data',
    HAS_INFINITE: 'has_infinite_quantity'
};

export const RHSM_API_RESPONSE_ERROR_DATA = 'errors';

export const RHSM_API_RESPONSE_ERROR_DATA_TYPES = {
    CODE: 'code'
};

export const RHSM_API_RESPONSE_ERROR_DATA_CODE_TYPES = {
    OPTIN: 'SUBSCRIPTIONS1004'
};

export const RHSM_API_PRODUCT_ID_TYPES = {
    RHEL: 'RHEL',
    OPENSHIFT: 'OpenShift Container Platform'
};

export const RHSM_API_QUERY_GRANULARITY_TYPES = {
    DAILY: 'daily'
};

export const SW_PATHS = {
    APP: `${UI_BASE}/subscriptions/rhel`,
    RHEL: `${UI_BASE}/subscriptions/rhel`,
    OPENSHIFT: `${UI_BASE_OPENSHIFT}/subscriptions/openshift-container`
};
