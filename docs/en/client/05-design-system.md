# Design System — Best Invest Properties

Date: 25 September 2026  
Source: the approved prototype

This is the visual style of the approved prototype: colours, font, shapes and the main interface elements. Every value is taken directly from the prototype.

## 1. The look in short

- **Light and calm.** Every page sits on a very light blue background with white cards.
- **Blue for everything functional.** Text, links and buttons use shades of deep blue.
- **One warm accent — gold.** It marks the active menu item, key developer actions, the "TOP INVESTMENT" badge and the logo.
- **One font — Archivo.** Headings are bold and in capital letters.
- **Soft, rounded shapes.** Buttons are pill-shaped, cards have rounded corners and a soft blue shadow.
- **Mostly light, with a few dark accents.** The landing hero and some screen headers use deep navy; everything else is light, including the admin area.

## 2. Colours

### Main colours

| | Name | HEX | Used for |
|---|---|---|---|
| <span class="sw" style="background:#0F3A60"></span> | Deep navy | `#0F3A60` | main text, dark headers, text on gold buttons |
| <span class="sw" style="background:#174B67"></span> | Dark blue | `#174B67` | page titles, links |
| <span class="sw" style="background:#36566B"></span> | Slate | `#36566B` | paragraph text |
| <span class="sw" style="background:#566E80"></span> | Muted blue-grey | `#566E80` | labels, dates, secondary text |
| <span class="sw" style="background:#205A87"></span> | Primary blue | `#205A87` | main buttons, key figures, active links |
| <span class="sw" style="background:#087CB8"></span> | Bright blue | `#087CB8` | highlighted buttons, e.g. "Open full review" |
| <span class="sw" style="background:#DDB45E"></span> | Gold | `#DDB45E` | the accent: active menu item, developer actions, badges, logo |

### Backgrounds

| | Name | HEX | Used for |
|---|---|---|---|
| <span class="sw" style="background:#F7FCFF"></span> | Page background | `#F7FCFF` | the background of every page |
| <span class="sw" style="background:#FFFFFF"></span> | White | `#FFFFFF` | cards, tables, panels |
| <span class="sw" style="background:#EAF2F8"></span> | Panel blue | `#EAF2F8` | side navigation in the developer portal and admin area |
| <span class="sw" style="background:#F0F7FC"></span> | Field blue | `#F0F7FC` | form fields |
| <span class="sw" style="background:#F8EFDC"></span> | Gold wash | `#F8EFDC` | "under review" and "awaiting approval" areas |

### Status colours

| | State | HEX | Used for |
|---|---|---|---|
| <span class="sw" style="background:#2F7D63"></span> | Success | `#2F7D63` | approved, checked, introduction made |
| <span class="sw" style="background:#E4EFE8"></span> | Success background | `#E4EFE8` | "Available", "Approved" chips |
| <span class="sw" style="background:#B3453D"></span> | Error | `#B3453D` | errors, Reject, the GAP tag |
| <span class="sw" style="background:#8E362F"></span> | Error — dark | `#8E362F` | confirm button for a destructive action |
| <span class="sw" style="background:#FCF5F4"></span> | Error background | `#FCF5F4` | "Verification unsuccessful" block |

The prototype also uses a number of close shades of these colours for small details (borders, the gold gradient in the logo, secondary labels). They are listed in the technical version of this document.

Borders and shadows are tinted with blue rather than grey — this is what keeps the light pages from looking grey.

## 3. Font

**Archivo** is the only font, in four weights: regular (400), medium (500), semi-bold (600) and bold (700).

| Text | Size | Style |
|---|---|---|
| Landing hero title | 34–54 px on desktop (grows with the screen), 31 px on mobile | bold, capital letters |
| Page title | 28–34 px | bold, capital letters |
| Card and panel titles | 20–23 px | semi-bold |
| Paragraph text | 16.5 px | regular |
| Buttons, tables, labels | 15.5 px — the base interface size | regular or semi-bold |
| Small notes | 13–14 px | regular |
| Section labels | 12 px | capital letters, widely spaced |

All figures — prices, yields, scores — use equal-width digits so columns line up.

## 4. Shapes

| Element | Corners |
|---|---|
| Buttons, filter chips, tabs | fully rounded (pill) |
| Cards and panels | 16 px |
| Form fields | 10 px |
| Status chips | 4 px |

Cards are white, with a thin blue border and a soft blue shadow.

## 5. Main elements

### Buttons

| Button | Look | Used for |
|---|---|---|
| Primary | blue `#205A87`, white text | the main action on a screen |
| Bright | bright blue `#087CB8`, white text | highlighted actions, e.g. "Open full review" |
| Gold | gold `#DDB45E`, deep navy text | developer actions and "Open review" |
| Secondary | white with a thin blue outline | secondary actions |
| Destructive | red outline, red text | Reject, Decline, Suspend |
| Confirm destructive | dark red `#8E362F`, white text | the final "yes" for a destructive action |

All buttons are pill-shaped. There are no square buttons.

### Status chips

Small labels in capital letters, e.g. `AVAILABLE`, `AWAITING APPROVAL`, `DECLINED`.

| Meaning | Background | Text |
|---|---|---|
| Available / approved | light green | blue or green |
| Pending / awaiting | light gold | dark blue |
| Rejected / risk | light red | red |
| Neutral | light blue-grey | slate |

A status is never shown by colour alone — the chip always has text.

### Forms

- Every field is labelled **Required** or **Optional**.
- An error appears in red directly under the field, and the field border turns red.

### Confirmation window

Used before every important action. It has a title, a short explanation, an optional note, an optional required "reason" field, and **Cancel** / **Confirm** buttons. The confirm button is blue for normal actions and dark red for destructive ones.

### Notification (toast)

A dark navy bar at the bottom of the screen with a short message, e.g. "Saved to your shortlist". It disappears after about 4 seconds, or on click.

## 6. Desktop and mobile

The prototype has two layouts — desktop and mobile. On mobile the structure changes, not just the sizes:

| Element | Desktop | Mobile |
|---|---|---|
| Main navigation | links across the top | burger menu |
| Portal and admin side navigation | a 190 px column on the left, gold bar on the active item | a horizontal scrolling strip at the top |
| Catalogue filters | a column on the left | a slide-out panel showing how many filters are selected |
| "Top 5" list | a column on the right | moves above the results |
| Legal page contents | a column on the left | a horizontal strip |
| Tables | full width | scroll sideways |
| Landing hero title | 34–54 px | 31 px |

The exact screen width at which the site switches to the mobile layout is set during development.

## 7. Accessibility

The main colour combinations meet the international accessibility standard (WCAG 2.2, level AA — a contrast of at least 4.5 : 1):

| Text on background | Contrast |
|---|---:|
| Deep navy on the page background | 11.3 : 1 |
| Slate paragraph text on white | 7.8 : 1 |
| White on primary blue | 7.3 : 1 |
| Deep navy on gold | 6.0 : 1 |
| White on bright blue | 4.6 : 1 |

Also:

- the light placeholder colour in empty fields is used only as a placeholder, never for real text;
- a status is always shown with text, not colour alone;
- the direction of the "Risk & Investor Protection" score is always explained in words (more points = lower risk);
- every button and tappable element is at least 44 × 44 px.
