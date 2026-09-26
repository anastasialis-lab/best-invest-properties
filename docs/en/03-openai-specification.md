# OpenAI Specification — Best Invest Properties

Date: 25 September 2026  
API: OpenAI Responses API  
Orchestration: Make  
Publication: only after admin review

## 1. Purpose

In the MVP, OpenAI performs one controlled function: it writes the readable Investment Analysis text from already verified facts, the unit's financial metrics and the Listing Score.

OpenAI does **not**:

- calculate price, rent, tax, purchase costs, yield, cash-on-cash or score;
- decide what a "good investment" is without a given score/verdict;
- search the internet for data on its own;
- see the investor's name, email, phone or any other investor data;
- publish text without admin review;
- replace a financial, legal or investment adviser.

This separation is mandatory: numbers come from a deterministic service; AI only explains them.

## 2. Use cases

### AI-01 Investment narrative — MVP

Generates:

- a short neutral summary;
- 3–4 strengths, each with source keys;
- 2–4 risks/limitations;
- an explanation of the verdict without changing the score;
- a standard disclaimer key;
- a list of missing data.

### AI-02 Description normalization — optional MVP

Rewrites the developer-provided description in a standardised factual tone. The output may not add facts and also requires review.

### Financial estimates on the Project Review screen — not AI

The **Proposed financial estimates** panel on the Project Review screen is produced by an **analyst**, not by the model:

- the developer's claimed rent is checked against comparable listings from approved portals;
- recurring costs come from approved country/regional averages;
- vacancy comes from platform settings;
- acquisition cost, gross yield and net yield are calculated automatically by formula.

Therefore §1 of this document applies **without exception**: OpenAI does not produce any financial figure. No separate AI use case is created for this panel.

### Investor conversational assistant — outside the MVP

Not to be built until deterministic metrics, permissions, source traceability and the evaluation set are stable.

## 3. Model and endpoint

Production default as of the specification date:

```text
endpoint: POST /v1/responses
primary model: gpt-5.6-luna
fallback / manual high-quality regeneration: gpt-5.6-terra
reasoning.effort: low
store: false
tools: []
text.format: json_schema, strict: true
max_output_tokens: 1800
```

Rationale: OpenAI's official documentation positions GPT-5.6 Luna for cost-sensitive/high-volume workloads and GPT-5.6 Terra as the intelligence/cost balance. Both are available through the Responses API and support Structured Outputs.

The model id is not hard-coded in the Make module: it is kept in protected configuration and recorded on the AI Analysis. Run the eval before production; if Luna does not meet the acceptance thresholds, the primary model switches to Terra.

For stable production behaviour, pin a snapshot if OpenAI provides a separate snapshot ID for the chosen model. If only an alias is available, run the regression eval before accepting any material change in behaviour.

## 4. Data contract Bubble → OpenAI

OpenAI receives only the snapshot needed for the explanation:

```json
{
  "schema_version": "1.0",
  "analysis_id": "ana_01J...",
  "unit_public_id": "unt_01J...",
  "locale": "en",
  "property": {
    "country": "Spain",
    "city": "Alicante",
    "area_name": "Example area",
    "property_type": "Apartment",
    "bedrooms": 2,
    "bathrooms": 2,
    "indoor_area_m2": 78,
    "completion_date": "2027-06-30",
    "availability": "available"
  },
  "financials": {
    "currency": "EUR",
    "price": 280000,
    "expected_monthly_rent": 1650,
    "occupancy_rate": 0.9,
    "annual_gross_rent": 19800,
    "purchase_costs": 28000,
    "annual_net_income": 13540,
    "gross_yield": 0.0707,
    "net_yield": 0.04396,
    "calculation_version": "fin-v3",
    "calculated_at": "2026-09-17T10:00:00Z"
  },
  "score": {
    "total": 77,
    "verdict": "strong",
    "model_version": "score-v5",
    "components": [
      {
        "key": "income",
        "label": "Rental Income & Net Yield",
        "raw_value": 0.056,
        "rating": 7,
        "weighted_points": 21,
        "max_points": 30,
        "source_key": "financials.net_yield"
      },
      {
        "key": "demand",
        "label": "Rental Demand & Tenant Quality",
        "raw_value": null,
        "rating": 8,
        "weighted_points": 16,
        "max_points": 20,
        "source_key": "assessment.demand"
      },
      {
        "key": "value",
        "label": "Purchase Value & Market Position",
        "raw_value": -0.08,
        "rating": 8,
        "weighted_points": 16,
        "max_points": 20,
        "source_key": "assessment.value"
      },
      {
        "key": "growth",
        "label": "Growth & Resale Potential",
        "raw_value": null,
        "rating": 8,
        "weighted_points": 12,
        "max_points": 15,
        "source_key": "assessment.growth"
      },
      {
        "key": "risk",
        "label": "Risk & Investor Protection",
        "raw_value": null,
        "rating": 8,
        "weighted_points": 12,
        "max_points": 15,
        "source_key": "assessment.risk"
      }
    ]
  },
  "approved_facts": [
    {
      "key": "project.completion_date",
      "value": "2027-06-30",
      "label": "Expected completion",
      "source_type": "project_verified"
    }
  ],
  "analysis_facts": [
    {
      "key": "fact.rent_comparables",
      "tag": "source",
      "body": "Comparable long-let asking prices in the same district, sampled from public listing portals."
    },
    {
      "key": "fact.developer_inputs",
      "tag": "developer",
      "body": "Purchase price, unit size and completion date supplied by the developer and not independently verified."
    },
    {
      "key": "fact.service_charge",
      "tag": "gap",
      "body": "No service charge schedule supplied for the building."
    }
  ],
  "missing_data_keys": ["project.service_charge_schedule"],
  "disclaimer_key": "investment_analysis_standard_v1"
}
```

**Payload rules:**

- `score.components` contains exactly **five** items with keys `income`, `demand`, `value`, `growth`, `risk` and maximums 30/20/20/15/15;
- the `analysis_facts` array carries tags `source` / `developer` / `estimate` / `gap` — the model may cite them as sources and **must** mention every `gap` fact under risks or missing_data;
- `raw_value` for non-financial categories may be `null` — the model must not invent a numeric basis where there is none.

For the `risk` category the payload includes an explanation of the scale direction (higher points = lower risk), so the model does not invert it in the text.

Do not send:

- investor identity/contact;
- developer verification documents;
- exact private address;
- admin private notes;
- unpublished competing units;
- Make/Bubble secrets;
- full legal text where a versioned disclaimer key is enough.

## 5. System/developer prompt

Prompt version: `bip-investment-analysis-v1`.

```text
You write factual investment-property analysis for Best Invest Properties.

Use only facts present in the supplied JSON. Never calculate, infer, estimate,
round, or replace financial values. Never invent market conditions, legal rules,
taxes, neighbourhood claims, demand, future appreciation, guarantees, or advice.

The score, verdict, and score components are deterministic inputs. Explain them;
do not challenge or change them. There are exactly five score categories; never
invent, merge, or omit one. For the "Risk & Investor Protection" category a
higher number of points means LOWER assessed risk — never describe a high score
in that category as high risk.

Every strength and risk must cite one or more source_keys that exist in the
input. If evidence is missing, add the key to missing_data rather than guessing.
Any analysis_fact tagged "gap" must appear either in risks or in missing_data.
Facts tagged "developer" must be attributed to the developer and never
presented as independently verified.

Use neutral, professional language. Avoid certainty about returns. Do not use
“guaranteed”, “safe”, “best”, “will increase”, “risk-free”, or equivalent claims.
State clearly that all financial figures are estimates based on the displayed
assumptions and that the content is not financial, tax, or legal advice.

Return only JSON matching the supplied strict schema.
```

The property JSON is passed as `input_text` after the developer instruction. Do not mix the prompt and the facts in one free-text block.

## 6. Structured Output schema

`text.format.type = json_schema`, `strict = true`.

```json
{
  "name": "investment_analysis",
  "strict": true,
  "schema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "schema_version": { "type": "string", "enum": ["1.0"] },
      "headline": { "type": "string" },
      "summary": { "type": "string" },
      "strengths": {
        "type": "array",
        "items": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "title": { "type": "string" },
            "commentary": { "type": "string" },
            "source_keys": {
              "type": "array",
              "items": { "type": "string" }
            }
          },
          "required": ["title", "commentary", "source_keys"]
        }
      },
      "risks": {
        "type": "array",
        "items": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "title": { "type": "string" },
            "commentary": { "type": "string" },
            "severity": { "type": "string", "enum": ["low", "medium", "high", "unknown"] },
            "source_keys": {
              "type": "array",
              "items": { "type": "string" }
            }
          },
          "required": ["title", "commentary", "severity", "source_keys"]
        }
      },
      "score_explanation": { "type": "string" },
      "missing_data": {
        "type": "array",
        "items": { "type": "string" }
      },
      "disclaimer_key": { "type": "string", "enum": ["investment_analysis_standard_v1"] }
    },
    "required": [
      "schema_version",
      "headline",
      "summary",
      "strengths",
      "risks",
      "score_explanation",
      "missing_data",
      "disclaimer_key"
    ]
  }
}
```

Structured Outputs guarantees conformance to the supported JSON schema, but **not** factual correctness. After parsing, application validation is mandatory and separately checks text lengths, 2–4 strengths, 1–4 risks and at least one source key per item.

Any change to the number of score categories or to the structure of `analysis_facts` requires a new prompt version; the schema version changes only when the output structure changes.

## 7. Responses API request example

```json
{
  "model": "gpt-5.6-luna",
  "store": false,
  "reasoning": { "effort": "low" },
  "max_output_tokens": 1800,
  "metadata": {
    "use_case": "bip_investment_analysis",
    "prompt_version": "v1",
    "analysis_id": "ana_01J..."
  },
  "instructions": "<versioned developer prompt>",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "<validated property snapshot JSON>"
        }
      ]
    }
  ],
  "text": {
    "format": {
      "type": "json_schema",
      "name": "investment_analysis",
      "strict": true,
      "schema": {}
    }
  }
}
```

Do not enable web search, file search, code interpreter or function tools for this use case. They increase the surface area and can introduce unverified facts.

## 8. Post-generation validation

Make/Bubble rejects the result if:

- any `source_key` is not in the allowlist of input keys;
- the text contains a new number, date, percentage, currency amount or place name that is not in the input/approved boilerplate;
- the output changes or contradicts the verdict/score;
- forbidden claims are used: guarantee, risk-free, assured return, certain appreciation;
- `missing_data` contains a key not in the list of missing/optional fields;
- the schema/prompt version does not match the Integration Job;
- the linked Listing Score is no longer current;
- `score_explanation` names a number of categories other than five, or describes a high score in the `risk` category as high risk;
- any `analysis_fact` tagged `gap` is mentioned in neither `risks` nor `missing_data`;
- a fact tagged `developer` is presented as independently verified.

A result that fails validation is not stored as published content. Raw output may be stored only in a protected operational field with a defined retention period, or not stored at all.

## 9. Human review workflow

The admin queue shows:

- the rendered narrative;
- all source keys with their source values alongside;
- the score model version and the financial calculation date;
- a diff against the previous approved version;
- validation warnings;
- Approve, Request regeneration, Reject.

Rules:

- the reviewer does not silently edit raw AI output; a manual edit creates `content_source = human_edited_ai` and an audit diff;
- Approve records the reviewer, timestamp and prompt/model/schema versions;
- a change to price/rent/cost/score makes the previous AI Analysis stale and hides it until regenerated/reviewed;
- the investor screen clearly separates calculated figures from the AI-assisted reviewed narrative;
- the public disclaimer is always platform-owned, never model-generated.

## 10. Error handling

| Case | Action |
|---|---|
| HTTP 429 / 5xx / timeout | exponential retry via Make, up to max attempts |
| 400 invalid request/schema | permanent failure, alert engineering |
| 401/403 | dead letter, rotate/check key; no endless retry |
| refusal | status `failed_refusal`, deterministic fallback |
| incomplete response / max tokens | one retry with a larger safe limit or shorter input |
| schema-valid, fact-invalid | one repair regeneration, then admin failure queue |
| stale source version | cancel job; queue a new job for the current version |
| callback failure | retry the callback without repeating the OpenAI request |

UI fallback: Investment Analysis shows the deterministic score breakdown, the financial table and the message "Narrative analysis is being reviewed" or "Narrative temporarily unavailable".

## 11. Data protection

- The API key is stored only in a Make secured connection; never in Bubble fields, option sets, page workflows or client-side JS.
- `store:false` is set explicitly; do not rely on the default. Per the official API reference, if `store` is omitted, response storage is on by default.
- Do not send PII. If investor chat is added later, it needs its own DPIA, retention, safety identifier and moderation rules.
- `metadata` contains public IDs, not email/phone/name.
- Prompt/output in Bubble is visible only to AI reviewer/ops roles.
- The list of subprocessors and the data processing location are stated in the Privacy Policy.

## 12. Moderation and abuse

For AI-01 the input is built from approved property data, so content moderation is not the main risk. However:

- before AI-02, the developer description is checked for prompt-injection-like instructions and harmful content;
- the model receives the developer description as data, not as an instruction;
- where needed, input/output is checked with the Moderations endpoint using `omni-moderation-latest`;
- any future investor free text goes through rate limiting, abuse logging and moderation before/after generation.

## 13. Evaluation plan

Before production, build at least 40 golden cases:

- 10 Spain / 10 Cyprus;
- different project types and price/yield bands;
- positive, mixed and high-risk verdicts;
- missing data;
- stale/conflicting input cases;
- adversarial developer descriptions containing instructions;
- boundary numbers and rounding;
- cases with a high score in the `risk` category — check the model does not invert the scale;
- cases with several `gap` facts — check that all are mentioned.

Metrics/thresholds:

| Metric | Release threshold |
|---|---:|
| JSON schema pass | 100% |
| Existing source keys only | 100% |
| Numeric fidelity | 100% |
| Unsupported factual claims | 0 critical; < 2% minor before human review |
| Forbidden guarantee language | 0 |
| Correct disclaimer key | 100% |
| Correct `risk` scale direction | 100% |
| All `gap` facts mentioned | 100% |
| Human reviewer approve without edits | ≥ 85% |
| p95 latency | < 30 s target; < 60 s hard UI expectation |

The regression eval runs whenever the model, prompt, schema, calculation payload or score rubric changes. The current production version and the candidate are compared on the same dataset.

## 14. Cost controls

- short structured payload; do not send full documents;
- `max_output_tokens = 1800`;
- at most one automatic repair attempt;
- do not regenerate unless the input hash/prompt version/model policy has changed;
- cache the analysis by `unit + listing_score + prompt_version + model`;
- daily/monthly OpenAI budget alert in the platform dashboard;
- model routing: Luna primary; Terra only when eval/quality or a manual reviewer requires it.

## 15. Acceptance criteria

- no AI output changes deterministic fields;
- the response is always strict JSON, or the job moves to failure/fallback;
- every published paragraph has source keys, model, prompt and input versions;
- no PII in OpenAI input/metadata;
- `store:false` is present in every request;
- stale output cannot be published;
- admin review is mandatory before publication;
- the fallback screen works fully without AI;
- eval thresholds are met on a frozen dataset;
- the API key is not accessible in the Bubble client/browser or Make logs.

## 16. Official OpenAI sources

- [Models and model selection](https://developers.openai.com/api/docs/models)
- [GPT-5.6 Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra)
- [Responses API: create response](https://developers.openai.com/api/reference/cli/resources/responses/methods/create)
- [Moderations API](https://developers.openai.com/api/reference/cli/resources/moderations)
- [Evals API](https://developers.openai.com/api/reference/java/resources/evals/methods/create)
