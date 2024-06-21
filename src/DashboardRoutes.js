import React, { Suspense, lazy } from 'react';

import Loading from './PresentationalComponents/Loading/Loading';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'DashboardRoute' */ './PresentationalComponents/Dashboard/Dashboard'));
const ZeroState = lazy(() => import(/* webpackChunkName: "ZeroStateRoute" */ './PresentationalComponents/ZeroState/ZeroState'));

export const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path='/start' element={<Suspense fallback={<Loading />}><ZeroState /></Suspense>} />
            <Route path='/*' element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
        </Routes>
    );
};
