import React, { useState, createContext, useEffect } from 'react';
import propTypes from 'prop-types';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from '../PageLoading/PageLoading';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { useKesselWorkspaces } from '../../Utilities/useKesselWorkspaces';

export const PermissionContext = createContext();

// RBAC v1 permission checking (legacy)
const useRbacV1Permissions = (chrome) => {
    const [permissions, setPermissions] = useState({
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
    }, [chrome]);

    return { permissions, arePermissionsReady };
};

// Kessel v2 permission checking
const useKesselPermissions = () => {
    const { data: workspaces, isLoading: workspacesLoading } = useKesselWorkspaces({
        enabled: true
    });

    // Check if user has view permission on any workspace for each service
    // For dashboard, we just need to know if user can access the service at all
    const hasAnyWorkspace = workspaces && workspaces.length > 0;

    return {
        permissions: {
            // For MVP: if user has any workspaces, show all cards
            // Individual services will handle their own workspace filtering
            compliance: hasAnyWorkspace,
            advisor: hasAnyWorkspace,
            remediations: hasAnyWorkspace,
            patch: hasAnyWorkspace,
            vulnerability: hasAnyWorkspace,
            subscriptions: hasAnyWorkspace,
            ros: hasAnyWorkspace,
            notifications: hasAnyWorkspace
        },
        arePermissionsReady: !workspacesLoading
    };
};

const PermissionsProvider = ({ children }) => {
    const chrome = useChrome();
    const isKesselEnabled = useFeatureFlag('hbi.kessel-migration');

    // Call both hooks unconditionally (Rules of Hooks)
    const rbacV1Result = useRbacV1Permissions(chrome);
    const kesselResult = useKesselPermissions();

    // Use Kessel or RBAC v1 based on feature flag
    const { permissions, arePermissionsReady } = isKesselEnabled ? kesselResult : rbacV1Result;

    return arePermissionsReady ? (
        <PermissionContext.Provider
            value={{
                compliance: permissions.compliance,
                advisor: permissions.advisor,
                remediations: permissions.remediations,
                patch: permissions.patch,
                vulnerability: permissions.vulnerability,
                subscriptions: permissions.subscriptions,
                ros: permissions.ros,
                notifications: permissions.notifications
            }}>
            {children}
        </PermissionContext.Provider>
    ) : <PageLoading />;
};

PermissionsProvider.propTypes = {
    children: propTypes.element
};
export default PermissionsProvider;
