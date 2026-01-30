import './App.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { setSelectedTags, setWorkloads } from './AppActions';

import API from './Utilities/Api';
import { INVENTORY_TOTAL_FETCH_URL } from './AppConstants';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from './PresentationalComponents/PageLoading/PageLoading';
import { DashboardRoutes } from './DashboardRoutes';
import PermissionsProvider from './PresentationalComponents/PermissionsProvider/PermissionsProvider';
import ZeroState from './PresentationalComponents/ZeroState/ZeroState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AccessCheck } from '@project-kessel/react-kessel-access-check';
import { useFeatureFlag } from './Utilities/Hooks';

const queryClient = new QueryClient();
const KESSEL_API_PATH = '/api/inventory/v1beta2';

const App = (props) => {
    const chrome = useChrome();
    const dispatch = useDispatch();
    const [hasSystems, setHasSystems] = useState(false);
    const [systemsLoading, setSystemsLoading] = useState(true);
    const isKesselEnabled = useFeatureFlag('hbi.kessel-migration');

    useEffect(() => {
        chrome?.globalFilterScope?.('insights');
        if (chrome?.globalFilterScope) {
            chrome.on('GLOBAL_FILTER_UPDATE', ({ data }) => {
                const [workloads, , selectedTags] = chrome.mapGlobalFilter(data, false, true);
                batch(() => {
                    dispatch(setWorkloads(workloads));
                    dispatch(setSelectedTags(selectedTags));
                });
            });
        }

        API.get(`${INVENTORY_TOTAL_FETCH_URL}`).then(({ data }) => {
            setHasSystems(data?.total > 0);
            data?.total === 0 && chrome.hideGlobalFilter();
            setSystemsLoading(false);
        }).catch(() => {
            chrome.hideGlobalFilter();
            setSystemsLoading(false);
        });
    }, [chrome, dispatch]);

    const content = systemsLoading ? <PageLoading /> : (
        <PermissionsProvider>
            {hasSystems ? <DashboardRoutes childProps={props} /> : <ZeroState />}
        </PermissionsProvider>
    );

    return (
        <QueryClientProvider client={queryClient}>
            {isKesselEnabled ? (
                <AccessCheck.Provider
                    baseUrl={window.location.origin}
                    apiPath={KESSEL_API_PATH}
                >
                    {content}
                </AccessCheck.Provider>
            ) : (
                content
            )}
        </QueryClientProvider>
    );
};

export default App;
