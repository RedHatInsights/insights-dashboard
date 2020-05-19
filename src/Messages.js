/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
    dashboardTitle: {
        id: 'dashboardTitle',
        description: 'Title of the dashboard',
        defaultMessage: 'Dashboard'
    },
    subscriptionsUtilizedTitle: {
        id: 'subscriptionsUtilizedTitle',
        description: 'Title of the subscriptions utilized card',
        defaultMessage: 'Subscription Watch utilization summary'
    },
    subscriptionsUtilizedLearnMore: {
        id: 'subscriptionsUtilizedLearnMore',
        description: 'Subscriptions utilized card - learn more description',
        defaultMessage: 'Activate Subscription Watch to monitor your subscription utilization.'
    },
    subscriptionsUtilizedLearnMoreAction: {
        id: 'subscriptionsUtilizedLearnMoreAction',
        description: 'Subscriptions utilized card - learn more action',
        defaultMessage: 'Learn about Subscription Watch'
    },
    subscriptionsUtilizedNoProductData: {
        id: 'subscriptionsUtilizedNoProductData',
        description: 'Subscriptions utilized card - no data',
        defaultMessage: 'No data available'
    },
    subscriptionsUtilizedProductOneTitle: {
        id: 'subscriptionsUtilizedProductOneTitle',
        description: 'Subscriptions utilized card - product one title',
        defaultMessage: 'Red Hat OpenShift'
    },
    subscriptionsUtilizedProductOneReport: {
        id: 'subscriptionsUtilizedProductOneDesc',
        description: 'Subscriptions utilized card - product one report total',
        defaultMessage: 'OpenShift cores: {totalReport}'
    },
    subscriptionsUtilizedProductTwoTitle: {
        id: 'subscriptionsUtilizedProductTwoTitle',
        description: 'Subscriptions utilized card - product two title',
        defaultMessage: 'Red Hat Enterprise Linux'
    },
    subscriptionsUtilizedProductTwoReport: {
        id: 'subscriptionsUtilizedProductTwoTitleDesc',
        description: 'Subscriptions utilized card - product two report total',
        defaultMessage: 'RHEL sockets: {totalReport}'
    },
    subscriptionsUtilizedProductCapacity: {
        id: 'subscriptionsUtilizedProductCapacity',
        description: 'Subscriptions utilized card - product capacity',
        defaultMessage: 'Subscription threshold: {totalCapacity}'
    },
    subscriptionsUtilizedProductDate: {
        id: 'subscriptionsUtilizedProductDate',
        description: 'Subscriptions utilized card - product date',
        defaultMessage: 'Data from: {formattedDate}'
    },
    recsImpactingSystems: {
        id: 'recsImpactingSystems',
        description: 'Advisor - recs impacting systems',
        defaultMessage: '{totalRecs, plural, one {# Recommendation} other {# Recommendations}}  impacting {systems, plural, one {# system} other {# systems}}'
    },
    incidentsDetected: {
        id: 'incidentsDetected',
        description: 'Advisor - incidents detected',
        defaultMessage: '{incidents, plural, one {Incident} other {Incidents}} detected'
    },
    critical: {
        id: 'critical',
        description: 'Critical',
        defaultMessage: 'Critical'
    },
    important: {
        id: 'important',
        description: 'important',
        defaultMessage: 'important'
    },
    moderate: {
        id: 'moderate',
        description: 'moderate',
        defaultMessage: 'moderate'
    },
    low: {
        id: 'low',
        description: 'low',
        defaultMessage: 'low'
    },
    compliantHostCount: {
        id: 'compliantHostCount',
        description: 'Compliance - compliant host count',
        defaultMessage: '{count, plural, one {# system} other {# systems}}'
    },
    compliantScore: {
        id: 'compliantScore',
        description: 'Compliance - compliant score',
        defaultMessage: '{score}% passes'
    },
    vulnerabilitiesTitle: {
        id: 'vulnerabilitiesTitle',
        description: 'Vulnerability card header',
        defaultMessage: 'Vulnerability'
    },
    vulnerabilitiesTotalItems: {
        id: 'vulnerabilitiesTotalItems',
        description: 'Vulnerability - vulnerability total',
        defaultMessage: '{total}'
    },
    lastxdays: {
        id: 'lastxdays',
        description: 'Last x days label where x is a predefined value',
        defaultMessage: 'Last {days} days'
    },
    cvesImpactingSystems: {
        id: 'cvesImpactingSystems',
        description: 'Vulnerability - cve impacting link',
        defaultMessage: '{cves, plural, one {CVE} other {CVEs}} impacting your systems'
    },
    vulnerabilityLearnMore: {
        id: 'vulnerabilityLearnMore',
        description: 'Vulnerability - learn more link',
        defaultMessage: 'Learn about CVSS Scores'
    },
    latestVulnerabilitiesTotal: {
        id: 'latestVulnerabilitiesTotal',
        description: 'Vulnerabilities - latest vulnerabilities',
        defaultMessage: '{totalLatest}'
    },
    deniedStateTitle: {
        id: 'deniedStateTitle',
        description: 'Denied state title',
        defaultMessage: 'You do not have access to {appName}'
    },
    deniedStateBody: {
        id: 'deniedStateBody',
        description: 'Denied access body',
        defaultMessage: 'Contact your organization administrator(s) for more information'
    },
    complianceEmptyStateTitle: {
        id: 'complianceEmptyStateTitle',
        description: 'Compliance - empty state title',
        defaultMessage: 'No policies'
    },
    complianceEmptyStateBody: {
        id: 'complianceEmptyStateBody',
        description: 'Compliance - empty state body',
        defaultMessage: `The compliance service uses OpenSCAP policies to track your organization's adherence to compliance requirements`
    },
    complianceEmptyStateAction1: {
        id: 'complianceEmptyStateAction1',
        description: 'Compliance - empty state action 1',
        defaultMessage: 'Create a policy'
    },
    complianceEmptyStateAction2: {
        id: 'complianceEmptyStateAction2',
        description: 'Compliance - empty state action 2',
        defaultMessage: 'Learn about OpenSCAP'
    },
    securityAdvisories: {
        id: 'securityAdvisories',
        description: 'Patch - security advisories',
        defaultMessage: '{count, plural, one {security advisory} other {security advisories}}'
    },
    bugfixAdvisories: {
        id: 'bugfixAdvisories',
        description: 'Patch - bugfix advisories',
        defaultMessage: '{count, plural, one {bug fix} other {bug fixes}}'
    },
    enhancementAdvisories: {
        id: 'enhancementAdvisories',
        description: 'Patch - enhancement advisories',
        defaultMessage: '{count, plural, one {enhancement} other {enhancements}}'
    },
    systemsAffected: {
        id: 'systemsAffected',
        description: 'Patch - systems affected',
        defaultMessage: '{count, plural, one {# system} other {# systems}} affected'
    },
    patchTitle: {
        id: 'patchTitle',
        description: 'Patch - title',
        defaultMessage: 'Patch'
    },
    systemInventoryDescription: {
        id: 'systemInventoryDescription',
        description: 'System inventory - description',
        defaultMessage: '{count, plural, one {System} other {Systems}} running insights-client'
    },
    systemInventoryStaleWarning: {
        id: 'systemInventoryStaleWarning',
        description: 'System inventory - stale warning',
        defaultMessage: '{count, plural, one {# system} other {# systems}} to be removed'
    },
    systemInventoryStale: {
        id: 'systemInventoryStale',
        description: 'System inventory - stale',
        defaultMessage: '{count, plural, one {# stale system} other {# stale systems}}'
    },
    systemInventoryPercentageData: {
        id: 'systemInventoryPercentageData',
        description: 'System Inventory - percentage data',
        defaultMessage: '{count}% of total systems'
    },
    systemInventoryTitle: {
        id: 'systemInventoryTitle',
        description: 'System Inventory - title',
        defaultMessage: 'Insights system inventory'
    },
    systemInventoryNotUsingClient: {
        id: 'systemInventoryNotUsingClient',
        description: 'Number of systems not running insights client',
        defaultMessage: '{count, plural, one {# additional system} other {# additional systems}} not running insights-client\
        are not taking advantage of Red Hat Insights capabilities.'
    },
    remediationsTotal: {
        id: 'remediationsTotal',
        description: 'Remediations - remediations total',
        defaultMessage: '{total} more remediations'
    },
    remediationsPlaybookStatus: {
        id: 'remediationsPlaybookStatus',
        description: 'Remediations playbook - status',
        defaultMessage: '{status}'
    },
    remediationsPlaybookNoActivity: {
        id: 'remediationsPlaybookNoActivity',
        description: 'Remediations playbook - no activity',
        defaultMessage: 'No activity'
    },
    remediationsPlaybookFailure: {
        id: 'remediationsNoActivity',
        description: 'Remediations playbook - failed getting data',
        defaultMessage: 'Failure'
    },
    remediationsNoDataTitle: {
        id: 'remediationsNoDataTitle',
        description: 'No remediations',
        defaultMessage: `You haven't created any remediation Playbooks yet`
    },
    remediationsNoDataBody: {
        id: 'remediationsNoDataBody',
        description: 'Create a playbook to see remediations',
        defaultMessage: 'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.'
    },
    errorStateTitle: {
        id: 'errorStateTitle',
        description: 'Error fetching API',
        defaultMessage: '{appName} has experienced an error. Contact Red Hat support if the problem persists.'
    },
    noSystemsTitle: {
        id: 'noSystemsTitle',
        description: 'No systems',
        defaultMessage: 'Get started with Red Hat Insights'
    },
    noSystemsDescription: {
        id: 'noSystemsDescription',
        description: 'Register systems to use Insights',
        defaultMessage: 'With predictive analytics, avoid problems and unplanned\
                        downtime in your Red Hat environment. Red Hat Insights is\
                        included with your Red Hat Enterprise Linux subscription.'
    },
    noSystemsInstall: {
        id: 'noSystemsInstall',
        description: 'Install the client',
        defaultMessage: 'Install the client on the RHEL system'
    },
    noSystemsRegister: {
        id: 'noSystemsRegister',
        description: 'Register systems',
        defaultMessage: 'Register the system to Red Hat Insights'
    },
    noSystemsLink: {
        id: 'noSystemsLink',
        description: 'Getting started documentation',
        defaultMessage: 'Getting started documentation'
    },
    advisorChartDescription: {
        id: 'advisorChartDescription',
        description: 'Advisor chart description',
        defaultMessage: 'This chart shows recommendations effecting your system'
    }
});
