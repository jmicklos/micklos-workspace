---
type: project
area: Digital Infrastructure
status: active
due:
energy: medium
created: 2026-02-13
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

## Next Actions
- [x] Decide on provider — Google Cloud Archive
- [ ] Set up account and bucket/vault
- [ ] Run initial 34TB upload
- [ ] Set up recurring sync from NAS
- [ ] Verify restore works
- [ ] Cancel Backblaze

## Waiting On
- [ ]

## Notes