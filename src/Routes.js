import { Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';

/**
 * Aysnc imports of components
 *
 * https://webpack.js.org/guides/code-splitting/
 * https://reactjs.org/docs/code-splitting.html
 *
 * pros:
 *      1) code splitting
 *      2) can be used in server-side rendering
 * cons:
 *      1) nameing chunk names adds unnecessary docs to code,
 *         see the difference with DashboardMap and InventoryDeployments.
 *
 */
const Dashboard = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './SmartComponents/Dashboard/Dashboard'));

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-l-page__main');
    root.setAttribute('role', 'main');

    return (<Component {...rest} />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insightsbeta/platform/dashboard
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = () => {
    return (
        <Switch>
            <InsightsRoute exact path='/' component={Dashboard} rootClass='dashboard' />

            {/* Finally, catch all unmatched routes */}
            <Redirect to='/' />
        </Switch>
    );
};
