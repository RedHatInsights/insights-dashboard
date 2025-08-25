import React, { useState, createContext, useEffect } from 'react';
import propTypes from 'prop-types';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from '../PageLoading/PageLoading';

export const PermissionContext = createContext();

const PermissionsProvider = ({ children }) => {
    const chrome = useChrome();
    const [permissions, setPermissions] = useState({
        customPolicies: false,
        compliance: false,
        advisor: false,
        remediations: false,
        patch: false,
        vulnerability: false,
        subscriptions: false,
        ros: false,
        notifications: false
    });
    const [arePermissionsReady, setArePermissionReady] = useState(false);

    useEffect(() => {
        chrome.getUserPermissions('', true).then(
            dashboardPermissions => {
                const permissionList = dashboardPermissions.length && dashboardPermissions.map(permissions => permissions.permission);
                if (permissionList.length) {
                    setPermissions({
                        customPolicies: permissionList.includes('custom-policies:*:*'),
                        compliance: permissionList.includes('compliance:*:*'),
                        advisor: permissionList.includes('insights:*:*') || (
                            (permissionList.includes('inventory:*:read') || permissionList.includes('inventory:hosts:read')) &&
                            (permissionList.includes('advisor:*:*') || permissionList.includes('advisor:*:read'))
                        ),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return arePermissionsReady ? (
        <PermissionContext.Provider
            value={ {
                customPolicies: permissions.customPolicies,
                compliance: permissions.compliance,
                advisor: permissions.advisor,
                remediations: permissions.remediations,
                patch: permissions.patch,
                vulnerability: permissions.vulnerability,
                subscriptions: permissions.subscriptions,
                ros: permissions.ros,
                notifications: permissions.notifications
            } }>
            {children}
        </PermissionContext.Provider>
    ) : <PageLoading />;
};

PermissionsProvider.propTypes = {
    children: propTypes.element
};
export default PermissionsProvider;
