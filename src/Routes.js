import React, { Suspense, lazy } from 'react';

import Loading from './PresentationalComponents/Loading/Loading';
import { Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'DashboardRoute' */ './PresentationalComponents/Dashboard/Dashboard'));
const ZeroState = lazy(() => import(/* webpackChunkName: "ZeroStateRoute" */ './PresentationalComponents/ZeroState/ZeroState'));

export const Routes = () => (
    <Suspense fallback={<Loading />} >
        <Switch>
            <Route exact path='/start' component={ZeroState} />
            <Route path="*" component={Dashboard} />
        </Switch>
    </Suspense>
);
