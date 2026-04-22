import { renderHook, waitFor } from '@testing-library/react';
import { useInventoryHostsReadKesselProbe } from './useInventoryHostsReadKesselProbe';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { INVENTORY_TOTAL_FETCH_URL } from '../../AppConstants';

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    useAxiosWithPlatformInterceptors: jest.fn(),
  }),
);

describe('useInventoryHostsReadKesselProbe', () => {
  beforeEach(() => {
    useAxiosWithPlatformInterceptors.mockReset();
  });

  it('sets hasAccess true when the probe succeeds', async () => {
    const get = jest.fn().mockResolvedValue({ data: {} });
    useAxiosWithPlatformInterceptors.mockReturnValue({ get });

    const { result } = renderHook(() => useInventoryHostsReadKesselProbe());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(get).toHaveBeenCalledWith(INVENTORY_TOTAL_FETCH_URL);
    expect(result.current.hasAccess).toBe(true);
  });

  it('sets hasAccess false when the probe returns 403', async () => {
    const err = { response: { status: 403 } };
    const get = jest.fn().mockRejectedValue(err);
    useAxiosWithPlatformInterceptors.mockReturnValue({ get });

    const { result } = renderHook(() => useInventoryHostsReadKesselProbe());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
  });

  it('sets hasAccess true on non-403 errors (same as inventory probe)', async () => {
    const get = jest.fn().mockRejectedValue({ response: { status: 500 } });
    useAxiosWithPlatformInterceptors.mockReturnValue({ get });

    const { result } = renderHook(() => useInventoryHostsReadKesselProbe());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(true);
  });
});
