import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from './PresentationalComponents/Loading/Loading';

const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */ './PresentationalComponents/Dashboard/Dashboard'));
export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={ () => <Suspense fallback={ <Loading /> }> <Dashboard /> </Suspense> } rootClass='dashboard' />
        </Switch>
    );
};
