# Content and Asset Inventory

This document is the source of truth for company website content readiness. It tracks verified facts, supplied material, publication approval, missing information, and UI blockers.

## Status Definitions

| Status | Meaning |
| --- | --- |
| `CONFIRMED` | A human confirmed the information. It may be used in UI within the exact recorded scope. |
| `PROVIDED` | Copy or information was supplied, but verification or publication approval may still be required. |
| `TBD` | The information, copy, asset, or decision is not yet available. |
| `BLOCKED` | The missing item prevents the related real-content UI from being implemented. |
| `NOT REQUIRED` | The item is not required for v1 and must not create an empty placeholder section. |

`CONFIRMED` does not authorize inferred benefits or expanded marketing claims. An item marked `PROVIDED / verification required` must not appear as a public fact until its evidence, exact wording, and publication approval are confirmed.

## TASK-014 Evidence Update

See [Brand and IP evidence](brand-ip-evidence.md) for the page-by-page certificate register, source hashes, duplicates, and missing holder evidence. Certificate facts are verified against supplied scans; current registry status and public UI wording are not approved by this intake. Two patents and six designs explicitly name 주식회사 승종; one patent and four designs need holder details.

## TASK-016 About Implementation Scope

The user-authorized next task permits a minimal factual About list for the two patents and six designs whose supplied certificates explicitly name 주식회사 승종. Exact names, numbers, dates, and related-design references are bounded to the evidence register. Implementation copy:

> 제공된 등록증에 주식회사 승종이 권리자로 기재된 특허·디자인의 등록 정보입니다. 현재 권리의 유효 여부를 나타내지는 않습니다.

User visual approval: **미확인**. This is not approval of current ownership/validity, product linkage, performance, safety, exclusivity, the entire site, or deployment. P3 and four missing-holder designs remain unresolved and excluded. Personal details and original PDFs are not published.

## Current Known Information

- `CONFIRMED`: Official and website display name — `(주)승종`
- `CONFIRMED`: Founded — `2017`
- `CONFIRMED`: Company type — Manufacturing
- `CONFIRMED`: Business area — 금형 설계
- `CONFIRMED`: Business area — 우레탄 성형·발포
- `CONFIRMED`: Product design, mold design and production, and urethane molding and foaming may be linked
- `CONFIRMED`: Current custom-shape and OEM production
- `CONFIRMED`: The company uses urethane as one material in manufacturing.
- `CONFIRMED`: Representative product/current display description — 퍼즐형 층간소음매트
- `CONFIRMED`: Primary audience — 신규 거래처
- `CONFIRMED`: Primary website goal — 회사 소개
- `CONFIRMED`: Primary conversion and contact method — 전화 문의

## Company Content

| Item | Status | Value / Asset | Notes |
| --- | --- | --- | --- |
| Official Company Name | `CONFIRMED` | `(주)승종` | Human-confirmed official name. |
| Website Display Name | `CONFIRMED` | `(주)승종` | Approved for site identification. |
| Company One-line Description | `CONFIRMED` | `(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.` | Provisional approved copy; do not expand with unsupported claims. |
| Company Introduction | `TBD` | — | A longer approved introduction has not been provided. |
| Founding Year | `CONFIRMED` | `2017` | Approved company fact. |
| Company Address | `CONFIRMED` | `경기도 안성시 서운면 사갑1길 296-49` | Approved contact/company information. |
| Phone Number | `CONFIRMED` | `031-674-3640` | Primary contact destination. |
| Email Address | `CONFIRMED` | `sjbjh3613@daum.net` | Secondary contact method. |
| Company History | `TBD` | — | Founding year alone does not establish a history narrative. |
| Vision | `NOT REQUIRED` | — | No approved vision; omit in v1. |
| Mission | `NOT REQUIRED` | — | No approved mission; omit in v1. |
| Core Values | `NOT REQUIRED` | — | No approved values; omit in v1. |
| Manufacturing Description | `CONFIRMED` | 제품 설계, 금형 설계·제작, 우레탄 성형·발포를 연계할 수 있는 제조업체 | Human-confirmed; equipment, facility ownership, scale, quality, and universal feasibility remain TBD. |
| Urethane Material Description | `TBD` | — | Do not infer composition, properties, or benefits. |
| Other Products / Production Items | `CONFIRMED` | 스펀지, 베개, 자동차 부품 | Human-confirmed as items included in urethane molding/foaming production; no specifications or catalog status inferred. |
| Business Area: 제품 및 금형 설계·제작 | `CONFIRMED` | 제품 설계; 고객 도면 기반 설계; 제품 아이디어의 설계 구체화; 금형 설계 및 제작 | Human-confirmed. Applies to urethane foam products and molds used for 자동차 부품 and 사무용 가구; do not infer finished office-furniture production. |
| Business Area: 우레탄 성형·발포 | `CONFIRMED` | 스펀지, 베개, 층간소음매트, 자동차 부품의 성형·발포 | Human-confirmed. Detailed formulas, equipment, conditions, capacity, and performance remain TBD. |
| Linked Design and Manufacturing | `CONFIRMED` | 제품 설계 → 금형 설계·제작 → 우레탄 성형·발포 | Human-confirmed available scope; not every order is required or guaranteed to use every stage. |
| Custom-shape Production | `CONFIRMED` | 고객이 원하는 형상에 맞춘 주문 생산 | Human-confirmed; does not guarantee feasibility for every material, shape, or specification. |
| Current OEM Production | `CONFIRMED` | 현재 OEM 생산 진행 | Human-confirmed and usable in Business copy. Does not verify volume, customers, sales results, terms, or ODM. |
| Primary Audience | `CONFIRMED` | 신규 거래처 | Does not mean every company activity is exclusively B2B. |
| Primary Website Goal | `CONFIRMED` | 회사 소개 | Primary product goal updated accordingly. |

## Product Content

### Representative Product: 퍼즐형 층간소음매트

| Item | Status | Value / Asset | Notes |
| --- | --- | --- | --- |
| Current Display Name / Description | `CONFIRMED` | 퍼즐형 층간소음매트 | May be used in UI now. |
| Separate Official Product Name | `TBD` | — | Whether a distinct commercial name exists is unknown. |
| Product Category | `CONFIRMED` | 층간소음매트 | Do not infer performance from the category name. |
| Product Summary | `CONFIRMED` | 회사의 대표 제품인 퍼즐형 층간소음매트 | Limited factual description only; not marketing copy. |
| Production Method | `CONFIRMED` | 우레탄 성형·발포 공정 | Human-confirmed for this representative product; do not infer formula, equipment, conditions, performance, or detailed material composition. |
| Material | `TBD` | — | The company's urethane work does not establish this product's detailed composition. |
| Dimensions | `CONFIRMED / PARTIAL COVERAGE` | 23 verified size/thickness combinations | TASK-017: user applicability authorization + official numeric evidence in [product-spec-evidence.md](product-spec-evidence.md). Unresolved rug/part measurements remain omitted. |
| Thickness | `CONFIRMED / PARTIAL COVERAGE` | 21, 22, 23, 24, 25, 26mm in their verified combinations only | Not every thickness applies to every size; no Cartesian product. |
| Colors | `TBD` | — | No colors confirmed. |
| Structure | `CONFIRMED` | 퍼즐 형태 | Detailed construction remains TBD. |
| Product Features | `TBD` | — | Do not create feature cards. |
| Intended Use | `CONFIRMED` | 층간소음매트 용도 | User group, environment, efficacy, and safety remain unconfirmed. |
| Installation Method | `TBD` | — | No instructions provided. |
| Performance Claims | `NOT REQUIRED` | — | Omit until verified and approved. |
| Noise Reduction Data | `NOT REQUIRED` | — | No verified data supplied. |
| Test Results | `NOT REQUIRED` | — | No verified results supplied. |
| Certifications | `NOT REQUIRED` | — | No certification evidence supplied. |
| Patents | `PROVIDED` | See Claims Requiring Verification | Five supplied PDFs inspected; exact certificate fields are recorded in brand-ip-evidence.md. Holder evidence is incomplete for some records; TASK-016 permits only the bounded company About list, not representative-product linkage. |
| Price | `TBD` | — | No pricing information provided. |
| Purchase Method | `TBD` | — | No purchase process confirmed. |
| Delivery Method | `TBD` | — | No delivery arrangement confirmed. |
| MOQ | `TBD` | — | No minimum order quantity confirmed. |
| OEM | `CONFIRMED` | Current OEM production at company Business level | Human-confirmed; product-specific terms, volume, customers, and sales results remain unconfirmed. |
| ODM | `TBD` | — | No ODM availability has been confirmed. |

## Claims Requiring Verification

| Supplied information | Status | Required before publication | Publication rule |
| --- | --- | --- | --- |
| 층간소음매트 최초개발 | `PROVIDED` | Evidence supporting `최초`, comparison scope and date, exact approved wording | Never publish `최초` without verification. |
| 대량 OEM 판매 업체 | `PROVIDED` | Evidence of the historical sales record, definition of `대량`, scope, and approved wording | Separate from confirmed current OEM production; does not establish sales volume, customers, results, or production capacity. |
| 상호 결속구조가 보강된 연결형 매트 | `PROVIDED` | Official source, exact registered/application title, number, status, ownership, approved wording | Do not state that a patent exists or is registered yet. Keep the supplied name unchanged. |
| 워셔블 베개 (previous supplied wording: 워셔블 베게 특허) | `PROVIDED` — certificate verified | 제10-1992471호, 2019-06-18, certificate holder 주식회사 승종; see evidence register | TASK-016 About certificate fact permitted; no current-validity or performance claim. |
| 기능성 바닥마감재를 구비한 퍼즐형 쿠션매트 | `PROVIDED` — certificate verified | 제10-2436238호, 2022-08-22, certificate holder 주식회사 승종; see evidence register | TASK-016 About certificate fact permitted; representative-product linkage remains pending. |
| 디자인등록증 (previous supplied label: 디자인특허증) | `PROVIDED` — scans inspected | Ten distinct designs; six name the company, four omit holder details; see evidence register | TASK-016 About list permits only six with company-holder evidence. The other four remain excluded; designs are distinct from patents. |

Only the bounded certificate facts identified above are authorized for the TASK-016 About UI; expanded claims remain unconfirmed. Do not generate patent numbers or assume registration/application status. The current OEM production fact is managed separately as `CONFIRMED`; it does not validate the `대량 OEM 판매 업체` claim.

## Image Assets

The official logo JPG has been supplied and preserved; a matching PNG is ready. Real product and company photos remain unavailable.

### Required / High Priority

| Asset | Status | Filename / Location | Usage | Approval Status | Alt Text Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Company Logo | `PROVIDED` | `assets/brand/seung-jong-original.jpg`; `public/brand/seung-jong.png` | Branded site identification | Original asset authorized; TASK-015 Header applied, user visual approval 미확인 | Header: empty alt beside visible company name; Home link named `(주)승종 홈` | 171 × 167px; exact decoded-pixel match; background preserved. |
| Representative Product Main Image | `TBD` | — | Product-led areas on Home and Products | Not provided | `TBD` | Image-dependent product presentation remains blocked; do not use stock product imagery. |

### Recommended

| Asset | Status | Filename / Location | Usage | Approval Status | Alt Text Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Product Full View | `TBD` | — | Accurate complete product view | Not provided | `TBD` | May become the main image. |
| Puzzle Connection Detail | `TBD` | — | Secondary structural detail | Not provided | `TBD` | Use only an actual approved product photo. |
| Installed Product Image | `TBD` | — | Actual installation context | Not provided | `TBD` | Do not stage or imply an unsupported use context. |

### Conditional

| Asset | Status | Filename / Location | Usage | Approval Status | Alt Text Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Manufacturing Facility Image | `TBD` | — | About or Business if approved | Not provided | `TBD` | Never substitute a stock factory as the company's facility. |
| Manufacturing Process Image | `TBD` | — | Business detail if approved | Not provided | `TBD` | Must not imply unverified technology, capability, or scale. |
| Urethane Material Image | `TBD` | — | Material explanation if approved | Not provided | `TBD` | Identity and context require verification. |
| Company Exterior Image | `TBD` | — | About or location context | Not provided | `TBD` | Must depict the real company location and be approved. |

## Contact Content

| Item | Status | Value / Asset | Notes |
| --- | --- | --- | --- |
| Contact Method | `CONFIRMED` | Phone primary; email secondary | Contact form backend remains outside v1. |
| Primary Contact Destination | `CONFIRMED` | `031-674-3640` | Use as the phone inquiry destination. |
| Phone | `CONFIRMED` | `031-674-3640` | Primary CTA channel. |
| Email | `CONFIRMED` | `sjbjh3613@daum.net` | Secondary contact channel. |
| Address | `CONFIRMED` | `경기도 안성시 서운면 사갑1길 296-49` | May be shown as company/contact information. |
| Sales Contact | `TBD` | — | No individual or department provided. |
| Product Inquiry Method | `CONFIRMED` | Phone inquiry | No separate product inquiry route confirmed. |
| Contact CTA Label | `CONFIRMED` | 전화 문의 | Must trigger a real phone link or clearly present the confirmed number. |

## Page Readiness

Readiness assesses a minimal, truthful v1 page. Optional sections without content must be omitted.

### Home

Available minimum content:

- Confirmed company display name and one-line description
- Two confirmed business areas
- Representative product display description
- Founding year, address, phone, and email
- Confirmed phone CTA

**Readiness: `READY`**

Limitations:

- No product or company images are available; use a typography-driven layout without a fake image.
- Detailed product features, claims, certifications, patents, customers, and historical OEM results must be omitted.

### About

Available minimum content:

- Company name and approved one-line description
- Manufacturing company type
- Founding year and address
- Confirmed business area names
- TASK-016 supplied-certificate list: two patents and six designs with explicit company holder; exact fields and relationships per evidence register

**Readiness: `READY`**

Limitations:

- Omit history narrative, vision, mission, core values, facilities, production scale, and company imagery.

### Business

Available minimum content:

- 금형 설계
- 우레탄 성형·발포
- Approved company one-line description
- Human-confirmed product and mold design/production scope
- Human-confirmed urethane molding/foaming items, custom-shape production, and current OEM production
- Linked design-to-manufacturing capability

**Readiness: `READY`**

Available implementation copy:

> (주)승종은 고객의 도면이나 제품 아이디어를 바탕으로 제품 설계와 금형 설계·제작을 진행하고, 우레탄 성형·발포를 통해 제품을 생산합니다.

This is an implementation draft that summarizes human-confirmed facts, not final approved marketing copy. The page must still omit equipment, facility, capacity, performance, universal-feasibility, customer, and historical sales claims.

### Products

Available minimum content:

- Current display name/description: 퍼즐형 층간소음매트
- Confirmed category, puzzle form, intended product category, and representative status
- Confirmed production method: 우레탄 성형·발포 공정
- Verified phone and email contact paths

**Minimum factual v1 page readiness: `READY`**

Implementation copy:

> 퍼즐형 층간소음매트는 (주)승종의 대표 제품으로, 우레탄 성형·발포 공정으로 생산합니다.

This is an implementation draft based on confirmed facts, not final approved marketing copy.

**Image-led or detailed product-page readiness: `PARTIALLY READY`**

Blockers for image-led or detailed product UI:

- Representative product image
- Detailed product copy and specifications
- Separate official product name decision, if one exists

A minimal text-based page may be implemented. Empty feature, performance, certification, or patent sections are not permitted.

### Careers

Available minimum content:

- Page inclusion decision only

**Readiness: `BLOCKED`**

Blockers:

- Approved recruitment availability message or policy
- At least one real next step for an applicant, if recruitment is active

Do not invent openings, benefits, culture, salary, roles, candidate profile, or process.

### Contact

Available minimum content:

- Company display name
- Phone and phone inquiry CTA
- Email
- Address

**Readiness: `READY`**

Limitations:

- No contact form backend is required or allowed in v1.
- Sales department or named contact details remain TBD and should be omitted.

## UI Blocking Rules

### Placeholder Policy

Do not create fake content that could be mistaken for real company or product information, including:

- Invented company identities, addresses, phone numbers, or email addresses
- Invented certifications, patents, customers, or OEM records
- Invented product performance, specifications, or safety claims
- Invented manufacturing equipment, capacity, process, or technology
- Fake recruitment notices, benefits, culture, salary, roles, or process

### Implementation Policy

When content is unavailable:

1. Determine whether it is required for the specific UI.
2. If optional, omit the section.
3. If required, mark the content and related UI `BLOCKED`.
4. Never fill the space with invented content.

A development-only Harness placeholder must be visibly non-production and impossible to mistake for company content.

## Implementation Readiness

### Minimum Content Required For TASK-001

The repository now has enough confirmed information to begin a constrained, real-content `TASK-001` that does not depend on images or unverified claims.

#### Available For TASK-001

- Website Display Name
- Provisional approved Company One-line Description
- Founding Year
- Company Address
- Business area names
- Representative product current display name/description
- Primary Audience and Website Goal
- Phone inquiry CTA and destination
- Secondary email contact

#### Remaining Blockers by Feature

- Image-led Home/Product presentation: representative product image and its publication approval
- Detailed Products sections: specifications, features, material detail, and approved imagery
- Careers page content: approved recruitment message and real applicant next step
- Branded visual identity: logo ready; Header layout approval and wider brand color decisions pending
- Broader IP claims or missing-holder records, historical OEM sales, and first-development sections: further evidence and approved wording; the bounded TASK-016 About certificate list is implemented

#### Can Be Added Later

- Logo UI integration and brand colors
- Product and company image assets
- Detailed company introduction and history
- Vision, mission, and core values
- Additional equipment, facility, capacity, and process details
- Product specifications, features, installation, performance, and commercial details
- Other products and broader business areas
- Verified certifications, patents, first-development claim, and OEM sales information
- Recruitment content

Items added later must be omitted until confirmed; they must not appear as empty cards or invented placeholders.

## Document Alignment Note

`docs/product.md`, this inventory, and `docs/design-system.md` are aligned for the implemented Business and minimum factual Products pages. Confirmed current OEM production remains Business-level content; product-specific OEM terms, the historical large-volume OEM sales claim, and first-development claim remain unconfirmed or verification-required. Patent/design certificate fields are now recorded in `brand-ip-evidence.md`; TASK-016 implements only the authorized About certificate facts. Incomplete holder evidence, current registry status, product linkage, broader wording, and user visual approval remain distinct pending items.

## Product illustration permission — 2026-09-18

The supplied handoff authorizes an independently made puzzle-mat example clearly labeled `제품 형태 예시 이미지`; it must not copy competitor assets or claim exact product appearance or performance. TASK-017 verifies and applies 23 combinations in four tables with independent SVG examples; see [specification evidence](product-spec-evidence.md) for unresolved fields. Real company exterior photography is still required for the planned Home Hero.

## Design refresh copy — 2026-09-18

Home adds the editorial line `제품의 시작부터, 설계와 제조를 잇다.` with the factual scope 제품 설계 / 금형 설계·제작 / 우레탄 성형·발포. Business cards summarize the already confirmed design, custom-shape, and OEM production scope. No new performance, ownership, capacity, or product claims are added. Copy and visual treatment are implemented for review; final user approval remains unconfirmed.

## TASK-018 Home and Footer — 2026-09-19

The Home company-facts summary keeps name, founding year2017 and address; business scope is already stated above and its duplicate row is removed. The shared Footer contains `(주)승종`, `금형 설계·제작 · 우레탄 성형·발포`, 회사소개 / 사업분야 / 제품 / 문의 shortcuts, the existing address/telephone/email and exactly `© 2026 (주)승종. All rights reserved.`. No inferred2017 copyright start, placeholder policy links or new company claims. Official logo pixels are unchanged. Final user visual approval: **미확인**.
