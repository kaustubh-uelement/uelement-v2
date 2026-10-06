#!/usr/bin/env bash
set -euo pipefail

log(){ echo "[$(date +%Y-%m-%dT%H:%M:%S)] [ObtainCert] $*"; }

DOMAINS=("uelement.co" "www.uelement.co")
EMAIL="satrajit@uelement.co"  # replace with your admin email or make it a variable

# If cert exists, exit
if sudo test -d "/etc/letsencrypt/live/${DOMAINS[0]}"; then
  log "Cert for ${DOMAINS[0]} exists; skipping obtain"
  exit 0
fi

log "Obtaining certs for: ${DOMAINS[*]}"
# Use certbot in non-interactive mode with webroot
WEBROOT="/var/www/uelement"

# Ensure webroot exists and is owned by root/nginx
sudo mkdir -p "$WEBROOT"
sudo chown -R nginx:nginx "$WEBROOT" || true

# Install certbot if missing
if ! command -v certbot &> /dev/null; then
  if command -v dnf &> /dev/null; then
    sudo dnf install -y certbot python3-certbot-nginx || true
  elif command -v yum &> /dev/null; then
    sudo yum install -y certbot python3-certbot-nginx || true
  else
    log "Package manager not found; cannot install certbot"
  fi
fi

# Run certbot (non-interactive, agree to TOS)
sudo certbot certonly --nginx --non-interactive --agree-tos --email "$EMAIL" -d "${DOMAINS[0]}" -d "${DOMAINS[1]}" || {
  log "Certbot failed"
  exit 1
}

log "Certs obtained"
exit 0
