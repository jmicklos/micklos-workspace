---
type: project
area: Digital Infrastructure
status: active
due:
energy: medium
created: 2026-02-13
todoist-project-id: 6h5CQ4C9XVhxJ8Q8
next-review: 2026-06-20
---

# Design Backblaze alternative backup architecture

## Definition of Done
NAS backup is running on a new provider that costs significantly less than the current ~$130/month Backblaze setup. 34TB of cold, disaster-recovery storage with an rsync-like sync mechanism.

## Context
- **Current setup:** Backblaze, ~$130/month, 34TB
- **Use case:** Off-site disaster recovery (house burns down). Rarely read. Mostly append, rarely update.
- **Upload speed available:** ~500 Mbps

## Options Evaluated

| Service | Monthly (34TB) | Upload Tool | Initial Upload Est. | Retrieval |
|---|---|---|---|---|
| AWS S3 Glacier Deep Archive | ~$34/mo | `aws s3 sync` / `rclone` | ~7-10 days | 12-48 hours |
| Google Cloud Archive | ~$41/mo | `gsutil rsync` / `rclone` | ~7-10 days | Hours |
| Azure Archive | ~$34/mo | `azcopy sync` / `rclone` | ~7-10 days | Hours |

**Decision:** Google Cloud Archive Storage (~$41/mo, saves ~$1,070/year)
- Already in the GCS ecosystem (MCP servers use Google Cloud)
- `gsutil -m rsync` is the simplest sync tool of the three
- GCS console is cleaner than AWS/Azure
- ~$7/mo premium over Glacier Deep Archive is worth the simplicity

## Approach (revised 2026-08-01)
GUI via QNAP **Hybrid Backup Sync (HBS 3)** — no command line. One-way **Backup** job (not Sync) so local deletions/ransomware can't propagate to the DR copy.
- **Provider:** Google Cloud Archive (~$41/mo, saves ~$1,070/yr vs Backblaze)
- **Region:** `us-central1` (Iowa) — deliberately far from the Cascadia subduction zone; Oregon/us-west1 rejected as same fault + grid as Seattle
- **Bucket:** `micklos-nas-archive`, Archive storage class, Uniform access
- **Auth:** service account `qnap-hbs` + JSON key (more durable than OAuth)
- **Gotcha:** Archive has a 365-day minimum storage duration → early-deletion fees on overwrite/delete. Data is mostly-append so low risk; this is why Backup (not Sync).

## Tasks
- [x] GCS: Create Cloud project `nas-backup` + enable billing <!-- todoist:6h9rQqxvchp33rmg -->  <!-- done 2026-08-01 -->
- [x] GCS: Create Archive bucket `micklos-nas-archive` in us-central1 <!-- todoist:6h9rQr5WQC49rWc8 -->  <!-- done 2026-08-01 -->
- [ ] GCS: Create `qnap-hbs` service account + download JSON key <!-- todoist:6h9rQr6wP3wW4HGg -->
- [ ] QNAP HBS 3: Add Google Cloud Storage space (JSON key auth) <!-- todoist:6h9rQr9Wf968jQjg -->
- [ ] QNAP HBS 3: Create one-way Backup job (NAS to GCS) + run initial upload <!-- todoist:6h9rQrGH3qmwx8V8 -->
- [ ] Verify restore from GCS, then cancel Backblaze <!-- todoist:6h9rQrH3chrXmwpg -->

## Waiting On
- [ ]

## Notes
