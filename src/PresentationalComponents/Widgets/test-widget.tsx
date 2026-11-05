import React from 'react';
import { useIntl } from 'react-intl';
import { INVENTORY_TOTAL_FETCH_URL } from '../../AppConstants';
import { useWidgetData } from './useWidgetData';
import WidgetStates from './WidgetStates';
import messages from '../../Messages';

/**
 * Spike widget demonstrating the shared widget scaffolding (RHINENG-32997):
 * self-contained fetching through the platform axios instance (no Redux —
 * the grid host has no store) rendered with the shared state machine.
 */
const TestWidget = () => {
  const intl = useIntl();
  const { data, state } = useWidgetData(async (api) => {
    // NOTE: the platform interceptors unwrap AxiosResponse — the resolved
    // value is the JSON payload (typed via assertion, like inventory's
    // typed API layer).
    const payload = (await api.get(INVENTORY_TOTAL_FETCH_URL)) as unknown as {
      total: number;
    };
    return payload.total;
  });

  return (
    <div
      className="pf-v6-u-h-100 pf-v6-u-display-flex pf-v6-u-flex-direction-column pf-v6-u-justify-content-center pf-v6-u-align-items-center pf-v6-u-p-md"
      style={{ overflow: 'auto' }}
    >
      <WidgetStates
        state={state}
        emptyBody={intl.formatMessage(messages.testWidgetEmpty)}
      >
        <>
          <div className="pf-v6-u-font-size-2xl pf-v6-u-font-weight-bold">
            {intl.formatMessage(messages.testWidgetSystems, {
              total: data ?? 0,
            })}
          </div>
          <div className="pf-v6-u-color-200">
            {intl.formatMessage(messages.testWidgetSubtitle)}
          </div>
        </>
      </WidgetStates>
    </div>
  );
};

export default TestWidget;
