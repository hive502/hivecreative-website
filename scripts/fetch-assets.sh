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
# Only the two generated pieces still in use are fetched. The four photographs live
# directly in /public and are committed, so they are never downloaded.
ASSETS=(
  "geo-texture.png|$CDN/hf_20260809_004022_811ba3d7-4291-4e91-ab32-df6979e05ee9.png"
  "geo-social.png|$CDN/hf_20260809_004022_3527910b-1c76-4df9-9f86-7de47666b05d.png"
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
