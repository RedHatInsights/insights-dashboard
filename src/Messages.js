/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
    dashboardTitle: {
        id: 'dashboardTitle',
        description: 'Title of the dashboard',
        defaultMessage: 'Dashboard'
    },
    newRulesDateTitle: {
        id: 'newRulesDateTitle',
        description: 'New rules date title',
        defaultMessage: 'Newly released security rule'
    },
    subscriptionsUtilizedTitle: {
        id: 'subscriptionsUtilizedTitle',
        description: 'Title of the subscriptions utilized card',
        defaultMessage: 'Subscription Watch utilization summary'
    },
    subscriptionsTitle: {
        id: 'subscriptionsTitle',
        description: 'Title of the subscriptions utilized card',
        defaultMessage: 'Subscription Watch'
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
        defaultMessage: 'OpenShift'
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
    incidents: {
        id: 'incidents',
        description: 'Advisor - incidents ',
        defaultMessage: '{incidents, plural, one {# incident} other {# incidents}} detected'
    },
    critical: {
        id: 'critical',
        description: 'Critical',
        defaultMessage: 'Critical'
    },
    important: {
        id: 'important',
        description: 'Important',
        defaultMessage: 'Important'
    },
    moderate: {
        id: 'moderate',
        description: 'Moderate',
        defaultMessage: 'Moderate'
    },
    low: {
        id: 'low',
        description: 'Low',
        defaultMessage: 'Low'
    },
    compliantHostCount: {
        id: 'compliantHostCount',
        description: 'Compliance - compliant host count',
        defaultMessage: '{count, plural, one {# system} other {# systems}}'
    },
    compliantScore: {
        id: 'compliantScore',
        description: 'Compliance - compliant score',
        defaultMessage: '{score}% compliant'
    },
    vulnerabilitiesTitle: {
        id: 'vulnerabilitiesTitle',
        description: 'Vulnerability card header',
        defaultMessage: 'Vulnerability'
    },
    cveByCvssScoreTitle: {
        id: 'cveByCvssScoreTitle',
        description: 'CVE by cvss score card header',
        defaultMessage: 'CVEs by CVSS score'
    },
    complianceTitle: {
        id: 'complianceTitle',
        description: 'Compliance card header',
        defaultMessage: 'Compliance'
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
    cvesImpactingOneOrMoreSystems: {
        id: 'cvesImpactingOneOrMoreSystems',
        description: 'Vulnerability - cve impacting link',
        defaultMessage: '{cves, plural, one {CVE} other {CVEs}} with <strong>security rules</strong> impacting 1 or more systems'
    },
    knownExploitsOneOrMoreSystems: {
        id: 'knownExploitsOneOrMoreSystems',
        description: 'Vulnerability - known exploits link',
        defaultMessage: '{cves, plural, one {CVE} other {CVEs}} with <strong>known exploits</strong> impacting 1 or more systems<tooltip></tooltip>'
    },
    vulnerabilityMessage: {
        id: 'vulnerabilityMessage',
        description: 'Vulnerability message',
        defaultMessage: 'Red Hat recommends addressing these CVEs with high priority due to heightened risk associated with these security issues'
    },
    vulnerabilityCardCTAText: {
        id: 'vulnerabilityCardCTAText',
        description: 'Vulnerability card cta text',
        defaultMessage: 'View CVEs'
    },
    vulnerabilityCardKnownExploitsCTAText: {
        id: 'vulnerabilityCardKnownExploitsCTAText',
        description: 'Vulnerability card known exploits cta text',
        defaultMessage: 'View known exploits'
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
    systemInventoryUnregisteredDescription: {
        id: 'systemInventoryUnregisteredDescription',
        description: 'System unregistered - description',
        defaultMessage: '{count, plural, one {System} other {Systems}} unregistered'
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
    systemInventoryCTA: {
        id: 'systemInventoryCTA',
        description: 'System inventory - cta',
        defaultMessage: 'Register systems'
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
        are not taking advantage of Insights capabilities.'
    },
    systemInventoryNoAccess: {
        id: 'systemInventoryNoAccess',
        description: 'User has no access to read inventory systems',
        defaultMessage: 'Your organization administrator must grant you inventory access to view your systems.'
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
        defaultMessage: 'Get started with Insights'
    },
    noSystemsDescription: {
        id: 'noSystemsDescription',
        description: 'Register systems to use Insights',
        defaultMessage: 'With predictive analytics, avoid problems and unplanned\
                        downtime in your Red Hat environment. Insights is\
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
        defaultMessage: 'Register the system to Insights'
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
    },
    registerYourSystems: {
        id: 'registerYourSystems',
        description: 'Register your systems',
        defaultMessage: 'Register your systems'
    },
    recommendations: {
        id: 'recommendations',
        description: 'Recommendations',
        defaultMessage: 'recommendations'
    },
    inAdvisor: {
        id: 'inAdvisor',
        description: 'in Advisor',
        defaultMessage: 'in Advisor'
    },
    totalRisk: {
        id: 'totalRisk',
        description: 'Total risk',
        defaultMessage: 'Total risk'
    },
    category: {
        id: 'category',
        description: 'Category',
        defaultMessage: 'Category'
    },
    availability: {
        id: 'availability',
        description: 'Category chart value',
        defaultMessage: 'Availability'
    },
    performance: {
        id: 'performance',
        description: 'Category chart  value',
        defaultMessage: 'Performance'
    },
    stability: {
        id: 'stability',
        description: 'Category chart  value',
        defaultMessage: 'Stability'
    },
    security: {
        id: 'security',
        description: 'Category chart  value',
        defaultMessage: 'Security'
    },
    totalRiskDef: {
        id: 'totalRiskDef',
        description: 'Total risk definition',
        defaultMessage: 'A value derived from the <strong>likelihood</strong> that the condition will negatively affect your infrastructure, and the <strong>impact</strong> on system operation if that were to happen'
    },
    dashboardFiltration: {
        id: 'dashboardFiltration',
        description: 'Dashboard filtration temporarily unavailable',
        defaultMessage: 'Dashboard filtration temporarily unavailable'
    },
    functionalityNotSupported: {
        id: 'functionalityNotSupported',
        description: 'This functionality is not supported within',
        defaultMessage: 'This functionality is not supported within {appname}. Remove all filters to show dashboard results.'
    },
    filteredResultsInApp: {
        id: 'filteredResultsInApp',
        description: 'Filtered results are available directly',
        defaultMessage: 'Filtered results are available directly within the {appname} application.'
    },
    filterNotApplicable: {
        id: 'filterNotApplicable',
        description: 'Filter not applicable',
        defaultMessage: 'Filter not applicable'
    },
    insightsForSap: {
        id: 'insightsForSap',
        description: 'Insights for SAP',
        defaultMessage: 'Insights for SAP'
    },
    providesAdditionalSAPworkload: {
        id: 'providesAdditionalSAPworkload',
        description: 'Insights provides additional SAP',
        defaultMessage: `Insights provides additional SAP workload-focused enhancements to provide a curated view of the health across the SAP Landscape on Red Hat Enterprise Linux. This functionality further enables Insights detection and remediation capabilities for workload optimization, performance, stability, compliance & security. <break></break> Insights has not detected any hosts running a SAP workload. To take advantage of these features, please install the Insights-client on an RHEL host running SAP & these systems will be automatically profiled.`
    },
    learnmore: {
        id: 'learnmore',
        description: 'learnmore',
        defaultMessage: 'Learn more'
    },
    more: {
        id: 'more',
        description: 'more',
        defaultMessage: 'more'
    },
    singleConsistent: {
        id: 'singleConsistent',
        description: 'Single, consistent management solution',
        defaultMessage: 'Single, consistent management solution across on-premise, hybrid cloud, and public cloud. Included with Red Hat Enterprise Linux subscription.'
    },
    learnmoreRHI: {
        id: 'learnmoreRHI',
        description: 'Learn more about Insights',
        defaultMessage: 'Learn more about Insights'
    },
    contactsales: {
        id: 'contactsales',
        description: 'Contact sales',
        defaultMessage: 'Contact sales'
    },
    smartManagement: {
        id: 'smartManagement',
        description: 'Smart Management subscription',
        defaultMessage: 'Smart Management subscription enables push-button remediation of issues identified by Insights. Any issues identified by Insights are accompanied by remediation instructions, and with Smart Management, remediation is available at scale.'
    },
    insightsandsmartmanagement: {
        id: 'insightsandsmartmanagement',
        description: 'Insights and Smart Management',
        defaultMessage: 'Insights and Smart Management'
    },
    rhm1: {
        id: 'rhm1',
        description: 'zero state last box',
        defaultMessage: 'Red Hat Management gives you the flexibility to manage Red Hat Enterprise Linux on-premise or in a hosted environment'
    },
    rhm2: {
        id: 'rhm2',
        description: 'zero state last box',
        defaultMessage: 'Red Hat Management covers your entire system and security management life cycle'
    },
    rhm3: {
        id: 'rhm3',
        description: 'zero state last box',
        defaultMessage: 'Red Hat Management includes Red Hat Satellite and the new cloud management services for Red Hat Enterprise Linux'
    },
    securityRedirect: {
        id: 'securityRedirect',
        description: 'Understanding our security measures',
        defaultMessage: 'Understanding our security measures'
    },
    dataPrivacyAndControls: {
        id: 'dataPrivacyAndControls',
        description: 'Data privacy body',
        defaultMessage: 'Red Hat Insights provides a mechanism for users to obtain actionable intelligence regarding suggested improvements to deployed Red Hat software. This document covers the security measures Red Hat puts in place to provide secure transmission, processing, and analysis of this data by those tools.'
    },
    dataPrivacyAndControlsTitle: {
        id: 'dataPrivacyAndControlsTitle',
        description: 'Data privacy and controls title',
        defaultMessage: 'Data privacy and controls in Insights'
    },
    zslblTitle: {
        id: 'zslblTitle',
        description: 'zero state left bullet list title',
        defaultMessage: 'Improve operational confidence'
    },
    zslblBody: {
        id: 'zslblBody',
        description: 'zero state left bullet body',
        defaultMessage: 'Deliver more reliable IT solutions by identifying performance and configuration risks before downtime occurs. With less downtime, IT can focus on higher value projects and deepen their skills.'
    },
    zslblb1: {
        id: 'zslblb1',
        description: 'zero state left bullet list b1',
        defaultMessage: 'Meet high IT performance and security demands across traditional and cloud instances.'
    },
    zslblb2: {
        id: 'zslblb2',
        description: 'zero state left bullet list b2',
        defaultMessage: 'Gain operational confidence through enhanced visibility into IT environments.'
    },
    zslblb3: {
        id: 'zslblb3',
        description: 'zero state left bullet list b3',
        defaultMessage: 'Optimize staff efficiency and extend Linux skills.'
    },
    zslblb4: {
        id: 'zslblb4',
        description: 'zero state left bullet list b4',
        defaultMessage: 'Shift teams to focus on delivering innovation.'
    },
    zslblb5: {
        id: 'zslblb5',
        description: 'zero state left bullet list b5',
        defaultMessage: 'Control complexity by working with fewer and more reliable configurations.'
    },
    zsrblTitle: {
        id: 'zsrblTitle',
        description: 'zero state right bullet list title',
        defaultMessage: 'Continually manage vulnerability risks'
    },
    zsrblBody: {
        id: 'zsrblBody',
        description: 'zero state right bullet body',
        defaultMessage: 'Identify risks in advance, and filter to focus on the most important ones. Continually analyze against a large volume of Red Hat industry vulnerability and compliance advisories, as well as your own policies without manual steps.'
    },
    zsrblb1: {
        id: 'zsrblb1',
        description: 'zero state right bullet list b1',
        defaultMessage: 'Implement more defined analytics-driven processes for risk assessment and prioritization.'
    },
    zsrblb2: {
        id: 'zsrblb2',
        description: 'zero state right bullet list b2',
        defaultMessage: 'Remediate prioritized risks using easy to understand guidance or Ansible ™ Playbooks to address threats at scale.'
    },
    zsrblb3: {
        id: 'zsrblb3',
        description: 'zero state right bullet list b3',
        defaultMessage: 'Gain visibility into your posture regarding security vulnerabilities, industry compliance, and internally defined security policies.'
    },
    zsrblb4: {
        id: 'zsrblb4',
        description: 'zero state right bullet list b4',
        defaultMessage: 'Easily create audience-appropriate reporting.'
    },
    zsrblb5: {
        id: 'zsrblb5',
        description: 'zero state right bullet list b5',
        defaultMessage: 'Implement predictable processes. Shift teams to more predictable processes for continuous security visibility.'
    },

    zssampleTitleL: {
        id: 'zssampleTitleL',
        description: 'zero state sample title left',
        defaultMessage: 'Latest security vulnerabilities affecting RHEL infrastructures'
    },
    zssampleTitleR: {
        id: 'zssampleTitleR',
        description: 'zero state sample title right',
        defaultMessage: 'CVSS Base Score'
    },
    zssampleActionButton: {
        id: 'zssampleActionButton',
        description: 'zero state sample call to action button',
        defaultMessage: 'Register systems to find issues across your infrastructure'
    },
    rosSystemsNotConfiguredMessage: {
        id: 'rosSystemsNotConfiguredMessage',
        description: 'no systems configured with resource optimization message',
        defaultMessage: 'No systems configured yet? Get started with resource optimization.'
    },
    rosSystemsGenericMessage: {
        id: 'rosSystemsGenericMessage',
        description: 'when systems details are available in the resource optimization message',
        defaultMessage: 'Red Hat recommends to assess and monitor cloud usage and optimization on these systems.'
    },
    waitingForData: {
        id: 'waitingForData',
        description: 'Resource Optimization - Waiting for data',
        defaultMessage: 'Systems waiting for data'
    },
    systemsWithSuggestions: {
        id: 'systemsWithSuggestions',
        description: 'Resource Optimization - Systems with suggestions',
        defaultMessage: 'Systems with suggestions'
    },
    totalSystems: {
        id: 'totalSystems',
        description: 'Resource Optimization - total Systems',
        defaultMessage: 'Total systems'
    },

    // Card headers
    footerTitle: {
        id: 'footerTitle',
        description: 'Footer section title',
        defaultMessage: 'Setup additional services'
    },

    // Card headers
    advisorCardHeader1: {
        id: 'advisorCardHeader1',
        description: 'Advisor card header 1',
        defaultMessage: 'Advisor recommendations'
    },
    advisorCardHeader2: {
        id: 'advisorCardHeader2',
        description: 'Advisor card header 2',
        defaultMessage: 'Recommendations by total risk'
    },
    advisorCardHeader3: {
        id: 'advisorCardHeader3',
        description: 'Advisor card header 3',
        defaultMessage: 'Recommendations by category'
    },
    policiesCardHeader: {
        id: 'policiesCardHeader',
        description: 'Policies card header',
        defaultMessage: 'Policies'
    },
    remediationsCardHeader: {
        id: 'remediationsCardHeader',
        description: 'Remediations card header',
        defaultMessage: 'Remediations'
    },
    resourceOptimizationCardHeader: {
        id: 'resourceOptimizationCardHeader',
        description: 'Resource optimization card header',
        defaultMessage: 'Resource optimization'
    },

    // Card CTAs
    advisorCardCTA: {
        id: 'advisorCardCTA',
        description: 'Advisor card CTA',
        defaultMessage: 'View incidents'
    },
    policiesCardCTA: {
        id: 'policiesCardCTA',
        description: 'Policies CTA',
        defaultMessage: 'View all policies'
    },
    rosCardConfigureSystemsCTA: {
        id: 'rosCardConfigureSystemsCTA',
        description: 'Resource Optimization Configure Systems CTA',
        defaultMessage: 'Get started with configuration'
    },
    rosCardViewSystemsCTA: {
        id: 'rosCardViewSystemsCTA',
        description: 'Resource Optimization View Systems CTA',
        defaultMessage: 'View systems'
    },

    // Card messages
    advisorCardMessage: {
        id: 'advisorCardMessage',
        description: 'Advisor card message',
        defaultMessage: 'Problematic conditions that cause an issue have been actively detected on your systems'
    },
    complianceAppBlockHeader: {
        id: 'complianceAppBlockHeader',
        description: 'compliance app block header',
        defaultMessage: 'Compliance'
    },
    remediationsAppBlockHeader: {
        id: 'remediationsAppBlockHeader',
        description: 'Remediations app block header',
        defaultMessage: 'Remediations'
    },
    complianceAppBlockBody: {
        id: 'complianceAppBlockBody',
        description: 'compliance app block body',
        defaultMessage: 'Easily identify and manage security compliance issues in the RHEL infrastructure.'
    },
    remediationsAppBlockBody: {
        id: 'remediationsAppBlockBody',
        description: 'Remediations app block body',
        defaultMessage: 'Fully automate resolution procedures tailored to each system. Either remediate issues manually or create Ansible Playbooks.'
    },
    viewDetails: {
        id: 'viewDetails',
        description: 'View details',
        defaultMessage: 'View details'
    },
    moreAbout: {
        id: 'moreAbout',
        description: 'More about Red Hat\'s response',
        defaultMessage: 'More about Red Hat\'s response'
    },
    systemsExposed: {
        id: 'systemsExposed',
        description: 'Systems exposed',
        defaultMessage: 'Systems exposed'
    },
    collapse: {
        id: 'collapse',
        description: 'collapse',
        defaultMessage: 'Collapse'
    },
    collapseAll: {
        id: 'collapseAll',
        description: 'collapse all',
        defaultMessage: 'Collapse all'
    },
    expand: {
        id: 'expand',
        description: 'expand',
        defaultMessage: 'Expand'
    },
    latestCritical: {
        id: 'latestCritical',
        description: 'latestCritical',
        defaultMessage: 'Latest critical notifications on your systems'
    },
    exploitedCveTooltip: {
        id: 'exploitedCveTooltip',
        description: 'exploitedCveTooltip',
        defaultMessage: 'These CVEs are identified with a "Known Exploit" flag because Red Hat has determined that there are known examples of exploits for this particular CVEs. It does not reflect your environment. CVEs with this label should be addressed with higher priority.'
    }
});
