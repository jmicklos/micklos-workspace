---
type: resource
area: Career
status: evergreen
created: 2026-05-14
source: Meta Performance Review System (PDF export)
author:
  - Paul Wright (Manager)
published: 2026-03-02
tags:
  - review
  - meta
  - manager-review
---

# Meta Manager Review — 2025 Year-end

**Cycle:** 2025
**Written by:** Paul Wright — Submitted 2026-03-02
**Rating:** Consistently Met Expectations

---

## Rationale

Congratulations on receiving a Consistently Met Expectations rating for 2025. We have high expectations of Engineering Managers and you were able to support your team and meet them.

In 2025 your team met more than half of 50/50 metrics goals and major milestones consistently. Notably, they delivered key results on bioauth and credentials manager despite XFN gaps, strategy changes, and release headwinds.

You supported the larger organization by representing CoreUX in Shiproom the majority of the year.

You also sought out and proactively acted on feedback.

---

## Team Impact

### 3P-Login (4 ICs, full year)
- **Complexity:** PM leadership "won over", pulled impact forward by strategic roadmap shifts, timeline shifted due to release challenges and product alignment
- **Shipped on-time**
  - X-Device-Passkeys(browser)(experiment v81;shipping v85)
    - led to relative +2.7% VR 1D TS & +2.7% TS compared to holdout, estimated ~0.0656% improvement to topline VR engagement
    - MPR 3.5(A-)
  - X-Device-QR-Code(browser)(v83 experiment)
    - patent pending
    - MPR 3.5(A-)
  - 3P-Login-API(apps)(launched v83)
    - Amazon Music launching 01/15
- **Impact:**
  - 5 of top 10 websites on quest browser now supported with x-device-login-solutions
  - 13 of the top 15 media partners are expected to utilize HAX login solutions
  - missed 5% MAU use goal (1.12% of MAU in December), expected after v80 canceled

### Pinsanity
- Shifted out due to Phoenix, aligned with store team

### Relogin (Key quality metric, strong DAU correlation)
- **Maintained guardrail**:same-day-relogin-success>=45%(55.93%@EOY)
  - Ship:Magic-Link-2.0 (+3.07% same-day-relogin-success rate)
  - Experiment:Device code reuse(+1.46% same-day-relogin-success rate)

### EyeUnlock-UX (6 ICs, full year)
- **Complexity:** large XFN complexity, resolved blockers like missing/incomplete requirements, unstable pismo builds, and upstream delays to hit dogfooding and lab testing goals
- **Drove on-time-delivery** through IC5-DRI and 6 other ICs:
  - VP-PoC/demo(January)
  - Pismo Integration Fishfooding Support w/ Single-Stage Enrollment:
    - M3.1:INSECURE(August)
    - M3.3:SECURE(November & ahead of schedule)
- **Managed multiple risks**
  - Unblocked/adjusted roadmap based on headwinds: pismo deprioritization, on-don requirements, display infra thrash
  - Escalated bug-fixes to SMEs x-company(e.g.,java runtime bug).
  - Large xfn-complexity (e.g. VRShell,Runtime)
  - Ensured clear HAL support through Pismo/Phoenix Transition for eng/UXR needs.
  - Swapped IC4 for IC5 derisking sudden/ambiguous multi-stage enrollment requirement
  - Clarified HAX owns BiometricPrompt(not BiometricPrompt clients like App-Lock UX owned by NAV)
- **On-Track** for H1-M6/M9 deliverables

---

## Manager Contribution

### Bioauth
- Drove alignment w/leadership(roadmap,pattern-deprecation).
- Partnered with TPM on building/maintaining milestone plan
- Drove alignment for Phoenix(GSD,commitments,team-wb-plan,XFN-TPM-plan).

### 3P Login
- **Identified Opportunity/Partnered on Delivery** w/Browser & Media teams
  - Aligned w/partner DRIs for strategy-across-partners
  - Influenced architecture to support Media IC6 delivery of x-device API buildout for v83(thanks1,thanks2)
  - Drove alignment w/leadership(roadmap,update/align w/ Vishal,core-ux leads prioritization,1P-CM support steer)
  - Drove alignment for 2026 and Phoenix(GSD,commitments,team-wb-plan,post).

### Team operations
- Updated team structure to enable successful delivery
- Instituted month-long team-wide Quality Lockdown
- Delegated/partnered with IC6 to standardize project plan

---

## Collaboration

### Login needs of external teams
- Partnered with Media & Browser teams to drive technical strategy, including instituting two-day onsite
- Worked with PM/media/external partners (e.g., Prime Video, Amazon Music, Disney Plus, YouTube) on solutions
- Agentic Web team for Credentials Management Support
- Driving clarity/understanding of Knockout/sports requirements and integration
- Prioritized 3P CM support alongside productivity XFN

### Eye Unlock across orgs
- Worked alongside EyeUnlock TPM & team to build and track plan

### Improved collaboration and partnership with Trust
- Drove clarity on zero-knowledge vault plan with RLTrust(clarification,thanks)
- Gave feedback on partner PM

### Fills XFN gaps as needed
- e.g. filled PM gaps and produced requirements for partner (trust) leadership

---

## Org Impact

- Led the H2'Planning Onsite for the APE Organization, ensuring teams were prepared & delegated responsibilities.
- Sev-Review-Moderator
  - 3/19 Update
  - 8/5 Update
- Recruiting/Onboarding
  - Referred IC6 DE
  - Helped onboard new EM
- Breaks down problems and drives conversations (could have been higher with clear results)
  - Leaks (option-space): brought to EM group for next-steps
  - Allow list AOSP Intents to prevent bad UX(S581266,S521997), generalized and planned comprehensive solution
- CoreUX DRI for HzOS Release Shiproom part of year
  - large product impact, multiple releases

---

## People Management

### Pulse
- Satisfaction 60%(-11), Best Work 60%(+17), Intent-to-Stay 70%(-13)
- Manager Experience 77%(-2), Team/Personal Experience 67%(+9)

(Somewhat low, but upward feedback >=4.3 and no concerns on followup)

- Created plan and delivered:
  - all 2024'H2 & Most 2025'H1 Items
  - Generally improved Pulse scores YoY

### Impact
- Hired/onboarded 3 IC4s & 1 IC5
- Managed out underperforming IC4
- Ensured team has mentors
- 2 regrettable attrition (primarily office location), backfilled efficiently
- Effectively coached team:
  - *High-performing IC3: IC3->IC4 promo + RE*
  - Building a bench: IC5 growing towards IC6
  - IC5 for effective comms/project management(thanks,example)

---

## Strengths

- Willing and eager to jump in and solve problems, identifies and takes ownership of hard problems.
- Up-leveled communication across projects on the team.
- Pushes team to take on ambitious goals.

---

## Growth Areas

- Continually evaluate structure and process and adapt without thrashing the team as much and creating higher throughput systems. Control is less important than throughput (with quality).
- Make sure you have the team buy in, especially for projects and estimates but for changing team processes and culture as well. Have the influencers on the team bought in and leading the effort.
- Pay attention to partnerships, with XFN and particularly senior eng. People should feel that you can help make them successful and come to you for help.
- Defend your team's execution and delivery, balancing more ambitious longterm goals with the very next milestone.
- In your larger org efforts continue to focus on impact and outcomes. Be careful of taking on many things that are hard to make progress on (e.g. leaks prevention, templates, processes) and give more time to the ones that lead to material wins.
