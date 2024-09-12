import './App.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { setSIDs, setSelectedTags, setWorkloads } from './AppActions';

import API from './Utilities/Api';
import { INVENTORY_TOTAL_FETCH_URL } from './AppConstants';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from './PresentationalComponents/PageLoading/PageLoading';
import { DashboardRoutes } from './DashboardRoutes';
import PermissionsProvider from './PresentationalComponents/PermissionsProvider/PermissionsProvider';
import ZeroState from './PresentationalComponents/ZeroState/ZeroState';

const App = (props) => {
    const chrome = useChrome();
    const dispatch = useDispatch();
    const [hasSystems, setHasSystems] = useState(false);
    const [systemsLoading, setSystemsLoading] = useState(true);

    useEffect(() => {
        chrome?.globalFilterScope?.('insights');
        if (chrome?.globalFilterScope) {
            chrome.on('GLOBAL_FILTER_UPDATE', ({ data }) => {
                const [workloads, SID, selectedTags] = chrome.mapGlobalFilter(data, false, true);
                batch(() => {
                    dispatch(setWorkloads(workloads));
                    dispatch(setSIDs(SID));
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
    }, []);

    return systemsLoading ? <PageLoading />
        : (
            <PermissionsProvider>
                {hasSystems ? <DashboardRoutes childProps={ props } /> : <ZeroState/>}
            </PermissionsProvider>
        );
};

export default App;
