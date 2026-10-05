#!/usr/bin/env bash
set -e

BRANCH=$(git branch --show-current)
echo "🚀 Pushing branch '${BRANCH}' to staging (https://github.com/kaustubh-uelement/uelement-v2.git)..."

git push staging HEAD:main HEAD:uelement-revamp "$@"

echo "✅ Successfully pushed to staging repository!"
