import { renderHook } from '@testing-library/react';
import { useDashboardKesselPermissions } from './useDashboardKesselPermissions';
import { useFetchDefaultWorkspaceId } from './useKesselDefaultWorkspaceId';
import { useKesselWorkspaceIds } from './useKesselWorkspaceIds';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';

jest.mock('./useKesselDefaultWorkspaceId', () => ({
  useFetchDefaultWorkspaceId: jest.fn(),
}));
jest.mock('./useKesselWorkspaceIds');
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

const mockWorkspaceIds = (overrides = {}) => {
  useKesselWorkspaceIds.mockReturnValue({
    workspaceIds: ['workspace-list-1'],
    isLoading: false,
    error: false,
    ...overrides,
  });
};

const mockAccessChecks = ({
  defaultCheck = createAccessCheckResult({
    data: [
      { relation: 'compliance_report_view', allowed: true },
      { relation: 'remediations_view_remediation', allowed: true },
    ],
  }),
  hostCentricCheck = createAccessCheckResult({
    data: [{ relation: 'advisor_recommendation_results_view', allowed: true }],
  }),
} = {}) => {
  useSelfAccessCheck.mockReset();
  useSelfAccessCheck.mockReturnValue(createAccessCheckResult());
  useSelfAccessCheck.mockReturnValueOnce(defaultCheck);
  useSelfAccessCheck.mockReturnValueOnce(hostCentricCheck);
};

describe('useDashboardKesselPermissions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockWorkspaceIds();
    mockDefaultWorkspace();
    mockAccessChecks();
  });

  it('should expose host-centric permissions while default workspace is still loading', () => {
    mockDefaultWorkspace({
      workspaceId: null,
      isLoading: true,
      error: null,
    });

    mockAccessChecks({
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: true },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({ advisor: true }),
    );
  });

  it('should expose default workspace permissions while workspace ids are still loading', () => {
    mockWorkspaceIds({
      workspaceIds: undefined,
      isLoading: true,
      error: false,
    });

    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'remediations_view_remediation', allowed: true },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: undefined,
        loading: true,
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({
        compliance: true,
        remediations: true,
      }),
    );
  });

  it('should return host-centric permissions when the workspace is not found', () => {
    mockDefaultWorkspace({
      workspaceId: null,
      isLoading: false,
      error: null,
    });

    mockAccessChecks({
      defaultCheck: createAccessCheckResult({ data: [] }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: true },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({ advisor: true }),
    );
  });

  it('should return default workspace permissions when no workspace ids are available', () => {
    mockWorkspaceIds({
      workspaceIds: [],
      isLoading: false,
      error: false,
    });

    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'remediations_view_remediation', allowed: true },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({ data: [] }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({
        compliance: true,
        remediations: true,
      }),
    );
  });

  it('should return host-centric permissions when workspace error occurs', () => {
    mockDefaultWorkspace({
      workspaceId: 'workspace-123',
      isLoading: false,
      error: new Error('Workspace not found'),
    });

    mockAccessChecks({
      defaultCheck: createAccessCheckResult({ data: [] }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: true },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({ advisor: true }),
    );
  });

  it('should keep host-centric permissions when default workspace access check errors', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: null,
        error: new Error('Self access check error'),
      }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: true },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions).toStrictEqual(
      buildPermissions({ advisor: true }),
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should keep default workspace permissions while host-centric access check is loading', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'remediations_view_remediation', allowed: true },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: undefined,
        loading: true,
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(
      buildPermissions({
        compliance: true,
        remediations: true,
      }),
    );
  });

  it('should keep default workspace permissions when host-centric access check errors', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'remediations_view_remediation', allowed: true },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: null,
        error: new Error('Host-centric access check error'),
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions).toStrictEqual(
      buildPermissions({
        compliance: true,
        remediations: true,
      }),
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should return merged permissions from both access checks', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'remediations_view_remediation', allowed: true },
          { relation: 'subscriptions_report_view', allowed: true },
          { relation: 'notifications_events_view', allowed: false },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: true },
          { relation: 'patch_system_view', allowed: true },
          {
            relation: 'vulnerability_vulnerability_results_view',
            allowed: false,
          },
          { relation: 'ros_read_analysis', allowed: true },
        ],
      }),
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

  it('should map permissions from item.resource.relation when item.relation is missing', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({ data: [] }),
      hostCentricCheck: createAccessCheckResult({
        data: [{ resource: { relation: 'patch_system_view' }, allowed: true }],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions.patch).toBe(true);
    expect(result.current.permissions.compliance).toBe(false);
  });

  it('should set permission to false when allowed is not true', () => {
    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [
          { relation: 'compliance_report_view', allowed: true },
          { relation: 'notifications_events_view', allowed: false },
        ],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          { relation: 'advisor_recommendation_results_view', allowed: false },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions.compliance).toBe(true);
    expect(result.current.permissions.advisor).toBe(false);
    expect(result.current.permissions.notifications).toBe(false);
  });

  it('should set host-centric permissions true when allowed on any workspace', () => {
    mockWorkspaceIds({
      workspaceIds: ['ws-a', 'ws-b'],
      isLoading: false,
      error: false,
    });

    mockAccessChecks({
      defaultCheck: createAccessCheckResult({
        data: [{ relation: 'compliance_report_view', allowed: true }],
      }),
      hostCentricCheck: createAccessCheckResult({
        data: [
          {
            allowed: false,
            relation: 'advisor_recommendation_results_view',
          },
          {
            allowed: true,
            relation: 'advisor_recommendation_results_view',
          },
        ],
      }),
    });

    const { result } = renderHook(() => useDashboardKesselPermissions());

    expect(result.current.permissions.compliance).toBe(true);
    expect(result.current.permissions.advisor).toBe(true);
  });
});
