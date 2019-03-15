import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { init } from './Store';
import logger from 'redux-logger';

// exposes webpack variable RELEASE
/*global RELEASE:true*/
/*eslint no-undef: "error"*/

// TODO Router base name needs to support /beta/rhcs and /rhcs

/**
 * Hooks up redux to app.
 *  https://redux.js.org/advanced/usage-with-react-router
 */
ReactDOM.render(
    <Provider store={ init(logger).getStore() }>
        <Router basename={ `/${document.location.pathname.split('/')[1]}/dashboard` }>
            <App />
        </Router>
    </Provider>,

    document.getElementById('root')
);
