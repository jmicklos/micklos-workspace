---
type: resource
area: Career
status: evergreen
created: 2026-05-27
source: Amazon backup (docs, email archives, performance reviews)
author:
  - Jonathan D. Micklos
tags:
  - amazon
  - career-map
---

# Amazon Career Map — Jonathan D. Micklos

Compiled from: 10 annual performance reviews (2007–2018), 3 OLM email archives (167k+ emails), 50+ strategy/promo/business docs, resume.

---

## Career Arc

| Period | Role | Level | Org | Key Theme |
|---|---|---|---|---|
| Summer 2007 | Intern SDE | — | Retail Website | "Superb work" — Endless.com notification system |
| Jul 2008 – Mar 2010 | SDE I | L4 | Retail Website — Twister/Detail Pages | Launched Twister in 19 categories worldwide. Improvement Needed in Y2 (focus issues), strong recovery. |
| Apr 2010 – Aug 2011 | SDE I | L4 | Retail Website — Detail Pages | PIP early 2010, completed successfully. EVDD for Baby Diapers: +$536K revenue in 13 days. |
| Aug 2011 – Mar 2013 | SDE I → SDE II | L4→L5 | Digital Device Sales (KiSIT/Kindle) | **Exceeds + Role Model** — dramatic turnaround. Kindle Fire/Touch/latest-gen launches. Ratchet Award. Promoted to SDE II. |
| Apr 2013 – Apr 2014 | TPM | L5 | Digital Device Sales | Gen-6 Kindle launch TPM. Video encoding pipeline (Elastic Transcoder + S3 + CloudFront). New Marketplace Launch Playbook. |
| Apr 2014 – Aug 2015 | SDM II | L5 | Digital Device Sales | **Exceeds** — Built team of 8. Amazon Echo launch. UDP migration. 73 interview loops. |
| Sep 2015 – May 2016 | **CTO** | — | Unii, Ltd. (London, UK) | Led 25-person tech org, 300K+ MAU social app. Instituted UX improvement processes, i18n, recruiting. |
| Aug 2016 – May 2018 | SDM | L6 | Amazon Pay — CommerceX | Returned to Amazon. Physical-world shopping: Amazon Mall Kiosks, Amazon Books, TGI Friday's. Authored PR/FAQs for Place Cards, Location Services, Bitcoin/Blockchain strategy. Whole Foods Prime Benefits BRD. $1.3B target. 3 dev centers (Bangalore, Cupertino, Seattle). |
| May 2018 – ~2022 | SDM | L6 | Buckeye / Region Expansion Engineering | Built Almanac (L7-aware routing plane) from scratch. 3 CWG working groups with 25+ Principal Engineers. Launched Almanac, Truss, Bubble Bridge. CN Prime/China Global Store migrations. Grew from 12→27 HC. |
| ~2022 – 2024 | SDM → **Senior SDM** | L6→**L7** | Region Flexibility Engineering (eCF) | **Promoted to Senior SDM on basis of L7-aware routing work.** Led 25-person org across 3 dev centers. S-Team priority. 40K server migration (DUB→ZAZ). Products on 1MM+ hosts, 41K+ Apollo stages, 4.1K+ services. $28MM OPEX. Patent on organic service graph healing. Multi-year 100% uptime. |
| Mid-2024 | Departure (forced) | L7 | — | New director ousted surrounding teams. Told Jonathan to find new team. HR disclosed to director. Hiring freeze blocked internal L7 SDM moves. Team taken away. 10+ L7 roles applied to internally, all closed. Left for Meta. |

---

## Era 1: Retail Website & Digital Devices (2007–2015)

### Key Accomplishments
- **EVDD for Baby Diapers**: Delivered independently. Retail Baby Diaper GMS +5.02%, Conversion +3.68%, Units +4.88%, +$536,376 in 13 days
- **Kindle Family Stripe**: Highly configurable, no code changes needed for additions/removals
- **Image Block rewrite**: Rewrote from scratch over two work days + all-nighter before TWO launch, passed QA with no significant bugs
- **Kindle Fire, Touch, latest-gen detail page launches**: Part of every major Kindle launch cycle
- **Amazon Echo product page and invite flow**: Launched as SDM
- **UDP migration**: First phase of US Device ASINs to Universal Detail Page
- **73 interview loops** over Amazon tenure through this period

### Review Highlights
- 2011-12: **Exceeds + Role Model** — "If you give him something, you can be sure that it will get done, and done well." "Set the standard for RMD line item documentation and Code Reviews." "Role model for the engineers on the team."
- 2014-15: **Exceeds** — "Moving into an SDM role better aligned Jon with his strengths as a leader — tech depth, invent & simplify and dive deep." "He's built a highly collaborative group."

---

## Era 2: Amazon Pay / CommerceX (2016–2018)

### Key Accomplishments
- **In-person customer recognition, order ahead, and payment experiences**: Amazon Mall Kiosks, Amazon Books Stores (via Clover), TGI Friday's
- **Place Cards PR/FAQ**: In-store retail applets (Dunkin' Donuts, TGI Friday's, Red Lobster, AMC Theatres)
- **Location Services PR/FAQ**: GPS, BLE beacons, geofencing for contextual shopping
- **Amazon Pay In-Store security/risk review**: Account takeover, stolen devices, merchant data, TLS, non-repudiation
- **Bitcoin/Blockchain strategy**: Authored research doc on cryptocurrency applications for Amazon Pay
- **Whole Foods Prime Benefits BRD**: QR code identification at POS (post-acquisition)
- **Connected Commerce execution framework**: 3 dev centers (Bangalore, Cupertino, Seattle)
- **Target scale**: 20K merchant locations, 75K customer interactions, $1.3B by 2020

### People
- Promoted multiple SDEs (Anshu L5→L6, Chris Maines, Jing Xu, Samir)
- Managed intern hiring and conversion
- Authored SDE II to SDM II transition document

### Review Highlights
- "Great raw technical ability. Innovative big ideas & strategic thinking."
- "Phenomenal big thinker"
- "Really cares for the growth of his employees"
- "Quickly grasp complex and nuanced technical challenges"
- "Empowering people around him with his genuine belief in their capabilities"

---

## Era 3: Buckeye / Region Flexibility Engineering (2018–2024)

### Key Accomplishments — Building the Routing Plane
- **Built Almanac from scratch**: Layer-7 aware routing plane deployed to 41K+ Apollo stages across all of Amazon SDO
- **Built Axon**: Observability platform on 1MM+ MAWS hosts (54.29% of SDO)
- **Built Disco/Convoy**: Context propagation across 4.1K+ services
- **Built Alkimia**: CDK generator for AWS resource extraction (8:1 ROI on infra setup)
- **Built Replicator**: Service cloning automation saving 1,600 SDE years for 17K services (10:1 ROI)
- **Built Roslin**: Reduced MAWS service cloning from 5-6 weeks to 3 days (beta: 10 weeks → 4 days)
- **Built Region Flexibility Analyzer, Service Graph Analyzer, Planisphere**

### Key Accomplishments — Strategic Impact
- **S-Team level priority**: On 10/5/2023, S-team agreed on Region Flexibility as top-down company priority
- **40K server migration** from DUB to ZAZ (S-Team goal by 11/30/2024)
- **158K server demand reduction** target in DUB
- **Almanac saves 256 SDE years** for DUB migration alone (21:1 ROI)
- **Cellularized Amazon's internal configuration store** across 40K+ clients enabling horizontal scaling
- **Led multi-prong routing client adoption strategy**: Native clients for Java, Python, Ruby via GoLang library; integrated into networking sidecar and build tools; led largest ever automated client adoption campaign at Amazon (25% of all Java client instances)
- **Drove consensus across Senior Principal Engineers and Directors** on multi-year plan for coordinated data migrations — resulting in funding of coordinated data migration org
- **Primary author on patent application** concerning organic service graph healing
- **Multi-year 100% uptime** operational record across parent org
- **Supported Amazon.cn and Amazon.in** marketplace migrations across AWS regions
- **Enabled Selling Partner Services** to scalably grow 400+ service portfolio over new marketplaces
- **3 CWG working groups** with 25+ Principal/Senior Principal Engineers
- **Coordinated with 200+ HC** in partner orgs

### Scale Numbers
- 69-74 HC org target, $28MM OPEX, $0.7MM IMR
- 2,074 PY needed from SDO in 2024 (7.2% of Stores SDE resources)
- Reduced per-service migration time: 10-22 weeks → target 2 weeks
- Products covered: 23 marketplaces, 41K Apollo stages, 1MM+ hosts, 4.1K+ services

### People
- Grew org from 12 → 27 → 69+ HC
- 50+ HC hiring plan with diversity-first recruiting strategy (5-part: Diversity, Interview Readiness, Events, Goal Tracking, Sourcing)
- Multi-site: Seattle, Sunnyvale, Vancouver, New York
- 100% top-talent retention; 89% inclusion scores; 0% regretted attrition
- Promoted Ryan Frasheski L5→L6
- Managed global teams across Seattle, NYC, Bangalore, Cupertino, Vancouver, SF Bay Area

---

## Departure (2024)

### Evidence from Email Archives
- **Nov 2023**: "Still searching for L7 SDM role?" email; enrolled in L7 Global Leadership Programs
- **Nov 2023 – Feb 2024**: Applied to 10+ L7 SDM roles across Amazon:
  - Project Kuiper, AI Security, Customer Trust, WW Sustainability, Amazon Today, Amazon Anywhere, Fulfillment Tech, Discovery & App Innovation, Outbound Communications, International Seller Services, WW Speed Tech
- **Feb 2024**: Multiple L7 roles closing ("has been closed") without placement
- **Nov 2022**: Public news about Amazon hiring freezes
- **Context (from Jonathan)**: New director ousted surrounding teams, told Jonathan to find new team in 1:1. HR disclosed conversation to director. With hiring freeze and no team, unable to meet role requirements. Forced to leave. Took M1 position at Meta for more pay and change in focus.
