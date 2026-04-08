# Booze Clues — Distributor Acquisition Log

Master tracking document for all WA distributor data acquisition efforts. Updated as we research and acquire data from each distributor.

**Last updated:** 2026-04-07
**Total active WA distributors (LCB):** 225
**Significant multi-category distributors:** 85
**Data acquired from:** 8

---

## Status Key

| Status | Icon | Meaning |
|---|---|---|
| LIVE | ✅ | Data extracted and loaded into app database |
| DOWNLOADED | 📥 | Raw file acquired, not yet loaded |
| AVAILABLE | 🔍 | Public data exists, not yet downloaded |
| GATED | 🔒 | Requires account/login to access |
| RESEARCHING | 🔄 | Currently investigating how to get data |
| NO_DATA | ❌ | No public data found, no known way to acquire |
| TINY | 📌 | Distributor too small to prioritize (< 10 brands) |

---

## Tier 1 — National/Large (Must Have)

### ✅ The Odom Corporation
- **LCB City:** Pullman | **Categories:** Beer, Spirits, Wine
- **Method:** PDF download from website
- **URL:** `https://www.odomcorp.com/s/All-Brands-The-Odom-Corporation.pdf`
- **Data level:** Brand-only (no SKUs)
- **WA Availability:** wa_likely (PNW catalog, not WA-filtered)
- **Records:** 297 brands
- **Local files:** `data/raw/odom_all_brands.pdf`, `data/odom_brands.json`
- **Last acquired:** 2026-04-06
- **Refresh:** Re-download PDF quarterly, diff against JSON
- **Pricing:** No

### ✅ Winebow
- **LCB City:** SeaTac | **Categories:** Beer, Spirits, Wine
- **Method:** Web scrape (paginated HTML, 38 pages)
- **URL:** `https://www.winebow.com/our-brands?markets%5B0%5D=Washington&brand_type=distribution_brand`
- **Data level:** Brand-only
- **WA Availability:** wa_confirmed (explicitly filtered to WA market)
- **Records:** 450 brands
- **Local files:** `data/winebow_wa_brands.json`
- **Last acquired:** 2026-04-06
- **Refresh:** Re-scrape 38 pages quarterly
- **Pricing:** No

### ✅ Columbia Distributing / Coldist
- **LCB City:** Kennewick/Wenatchee | **Categories:** Beer, Spirits, Wine
- **Method:** Playwright scrape of VTinfo Brand Builder
- **URL:** `https://products.vtinfo.com/brandbuilder/01191/brands/tab/1`
- **Data level:** Brand-only (with category tags from img alt text)
- **WA Availability:** wa_likely (WA brand builder URL, but not explicitly filtered)
- **Records:** 629 brands
- **Local files:** `data/coldist_brands.json`
- **Scraper:** `data/scrape_vtinfo.mjs` (shared with Olympic Eagle)
- **Last acquired:** 2026-04-06
- **Refresh:** Re-run Playwright scraper quarterly
- **Pricing:** No
- **Note:** Also has Oregon brands at `/33291-11/`

### ✅ RNDC / Young's Market Company (historical)
- **LCB Name:** REPUBLIC NATIONAL DISTRIBUTING COMPANY OF WA / RNDC ALASKA
- **LCB City:** Seattle/Renton | **Categories:** Beer, Spirits, Wine
- **Current platform:** eRNDC (`app.erndc.com`) — GATED
- **Historical data:** Young's Market Company catalogs (pre-acquisition, 2021)
- **Data level:** SKU-level (product codes, sizes, pricing)
- **WA Availability:** wa_likely (full catalog) / wa_confirmed (WA wines)
- **Records:** 3,819 products (full catalog) + 490 products (WA wines)
- **Local files:** `data/raw/2022 Washington Full Catalog.pdf`, `data/raw/Local Washington Wine Presentation.pdf`, `data/youngs_full_catalog.json`, `data/youngs_wa_wines.json`
- **Extraction script:** `data/extract_youngs.py`, `data/extract_wa_wines.py`
- **Last acquired:** 2021 (historical PDFs)
- **Pricing:** Yes (case price, net price — 2021 vintage, likely outdated)
- **Action needed:** Chris to check eRNDC access for current data

### 🔒 Southern Glazer's Wine & Spirits
- **LCB Names:** SOUTHERN GLAZER'S OF WA / SOUTHERN GLAZER'S WINE & SPIRITS OF WASHINGTO / SOUTHERN GLAZER'S WINE AND SPIRITS OF WASHING
- **LCB Cities:** Lynnwood/Omak/Monroe | **Categories:** Beer, Spirits, Wine
- **Platform:** Proof (`shop.sgproof.com`) — GATED
- **Access:** Licensed buyer account. Call +1-800-276-5148 or email customerservice@sgproof.com
- **Public data:** None
- **Records:** 0
- **Pricing:** Available inside Proof (with account)
- **Action needed:** Chris to check if he has Proof access
- **DO NOT SCRAPE** — ToS risk from billion-dollar company

### 🔒 American Northwest Distributors (ANW)
- **LCB City:** Seattle | **Categories:** Beer, Spirits, Wine
- **Platform:** `app.anwdistributors.com` — GATED
- **Website:** `https://www.anwdistributors.com/`
- **Public data:** None (claims 900+ brands, lists zero)
- **Records:** 0
- **Action needed:** Chris to check access or contact

---

## Tier 2 — Regional/Medium (High Value)

### ✅ Olympic Eagle Distributing
- **LCB City:** Puyallup | **Categories:** Beer, Spirits, Wine
- **Method:** Playwright scrape of VTinfo Brand Builder
- **URL:** `https://products.vtinfo.com/brandbuilder/01778/brands/tab/1`
- **Data level:** Brand-only
- **WA Availability:** wa_likely
- **Records:** 87 brands
- **Scraper:** `data/scrape_vtinfo.mjs` (shared with Coldist)
- **Last acquired:** 2026-04-06
- **Pricing:** Price book PDF referenced on site but not yet downloaded
- **Action:** Try to find and download price book PDF

### ✅ Dickerson Distributors
- **LCB City:** Bellingham | **Categories:** Beer, Spirits, Wine
- **Method:** Playwright scrape of Wix site
- **URL:** `https://www.dickersondistributors.com/spirits`
- **Data level:** Brand-only
- **WA Availability:** wa_confirmed (WA-only: Whatcom/Skagit/Island/San Juan)
- **Records:** 194 brands
- **Scraper:** `data/scrape_dickerson.mjs`
- **Last acquired:** 2026-04-06
- **Pricing:** Catalogs page exists but PDFs didn't load
- **Action:** Check catalogs page again for downloadable PDFs

### ✅ Northwest Wine & Spirits
- **LCB Name:** (not in LCB list — may operate under different license name)
- **Method:** WebFetch scrape
- **URLs:** `https://nwwinespirits.com/partners-wine.html`, `https://nwwinespirits.com/partners-spirits.html`
- **Data level:** Brand-only
- **WA Availability:** wa_confirmed (WA-only)
- **Records:** 14 brands
- **Local files:** `data/nw_wine_spirits_brands.json`
- **Last acquired:** 2026-04-06
- **Pricing:** No

### 🔄 NW Wine Distributors
- **LCB City:** Vancouver | **Categories:** Spirits, Wine
- **Website:** `https://www.nwwinedistributors.com/`
- **Public data:** Claims 2,000+ wines, 1,500+ spirits but partner pages render empty
- **Records:** 0
- **Action:** Monitor site; contact directly

---

## Tier 3 — Missing Distributors (Researching)

*Agents currently researching these. Update with findings.*

### ELLIOTT BAY DISTRIBUTING COMPANY
- **LCB City:** Seattle | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### MALETIS BEVERAGE
- **LCB City:** Vancouver | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### KING BEVERAGE
- **LCB City:** Union Gap/Moses Lake | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### CO-HO IMPORTS
- **LCB City:** Everett | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### GRAPE EXPECTATIONS
- **LCB City:** Sumner | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### CITY BEVERAGES DISTRIBUTING
- **LCB City:** Woodinville | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### FREE RUN
- **LCB City:** Seattle | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### WALTON BEVERAGE CO.
- **LCB City:** Ferndale | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### ORCAS DISTRIBUTING
- **LCB City:** Kent/Spokane | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### BACCHUS INTERNATIONAL
- **LCB City:** Kent | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### FOSCO
- **LCB City:** Kent | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### VEHRS DISTRIBUTING COMPANY
- **LCB City:** Spokane Valley | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### WALDEN SELECTIONS
- **LCB City:** Seattle | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### PREMIUM BEVERAGES
- **LCB City:** Lynnwood | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Website:** TBD
- **Data:** TBD

### CHATEAU STE. MICHELLE
- **LCB City:** Woodinville | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Note:** Major WA winery — likely self-distributes their own brands
- **Website:** TBD
- **Data:** TBD

### ANHEUSER-BUSCH SALES OF WASHINGTON
- **LCB City:** Arlington | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Note:** AB InBev's own distribution arm
- **Website:** TBD
- **Data:** TBD

### MCLANE BEVERAGE DISTRIBUTION
- **LCB City:** Lakewood | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Note:** McLane is a major national wholesale distributor (Berkshire Hathaway)
- **Website:** TBD
- **Data:** TBD

### JFC INTERNATIONAL / WISMETTAC ASIAN FOODS
- **LCB City:** Tacoma/Kent | **Categories:** Beer, Spirits, Wine
- **Status:** 🔄 RESEARCHING
- **Note:** Japanese food/beverage distributors — likely carries sake, Japanese beer, shochu
- **Website:** TBD
- **Data:** TBD

### (Plus ~55 more smaller distributors not yet researched)

---

## Downloaded But Not Yet Extracted

### Oregon OLCC Price List
- **File:** `data/raw/olcc_alpha_price_list.pdf` (77 pages)
- **Contents:** ~4,000 spirits products with pricing
- **Status:** Downloaded, needs Python extraction
- **Use:** Cross-reference for product enrichment (neighboring state, high overlap)

---

## Data Acquisition Playbook

### How to onboard a new distributor:

1. **Check LCB list** — verify they're actively licensed
2. **Find website** — search `[distributor name] Washington distributor`
3. **Check for public catalog:**
   - Brand list page? → WebFetch scrape
   - VTinfo Brand Builder? → Playwright scrape (reuse `scrape_vtinfo.mjs`)
   - Downloadable PDF? → Download + Python extraction (reuse `extract_youngs.py` pattern)
   - Wix/Squarespace site? → Playwright scrape
   - Nothing public? → Mark as GATED, check if Chris has access
4. **Extract data** → JSON file in `data/` directory
5. **Add to seed script** → `loadBrandFile()` or `loadYoungsCatalog()` call
6. **Set wa_availability** → `wa_confirmed` if WA-filtered, `wa_likely` if not
7. **Update this log** with all details
8. **Run seed** → `node scripts/seed.mjs`

### Existing scrapers (reusable):
- **VTinfo Brand Builder:** `data/scrape_vtinfo.mjs` — add new distributor's customer ID
- **PDF product catalogs:** `data/extract_youngs.py` — adapt regex for different formats
- **Simple web pages:** WebFetch directly
- **Wix/JS-rendered sites:** `data/scrape_dickerson.mjs` — adapt selectors

### Refresh schedule:
- **Quarterly:** Re-scrape all web sources (Odom, Winebow, Coldist, Olympic Eagle, etc.)
- **Monthly:** Check LCB for new distributor list publication
- **As received:** Portfolio PDFs from industry contacts
- **Ongoing:** Community submissions via app
