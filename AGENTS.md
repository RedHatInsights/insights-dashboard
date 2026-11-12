# AGENTS.md — insights-dashboard

The Red Hat Insights dashboard app (`/insights/dashboard`). A federated
Insights SPA that hosts the legacy Masonry dashboard and the new
widget-layout grid (behind the `insights-dashboard.widget_revamp` Unleash
flag).

## Commands

- `npm run start:proxy` — dev server (the standard stage-backed workflow)
- `npm start` — static build serving (`fec static`)
- `npm test` — jest
- `npm run lint` — eslint + stylelint
- `npx tsc --noEmit` — type check
- `npm run build` — production build (fec)

## Repo map

- `src/SmartComponents/WidgetDashboard/` — the widget grid embed (new UI)
- `src/PresentationalComponents/Dashboard/` — legacy Masonry dashboard
- `src/SmartComponents/*Card.js` — legacy Masonry cards
- `docs/local-widget-dev.md` — widget development guide (dev stack, API
  patterns, testing)

## Before working on the widget revamp

**Read [`docs/ai/widget-revamp.md`](docs/ai/widget-revamp.md).** It contains
the accumulated architecture knowledge, integration contracts, known sharp
edges, and the Jira card map for the RHEL Dashboard Widget Revamp
(RHINENG-32994). Several behaviors there are non-obvious and have already
cost debugging time — the guide exists so they don't cost it twice.

## Conventions

- Feature work is gated behind Unleash flags (`insights-dashboard.*`)
- Commits: conventional style with the Jira key, e.g.
  `feat(RHINENG-12345): summary` — the branch name should carry the key so
  Jira links the PR automatically
