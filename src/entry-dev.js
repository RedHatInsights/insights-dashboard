import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { init } from './Store';
import logger from 'redux-logger';
import getBaseName from './Utilities/getBaseName';

const rootEl = document.getElementById('root');

ReactDOM.render(
    <Provider store={ init(logger).getStore() }>
        <Router basename={ getBaseName(window.location.pathname) }>
            <App/>
        </Router>
    </Provider>,

    rootEl,
    () => rootEl.setAttribute('data-ouia-safe', true)
);
