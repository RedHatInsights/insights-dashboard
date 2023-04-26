/* eslint-disable max-len */
import messages from '../../Messages';

const ADVISOR_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Assessing RHEL Configuration Issues',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_rhel_configuration_issues_using_the_red_hat_insights_advisor_service/index'
        },
        {
            title: 'Generating Advisor Service Reports',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/generating_advisor_service_reports/index'
        },
        {
            title: 'Advisor APIs',
            link: 'https://console.redhat.com/docs/api/insights'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const COMPLIANCE_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Assessing and Monitoring Security Policy Compliance',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_security_policy_compliance_of_rhel_systems'
        },
        {
            title: 'Generating Compliance Service Reports',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/generating_compliance_service_reports'
        },
        {
            title: 'Insights Compliance - Supported configurations',
            link: 'https://access.redhat.com/articles/6644131'
        },
        {
            title: 'Compliance APIs',
            link: 'https://console.redhat.com/docs/api/compliance'
        },
        {
            title: 'Configuring notifications & integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const DRIFT_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Comparing System Configurations and Baselines',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023'
        },
        {
            title: 'Drift - Comparison API',
            link: 'https://console.redhat.com/docs/api/drift'
        },
        {
            title: 'Drift - Baseline API',
            link: 'https://console.redhat.com/docs/api/system-baseline'
        },
        {
            title: 'Configuring notifications & integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const INSIGHTS_ZERO_STATE = {
    header: {
        description: messages.insightsDescription,
        //An array like this would be passed into the app
        commands: [
            {
                intructions: 'Install the client on the RHEL system',
                command: '[root@server] testing install insights-clint'
            },
            {
                intructions: 'Install the client on the RHEL system',
                command: '[root@server] testing install insights-clint'
            },
            {
                intructions: 'Install the client on the RHEL system',
                command: '[root@server] testing install insights-clint'
            }
        ],
        bulletPoints: ['What problems do we solve', 'What solution do we provide']
    },
    otherApps: {}
};

const PATCH_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'System Patching Using Ansible Playbooks',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/system_patching_using_ansible_playbooks_via_remediations'
        },
        {
            title: 'Patch APIs',
            link: 'https://console.redhat.com/docs/api/patch/v2'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const POLICIES_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Monitoring and Reacting to Configuration Changes',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/monitoring_and_reacting_to_configuration_changes_using_policies'
        },
        {
            title: 'Policies APIs',
            link: 'https://console.redhat.com/docs/api/policies'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const MALWARE_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Assessing and Reporting Malware Signatures',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_reporting_malware_signatures_on_rhel_systems_with_the_insights_for_rhel_malware_service'
        }
    ]
};

const RESOURCE_OPTIMIZATION_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Assessing and Monitoring RHEL Resource Optimization',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux'
        },
        {
            title: 'Resource Optimization APIs',
            link: 'https://console.redhat.com/docs/api/ros'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const VULNERABILITY_ZERO_STATE = {
    header: {},
    otherApps: {},
    documentation: [
        {
            title: 'Assessing and Monitoring Security Vulnerabilities',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_security_vulnerabilities_on_rhel_systems'
        },
        {
            title: 'Generating Vulnerability Service Reports',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/generating_vulnerability_service_reports'
        },
        {
            title: 'Vulnerability APIs',
            link: 'https://console.redhat.com/docs/api/vulnerability'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
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
