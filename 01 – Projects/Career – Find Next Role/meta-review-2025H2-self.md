---
type: resource
area: Career
status: evergreen
created: 2026-05-14
source: Meta Performance Review System (PDF export)
author:
  - Jonathan D. Micklos
published: 2026-01-07
tags:
  - review
  - meta
  - self-review
---

# Meta Self-Review — 2025 Year-end

**Cycle:** 2025
**Written:** January 7, 2026

---

## Team-Impact

### EyeUnlock-UX:
- **Drove on-time-delivery** through IC5-DRI+six other ICs:
  - VP-PoC/demo(January)
  - Pismo Integration Fishfooding Support w/ Single-Stage Enrollment:
    - M3.1:INSECURE(August)
    - M3.3:SECURE(November & ahead of schedule)
- **Drove Roadmap** alongside BioAuth V-Team (HAL/ML/HAX teams)/IC7-TL & local-XFNs. Drove alignment w/leadership(roadmap,pattern-deprecation). Effectively/incrementally shifted project management approach/HC-funding/DRI as program shifted(early PoC+steel-thread to formalized requirements set). Drove alignment through team/XFN on 2026 roadmap to deliver for Phoenix(GSD, commitments,team-wb-plan,XFN-TPM-plan).
- **Repeatedly derisked**
  - Unblocked/adjusted roadmap/clarified ownership addressing technical blockers & changes to core dependencies/program expectations(e.g. pismo deprioritization,on-don flux).
  - Escalated bug-fixes to SMEs x-company(e.g.,java runtime bug).
  - Drove ongoing support(with IC7) from other ICs/people leaders(e.g. VRShell, Runtime)
  - Ensured clear HAL support through Pismo/Phoenix Transition for eng/UXR needs.
  - Swapped IC4 for IC5 derisking sudden/ambiguous multi-stage enrollment requirement
  - Clarified HAX owns BiometricPrompt(not BiometricPrompt clients like App-Lock UX owned by NAV)
- **On-Track** for H1-M6/M9 deliverables

### 3P-Login:
- **Drove on-time delivery** through IC5-DRI+four other ICs:
  - X-Device-Passkeys(browser)(experiment v81;shipping v85)
    - led to relative +2.7% VR 1D TS & +2.7% TS compared to holdout, estimated ~0.0656% improvement to topline VR engagement
    - MPR 3.5(A-)
  - X-Device-QR-Code(browser)(v83 experiment)
    - patent pending
    - MPR 3.5(A-)
  - 3P-Login-API(apps)(launched v83)
    - Amazon Music launching 01/15
- **Identified Opportunity/Partnered on Delivery** w/Browser & Media teams
  - Aligned w/partner DRIs for strategy-across-partners
  - Influenced architecture to support Media IC6 delivery of x-device API buildout for v83(thanks1,thanks2)
  - Drove alignment w/leadership(roadmap,update/align w/ Vishal,core-ux leads prioritization,1P-CM support steer)
  - 5 of top 10 websites on quest browser now supported with x-device-login-solutions. All will be supported by EOH1 2026.
  - 13 of the top 15 media partners are expected to utilize HAX login solutions
  - Drove alignment w/team/XFN/Browser-Team/Media-Team/RLTrust on 2026 roadmap to deliver Credentials Manager for Phoenix(GSD,commitments, team-wb-plan,post).
- **Impact delivered**, regardless, did not meet 5% MAU use goal (1.12% of MAU in December)

### Relogin:
- **Maintained guardrail**:same-day-relogin-success>=45%(55.93%@EOY)
  - Ship:Magic-Link-2.0 (+3.07% same-day-relogin-success rate)
  - Experiment:Device code reuse(+1.46% same-day-relogin-success rate)

### PINSanity-Reduction:
- **Did not deliver** store-PIN migration to passcode by EOY. Instead, aligned that store will adopt Biometric Prompt in EyeUnlock-M9 (Phoenix readiness).

---

## People-Management

### Pulse
- Team&PersonalExperience:67%(+19%YoY)
- ManagerExperience:77%(+28%YoY)
  - WouldWorkWithAgain: 90%(+30%YoY)
- BE:70%(+27%YoY)
- BD:53%(+3%YoY)
- Satisfaction:60%(-11%YoY), BestWork:(+3%YoY), IntentToStay(-30%YoY)
- Delivered All 2024'H2 & Most 2025'H1 Items, including instituting recurring BizOps Review with team, a refined team-wide project management process, & commitment to clarify if asks are option opportunities or expectations.
- Generally improved Pulse scores YoY despite "many neutral responses came from new members who hadn't had enough time to fully evaluate their experience" (as independently noted by team)

### Team
- Hired/onboarded three IC4s(external) & one IC5(internal)
- Managed out underperforming IC4 in February event
- Effectively coached team:
  - High confidence IC3->IC4 promo EOY-cycle
  - IC5 on strategy for the X-Device program/path to IC6
  - IC5 for effective comms/project management(thanks,example)
- Effectively balanced ICs across projects to ensure appropriate opportunities/ownership/derisking(e.g. IC4/5 swap for EyeUnlock Multi-Stage Enrollment)
- Incorporated feedback, builds culture, & ensured operational sustainability:
  - Feedback:Oncall Issues: Instituted month-long team-wide Quality Lockdown to address quality issues
  - Feedback:Tracking projects/dependencies poorly defined: Coached IC6 on developing solution(resulting template).
  - Feedback:Lack of Engineer Buy-In:Ensured engineers self define/own/delegate timelines/goals/deliverables in H2/for 2026 commitments(project-management expectations,process change attribution). Used to influence other team(thanks).
  - Feedback:EyeUnlock Roadmap Clarification Too Costly: Owned restructuring/clarifying with team myself(GSD,commitments,team-wb-plan, XFN-TPM-plan).
  - Feedback:RL-GSD Compliance Changes Too Costly: Owned reshuffling/migrating GSDs into L4 projects myself(device-locks,3p-login)
- Ensured team has mentors
- No regretted attrition within my control(e.g. not RTO)

---

## Collaboration

### Identified Joint Opportunities & Drove Outcomes Across Teams:
- Partnered with Media & Browser teams to drive the 3P-media-app-login strategy, including instituting two-day onsite to identify strategic bets & jointly authoring 2025 roadmap & 2026 roadmap(GSD,commitments,team-wb-plan,post) with XFN & direct EM
- Fostered collaboration with partners (e.g., Prime Video, Amazon Music, Disney Plus, YouTube) to develop & drive adoption of login solutions, aiming for 5% goal & Media expansion objectives
- Drove clarity on zero-knowledge vault plan with RLTrust(clarification,thanks) in order to disambiguate backup/recovery/sync option-space/strategy/roadmap
- Ongoing work with Agentic Web team for Credentials Management Support
- Driving clarity/understanding of Knockout integration option space to ensure we understand risks v. opportunities

### Effectively Worked Across XFN for Delivery/Process Improvement:
- Worked alongside EyeUnlock TPM & team to disambiguate/track/drive down blocking dependencies, clarify roadmap, & institute PM GSD structure for RL-L4/L3 tracking
- Prioritized 3P CM support alongside productivity XFN

### Effectively Communicated Updates Independently & w/XFN:
- Operations:Quality Lockdown(Entering,Update-1,Update-2,Exit))
- Team&Org Planning & Roadmap:Q1 Program Update,HAX H1 Onsite,APE H2 Planning Summit Recap
- Progress Updates:
  - CredentialManager:V-Onsite Phoenix Workback Plan,Nov'25 Status,Dec'25 Status, 1P CM App FYI
  - EyeUnlock:Bioauth 3.1 Milestone Success,Multistage Enrollment FYI,10/17 Status Update,Phoenix EyeUnlock & VHAL Expectations FYI

---

## Org

- Led the H2'Planning Onsite for the APE Organization, ensuring teams were prepared & delegated responsibilities.
- CoreUX DRI for:
  - HzOS Release Shiproom
    - Shadow:v78
    - DRI:v81/v83/v201(thanks)
    - Improved tracking efficiency
    - Ramped Alexey Sednev as v85 DRI(thanks)
  - Q4 Operational Readiness
  - Pismo Shiproom
- Sev-Review-Moderator
  - 3/19 Update
  - 8/5 Update
- Referred IC6 Data-Engineering candidate
- Identified & Drove Solves for Common Org Deficiencies:
  - Given repeat leaks(e.g.S583446,S599797,etc.), worked across CoreUX toward short-term leak prevention best-practices(Henry post,notes), & RLTrust for long term solutions(proposal,option-space). Aligned with CoreUX leadership on next steps to drive best-practice adoption in CoreUX first.
  - Working with Settings/RLTrust/HzOS System (chat,notes) to audit & allow list AOSP Intents to prevent bad UX like inadvertent bricking(S581266,S521997). Next steps will be to audit intent usage post PSC.
- Helped onboard Rafael to org

---

## Strengths (1-3)

1. Identifying/Driving Opportunities X-Team/Org
2. Helping others Scale/Delegate Delivery
3. Ensuring Operational Health

---

## Growth Areas (1-4)

1. **Delivering Impact via AI**: As written.
2. **Double Down on Support at Org-Level**: Capitalize on DRI work and drive arch/process improvements like AOSP intent allow list and leak prevention.
3. **Double Down on Cross-Org Alignment and Delivery**: Continue to identify 3P login opportunities deliver alongside partners.
4. **Double Down on Reducing Program-Management Overhead/Improve Efficacy**: Continue to empower team with ownership/independence and remove undifferentiated overhead.
