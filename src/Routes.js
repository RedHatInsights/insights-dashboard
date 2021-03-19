import React, { Suspense, lazy } from 'react';

import Loading from './PresentationalComponents/Loading/Loading';
import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'dashboard-route' */ './PresentationalComponents/Dashboard/Dashboard'));

export const Routes = () => <Route exact path='/'rootClass='dashboard'
    component={() => <Suspense fallback={<Loading />}> <Dashboard /> </Suspense>}  />;
