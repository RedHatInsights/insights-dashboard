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
import FlagProvider from '@unleash/proxy-client-react';

Cypress.Commands.add('mountWithContext', (Component, props) => {

    return mount(
        <FlagProvider
            config={{
                url: 'http://localhost:8002/feature_flags',
                clientKey: 'abc',
                appName: 'abc'
            }}
        >
            <IntlProvider messages={messages}>
                <Provider store={ init().getStore() }>
                    <Component {...props}/>
                </Provider>
            </IntlProvider>
        </FlagProvider>
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
