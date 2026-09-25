# Специфікація OpenAI для Best Invest Properties

Дата: 25 вересня 2026  
API: OpenAI Responses API  
Оркестрація: Make  
Публікація: тільки після admin review


## 1. Мета

У MVP OpenAI виконує одну контрольовану функцію: створює читабельний текст Investment Analysis на основі вже перевірених фактів, Financial Snapshot і Listing Score.

OpenAI **не**:

- розраховує price, rent, tax, purchase costs, yield, cash-on-cash або score;
- визначає, що є “вигідною інвестицією”, без заданого score/verdict;
- самостійно шукає дані в інтернеті;
- бачить ім'я, email, телефон або інші дані інвестора;
- публікує текст без перевірки адміністратора;
- замінює фінансового, юридичного чи інвестиційного консультанта.

Це розділення є обов'язковим: числа походять із детермінованого сервісу, AI лише пояснює їх.

## 2. Use cases

### AI-01 Investment narrative — MVP

Генерує:

- короткий neutral summary;
- 3–4 strengths, кожна з source keys;
- 2–4 risks/limitations;
- пояснення verdict без зміни score;
- standard disclaimer key;
- список відсутніх даних.

### AI-02 Description normalization — optional MVP

Редагує developer-provided description у стандартизований factual tone. Вихід не може додавати факти й також потребує review.

### Фінансові оцінки на екрані Project Review — не AI

Панель **Proposed financial estimates** на екрані Project Review формує
**аналітик**, а не модель:

- заявлену забудовником оренду перевіряють за порівняльними оголошеннями з
  погоджених порталів;
- регулярні витрати беруться із затверджених середніх по країні/регіону;
- vacancy — з налаштувань платформи;
- acquisition cost, gross yield і net yield рахуються автоматично за формулами.

Тому §1 цього документа діє **без винятків**: OpenAI не формує жодної
фінансової цифри. Окремий AI use case для цієї панелі не створюється.

### Investor conversational assistant — поза MVP

Не будувати до стабілізації deterministic metrics, permissions, source traceability та evaluation set.

## 3. Модель і endpoint

Production default на дату специфікації:

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

Обґрунтування: офіційна документація OpenAI позиціонує GPT-5.6 Luna для cost-sensitive/high-volume workloads, а GPT-5.6 Terra — як баланс intelligence/cost. Обидва доступні через Responses API і підтримують Structured Outputs.

Model id не хардкодиться у Make module: зберігається у захищеній конфігурації й записується в AI Analysis. Перед запуском production виконати eval; якщо Luna не проходить acceptance thresholds, primary змінюється на Terra.

Для стабільної поведінки production бажано pin snapshot, якщо OpenAI надає окремий snapshot ID для вибраної моделі. Якщо доступний лише alias, regression eval запускається перед прийняттям суттєвої зміни поведінки.

## 4. Data contract Bubble → OpenAI

OpenAI отримує тільки snapshot, достатній для пояснення:

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

**Правила payload:**

- `score.components` містить рівно **п'ять** елементів із ключами
  `income`, `demand`, `value`, `growth`, `risk` і максимумами 30/20/20/15/15;
- додано масив `analysis_facts` із тегами `source` / `developer` / `estimate` /
  `gap` — модель може цитувати їх як джерела і **зобов'язана** згадати
  факти з тегом `gap` у розділі ризиків або missing_data;
- `raw_value` для нефінансових категорій може бути `null` — модель не повинна
  вигадувати числову підставу там, де її немає.

Для категорії `risk` у payload передається пояснення напряму шкали
(більший бал = нижчий ризик), щоб модель не перевернула його в тексті.

Не передавати:

- investor identity/contact;
- developer verification documents;
- exact private address;
- admin private notes;
- unpublished competing units;
- Make/Bubble secrets;
- legal text повністю, якщо достатньо versioned disclaimer key.

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

Property JSON передається як `input_text` після developer instruction. Не змішувати prompt і факти в одному вільному текстовому блоці.

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

Structured Outputs гарантує відповідність підтримуваній JSON schema, але **не** фактичну правильність. Після parse обов'язкова application validation, яка окремо перевіряє довжини тексту, 2–4 strengths, 1–4 risks і щонайменше один source key на кожний пункт.

Будь-яка зміна кількості категорій score або складу `analysis_facts` потребує
нової версії промпта; schema version змінюється лише тоді, коли змінюється
структура виходу.

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

Не вмикати web search, file search, code interpreter або function tools для цього use case. Вони збільшують surface area і можуть додати неперевірені факти.

## 8. Post-generation validation

Make/Bubble відхиляє результат, якщо:

- будь-який `source_key` відсутній у allowlist input keys;
- текст містить нове число, дату, відсоток, валютну суму або назву місця, якої немає в input/approved boilerplate;
- вихід змінює або суперечить verdict/score;
- використано заборонені claims: guarantee, risk-free, assured return, certain appreciation;
- `missing_data` містить ключ, якого немає у списку missing/optional fields;
- schema/prompt version не збігається з Integration Job;
- пов'язаний Financial Snapshot або Listing Score уже не current;
- `score_explanation` називає кількість категорій, відмінну від п'яти,
  або описує високий бал у категорії `risk` як високий ризик;
- будь-який `analysis_fact` із тегом `gap` не згаданий ні в `risks`,
  ні в `missing_data`;
- факт із тегом `developer` поданий як незалежно перевірений.

Результат, що не пройшов validation, не зберігається як published content. Raw output можна зберігати лише в protected operational field з визначеним retention або не зберігати взагалі.

## 9. Human review workflow

Admin queue показує:

- rendered narrative;
- усі source keys і вихідні значення поруч;
- score model/financial snapshot versions;
- diff з попередньою approved версією;
- validation warnings;
- Approve, Request regeneration, Reject.

Правила:

- reviewer не редагує raw AI output непомітно; ручна правка створює `content_source = human_edited_ai` і audit diff;
- Approve фіксує reviewer, timestamp, prompt/model/schema versions;
- зміна price/rent/cost/score робить попередній AI Analysis stale і приховує його до регенерації/перевірки;
- investor screen чітко відділяє calculated figures від AI-assisted reviewed narrative;
- публічний disclaimer завжди platform-owned, а не згенерований моделлю.

## 10. Error handling

| Випадок | Дія |
|---|---|
| HTTP 429 / 5xx / timeout | exponential retry через Make, не більше max attempts |
| 400 invalid request/schema | permanent failure, alert engineering |
| 401/403 | dead letter, rotate/check key; не retry нескінченно |
| refusal | status `failed_refusal`, deterministic fallback |
| incomplete response / max tokens | one retry з більшим safe limit або shorter input |
| schema-valid, fact-invalid | one repair regeneration, далі admin failure queue |
| stale source version | cancel job; queue new job for current version |
| callback failure | retry callback без повторного OpenAI request |

UI fallback: Investment Analysis показує deterministic score breakdown, financial table і повідомлення “Narrative analysis is being reviewed” або “Narrative temporarily unavailable”.

## 11. Data protection

- API key зберігається тільки у Make secured connection; не в Bubble fields, option sets, page workflows або client-side JS.
- `store:false` задається явно; не покладатися на default. За офіційною API reference, якщо `store` не передати, response storage за замовчуванням увімкнений.
- Не передавати PII. Якщо пізніше з'явиться investor chat, потрібні окремі DPIA, retention, safety identifier і moderation правила.
- `metadata` містить public IDs, не email/phone/name.
- Prompt/output у Bubble доступний тільки AI reviewer/ops roles.
- Список subprocessors і місце обробки даних відображаються в Privacy Policy.

## 12. Moderation і abuse

Для AI-01 input формується з approved property data, тому content moderation не є головним ризиком. Однак:

- developer description перед AI-02 перевіряється на prompt-injection-like instructions і harmful content;
- модель отримує developer description як data, а не instruction;
- за потреби input/output перевіряються через Moderations endpoint з `omni-moderation-latest`;
- будь-який майбутній investor free text проходить rate limit, abuse logging і moderation до/після generation.

## 13. Evaluation plan

До production створити мінімум 40 golden cases:

- 10 Spain / 10 Cyprus;
- різні project types, price/yield bands;
- positive, mixed і high-risk verdicts;
- missing data;
- stale/conflicting input cases;
- adversarial developer descriptions із instructions;
- boundary numbers і rounding;
- кейси з високим балом у категорії `risk` — перевірка, що модель не
  перевертає напрям шкали;
- кейси з кількома фактами `gap` — перевірка, що всі згадані.

Metrics/thresholds:

| Метрика | Release threshold |
|---|---:|
| JSON schema pass | 100% |
| Existing source keys only | 100% |
| Numeric fidelity | 100% |
| Unsupported factual claims | 0 critical; < 2% minor before human review |
| Forbidden guarantee language | 0 |
| Correct disclaimer key | 100% |
| Правильний напрям шкали `risk` | 100% |
| Усі факти `gap` згадані | 100% |
| Human reviewer approve without edits | ≥ 85% |
| p95 latency | < 30 s target; < 60 s hard UI expectation |

Regression eval запускається при зміні model, prompt, schema, calculation payload або score rubric. Порівнюються current production version і candidate version на тому самому dataset.

## 14. Cost controls

- short structured payload; не передавати повні documents;
- `max_output_tokens = 1800`;
- одна автоматична repair attempt максимум;
- не генерувати повторно, якщо не змінився input hash/prompt version/model policy;
- cache analysis по `unit + financial_snapshot + score + prompt_version + model`;
- daily/monthly OpenAI budget alert у platform dashboard;
- model routing: Luna primary; Terra лише коли eval/quality або manual reviewer вимагає.

## 15. Acceptance criteria

- жодне AI output не змінює deterministic fields;
- response завжди strict JSON або job переходить у failure/fallback;
- кожний published paragraph має source keys, model, prompt і input versions;
- жодного PII у OpenAI input/metadata;
- `store:false` присутнє в кожному request;
- stale output не може бути опублікований;
- admin review обов'язковий до publication;
- fallback screen повністю працює без AI;
- eval thresholds виконані на frozen dataset;
- API key не доступний у Bubble client/browser або Make logs.

## 16. Офіційні джерела OpenAI

- [Models and model selection](https://developers.openai.com/api/docs/models)
- [GPT-5.6 Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra)
- [Responses API: create response](https://developers.openai.com/api/reference/cli/resources/responses/methods/create)
- [Moderations API](https://developers.openai.com/api/reference/cli/resources/moderations)
- [Evals API](https://developers.openai.com/api/reference/java/resources/evals/methods/create)
