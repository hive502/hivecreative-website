#!/usr/bin/env bash
#
# Finds em-dashes in anything a visitor can read.
#
#   bash scripts/find-emdashes.sh
#
# Checks the four ways an em-dash sneaks in:
#   —        the literal character
#   &mdash;  the HTML entity
#   &#8212;  the decimal entity
#   --       a double hyphen, which most editors auto-convert
#
# Deliberately does NOT rewrite anything. An em-dash almost always needs a human
# decision about what replaces it, and a blind substitution produces sentences that
# scan badly. See the guidance at the bottom of this file.
#
# Exit code 1 when hits are found, so it can be wired into CI later if you want.

set -uo pipefail
cd "$(dirname "$0")/.."

PATTERN='—|&mdash;|&#8212;|--'
PATHS=(app components lib messages)

echo "Scanning for em-dashes in: ${PATHS[*]}"
echo

# Noise filters, in order:
#   1. code comments (// ... , * ... , /* ...) - not visitor-facing
#   2. CSS custom properties and flags (--font-nunito, --no-audit)
#   3. horizontal rules made of dashes inside comment banners
hits=$(grep -rnE --include='*.tsx' --include='*.ts' --include='*.json' --include='*.css' \
        "$PATTERN" "${PATHS[@]}" 2>/dev/null \
        | grep -vE ':[0-9]+:\s*(//|\*|/\*)' \
        | grep -vE '\-\-[a-zA-Z]' \
        | grep -vE ':[0-9]+:[^a-zA-Z0-9]*[-—]{3,}' || true)

if [ -z "$hits" ]; then
  echo "Clean. No em-dashes in visitor-facing copy."
  exit 0
fi

echo "$hits"
echo
echo "Found $(echo "$hits" | wc -l | tr -d ' ') line(s). Replace them by hand:"
cat <<'GUIDE'

  1. Introducing an explanation  ->  use a COLON
     "A website is like a car — it needs maintenance"
     "A website is like a car: it needs maintenance"

  2. A parenthetical aside       ->  use COMMAS
     "Every build — from $69/mo — includes hosting"
     "Every build, from $69/mo, includes hosting"

  3. Joining two full thoughts   ->  SPLIT INTO TWO SENTENCES
     "We build it — then we maintain it every month"
     "We build it. Then we maintain it every month."

  4. A trailing afterthought     ->  usually just CUT IT
     "A professional site that brings you customers — guaranteed"
     "A professional site that brings you customers"

  5. A numeric range             ->  use "to"
     "Launch in 2—3 weeks"  ->  "Launch in 2 to 3 weeks"

  Rule of thumb: an em-dash is a pause the reader has to interpret. Sales copy is
  read fast and often on a phone, so prefer the punctuation that needs no
  interpretation. If a sentence needs two em-dashes to hold together, it is
  usually two sentences.

  Watch for: JSX escapes like &mdash; render as an em-dash but will not match a
  plain-character search, which is why this script checks the entities too.
GUIDE

exit 1
