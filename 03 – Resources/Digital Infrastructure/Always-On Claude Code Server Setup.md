---
type: resource
area: Digital Infrastructure
status: evergreen
created: 2026-03-31
author:
  - Jonathan D. Micklos
---

# Always-On Claude Code Server Setup

## Purpose
Dedicated always-on device running Claude Code with remote control, so Jonathan can access the PARA vault from his phone 24/7 without the laptop being open.

## Hardware
- (Update when device arrives)
- Connected to home network via Unifi
- On separate VLAN for isolation

## Setup Checklist

### 1. Base OS
- [ ] Flash OS (Raspberry Pi OS / Ubuntu Server for Pi, or appropriate for device)
- [ ] Enable SSH
- [ ] Set static IP or DHCP reservation in Unifi
- [ ] Create VLAN in Unifi for home servers (if not already done)
- [ ] Assign device to server VLAN

### 2. Node.js + Claude Code
- [ ] Install Node.js (v18+): `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt install -y nodejs`
- [ ] Install Claude Code: `npm install -g @anthropic-ai/claude-code`
- [ ] Authenticate: `claude` (follow the login flow once)
- [ ] Verify: `claude --version`

### 3. Syncthing
- [ ] Install Syncthing: `sudo apt install syncthing`
- [ ] Enable as service: `sudo systemctl enable syncthing@$(whoami)`
- [ ] Start: `sudo systemctl start syncthing@$(whoami)`
- [ ] Access web UI (http://device-ip:8384)
- [ ] Pair with laptop — share the `micklos-workspace` folder
- [ ] Wait for initial sync to complete
- [ ] Verify vault files are present

### 4. Claude Code Remote Control (always-on)
- [ ] Create a systemd service or tmux/screen session:
```bash
# Option A: tmux (simple)
tmux new-session -d -s claude "cd ~/repositories/micklos-workspace && claude remote-control"

# Option B: systemd service (robust)
# Create /etc/systemd/system/claude-remote.service
```
- [ ] Verify it stays running after SSH disconnect
- [ ] Connect from phone — scan QR or find session at claude.ai/code

### 5. Optional: Additional Services
- [ ] Jellyfin server (from Home Automation backlog)
- [ ] Any other always-on services

## Connecting from Phone
1. Open Claude iOS app (or claude.ai/code in Safari)
2. Session should appear in session list (green dot = online)
3. Tap to connect — full vault access, /morning, all tools

## Maintenance
- Syncthing keeps vault in sync automatically
- Claude Code updates: `npm update -g @anthropic-ai/claude-code`
- Monitor disk space if Syncthing is syncing large files (photos, etc.)
