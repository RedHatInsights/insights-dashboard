# Writing dashboard widgets

How to write widgets for the RHEL Dashboard Widget Revamp
([RHIN-2846](https://redhat.atlassian.net/browse/RHIN-2846),
epic [RHINENG-32994](https://redhat.atlassian.net/browse/RHINENG-32994)).

The new dashboard is gated behind the `insights-dashboard.widget_revamp`
feature flag (big-bang release, instant rollback). Widgets live in
`src/PresentationalComponents/Widgets/` and are served to the widget-layout
grid as federated modules.

## The widget contract

Every widget is a **plain React component**:

- **No Card wrapper** — the grid's `GridLayout` provides the card chrome.
- **Self-contained data fetching** — the grid host provides **no Redux store**.
  Fetch with the platform token via `chrome.auth.getToken()`.
- **Root fills the tile** — `height: 100%` on the root container.
- **All 4 design states** — Default, Empty, Error, Access Denied.
- **1 grid column wide** (372px design).

## Writing a widget

Use the shared scaffolding:

- **`useWidgetData`** (`src/PresentationalComponents/Widgets/useWidgetData.ts`) —
  token-aware data fetching that returns a 4-state machine
  (`loading | default | empty | error`) plus `refetch()`, an optional
  `isEmpty` predicate, and an `enabled` gate.
- **`WidgetStates`** (`src/PresentationalComponents/Widgets/WidgetStates.tsx`) —
  renders the designed states consistently (skeleton, empty, error + Get help,
  access denied + Learn more). The grid renders Access Denied itself from the
  mapping's `permissions` config — you normally only handle the data states.

```tsx
import { useWidgetData } from './useWidgetData';
import WidgetStates from './WidgetStates';
import { INVENTORY_TOTAL_FETCH_URL } from '../../AppConstants';

const MyWidget: React.FC = () => {
  const { data, state } = useWidgetData(async (token) => {
    const response = await fetch(INVENTORY_TOTAL_FETCH_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return (await response.json()).total;
  });

  return (
    <div className="pf-v6-u-h-100" style={{ overflow: 'auto' }}>
      <WidgetStates state={state}>
        <>{data} systems</>
      </WidgetStates>
    </div>
  );
};
```

See `test-widget.tsx` for a complete working example (it renders the live
system count through the full token → fetch → state-machine flow).

## Registering a widget

Two registration points, both in this repo:

1. **Expose the module** — `fec.config.js` → `moduleFederation.exposes`:

   ```js
   './MyWidget': resolve(__dirname, './src/PresentationalComponents/Widgets/my-widget.tsx'),
   ```

2. **Register for the grid** — `frontend.yaml` → `widgetRegistry`:

   ```yaml
   widgetRegistry:
     - scope: dashboard
       module: ./MyWidget
       config:
         title: My widget
       defaults:
         w: 1   # grid columns (design is 1 = 372px)
         h: 4
   ```

On stage/prod, the FEO-generated registry feeds widget-layout-backend
automatically — no platform PRs needed
([RHINENG-32996](https://redhat.atlassian.net/browse/RHINENG-32996) findings).
A newly registered widget appears in the grid once the change deploys.

## Local development

The local widget dev workflow (one-command stack, running the grid against
local widget code) is documented with the embedded-grid work in
[RHINENG-32999](https://redhat.atlassian.net/browse/RHINENG-32999) — where
`/insights/dashboard` behind the feature flag becomes the development surface.
