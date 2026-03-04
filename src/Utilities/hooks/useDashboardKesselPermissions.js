import { useMemo } from 'react';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { useFetchDefaultWorkspaceId } from './useKesselWorkspaces';

export const DASHBOARD_KESSEL_RELATIONS = [
    'compliance_report_view',
    'advisor_recommendation_results_view',
    'remediations_view_remediation',
    'patch_system_view',
    'vulnerability_vulnerability_results_view',
    'subscriptions_report_view',
    'ros_read_analysis',
    'notifications_events_view'
];

const FALLBACK_PERMISSIONS = {
    compliance: false,
    advisor: false,
    remediations: false,
    patch: false,
    vulnerability: false,
    subscriptions: false,
    ros: false,
    notifications: false
};

function permissionKeyFromRelation(relation) {
    const keyMap = {
        compliance_report_view: 'compliance',
        advisor_recommendation_results_view: 'advisor',
        remediations_view_remediation: 'remediations',
        patch_system_view: 'patch',
        vulnerability_vulnerability_results_view: 'vulnerability',
        subscriptions_report_view: 'subscriptions',
        ros_read_analysis: 'ros',
        notifications_events_view: 'notifications'
    };
    return keyMap[relation] ?? null;
}

export const useDashboardKesselPermissions = () => {
    const { workspaceId, isLoading: workspaceLoading, error: workspaceError } = useFetchDefaultWorkspaceId();

    const checkParams = useMemo(() => {
        if (!workspaceId) {return null;}

        return getKesselAccessCheckParams({
            requiredPermissions: DASHBOARD_KESSEL_RELATIONS,
            resourceIdOrIds: workspaceId
        });
    }, [workspaceId]);

    const { data, loading, error } = useSelfAccessCheck(checkParams ?? { resources: [] });

    const permissions = useMemo(() => {
        if (workspaceLoading) {return FALLBACK_PERMISSIONS;}

        if (!workspaceId || workspaceError || error) {return FALLBACK_PERMISSIONS;}

        const permissions = { ...FALLBACK_PERMISSIONS };
        const items = data ?? [];
        items.forEach((item) => {
            const relation = item.relation ?? item.resource?.relation;
            const key = permissionKeyFromRelation(relation);
            if (key) {permissions[key] = item.allowed === true;}
        });
        return permissions;
    }, [workspaceId, workspaceLoading, workspaceError, data, error]);

    const isLoading = workspaceLoading || (workspaceId !== null && loading);

    return { permissions, isLoading };
};
