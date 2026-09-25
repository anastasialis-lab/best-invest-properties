# Design System — Best Invest Properties

Date: 25 September 2026  
Source: the approved Best Invest Properties prototype

This document describes the colours, typefaces, spacing and components of the approved design, in the form needed to build the interface in Bubble.

## 1. System principle

There is one palette for the whole product, but surfaces are split into **three lightness tiers**.

| Tier | Where it applies | Page background | Side panel background |
|---|---|---|---|
| 1 — public site | landing, catalogue, property, analysis, calculator, registration, legal | `#F7FCFF` | — |
| 2 — accounts | investor dashboard, developer portal | `#F7FCFF` | `#EAF2F8` |
| 3 — administration | all admin screens | `#F7FCFF` | `#EAF2F8` |

All three tiers are light. Dark surfaces are used **sparingly**: the landing hero, the headers of some internal screens (`#0F3A60`) and the toast (`#1D3E56`).

## 2. Palette

### 2.1 Text and headings

| HEX | RGB | Purpose |
|---|---|---|
| `#0F3A60` | 15, 58, 96 | main body text colour, dark headers |
| `#153A5C` | 21, 58, 92 | modal titles, active chip state |
| `#174B67` | 23, 75, 103 | page titles, links, text on gold |
| `#1B4258` | 27, 66, 88 | admin headings, text on gold buttons |
| `#36566B` | 54, 86, 107 | main paragraph text |
| `#354F63` | 53, 79, 99 | text in modals |
| `#34495C` | 52, 73, 92 | secondary text in tables and cards |
| `#566E80` | 86, 110, 128 | muted labels, metadata |
| `#526779` | 82, 103, 121 | side panel labels |
| `#5B7485` | 91, 116, 133 | faintest label, service notes |
| `#8FA6B8` | 143, 166, 184 | input placeholder |

### 2.2 Actions

| HEX | RGB | Purpose |
|---|---|---|
| `#205A87` | 32, 90, 135 | primary action, accent figures, active links |
| `#087CB8` | 8, 124, 184 | bright accent: main search form button, "Open full review" |
| `#174470` | 23, 68, 112 | dark action, Developer column on the flow diagram |
| `#0F3F8F` | 15, 63, 143 | the word "BEST" in the logo |

### 2.3 Gold accent

The only warm colour in the system. Used for the active navigation item, developer confirmation actions, "TOP INVESTMENT" badges and the logo.

| HEX | RGB | Purpose |
|---|---|---|
| `#DDB45E` | 221, 180, 94 | main gold: active menu item bar, "Open review" buttons |
| `#D9B25B` | 217, 178, 91 | rules either side of "PROPERTIES" in the logo |
| `#E3BC63` | 227, 188, 99 | middle stop of the "INVEST" gradient |
| `#C9982F` | 201, 152, 47 | bottom stop of the "INVEST" gradient |
| `#F8E4A6` | 248, 228, 166 | top stop of the "INVEST" gradient |
| `#F8EFDC` | 248, 239, 220 | gold fill: "Under review" block, "YOU" step on the diagram |

"INVEST" gradient in the logo:
`linear-gradient(180deg, #F8E4A6 0%, #E3BC63 52%, #C9982F 100%)`.

### 2.4 Surfaces

| HEX | RGB | Purpose |
|---|---|---|
| `#F7FCFF` | 247, 252, 255 | background of all pages |
| `#FFFFFF` | 255, 255, 255 | cards, tables, panels, active menu item |
| `#E5F6FF` | 229, 246, 255 | text on dark headers, light chip fill |
| `#F0F7FC` | 240, 247, 252 | input background, neutral fill |
| `#EAF2F8` | 234, 242, 248 | portal and admin side navigation background |
| `#DCEEF9` | 220, 238, 249 | highlighted fill |
| `#D3E5F2` | 211, 229, 242 | modal note background, saved state |
| `#BFD5E5` | 191, 213, 229 | text on dark headers, borders |
| `#8DD8FA` | 141, 216, 250 | light accent on dark backgrounds |

### 2.5 Semantic colours

| State | HEX | RGB | Purpose |
|---|---|---|---|
| Success | `#2F7D63` | 47, 125, 99 | "CHECKED", "Introduction made", approved |
| Success — background | `#E4EFE8` | 228, 239, 232 | "Available", "APPROVED" chip fill |
| Error | `#B3453D` | 179, 69, 61 | error text, Reject button, GAP tag |
| Error — dark | `#8E362F` | 142, 54, 47 | confirm button for a destructive action |
| Error — background | `#FCF5F4` | 252, 245, 244 | "Verification unsuccessful" block |
| Pending | `#F8EFDC` | 248, 239, 220 | "Awaiting approval", "PENDING REVIEW" |

### 2.6 Lines and shadows

All borders and shadows are tinted blue, `rgba(23, 75, 103, α)`, not neutral grey — this is what keeps light surfaces from looking grey.

| Token | Value | Use |
|---|---|---|
| hairline | `rgba(23,75,103,.05)` | table row borders, internal card dividers |
| soft | `rgba(23,75,103,.10)` | block borders, table header underline |
| base | `rgba(23,75,103,.14)` | secondary button and field borders |
| strong | `rgba(23,75,103,.18)` | input borders |
| Card shadow | `0 12px 34px rgba(23,75,103,.07)` | standard for all cards |
| Lift shadow | `0 10px 24px rgba(23,75,103,.22)` | buttons and raised elements |
| Modal shadow | `0 26px 60px rgba(10,31,56,.4)` | confirmation dialog |
| Modal overlay | `rgba(10,31,56,.55)` | backdrop behind the dialog |

## 3. Typography

**One typeface — Archivo.** Hierarchy comes from weight, size, letter spacing and the gold accent.

```
Archivo: 400, 500, 600, 700
Fallback: system-ui, sans-serif
Monospace: ui-monospace, Menlo, monospace
```

Monospace is used sparingly: unit numbers, file names, section numbers on legal pages.

### 3.1 Size scale

| Size | Weight | Tracking | Use |
|---:|---:|---|---|
| 56 px | 700 | −.018em | landing hero title |
| 44 px | 600 | — | legal page title (desktop) |
| 34 px | 700 | −.012em | header-screen title |
| 32 px | 700 | — | large statistic figures |
| 30 px | 700 | −.012em | admin H1, mobile legal title |
| 28 px | 700 | −.012em | admin screen H1 |
| 26 px | 700 | — | metric figures |
| 22–23 px | 600 | −.006em | panel titles, modal title |
| 20–21 px | 600 | −.006em | property names in lists |
| 16.5 px | 400 | — | main paragraph, inputs |
| 15.5 px | 400 | — | **base interface size**: buttons, table rows, labels |
| 14 px | 400 | — | secondary text, notes |
| 13.5 px | 400 | — | small labels, chips, explanations |
| 13 px | 400 | — | table metadata |
| 12.5 px | 400 | .1–.12em | status chips, references |
| 12 px | 400 | .16–.24em | **upper-case section labels** |
| 11.5 px | 400 | .16em | smallest labels |
| 11 px | 700 | .1em | source tags `SOURCE` / `GAP` |

### 3.2 Letter spacing

| Value | Use |
|---|---|
| `−.018em` | hero title |
| `−.012em` | upper-case H1 headings |
| `−.006em` | panel and card titles |
| `.1em` | status chips |
| `.12em` | table column headers, references |
| `.14em` | metric labels |
| `.16em` | section labels inside cards |
| `.18em` | section labels on the page |
| `.2em` | screen eyebrow |
| `.24em` | side navigation title ("ADMIN", "DEVELOPER") |
| `.42em` | the word "PROPERTIES" in the logo |

### 3.3 Rules

- H1 headings are **upper case**, weight 700, negative tracking.
- Section labels are upper case, 12 px, tracking .16–.18em, colour `#566E80`.
- Line height: 1.6–1.75 for paragraphs, 1.05–1.2 for headings.
- All numeric values (prices, yields, scores) use `font-variant-numeric: tabular-nums` so columns do not "jump".
- Long paragraphs are limited to `max-width: 62–74ch`.

## 4. Radii

| Value | Use |
|---:|---|
| `40px` / `999px` | **pills**: all buttons, chips, tabs |
| `16px` | cards, panels, large blocks |
| `12px` | nested blocks, toast, summary panels |
| `10px` | inputs, notes |
| `7px` | small list blocks, document rows |
| `4px` | status chips, progress bars |
| `3px` | smallest indicators |

Buttons are **always pills**. There are no rectangular buttons.

## 5. Components

### 5.1 Buttons

| Tone | Background | Text | Border |
|---|---|---|---|
| Primary | `#205A87` | `#FFFFFF` | none |
| Bright | `#087CB8` | `#1B4258` or `#FFFFFF` | none |
| Gold (developer actions) | `#DDB45E` | `#1B4258` | none |
| Secondary | transparent | `#1B4258` | `1px rgba(23,75,103,.14)` |
| Text | transparent | `#566E80` | none |
| Destructive | transparent | `#B3453D` | `1px rgba(197,86,79,.5)` |
| Confirm destructive action | `#8E362F` | `#FFFFFF` | none |
| On dark background | `rgba(255,255,255,.08)` | `#FFFFFF` | `1px rgba(255,255,255,.4)` |

Sizes: large `padding: 11px 18px`, regular `10px 16px`, small `7px 12px`. Minimum height in modals — 44 px.

### 5.2 Cards

```
background: #FFFFFF
border: 1px solid rgba(23,75,103,.05)
border-radius: 16px
box-shadow: 0 12px 34px rgba(23,75,103,.07)
padding: 20–26px
```

Variants: empty state — the same card with `border: 1px dashed rgba(23,75,103,.14)`; accented — with a `3px solid` left bar in the state colour.

### 5.3 Inputs

```
background: #F0F7FC   (in developer forms — #FFFFFF)
border: 1px solid rgba(23,75,103,.18)
border-radius: 10px
padding: 13px 14px
font-size: 15.5–16.5px
placeholder: #8FA6B8
```

Error state: border `#B3453D`, message below the field at 13.5 px in `#8E362F`. Every field is labelled `Required` or `Optional` — the label is mandatory, not decorative.

### 5.4 Status chips

```
font-size: 12.5–13px
letter-spacing: .1em
padding: 4–5px 9–10px
border-radius: 4px
```

| State | Background | Text |
|---|---|---|
| Available / approved | `#E4EFE8` | `#205A87` / `#2F7D63` |
| Pending | `rgba(221,180,94,.16–.22)` | `#174B67` / `#205A87` |
| Rejected / risk | `rgba(197,86,79,.18)` | `#B3453D` |
| Neutral | `rgba(23,75,103,.05–.10)` | `#34495C` |

### 5.5 Tables

Header: 12 px, tracking .12em, weight 500, colour `#566E80`, bottom border `rgba(23,75,103,.1)`. Rows: 15.5 px, bottom border `rgba(23,75,103,.05)`, padding 11–12 px. Minimum width 520–620 px with horizontal scroll on narrow screens.

### 5.6 Toast

```
position: fixed; bottom: 26px; left: 50%
background: #1D3E56; color: #FFFFFF
border-radius: 12px; padding: 13px 18px
box-shadow: 0 14px 34px rgba(10,31,56,.32)
max-width: min(460px, 86vw)
```

Auto-dismiss after ~3.8 s; click closes; "Dismiss" label on the right.

### 5.7 Modal

```
background: #FFFFFF; border-radius: 12px; max-width: 470px
box-shadow: 0 26px 60px rgba(10,31,56,.4)
overlay: rgba(10,31,56,.55)
```

Structure: title 23 px / 600 → text 16.5 px → optional note on `#D3E5F2` → optional reason field → Cancel / confirm buttons (on the right). Confirm button colour: `#205A87` for regular and gold actions, `#8E362F` for destructive ones.

### 5.8 Logo

The mark (a 1·2·3 podium with a wave) at 48 px height + a text block: "BEST" in `#0F3F8F` + "INVEST" with the gold gradient, and below them "PROPERTIES" — 10 px, tracking .42em, in `#0F3F8F`, with `#D9B25B` rules either side. The landing page uses the full logo; inside the product, a simplified one.

## 6. Spacing

The grid is a multiple of 4 px. Typical values: 4, 6, 8, 9, 12, 14, 16, 18, 20, 22, 26, 30, 34, 38 px.

| Context | Spacing |
|---|---|
| Card inner padding | 20–26 px |
| Between cards in a column | 16 px |
| Between screen sections | 22–38 px |
| Page padding (desktop) | 34px 36px 56px |
| Page padding (mobile) | 22px 18px 40px |
| Between buttons in a row | 9 px |

## 7. Responsive behaviour

The interface switches layout at **one breakpoint — 760 px**. It is not a fluid grid: the mobile and desktop versions differ structurally.

| Element | Desktop (> 760 px) | Mobile (≤ 760 px) |
|---|---|---|
| Portal/admin side navigation | 210 px column, gold left bar on the active item | horizontal scrolling strip, active item is a white pill |
| Catalogue filters | left column | drawer with a selected-count badge |
| "Top 5" rail | right column, 268 px | moves **above** the list |
| Legal page contents | sticky column, 150–230 px | horizontal strip of pills |
| Legal page section | `34px + text` grid | single column |
| Legal page title | 44 px | 30 px |
| Tables | full width | horizontal scroll, `min-width` kept |
| Main navigation | horizontal links | burger menu, drop-down panel |

Scrolling is styled with the `.bip-scroll` class: 9 px track, thumb `rgba(23,75,103,.2)`, radius 16 px.

## 8. Accessibility

Contrast is calculated with the WCAG 2.2 formula (relative luminance, sRGB). Threshold for normal text: AA ≥ 4.5:1, AAA ≥ 7:1.

| Pair | Contrast | Rating |
|---|---:|---|
| `#0F3A60` on `#F7FCFF` | 11.33:1 | AAA |
| `#174B67` on `#F7FCFF` | 9.08:1 | AAA |
| `#36566B` on `#FFFFFF` | 7.78:1 | AAA |
| `#FFFFFF` on `#205A87` | 7.31:1 | AAA |
| `#B3453D` on `#FFFFFF` | 5.48:1 | AA |
| `#1B4258` on `#DDB45E` | 5.47:1 | AA |
| `#566E80` on `#FFFFFF` | 5.33:1 | AA |
| `#2F7D63` on `#FFFFFF` | 4.96:1 | AA |
| `#5B7485` on `#FFFFFF` | 4.90:1 | AA |
| `#FFFFFF` on `#087CB8` | 4.58:1 | AA (borderline) |
| `#8FA6B8` on `#FFFFFF` | 2.53:1 | **fails** — placeholder only |

Requirements:

- use `#8FA6B8` **only** as a placeholder, never as meaningful text;
- `#5B7485` (4.90:1) passes AA with a small margin — do not use it for text smaller than 12 px or on tinted surfaces where contrast would fall below the threshold;
- status is never conveyed by colour alone — a chip always contains text;
- the direction of the "Risk & Investor Protection" scale must be labelled in words;
- minimum touch target — 44×44 px for all interactive elements.
