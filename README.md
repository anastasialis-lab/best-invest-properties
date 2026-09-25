# Best Invest Properties

A visual prototype of a European real-estate investment platform, implemented as a
React + TypeScript single-page app. Investors search and filter analysed properties,
model returns, and compare them; developers submit projects; back-office screens cover
approval and the investment-score model.

**Live:** https://anastasialis-lab.github.io/best-invest-properties/

## Running locally

```bash
npm install
npm run dev
```

The dev server serves the app under the `/best-invest-properties/` base path (matching
the GitHub Pages deployment), so open the URL that Vite prints rather than the bare root.

```bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Screens

Investor flow — landing, browse, property detail, investment analysis, financial
calculator, comparison, registration, login, password reset, account settings,
dashboard. Developer — marketing page, account application, portal, my projects, unit
schedule, leads, company profile, verification status, add project. Back office — admin
sign-in, dashboard, approvals queue, project review, developer verification, user
management, investment-score editor, user-journey diagrams. Legal — privacy policy,
terms of use.

Filters, the comparison basket, the calculator, the approvals queue and the score-weight
editor are interactive and share state. Screens that have loading, empty, error or
decided states carry the prototype's in-screen **preview state** switcher, so each state
can be seen without a backend; toasts and confirmation dialogs are mounted once for the
whole app.

## Structure

| Path | Contents |
| --- | --- |
| `src/pages/` | One component per screen |
| `src/components/` | Shared UI (header, footer, filter panel, toast/modal, preview-state chips, …) |
| `src/layouts/` | Admin and developer-portal chrome |
| `src/state/store.ts` | Shared filter / compare / calculator / queue / score-weight state |
| `src/data/` | Listing data and static page copy |
| `src/styles/theme.ts` | Colour and type tokens |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes
it to GitHub Pages. The repository's Pages source must be set to **GitHub Actions**
(Settings → Pages → Build and deployment), otherwise Pages serves the unbuilt source and
the page renders blank.

Because Pages has no server-side rewrites, `public/404.html` redirects deep links back to
the SPA entry point, which restores the original path before the router mounts.

## Origin

The design was produced in Claude Design and exported as a handoff bundle: the prototype
lives in `project/`, the design conversations in `chats/`, and the bundle's own notes in
`DESIGN-HANDOFF.md`. The prototype's screen-rail and desktop/mobile toggle were
scaffolding for the design tool and are deliberately absent here — real routes and CSS
breakpoints replace them.

Figures, names and legal copy throughout are placeholders from the prototype and are not
reviewed for production use.
