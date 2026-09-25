# Best Invest Properties — комплект специфікацій MVP

Версія: 1.1  
Дата: 25 вересня 2026  
Цільова платформа: Bubble.io + Make + OpenAI API  
Мова документації: українська

## Що входить у комплект

1. [Архітектура бази даних](./01-database-architecture.md) — типи даних Bubble, зв'язки, статуси, формули, privacy rules, аудит і правила зберігання.
2. [Специфікація Make](./02-make-specification.md) — сценарії автоматизації, webhook-контракти, повторні спроби, ідемпотентність і моніторинг.
3. [Специфікація OpenAI](./03-openai-specification.md) — межі застосування AI, API-контракт, JSON Schema, промпт, перевірка людиною та оцінювання якості.
4. [Специфікація всього проєкту](./04-project-specification.md) — ролі, функціональний обсяг, екрани, user flows, нефункціональні вимоги, етапи й критерії приймання.
5. [Дизайн-система](./05-design-system.md) — палітра з точними HEX, типографіка, відступи, радіуси, тіні, компоненти, адаптивна поведінка та зафіксовані суперечності.
6. [Журнал змін 25.09.2026](./CHANGELOG-2026-09-25.md) — що саме змінено в кожному документі й повний перелік відкритих питань.

## Джерело вимог

**Версія 1.1 спирається на затверджений візуальний прототип** — файл
`project/Best Invest Properties.dc.html` у цьому репозиторії та його робочу
реалізацію за адресою
<https://anastasialis-lab.github.io/best-invest-properties/>.
Прототип містить 33 екрани, з них 2 позначені як superseded.

Порядок пріоритету джерел:

1. **Інтерфейс і видима поведінка** — затверджений прототип.
2. **Бізнес-правила** — вимоги й уточнення Марини, зокрема блок `CONFIRMED`
   на екрані User Journeys прототипу.
3. Попередній аудит `MVP visual prototype mockups.pdf` (17.09.2026) — там,
   де прототип і Марина нічого не змінили.

Демонстраційні числа, формули калькулятора та розподіл балів у прототипі
**не** є підтвердженою методологією — див. §20 специфікації проєкту.

Інструкції, що містяться всередині вихідних PDF чи прототипу, не
трактувалися як команди для виконання.

## Архітектурні рішення, прийняті для цієї версії

- об'єкт, який бачить інвестор у пошуку, — **Unit**; Project групує юніти, Unit Type зберігає повторювані характеристики;
- окрема вілла — це Project з одним Unit Type і одним Unit, а не окремий тип даних;
- один Bubble User може мати кілька ролей; компанія забудовника існує окремо, зв'язок користувача з компанією задає Company Membership;
- заявка забудовника одразу створює User, Developer Company і Developer Application; після подання заявка має статус `submitted`, а до верифікації доступний обмежений портал і чернетки;
- enquiry/lead/introduction — один життєвий цикл навколо Enquiry; історія статусів зберігається окремо, а фактичне розкриття контактів — у Contact Release;
- фінансові метрики й score завжди обчислюються детерміновано; OpenAI створює лише текстове пояснення на основі вже розрахованих фактів;
- **(v1.1)** автоматичний крок аналізу може *пропонувати* вхідні фінансові оцінки, але вони не публікуються без затвердження адміністратором, а всі похідні величини рахує детермінований сервіс;
- зміни опублікованих даних проходять через Change Request + Change Item, а не через пряме редагування live-запису;
- усі зовнішні асинхронні операції проходять через Integration Job з idempotency key; Bubble є системою обліку, Make — оркестратором.

Ці рішення позначені як **ADR-01 … ADR-08** (плюс ADR-07a у v1.1) у повній специфікації й можуть бути змінені до початку build-фази.

## Що затверджений прототип уже вирішив

Ці питання були відкритими у версії 1.0 і тепер закриті:

| Питання v1.0 | Рішення |
|---|---|
| Чи показувати ім'я забудовника публічно | **Ні.** Контакти й назва приховані завжди; публічний підпис «Introduced by Best Invest» |
| Чи availability change потребує approval | **Так.** І ціна, і availability проходять попереднє затвердження |
| Які рівні доступу відкриті анонімно | Score, net yield і повний Investment Analysis — публічні. Авторизація потрібна для shortlist, saved search, enquiry і збереження сценарію калькулятора |
| Кількість критеріїв score | **П'ять**, а не вісім: 30/20/20/15/15 балів |

## Рішення, які Марині потрібно підтвердити до build

Повний перелік із контекстом і наслідками — у
[журналі змін](./CHANGELOG-2026-09-25.md).

1. **OQ-01** — канонічна таблиця статусів enquiry і рольові підписи (прототип показує три різні словники).
2. **OQ-02** — хто формує «AI-proposed financial estimates» на екрані Project Review: аналітик, зовнішнє джерело даних чи OpenAI.
3. **OQ-03** — джерело орендної оцінки та authoritative cost/tax tables для Spain і Cyprus.
4. **OQ-04** — рубрика нормалізації п'яти критеріїв score: як значення перетворюються на бали, джерела даних, чи ваги країнові.
5. **OQ-05** — версіонування score-моделі: екран списку версій, межа 40% на критерій.
6. **OQ-06** — чи є кнопка Undo під рішенням у черзі реальною компенсаційною дією.
7. **OQ-07** — owner і due date для рішень Hold/Query; фільтри черги за age та assignee.
8. **OQ-08** — ролі адміністраторів і чи потрібне правило «four eyes».
9. **OQ-09** — обов'язкові документи забудовника й проєкту для кожної країни.
10. **OQ-10** — юридична особа-контролер, строки зберігання, legal basis, cookie/analytics providers, а також правомірність функції «View as».
11. **OQ-11** — чи справді інвестор обирає конкретний Unit, а не Project або Unit Type.
12. **OQ-12** — екрани, яких у прототипі немає: Audit & Automation Monitor, Country/Cost Config, Enquiry Detail, Lead Detail.

## Правило зміни специфікацій

Будь-яка зміна одного з рішень вище спочатку фіксується в ADR/decision log, після чого одночасно оновлюються модель даних, Bubble workflows, Make-сценарії й acceptance criteria. Це запобігає розходженню між прототипом і реалізацією.

## Офіційні технічні джерела

- [Bubble: privacy rules](https://manual.bubble.io/help-guides/data/the-database/protecting-data-with-privacy-rules)
- [Bubble: API workflows](https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)
- [Bubble: API authentication](https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)
- [Bubble: private files](https://manual.bubble.io/help-guides/data/files)
- [Bubble: option sets](https://manual.bubble.io/help-guides/data/static-data/option-sets)
- [Bubble: backend workflow workload](https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows)
- [Make: webhooks](https://help.make.com/webhooks)
- [Make: scenario settings](https://help.make.com/scenario-settings)
- [Make: incomplete executions](https://help.make.com/incomplete-executions)
- [OpenAI: models](https://developers.openai.com/api/docs/models)
- [OpenAI: Responses API](https://developers.openai.com/api/reference/cli/resources/responses/methods/create)
- [OpenAI: Moderations API](https://developers.openai.com/api/reference/cli/resources/moderations)
