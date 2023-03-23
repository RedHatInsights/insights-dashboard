import React, { Suspense, lazy } from 'react';

import Loading from './PresentationalComponents/Loading/Loading';
import { Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'DashboardRoute' */ './PresentationalComponents/Dashboard/Dashboard'));
const ZeroState = lazy(() => import(/* webpackChunkName: "ZeroStateRoute" */ './PresentationalComponents/ZeroState/ZeroState'));
const TrialsPage = lazy(() => import(/* webpackChunkName: 'TrialsPageRoute' */ './PresentationalComponents/Trials/TrialsPage'));
const TrialsSuccess = lazy(() => import(/* webpackChunkName: 'TrialsSuccessRoute' */ './PresentationalComponents/Trials/TrialsSuccess'));
/*REMOVE*/
const TempPage = lazy(() => import(/* webpackChunkName: 'TempPageRoute' */ './PresentationalComponents/Trials/TempPage'));
/*REMOVE*/

export const Routes = () => (
    <Suspense fallback={<Loading />} >
        <Switch>
            <Route exact path='/start' component={ZeroState} />
            <Route exact path='/satellite/try-it' component={TrialsPage} />
            <Route exact path='/satellite/try-it/success' component={TrialsSuccess} />
            <Route exact path='/satellite/try-it/temp' component={TempPage} />
            <Route path="*" component={Dashboard} />
        </Switch>
    </Suspense>
);
