/* eslint-disable no-console */
import App from './App';
import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { Provider } from 'react-redux';
import React from 'react';
import { init } from './Store';
import messages from '../locales/data.json';

const AppEntry = () =>
    <IntlProvider locale={ navigator.language.slice(0, 2) } messages={ messages } onError={ console.log }>
        <Provider store={ init().getStore() }>
            <App />
        </Provider>
    </IntlProvider>;

export default AppEntry;
