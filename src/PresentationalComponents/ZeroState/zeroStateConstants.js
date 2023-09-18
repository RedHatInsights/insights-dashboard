/* eslint-disable max-len */
import messages from '../../Messages';

const ADVISOR_ZERO_STATE = {
    header: {
        description:
      `Using Red Hat’s expertise, analyze your RHEL hosts to identify and resolve risks to your environment's availability, performance, and stability.`,
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            }
        ],
        bulletPoints: [
            'Detect misconfigurations, known problematic configurations, or highlight best practices.',
            'Prioritize & remediate risks via manual guidance or Ansible Automation.'
        ]
    },
    otherApps: [
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Patch',
            description: messages.patchZeroState,
            link: '/insights/patch'
        },
        {
            title: 'Resource Optimization',
            description: messages.resourceOptimizationZeroState,
            link: '/insights/ros'
        }
    ],
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
    header: {
        description:
      'Monitor regulatory compliance policies of registered RHEL systems you must adhere to via OpenSCAP.',
        commands: [
            {
                step: '1. ',
                instructions: 'Install the supported SSG package on the host',
                numberedLink: 'https://access.redhat.com/articles/6644131'
            },
            { plainText: ' 2. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            { plainText: ' 3. Install OpenSCAP' },
            { singleClipboardCommand: 'yum -y install openscap openscap-scanner scap-security-guide ' },
            { plainText: ' 4. Create a Compliance Policy and assign your systems to it' },
            { plainText: ' 5. Initiate the compliance scan' },
            { singleClipboardCommand: ' insights-client --compliance' }
        ],
        bulletPoints: [
            'Easily configure, customize, and deploy policies at scale.',
            'Generate reports for stakeholders and remediate via Ansible Automation.'
        ]
    },
    otherApps: [
        {
            title: 'Policies',
            description: messages.policiesZeroState,
            link: '/insights/policies'
        },
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Malware',
            description: messages.malwareZeroState,
            link: '/insights/malware'
        }
    ],
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
    header: {
        description: 'Drift assists in performing root-cause analysis of issues during troubleshooting. It empowers system administrators to compare and track configuration changes in RHEL systems, define baselines, and ensure systems are compliant.',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            { plainText: ' 2. Select two or more hosts to compare in the Drift UI' }

        ],
        bulletPoints: [
            'Compare system configuration over time or to other systems.',
            'Define baselines as standard configuration systems must adhere to.'
        ]
    },
    otherApps: [
        {
            title: 'Policies',
            description: messages.policiesZeroState,
            link: '/insights/policies'
        },
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        }
    ],
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

const CONTENT_MANAGEMENT_ZERO_STATE = {
    header: {
        description: 'Red Hat Insights gives you the information to confidently update your RHEL systems with Red Hat product advisories and packages.',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            }
        ],
        bulletPoints: [
            'View and report on Red Hat product advisories that impact your RHEL environment and apply patches with Ansible Remediation.',
            'Inspect the packages and versions deployed across your RHEL environment.',
            'Add custom repositories and use that content to build customized RHEL images.'
        ]
    },
    otherApps: [
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Image Builder',
            description: messages.imageBuilderZeroState,
            link: '/insights/image-builder'
        }
    ],
    documentation: [
        {
            title: 'System Patching Using Ansible Playbooks',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/system_patching_using_ansible_playbooks_via_remediations'
        },
        {
            title: 'Patch APIs',
            link: 'https://console.redhat.com/docs/api/patch/v3'
        },
        {
            title: 'Configuring notifications & Integration',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_hybrid_cloud_console/2023/html/configuring_notifications_and_integrations_on_the_red_hat_hybrid_cloud_console/index'
        }
    ]
};

const POLICIES_ZERO_STATE = {
    header: {
        description:
      'Policies allow users to create and manage rule conditions to evaluate against system configuration and get automatically alerted whenever they trigger. It assists in operational management with simple tasks such as:',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            { plainText: ' 2. Create condition(s) based on system facts or tags via the policy creation wizard.' }
        ],
        bulletPoints: [
            'Raising an alert when some conditions are met on system configuration',
            'Emailing a team when security packages are out of date on a system',
            'Notifying on Slack when system resources are configured above thresholds',
            'Creating an issue in external ticketing systems when policies are breached',
            'Triggering actions on system inventory automatically'
        ]
    },
    otherApps: [
        {
            title: 'Compliance',
            description: messages.complianceZeroState,
            link: '/insights/compliance'
        },
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Resource Optimization',
            description: messages.resourceOptimizationZeroState,
            link: '/insights/ros'
        }
    ],
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
    header: {
        description: 'The malware detection service monitors your RHEL hosts for known malware signatures to indicate potential threats you can proactively address with your information security team.',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 8 and 9:',
                command: 'subscription-manager register'

            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 8' },
            {
                singleClipboardCommand: 'insights-client --register'
            },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            { instructions: '2. Install the yara package', command: 'dnf -y install yara', noPadding: true },
            {
                instructions: '3. Run a malware detection scan',
                noPadding: true,
                command: 'insights-client --collector malware-detection'
            }
        ],
        bulletPoints: [
            'Identify and report on potential malware threats in your RHEL infrastructure.',
            'Access reference information for known Linux malware threats.'
        ]
    },
    otherApps: [
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Compliance',
            description: messages.complianceZeroState,
            link: '/insights/compliance'
        }
    ],
    documentation: [
        {
            title: 'Assessing and Reporting Malware Signatures',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_reporting_malware_signatures_on_rhel_systems'
        }
    ]
};

const RESOURCE_OPTIMIZATION_ZERO_STATE = {
    header: {
        description:
      'Resource Optimization enables users to assess and monitor their public RHEL cloud usage and provides guidance for opportunities for optimization.',
        commands: [
            {
                plainText:
          ' 1. Install & configure Performance Co-Pilot with use for Insights'
            },
            {
                instructions: 'Download Ansible Playbook',
                link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/assembly-ros-install#installing_resource_optimization_when_ansible_is_already_installed'
            },
            { plainText: 'or' },
            { instructions: 'Complete the manual install', link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/assembly-ros-install#installing_resource_optimization_without_installing_or_using_ansible' },
            { plainText: '2. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            {
                plainText:
          'NOTE: After configuration it may take up to 24 hours until suggestions are available'
            }
        ],
        bulletPoints: [
            'Track your system resource utilizations to make better business decisions.',
            'Identify states such as oversized, undersized, idle, or under pressure & made adjustments to optimize.'
        ]
    },
    otherApps: [
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Drift',
            description: messages.driftZeroState,
            link: '/insights/drift'
        }
    ],
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
    header: {
        description:
      'Understand the security exposure of your registered RHEL systems and take appropriate steps to protect your organization.',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            }
        ],
        bulletPoints: [
            'Identify, triage, and prioritize CVEs affecting your systems.',
            'Generate reports for stakeholders and remediate via Ansible Automation.'
        ]
    },
    otherApps: [
        {
            title: 'Patch',
            description: messages.patchZeroState,
            link: '/insights/patch'
        },
        {
            title: 'Malware',
            description: messages.malwareZeroState,
            link: '/insights/malware'
        },
        {
            title: 'Compliance',
            description: messages.complianceZeroState,
            link: '/insights/compliance'
        }
    ],
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
const IMAGES_ZERO_STATE = {
    header: {
        description:
      `Create customized images optimized for your target environment and save time by uploading to multiple target environments in a single build.`,
        bulletPoints: [
            'Upload to target cloud environments, such as Amazon Web Services, Microsoft Azure, and Google Cloud Platform.',
            'Download customized images and upload them to the VMware vSphere client.',
            'Create customized Bare Metal and Guest images.'
        ],
        commands: [
            { plainText: ' Images is supposed to have a custom input via customButton prop' }
        ]
    },
    otherApps: [
        {
            title: 'Create an Activation Key',
            description: messages.activationKeyZeroState,
            link: '/settings/connector/activation-keys'
        },
        {
            title: 'Link Custom content (Preview Only)',
            description: messages.customContentZeroState,
            link: '/settings/content'
        }
    ],
    documentation: [
        {
            title: 'Creating customized Images with Image Builder',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/creating_customized_rhel_images_using_the_image_builder_service/index'
        }
    ]
};

const REMEDIATIONS_ZERO_STATE = {
    header: {
        description:
      `Use remediation guidance provided by Red Hat Insights services to take manual actions or create playbooks for resolution at scale.`,
        bulletPoints: [
            'Download playbooks or execute directly to remediate risk',
            'Execute remediations playbooks directly via Red Hat Satellite or remote host configuration (rhc)'
        ],
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            },
            { plainText: ' 2. For RHEL 8 and 9 hosts, install and connect with remote host configuration (rhc)' },
            { singleClipboardCommand: 'dnf -y install rhc' },
            { singleClipboardCommand: 'rhc connect' },
            { plainText: ' 3. Once registered, view the analysis of that host in one of the Red Hat Insights applications to select items for remediation.  ' }

        ]
    },
    otherApps: [
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Patch',
            description: messages.patchZeroState,
            link: '/insights/patch'
        }
    ],
    documentation: [
        {
            title: 'Red Hat Insights Remediations Guide',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/red_hat_insights_remediations_guide/index'
        }
    ]
};

const INVENTORY_ZERO_STATE = {
    header: {
        description:
      `Track and manage RHEL systems owned by your organization, and get discovered information and findings about your resources in a one-stop inventory.`,
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/client_configuration_guide_for_red_hat_insights/index',
                partOne: 'Need help? Some systems from different sources require some additional steps. View the',
                anchorText: 'Client Configuration Guide',
                partTwo: ' for more details.'
            }
        ],
        bulletPoints: [
            'List all managed RHEL systems in one inventory.',
            'Access all discovered information, including system facts and system tags.',
            'Aggregate all findings (e.g. recommendations) per system.'
        ]
    },
    otherApps: [
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Vulnerability',
            description: messages.vulnerabilityZeroState,
            link: '/insights/vulnerability'
        },
        {
            title: 'Patch',
            description: messages.patchZeroState,
            link: '/insights/patch'
        }
    ],
    documentation: [
        {
            title: 'Getting Started with Red Hat Insights',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/getting_started_with_red_hat_insights'
        },
        {
            title: 'Inventory API',
            link: 'https://console.redhat.com/docs/api/inventory'
        }
    ]
};

const TASKS_ZERO_STATE = {
    header: {
        description: 'Perform simple analyses on your Insights-connected hosts through the Red Hat Hybrid Cloud Console.',
        commands: [
            { plainText: ' 1. Register your host' },
            {
                instructions: 'RHEL 7, 8 and 9:',
                command: 'subscription-manager register'
            },
            { singleClipboardCommand: 'yum -y install insights-client # necessary for some versions of RHEL 7 and 8' },
            { singleClipboardCommand: 'insights-client --register' },
            {
                linkWithinText: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/red_hat_insights_remediations_guide/host-communication-with-insights_red-hat-insights-remediation-guide',
                partOne: '2. Follow',
                anchorText: 'Enabling communication with Insights',
                partTwo: ' to enable remote execution of playbooks.'
            }
        ],
        bulletPoints: [
            'Use Insights Tasks to run a pre-upgrade analysis on your RHEL 7 or RHEL 8 hosts to identify and remediate known issues.'
        ]
    },
    otherApps: [
        {
            title: 'Advisor',
            description: messages.advisorZeroState,
            link: '/insights/advisor'
        },
        {
            title: 'Remediations',
            description: messages.remediationsZeroState,
            link: '/insights/remediations'
        }
    ],
    documentation: [
        {
            title: 'Remote Host Configuration and Management',
            link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_security_vulnerabilities_on_rhel_systems'
        },
        {
            title: 'Take the unknowns out of RHEL upgrades with Red Hat Insights',
            link: 'https://www.redhat.com/en/blog/take-unknowns-out-rhel-upgrades-red-hat-insights'
        }
    ]
};

export default {
    ADVISOR_ZERO_STATE,
    COMPLIANCE_ZERO_STATE,
    DRIFT_ZERO_STATE,
    INSIGHTS_ZERO_STATE,
    CONTENT_MANAGEMENT_ZERO_STATE,
    POLICIES_ZERO_STATE,
    MALWARE_ZERO_STATE,
    RESOURCE_OPTIMIZATION_ZERO_STATE,
    VULNERABILITY_ZERO_STATE,
    IMAGES_ZERO_STATE,
    REMEDIATIONS_ZERO_STATE,
    INVENTORY_ZERO_STATE,
    TASKS_ZERO_STATE
};
