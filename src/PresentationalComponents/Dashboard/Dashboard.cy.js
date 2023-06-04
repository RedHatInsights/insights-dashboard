import Dashboard from './Dashboard';
const { mount } = require('cypress/react');
import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { init } from '../../Store';
import messages from '../../../locales/data.json';
import { PermissionContext } from '../../App';

const Fallback = () => <div />;

describe('Dashboard', () => {
    it('renders correctly', () => {
        cy.once('uncaught:exception', () => false);
        mount(
            <Suspense fallback={<Fallback />}>
                <IntlProvider
                    locale={navigator.language.slice(0, 2)}
                    messages={messages}
                    onError={console.log}
                >
                    <Provider store={ init().getStore() }>
                        <PermissionContext.Provider
                            value={{
                                customPolicies: true,
                                compliance: true,
                                drift: true,
                                advisor: true,
                                remediations: true,
                                patch: true,
                                vulnerability: true,
                                subscriptions: true,
                                ros: true,
                                notifications: true,
                                hasSystems: true
                            }}
                        >
                            <Dashboard />
                        </PermissionContext.Provider>
                    </Provider>
                </IntlProvider>
            </Suspense>
        );
    });
});
