# Worklog — Emergency Prep – Replace Backblaze

## 2026-06-06 — Activated and scoped

### Context
- Currently paying ~$130/month on Backblaze for 34TB of NAS backup
- Use case is cold disaster recovery (house burns down). Rarely read, mostly append.
- Upload speed available: ~500 Mbps

### Decisions
- Evaluated AWS Glacier Deep Archive (~$34/mo), Google Cloud Archive (~$41/mo), Azure Archive (~$34/mo)
- **Selected Google Cloud Archive** — already in GCS ecosystem (MCP servers), `gsutil -m rsync` is simplest tool, ~$7/mo premium over AWS is worth the simplicity
- Upload speeds are not throttled by providers — bottleneck is local bandwidth (~7-10 days for initial 34TB upload)
- `rclone` is the universal rsync-like tool, but `gsutil -m rsync` is native and simpler for GCS

### Progress
- [x] Evaluate options
- [x] Decide on provider (Google Cloud Archive)
- [ ] Set up GCS bucket with Archive storage class
- [ ] Run initial 34TB upload
- [ ] Set up recurring sync from NAS
- [ ] Verify restore works
- [ ] Cancel Backblaze

### Next Steps
- Create GCS bucket with Archive storage class
- Start initial upload with `gsutil -m rsync -r /nas/path gs://bucket`
- Cron it for ongoing sync
