/* eslint-disable camelcase */
import { DEFAULT_ROW_COUNT } from '@redhat-cloud-services/frontend-components-utilities';
import hostsFixtures from '../fixtures/hosts.json';

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
