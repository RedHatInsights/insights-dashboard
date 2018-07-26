import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReducerRegistry from './Utilities/ReducerRegistry';
import App from './App';

/**
 * Hooks up redux to app.
 *  https://redux.js.org/advanced/usage-with-react-router
 */
ReactDOM.render(
    <Provider store={ReducerRegistry.getStore()}>
        <Router>
            <App basename='/insights/platform/dashboard'/>
        </Router>
    </Provider>,

    document.getElementById('root')
);
