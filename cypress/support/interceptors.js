/* eslint-disable camelcase */
import { DEFAULT_ROW_COUNT } from '@redhat-cloud-services/frontend-components-utilities';
import hostsFixtures from '../fixtures/hosts.json';
import cvesFixtures from '../fixtures/cves.json';

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

export const cvesInterceptors = {
    successful: (fixtures = cvesFixtures) => {
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', {
            statusCode: 200,
            body: fixtures
        }).as('getCVES');
    },
    'successful empty': () => {
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', {
            statusCode: 200,
            body: {
                cves_by_severity: {},
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
        }).as('getCVES');
    },
    'failed with server error': () => {
        Cypress.on('uncaught:exception', () => {
            return false;
        });
        cy.intercept('GET', '/api/vulnerability/v1/dashboard*', { statusCode: 500 }).as(
            'getCVES'
        );
    }
};
