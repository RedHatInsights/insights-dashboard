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
    });
    it('renders correctly', () => {
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
});
