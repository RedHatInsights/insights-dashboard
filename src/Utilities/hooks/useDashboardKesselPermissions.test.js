import { renderHook } from '@testing-library/react';
import { useDashboardKesselPermissions } from './useDashboardKesselPermissions';
import { useFetchDefaultWorkspaceId } from './useKesselDefaultWorkspaceId';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';

jest.mock('./useKesselDefaultWorkspaceId', () => ({
  useFetchDefaultWorkspaceId: jest.fn(),
}));
jest.mock('@project-kessel/react-kessel-access-check');

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

const createAccessCheckResult = (overrides = {}) => ({
  data: [],
  loading: false,
  error: null,
  ...overrides,
});

const buildPermissions = (overrides = {}) => ({
  ...FALLBACK_PERMISSIONS,
  ...overrides,
});

const mockDefaultWorkspace = (overrides = {}) => {
  useFetchDefaultWorkspaceId.mockReturnValue({
    workspaceId: 'workspace-123',
    isLoading: false,
    error: null,
    ...overrides,
  });
};

const mockAccessCheck = (overrides = {}) => {
  useSelfAccessCheck.mockReset();
  useSelfAccessCheck.mockReturnValue(createAccessCheckResult(overrides));
};

describe('useDashboardKesselPermissions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockDefaultWorkspace();
    mockAccessCheck({
      data: [
        { relation: 'compliance_report_view', allowed: true },
        { relation: 'remediations_view_remediation', allowed: true },
        {
          relation: 'advisor_recommendation_results_view_assigned',
          allowed: true,
        },
      ],
    });
  });

  it('should return fallback permissions while the default workspace is loading', () => {
    mockDefaultWorkspace({
      workspaceId: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });

  it('should return fallback permissions when the workspace is not found', () => {
    mockDefaultWorkspace({
      workspaceId: null,
      isLoading: false,
      error: null,
    });
    mockAccessCheck({ data: [] });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });

  it('should return fallback permissions when workspace error occurs', () => {
    mockDefaultWorkspace({
      workspaceId: 'workspace-123',
      isLoading: false,
      error: new Error('Workspace not found'),
    });
    mockAccessCheck({ data: [] });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });

  it('should return fallback permissions when the access check errors', () => {
    mockAccessCheck({
      data: null,
      error: new Error('Self access check error'),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return loading true while the access check is in flight', () => {
    mockAccessCheck({
      data: undefined,
      loading: true,
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });

  it('should map org-wide and host-centric assigned relations from one access check', () => {
    mockAccessCheck({
      data: [
        { relation: 'compliance_report_view', allowed: true },
        { relation: 'remediations_view_remediation', allowed: true },
        { relation: 'subscriptions_report_view', allowed: true },
        { relation: 'notifications_events_view', allowed: false },
        {
          relation: 'advisor_recommendation_results_view_assigned',
          allowed: true,
        },
        { relation: 'patch_system_view_assigned', allowed: true },
        {
          relation: 'vulnerability_vulnerability_results_view_assigned',
          allowed: false,
        },
        { relation: 'ros_read_analysis_assigned', allowed: true },
      ],
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions).toStrictEqual(
      buildPermissions({
        compliance: true,
        advisor: true,
        remediations: true,
        patch: true,
        subscriptions: true,
        ros: true,
      }),
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should set permission to false when allowed is not true', () => {
    mockAccessCheck({
      data: [
        { relation: 'compliance_report_view', allowed: true },
        { relation: 'notifications_events_view', allowed: false },
        {
          relation: 'advisor_recommendation_results_view_assigned',
          allowed: false,
        },
      ],
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions.compliance).toBe(true);
    expect(result.current.permissions.advisor).toBe(false);
    expect(result.current.permissions.notifications).toBe(false);
  });
});
