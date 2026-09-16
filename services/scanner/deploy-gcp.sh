#!/usr/bin/env bash
# deploy-gcp.sh - Deploy VyUH PQC Scanner backend to GCP Cloud Run

set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-vyuh-pqc-scanner}"
REGION="${REGION:-asia-south1}"
PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null || echo '')}"

echo "==> Deploying ${SERVICE_NAME} to GCP Cloud Run..."
if [ -n "${PROJECT_ID}" ]; then
  echo "    Project: ${PROJECT_ID}"
fi
echo "    Region:  ${REGION}"

# Deploy directly from source to Cloud Run (Cloud Build will use the Dockerfile)
gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --region "${REGION}" \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60s

echo "==> Deployment initiated successfully!"
echo "    Check service status: gcloud run services describe ${SERVICE_NAME} --region ${REGION}"
