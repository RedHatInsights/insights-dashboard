# Widget Revamp — AI Agent Knowledge Base

Accumulated engineering knowledge for the RHEL Dashboard Widget Revamp
(epic [RHINENG-32994](https://redhat.atlassian.net/browse/RHINENG-32994)).
Written for AI agents (and humans) contributing to the feature across
repos. Facts below were verified against live systems and source code —
when code and this document disagree, trust the code, then update this
document.

## Repos involved

| Repo | Role |
|------|------|
| `RedHatInsights/insights-dashboard` (this repo) | Host app. Owns the route `/insights/dashboard`, the feature flag, and the FEO base template |
| `RedHatInsights/widget-layout` | The federated widget grid (`WidgetLayout`), its header/kebab/drawer, and its own app routes (`/dashboard-hub`) |
| widget-layout backend (stage/prod service) | Dashboard templates API: CRUD, `?dashboardType=` filtering, base-template auto-fork |

## The embed (RHINENG-32999)

- `WidgetDashboard.tsx` renders the federated grid via `AsyncComponent`
  with scope **`widgetLayout`** and module `./WidgetLayout`, passing only
  `layoutType`.
- **The scalprum scope is the fec `moduleName` — `widgetLayout`, camelCase**
  (NOT the app name). Ground truth for scope names is chrome's
  `fed-modules-generated.json`.
- `WidgetLayout` is fully self-contained: own jotai store, header,
  add-widget drawer, notifications. The host passes props and controls
  almost nothing inside it. Clean split: component behavior → widget-layout
  repo; template content → ours.
- The whole UI is gated behind Unleash flag `insights-dashboard.widget_revamp`
  (big-bang switch, instant rollback, no redeploy needed to flip).

## FEO base templates and layoutType

- The starter base template lives in `frontend.yaml` under `baseWidgetLayouts`
  (template `insightsDashboard`, placeholder tile `landing-./RhelWidget` until
  the Day-0 card [RHINENG-33013](https://redhat.atlassian.net/browse/RHINENG-33013)).
- **FEO stamps base template names as `<frontendName>-<templateName>`** —
  ours becomes layoutType **`dashboard-insightsDashboard`**.
- **The widget-layout backend auto-forks base templates on a user's first
  GET.** Post-deploy, every user gets a Day-0 dashboard of the type with
  zero manual steps. Pre-deploy, users of a new layoutType have no
  template — see "Known pre-deploy gap" below.

## The two loading engines (bugs can be URL-shaped)

The same grid is backed by **two different engines**, selected by URL:

| URL | Engine | Behavior |
|-----|--------|----------|
| `/insights/dashboard` (embed, Default route) | `useDashboardConfig` | Loads the **default template of the layoutType**; falls back to the first template of the type when none is default (widget-layout PR #397) |
| `/dashboard-hub/:id` (widget-layout's own app) | load-by-ID | Loads the exact dashboard by ID |

When something breaks "only on one URL," check which engine that URL uses
before suspecting the grid itself.

## Type system facts

- `LayoutTypes` strings are `<app>-<template>` shaped (e.g.
  `dashboard-insightsDashboard`, `landing-landingPage`).
- **Old-backend mapping**: when the `platform.widget-layout.new-backend`
  flag is off, `landing-landingPage` maps to `landingPage`. Mirror this
  mapping anywhere a layoutType reaches the API (see `useGetDashboards`
  vs `useDashboardConfig`).
- `GET /api/widget-layout/v1/?dashboardType={type}` filters **server-side**
  — the backend supports and honors the param.
- **The backend keeps one default dashboard PER TYPE.** A user's "default"
  in a mixed list does not mean "currently viewed."

## Federated-module lessons (paid for in debugging hours)

- **A federated component's internal react-router `<Link>`s resolve against
  the HOST app's router.** An embedded module must never assume its own
  app's routes (e.g. `/dashboard-hub/:id`) exist in the host. This was the
  root cause of the embedded kebab teleporting users out of
  `/insights/dashboard` (fixed in RHINENG-33647: items now switch templates
  in place via `templateIdAtom`).
- **Dynamic data the host needs (e.g. the current dashboard's name for a
  breadcrumb) lives inside the federated jotai store** — the host cannot
  read it. Exposing it requires an explicit widget-layout API (e.g. an
  `onTemplateChange` callback prop). Plan for this in the breadcrumb work.
- **Verify design intent before filing "defects" against a federated
  module's behavior** — behavior that looks wrong from the embed's
  perspective may be the designed navigation model.

## Scar tissue (fixed — keep it fixed)

- **Mirage grid** (widget-layout PR #397): with no default template of the
  type, `useDashboardConfig` gave up silently while the grid still rendered
  and accepted edits — every save hit a hidden `if (templateId < 0) return`
  guard and evaporated. Now: falls back to the first template of the type,
  and warns ("Changes not saved") instead of silently dropping edits.
  **JS footgun**: `NaN < 0` is `false` — the reset flow sets the id to
  `NaN`, so range guards must use `!(x >= 0)`.
- **Embedded kebab** (RHINENG-33647): unfiltered list showed cross-type
  dashboards; checkmark marked the per-type `default` instead of the
  currently-viewed dashboard; items navigated out of the host. Fixed by
  type-scoping the fetch, selecting by `templateId`, and switching in place.

## Dev environment truth

- **`npm run start:proxy` is the standard dev workflow** — the stage-backed
  stack (chrome, SSO, stage Unleash, stage widget-layout assets and
  backend) on `:1337`. It covers everything the widget revamp needs; do not
  resurrect heavier local topologies (multiple Postgres instances, identity
  bridges, TLS bridges) — that was Phase 0 spike scaffolding, and its
  residue flags (`port=8004`, `--clouddotEnv`) actively hid the default.
- **Known pre-deploy gap**: "failed to fetch dashboard template" toast and
  a non-draggable (or mirage) grid on `/insights/dashboard` means the stage
  base template doesn't exist yet — `ForkBaseTemplate` 404s until the
  RHINENG-32999 PR deploys. Manual unblock: grid header → "Create blank
  dashboard" → "Set as homepage" (the default change is name-scoped; the
  landing page is unaffected).
- Full widget authoring guide (API patterns, testing, the widget registry):
  **`docs/local-widget-dev.md`**.

## Widget authoring patterns (from merged PR #946 / RHINENG-32997)

- Fetch through the platform axios instance
  (`useAxiosWithPlatformInterceptors`) — never hand-roll
  `chrome.auth.getToken()` token handling. The interceptors handle auth,
  unwrap `AxiosResponse` to the JSON payload (resolved values ARE the
  payloads), and normalize 401/500s.
- `useWidgetData` fetcher signature is `(api: AxiosInstance) => Promise<T>`
  — the hook owns the instance.
- Prefer generated javascript-clients per widget going forward. Count-style
  widgets: call the list endpoint with `limit=1` and read the count from
  the response's `total` field (cheap, no payload).
- `TestWidget` is the reference implementation.

## Jira card map

| Card | Scope | Status |
|------|-------|--------|
| [RHINENG-32994](https://redhat.atlassian.net/browse/RHINENG-32994) | Epic: RHEL Dashboard Widget Revamp | In progress |
| [RHINENG-32997](https://redhat.atlassian.net/browse/RHINENG-32997) | Widget infrastructure (`useWidgetData`, flag, docs) | Merged Nov 4 (PR #946) |
| [RHINENG-32999](https://redhat.atlassian.net/browse/RHINENG-32999) | Embed grid behind feature flag + base template | Branch `rhineng-32999`, PR pending |
| [RHINENG-33013](https://redhat.atlassian.net/browse/RHINENG-33013) | Day-0 default dashboard composed of app widgets | Not started |
| [RHINENG-33647](https://redhat.atlassian.net/browse/RHINENG-33647) | Embedded kebab: scope, mark current, switch in place (widget-layout) | Branch `rhineng-33647`, PR pending |
| (deferred) | Autosave toggle + dashboard details bar | Card to be filed — design reconciliation |
| (design) | Add-widgets drawer auto-open, reset-to-default placement | Routed to design |

## Verification checklist for embed changes

1. `npm test`, `npm run lint`, `npx tsc --noEmit` in this repo; jest in
   widget-layout for its changes.
2. Live-check BOTH engines: `/insights/dashboard` (default-by-type) and a
   `/dashboard-hub/:id` details page.
3. If the kebab or template list changed: verify the list is type-scoped on
   the embed, unscoped on Dashboard Hub, and that clicks stay on the host
   page.
4. If save/load paths changed: edit, reload, confirm persistence — "renders
   fine" and "persists fine" are two different systems.
