import React, { Suspense, lazy } from 'react';

import Loading from './PresentationalComponents/Loading/Loading';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'DashboardRoute' */ './PresentationalComponents/Dashboard/Dashboard'));
const ZeroState = lazy(() => import(/* webpackChunkName: "ZeroStateRoute" */ './PresentationalComponents/ZeroState/ZeroState'));

export const DashboardRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path='/start' element={<ZeroState />} />
                <Route path='/*' element={<Dashboard />} />
            </Routes>
        </Suspense>
    );
};
