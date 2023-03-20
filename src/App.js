import './App.scss';

import React, { createContext, useEffect, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { setSIDs, setSelectedTags, setWorkloads } from './AppActions';

import API from './Utilities/Api';
import { INVENTORY_TOTAL_FETCH_URL } from './AppConstants';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from './PresentationalComponents/PageLoading/PageLoading';
import PropTypes from 'prop-types';
import { Routes } from './Routes';

export const PermissionContext = createContext();

const App = (props) => {
    const chrome = useChrome();
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState({
        customPolicies: false,
        compliance: false,
        drift: false,
        advisor: false,
        remediations: false,
        patch: false,
        vulnerability: false,
        subscriptions: false,
        ros: false,
        notifications: false
    });
    const [arePermissionsReady, setArePermissionReady] = useState(false);
    const [hasSystems, setHasSystems] = useState();

    async function initChrome() {
        chrome.identifyApp('dashboard');

        chrome?.globalFilterScope?.('insights');
        if (chrome?.globalFilterScope) {
            chrome.on('GLOBAL_FILTER_UPDATE', ({ data }) => {
                const [workloads, SID, selectedTags] = chrome?.mapGlobalFilter?.(data, false, true);
                batch(() => {
                    dispatch(setWorkloads(workloads));
                    dispatch(setSIDs(SID));
                    dispatch(setSelectedTags(selectedTags));
                });
            });
        }

        // TODO: Update this function to query multiple apps instead of empty request (limited by API)
        chrome.getUserPermissions('', true).then(
            dashboardPermissions => {
                const permissionList = dashboardPermissions.length && dashboardPermissions.map(permissions => permissions.permission);
                if (permissionList.length) {
                    setPermissions({
                        customPolicies: permissionList.includes('custom-policies:*:*'),
                        compliance: permissionList.includes('compliance:*:*'),
                        drift: permissionList.includes('drift:*:*'),
                        advisor: permissionList.includes('insights:*:*') ||
                            permissionList.includes('advisor:*:*'),
                        remediations: permissionList.includes('remediations:*:*') ||
                            permissionList.includes('remediations:remediation:*') ||
                            permissionList.includes('remediations:remediation:read') ||
                            permissionList.includes('remediations:*:read'),
                        patch: permissionList.includes('patch:*:*'),
                        vulnerability: permissionList.includes('vulnerability:*:*') ||
                            permissionList.includes('vulnerability:vulnerability_results:read'),
                        subscriptions: permissionList.includes('subscriptions:*:*') ||
                            permissionList.includes('subscriptions:reports:read'),
                        ros: permissionList.includes('ros:*:*') ||
                            permissionList.includes('ros:*:read'),
                        notifications: permissionList.includes('notifications:*:*') ||
                            permissionList.includes('notifications:events:read')
                    });
                }

                setArePermissionReady(true);
            }
        );
        try {
            const { total } = (await API.get(`${INVENTORY_TOTAL_FETCH_URL}`))?.data || { total: 0 };
            setHasSystems(total > 0);
            total === 0 && chrome.hideGlobalFilter();
        } catch (e) {
            chrome.hideGlobalFilter();
        }
    }

    useEffect(() => {
        initChrome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        arePermissionsReady ?
            <PermissionContext.Provider
                value={ {
                    customPolicies: permissions.customPolicies,
                    compliance: permissions.compliance,
                    drift: permissions.drift,
                    advisor: permissions.advisor,
                    remediations: permissions.remediations,
                    patch: permissions.patch,
                    vulnerability: permissions.vulnerability,
                    subscriptions: permissions.subscriptions,
                    ros: permissions.ros,
                    notifications: permissions.notifications,
                    hasSystems
                } }>
                <Routes childProps={ props } />
            </PermissionContext.Provider>
            : <PageLoading />
    );
};

App.propTypes = {
    history: PropTypes.object
};

export default App;
