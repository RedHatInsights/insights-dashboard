const { IntlProvider } = require('@redhat-cloud-services/frontend-components-translations');
const { mount } = require('cypress/react');
const { default: DeniedState } = require('./DeniedState');
import React from 'react';

import messages from '../../../locales/data.json';

describe('DeniedState', () => {
    it('renders correctly', () => {
        mount(
            <IntlProvider messages={messages}>
                <DeniedState appName={'Foobar'}/>
            </IntlProvider>
        );
        cy.get('.pf-c-empty-state').find('.pf-c-title').should('have.text', ' You do not have access to Foobar ');
    });
});
