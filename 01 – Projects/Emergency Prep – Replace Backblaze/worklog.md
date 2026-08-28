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
- 2026-07-12 16:30 -- `Emergency Prep – Replace Backblaze.md` via Edit

## 2026-08-01 — Reframed to GUI approach + tasks created

### Situation
- Jonathan called this out as an easy project he'd been dragging his feet on and wanted a clean, executable checklist. No Todoist tasks existed yet.

### Key decisions this session
- **Ditch the command line.** Jonathan has a **QNAP** NAS → use built-in **HBS 3 (Hybrid Backup Sync)** GUI instead of `gsutil`/`gcloud`. Confirmed via QNAP docs that HBS 3 has native Google Cloud Storage support.
- **One-way Backup job, NOT Sync** — Sync would propagate local deletions/ransomware to the only DR copy.
- **Auth = service account JSON key** (durable) over OAuth (can require re-auth). HBS 3 supports OAuth / P12 / JSON.
- **Region correction — Jonathan's catch:** he flagged that putting the bucket near Seattle defeats DR against a **Cascadia subduction quake**. My earlier us-west1 (Oregon) pick was wrong — same fault + grid. Switched to **`us-central1` (Iowa)**: ~1,700 mi away, different grid, geologically stable, and cheapest US region. us-east1 (SC) was the runner-up; multi-region deemed overkill.
- Bucket name: `micklos-nas-archive`. Account: existing jonathan.micklos@gmail.com (isolation via dedicated *project* `nas-backup`, not a new login).

### What Jonathan Said
- "I'm not certain doing this via command line is the right approach, I have a qnap device and it's likely easier to go through their GUI"
- "I'm going to put the bucket away from seattle ... that's kind of the idea in the event of a cascade fault quake or what not, no?" — correct DR instinct; drove the region change.

### Outputs & State
- Created 6 Todoist tasks in project 6h5CQ4C9XVhxJ8Q8, mirrored into the project note's new `## Tasks` section with todoist IDs.
- Rewrote the project note's approach section (GUI, region, auth, Archive gotcha).

### Open Threads
- NAS folders/shares in scope not yet specified — task 5 says "NAS folders" generically; Jonathan to select at job-creation time.
- Retrieval cost for a full restore (~$1,700 retrieval + ~$4k egress for 34TB) noted and accepted for the "house burned down" scenario.

### Next Steps
- Execute task 1: create the `nas-backup` Cloud project + enable billing. Then bucket, then service account/key — that whole GCS phase is one ~30-min sitting.
- Then QNAP HBS 3 phase (add storage space, create Backup job, kick off upload). Initial upload ~7–10 days.
- Verify restore, then cancel Backblaze.
- 2026-08-01 -- tasks created via Todoist API; note + worklog updated
- 2026-08-01 10:14 -- `Emergency Prep – Replace Backblaze.md` via Edit
