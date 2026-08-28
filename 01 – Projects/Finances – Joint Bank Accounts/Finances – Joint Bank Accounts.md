---
type: project
area: Finances
status: active
next-review: 2026-09-05
due: 2026-10-01
energy: medium
created: 2026-08-20
todoist-project-id: 6X34CC5hFg7X47HF
todoist-section-id: 6hP87jXPqg7Fqmjm
---

# Finances – Joint Bank Accounts

**Goal:** Stand up the joint account structure Jonathan and Wan Ting need for shared bill pay and earmarked travel savings (honeymoon first), optimized for yield *and* day-to-day ease of use, with both of them able to see and use it.

**Done state:** Joint accounts are open, titled correctly, funded, wired to automatic contributions from both individual accounts, with recurring bills moved over and the honeymoon savings bucket accruing on a schedule that hits its number before booking.

## Context

### Why now
- Jonathan and Wan Ting are married as of the Seattle civil ceremony (2026). The CDMX wedding is **2026-12-12**; the Singapore tea ceremony is **Feb 2027**.
- **[[Travel – Honeymoon 2027]]** is the forcing function. That project's booking deadline is **2026-11-01** (lock destination + core lodging), and the trip window is **Mar–Jun 2027**. Deposits start landing this fall, so the travel-savings bucket needs to exist and be funded *before* November.
- This work was previously a single line item — `Finance plan: bank accounts etc` — inside **[[Wedding – Post-Marriage Setup]]**. It's big enough to own its own project. See *Relationship to other projects* below.

### Decisions already made (2026-08-20)
- **Both spouses are US persons** (citizen/green card). No NRA / ITIN eligibility constraints, no gift-tax or FBAR complications from joint titling. Any US bank or brokerage joint account is on the table.
- **Money model: "yours / mine / ours."** Both keep individual accounts. Both auto-contribute a set amount to the joint accounts, which cover shared bills and shared savings goals. Rejected: full merge (too big a change), and joint-bills-only (leaves travel savings unshared, which defeats the honeymoon use case).
- **Steady-state joint balance: $25k–$100k**, split between a bill-pay checking float and earmarked travel savings.
- **Washington State has no state income tax.** This is load-bearing and cuts against the standard internet advice: the state-tax exemption on T-bills, Treasury ladders, and funds like SNSXX is worth **$0** here. Options get evaluated on pure after-federal-tax yield and convenience. Do not build a Treasury ladder for a state-tax benefit that doesn't exist.
- **Existing brokerage relationship: Charles Schwab** (Roth IRA holding SWTSX — see [[Finances – Build FI Framework]]). Schwab Bank Investor Checking and Schwab money funds are being evaluated as part of the structure.

### Constraints the structure has to satisfy
1. Recurring inbound ACH from **two different outside banks** (Jonathan's and Wan Ting's individual accounts).
2. **Shared visibility** — ideally separate logins for each of them, not one shared password.
3. **Earmarking** — travel savings has to be visibly separate from bill money, so they don't accidentally spend the honeymoon. Sub-accounts / buckets / vaults matter here.
4. **International usability** — honeymoon plus regular Singapore travel. ATM fee rebates and no foreign transaction fees are worth real money.
5. Bill pay, joint debit, mobile deposit.

## Relationship to other projects

| Project | Relationship |
|---|---|
| [[Wedding – Post-Marriage Setup]] | **Parent.** Its task `Finance plan: bank accounts etc` (todoist `6h9rG8fPcPX4vcJm`) is the seed of this project. That task stays where it is; this project is where the work actually happens. Close it there when this project completes. |
| [[Travel – Honeymoon 2027]] | **Driver.** Sets the deadline (booking by 2026-11-01) and the savings target. The travel bucket exists to fund that trip. |
| [[Finances – Build FI Framework]] | **Sibling.** The FI framework owns long-horizon investing (100% equities, account waterfall, Schwab Roth). This project owns *short-horizon cash*. Do not let the two blur — joint cash here is spending money with a known date, not FI assets. The open `real annual spend` question there will be much easier to answer once shared bills run through one joint account. |
| [[Wedding – Legal Name Change]] | **Adjacent.** Owns name updates across US + SG accounts, and beneficiary nominations. If Wan Ting's name changes, sequence account opening around it — opening joint accounts under a soon-to-change name creates rework. **Open question, see below.** |

## Recommendation

*Researched 2026-08-20/21. 23 sources, 115 claims extracted, 25 adversarially verified (3-vote), 18 confirmed. Rate figures are dated below and are **volatile — re-check every one before opening anything.***

### Three accounts, three jobs

| # | Account | Holds | Why |
|---|---|---|---|
| 1 | **Schwab Bank Investor Checking (joint)** | Bill-pay float only — 1–2 months of shared expenses | Unlimited **worldwide** ATM fee rebates + **zero foreign transaction fee**. Best travel checking product in the US, and you two travel to Singapore regularly plus the honeymoon. |
| 2 | **Joint HYSA with buckets — Ally (or Marcus)** | Shared savings + overflow above the checking float | Ally supports **up to 30 buckets** in one savings account — exactly the "earmark the honeymoon so we don't spend it" feature, without juggling accounts. Marcus confirmed **3.40% APY** (Aug 20, 2026). |
| 3 | **Joint CD — 9-month or no-penalty** | The honeymoon money | Known spend date = the one time locking a term actually pays. Marcus 9-mo CD **4.10% APY** (Aug 20, 2026), $500 min — **70bp above its own savings rate.** |

### The Schwab trap — most important finding
Do **not** let the joint savings default to Schwab just because the brokerage lives there.

- **Schwab Bank Investor Savings: 0.15% APY** at every tier, including the $50k–$100k tier (as of 08/21/2026). That is ~325bp below a leading HYSA. On $50k that's **~$1,600/yr thrown away.**
- **Schwab Interest Checking Plus: 0.01% APY** at all tiers.
- Schwab has **eliminated money-market funds as the automatic cash sweep** for most accounts. Idle cash does *not* earn the money-fund rate by default — you must manually buy the fund. The remaining sweep share class (SWGXX) pays 3.28%.

Use Schwab checking for its *transactional* features. Do not use it as a yield vehicle.

### The Washington angle, confirmed by the data
The no-state-income-tax hypothesis held up precisely:

- **SWVXX (Prime): 3.50%** vs **SNSXX (Treasury-only): 3.41%** — 7-day yields as of 08/19/2026.
- SNSXX's entire selling point is that Treasury income is state-tax-exempt. **In Washington that's worth $0.** So SWVXX is *strictly better after tax* here — higher yield, no offsetting benefit forgone. SNOXX is lower still at 3.37%.
- Same logic kills the T-bill-ladder advice. **SGOV** 30-day SEC yield **3.60%** (Aug 19, 2026) is respectable, but it doesn't beat a 4.10% CD, and it's a brokerage position rather than an FDIC-insured account with a shared login.
- **If** you ever want to hold joint cash at Schwab, the answer is SWVXX bought manually — not SNSXX, not the sweep.

### Rate environment
Fed funds held at **3.50%–3.75%** through August 2026, with no cuts so far in 2026 (last three were Sep/Oct/Dec 2025). The June 2026 SEP implied no change through early 2027 and roughly one cut.

⚠️ **Confidence caveat:** the three verifier agents assigned to the rate-environment claims all died on a session limit, so these figures are **unverified** — though three independent sources (FOMC minutes, Yahoo Finance, centralbank.watch quoting 3.63%) agree. Treat as directionally right, confirm before relying on it.

Implication: flat-to-slightly-easing. You give up little by staying variable, but the **70bp CD term premium is being paid right now** — so for money with a known spend date, take it.

### The sequencing wrinkle
A plain 9-month CD is a slightly wrong fit. Honeymoon **deposits start landing this fall** (booking deadline 2026-11-01), not all at once in Mar–Jun 2027. A locked CD would trap money you need in November.

Two ways out:
1. **No-penalty / add-on CD.** Climate First Bank's "Flex CD" — **4.07%–4.18% APY**, 8- and 12-month terms, $500 min, allows **$100 add-on deposits** and **one penalty-free withdrawal of up to half the principal** (CNBC Select, Aug 19 2026). Nearly matches the Marcus rate while staying flexible. Best single fit.
2. **Split it.** Booking deposits stay in the HYSA bucket; the remaining balance goes into a 9-month CD timed to mature before travel.

Highest 6-month CD found: **DR Bank Digital Prime, 4.30% APY**, $500 min (DepositAccounts, 8/21/2026) — best rate, but no add-ons.

### Money on the table
On a ~$60k joint balance ($10k checking float + $50k earning):

| Structure | Annual interest |
|---|---|
| All in big-bank checking (~0.01%) | ~$6 |
| $50k in Schwab Bank Investor Savings (0.15%) | ~$75 |
| $50k in a 3.40% HYSA | ~$1,700 |
| $50k in a 4.10% CD | ~$2,050 |

**≈$1,700–$2,050/yr** versus leaving it in a big-bank checking account. Roughly **$350/yr** for the CD-vs-HYSA decision alone.

### Joint titling in Washington — practical points
- **RCW 30A.22.100** enumerates how a WA deposit account may be titled: individual; individual with POD; joint *without* right of survivorship; joint *with* ROS; and joint with ROS + POD. **ROS is a distinct affirmative election** — you must ask for it. Don't assume "joint" means survivorship.
- **RCW 30A.22.030(5)**: the *form* of the account does **not** change whether funds are community or separate property. Titling an account jointly does not convert separate property into community property, or vice versa. Useful to know — it means joint titling is a convenience/probate decision, not a property-character decision.
- **Community Property Survivorship Agreement (CPSA)** — a WA married couple can sign one converting present and future property to community property, vesting the deceased spouse's half automatically in the survivor, outside probate. Broader than per-account ROS and may be the cleaner instrument. Worth raising whenever estate work happens under [[Wedding – Legal Name Change]].
- Standard joint-account exposure applies: either spouse can drain the account unilaterally, and it's reachable by either spouse's creditors.

### Other findings
- **Amex *does* support joint accounts** on its online savings products, structured as Joint Tenancy With Right of Survivorship — this contradicts the common belief (and my own prior) that Amex is individual-only. Caveat: the FAQ defines joint accounts but doesn't clearly document opening one online. Verify directly if you want Amex.
- **Wealthfront Cash** supports joint ownership with **$16M FDIC** coverage for joint accounts (vs. $8M individual) across up to 32 program banks. Way past what you need — but its **ATM reimbursement is only 2/month, US-only**, so it loses badly to Schwab for travel. Its advertised APY carried a stale as-of date; re-verify.
- **Other joint-eligible HYSAs** (Motley Fool, May 2026 data — secondary source, verify): EverBank Performance Savings 3.90%, E*TRADE Premium Savings 3.75%, Barclays Tiered 3.50%, Synchrony 3.30%, Capital One 360 Performance Savings 3.00%.
- **Bonuses worth a look:** Capital One 360 Checking **$250** (promo `CHECKING250`) for 2 qualifying direct deposits of $500+ within 75 days. SoFi **$50–$400** tiered on direct deposit size (sources disagree — Doctor of Credit says $300 top tier, The Bonus Stack says $400; verify). ⚠️ Both require *qualifying direct deposit*, which your employer paycheck satisfies but a **recurring ACH push from your own outside bank often does not** — which is exactly how the yours/mine/ours model funds these accounts. Check the definition before chasing a bonus.

### Open verification items before acting
- [ ] **Joint Schwab Investor Checking linked to a joint brokerage cannot be opened online** — must call **888-403-9000** or visit a branch. Budget a phone call.
- [ ] Re-verify every APY on the day you open. All of these are variable and dated Aug 19–21, 2026.
- [ ] Schwab's ATM rebate excludes dynamic-currency-conversion fees, POS surcharges, and balance-inquiry fees — and Schwab reserves the right to discontinue the rebate. Always decline DCC at foreign ATMs and choose to be charged in local currency.
- [ ] Confirm Ally's current APY and that buckets are available on joint accounts.

## Tasks


- [ ] Decide the account structure (gated on research findings) <!-- todoist:6hP87jp3vCMq6Vqm -->
- [ ] Confirm name-change sequencing with Wan Ting before opening anything <!-- todoist:6hP87jjvQgcGqGgF -->
- [ ] Agree the monthly contribution amount from each person <!-- todoist:6hP87jr7G8PCrMvF -->
- [ ] Set the honeymoon savings target and back into a monthly number that clears it before deposits are due <!-- todoist:6hP87jv76RQjFVrm -->
- [ ] Open joint checking; title as joint tenancy with right of survivorship <!-- todoist:6hP87jr5h7rHCvgm -->
- [ ] Open joint savings / travel bucket <!-- todoist:6hP87m24Jj2mwM4m -->
- [ ] Fund initial balances <!-- todoist:6hP87jvhpVVwc3cF -->
- [ ] Set up recurring auto-transfers from both individual accounts <!-- todoist:6hP87m34FmVqrw7F -->
- [ ] Move shared recurring bills over (Seattle Utilities, PSE, internet, insurance, subscriptions) <!-- todoist:6hP87m54CGgX4Rwm -->
- [ ] Verify both have independent logins and card access <!-- todoist:6hP87m5f2rPXV9Qm -->
- [ ] Record account details in the Post-Marriage Setup shared household reference <!-- todoist:6hP87m5JmHcV4f3F -->

## Open Questions

- [ ] **Is Wan Ting changing her name, and when?** If yes, opening joint accounts first means re-papering them. Sequencing decision, gates the "open accounts" tasks.
- [ ] What is the honeymoon budget number? [[Travel – Honeymoon 2027]] hasn't landed on a destination yet, and Bhutan-with-Amankora vs. Patagonia-with-Explora are very different numbers. Affects the monthly savings rate.
- [ ] Do shared bills include the rental property, or does that stay separate? (See Rental Property area — it has its own Todoist project.)
- [ ] How much bill-pay float is actually needed? Depends on the real monthly shared spend, which is currently unknown.
- [ ] Should the wedding itself (CDMX, Dec 2026) be paid from a joint account, or is that already handled separately?

## Notes
