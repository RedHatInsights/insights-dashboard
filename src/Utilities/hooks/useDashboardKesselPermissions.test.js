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

describe('useDashboardKesselPermissions', () => {
  beforeEach(() => {
    useKesselWorkspaceIds.mockReturnValue({
      workspaceIds: ['workspace-list-1'],
      isLoading: false,
      error: false,
    });
    useFetchDefaultWorkspaceId.mockReturnValue({
      workspaceId: 'workspace-123',
      isLoading: false,
      error: null,
    });
    useSelfAccessCheck.mockReturnValue({
      data: [
        { relation: 'compliance_report_view', allowed: true },
        { relation: 'advisor_recommendation_results_view', allowed: true },
        { relation: 'remediations_view_remediation', allowed: true },
      ],
      loading: false,
      error: null,
    });
  });
  it('should return fallback permissions while default workspace is still loading', () => {
    useFetchDefaultWorkspaceId.mockReturnValue({
      workspaceId: null,
      isLoading: true,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return fallback permissions while workspace ids are still loading', () => {
    useKesselWorkspaceIds.mockReturnValue({
      workspaceIds: undefined,
      isLoading: true,
      error: false,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return the fallback permissions when the workspace is not found', () => {
    useFetchDefaultWorkspaceId.mockReturnValue({
      workspaceId: null,
      isLoading: false,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return the fallback permissions when no workspace ids are available', () => {
    useKesselWorkspaceIds.mockReturnValue({
      workspaceIds: [],
      isLoading: false,
      error: false,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return the fallback permissions when workspace error occurs', () => {
    useFetchDefaultWorkspaceId.mockReturnValue({
      workspaceId: 'workspace-123',
      isLoading: false,
      error: new Error('Workspace not found'),
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return the fallback permissions when self access check error occurs', () => {
    useSelfAccessCheck.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Self access check error'),
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
    expect(result.current.isLoading).toBe(false);
  });
  it('should return the fallback permissions when self access check loading state is true', () => {
    useSelfAccessCheck.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.permissions).toStrictEqual(FALLBACK_PERMISSIONS);
  });
  it('should return the permissions', () => {
    useFetchDefaultWorkspaceId.mockReturnValue({
      workspaceId: 'workspace-123',
      isLoading: false,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.permissions).toMatchObject({
      compliance: true,
      advisor: true,
      remediations: true,
    });
    expect(result.current.isLoading).toBe(false);
  });
  it('should map permissions from item.resource.relation when item.relation is missing', () => {
    useSelfAccessCheck.mockReturnValue({
      data: [{ resource: { relation: 'patch_system_view' }, allowed: true }],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.permissions.patch).toBe(true);
    expect(result.current.permissions.compliance).toBe(false);
  });
  it('should set permission to false when allowed is not true', () => {
    useSelfAccessCheck.mockReturnValue({
      data: [
        { relation: 'compliance_report_view', allowed: true },
        { relation: 'advisor_recommendation_results_view', allowed: false },
      ],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.permissions.compliance).toBe(true);
    expect(result.current.permissions.advisor).toBe(false);
  });
  it('should set host-centric permissions true when allowed on any workspace', () => {
    useKesselWorkspaceIds.mockReturnValue({
      workspaceIds: ['ws-a', 'ws-b'],
      isLoading: false,
      error: false,
    });
    useSelfAccessCheck.mockImplementation((params) => {
      const resourceCount = params?.resources?.length ?? 0;
      if (resourceCount <= 4) {
        return {
          data: [{ relation: 'compliance_report_view', allowed: true }],
          loading: false,
          error: null,
        };
      }
      return {
        data: [
          {
            allowed: false,
            relation: 'advisor_recommendation_results_view',
            resource: { relation: 'advisor_recommendation_results_view' },
          },
          {
            allowed: true,
            relation: 'advisor_recommendation_results_view',
            resource: { relation: 'advisor_recommendation_results_view' },
          },
        ],
        loading: false,
        error: null,
      };
    });
    const { result } = renderHook(() => useDashboardKesselPermissions());
    expect(result.current.permissions.compliance).toBe(true);
    expect(result.current.permissions.advisor).toBe(true);
  });
});
