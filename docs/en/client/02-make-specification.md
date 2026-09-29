# Make Automation — Best Invest Properties

Version: 1.2  
Date: 29 September 2026  
Automation service: Make  
Main system: Bubble

## 1. What Make does

Make is the automation service that connects the platform to outside services: rental data sources and OpenAI. Make coordinates these external requests and returns the results to Bubble. Bubble stays the single place where all data is stored, reviewed and published.

The platform separates two kinds of figures (see Project Specification, 6.3):

- **Inputs and assessments** — for example the market rent estimate, comparable rentals, annual operating costs, the data needed for the total acquisition cost, and the category ratings that need judgement. These can be collected from sources or proposed with AI assistance. The admin checks, corrects if needed and approves them before they are used.
- **Fixed calculations** — acquisition cost, gross yield, net yield and the weighted score. Bubble applies these formulas, always the same way, to the values the admin has approved.

| System | Role |
|---|---|
| **Make** | sends requests to rental data sources and to OpenAI, and returns the results to Bubble |
| **Bubble** | stores the data, holds proposed values for admin review, applies the fixed formulas and publishes approved results |
| **OpenAI** | helps prepare proposed inputs and assessments for the admin to check, and writes the analysis text from reviewed data |
| **SendGrid** | delivers the emails |

Make **does not**:

- store business data;
- approve or publish any data;
- apply the yield or score formulas;
- make any approval, legal or investment decision.

Emails are triggered by Bubble and delivered by SendGrid. No separate Make automation is needed just to send them.

## 2. How an automation works

Every automation follows the same sequence:

1. Something happens on the platform — for example, a property is submitted for review, or its rental data needs to be prepared or refreshed.
2. Make gets the available sources or asks OpenAI for a proposal.
3. The sources, assumptions and result are saved in Bubble with the status **"awaiting review"**.
4. The admin checks the values and corrects them if needed.
5. Bubble applies the fixed formulas to the approved values.
6. The text analysis is created separately, from the reviewed data.
7. The admin checks the text before it is published.

Each task has a unique key, so a repeated step after a network error does not create duplicates — for example a second analysis or the same listings stored twice. An automation can still be run again on purpose, for example after the property's data has changed.

## 3. Automations in the MVP

The MVP has **two** Make automations. Automatic rental data collection works only for a source whose access has been agreed; until then, comparables are entered by hand (see 4.1).

| # | Automation | When it runs | What it does |
|---|---|---|---|
| 1 | Rental data collection | when a property's rental data needs to be prepared or refreshed | for each agreed source, gets comparable rental listings and returns them to Bubble for admin review |
| 2 | AI investment analysis | in two stages: (a) when a property is prepared for review; (b) after the required values and the score have been checked | (a) asks OpenAI for proposed inputs and assessments with sources and assumptions; (b) asks OpenAI to write the analysis text |

The specific rental data sources, how they can be accessed and how their data may be used are still to be confirmed. Automatic collection is possible only where a source provides suitable, permitted access.

Everything else is done by the platform itself, without Make. CRM export comes after the MVP.

## 4. Automations in detail

### 4.1 Rental data collection

The market rent estimate is based on documented comparable rentals, reviewed by the admin.

How it works:

1. Bubble records a task for a property whose rental data needs to be prepared or refreshed.
2. Make gets comparable rental listings from each approved source. The method depends on the source: an official API or data feed is used only where one exists and its use is permitted.
3. Make returns the listings to Bubble with their source and date.
4. Bubble groups the comparables by country, district, property type, bedrooms and size, and assesses how well they match using relevant features — for example a pool, parking or a gated area — where this data is available. These features are factors in assessing the match; a comparable does not have to match on every one.
5. Bubble shows the number of comparables, the rent range and the median. This is technical processing of the sample, not an approved figure.
6. The result is saved as **"awaiting review"**, and the admin approves it before it is used.

Rules:

- Make **never** changes a published figure.
- A new sample never overwrites the previous one.
- The method of getting data, and the right to use it, is checked for each source before it is connected.
- If there is no suitable source, the admin can enter documented comparables by hand — they are stored the same way. Otherwise the estimate stays marked **"needs review"**.
- The platform never creates an invented rent estimate.

### 4.2 AI investment analysis

This automation has two separate stages.

**Stage 1 — proposed inputs and assessments.**

- Make first sends the model the data collected from checked sources — for example the comparable rentals and the country cost data — with each source's link and date, together with the property information needed for the analysis, including information provided by the developer.
- Based only on this data, OpenAI may propose the following, each with a reference to its source:
  - the expected rent;
  - annual operating costs;
  - the data needed for the total acquisition cost;
  - qualitative assessments for the categories that need judgement.
- Every proposal comes with its sources and assumptions.
- If there is no source for a figure, OpenAI does not invent it: the figure is left empty and marked as a gap.
- The proposals are saved as **"awaiting review"**. The admin checks and corrects them, and only then does Bubble apply the fixed formulas for the yield and the score.

**Stage 2 — analysis text.**

- After the required values and the score have been checked, Make sends OpenAI the reviewed data and receives the analysis text.
- The text is saved as **"awaiting review"** and appears on the site only after the admin approves it.
- If the text contains a number that is not in the reviewed data, contradicts the score or promises returns, it is rejected automatically.

**Data protection.** Make never sends OpenAI personal data of investors or the contact details of developer representatives.

## 5. When something fails

- Temporary errors (network, a busy service) are retried automatically by the Bubble or Make workflows.
- Errors are logged, and the team is notified of a task that still fails. No separate screen is needed for this.
- A repeated task does not create a second analysis or a second rent sample.
- If a data source or OpenAI is unavailable, unchecked data is never published. Figures that are already approved stay visible, and an unfinished analysis text keeps its status — the property page still shows the score breakdown, with the note "Narrative analysis is being reviewed".
