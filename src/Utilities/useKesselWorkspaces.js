import { useQuery } from '@tanstack/react-query';

const RBAC_API_BASE_V2 = '/api/rbac/v2';

/**
 * Hook to fetch workspaces from RBAC v2 API
 */
export const useKesselWorkspaces = (options = {}) => {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: async () => {
            const response = await fetch(
                `${RBAC_API_BASE_V2}/workspaces/?limit=1000&type=default`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data || [];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options
    });
};

/**
 * Hook to get the default (first) workspace
 * Used for simple scenarios where only one workspace is needed
 */
export const useDefaultWorkspace = () => {
    const { data: workspaces, isLoading, error } = useKesselWorkspaces();
    const defaultWorkspace = workspaces?.[0];

    return {
        workspaceId: defaultWorkspace?.id,
        isLoading,
        error
    };
};
