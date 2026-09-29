# Project Specification — Best Invest Properties MVP

Version: 1.2  
Date: 29 September 2026  
Platform: Bubble (no-code)  
Connected services: Make, OpenAI, SendGrid (email)

This document describes what the first version (MVP) of the platform does: who uses it, which screens it has, how each screen works and which rules apply. The screens follow the approved prototype. Numbers shown in the prototype are test data.

## 1. What we are building

Best Invest Properties is a platform for investment property in **Southern Europe**. The initial markets are **Spain and Cyprus**.

- **Investors** find a specific available unit, compare its figures and score, and ask Best Invest for an introduction to the developer.
- **Developers** get verified, submit projects and keep prices and availability up to date.
- **The Best Invest team** checks everything before it is published and approves every introduction.

The platform is not a financial adviser and does not handle payments or sales. Its value is a checked catalogue with clear figures, a reviewed written analysis and controlled introductions.

## 2. Users

| User | What they can do |
|---|---|
| **Visitor** (not signed in) | browse the catalogue, open any property, see its score, yields and full investment analysis, use the calculator |
| **Investor** | everything a visitor can, plus: save properties and searches, save calculator scenarios, compare, send enquiries, see their dashboard and settings |
| **Developer** | apply and get verified, manage their company profile, submit projects and units, request price/availability changes, see their leads |
| **Admin** (Best Invest team) | verify developers, review and publish projects, approve introductions and listing changes, manage the score model and users |

There is one admin type in the MVP. Every important admin action needs a confirmation and is recorded in the history log. Admin accounts are created by another admin; there is no self-registration.

## 3. How the system fits together

| Part | What it does |
|---|---|
| **Bubble** | the website, the database, all calculations (yields, score) and all emails |
| **Make** | collects comparable rental listings from property portals and requests the AI text from OpenAI |
| **OpenAI** | writes the investment analysis text and helps prepare proposed figures and assessments for the admin to check |
| **SendGrid** | delivers the emails that Bubble sends |

The rule behind this split: **fixed calculations are always done by the platform; anything proposed with AI assistance is checked by the admin before it is used** (see 6.3).

## 4. Screens

The number in brackets is the screen number in the approved prototype.

### Public site and investor

| Screen | What it is for |
|---|---|
| Landing (01) | first page: search form, how it works, featured properties |
| Browse (02) | the catalogue with filters, sorting and the Top 5 list |
| Property (04) | one unit: photos, price, availability, figures, score |
| Investment Analysis (05) | the score breakdown, sources and the written analysis |
| Calculator (06) | the investor's own return scenario |
| Compare (07) | up to five properties side by side |
| Registration (08) | investor sign-up |
| Login (15) | investor sign-in |
| Forgot password (24) | password reset |
| Investor Dashboard (09) | saved properties, saved searches, enquiries |
| Account Settings (25) | contact details, criteria, consents, password, account closure |
| Enquiry Detail (new) | one enquiry with its status history |
| Privacy (17), Terms (18) | legal pages |
| Cookie Policy, disclaimers (new) | legal pages in the same layout |

### Developer

| Screen | What it is for |
|---|---|
| For Developers (16) | information page for developers |
| Developer Sign-up (19) | the application form |
| Verification Status (26) | application status, re-uploading documents |
| Company Profile (27) | company details |
| Developer Portal (10) | the developer's home screen |
| Add / Edit Project (11) | the project and unit editor |
| My Projects (20) | list of the developer's projects |
| Project & Units (21) | units, prices, availability, change history |
| Leads (22) | enquiries about the developer's units |
| Lead Detail (new) | one lead and its outcome |

### Admin

| Screen | What it is for |
|---|---|
| Admin Login (31) | staff sign-in |
| Dashboard (12) | key counters, the next project to review, new enquiries |
| Approvals (23) | one queue for all decisions |
| Project Review (28) | full review of a submitted project, including the analysis |
| Developer Verification (29) | checking a developer's documents |
| User Management (30) | investors and developer contacts |
| Score Editor (13) | score weights and model versions |

The admin menu has four items: **Dashboard · Approvals · Investors · Investment Scores**. Project Review and Developer Verification open from the Approvals queue.

"New" screens are not in the prototype yet. They are simple, one screen each, in the same style.

**Ideas to scope separately** (not part of this release): Country Fact Sheets, an editor for updating them, and a blog.

## 5. Main journeys

### Investor: from search to introduction

1. The visitor sets country, budget, property type and minimum yield on the landing page.
2. The catalogue opens with these filters applied.
3. The visitor opens a property, reads the analysis, tries the calculator and compares properties.
4. To send an enquiry, the visitor signs in or registers.
5. The investor confirms consent to share their contact details and sends the enquiry.
6. The admin reviews the enquiry and approves the introduction.
7. Both sides receive an email with each other's contact details.
8. The investor follows the status on their dashboard; the developer sees it in Leads.

### Developer: from application to verified portal

1. The developer fills in the application and uploads company documents.
2. The admin checks the documents one by one.
3. The admin approves, rejects, or asks for more information.
4. Once approved, the developer can add projects.

### Developer: from project to publication

1. The developer creates a project, adds unit types, units, photos and documents.
2. The developer submits it for review; during review it cannot be edited.
3. The admin reviews the project and the financial estimates, then approves it or asks for changes.
4. The admin publishes it as a separate step. Published units appear in the catalogue.

### Developer: price or availability change

1. After publication the developer can change only **price** and **availability** (Available / Reserved / Sold).
2. The change waits for admin approval; the unit shows "Price change pending approval".
3. After approval the figures and the score are recalculated automatically.
4. All other fields are locked; changing them needs a new review.

## 6. Features

### 6.1 Catalogue

**Filters** (left column, applied immediately):

| Filter | Values |
|---|---|
| Country | Cyprus, Spain |
| Property type | Apartment, Villa, House |
| Bedrooms | Studio, 1, 2, 3+ |
| Strategy | Long-term rental, Short-term rental, Mixed with private use, Capital growth |
| Completion | Ready, less than 12 months, 12–24 months |
| Maximum price | slider from €100k to €600k+ (the top position means no upper limit), so an investor can set their budget even if no current listing is that low |
| Minimum gross yield | slider 4% – 10%, default 6% |
| Minimum net yield | slider 3% – 8%, default 4.5% |

- **Sorting:** net yield (default), gross yield, investment score, price.
- **8 properties per page**, with page numbers and "Showing X–Y of N properties".
- **Top 5** list next to the results, following the current sorting. On mobile it moves above the list.
- **Capital-growth properties** (bought mainly for price growth rather than rent) are found with the Strategy filter "Capital growth". When this strategy is selected, the yield filters do not hide them. They can be sorted by investment score or price; when sorting by yield, properties without a rental yield appear at the end.
- An investor can add properties to **Compare** straight from the cards — up to five.
- On mobile the filters open in a slide-out panel.

**What needs sign-in:** browsing, property pages, scores and the full analysis are open to everyone. Saving a property, saving a search, saving a calculator scenario and sending an enquiry need an account.

### 6.2 Property page

- Price, availability, unit details, project facilities, photos, score and financial figures.
- **Two sets of rental figures, shown separately:** the developer's claimed rent and yield, and the platform's reviewed rent estimate and calculated yield.
- The developer's name and contacts are **never shown**. The page says "Introduced by Best Invest".
- If the unit is sold or withdrawn, the page says so and suggests similar properties.
- After an enquiry is sent, the button is replaced by a confirmation with the enquiry reference.

### 6.3 Investment score

The score is out of 100 and has **five categories**:

| Category | Points |
|---|---:|
| Rental Income & Net Yield | 30 |
| Rental Demand & Tenant Quality | 20 |
| Purchase Value & Market Position | 20 |
| Growth & Resale Potential | 15 |
| Risk & Investor Protection | 15 |

**Fixed calculations and AI-assisted assessments.** The platform separates two kinds of figures:

| Kind | Examples | Who produces it |
|---|---|---|
| Fixed calculations | acquisition cost, gross yield, net yield, points from each rating, the total score | calculated by the platform, always the same way |
| Proposed figures and assessments | market rent estimate, comparable properties, category ratings that need judgement (demand, growth, risk, value) | may be proposed with AI assistance; the admin checks and approves them before they are used |

Nothing proposed with AI assistance reaches investors without the admin's approval.

**Scoring methodology — draft, still to be approved.** The working proposal below is how each category would get a **rating from 0 to 10**, turned into points as `points = rating / 10 × category weight`.

**Rental Income & Net Yield** — rated automatically from net yield:

| Net yield | < 2% | 2–2.99% | 3–3.99% | 4–4.99% | 5–5.99% | 6–6.99% | 7–7.99% | ≥ 8% |
|---|---|---|---|---|---|---|---|---|
| Rating | 0 | 2 | 4 | 6 | 7 | 8 | 9 | 10 |

**Purchase Value & Market Position** — the price per m² compared with the median for new builds in the district:

| Compared with the median | ≥ 15% cheaper | 10–15% cheaper | 5–10% cheaper | within ±5% | 5–10% dearer | 10–15% dearer | > 15% dearer |
|---|---|---|---|---|---|---|---|
| Rating | 10 | 9 | 8 | 7 | 5 | 3 | 1 |

**The other three categories** are assessed using sub-criteria that add up to 10:

| Category | Sub-criteria (points) |
|---|---|
| Rental Demand & Tenant Quality | market activity (3), year-round demand (3), tenant variety (2), seasonality and vacancy risk (2) |
| Growth & Resale Potential | price trend (4), liquidity (3), infrastructure and economy (2), data quality (1) |
| Risk & Investor Protection | legal title (3), building permits (2), payment/escrow protection (2), developer check (2), construction stage (1) |

For **Risk & Investor Protection**, more points means **lower** risk — this is written next to the scale.

The analysis screen also shows the **Sources, assumptions & gaps** block, where every fact is tagged `SOURCE`, `DEVELOPER`, `ESTIMATE` or `GAP`. If the AI text is not ready, the page still shows the score breakdown.

### 6.4 Where the figures come from

| Figure | Source |
|---|---|
| Price, size, completion date | the developer |
| Developer's claimed rent | the developer — stored separately, never used automatically |
| Market rent estimate | comparable rental listings from approved portals, reviewed by the admin |
| Running costs | approved averages for the country |
| Vacancy allowance | platform settings |
| Purchase taxes and costs | official country rates, checked by a tax consultant |
| Acquisition cost, gross yield, net yield | calculated by the platform |

**Rent estimate:**

- comparable rentals are grouped by country, district, property type, bedrooms and size, and assessed using relevant features such as a pool, parking or a gated area; the platform shows a range and a median;
- if a portal has no data feed, the listings can be entered by hand;
- the admin approves every estimate before it is used.

On Project Review the admin sees the developer's claimed rent, Best Invest's comparable rent and the rent used for the score side by side.

### 6.5 Calculator

- Inputs: purchase price, monthly rent, occupancy, management fee. There are no mortgage, deposit, interest-rate or loan-term inputs.
- The **long-term / short-term** switch sets the rental strategy. The **base / average / best case** switch sets the rent.
- Country purchase costs and running costs are added automatically.
- A property still under development shows **no rental income before its expected completion date**.
- **5- and 10-year projections** are shown; how they are calculated is still to be agreed.
- Errors are shown under the field, and the result is not shown until they are fixed (e.g. "Enter a purchase price above zero.").
- Saving a scenario needs an account.

### 6.6 Compare

- Up to **five** properties; adding a sixth shows a message.
- Rows: price and acquisition cost, rent and net yield for base / average / best case, gross yield, investment score, the five score categories, size, completion.
- The best value in each row is highlighted.

### 6.7 Registration and sign-in

- **Investor registration:** full name, email, password (at least 8 characters with a number) — required; phone and country — optional. Consent to Terms and Privacy, plus a **separate** marketing consent.
- Email and password only — no Google sign-in in the MVP.
- **Investor login:** email and password, "Keep me signed in", a link to developer sign-in.
- **Admin login:** a separate staff screen (email and password), locked after too many failed attempts.
- There is no two-factor sign-in in the MVP.
- **Forgot password:** four steps — request, email sent, new password, done. The message never reveals whether an account exists.

### 6.8 Investor dashboard and settings

- Dashboard: investment criteria, recommended properties, saved properties (with "price changed" / "status changed" badges), saved searches, enquiries and their status.
- Saved searches are saved filters to reopen later. When a new property matching a saved search is published, the investor receives an email.
- Settings: contact details, criteria, consents, password change, account closure (with a reason; records linked to completed introductions are kept for seven years as required by law).

### 6.9 Developer application

- **Company:** registered name, registration number, country, developer licence number (required); website, years active (optional).
- **Contact:** name, work email, phone, password (required); role (optional).
- **Portfolio:** projects completed, projects currently selling, typical unit price.
- **Documents:**

| Document | Level |
|---|---|
| Company registration certificate | required before verification |
| Developer licence | required before verification |
| Building permit for the first project | to confirm — needed before the project is published |
| Escrow or bank guarantee | to confirm — off-plan only |
| Two client or bank references | optional |

The document list is a setting per country, not fixed in the build. After submitting, the developer gets a reference (e.g. `APP-0142`) and sees the status: under review, more information needed, or rejected.

### 6.10 Project editor

- Project: name, location, GPS, completion date, number of units, type — **single property** or **complex**.
- Facilities: communal pool, gym, gated area, underground parking, tennis/golf, concierge, lift, landscaped gardens.
- Units: number, bedrooms, bathrooms, area, price, expected rent. Units can be duplicated.
- Photos with a chosen cover; floor plans assigned to a unit type.
- Actions: **Save draft**, **Discard draft**, **Submit for review** — each with a confirmation.
- A project can be submitted with only some of its units entered; all units are needed before publication.

### 6.11 Leads and introductions

- The developer sees each lead's reference, unit, budget band and stage — but **no investor contact details** until Best Invest approves ("Contact details released after Best Invest approves").
- After approval, the investor's name, email and phone appear on the lead.
- The developer is expected to make first contact within **five working days**.
- The developer records the outcome (e.g. viewing booked, reserved, not interested).

**Admin decisions on an introduction:**

| Decision | Emails | Result |
|---|---|---|
| Approve & connect | to the investor **and** the developer | contacts shared, status "Connected" |
| Hold | none | status "On hold"; reason and follow-up date required |
| Decline | to the investor only — neutral wording with three similar properties | status "Declined"; the admin can enter an internal free-text reason, never shown to the investor or the developer; the developer sees only a count of filtered-out requests |

Before approval a warning says that contact details cannot be recalled once sent.

### 6.12 Admin area

- **Dashboard:** five counters (registered investors, active developers, published properties, new enquiries, hot leads), the next project to review, and a table of new enquiries.
- **Approvals:** one queue with five tabs — All, Project submissions, Developer applications, Introductions, Listing changes — plus filters by age, overdue follow-up and status.
  - Hold, Query and Reject need a reason, and Hold and Query also need a follow-up date. For Decline, the admin can enter an internal free-text reason.
  - After a decision there is no Undo: the admin can **Reopen** a held or declined request, or **Correct status**.
- **Project Review:** the analysis panel with the figures, the proposed financial estimates with their sources, the five category scores and the sources/gaps list. Nothing is visible to investors until the admin approves it.
- **Score Editor:** five weight sliders (0–100%, must total 100%; a warning if one category is above 50%), recalculation of all properties with a progress bar, and a small table of model versions. Going back to an older version creates a new version.
- **User Management:** a list of users with the Suspend action (reason required).

### 6.13 Emails

All emails are sent by the platform.

| Event | Who receives it |
|---|---|
| Email verification, password reset | the user |
| Developer application received; verification decision | the developer |
| Project decision: changes requested / approved / published / rejected | the developer |
| Price or availability change: queried / approved / rejected | the developer |
| Enquiry received | the investor |
| Introduction approved | the investor and the developer |
| Enquiry on hold | nobody |
| Enquiry declined | the investor only, in neutral wording |
| Price or availability of a saved property changed | investors who saved it or have an open enquiry |
| New property published that matches a saved search | investors with that saved search |

### 6.14 Legal pages

- The final wording of the legal pages still needs legal review.
- No governing law or jurisdiction is assumed yet.
- Commission is not described as applying only in some cases.
- The disclaimers state that projected and actual returns **may differ**.

## 7. Enquiry statuses

One status, shown with different wording to each user:

| Stage | Admin sees | Investor sees | Developer sees |
|---|---|---|---|
| Submitted | New | Request received | — |
| Being checked | Qualifying | Awaiting analysis | — |
| Checked, waiting for decision | Hot lead / Awaiting you | Awaiting admin approval | Awaiting admin approval |
| On hold | On hold | Under review | On hold |
| Declined | Declined | Not available | Filtered out by Best Invest |
| Introduction being sent | Connecting | Introduction being prepared | Introduction being prepared |
| Introduced | Connected | Developer contacted | Introduced |
| Developer responded | In progress | Developer responded | Contacted |
| Completed | Converted | Completed | Converted |
| Closed | Closed | Closed | Closed |
| Cancelled | Cancelled | Cancelled | Cancelled |

"—" means the developer does not see the enquiry at that stage.

## 8. Key rules

1. **Nothing is public without admin approval** — developers, projects, figures, AI text.
2. **The developer stays anonymous** in the catalogue; contacts are shared only after investor consent and admin approval.
3. **The developer's rent claim is never used as the market rent** without checking.
4. **After publication only price and availability can change**, and only with admin approval.
5. **Fixed calculations are always done by the platform**; anything proposed with AI assistance — figures, assessments or text — is used only after admin approval.
6. **A new score model never overwrites old scores** — they stay in history.
7. **Account closure** blocks access immediately; records required by law are kept.
8. **Privacy is enforced by the database rules**, not just by hiding things on screen.
