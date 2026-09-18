# TASK-017 — Product specification evidence

Checked: 2026-09-18–19 (Asia/Seoul). Research and local implementation; user visual approval **미확인**. Coverage is **partial, explicitly bounded**: all accessible catalog mat families were followed, but official stores and some measurement details remain inaccessible/unspecified. Do not describe this as a complete audit of every current commercial option.

## Authorization versus extracted facts

The user confirmed: “띠아모매트, 바오밥매트, 이편한매트에 있는 모든 규격이 해당돼. 확인해서 적용하도록해”. This confirms applicability to Seung Jong of sizes actually established from those official sources. It is separate from extraction of the numeric dimensions below. No repeat numeric approval is required. This does not establish trading/OEM relationships, performance, material composition, colors, current inventory, prices or delivery conditions.

Public UI contains only normalized sizes, form labels and independent SVG outlines. No external logo, photo, marketing copy, product name, certification, installation service or material claim is carried over. Research images/HTML are outside the repository at `/home/shlee/Workspace/ai/01.codex/task-017-review/sources/` and are not published assets. Original image URLs are listed below for reproducibility. No PDF specification sheet was linked from the inspected product/catalog sources.

## Method and source coverage

Read official catalog HTML, linked product details and their embedded specification images. Opened downloaded images directly, using crops for legibility. Read actual option selectors in Chromium, including dependent options (size → color → type); no purchase/cart/contact actions. cm → mm uses ×10 and m → mm uses ×1000. mm values remain unchanged. Search snippets and third-party reviews were discovery aids only, never specification evidence.

### 띠아모

- [Official homepage](https://www.tiamomat.com/): its footer links exactly to the supplied [Kakao channel](https://pf.kakao.com/_eUEQs/chat), corroborating the domain identity. Kakao's dynamic page alone did not supply a numeric catalog.
- [Mat types](https://www.tiamomat.com/sub/sub02_02.php): STONE, WOOD, 아이보리; HTML size/thickness fields read directly. [Product introduction](https://www.tiamomat.com/sub/sub02_01.php) also inspected.
- Homepage quote-form selects and visible explanatory text explicitly limit 1000 × 1000 to 2.2cm; 680 × 680 permits 2.2/2.6cm. Its JS rejects the 1000/2.6 combination. This constraint resolves the generic STONE listing's independent width/thickness lists; **1000 × 1000 × 26 is not established**.
- [Self-install shop index](https://www.tiamomat.com/sub/sub05_03.php), [single](https://www.tiamomat.com/sub/sub05_03.php?boardid=event&mode=view&idx=5), [12-pack](https://www.tiamomat.com/sub/sub05_03.php?boardid=event&mode=view&idx=4) followed. Both entries are older packaging listings, not additional verified dimensions.
- Linked [single Smartstore](https://smartstore.naver.com/tiamomat/products/6182138940) and [12-pack mobile Smartstore](https://m.smartstore.naver.com/tiamomat/products/6181287951): HTTP 429, including a browser attempt of the single mobile URL. The 12-pack's aggregate installation area and part dimensions remain unverified. Do not multiply 12 by a guessed unit size.

### 바오밥

- [Common lineup](https://www.baobabmat.com/page/a_sub3), [hexagon](https://www.baobabmat.com/page/a_sub4), [1m](https://www.baobabmat.com/page/n_sub7), [68](https://www.baobabmat.com/page/a_sub5): inspected official images. Standard/Premium duplicates share listed dimensions; they are not extra public variants.
- Official navigation also has a separate rug mat, samples and cushion. [Rug product](https://smartstore.naver.com/baobabmat6885/products/11442606542) and its [mobile URL](https://m.smartstore.naver.com/baobabmat6885/products/11442606542) returned HTTP 429 by direct requests and Chromium. The page states service access is unavailable. The English homepage `http://en.baobabmat.com` is reachable (HTTP200) and links its Rug Mat menu to the same inaccessible Smartstore item; it provides no alternate rug detail URL. Also inspected its [common](http://en.baobabmat.com/page/a_sub3), [hexagon](http://en.baobabmat.com/page/a_sub4), [large68](http://en.baobabmat.com/page/a_sub5), and [1m](http://en.baobabmat.com/page/n_sub7) counterparts. The English hex and68 image tables corroborate46×46×2.1cm and68×68×2.1/2.6cm, without a more explicit hex measurement axis.
- Official site's footer links [baobabcare blog](https://blog.naver.com/PostList.naver?blogId=baobabcare&from=postList&categoryNo=6). Used its own search and read the [rug launch post, 2025-02-14](https://blog.naver.com/PostView.naver?blogId=baobabcare&logNo=223760585353) and [mat types post, 2025-09-18](https://blog.naver.com/PostView.naver?blogId=baobabcare&logNo=224012955834), including images. These establish 1m rug family and 4P/6P packaging, but do not establish the complete assembled dimensions and thickness of each rug option. Customer-photo layouts and “1M” naming are not enough to infer 2000×2000 / 3000×2000 ×22. Therefore these rug combinations are **not added**. This is a remaining coverage gap, not an excluded non-mat product.
- [Sample application](https://smartstore.naver.com/baobabmat6885/products/10358108291) and [cushion](https://smartstore.naver.com/baobabmat6885/products/12901644486) are non-mat items and excluded based on official menu labels.

### 이편한

- Read [all products](https://www.ephmat.com/goods/goods_list.php?cateCd=001), [Premium PU](https://www.ephmat.com/goods/goods_list.php?cateCd=001009), [TPU](https://www.ephmat.com/goods/goods_list.php?cateCd=001008), and [consumables](https://www.ephmat.com/goods/goods_list.php?cateCd=001010). Category 001009 includes 1300, which is absent from the broader 001 listing; the separate category prevented that omission.
- Seven mat product details inspected: [1300](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000127), [1200](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000126), [1000](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000124), [600](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000116), [650](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000097), [500](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000006), [1m rug set](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000111). These cover all mat links observed in those categories; no additional product pagination was exposed.
- Browser dependent options: 1000 → center/side/corner/professional-install/corridor; 1200 → center/corridor; 650 → center/side/corner; 500 → center (sold out)/side/corner; 1300 static selector → center1300×1300/side1300×650. Service options are not dimensions. Colors were traversed only to reach type selectors and are not published. 600 and rug set are sold out with disabled selectors; their detail images remain available. Source inventory status is not Seung Jong inventory status.
- Excluded samplebook and [acrylic protective pad](https://www.ephmat.com/goods/goods_view.php?goodsNo=1000000120); standalone connector dimensions 195×105mm are accessory data, not a mat size.

## Extracted measurements and normalization

In the following table, A/B/C identify the brands above for internal provenance only. `×` order follows the source; rotation-equivalent dimensions are not added as new variants. Unless explicitly stated, dimensions are nominal/product labels, **not verified installed effective area**, and the connector protrusion inclusion basis is unknown.

| ID | Source/family | Original size and thickness | Normalized mm | Form / measurement basis |
| --- | --- | --- | --- | --- |
| A1 | 띠아모 WOOD types HTML | 50×50cm, 2.2cm | 500×500×22 | Square, product label |
| A2 | 띠아모 STONE/아이보리 + homepage constraint | 68×68cm, 2.2cm | 680×680×22 | Square; duplicate colors merged |
| A3 | Same | 68×68cm, 2.6cm | 680×680×26 | Square; not a 22–26 continuous range |
| A4 | 띠아모 STONE + homepage constraint | 100×100cm, 2.2cm only | 1000×1000×22 | Square; do not add 26 |
| B1 | 바오밥 common/hex images | 46×46cm (육각형), 2.1cm | 460×460×21 | Hexagon; axis/point/flat measurement basis unspecified |
| B2 | 바오밥 common/68 images | 68×68cm, 2.1cm | 680×680×21 | Square |
| B3 | Same | 68×68cm, 2.6cm | 680×680×26 | Duplicate A3 |
| B4 | 바오밥 common/1m images | 100×100cm, 2.2cm | 1000×1000×22 | Duplicate A4 |
| C1 | 이편한 500 title and product detail | 50×50×2.5cm; 500×500×25mm (1P) | 500×500×25 | Unit/product label; center/side/corner exact differences unspecified |
| C2 | 이편한 600 title + upper product info | 60×60×2.1cm; 60×60(cm)×2.1T | 600×600×21 | Unit/product label; center/side/corner drawn without separate measurements |
| C3 | 이편한 650 title/detail | 65×65×2.4cm; 650×650×24mm (1P) | 650×650×24 | Unit/product label; separate part measurements unspecified |
| C4 | 이편한 1000 title/options + type diagram | 100×100×2.4cm; center100×100cm | 1000×1000×24 | Center diagram dimensions |
| C5 | Same diagram | side104×100cm; family2.4cm | 1040×1000×24 | Side, drawing label; not center1000×1000 |
| C6 | Same diagram | corner104×104cm; family2.4cm | 1040×1040×24 | Corner, drawing label |
| C7 | Same diagram | corridor64×100cm; family2.4cm | 640×1000×24 | Corridor, drawing label |
| C8 | 이편한 1200 title/options + type diagram | 120×120×2.4cm; center120×120cm | 1200×1200×24 | Center |
| C9 | Same diagram | corridor64×120cm; family2.4cm | 640×1200×24 | Corridor; no1200side/corner dimensions established |
| C10 | 이편한 1300 title/options + Color/Size image | 130×130×2.4 (title cm) | 1300×1300×24 | Center |
| C11 | Same image and side option | 130×65×2.4 (title cm); option1300×650 | 1300×650×24 | Side |
| C12 | 이편한 rug-set product detail | 1000×1000×23mm (1P) | 1000×1000×23 | Separate rug unit; do not merge thickness with C4 |
| C13 | Rug-set 4pcs diagram + C12 unit thickness | 2m×2m; 23mm | 2000×2000×23 | Four-piece configuration label, not measured effective footprint |
| C14 | Rug-set 6pcs diagram + C12 | 3m×2m; 23mm | 3000×2000×23 | Six-piece configuration label |
| C15 | Rug-set 8pcs diagram + C12 | 4m×2m; 23mm | 4000×2000×23 | Eight-piece configuration label |
| C16 | Rug-set 9pcs diagram + C12 | 3m×3m; 23mm | 3000×3000×23 | Nine-piece configuration label; present in second configuration image |
| C17 | Rug-set 12pcs diagram + C12 | 4m×3m; 23mm | 4000×3000×23 | Twelve-piece configuration label |

4 + 4 + 17 = 25 source combinations; two cross-brand duplicates (A3/B3, A4/B4) → **23 unique dimension/thickness combinations**. Public presentation uses 19 rows: 7 square rows (11 combinations), 5 component rows, 1 hex row and 6 rug rows. Nominal labels are not silently relabeled as precise outer dimensions.

## Conflicts, limitations and exclusions

1. 띠아모 generic STONE width/thickness lists could suggest a Cartesian product; explicit homepage UI/validation limits 1000 to22. Only actual combinations are used.
2. 이편한 600 bottom legacy product-detail image prints `600mm×600mm×2.1mm` and a misplaced `1000mm×1000mm×23~24mm` line. Title/category expressly give `60×60×2.1cm`, and upper info confirms `60×60(cm)×2.1T`. Use the explicit cm title, normalized21; retain the conflicting legacy text here. Do not publish2.1mm or infer23mm for the newer1000 family from a mixed old footer. New1000 title/options give24; separate rug detail explicitly gives23.
3. The500/600/650 families show center/side/corner but no individual dimensions. Publish only their unit/product-label dimensions, with a visible note to confirm part-specific sizes. Do not extrapolate the1000 family's extra40mm to them.
4. 1000/1200 drawing measurements and1300 side image are explicit. The diagrams do not fully specify connector-inclusive outer dimensions or installed effective area. No edge-only specification is established. No thickness is inferred for unlinked product families.
5. Hex `460×460` is retained as source notation. Its measurement axes are not defined, so the SVG has no axis arrows, edge-length labels or area calculation. Public note makes the limitation explicit.
6. Rug23mm sets: source configuration diagrams give overall labels; no shrinkage/tolerance/effective-size guarantee is established. Do not use newer1000 side104cm parts to compute these separate sets. Retain9pcs even though an earlier illustration lists only4/6/8/12. Disabled sold-out store selectors prevent verifying currently purchasable bundles; public page is informational, not inventory/order UI.
7. 바오밥 rug4P/6P: existence and1m naming confirmed via linked official blog; complete assembled pairs/thickness remain unresolved after store desktop/mobile/browser429 and alternative official blog inspection. No complete-catalog claim. 띠아모 Smartstore part and12-pack effective measurements also unresolved.
8. Unrelated samplebooks, cushions, acrylic pads, standalone connectors, materials/colors/weights/prices/performance and inferred brand relationships excluded. Actual product photography remains unavailable. No source tolerance claim becomes a Seung Jong tolerance commitment.

## Public implementation

`src/app/products/specifications.ts` holds only public normalized row data. `product-specifications.tsx` renders four semantic tables and four independent SVG outlines labeled 제품 형태 예시 이미지, with nearby real example dimensions and visible measurement qualifications. SVGs are decorative to assistive technology because their accessible equivalent is the adjacent text/table. No client state or dependencies. Shared Header/Footer/Home are unchanged.

User applicability authorization is complete; visual review approval remains **미확인**. Resolving inaccessible official rug options/part measurement bases requires a later accessible official specification or supplier sheet; it does not require re-approval of the already authorized confirmed numbers.

## Direct image references

The following URLs are the original embedded images read, not new public assets. Local filenames retain the corresponding source page and image index.
- `eph100-29.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/251112/e23c44f9fff9412a9b2449604f724539_105956.jpg
- `eph100-30.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260529/21a8c70d6f6c782f14f032a1765bbc21_144849.jpg
- `eph120-34.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260430/6cf741a4c4f878128324af1387165d93_114116.jpg
- `eph120-35.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260529/21a8c70d6f6c782f14f032a1765bbc21_144805.jpg
- `eph130-16.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260818/b9a0ce3014cd452ae438e78dc476c28d_130718.jpg
- `eph60-27.jpg`: https://shop-phinf.pstatic.net/20250206_120/1738819242180oeyLz_JPEG/6%EA%B0%80%EC%A7%80-%ED%8F%AC%EC%9D%B8%ED%8A%B8_04.jpg?type=w860
- `eph60-39.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/251112/dd6d93cbe29e242f87adf98200cbcfb9_134711.jpg
- `eph50-34.jpg`: https://ai.esmplus.com/ephmat/500TPU/500/new/22.jpg
- `eph65-19.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260430/46b867af155abb48ebbbfeaf6be9a103_105444.jpg
- `eph65-30.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/260430/faeac4e1eef307c2ab7b0a3821e6c667_110038.jpg
- `ephset-18.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/240910/e88a49bccde359f0cabb40db83ba6080_100639.jpg
- `ephset-19.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/240910/11364907cf269dd2183b64287156072a_100640.jpg
- `ephset-35.jpg`: https://cdn-saas-web-116-148.cdn-nhncommerce.com/ephmattr7717_godomall_com/data/editor/goods/240910/7f5144f962efde75e0f7661e032166db_110320.jpg
- `baobab-common-0.jpg`: https://www.baobabmat.com/img_up/shop_pds/bobcare01/site_content/2026/1--gong-tong--mae-teu--jong-ryu1772775118.jpg
- `baobab-hex-0.jpg`: https://www.baobabmat.com/img_up/shop_pds/bobcare01/site_content/2026/yuk-gak-mae-teu_-sin1772780670.jpg
- `baobab-680-0.jpg`: https://www.baobabmat.com/img_up/shop_pds/bobcare01/site_content/2026/68-mae-teu_-sin1772781076.jpg
- `baobab-1000-0.jpg`: https://www.baobabmat.com/img_up/shop_pds/bobcare01/site_content/2026/il-mi-teo--sang-dan1772781614.jpg
- `baobab-1000-2.jpg`: https://www.baobabmat.com/img_up/shop_pds/bobcare01/site_content/2025/111111736231093.jpg
