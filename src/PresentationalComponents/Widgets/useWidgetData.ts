import { useCallback, useEffect, useState } from 'react';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import type { AxiosInstance } from 'axios';

/**
 * HCC widget data states (RHINENG-32997).
 *
 * Maps 1:1 to the designed widget states. "Access Denied" is NOT a data
 * state — it comes from the widget mapping's `permissions` config, checked
 * by the grid before the widget renders.
 */
export type WidgetDataState = 'loading' | 'default' | 'empty' | 'error';

export interface UseWidgetDataResult<T> {
  data: T | undefined;
  state: WidgetDataState;
  error: Error | undefined;
  refetch: () => void;
}

export interface UseWidgetDataOptions<T> {
  /**
   * Predicate distinguishing an "empty" result (no data) from default
   * content. Defaults to null/undefined, empty array, or empty object.
   */
  isEmpty?: (data: T) => boolean;
  /** Skip fetching entirely while false. Default: true */
  enabled?: boolean;
}

const defaultIsEmpty = <T>(data: T): boolean =>
  data == null ||
  (Array.isArray(data) && data.length === 0) ||
  (typeof data === 'object' && Object.keys(data as object).length === 0);

interface FetchResult<T> {
  /** The requestKey this result belongs to */
  key: string;
  data?: T;
  error?: Error;
}

/**
 * HCC widget data hook — self-contained fetching for dashboard widgets.
 *
 * The widget-layout grid host provides NO Redux store, so every widget
 * fetches its own data through the platform axios instance
 * (`useAxiosWithPlatformInterceptors`): platform auth, response unwrapping,
 * 401/logout, 500 and error normalization are all handled by the
 * interceptors — widgets never touch tokens manually.
 *
 * Render the returned state machine with `<WidgetStates>`:
 *
 *   const { data, state, refetch } = useWidgetData(fetchSystems);
 *   return <WidgetStates state={state}>{`You have ${data} systems`}</WidgetStates>;
 *
 * Implementation note: the state machine is DERIVED during render from a
 * request key (enabled + refetch counter + deps) — state is only ever set
 * from async continuations, never synchronously within an effect body
 * (react-hooks/set-state-in-effect). A key change makes the derived state
 * 'loading' immediately, with no extra render pass.
 *
 * @param fetcher async function receiving the platform axios instance; it
 *                builds the request and returns parsed data. NOTE: the
 *                platform interceptors unwrap AxiosResponse — the resolved
 *                value is the JSON payload (type it with an assertion, as
 *                insights-inventory-frontend's API layer does)
 * @param options optional `isEmpty` predicate and `enabled` gate
 * @param deps    extra values that should trigger a refetch when changed
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

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await fetcher(api);
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

  // Derived state machine: a result only counts when it belongs to the
  // current request key — anything else (or nothing yet) means loading.
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
