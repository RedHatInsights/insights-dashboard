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

  it('should report loading (and not fetch) while disabled', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result } = renderHook(() =>
      useWidgetData(fetcher, { enabled: false }),
    );

    expect(result.current.state).toBe('loading');
    expect(result.current.data).toBeUndefined();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('should fetch when enabled after starting disabled', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        useWidgetData(fetcher, { enabled }),
      { initialProps: { enabled: false } },
    );

    rerender({ enabled: true });
    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('should not flash stale data when re-enabled after a disabled period', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        useWidgetData(fetcher, { enabled }),
      { initialProps: { enabled: true } },
    );

    await waitForState(result, 'default');

    rerender({ enabled: false });
    await waitForState(result, 'loading');

    rerender({ enabled: true });
    expect(result.current.state).toBe('loading');
    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('should refetch when deps change', async () => {
    const fetcher = jest.fn(() => Promise.resolve('data'));
    const { result, rerender } = renderHook(
      ({ groupId }: { groupId: string }) =>
        useWidgetData(fetcher, {}, [groupId]),
      { initialProps: { groupId: 'workspace-1' } },
    );

    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledTimes(1);

    rerender({ groupId: 'workspace-2' });
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    await waitForState(result, 'default');
  });

  it('should ignore results from a superseded request', async () => {
    let resolveFirst: (value: string) => void = () => {};
    const fetcher = jest
      .fn()
      .mockImplementationOnce(
        () => new Promise<string>((resolve) => (resolveFirst = resolve)),
      )
      .mockImplementationOnce(() => Promise.resolve('second'));

    const { result } = renderHook(() => useWidgetData(fetcher));
    result.current.refetch();

    await waitForState(result, 'default');
    expect(result.current.data).toBe('second');

    resolveFirst('first');
    await waitFor(() => expect(result.current.data).toBe('second'));
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
