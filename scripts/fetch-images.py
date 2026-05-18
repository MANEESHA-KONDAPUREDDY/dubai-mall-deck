"""
fetch-images.py — downloads the deck's imagery from Wikimedia Commons.

Every image is a freely-licensed photograph of The Dubai Mall, the Dubai
Fountain, the Dubai Aquarium, or Downtown Dubai. Running this script
reproduces the full image set in public/assets/images/.

Attributions for each file are listed in CREDITS.md.

Usage:  py scripts/fetch-images.py
"""

import os
import time
import urllib.request

BASE = "https://upload.wikimedia.org/wikipedia/commons/thumb"
WIDTH = 1280
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "images")

# local filename -> (Commons hash dir, URL-encoded Commons filename)
IMAGES = {
    "hero-poster.jpg": (
        "7/73",
        "Dubai_Fountain_%40_At_the_Top_SKY_%40_Burj_Khalifa_%40_Dubai_%2815266500693%29.jpg",
    ),
    "why-aerial.jpg": ("a/a8", "Downtown_Dubai.Burj_Khalifa.jpg"),
    "retail-concourse.jpg": (
        "6/66",
        "13_Dubai_Mall_interior_with_palm_trees_-_Dubai_UAE.jpg",
    ),
    "retail-storefront.jpg": ("b/bf", "Interior_of_Dubai_Mall.jpg"),
    "retail-crowd.jpg": ("8/84", "Dubai_Mall_inside7.jpg"),
    "fashion-avenue.jpg": ("e/e9", "Dubai_mall_fashion_avenue.JPG"),
    "fashion-avenue-2.jpg": ("b/b7", "Fashion_Avenue-Dubai_Mall_-_panoramio.jpg"),
    "dining-fountain.jpg": ("0/08", "Dubai_fountain_show.jpg"),
    "dining-foodcourt.jpg": (
        "9/9f",
        "A_food_court_at_a_mall_in_Dubai_%2815230520550%29.jpg",
    ),
    "dining-table.jpg": ("6/67", "Dim_sum_at_Dubai_Mall_%2814688749704%29.jpg"),
    "attraction-aquarium.jpg": (
        "2/2a",
        "Dubai_Aquarium_and_underwater_Zoo_%28Ank_Kumar%2C_Infosys%29_01.jpg",
    ),
    "attraction-aquarium-2.jpg": (
        "3/3c",
        "Dubai_Aquarium_and_underwater_Zoo_%28Ank_Kumar%2C_Infosys%29_07.jpg",
    ),
    "attraction-waterfall.jpg": ("1/15", "Dubai_MALL_Waterfalls.jpg"),
    "events-fountain.jpg": (
        "8/8a",
        "%28UAE%29_The_Dubai_Fountain_at_Dusk_02.jpg",
    ),
    "invite-closing.jpg": ("9/9f", "The_Dubai_Fountain_%283%29.jpg"),
}

# Wikimedia asks bots for a descriptive User-Agent and a polite request rate.
UA = "DubaiMallDeck/1.0 (screening project; contact: hmgenx@gmail.com)"

os.makedirs(OUT, exist_ok=True)
ok, skipped, failed = 0, 0, 0
for fn, (hashdir, wiki) in IMAGES.items():
    dest = os.path.join(OUT, fn)
    # Skip files already downloaded so the script is safe to re-run.
    if os.path.exists(dest) and os.path.getsize(dest) > 1024:
        print(f"  --  {fn:28s} already present, skipped")
        skipped += 1
        continue
    url = f"{BASE}/{hashdir}/{wiki}/{WIDTH}px-{wiki}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        data = urllib.request.urlopen(req, timeout=40).read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  OK  {fn:28s} {len(data) // 1024:5d} KB")
        ok += 1
    except Exception as e:
        print(f"  !!  {fn:28s} FAILED: {e}")
        failed += 1
    time.sleep(4)  # be polite to the Wikimedia servers

print(f"\nDone — {ok} downloaded, {skipped} skipped, {failed} failed.")
