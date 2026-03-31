import { useMemo } from 'react';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { useFetchDefaultWorkspaceId } from './useKesselDefaultWorkspaceId';
import { useKesselWorkspaceIds } from './useKesselWorkspaceIds';

const DASHBOARD_KESSEL_RELATIONS = [
  'compliance_report_view',
  'remediations_view_remediation',
  'subscriptions_report_view',
  'notifications_events_view',
];

const DASHBOARD_HOST_CENTRIC_KESSEL_RELATIONS = [
  'advisor_recommendation_results_view',
  'patch_system_view',
  'vulnerability_vulnerability_results_view',
  'ros_read_analysis',
];

const FALLBACK_PERMISSIONS = {
  compliance: false,
  advisor: false,
  remediations: false,
  patch: false,
  vulnerability: false,
  subscriptions: false,
  ros: false,
  notifications: false,
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
    notifications_events_view: 'notifications',
  };
  return keyMap[relation] ?? null;
}

export const useDashboardKesselPermissions = () => {
  const {
    workspaceId,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useFetchDefaultWorkspaceId();
  const {
    workspaceIds,
    isLoading: workspacesLoading,
    error: workspacesError,
  } = useKesselWorkspaceIds();

  const checkParams = useMemo(() => {
    return getKesselAccessCheckParams({
      requiredPermissions: DASHBOARD_KESSEL_RELATIONS,
      resourceIdOrIds: workspaceId,
    });
  }, [workspaceId]);

  const hostCentricCheckParams = useMemo(() => {
    return getKesselAccessCheckParams({
      requiredPermissions: DASHBOARD_HOST_CENTRIC_KESSEL_RELATIONS,
      resourceIdOrIds: workspaceIds,
    });
  }, [workspaceIds]);

  const { data, loading, error } = useSelfAccessCheck(checkParams);

  const {
    data: hostCentricData,
    loading: hostCentricLoading,
    error: hostCentricError,
  } = useSelfAccessCheck(hostCentricCheckParams);

  const permissions = useMemo(() => {
    const permissions = { ...FALLBACK_PERMISSIONS };

    if (!workspaceLoading && workspaceId && !workspaceError && !error) {
      const items = data ?? [];
      items.forEach((item) => {
        const relation = item.relation ?? item.resource?.relation;
        const key = permissionKeyFromRelation(relation);
        if (key) {
          permissions[key] = item.allowed === true;
        }
      });
    }

    if (
      !workspacesLoading &&
      workspaceIds?.length &&
      !workspacesError &&
      !hostCentricError
    ) {
      const pendingRelations = new Set(DASHBOARD_HOST_CENTRIC_KESSEL_RELATIONS);
      for (
        let i = 0;
        i < hostCentricData.length && pendingRelations.size > 0;
        i += 1
      ) {
        const item = hostCentricData[i];
        if (item.allowed !== true) {
          continue;
        }
        const relation = item.relation ?? item.resource?.relation;
        if (!pendingRelations.has(relation)) {
          continue;
        }
        const key = permissionKeyFromRelation(relation);
        if (key) {
          permissions[key] = true;
          pendingRelations.delete(relation);
        }
      }
    }

    return permissions;
  }, [
    workspaceId,
    workspaceIds,
    workspaceLoading,
    workspacesLoading,
    workspaceError,
    workspacesError,
    data,
    error,
    hostCentricData,
    hostCentricError,
  ]);

  const isLoading =
    workspaceLoading || workspacesLoading || loading || hostCentricLoading;

  return { permissions, isLoading };
};
