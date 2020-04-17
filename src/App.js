import './App.scss';

import React, { useEffect, createContext, useState } from 'react';

import PropTypes from 'prop-types';
import { Routes } from './Routes';

import PageLoading from './PresentationalComponents/PageLoading/PageLoading';

export const PermissionContext = createContext();

const App = (props) => {

    const [permissions, setPermissions] = useState({
        customPolicies: false,
        compliance: false,
        drift: false,
        advisor: false,
        remediations: false,
        patch: false,
        vulnerability: false
    });
    const [isOrgAdmin, setIsOrgAdmin] = useState(false);
    const [arePermissionsReady, setArePermissionReady] = useState(false);

    async function initChrome () {
        insights.chrome.init();
        insights.chrome.identifyApp('dashboard');
        // wait for auth first, otherwise the call to RBAC may 401
        await window.insights.chrome.auth.getUser().then(
            user => setIsOrgAdmin(user.identity.user.is_org_admin)
        );
        // TODO: Update this function to query multiple apps instead of empty request (limited by API)
        insights.chrome.getUserPermissions().then(
            dashboardPermissions => {
                const permissionList = dashboardPermissions.map(permissions => permissions.permission);
                setPermissions({
                    customPolicies: permissionList.includes('custom-policies:*:*'),
                    compliance: permissionList.includes('compliance:*:*'),
                    drift: permissionList.includes('drift:*:*'),
                    advisor: permissionList.includes('insights:*:*'),
                    remediations: permissionList.includes('remediations:*:*') ||
                        permissionList.includes('remediations:remediation:*') ||
                        permissionList.includes('remediations:remediation:read') ||
                        permissionList.includes('remediations:*:read'),
                    patch: permissionList.includes('patch:*:*'),
                    vulnerability: permissionList.includes('vulnerability:*:*')
                });
                setArePermissionReady(true);
            }
        );
    }

    useEffect(() => {
        initChrome();
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
                    subscriptions: true,
                    isOrgAdmin
                } }>
                <Routes childProps={ props } />
            </PermissionContext.Provider>
            : <PageLoading/>
    );
};

App.propTypes = {
    history: PropTypes.object
};

export default App;
