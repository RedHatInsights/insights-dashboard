import messages from '../../Messages';

const ADVISOR_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const COMPLIANCE_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const DRIFT_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const INSIGHTS_ZERO_STATE = {
    header: {
        description: messages.insightsDescription,
        //An array like this would be passed into the app
        commands: [
            { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' },
            { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' },
            { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' }
        ],
        bulletPoints: ['What problems do we solve', 'What solution do we provide']
    },
    otherApps: {}
};

const PATCH_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const POLICIES_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const MALWARE_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const RESOURCE_OPTIMIZATION_ZERO_STATE = {
    header: {},
    otherApps: {}
};

const VULNERABILITY_ZERO_STATE = {
    header: {},
    otherApps: {}
};

export default {
    ADVISOR_ZERO_STATE,
    COMPLIANCE_ZERO_STATE,
    DRIFT_ZERO_STATE,
    INSIGHTS_ZERO_STATE,
    PATCH_ZERO_STATE,
    POLICIES_ZERO_STATE,
    MALWARE_ZERO_STATE,
    RESOURCE_OPTIMIZATION_ZERO_STATE,
    VULNERABILITY_ZERO_STATE
};
