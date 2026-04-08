# Alcohol Distribution Transparency Platform

## The Problem

In Washington State, bars and retailers struggle to identify who distributes specific alcohol products. Products are tied to single distributors, assignments frequently change, and there is no centralized, reliable source of truth. As a result, industry professionals waste time chasing information through reps, emails, and informal networks.

## The Solution

We are building a centralized, searchable platform that answers one simple question instantly: who distributes this product in Washington? The platform aggregates data from users, importers, and distributors, and applies a confidence-based validation system to ensure accuracy without requiring perfect data.

## How It Works

Users search for a product and see its likely distributor, confidence score, and last verification date. Industry professionals contribute updates, confirm accuracy, and improve the dataset over time, similar to a structured wiki model. Over time, distributors and brands can participate directly to increase visibility and ensure accuracy.

## Why It Matters

This platform saves time, reduces friction in ordering, and increases transparency across the alcohol supply chain. It transforms fragmented, insider-only knowledge into a shared, reliable resource for both industry professionals and consumers.

## Future Potential

Once established, the platform can expand into product discovery, distributor promotion, and ordering tools, creating a new infrastructure layer for the alcohol industry.

---

# Alcohol Distribution Platform: Strategy & Build Plan

## 1. Core Vision

Build a centralized, living database for alcohol availability in Washington State that connects distributors, bars, and consumers. The platform should function as both a discovery engine and an operational tool for industry professionals.

## 2. Key Problems to Solve

1. No centralized database of products and distributors.
2. Frequent changes in distribution assignments.
3. Lack of transparency for small or niche products.
4. Inefficient ordering and minimum requirements.
5. Heavy reliance on sales reps for information.

## 3. Data Sources

1. User-generated submissions (bars, buyers, enthusiasts).
2. Distributor self-submission portals.
3. Importer/brand submissions.
4. Public regulatory data (WA LCB records).
5. Web scraping distributor portfolios (where available).

## 4. Data Validation Strategy

1. Upvote/downvote credibility system.
2. Trusted contributor tiers (reputation-based).
3. Cross-verification from multiple users.
4. Distributor-verified badges.
5. Moderation tools to flag suspicious entries.

## 5. Platform Features

1. Searchable product database.
2. Distributor mapping per product.
3. Bar/restaurant inventory listings.
4. User accounts and contribution system.
5. Forum/discussion threads for each product.
6. Alerts for product or distributor changes.

## 6. Monetization Ideas

1. Paid featured listings for brands and distributors.
2. Ad placements targeted to industry users.
3. Premium analytics for distributors.
4. Transaction fees from integrated ordering tools.

## 7. MVP Build Strategy

1. Phase 1: Basic product + distributor database (manual seeding).
2. Phase 2: User submission + editing system.
3. Phase 3: Reputation and validation system.
4. Phase 4: Distributor onboarding.
5. Phase 5: Ordering and logistics integration.

## 8. Risks & Considerations

1. Data becoming outdated quickly.
2. Low early adoption from contributors.
3. Distributor resistance to transparency.
4. Legal considerations around alcohol data and sales.
5. Balancing accuracy vs. openness.

## 9. Key Questions to Answer

1. How do we seed the initial dataset?
2. How do we ensure ongoing data accuracy?
3. What incentives drive user contributions?
4. How do we onboard distributors?
5. What is the simplest MVP we can launch quickly?

---

# Alcohol Distribution Platform: Master Meeting Playbook

## 1. Ruthless MVP Focus

Start with one core function: search a product and identify its likely distributor in Washington State.

### Core MVP Features

1. Search bar
2. Product page (name, category, distributor)
3. Confidence score
4. Last verified timestamp
5. Submit/edit button
6. Voting system (correct/incorrect)

## 2. Data Model (Simplified)

1. Products: id, name, category, brand
2. Distributors: id, name
3. Product_Distributor: product_id, distributor_id, confidence_score, last_verified
4. Users: id, role, reputation_score
5. Votes: product_distributor_id, user_id, vote_type

## 3. Data Seeding Strategy

1. Manual entry from industry contacts (200-500 products)
2. Scraping distributor sites and LCB data
3. Importer outreach for accurate distributor info

## 4. Confidence Score System

1. 90% = verified by multiple sources
2. 70% = likely correct
3. 40% = questionable
4. 10% = unverified

## 5. Incentives for Contributors

1. Immediate usefulness (save time finding info)
2. Reputation system and badges
3. Alerts and saved searches

## 6. Target Launch Audience

These users already feel the pain and actively search for this information.

1. Seattle bartenders
2. Bar managers
3. Industry buyers

## 7. UI Concept

1. Homepage with large search bar
2. Product result page with distributor info
3. Voting and edit options
4. Comment section for notes and updates

## 8. Development Phases

1. Phase 1: MVP (search + data)
2. Phase 2: Validation system
3. Phase 3: Distributor onboarding
4. Phase 4: Monetization
5. Phase 5: Ordering system (advanced)

## 9. Key Meeting Questions

1. What is the exact MVP scope?
2. How do we seed initial data?
3. How do we ensure data accuracy?
4. How do we get first users?
5. What can we build in 2-4 weeks?

## 10. Risks

1. Data becoming outdated
2. Low user engagement
3. Distributor resistance
4. Overbuilding too early
5. Legal considerations

## 11. Core Guiding Principle

We are building the fastest way to answer: who carries this in Washington.
