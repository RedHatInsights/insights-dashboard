import { useCallback, useEffect, useState } from 'react';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import type { AxiosInstance } from 'axios';

export type WidgetDataState = 'loading' | 'default' | 'empty' | 'error';

export interface UseWidgetDataResult<T> {
  data: T | undefined;
  state: WidgetDataState;
  error: Error | undefined;
  refetch: () => void;
}

export interface UseWidgetDataOptions<T> {
  isEmpty?: (data: T) => boolean;
  enabled?: boolean;
}

const defaultIsEmpty = <T>(data: T): boolean =>
  data == null ||
  (Array.isArray(data) && data.length === 0) ||
  (typeof data === 'object' && Object.keys(data as object).length === 0);

interface FetchResult<T> {
  key: string;
  epoch: number;
  data?: T;
  error?: Error;
}

/**
 * @param fetcher builds the request via the platform axios instance
 * @param options optional `isEmpty` predicate and `enabled` gate
 * @param deps    extra values triggering a refetch when changed
 *                (compared structurally via JSON — use primitives)
 */
export const useWidgetData = <T>(
  fetcher: (api: AxiosInstance) => Promise<T>,
  options: UseWidgetDataOptions<T> = {},
  deps: unknown[] = [],
) => {
  const { isEmpty = defaultIsEmpty, enabled = true } = options;
  const api = useAxiosWithPlatformInterceptors();
  const [result, setResult] = useState<FetchResult<T> | undefined>(undefined);
  const [reloadCounter, setReloadCounter] = useState(0);

  const requestKey = JSON.stringify([enabled, reloadCounter, deps]);

  const [keyEpoch, setKeyEpoch] = useState(0);
  const [prevRequestKey, setPrevRequestKey] = useState(requestKey);
  if (prevRequestKey !== requestKey) {
    setPrevRequestKey(requestKey);
    setKeyEpoch((epoch) => epoch + 1);
  }

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await fetcher(api);
        if (!cancelled) {
          setResult({ key: requestKey, epoch: keyEpoch, data });
        }
      } catch (e) {
        if (!cancelled) {
          setResult({
            key: requestKey,
            epoch: keyEpoch,
            error: e instanceof Error ? e : new Error(String(e)),
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const refetch = useCallback(() => setReloadCounter((c) => c + 1), []);

  const current =
    enabled && result?.key === requestKey && result?.epoch === keyEpoch
      ? result
      : undefined;

  const state: WidgetDataState = !current
    ? 'loading'
    : current.error
      ? 'error'
      : isEmpty(current.data as T)
        ? 'empty'
        : 'default';

  return { data: current?.data, state, error: current?.error, refetch };
};

export default useWidgetData;
