// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// one of the fec dependencies talks to window.insights.chrome
import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../src/Store';
import messages from '../../locales/data.json';
import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { mount } from '@cypress/react';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';

Cypress.Commands.add('mountWithContext', (Component, props) => {

    return mount(
        <IntlProvider messages={messages}>
            <Provider store={ init().getStore() }>
                <Component {...props}/>
            </Provider>
        </IntlProvider>
    );
});

Cypress.Commands.add('mockWindowChrome', () => {
    cy.window().then(
        // one of the fec dependencies talks to window.insights.chrome
        (window) =>
            (window.insights = {
                chrome: {
                    getUserPermissions: () => ['inventory:*:*'], // enable all read/write features
                    auth: {
                        getUser: () => {
                            return Promise.resolve({});
                        }
                    }
                }
            })
    );
});
