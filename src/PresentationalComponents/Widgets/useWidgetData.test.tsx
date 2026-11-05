import { renderHook, waitFor } from '@testing-library/react';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import type { AxiosInstance } from 'axios';
import { useWidgetData, type WidgetDataState } from './useWidgetData';

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    __esModule: true,
    useAxiosWithPlatformInterceptors: jest.fn(() => mockApiInstance),
  }),
);

const mockApiInstance = { get: jest.fn() } as unknown as AxiosInstance;

const mockUseInterceptors = useAxiosWithPlatformInterceptors as jest.Mock;

const waitForState = async (
  result: { current: { state: WidgetDataState } },
  expected: WidgetDataState,
) => {
  await waitFor(() => expect(result.current.state).toBe(expected));
};

describe('useWidgetData', () => {
  beforeEach(() => {
    mockUseInterceptors.mockImplementation(() => mockApiInstance);
  });

  it('should pass the platform axios instance to the fetcher and reach the default state', async () => {
    const fetcher = jest.fn((api: unknown) =>
      Promise.resolve({ api, total: 42 }),
    );
    const { result } = renderHook(() => useWidgetData(fetcher));

    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledWith(mockApiInstance);
    expect(result.current.data).toEqual({ api: mockApiInstance, total: 42 });
    expect(result.current.error).toBeUndefined();
  });

  it('should report the empty state for empty results', async () => {
    const { result } = renderHook(() =>
      useWidgetData(() => Promise.resolve([])),
    );

    await waitForState(result, 'empty');
  });

  it('should honor a custom isEmpty predicate', async () => {
    const { result } = renderHook(() =>
      useWidgetData(() => Promise.resolve({ total: 0 })),
    );

    // default predicate: { total: 0 } is a non-empty object -> default
    await waitForState(result, 'default');

    const { result: emptyResult } = renderHook(() =>
      useWidgetData(() => Promise.resolve({ total: 0 }), {
        isEmpty: (data) => (data as { total: number }).total === 0,
      }),
    );

    await waitForState(emptyResult, 'empty');
  });

  it('should report the error state when the fetcher rejects', async () => {
    const { result } = renderHook(() =>
      useWidgetData(() => Promise.reject(new Error('boom'))),
    );

    await waitForState(result, 'error');
    expect(result.current.error?.message).toBe('boom');
    expect(result.current.data).toBeUndefined();
  });

  it('should not fetch while disabled', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result } = renderHook(() =>
      useWidgetData(fetcher, { enabled: false }),
    );

    expect(result.current.state).toBe('default');
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('should refetch when refetch is called', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result } = renderHook(() => useWidgetData(fetcher));

    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledTimes(1);

    result.current.refetch();
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    await waitForState(result, 'default');
  });
});
