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
  Fetch through the **platform axios instance** (see `useWidgetData` below) —
  platform auth, response unwrapping, 401/logout and error handling are all
  handled by the interceptors, so widgets never touch tokens manually.
- **Root fills the tile** — `height: 100%` on the root container.
- **Self-gated permissions** — each widget checks its own access (see
  [Permission gating](#permission-gating)) and renders the shared
  access-denied state when denied. The grid does not do this for you.
- **All 4 design states** — Default, Empty, Error, Access Denied, rendered
  through the shared `WidgetStates`.
- **Default 1 grid column wide** (372px design); use 2 columns when the
  design needs the room (see `InventoryWidget`, whose designed body is
  762px).
- **Never scroll** — size content to the tile and let it wrap when
  narrowed; the grid tiles clip anything taller.

## Writing a widget

Use the shared scaffolding:

- **`useWidgetData`** (`src/PresentationalComponents/Widgets/useWidgetData.ts`) —
  fetches through the platform axios instance
  (`useAxiosWithPlatformInterceptors`) and returns a 4-state machine
  (`loading | default | empty | error`) plus `refetch()`, an optional
  `isEmpty` predicate, and an `enabled` gate. While `enabled` is false the
  hook reports `loading` and fetches nothing, so gating it on permissions
  is safe. Pass values that should trigger a refetch (workspace ids,
  filters) as the third `deps` argument — **primitives only**: deps are
  compared structurally via JSON, so objects and functions do not work.
- **`WidgetStates`** (`src/PresentationalComponents/Widgets/WidgetStates.tsx`) —
  renders the designed states consistently: skeleton (loading), empty
  (with optional `emptyBody` and `emptyAction` CTA), error ("Something
  went wrong" + Get help, with an optional `onRetry` button wired to
  `refetch`), and access-denied (lock + Learn more).

```tsx
import { useWidgetData } from './useWidgetData';
import WidgetStates from './WidgetStates';
import { INVENTORY_TOTAL_FETCH_URL } from '../../AppConstants';

const MyWidget = () => {
  const { data, state, refetch } = useWidgetData(async (api) => {
    // The platform interceptors unwrap AxiosResponse — the resolved value
    // is the JSON payload (typed via an assertion).
    const payload = (await api.get(INVENTORY_TOTAL_FETCH_URL)) as unknown as {
      total: number;
    };
    return payload.total;
  });

  return (
    <div className="pf-v6-u-h-100">
      <WidgetStates state={state} onRetry={refetch}>
        <>{data} systems</>
      </WidgetStates>
    </div>
  );
};
```

See `TestWidget.tsx` for a complete working example (it renders the live
system count through the full platform-instance → fetch → state-machine
flow).

### Typed API clients (javascript-clients)

For typed requests, use the generated clients from
[javascript-clients](https://github.com/RedHatInsights/javascript-clients)
(e.g. `@redhat-cloud-services/host-inventory-client`) wired to the same
platform axios instance — see `src/api/hostInventoryApiTyped.ts` in
insights-inventory-frontend for the reference pattern (`APIFactory` +
endpoint functions). Install the client for the service your widget reads;
the interceptors' response unwrapping applies the same way.

## Permission gating

Widgets check their own access — unauthorized users must see the shared
access-denied state, not an error. The pattern (from `InventoryWidget`,
ported from the legacy `SystemInventoryHeader`):

**1. Branch components on the `insights-dashboard.kessel_enabled` flag so
only ONE access check ever fires per mount:**

```tsx
const MyWidgetWithRbac = () => {
  const { hasAccess, isLoading } = usePermissions('myapp', [
    'myapp:resource:read',
  ]);
  return <MyWidgetContent hasAccess={hasAccess} isAccessLoading={isLoading} />;
};

const MyWidgetWithKessel = () => {
  const { hasAccess, isLoading } = useMyServiceKesselProbe();
  return <MyWidgetContent hasAccess={hasAccess} isAccessLoading={isLoading} />;
};

const MyWidget = () => {
  const isKesselEnabled = useFeatureFlag('insights-dashboard.kessel_enabled');
  return isKesselEnabled ? <MyWidgetWithKessel /> : <MyWidgetWithRbac />;
};
```

**2. In the content component, gate fetching on access and map denial to
the shared state:**

```tsx
const { data, state } = useWidgetData(fetcher, {
  enabled: hasAccess && !isAccessLoading,
});
const uiState = !hasAccess && !isAccessLoading ? 'access-denied' : state;
```

While permissions resolve, the hook reports `loading` — nothing renders
and nothing fetches.

For the Kessel path, write a per-service probe like
`useInventoryHostsReadKesselProbe` (a 403-probe against your service's
API), or check whether `useDashboardKesselPermissions` already covers
your service's relation before writing a new one.

## Strings and translation

Every user-visible string goes through `src/Messages.js` and
`intl.formatMessage` (react-intl) — never hardcoded. Use ICU plurals for
counts and `intl.formatNumber` for numbers (not `.toLocaleString()`,
which follows the browser locale instead of the intl one).

## Styles

Colocate a `.scss` file with the widget, named after the component
(`InventoryWidget.scss`), with classes prefixed `insd-c-<widget>` and BEM
elements (`insd-c-inventory-widget__count`). Style with PatternFly tokens
(`--pf-t--global--...`), not hex values. The widget must never scroll —
size content for the tile and let it wrap when narrowed.

## Testing your widget

Colocate a `.test.tsx` with the widget. Mock only the platform edges (the
interceptors, the RBAC/Kessel hooks, feature flags) and assert
user-visible behavior: state text, link destinations, no-fetch-when-denied.
See `InventoryWidget.test.tsx` for the reference patterns (including the
Kessel-vs-RBAC precedence and access-loading cases).

## Workspace-aware widgets

The dashboard will be workspace-scoped
([RHCLOUD-48799](https://redhat.atlassian.net/browse/RHCLOUD-48799) /
ADR-089): chrome will propagate the selected workspace as a request
header on every API call, scoping results backend-side — widgets need no
changes for scoped data. To read the selection (e.g. to show a chip), use
`useSelectedWorkspace` — currently a stub returning `undefined` until
chrome ships its consumer API.

## Registering a widget

Two registration points, both in this repo:

1. **Expose the module** — `fec.config.js` → `moduleFederation.exposes`:

   ```js
   './MyWidget': resolve(__dirname, './src/PresentationalComponents/Widgets/MyWidget.tsx'),
   ```

2. **Register for the grid** — `frontend.yaml` → `widgetRegistry`:

   ```yaml
   widgetRegistry:
     - scope: dashboard
       module: ./MyWidget
       config:
         title: My widget
       defaults:
         w: 1   # grid columns (design default is 1 = 372px)
         h: 4
   ```

On stage/prod, the FEO-generated registry feeds widget-layout-backend
automatically — no platform PRs needed
([RHINENG-32996](https://redhat.atlassian.net/browse/RHINENG-32996) findings).
A newly registered widget appears in the grid once the change deploys.

## Local development

The embedded grid runs against stage with a single command — no local
backend, database, Unleash, or proxy stack is needed. Everything except your
local widget code (chrome, SSO, the widget-layout backend) comes from the
real environment.

### Running the one-command stack

```bash
npm run start:proxy
```

Pick `stage` from the interactive menu. The dev server starts on
`https://stage.foo.redhat.com:1337`, then open:

```
https://stage.foo.redhat.com:1337/insights/dashboard
```

### Why your locally-registered widget appears in the grid

The grid lists widgets from the widget-mapping API, which the platform
generates from **deployed** `frontend.yaml` CRDs — a widget registered
only in your local CRD is invisible until a deploy. The dev server's
`customProxy` (`fec.config.js`) injects this repo's `widgetRegistry`
entries into that mapping response so local widgets appear in the real
grid. It is dev-server-only (production builds never read `customProxy`)
and re-reads `frontend.yaml` on every response, so registry edits need
only a browser refresh.

### Enabling the feature flag

The grid embed is gated by `insights-dashboard.widget_revamp`, which is off
by default. Enable it for your org in the
[stage Unleash console](https://insights-stage.unleash.devshift.net/) before
loading the page.
