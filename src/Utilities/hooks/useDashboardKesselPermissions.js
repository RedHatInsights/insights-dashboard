import { useMemo } from 'react';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { useFetchDefaultWorkspaceId } from './useKesselDefaultWorkspaceId';

const RELATION_TO_WIDGET = {
  compliance_report_view: 'compliance',
  remediations_view_remediation: 'remediations',
  subscriptions_report_view: 'subscriptions',
  notifications_events_view: 'notifications',
  advisor_recommendation_results_view_assigned: 'advisor',
  patch_system_view_assigned: 'patch',
  vulnerability_vulnerability_results_view_assigned: 'vulnerability',
  ros_read_analysis_assigned: 'ros',
};

const FALLBACK_PERMISSIONS = Object.fromEntries(
  Object.values(RELATION_TO_WIDGET).map((widget) => [widget, false]),
);

export const useDashboardKesselPermissions = () => {
  const {
    workspaceId,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useFetchDefaultWorkspaceId();

  const checkParams = useMemo(
    () =>
      getKesselAccessCheckParams({
        requiredPermissions: Object.keys(RELATION_TO_WIDGET),
        resourceIdOrIds: workspaceId,
      }),
    [workspaceId],
  );

  const { data, loading, error } = useSelfAccessCheck(checkParams);

  const permissions = useMemo(() => {
    if (!workspaceId || workspaceError || error) {
      return { ...FALLBACK_PERMISSIONS };
    }

    const resolvedPermissions = { ...FALLBACK_PERMISSIONS };
    (data ?? []).forEach((item) => {
      const key = RELATION_TO_WIDGET[item.relation];
      if (key) {
        resolvedPermissions[key] = item.allowed === true;
      }
    });
    return resolvedPermissions;
  }, [workspaceId, workspaceError, data, error]);

  return {
    permissions,
    isLoading: workspaceLoading || loading,
  };
};
