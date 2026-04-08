# Booze Clues — Distributor Acquisition Map

How to get product data from each WA distributor, whether we have it, and where it lives.

---

## Status Key

| Status | Meaning |
|---|---|
| **LIVE** | Data extracted and loaded into the app database |
| **DOWNLOADED** | Raw file acquired, not yet extracted/loaded |
| **AVAILABLE** | Public data exists, not yet downloaded |
| **GATED** | Requires account, login, or relationship to access |
| **FUTURE** | Requires business deal or partnership |

---

## Tier 1 — National Giants

### Southern Glazer's Wine & Spirits
| Field | Value |
|---|---|
| **Status** | GATED |
| **Platform** | Proof (`shop.sgproof.com`) |
| **Access** | Licensed buyer account required. Call +1-800-276-5148 or email customerservice@sgproof.com |
| **Public data** | None — product catalog fully gated |
| **Data format** | Unknown (web platform) |
| **Raw file** | — |
| **Est. products** | Thousands (largest US distributor, ~1,500 suppliers globally) |
| **Last acquired** | Never |
| **Notes** | Entered WA in 2008 via Odom Corporation merger. WA warehouse in Puyallup. **Do not scrape — ToS risk from a company this size.** Chris may have buyer access. |
| **Action** | Chris to check if he has Proof access and what's exportable |

### RNDC (Republic National Distributing Company)
| Field | Value |
|---|---|
| **Status** | DOWNLOADED (historical — Young's Market catalog, pre-acquisition) |
| **Platform** | eRNDC (`app.erndc.com`) |
| **Access** | Licensed buyer account required |
| **Public data** | None — product catalog fully gated |
| **Historical data** | Young's Market Company catalogs (2021) — Young's was acquired by RNDC in Nov 2022 |
| **Raw files** | `data/raw/2022 Washington Full Catalog.pdf` (147pp, June 2021), `data/raw/Local Washington Wine Presentation.pdf` (20pp, July 2021) |
| **Extracted files** | `data/youngs_full_catalog.json` (pending), `data/youngs_wa_wines.json` (pending) |
| **Est. products** | Thousands (absorbed Young's Market WA operations) |
| **Last acquired** | 2021 (historical PDFs from Young's Market era) |
| **Notes** | WA locations in Auburn, Everett, Seattle, Spokane. Reyes Beverage Group acquiring some RNDC operations (expected May 2026). |
| **Action** | Chris to check if he has eRNDC access. Load extracted Young's data into DB as historical baseline. |

---

## Tier 2 — Regional / Major

### The Odom Corporation (parent of NW Beverages)
| Field | Value |
|---|---|
| **Status** | LIVE |
| **Method** | PDF download from website |
| **URL** | `https://www.odomcorp.com/s/All-Brands-The-Odom-Corporation.pdf` |
| **Data format** | PDF (6 pages, brand names only — no SKUs) |
| **Data level** | Brand-level |
| **Raw file** | `data/raw/odom_all_brands.pdf` |
| **Extracted file** | `data/odom_brands.json` |
| **Products in DB** | 297 brands (175 beer/cider, 97 wine/spirits, non-alcoholic skipped) |
| **Confidence** | 0.8 |
| **Last acquired** | 2026-04-06 |
| **Refresh method** | Re-download PDF, compare against JSON, update |
| **Refresh cadence** | Quarterly |
| **Notes** | Odom Corp absorbed NW Beverages and Click Distributing. Covers WA + PNW. "Brands listed may not be available in all states and counties." |

### Winebow
| Field | Value |
|---|---|
| **Status** | LIVE |
| **Method** | Web scrape (paginated HTML, 12 brands/page) |
| **URL** | `https://www.winebow.com/our-brands?markets%5B0%5D=Washington&brand_type=distribution_brand` |
| **Data format** | HTML (38 pages) |
| **Data level** | Brand-level |
| **Raw file** | — (scraped live) |
| **Extracted file** | `data/winebow_wa_brands.json` |
| **Products in DB** | 450 brands |
| **Confidence** | 0.8 |
| **Last acquired** | 2026-04-06 |
| **Refresh method** | Re-scrape all 38 pages (`&page=1` through `&page=38`), compare against JSON |
| **Refresh cadence** | Quarterly |
| **Notes** | Primarily wine & spirits. Partners with Provi for WA ordering. Fine wine + spirits importer/distributor. Kent, WA office. |

### Columbia Distributing / Coldist
| Field | Value |
|---|---|
| **Status** | AVAILABLE |
| **Method** | VTinfo Brand Builder (JavaScript-rendered) |
| **URL** | `https://products.vtinfo.com/brandbuilder/01191/brands/tab/1` |
| **Data format** | JS-rendered web app — **requires Playwright/Selenium** |
| **Data level** | Brand-level (with category tabs) |
| **Raw file** | — |
| **Extracted file** | — |
| **Est. products** | Hundreds (250+ alcohol brands — largest PNW beer distributor) |
| **Last acquired** | Never |
| **Refresh method** | Playwright scrape of VTinfo brand builder |
| **Refresh cadence** | Quarterly |
| **Notes** | Operating since 1935. Primarily beer-focused but also carries wine (Treasury, Trinchero) and spirits (Sazerac, Brown-Forman). WA brand builder has tabs: Domestic Beer, Craft Beer, Import Beer, Cider, Malternatives, Spirits, Non Alcoholics, Wineries, Distilleries. Also has Oregon brands at `/33291-11/`. |
| **Action** | Build Playwright scraper for VTinfo platform (reusable for Olympic Eagle too) |

### American Northwest Distributors (ANW)
| Field | Value |
|---|---|
| **Status** | GATED |
| **Platform** | `app.anwdistributors.com` |
| **URL** | `https://www.anwdistributors.com/` |
| **Public data** | None — website mentions 900+ brands but lists zero |
| **Est. products** | 900+ brands |
| **Last acquired** | Never |
| **Notes** | Largest family-owned distributor in WA. Offices in Seattle, Portland, Spokane. Focus: fine wine and craft spirits. Statewide coverage. |
| **Action** | Chris to check if he has access or a contact at ANW |

### Olympic Eagle Distributing
| Field | Value |
|---|---|
| **Status** | AVAILABLE |
| **Method** | VTinfo Brand Builder (same platform as Coldist) + downloadable price book PDF |
| **URL** | `https://products.vtinfo.com/brandbuilder/01778/brands/tab/1` |
| **Price book** | Referenced on site as `Olympic-Eagle-April-2026-Beer-Wine-Spirits-Mixers-Non-Alcohol-Price-Book.pdf` |
| **Data format** | JS-rendered web app + PDF |
| **Data level** | Brand-level (web) + potentially SKU-level (price book) |
| **Raw file** | — |
| **Est. products** | Hundreds |
| **Last acquired** | Never |
| **Notes** | Large PNW beer wholesaler (200+ employees). Formerly City Beverages. Tabs: All, Washington Brands, Premium & Imports, Crafts & Ciders, Non-Alcoholic, Wine & Spirits. Also has a Beer Finder at `https://finder.vtinfo.com/finder/web/v2/iframe?custID=01778`. |
| **Action** | Same Playwright scraper as Coldist (VTinfo). Also try to download the price book PDF directly. |

---

## Tier 3 — Small / Regional

### NW Wine Distributors
| Field | Value |
|---|---|
| **Status** | AVAILABLE (but broken) |
| **URL** | `https://www.nwwinedistributors.com/` |
| **Public data** | Claims 2,000+ wines and 1,500+ craft spirits. Wine Partners and Spirit Partners pages exist but render empty. |
| **Est. products** | 3,500+ |
| **Last acquired** | Never |
| **Notes** | Site appears broken or intentionally gated. May need to contact them directly. |
| **Action** | Check site periodically, or Chris to make contact |

### Northwest Wine & Spirits
| Field | Value |
|---|---|
| **Status** | AVAILABLE |
| **Method** | Simple web scrape (static HTML) |
| **URLs** | `https://nwwinespirits.com/partners-wine.html`, `https://nwwinespirits.com/partners-spirits.html` |
| **Data format** | Static HTML |
| **Data level** | Brand-level |
| **Est. products** | ~20 brands (7 wine, 7+ spirits) |
| **Last acquired** | Never |
| **Notes** | Small specialty distributor. Wineries and small-batch distilleries. Brands include: All Star Wine Imports, KISS Rum & Gin, Def Leppard Gin, California Cowboy Whiskey, Luca Mariano Bourbon, Mezcal Popul Vuh, Tequila Leyenda, Three Chord Bourbon. |
| **Action** | Low priority given small catalog. Simple WebFetch when ready. |

### NW Beverages
| Field | Value |
|---|---|
| **Status** | MERGED → Odom Corp |
| **Notes** | Absorbed into The Odom Corporation. Website redirects to odomcorp.com. Data covered by Odom entry above. |

### Dickerson Distributors
| Field | Value |
|---|---|
| **Status** | AVAILABLE |
| **Method** | Web scrape (Wix site) |
| **URL** | `https://www.dickersondistributors.com/spirits` |
| **Data format** | Wix-hosted HTML (may need JS rendering) |
| **Data level** | Brand-level |
| **Coverage** | Regional only: Whatcom, Skagit, Island, San Juan counties |
| **Est. products** | 50+ spirits brands |
| **Last acquired** | Never |
| **Notes** | Bellingham-based. Spirits page is publicly visible with NW distilleries and imports organized by country. Wine/beer pages may not render. Also has a catalogs page with "On Premise" and "Off Premise" catalogs (PDFs didn't load in testing). |
| **Action** | Low priority — regional coverage only |

### Click Distributing
| Field | Value |
|---|---|
| **Status** | DEFUNCT |
| **Notes** | Spokane Valley. Acquired and merged into NW Beverages / Odom Corp circa 2017. |

---

## Tier 4 — Future / Partnership

### Total Wine
| Field | Value |
|---|---|
| **Status** | FUTURE |
| **Method** | Business deal — trade data for advertising |
| **Data level** | Complete product-to-distributor mapping |
| **Notes** | Industry's informal oracle for distributor lookups. Approach post-launch with demonstrated traction. |
| **Action** | Launch MVP first, build user base, then approach with advertising trade proposal |

---

## Priority Queue

| Priority | Distributor | Action | Effort | Impact |
|---|---|---|---|---|
| **1** | RNDC (Young's data) | Load extracted PDFs into DB | Low (extraction running) | High — SKU-level data, hundreds of products |
| **2** | Columbia / Coldist | Build Playwright scraper for VTinfo | Medium | High — hundreds of brands, largest beer distributor |
| **3** | Olympic Eagle | Reuse VTinfo scraper + download price book PDF | Low (reuse #2) | Medium — beer-focused |
| **4** | Southern Glazer's | Chris checks Proof access | Low (manual) | Very high — largest distributor |
| **5** | ANW | Chris checks access/contacts | Low (manual) | High — 900+ brands, statewide |
| **6** | NW Wine & Spirits | Simple WebFetch | Very low | Low — only ~20 brands |
| **7** | Dickerson | Wix scrape | Low | Low — regional only |
| **8** | NW Wine Distributors | Monitor broken site / contact | Low | Medium — 3,500+ claimed products |

---

## Notes

- **VTinfo Brand Builder** is used by both Columbia/Coldist and Olympic Eagle. Building one Playwright scraper covers both.
- **Young's Market → RNDC**: All Young's Market data is historical (2021). Products may have changed distributors since the acquisition. Confidence score should reflect this (lower than current data).
- **Odom Corp** is the parent entity for NW Beverages and Click Distributing. One entry covers all three.
- **Data level matters**: Brand-level data (Odom, Winebow) answers "who might carry products from this brand." SKU-level data (Young's catalogs) answers "who carries this specific product." Both are valuable but SKU-level is what bar managers actually need.
