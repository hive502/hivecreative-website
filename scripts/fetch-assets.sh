#!/usr/bin/env bash
#
# Ensures the generated imagery exists in public/images before a build.
#
# Runs automatically as the `prebuild` npm script, so Cloudflare Pages fetches the
# assets during CI and bakes them into the static export — the live site never
# hotlinks the generation CDN.
#
# It is idempotent: any file already present is left alone. Once you have run this
# locally and committed public/images, this becomes a no-op and the build no longer
# touches the network.
#
#   bash scripts/fetch-assets.sh

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh"

# filename : source URL
ASSETS=(
  "hero-business-owner.png|$CDN/hf_20260804_215550_b1a59439-efc7-48b8-8e41-39bbeb160aec.png"
  "case-study-mockup.png|$CDN/hf_20260804_215549_d5160b7d-744d-4dea-9c19-a4aad3a2fc86.png"
  "honeycomb-texture.svg|$CDN/hf_20260804_215549_c4e2149d-6cb9-4e2b-ac25-fde8be448d72.svg"
)

missing=0
for entry in "${ASSETS[@]}"; do
  name="${entry%%|*}"
  url="${entry#*|}"
  dest="public/images/$name"

  if [ -s "$dest" ]; then
    echo "  ✓ $name (already present)"
    continue
  fi

  echo "  ↓ $name"
  if ! curl -fsSL --retry 3 --retry-delay 2 "$url" -o "$dest"; then
    rm -f "$dest"
    echo "  ✗ could not fetch $name from the generation CDN" >&2
    missing=$((missing + 1))
  fi
done

if [ "$missing" -gt 0 ]; then
  cat >&2 <<'EOF'

Some images could not be downloaded and are not present locally.

The generation CDN link has probably expired. Regenerate the assets, drop the
files into public/images/ with the names listed in this script, and commit them —
after that this script is a no-op and builds no longer depend on the network.
EOF
  exit 1
fi

echo "All images present in public/images."
