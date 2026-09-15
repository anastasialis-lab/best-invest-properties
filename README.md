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

Investor flow — landing, search filters, results, combined search+results, property
detail, investment analysis, financial calculator, comparison, registration, login,
dashboard. Developer — marketing page, account application, portal, add project.
Back office — admin dashboard, investment-score editor, user-journey diagrams. Legal —
privacy policy, terms of use.

Filters, the comparison basket, the calculator and the score-weight editor are
interactive and share state; the remaining screens are laid out with placeholder data.

## Structure

| Path | Contents |
| --- | --- |
| `src/pages/` | One component per screen |
| `src/components/` | Shared UI (header, footer, property card, filter panel, …) |
| `src/layouts/` | Admin and developer-portal chrome |
| `src/state/store.ts` | Shared filter / compare / calculator / score-weight state |
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
