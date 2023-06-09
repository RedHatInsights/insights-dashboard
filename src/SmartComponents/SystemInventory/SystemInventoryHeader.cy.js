import React, { Suspense } from 'react';
import SystemInventoryHeader from './SystemInventoryHeader';
const { mount } = require('cypress/react');
import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { Provider } from 'react-redux';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { init } from '../../Store';
import messages from '../../../locales/data.json';
import { hostsInterceptors } from '../../../cypress/support/interceptors';

before(() => {
    cy.mockWindowChrome();
});

describe('Dashboard', () => {
    beforeEach(() => {
        hostsInterceptors.successful();
        mount(
            <IntlProvider messages={messages}>
                <Provider store={ init().getStore() }>
                    <Suspense fallback={ <Loading /> }>
                        <SystemInventoryHeader />
                    </Suspense>
                </Provider>
            </IntlProvider>
        );
    });
    it('the amount of stale systems is correct', () => {
        cy.get('div[class="insd-c-dashboard__info-inline  insd-m-padding-top"]').eq(0).should('have.text', '630 stale systems');
    });
    it('the amount of stale systems to remove is correct', () => {
        cy.get('div[class="insd-c-dashboard__info-inline  insd-m-padding-top"]').eq(1).should('have.text', '630 systems to be removed');
    });
});
