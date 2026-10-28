import { useCallback, useEffect, useState } from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

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
  data?: T;
  error?: Error;
}

/**
 * @param fetcher async function receiving the platform token; it builds the
 *                request, checks the response, and returns parsed data
 * @param options optional `isEmpty` predicate and `enabled` gate
 * @param deps    extra values that should trigger a refetch when changed
 *                (compared structurally via JSON — use primitives)
 */
export const useWidgetData = <T>(
  fetcher: (token: string) => Promise<T>,
  options: UseWidgetDataOptions<T> = {},
  deps: unknown[] = [],
): UseWidgetDataResult<T> => {
  const { isEmpty = defaultIsEmpty, enabled = true } = options;
  const chrome = useChrome();
  const [result, setResult] = useState<FetchResult<T> | undefined>(undefined);
  const [reloadCounter, setReloadCounter] = useState(0);

  const requestKey = JSON.stringify([enabled, reloadCounter, deps]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const token = (await chrome?.auth?.getToken?.()) ?? '';
        const data = await fetcher(token);
        if (!cancelled) {
          setResult({ key: requestKey, data });
        }
      } catch (e) {
        if (!cancelled) {
          setResult({
            key: requestKey,
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
  const current = enabled && result?.key === requestKey ? result : undefined;

  const state: WidgetDataState = !enabled
    ? 'default'
    : !current
      ? 'loading'
      : current.error
        ? 'error'
        : isEmpty(current.data as T)
          ? 'empty'
          : 'default';

  return { data: current?.data, state, error: current?.error, refetch };
};

export default useWidgetData;
