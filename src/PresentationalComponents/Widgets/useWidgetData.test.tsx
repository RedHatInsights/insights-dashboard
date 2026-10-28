import { renderHook, waitFor } from '@testing-library/react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { useWidgetData, type WidgetDataState } from './useWidgetData';

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    auth: { getToken: jest.fn(() => Promise.resolve('test-token')) },
  })),
}));

const mockChrome = useChrome as jest.Mock;

const waitForState = async (
  result: { current: { state: WidgetDataState } },
  expected: WidgetDataState,
) => {
  await waitFor(() => expect(result.current.state).toBe(expected));
};

describe('useWidgetData', () => {
  beforeEach(() => {
    mockChrome.mockImplementation(() => ({
      auth: { getToken: jest.fn(() => Promise.resolve('test-token')) },
    }));
  });

  it('should pass the platform token to the fetcher and reach the default state', async () => {
    const fetcher = jest.fn((token: string) =>
      Promise.resolve({ token, total: 42 }),
    );
    const { result } = renderHook(() => useWidgetData(fetcher));

    await waitForState(result, 'default');
    expect(fetcher).toHaveBeenCalledWith('test-token');
    expect(result.current.data).toEqual({ token: 'test-token', total: 42 });
    expect(result.current.error).toBeUndefined();
  });

  it('should report the empty state for empty results', async () => {
    const { result } = renderHook(() =>
      useWidgetData(() => Promise.resolve([])),
    );

    await waitForState(result, 'empty');
  });

  it('should honor a custom isEmpty predicate', async () => {
    const { result } = renderHook(
      () => useWidgetData(() => Promise.resolve({ total: 0 })),
      // wrapped renderHook options are not needed; predicate goes to the hook
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
