"""
fetch-credits.py — builds CREDITS.md from Wikimedia Commons metadata.

Queries the Commons API for the author and licence of every image used
in the deck, and writes a proper attribution file. Run after fetch-images.

Usage:  py scripts/fetch-credits.py
"""

import json
import os
import re
import urllib.parse
import urllib.request

# local filename -> Commons File: title (decoded)
FILES = {
    "hero-poster.jpg": "Dubai Fountain @ At the Top SKY @ Burj Khalifa @ Dubai (15266500693).jpg",
    "why-aerial.jpg": "Downtown Dubai.Burj Khalifa.jpg",
    "retail-concourse.jpg": "13 Dubai Mall interior with palm trees - Dubai UAE.jpg",
    "retail-storefront.jpg": "Interior of Dubai Mall.jpg",
    "retail-crowd.jpg": "Dubai Mall inside7.jpg",
    "fashion-avenue.jpg": "Dubai mall fashion avenue.JPG",
    "fashion-avenue-2.jpg": "Fashion Avenue-Dubai Mall - panoramio.jpg",
    "dining-fountain.jpg": "Dubai fountain show.jpg",
    "dining-foodcourt.jpg": "A food court at a mall in Dubai (15230520550).jpg",
    "dining-table.jpg": "Dim sum at Dubai Mall (14688749704).jpg",
    "attraction-aquarium.jpg": "Dubai Aquarium and underwater Zoo (Ank Kumar, Infosys) 01.jpg",
    "attraction-aquarium-2.jpg": "Dubai Aquarium and underwater Zoo (Ank Kumar, Infosys) 07.jpg",
    "attraction-waterfall.jpg": "Dubai MALL Waterfalls.jpg",
    "events-fountain.jpg": "(UAE) The Dubai Fountain at Dusk 02.jpg",
    "invite-closing.jpg": "The Dubai Fountain (3).jpg",
}

UA = "DubaiMallDeck/1.0 (screening project; contact: hmgenx@gmail.com)"


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def query(title):
    params = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": f"File:{title}",
            "prop": "imageinfo",
            "iiprop": "extmetadata|url",
            "format": "json",
        }
    )
    url = f"https://commons.wikimedia.org/w/api.php?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = json.loads(urllib.request.urlopen(req, timeout=40).read())
    page = next(iter(data["query"]["pages"].values()))
    info = page["imageinfo"][0]
    meta = info.get("extmetadata", {})
    return {
        "artist": strip_html(meta.get("Artist", {}).get("value", "Unknown")),
        "license": strip_html(
            meta.get("LicenseShortName", {}).get("value", "see source")
        ),
        "page": info.get("descriptionurl", ""),
    }


rows = []
for local, title in FILES.items():
    try:
        info = query(title)
        rows.append((local, info))
        print(f"  OK  {local}")
    except Exception as e:
        print(f"  !!  {local}: {e}")
        rows.append((local, {"artist": "Unknown", "license": "see Wikimedia Commons", "page": ""}))

lines = [
    "# Image Credits",
    "",
    "All photographs in this project are sourced from **Wikimedia Commons**",
    "and used under their respective free licences. The deck is a non-commercial",
    "screening exercise; full attribution is given below.",
    "",
    "Background videos are embedded from YouTube and remain the property of",
    "their creators — see `src/data/content.js` for the source video IDs.",
    "",
    "| Image | Author | Licence | Source |",
    "|-------|--------|---------|--------|",
]
for local, info in rows:
    page = info["page"]
    src = f"[Commons]({page})" if page else "Wikimedia Commons"
    lines.append(
        f"| `{local}` | {info['artist'] or 'Unknown'} | {info['license']} | {src} |"
    )

out = os.path.join(os.path.dirname(__file__), "..", "CREDITS.md")
with open(out, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
print(f"\nWrote {out}")
