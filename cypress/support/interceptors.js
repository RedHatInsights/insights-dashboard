/* eslint-disable camelcase */
import { DEFAULT_ROW_COUNT } from '@redhat-cloud-services/frontend-components-utilities';
import hostsFixtures from '../fixtures/hosts.json';
import vulnerabilityDashboardFixtures from '../fixtures/vulnerabilityDashboard.json';
import advisorRulesDashboardFixtures from '../fixtures/advisorRulesDashboard.json';
import advisorRuleDashboardFixtures from '../fixtures/advisorRuleDashboard.json';
import advisorSystemsDashboardFixtures from '../fixtures/advisorSystemsDashboard.json';
import cvesFixtures from '../fixtures/vulnerabilityCves.json';
import edgeFixtures from '../fixtures/edgeHosts.json';
import featureFlags from '../fixtures/featureFlags.json';

export const hostsInterceptors = {
    successful: (fixtures = hostsFixtures) => {
        cy.intercept('GET', '/api/inventory/v1/hosts*', {
            statusCode: 200,
            body: fixtures
        }).as('getHosts');
    },
    'successful empty': () => {
        cy.intercept('GET', '/api/inventory/v1/hosts*', {
            statusCode: 200,
            body: {
                count: 0,
                page: 1,
                per_page: DEFAULT_ROW_COUNT,
                total: 0,
                results: []
            }
        }).as('getHosts');
    },
    'failed with server error': () => {
        Cypress.on('uncaught:exception', () => {
            return false;
        });
        cy.intercept('GET', '/api/inventory/v1/hosts*', { statusCode: 500 }).as(
            'getHosts'
        );
    }
};

export const edgeInterceptors = {
    successful: (fixtures = edgeFixtures) => {
        cy.intercept('GET', '/api/edge/v1/devices/devicesview*', {
            statusCode: 200,
            body: fixtures
        }).as('getEdgeHosts');
    }
};

export const unleashInterceptors = {
    successful: (fixtures = featureFlags) => {
        cy.intercept('GET', '/feature_flags*', {
            statusCode: 200,
            body: fixtures
        }).as('getFeatureFlags');
    }
};

export const vulnerabilityInterceptors = {
    successful: (fixtures = vulnerabilityDashboardFixtures) => {
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', {
            statusCode: 200,
            body: fixtures
        }).as('getVulnerabilityDashboard');
    },
    'successful empty': () => {
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', {
            statusCode: 200,
            body: {
                cves_by_severity: vulnerabilityDashboardFixtures.cves_by_severity,
                cves_total: 0,
                exploited_cves_count: 0,
                meta: {
                    permissions: [
                        'remediations:remediation:read',
                        'remediations:remediation:write',
                        'inventory:hosts:write',
                        'inventory:hosts:read',
                        'inventory:groups:write',
                        'inventory:groups:read',
                        'inventory:*:read',
                        'vulnerability:*:*',
                        'remediations:*:read',
                        'remediations:*:write',
                        'vulnerability:vulnerability_results:read',
                        'vulnerability:system.opt_out:read',
                        'vulnerability:report_and_export:read',
                        'vulnerability:advanced_report:read'
                    ]
                },
                recent_cves: {},
                recent_rules: [],
                rules_cves_total: 0,
                system_count: 0
            }
        }).as('getVulnerabilityDashboard');
    },
    'failed with server error': () => {
        Cypress.on('uncaught:exception', () => {
            return false;
        });
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', { statusCode: 500 }).as(
            'getVulnerabilityDashboard'
        );
    },
    cvesSuccessful: () => {
        cy.intercept('GET', '/api/vulnerability/v1/vulnerabilities/cves*', {
            statusCode: 200,
            body: cvesFixtures
        }).as('getCVES');
    },
    cvesWithoutEdgeSystemsSuccessful: () => {
        cy.intercept('GET', '/api/vulnerability/v1/vulnerabilities/cves*', {
            statusCode: 200,
            body: { ...cvesFixtures, meta: { ...cvesFixtures.meta, system_count_per_type: { edge: 0, rpmdnf: 10 } } }
        }).as('getCVES');
    }
};

export const advisorInterceptors = {
    rules: (fixtures = advisorRulesDashboardFixtures) => {
        cy.intercept('GET', '/api/insights/v1/stats/rules*', {
            statusCode: 200,
            body: fixtures
        }).as('getAdvisorRulesDashboard');
    },
    systems: (fixtures = advisorSystemsDashboardFixtures) => {
        cy.intercept('GET', 'api/insights/v1/stats/systems*', {
            statusCode: 200,
            body: fixtures
        }).as('getAvisorSystemsDashboard');
    },
    rule: (fixtures = advisorRuleDashboardFixtures) => {
        cy.intercept('GET', 'api/insights/v1/rule/?impacting=true&limit=1&incident=true', {
            statusCode: 200,
            body: fixtures
        }).as('getAdvisorRuleDashboard');
    }
}

export const featureFlagsInterceptors = {
    edgeParityEnabled: () => {
        cy.intercept('GET', '/feature_flags*', {
            statusCode: 200,
            body: {
                toggles: [
                    {
                        name: 'vulnerability.edge_parity',
                        enabled: true,
                        variant: {
                            name: 'disabled',
                            enabled: true
                        }
                    }
                ]
            }
        }).as('getFeatureFlag');
    },
    edgeParityDisabled: () => {
        cy.intercept('GET', '/feature_flags*', {
            statusCode: 200,
            body: {
                toggles: [
                    {
                        name: 'vulnerability.edge_parity',
                        enabled: false,
                        variant: {
                            name: 'disabled',
                            enabled: false
                        }
                    }
                ]
            }
        }).as('getFeatureFlag');
    }
};
