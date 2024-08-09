import React, { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@patternfly/react-core';

const Dashboard = lazy(() => import(/* webpackChunkName: 'DashboardRoute' */ './PresentationalComponents/Dashboard/Dashboard'));
const ZeroState = lazy(() => import(/* webpackChunkName: "ZeroStateRoute" */ './PresentationalComponents/ZeroState/ZeroState'));

export const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path='/start' element={<Suspense fallback={<Spinner className="pf-u-mt-md" />}><ZeroState /></Suspense>} />
            <Route path='/*' element={<Suspense fallback={<Spinner className="pf-u-mt-md" />}><Dashboard /></Suspense>} />
        </Routes>
    );
};
