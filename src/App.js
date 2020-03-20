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
        insights: false,
        remediations: false,
        patch: false,
        vulnerability: false
    });
    const [arePermissionsReady, setArePermissionReady] = useState(false);

    useEffect(() => {
        insights.chrome.init();
        insights.chrome.identifyApp('dashboard');
        insights.chrome.getUserPermissions().then(
            insightsPermissions => {
                const permissionList = insightsPermissions.map(permissions => permissions.permission);
                setPermissions({
                    customPolicies: permissionList.includes('custom-policies:*:*'),
                    compliance: permissionList.includes('compliance:*:*'),
                    drift: permissionList.includes('drift:*:*'),
                    insights: permissionList.includes('insights:*:*'),
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
    }, []);

    return (
        arePermissionsReady ?
            <PermissionContext.Provider
                value={ {
                    customPolicies: permissions.customPolicies,
                    compliance: permissions.compliance,
                    drift: permissions.drift,
                    insights: permissions.insights,
                    remediations: permissions.remediations,
                    patch: permissions.patch,
                    vulnerability: permissions.vulnerability
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
