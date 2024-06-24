/* eslint-disable no-console */
import React from 'react';
import App from './App';
import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { Provider } from 'react-redux';
import { init } from './Store';
import messages from '../locales/data.json';

const store = init().getStore();
const locale = navigator.language.slice(0, 2);

const AppEntry = () => (
    <IntlProvider locale={ locale } messages={ messages }>
        <Provider store={ store }>
            <App />
        </Provider>
    </IntlProvider>
);

export default AppEntry;
