# Make Automation — Best Invest Properties

Date: 26 September 2026  
Automation service: Make  
Main system: Bubble

## 1. What Make does

Make is the automation service that connects the platform to outside services: property portals and OpenAI. The platform itself (Bubble) stays the single place where all data is stored and all figures are calculated.

The division of responsibility is simple:

| System | Role |
|---|---|
| **Make** | collects rental data from portals and requests the AI text |
| **Bubble** | stores the data and calculates every figure — price, rent, yield, score |
| **OpenAI** | writes the text explanation of an already verified result |

Make **does not**:

- store business data;
- calculate yield, tax or score;
- publish or change anything on the site without Bubble checking it first;
- make any approval, legal or investment decision.

## 2. How an automation works

Every automation follows the same five steps:

1. Something happens on the platform — for example, a property's score is calculated, or a rent sample becomes older than 90 days.
2. Bubble records a task: what needs to be done and for whom.
3. Make picks up the task and does the external part: asks OpenAI or collects listings from a portal.
4. Make reports the result back to Bubble.
5. Bubble applies the result and marks the task as done.

Each task has a unique key, so **nothing is ever done twice**: if a step is repeated after a network error, the analysis is not generated again and the listings are not stored twice.

## 3. Automations in the MVP

The MVP needs **two** Make automations.

| # | Automation | When it runs | What it does |
|---|---|---|---|
| 1 | Rental data collection | on a schedule | collects comparable rental listings from approved portals |
| 2 | AI investment analysis | when a property's score is calculated | asks OpenAI to write the analysis text |

Everything else is done by the platform itself, without Make. CRM export comes after the MVP.

## 4. Automations in detail

### 4.1 Rental data collection

This is the main reason Make is part of the platform. The market rent estimate comes from real comparable listings, not from the developer and not from AI.

How it works:

1. On a schedule, Make asks Bubble which rent samples need refreshing — samples that are missing or older than **90 days**.
2. Make collects comparable rental listings from each approved portal through its official API or data feed.
3. The listings are grouped by country, city/district, property type, number of bedrooms and floor area.
4. Make calculates the number of listings, the rent range and the median.
5. The result arrives in Bubble as a new sample with the status **"awaiting review"**.

Rules:

- Make **never** changes a published figure. The admin reviews every sample before it can be used.
- A sample of fewer than **5** listings is saved but cannot be approved.
- A sample of **5–9** listings can be approved but is marked **"thin sample"**, and investors see this note.
- A new sample never overwrites the previous one.
- If a portal has no API or feed, the admin can enter or import the listings manually — they are stored the same way.
- If a portal stops responding several times in a row, the team is notified, so the rent estimate never goes out of date unnoticed.
- Each portal is connected only after its data terms of use have been checked.

The thresholds (5, 10 and 90 days) are country settings and can be changed without development work.

### 4.2 AI investment analysis

When a property's score is calculated, Make sends OpenAI the verified facts about the property — never any investor data — and receives the analysis text.

- The text is saved as **"awaiting review"** and appears on the site only after the admin approves it.
- If the text contains a number that is not in the facts, contradicts the score or promises returns, it is rejected automatically.
- If OpenAI is unavailable, the property page still shows the score breakdown and the financial table, with the note "Narrative analysis is being reviewed".

## 5. When something fails

- Temporary errors (network, a busy service) are retried automatically.
- A task that still fails appears on the **Automation Monitor** screen in the admin area with a **Retry** button.
- A repeated task never creates a second analysis or a second rent sample.
- Make never receives any personal data of investors or developers.
