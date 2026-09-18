# Design System

**Status: Provisional**

This document defines the design direction and constraints for the company website before UI implementation. Exact visual values remain TBD until approved brand assets, content, and product imagery are available.

## Visual Refresh — 2026-09-18

The user requested a broader design improvement after TASK-016. The current implementation uses ivory `#fafaf7`, navy `#142c45`, and a pale blue-gray product surface `#e9eef2` as a proposed interface palette, not an approved corporate identity. Explicit heading weights restore hierarchy after the Tailwind reset. Home uses a two-column typographic introduction on desktop and a stacked layout on mobile, with factual business-scope labels and a Business link. No simulated factory/product photography is used. Business summaries have light surfaces; product and contact sections have distinct emphasis. Internal-page intro minimum heights and redundant main padding are reduced. The official logo, header interaction, registration records, section order, and verified facts remain intact. This request supersedes earlier task-specific restrictions on Home spacing and shared visual styling. Final user visual approval remains unconfirmed.

## Adopted Direction

**Balanced Company & Product with Moderate Corporate / B2B Emphasis**

The website balances the company and its representative product while giving moderate priority to company credibility and business-area comprehension for the primary user, 신규 거래처. It must guide that user through company, business, product, and contact information without looking like a product storefront or an excessively formal corporate portal. This audience priority does not imply that the company operates exclusively as a B2B business.

Confirmed context is limited to the following:

- The company operates in manufacturing.
- The company name is `(주)승종`, founded in `2017`.
- Its confirmed business areas are 금형 설계 and 우레탄 성형·발포.
- Confirmed capability spans product design, mold design and production, and urethane molding and foaming; current custom-shape and OEM production may be described factually.
- The company uses urethane as one of the materials from which it manufactures products.
- The representative product is a puzzle-style floor noise mat (`퍼즐형 층간소음매트`).
- The primary conversion is phone inquiry at `031-674-3640`; email is secondary.

The design must not imply environmental benefits, premium positioning, safety, technical superiority, industry leadership, high performance, certifications, patents, large-scale production, global operations, or proprietary technology without verified source material.

## Design Intent

- Neutral, restrained, and modern
- Clear hierarchy
- Balanced emphasis between company and product, with moderate corporate emphasis for 신규 거래처
- Company identity and business-area comprehension before detailed product exploration
- Typography-driven, with selective image usage
- Minimal unnecessary decoration
- Clear separation of company information and product information
- Trust established through organized, legible information rather than exaggerated marketing presentation
- Professional without becoming rigid, and product-aware without resembling an online store
- Flexible enough to serve other visitors without claiming that the company is B2B-only

## Layout System

- Use a centered content container.
- Use responsive single-column and multi-column compositions.
- Build pages from clear, modular sections.
- Use generous but not excessive whitespace.
- Desktop layouts may place text and an approved image side by side when the content supports it.
- Mobile layouts must resolve naturally into a single column.
- Content hierarchy takes priority over preserving a layout at a particular breakpoint.
- Tablet layouts must respond to content width and information density rather than simply shrinking the desktop layout.
- No layout may introduce unintended horizontal overflow.
- Exact container widths remain TBD. Primary navigation changes between mobile and desktop presentation at `48rem` (`768px` at the default root font size); other component breakpoints remain content-driven and TBD.

## Typography

**Font family: TBD**

Use a modern Sans Serif direction with Korean readability as the primary criterion. Avoid typefaces that appear excessively technical, decorative, or promotional.

### Hierarchy

| Role | Purpose | Direction |
| --- | --- | --- |
| Display / Hero | Primary page or company statement | Prominent but not excessively large; concise and readable |
| Section Heading | Identifies major information sections | Clearly distinct from body content and consistent across pages |
| Subheading | Groups related content within a section | Subordinate to the section heading while remaining easy to scan |
| Body | Communicates company and product information | Optimized for Korean readability and comfortable line length |
| Supporting Text / Caption | Provides labels, captions, and secondary context | Visually secondary without becoming difficult to read |

Company messaging and product names must be distinguishable through hierarchy, not through unrelated decorative styles. Heading and body relationships must remain clear at every viewport.

## Color Direction

**Exact colors: TBD**

Use a neutral base until official brand information is provided. Do not assume that the brand is blue, green, or any other specific hue.

### Semantic Roles

| Role | Purpose |
| --- | --- |
| Background | Primary page background |
| Surface | Visually groups content placed above the background |
| Primary Text | Main headings and body information |
| Secondary Text | Supporting and lower-emphasis information |
| Border | Separates regions and controls without excessive decoration |
| Brand Primary | Primary brand expression after approval |
| Brand Secondary | Supporting brand expression after approval |
| Accent | Limited emphasis for selected information or actions |
| Focus | Visible keyboard focus indication |
| Success | Confirmed successful status feedback |
| Warning | Information requiring caution or attention |
| Error | Error and invalid-state feedback |

Future color selection must:

- Provide sufficient contrast for text, controls, and focus indicators.
- Avoid unnecessary saturation.
- Remain suitable for both company and product information.
- Avoid using color as the only way to communicate meaning.
- Consider WCAG contrast requirements even while the exact compliance target remains TBD.

## Spacing

**Exact spacing scale: TBD**

- Use a consistent spacing scale rather than one-off values.
- Section spacing must make page structure clear without separating related content excessively.
- Component spacing must remain consistent across similar patterns.
- Use proximity to communicate content grouping.
- Reduce spacing deliberately on smaller screens without making controls or text crowded.
- Preserve readable text line length at wide viewports.
- The implementation may derive exact values from the Tailwind spacing scale after content and layouts are approved.

## Components

These entries define design responsibilities only. They do not require that every category become a separate code component.

| Category | Role and hierarchy | Responsive behavior | Accessibility requirement |
| --- | --- | --- | --- |
| Header | Identifies the site and contains primary navigation | Keeps essential identity and navigation available without crowding small screens | Uses semantic header/navigation regions; logo or site name has an accessible label |
| Navigation | Provides access to Home, About, Business, Products, and Contact; Careers is conditional on content readiness | May change presentation on smaller screens while preserving every exposed page | Keyboard operable; visible focus; current page is conveyed accessibly; any menu control has name and state |
| Hero / Company Statement | Communicates what kind of manufacturer the company is and establishes the page's highest information priority | Keeps the statement concise; avoids oversized text or images that push essential content too far down | Uses a logical primary heading; meaningful media has alternative text |
| Section | Groups one coherent topic and establishes page rhythm | Changes column count according to content needs | Uses semantic regions and headings where they improve navigation and understanding |
| Business Overview | Presents 제품 및 금형 설계·제작 and 우레탄 성형·발포 as distinct, factual business capabilities | May use separate columns when content supports them and a clear sequence on smaller screens | Each area has a meaningful heading; presentation does not imply unsupported claims through icons or labels |
| Product Highlight | Introduces the representative puzzle-style floor noise mat | Keeps the product identifiable and near its related action on all viewports | Product imagery uses accurate alternative text; no unsupported claim is presented visually or textually |
| Product Information | Presents only verified product details | Converts grids or grouped details into a readable mobile sequence | Information relationships remain available without relying on position, color, or hover |
| Company Information | Presents confirmed company details separately from product claims | Uses a readable list or definition structure when columns no longer fit | Labels and values have programmatic and visual relationships |
| CTA | Directs visitors primarily to phone inquiry and secondarily to email | Keeps the phone action reachable on mobile and the phone number visible on desktop without obscuring content | Uses an action-specific accessible name, real destination, and correct link semantics |
| Contact Information | Displays confirmed contact channels | Stacks channels clearly on smaller screens | Contact purpose and destination are understandable; values are selectable and links are correctly labeled |
| Footer | Contains essential company, navigation, and policy information | Reflows into grouped mobile sections | Uses a semantic footer and descriptive link text |
| Button | Triggers an action | Maintains adequate target size and does not overflow its container | Keyboard operable; visible focus; disabled and state changes are perceivable |
| Link | Navigates to a page, section, file, or external destination | Wraps without losing meaning or target clarity | Purpose is clear from link text and context; not distinguished by color alone |
| Image / Media | Supports verified company or product information | Maintains aspect ratio and appropriate crop without hiding essential subject matter | Informative images have meaningful alt text; decorative images use empty alt text |

## Product Presentation

The puzzle-style floor noise mat is a major visual element, but its presentation must remain factual.

- Prioritize actual, approved product images.
- Prefer an image that shows the product's form accurately.
- A verified image of the puzzle connection structure may be used as secondary imagery.
- Use installation photography only when an actual approved image is provided.
- Do not replace missing product photography with a stock product image.
- Do not create empty feature cards while product features remain TBD.
- Do not imply unverified effects through icons, diagrams, badges, comparison graphics, or decorative treatment.
- Do not alter product imagery in a way that misrepresents its shape, color, structure, or use.
- Product UI must not depend on an image while no approved product image is available.
- Until an approved image is supplied, use a restrained typography-based presentation of the confirmed product name, category, and relationship to the company.
- Do not present stock or generated imagery as the actual product. The 2026-09-18 handoff authorizes an independent puzzle-mat illustration/render labeled `제품 형태 예시 이미지`, without copying competitors or implying unverified performance. TASK-017 supplies four semantic mm specification tables with independent, decorative SVG outlines and adjacent textual dimensions. Stack each figure/table at mobile widths; use two columns from48rem. Qualify nominal, part, hex-axis and set measurements per `docs/product-spec-evidence.md`; no competitor imagery or inferred connector construction.

## Business Presentation

The confirmed business capabilities may be presented as two primary information units:

1. 제품 및 금형 설계·제작
2. 우레탄 성형·발포

- Use the human-confirmed descriptions recorded in `docs/product.md` and `docs/content-inventory.md`.
- A concise sequence may show `제품 설계 → 금형 설계·제작 → 우레탄 성형·발포` as linked available scope, not a mandatory workflow for every order.
- Current custom-shape and OEM production may be stated factually without implying volume, customers, results, or ODM.
- Do not create empty feature cards to make the section appear more substantial.
- Do not use arbitrary icons, diagrams, or badges that imply technical superiority or capability.
- Do not extend the confirmed scope into unverified advantages, equipment, facility ownership, universal feasibility, or production capacity.
- Do not generate or source facility and process imagery as if it represents `(주)승종`.
- Add richer presentation only after verified copy or approved real imagery is available.

## Corporate Information

The system must support a clear, orderly presentation of these confirmed details:

- Company name: `(주)승종`
- Founded: `2017`
- Address: `경기도 안성시 서운면 사갑1길 296-49`
- Phone: `031-674-3640`
- Email: `sjbjh3613@daum.net`
- Business areas: 금형 설계 and 우레탄 성형·발포

Use labels and values that remain easy to scan and understand when reflowed. Do not create statistics, counters, trust metrics, or performance highlights from the founding year or any other company information.

## Claims and Evidence

The following provided information is verification-required and must not appear in the current public UI:

- 층간소음매트 최초개발
- 대량 OEM 판매
- Unverified patent names, missing-holder registrations, and broader rights/product claims recorded in `docs/content-inventory.md`

Do not represent these items through badges, trust indicators, statistics, certification cards, patent cards, icons, timelines, or indirect visual implications. They may enter the design system only after their evidence and exact public wording are approved. This restriction applies to the unverified large-volume sales claim, not to the separately human-confirmed fact that the company currently performs OEM production.

## About Registration List — TASK-016

The authorized About section follows company information and precedes the contact CTA. Use separate, semantically named lists for patents and designs, containing only the two patents and six designs with explicit company-holder evidence in `brand-ip-evidence.md`. Show exact title, registration number, date, and the basic-design number only for the three documented related designs. No badges, ownership totals, trust banners, certificate scans, or product-performance illustrations.

Display the supplied-certificate scope and absence of current-validity verification near the heading. Use the existing neutral typography, section boundaries, and spacing. On mobile, each record's title precedes labeled number/date fields; at 768px and wider, titles and details share a row. Shared Header/Footer and Home spacing remain unchanged. User visual approval: **미확인**; implementation permission is not deployment permission.

## Image Strategy

Use imagery in this order of priority:

1. Actual representative product photography
2. Actual product detail or connection-structure photography
3. Actual installation photography
4. Actual manufacturing-site photography
5. Actual urethane-material photography

Items 3–5 may be used only when approved source material is provided and its context can be represented accurately.

Do not use stock factory imagery in a way that could be mistaken for the company's facilities. If a generic decorative image is necessary, it must not appear to document the company, its product, its material, or its capabilities. When appropriate images are unavailable, rely on typography, spacing, and information structure instead of fabricated visual evidence.

## Responsive Principles

Preserve this information order:

```text
Company Statement
→ Business Overview
→ Representative Product
→ Company Overview
→ Contact CTA
```

- On mobile, keep the confirmed phone CTA reachable and prevent the representative product from being pushed unnecessarily far down the page.
- On desktop, give company and business information moderate corporate emphasis while retaining the representative product as a major visual and informational element.
- On tablet, rearrange content according to readable width and density instead of scaling down the desktop composition.
- Navigation, headings, reading order, and actions must remain coherent when multi-column sections become a single column.
- Any future product imagery must fit the viewport without horizontal overflow or loss of essential product detail.
- The Products route may receive slightly more visual prominence than About while the representative product remains the primary confirmed offering.
- Careers must not appear in navigation until real recruitment content and a valid applicant next step are available.
- Primary navigation uses a `48rem` (`768px` at the default root font size) breakpoint. Other layout breakpoints remain TBD and must be chosen from content needs.

## Accessibility

- Use semantic HTML.
- Maintain a logical heading hierarchy.
- Make all interactive elements keyboard operable.
- Provide visible focus indicators.
- Give interactive elements accessible names that describe their purpose.
- Provide meaningful alternative text for informative images.
- Maintain sufficient color contrast.
- Do not embed essential text within images.
- Do not communicate information through hover alone.
- Do not rely on color alone to communicate meaning or state.
- Account for `prefers-reduced-motion` when motion is introduced.

The exact WCAG compliance target is TBD.

## Motion

- Complex animation is outside v1 scope.
- Motion must not interfere with reading or understanding information.
- Avoid excessive motion used only for decoration.
- Essential functionality must not depend on animation.
- Respect reduced-motion preferences.
- Add a specific motion rule only when an implementation need is demonstrated.
- Exact animation specifications are TBD.

## Homepage Visual Hierarchy

The homepage follows the provisional Product Definition order:

| Order | Section | Visual emphasis |
| --- | --- | --- |
| 1 | Company Statement | High |
| 2 | Business Overview | High |
| 3 | Representative Product | High |
| 4 | Company Overview | Medium |
| 5 | Contact CTA | Clear but not excessively promotional |

Company Statement establishes identity, Business Overview explains the two confirmed areas, and Representative Product acts as the primary product example. These sections must feel related rather than competing for hero status. Company Overview must present confirmed facts separately from business or product claims. The Products path may be slightly more prominent than About, but the company-introduction goal remains primary.

Do not create sections for certifications, customers, projects, statistics, performance, patents, or production capacity until verified and publishable information exists.

## Contact CTA

Primary contact is phone inquiry at `031-674-3640`. Email at `sjbjh3613@daum.net` is the secondary contact method.

- The primary CTA must initiate a real `tel:` action where supported.
- On desktop, display the phone number clearly even when the CTA is styled as an action.
- On mobile, keep the phone action easy to reach without using a persistent control that obscures content.
- Use concise, functional wording. `전화 문의` is currently approved as the semantic action; the final UI label may be confirmed during its implementation task.
- Email must use the real address and remain visually secondary to phone inquiry.
- Do not create a fake action, nonfunctional button, or backend contact form.
- CTA emphasis must remain clear but not excessively promotional.
- Company and product inquiry routes must not be visually separated unless the actual contact process later supports that distinction.

## Navigation

The current navigation candidate is:

- Home
- About
- Business
- Products
- Contact

Below `48rem`, the header keeps the company name, phone inquiry, and menu toggle in one compact row. The five navigation links are initially collapsed and open as a vertical list in normal document flow. The phone action remains visible while the menu is closed. At `48rem` and wider, the toggle is hidden and all five links remain visible in a horizontal navigation. The collapsible control must expose its name and expanded state, support Escape dismissal with focus restoration, and never leave collapsed links in the keyboard order or accessibility tree.

Careers belongs to the v1 product page list but its content readiness is `BLOCKED`. Do not expose Careers in navigation or create an empty Careers UI until approved recruitment content and a real next step exist. Add Careers to navigation only after it becomes ready. Projects is outside v1.

## TBD Decisions

- Official logo Header visual approval (TASK-015 composition implemented; 미확인)
- Brand primary color
- Brand secondary color
- Font family
- Exact breakpoints
- Exact spacing scale
- Product image assets
- Company image assets
- Final UI wording for the phone CTA
- Final marketing-copy approval for the confirmed Business descriptions
- Careers content and navigation activation
- Detailed accessibility target
- Supported browser range
- Animation usage

## Brand asset intake — TASK-014

Official logo PNG: `public/brand/seung-jong.png`, converted from the preserved JPG without visual changes. No global brand palette is inferred from the logo. TASK-015 places the unchanged PNG at 36px wide (automatic height, 171:167 ratio) beside the Korean company name inside the existing Home link. Empty image alt avoids repeating that identity; the link retains `(주)승종 홈`. At 768–1023px only navigation gaps and horizontal link padding are reduced to keep all links on one row; typography and the visible desktop phone number remain unchanged. Desktop/Mobile user visual approval: **미확인**. Certificate findings and publication limits are in [Brand and IP evidence](brand-ip-evidence.md).

## TASK-018 Home and Footer — 2026-09-19

Home uses natural content height: mobile section padding32px and Hero36px, desktop48–64px, with a24px compact contact band. Business numbers/titles share a row; 대표 제품 is a small label above the actual product h2. Footer uses the unchanged32px-wide logo with automatic aspect ratio and empty alt, desktop three columns/mobile stacked content and44px minimum link targets. Header retains its normal mobile row/desktop navigation; enlarged text can wrap to additional rows. At200% text, sections grow without clipping. 390px Hero measures401px; user visual approval remains 미확인. Final user visual approval: **미확인**.

Visible telephone numbers must remain part of their accessible names. The Home inquiry link uses `전화 문의 031-674-3640` so screen-reader and voice-control users receive the displayed destination number.

## Review decision — 2026-09-19

User approved the presented TASK-018 Home/Footer screen (“화면 괜찮음”). Company exterior photography is explicitly deferred until later. This approval does not resolve all historical internal-page reviews, incomplete product specifications, certificate-holder evidence, or domain/deployment decisions. TASK-019 preserves this visual treatment while investigating responsive keyboard focus.
