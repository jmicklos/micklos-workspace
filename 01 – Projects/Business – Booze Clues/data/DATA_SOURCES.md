# Booze Clues — Data Sources & Freshness Tracker

## Active Data Sources (In Database)

### 1. Odom Corporation — Brand Catalog (PDF)
| Field | Value |
|---|---|
| **Source** | The Odom Corporation (distributor) |
| **URL** | `https://www.odomcorp.com/s/All-Brands-The-Odom-Corporation.pdf` |
| **Format** | PDF (6 pages) |
| **How acquired** | Direct download — publicly hosted on odomcorp.com |
| **How processed** | PDF read by Claude → manually extracted to JSON → seed script loaded into SQLite |
| **Last downloaded** | 2026-04-06 |
| **Local files** | `data/raw/odom_all_brands.pdf`, `data/odom_brands.json` |
| **Records** | 297 brands (175 beer/cider, 97 wine/spirits, 25 non-alcoholic skipped) |
| **Confidence** | 0.8 — direct from distributor's own published catalog |
| **In DB as** | 297 products → all linked to "The Odom Corporation" distributor |

**How to refresh:** Re-download the PDF from the URL above. Compare against `odom_brands.json`. Extract new/removed brands. Run seed script or build incremental import.

**Notes:** PDF lists brand names only (no SKUs, no pricing). Categories are Beer & Cider, Wine & Spirits, Non-Alcoholic. Odom Corp is parent of NW Beverages. Covers WA + other PNW states — "brands listed may not be available in all states and counties."

---

### 2. Winebow — WA Brand Directory (Web Scrape)
| Field | Value |
|---|---|
| **Source** | Winebow (distributor) |
| **URL** | `https://www.winebow.com/our-brands?markets%5B0%5D=Washington&brand_type=distribution_brand` |
| **Format** | Paginated HTML (12 brands/page, 38 pages) |
| **How acquired** | WebFetch across all 38 pages, extracted brand names from each |
| **How processed** | Brand names extracted per page → compiled to JSON → seed script loaded into SQLite |
| **Last downloaded** | 2026-04-06 |
| **Local file** | `data/winebow_wa_brands.json` |
| **Records** | 450 brands (out of 456 listed — ~6 lost to page extraction variance) |
| **Confidence** | 0.8 — direct from distributor's own website, WA-filtered |
| **In DB as** | 450 products → all linked to "Winebow" distributor |

**How to refresh:** Scrape all 38 pages of the URL above (page parameter: `&page=1` through `&page=38`). Each page returns 12 brands as HTML. Extract brand names, compare against existing JSON, update.

**Pagination:** The site reports "Showing X - Y of 456 results." Page count = ceil(total / 12). Verify total on page 1 before scraping all pages.

**Notes:** Winebow's directory is filterable by market (Washington) and brand type (distribution_brand). Primarily wine and spirits. Winebow partners with Provi for WA ordering.

---

### 3. WA LCB Distributor List
| Field | Value |
|---|---|
| **Source** | Washington State Liquor and Cannabis Board |
| **URL** | `https://lcb.wa.gov/records/frequently-requested-lists` |
| **Format** | Excel (.xlsx) with 3 sheets |
| **How acquired** | Direct download from LCB website |
| **How processed** | Downloaded, inspected with openpyxl. NOT YET loaded into app DB (contact info not yet parsed in). |
| **Update cadence** | ~Monthly (published by LCB) |
| **Last downloaded** | 2026-04-06 |
| **Source date** | 2026-03-17 |
| **Local file** | `data/raw/wa_lcb_distributors_2026-03-17.xls` (actually .xlsx format despite extension) |

**Contents:**
| Sheet | Records | Notes |
|---|---|---|
| Beer Distributors | 181 | Licensed beer distributors in WA |
| Spirits Distributors | 162 | Licensed spirits distributors in WA |
| Wine Distributors | 262 | Licensed wine distributors in WA |
| **Total** | **605** | Some entities appear on multiple sheets |

**Fields:** Tradename, License Number, ID Number, Location Address/City/State/Zip, Phone, Mail Address, County, Business Startup Date, Issue/Expire/Application Date, Status, Privilege, Licensee

**Use:** Seeds the DISTRIBUTOR table with contact info (phone, address). This is the authoritative WA distributor list. **TODO: parse into app DB to enrich distributor records with phone/address.**

**How to refresh:** Check the LCB page monthly for a new file. The filename pattern is `DistributorsList{MMDDYYYY}.xls`. Download, parse with openpyxl (file is .xlsx despite .xls extension), compare against previous.

---

### 4. TTB Permittee Data — Alcohol Importers (WA)
| Field | Value |
|---|---|
| **Source** | Alcohol and Tobacco Tax and Trade Bureau (TTB) |
| **URL** | `https://www.ttb.gov/public-information/foia/list-of-permittees` |
| **Direct download** | `https://www.ttb.gov/system/files/2025-04/FRL_Alcohol_Importer_Permit_List.csv` |
| **Format** | CSV |
| **How acquired** | Direct download from TTB FOIA page |
| **How processed** | Filtered by `WA-I-` permit prefix → loaded into SQLite as distributor records |
| **Update cadence** | Weekly (by TTB) |
| **Last downloaded** | 2026-04-06 |
| **Source date** | 2025-04 (file path timestamp) |
| **Local file** | `data/raw/ttb_alcohol_importers_2025-04.csv` |
| **WA records** | 552 importers |
| **In DB as** | 552 distributor records (source: ttb_importers) |

**Fields:** Permit_Number, Owner_Name, Operating_Name, Street, City, Prem_Zip, Prem_County, New_Permit_Flag

**How to refresh:** The download URL path includes a date folder (`/2025-04/`). Check the permittees page for updated file links. Filter for `WA-I-` prefix permits.

---

### 5. TTB Permittee Data — Alcohol Wholesalers (WA)
| Field | Value |
|---|---|
| **Source** | TTB |
| **Direct download** | `https://www.ttb.gov/system/files/2025-04/FRL_Alcohol_Wholesaler_Permit_List.csv` |
| **Format** | CSV |
| **How processed** | Filtered by `WA-P-` prefix, deduped against importers → loaded into SQLite |
| **Last downloaded** | 2026-04-06 |
| **Local file** | `data/raw/ttb_alcohol_wholesalers_2025-04.csv` |
| **WA records** | 1,897 wholesalers (865 unique after dedup loaded into DB) |
| **In DB as** | 865 distributor records (source: ttb_wholesalers) |

**How to refresh:** Same as importers — check TTB permittees page for updated files.

---

### 6. TTB Full Permittee List (All States)
| Field | Value |
|---|---|
| **Source** | TTB |
| **Direct download** | `https://www.ttb.gov/system/files/2025-04/FRL_All_Permits.json` |
| **Format** | JSON |
| **Last downloaded** | 2026-04-06 |
| **Local file** | `data/raw/ttb_all_permits.json` |
| **Total records** | 83,108 permits nationwide |
| **WA breakdown** | 552 importers, 1,897 wholesalers, 1,421 wine producers, 239 distilled spirits plants |

**Fields:** [Permit_Number, Owner_Name, Operating_Name, Street, City, State, Zip, County, Industry_Type, New_Permit_Flag] (array of arrays, field order from `Definitions` key)

**Use:** Master reference. Can filter by state + permit type. Used to join with COLA records to trace product → importer → WA distributor.

---

## Distributor Acquisition Map — How to Get Each One

### Currently Acquired

| Distributor | Method | Public? | Automatable? | Products |
|---|---|---|---|---|
| **Odom Corp** | PDF download from website | Yes | Yes (download + LLM extract) | 297 |
| **Winebow** | Web scrape (paginated HTML) | Yes | Yes (HTTP fetch, 38 pages) | 450 |

### Ready to Acquire (Public Data Available)

| Distributor | Method | URL | Notes |
|---|---|---|---|
| **Columbia / Coldist** | VTinfo Brand Builder (JS-rendered) | `https://products.vtinfo.com/brandbuilder/01191/brands/tab/1` | **Requires Playwright/Selenium** — page is JS-rendered, no static HTML. Hundreds of brands across categories. Largest public catalog found. |
| **Olympic Eagle** | VTinfo Brand Builder (JS-rendered) + price book PDF | `https://products.vtinfo.com/brandbuilder/01778/brands/tab/1` | Same VTinfo platform as Coldist. Also has a downloadable price book PDF (monthly). |
| **Dickerson Distributors** | Web scrape (Wix site) | `https://www.dickersondistributors.com/spirits` | Spirits list is publicly visible. Wine/beer pages may need Wix JS rendering. Regional: Whatcom/Skagit/Island/San Juan counties only. |
| **NW Wine & Spirits** | Web scrape (simple HTML) | `https://nwwinespirits.com/partners-wine.html`, `https://nwwinespirits.com/partners-spirits.html` | Small distributor, ~20 brands total. Simple HTML pages. |

### Not Publicly Available (Need Account or Relationship)

| Distributor | Platform | How to Access | Notes |
|---|---|---|---|
| **Southern Glazer's** | Proof (`shop.sgproof.com`) | Licensed buyer account required. Call +1-800-276-5148 or email customerservice@sgproof.com | Largest US distributor. Chris may have access. **Do not scrape** — ToS risk. |
| **RNDC** | eRNDC (`app.erndc.com`) | Licensed buyer account required | Second-largest national. Absorbed Young's Market. Chris may have access. |
| **ANW Distributors** | `app.anwdistributors.com` | Account required | 900+ brands, largest family-owned in WA. No public catalog. |
| **NW Wine Distributors** | Website exists but portfolio pages are empty | Unknown | Claims 2,000+ wines, 1,500+ spirits but partner pages don't render. |

### Future / Partnership

| Source | Method | Notes |
|---|---|---|
| **Total Wine** | Business deal | Complete product-to-distributor mapping. Approach post-launch with advertising trade proposal. |
| **TTB COLA Database** | Selenium scraper (552 WA permit queries) or COLA Cloud API | Maps products → importers. Join with permittee data to infer WA distributor. |
| **NY SLA Brand Registry** | Socrata API bulk download | `https://data.ny.gov/Economic-Development/State-Liquor-Authority-SLA-Brand-Label-and-Wholesa/n2dz-pwuk` — spirits/beer with wholesaler info. Cross-reference for product enrichment. |
| **Oregon OLCC Price List** | PDF/CSV download | Neighboring state, significant product overlap. ~4,000 spirits products. |
| **COLA Cloud** | REST API | `https://colacloud.us/` — 2.6M+ COLA records. Free tier for evaluation, bulk requires license. Has Kaggle demo dataset (2018 data, free). |

---

## Database Current State (as of 2026-04-06)

| Metric | Count |
|---|---|
| Products | 747 |
| Distributors | 1,418 |
| Product-Distributor mappings | 747 |
| Data sources loaded | 3 (Odom PDF, Winebow web, TTB permittees) |

---

## Refresh Schedule (Target)

| Source | Cadence | Method | Notes |
|---|---|---|---|
| Odom Corp PDF | Quarterly | Re-download PDF, extract, diff | URL: `odomcorp.com/s/All-Brands-The-Odom-Corporation.pdf` |
| Winebow WA brands | Quarterly | Re-scrape 38 pages, diff | Filter: `markets[0]=Washington&brand_type=distribution_brand` |
| WA LCB Distributor List | Monthly | Download new Excel from LCB | Filename: `DistributorsList{MMDDYYYY}.xls` |
| TTB Importers CSV | Monthly | Download from TTB | Filter: `WA-I-` prefix |
| TTB Wholesalers CSV | Monthly | Download from TTB | Filter: `WA-P-` prefix |
| TTB Full Permits JSON | Monthly | Download from TTB | 17MB file, all states |
| Columbia/Coldist | Quarterly | Playwright scrape of VTinfo | Not yet built |
| Olympic Eagle | Quarterly | Playwright scrape + PDF | Not yet built |
| TTB COLA | TBD | Selenium scraper or COLA Cloud | Not yet built |
| Portfolio PDFs | As received | Manual upload → LLM extraction | Pipeline not yet built |
| Community CSV | Ad hoc | Manual upload → CSV import | Pipeline not yet built |

## Cron Job Requirements

When the system is built, implement a scheduled job that:

1. **Downloads fresh source files** from LCB and TTB URLs
2. **Re-scrapes** distributor brand pages (Odom, Winebow, etc.)
3. **Compares** new data against previous download (diff detection)
4. **Logs** the refresh in the DATA_IMPORT table with record counts
5. **Alerts** admin if: file format changed, record count dropped significantly (possible error), or new distributors/products appeared
6. **Does NOT auto-publish** — new data goes through the matching + review pipeline before updating Product_Distributor records

Target: run monthly on the 1st, with manual trigger available.
