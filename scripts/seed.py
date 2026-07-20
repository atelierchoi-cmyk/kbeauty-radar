"""
One-off seed generator for K-Beauty Radar sample/demo data.
Not part of the running app — run with `python3 scripts/seed.py` from the
project root to (re)generate the JSON files under src/data/.
All numbers here are illustrative demo data, not real market data.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "src", "data")

COUNTRIES_LIST = ["Korea", "United States", "United Kingdom", "Canada", "Japan", "Thailand", "Indonesia", "UAE"]

def retail_links(brand_slug, official=True):
    links = [{"name": "Official Brand Store", "type": "Official Store", "url": f"https://example.com/{brand_slug}"}]
    links.append({"name": "Amazon", "type": "Affiliate Link", "url": f"https://amazon.com/s?k={brand_slug}"})
    links.append({"name": "YesStyle", "type": "Affiliate Link", "url": f"https://yesstyle.com/search?q={brand_slug}"})
    links.append({"name": "Olive Young Global", "type": "Affiliate Link", "url": f"https://global.oliveyoung.com/search?q={brand_slug}"})
    return links

PRODUCTS = [
    {
        "id": "prod_bean_essence", "brandSlug": "mixsoon", "name": "빈 에센스", "englishName": "Bean Essence",
        "slug": "bean-essence", "category": "Essence",
        "description": "A single-ingredient essence built on fermented soybean extract, formulated to support hydration and a smoother-looking skin surface with minimal added ingredients.",
        "size": "150ml", "priceMin": 19, "priceMax": 24, "currency": "USD",
        "keyIngredientSlugs": ["fermented-bean"], "skinTypes": ["Normal", "Dry", "Combination"],
        "skinConcerns": ["Dullness", "Dehydration", "Uneven texture"], "reformulated": False,
        "usageStep": "Essence", "imageTone": "beige",
        "globalReviewScore": 82, "koreaScore": 74, "globalScore": 85, "reviewVolume": 18400,
        "dataConfidence": 66, "lastUpdated": "2026-07-01",
        "bestFor": ["Normal to dry skin", "Dull skin", "Glass-skin routines", "Makeup preparation"],
        "considerBefore": ["Oily skin", "Users sensitive to fermented ingredients", "People who dislike sticky textures", "Heavy multi-layer routines"],
        "likes": ["Immediate hydration", "Natural-looking glow", "Improves skin texture over time", "Works well before makeup", "Little to no fragrance"],
        "dislikes": ["Tacky, sticky finish", "Pills when layered under sunscreen", "Feels heavy on oily skin", "Small bottle for the price", "Effects vary by user"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 88, "positiveKeywords": ["hydrating", "glow"], "negativeKeywords": ["still needs cream"], "sampleSize": 3100},
            {"type": "Oily", "satisfaction": 58, "positiveKeywords": ["glow"], "negativeKeywords": ["heavy", "sticky"], "sampleSize": 2400},
            {"type": "Combination", "satisfaction": 79, "positiveKeywords": ["balanced", "glow"], "negativeKeywords": ["sticky in T-zone"], "sampleSize": 2900},
            {"type": "Sensitive", "satisfaction": 74, "positiveKeywords": ["gentle"], "negativeKeywords": ["fermentation scent"], "sampleSize": 1500},
            {"type": "Acne-prone", "satisfaction": 61, "positiveKeywords": ["soothing"], "negativeKeywords": ["heavy", "breakouts for some"], "sampleSize": 1200}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 74, "reviewVolume": 2200, "growthPct": 5.4},
            {"country": "United States", "score": 86, "reviewVolume": 7600, "growthPct": 24.1},
            {"country": "United Kingdom", "score": 80, "reviewVolume": 1900, "growthPct": 16.2},
            {"country": "Canada", "score": 79, "reviewVolume": 1300, "growthPct": 13.8},
            {"country": "Japan", "score": 71, "reviewVolume": 600, "growthPct": 3.9},
            {"country": "Thailand", "score": 81, "reviewVolume": 1200, "growthPct": 19.4},
            {"country": "Indonesia", "score": 78, "reviewVolume": 1000, "growthPct": 17.6},
            {"country": "UAE", "score": 75, "reviewVolume": 300, "growthPct": 9.9}
        ],
        "retailLinks": retail_links("mixsoon")
    },
    {
        "id": "prod_bean_cream", "brandSlug": "mixsoon", "name": "빈 크림", "englishName": "Bean Cream",
        "slug": "bean-cream", "category": "Cream",
        "description": "A richer fermented-soybean moisturizer positioned as the layering partner to Bean Essence for drier skin or colder climates.",
        "size": "50ml", "priceMin": 22, "priceMax": 27, "currency": "USD",
        "keyIngredientSlugs": ["fermented-bean", "ceramide"], "skinTypes": ["Dry", "Normal"],
        "skinConcerns": ["Dehydration", "Barrier support"], "reformulated": False,
        "usageStep": "Moisturizer", "imageTone": "beige",
        "globalReviewScore": 77, "koreaScore": 70, "globalScore": 79, "reviewVolume": 4200,
        "dataConfidence": 48, "lastUpdated": "2026-06-20",
        "bestFor": ["Dry skin", "Cold-climate routines", "Barrier support"],
        "considerBefore": ["Oily or acne-prone skin", "Warm, humid climates"],
        "likes": ["Rich but not greasy", "Pairs well with Bean Essence", "Softens skin overnight"],
        "dislikes": ["Too heavy for summer", "Limited size options", "Slow to fully absorb"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 85, "positiveKeywords": ["rich", "nourishing"], "negativeKeywords": ["price"], "sampleSize": 900},
            {"type": "Oily", "satisfaction": 42, "positiveKeywords": [], "negativeKeywords": ["too heavy"], "sampleSize": 500},
            {"type": "Combination", "satisfaction": 66, "positiveKeywords": ["good in winter"], "negativeKeywords": ["heavy in T-zone"], "sampleSize": 700},
            {"type": "Sensitive", "satisfaction": 73, "positiveKeywords": ["calming"], "negativeKeywords": [], "sampleSize": 400},
            {"type": "Acne-prone", "satisfaction": 40, "positiveKeywords": [], "negativeKeywords": ["breakouts"], "sampleSize": 300}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 70, "reviewVolume": 500, "growthPct": 3.1},
            {"country": "United States", "score": 80, "reviewVolume": 1900, "growthPct": 20.4},
            {"country": "United Kingdom", "score": 77, "reviewVolume": 500, "growthPct": 15.1},
            {"country": "Canada", "score": 76, "reviewVolume": 350, "growthPct": 14.6},
            {"country": "Japan", "score": 68, "reviewVolume": 150, "growthPct": 3.2},
            {"country": "Thailand", "score": 72, "reviewVolume": 250, "growthPct": 11.9},
            {"country": "Indonesia", "score": 71, "reviewVolume": 220, "growthPct": 11.1},
            {"country": "UAE", "score": 74, "reviewVolume": 100, "growthPct": 8.4}
        ],
        "retailLinks": retail_links("mixsoon")
    },
    {
        "id": "prod_centella_essence", "brandSlug": "mixsoon", "name": "센텔라 아시아티카 에센스", "englishName": "Centella Asiatica Essence",
        "slug": "centella-asiatica-essence", "category": "Essence",
        "description": "A single-ingredient centella essence aimed at soothing and calming reactive or stressed skin.",
        "size": "150ml", "priceMin": 18, "priceMax": 23, "currency": "USD",
        "keyIngredientSlugs": ["centella-asiatica"], "skinTypes": ["Sensitive", "Combination", "Oily"],
        "skinConcerns": ["Redness", "Sensitivity", "Post-breakout care"], "reformulated": False,
        "usageStep": "Essence", "imageTone": "green",
        "globalReviewScore": 79, "koreaScore": 71, "globalScore": 81, "reviewVolume": 3600,
        "dataConfidence": 45, "lastUpdated": "2026-05-28",
        "bestFor": ["Sensitive skin", "Redness-prone skin", "Post-breakout recovery"],
        "considerBefore": ["Very dry skin needing richer hydration alone"],
        "likes": ["Calms visible redness", "Lightweight, non-sticky compared to Bean Essence", "Fragrance-free feel"],
        "dislikes": ["Less dramatic glow effect than Bean Essence", "Some find it too watery", "Limited availability outside bundles"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 63, "positiveKeywords": ["calming"], "negativeKeywords": ["not enough hydration alone"], "sampleSize": 500},
            {"type": "Oily", "satisfaction": 78, "positiveKeywords": ["lightweight", "calming"], "negativeKeywords": [], "sampleSize": 900},
            {"type": "Combination", "satisfaction": 80, "positiveKeywords": ["balanced"], "negativeKeywords": [], "sampleSize": 800},
            {"type": "Sensitive", "satisfaction": 86, "positiveKeywords": ["soothing", "gentle"], "negativeKeywords": [], "sampleSize": 1000},
            {"type": "Acne-prone", "satisfaction": 75, "positiveKeywords": ["calming"], "negativeKeywords": ["mild"], "sampleSize": 400}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 71, "reviewVolume": 600, "growthPct": 4.0},
            {"country": "United States", "score": 82, "reviewVolume": 1500, "growthPct": 14.2},
            {"country": "United Kingdom", "score": 78, "reviewVolume": 400, "growthPct": 11.0},
            {"country": "Canada", "score": 77, "reviewVolume": 300, "growthPct": 10.4},
            {"country": "Japan", "score": 74, "reviewVolume": 180, "growthPct": 3.5},
            {"country": "Thailand", "score": 79, "reviewVolume": 280, "growthPct": 13.1},
            {"country": "Indonesia", "score": 78, "reviewVolume": 240, "growthPct": 12.6},
            {"country": "UAE", "score": 76, "reviewVolume": 100, "growthPct": 7.0}
        ],
        "retailLinks": retail_links("mixsoon")
    },
    {
        "id": "prod_bifida_essence", "brandSlug": "mixsoon", "name": "비피다 발효 에센스", "englishName": "Bifida Ferment Essence",
        "slug": "bifida-ferment-essence", "category": "Essence",
        "description": "A fermented single-ingredient essence focused on skin resilience and radiance, aimed at buyers who want the mixsoon format with a different ferment source than soybean.",
        "size": "150ml", "priceMin": 19, "priceMax": 24, "currency": "USD",
        "keyIngredientSlugs": ["fermented-bean"], "skinTypes": ["Normal", "Combination", "Dry"],
        "skinConcerns": ["Dullness", "Resilience", "Radiance"], "reformulated": False,
        "usageStep": "Essence", "imageTone": "beige",
        "globalReviewScore": 75, "koreaScore": 68, "globalScore": 77, "reviewVolume": 1800,
        "dataConfidence": 38, "lastUpdated": "2026-04-15",
        "bestFor": ["Normal to combination skin", "Buyers wanting a lighter alternative to Bean Essence"],
        "considerBefore": ["Very dry skin in winter climates", "Buyers wanting a stronger glow effect"],
        "likes": ["Lighter than Bean Essence", "Absorbs faster", "Good layering base"],
        "dislikes": ["Less distinctive glow than Bean Essence", "Smaller review base makes trends harder to confirm"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 71, "positiveKeywords": ["lightweight"], "negativeKeywords": ["not rich enough"], "sampleSize": 300},
            {"type": "Oily", "satisfaction": 70, "positiveKeywords": ["absorbs fast"], "negativeKeywords": [], "sampleSize": 350},
            {"type": "Combination", "satisfaction": 76, "positiveKeywords": ["balanced"], "negativeKeywords": [], "sampleSize": 400},
            {"type": "Sensitive", "satisfaction": 72, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 250},
            {"type": "Acne-prone", "satisfaction": 66, "positiveKeywords": [], "negativeKeywords": ["mild breakouts reported"], "sampleSize": 180}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 68, "reviewVolume": 300, "growthPct": 2.6},
            {"country": "United States", "score": 78, "reviewVolume": 750, "growthPct": 10.4},
            {"country": "United Kingdom", "score": 75, "reviewVolume": 200, "growthPct": 8.1},
            {"country": "Canada", "score": 74, "reviewVolume": 150, "growthPct": 7.6},
            {"country": "Japan", "score": 70, "reviewVolume": 90, "growthPct": 2.1},
            {"country": "Thailand", "score": 76, "reviewVolume": 140, "growthPct": 9.4},
            {"country": "Indonesia", "score": 75, "reviewVolume": 120, "growthPct": 8.9},
            {"country": "UAE", "score": 73, "reviewVolume": 50, "growthPct": 5.0}
        ],
        "retailLinks": retail_links("mixsoon")
    },
    {
        "id": "prod_heartleaf_toner", "brandSlug": "anua", "name": "어성초 77% 토너", "englishName": "Heartleaf 77% Soothing Toner",
        "slug": "heartleaf-77-soothing-toner", "category": "Toner",
        "description": "A high-percentage heartleaf toner formulated to calm redness and support a compromised skin barrier, usable as a splash mask or standard toner step.",
        "size": "270ml", "priceMin": 17, "priceMax": 22, "currency": "USD",
        "keyIngredientSlugs": ["heartleaf"], "skinTypes": ["Sensitive", "Acne-prone", "Combination", "Oily"],
        "skinConcerns": ["Redness", "Irritation", "Breakouts"], "reformulated": False,
        "usageStep": "Toner", "imageTone": "green",
        "globalReviewScore": 87, "koreaScore": 82, "globalScore": 88, "reviewVolume": 41200,
        "dataConfidence": 90, "lastUpdated": "2026-07-05",
        "bestFor": ["Sensitive skin", "Acne-prone skin", "Redness-prone skin", "Combination and oily skin"],
        "considerBefore": ["Users wanting a richer, more emollient toner", "Very dry skin needing more than a toner step"],
        "likes": ["Noticeably calms redness", "Large bottle, good value", "Works as a splash mask", "Low irritation risk"],
        "dislikes": ["Mild herbal scent bothers some users", "Watery texture evaporates fast", "Can feel drying if used alone"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 72, "positiveKeywords": ["calming"], "negativeKeywords": ["not enough hydration alone"], "sampleSize": 4200},
            {"type": "Oily", "satisfaction": 88, "positiveKeywords": ["calming", "lightweight"], "negativeKeywords": [], "sampleSize": 6100},
            {"type": "Combination", "satisfaction": 86, "positiveKeywords": ["balanced", "calming"], "negativeKeywords": [], "sampleSize": 7400},
            {"type": "Sensitive", "satisfaction": 91, "positiveKeywords": ["soothing", "gentle"], "negativeKeywords": ["scent"], "sampleSize": 8900},
            {"type": "Acne-prone", "satisfaction": 89, "positiveKeywords": ["calming", "reduces redness"], "negativeKeywords": [], "sampleSize": 6700}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 82, "reviewVolume": 5100, "growthPct": 2.2},
            {"country": "United States", "score": 89, "reviewVolume": 15900, "growthPct": 4.8},
            {"country": "United Kingdom", "score": 87, "reviewVolume": 4300, "growthPct": 4.0},
            {"country": "Canada", "score": 86, "reviewVolume": 2700, "growthPct": 3.4},
            {"country": "Japan", "score": 80, "reviewVolume": 1400, "growthPct": 1.9},
            {"country": "Thailand", "score": 85, "reviewVolume": 2400, "growthPct": 5.6},
            {"country": "Indonesia", "score": 84, "reviewVolume": 2000, "growthPct": 5.1},
            {"country": "UAE", "score": 83, "reviewVolume": 700, "growthPct": 3.2}
        ],
        "retailLinks": retail_links("anua")
    },
    {
        "id": "prod_snail_essence", "brandSlug": "cosrx", "name": "어드밴스드 스네일 96 뮤신 파워 에센스", "englishName": "Advanced Snail 96 Mucin Power Essence",
        "slug": "advanced-snail-96-mucin-power-essence", "category": "Essence",
        "description": "A 96% snail secretion filtrate essence aimed at repair and hydration, one of the most reviewed Korean essences on Western e-commerce.",
        "size": "100ml", "priceMin": 16, "priceMax": 21, "currency": "USD",
        "keyIngredientSlugs": ["snail-mucin"], "skinTypes": ["Normal", "Dry", "Combination", "Sensitive"],
        "skinConcerns": ["Dehydration", "Repair", "Texture"], "reformulated": False,
        "usageStep": "Essence", "imageTone": "beige",
        "globalReviewScore": 84, "koreaScore": 78, "globalScore": 85, "reviewVolume": 52000,
        "dataConfidence": 92, "lastUpdated": "2026-06-30",
        "bestFor": ["Normal to dry skin", "Dull or textured skin", "Post-procedure recovery routines"],
        "considerBefore": ["Buyers uncomfortable with the snail-derived ingredient concept", "Very oily, acne-prone skin in humid climates"],
        "likes": ["Noticeable next-day glow", "Repairs and softens rough texture", "Long-standing, trusted formula"],
        "dislikes": ["Sticky, tacky drydown", "Snail-derived origin off-putting to some", "Slightly dated packaging"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 87, "positiveKeywords": ["repair", "glow"], "negativeKeywords": [], "sampleSize": 12000},
            {"type": "Oily", "satisfaction": 68, "positiveKeywords": ["glow"], "negativeKeywords": ["sticky"], "sampleSize": 9800},
            {"type": "Combination", "satisfaction": 80, "positiveKeywords": ["repair"], "negativeKeywords": ["sticky in T-zone"], "sampleSize": 11500},
            {"type": "Sensitive", "satisfaction": 82, "positiveKeywords": ["gentle", "repair"], "negativeKeywords": [], "sampleSize": 9200},
            {"type": "Acne-prone", "satisfaction": 71, "positiveKeywords": ["repair"], "negativeKeywords": ["heavy"], "sampleSize": 7500}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 78, "reviewVolume": 6800, "growthPct": 0.6},
            {"country": "United States", "score": 86, "reviewVolume": 22000, "growthPct": 1.4},
            {"country": "United Kingdom", "score": 84, "reviewVolume": 6200, "growthPct": 1.0},
            {"country": "Canada", "score": 83, "reviewVolume": 4100, "growthPct": 0.9},
            {"country": "Japan", "score": 79, "reviewVolume": 2600, "growthPct": 0.4},
            {"country": "Thailand", "score": 82, "reviewVolume": 3800, "growthPct": 1.6},
            {"country": "Indonesia", "score": 81, "reviewVolume": 3200, "growthPct": 1.5},
            {"country": "UAE", "score": 80, "reviewVolume": 1100, "growthPct": 0.7}
        ],
        "retailLinks": retail_links("cosrx")
    },
    {
        "id": "prod_relief_sun", "brandSlug": "beauty-of-joseon", "name": "릴리프 선", "englishName": "Relief Sun: Rice + Probiotics",
        "slug": "relief-sun", "category": "Sunscreen",
        "description": "A hybrid chemical sunscreen built around rice extract and probiotic-derived ingredients, widely cited for a lightweight, low-white-cast finish.",
        "size": "50ml", "priceMin": 17, "priceMax": 20, "currency": "USD",
        "keyIngredientSlugs": ["rice"], "skinTypes": ["All"],
        "skinConcerns": ["Sun protection", "Texture", "Dullness"], "reformulated": True,
        "usageStep": "Sunscreen", "imageTone": "beige",
        "globalReviewScore": 85, "koreaScore": 76, "globalScore": 87, "reviewVolume": 34500,
        "dataConfidence": 84, "lastUpdated": "2026-07-10",
        "bestFor": ["Daily wear under makeup", "Humid climates", "Buyers who dislike white cast"],
        "considerBefore": ["Fragrance-sensitive users", "Users needing water-resistant, high-sweat formulas"],
        "likes": ["No white cast on most skin tones", "Lightweight, non-greasy finish", "Doubles well as a makeup primer"],
        "dislikes": ["Contains fragrance", "Runny, easy to overpour", "Price rose after it went viral"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 80, "positiveKeywords": ["lightweight"], "negativeKeywords": ["not enough glow alone"], "sampleSize": 6900},
            {"type": "Oily", "satisfaction": 88, "positiveKeywords": ["no white cast", "lightweight"], "negativeKeywords": [], "sampleSize": 9200},
            {"type": "Combination", "satisfaction": 87, "positiveKeywords": ["no white cast"], "negativeKeywords": [], "sampleSize": 8600},
            {"type": "Sensitive", "satisfaction": 66, "positiveKeywords": ["lightweight"], "negativeKeywords": ["fragrance"], "sampleSize": 5400},
            {"type": "Acne-prone", "satisfaction": 79, "positiveKeywords": ["non-greasy"], "negativeKeywords": [], "sampleSize": 4400}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 76, "reviewVolume": 4400, "growthPct": 3.0},
            {"country": "United States", "score": 88, "reviewVolume": 14200, "growthPct": 8.4},
            {"country": "United Kingdom", "score": 84, "reviewVolume": 3600, "growthPct": 6.6},
            {"country": "Canada", "score": 83, "reviewVolume": 2500, "growthPct": 6.1},
            {"country": "Japan", "score": 77, "reviewVolume": 1500, "growthPct": 2.6},
            {"country": "Thailand", "score": 90, "reviewVolume": 5100, "growthPct": 10.6},
            {"country": "Indonesia", "score": 89, "reviewVolume": 4500, "growthPct": 10.1},
            {"country": "UAE", "score": 82, "reviewVolume": 1200, "growthPct": 5.6}
        ],
        "retailLinks": retail_links("beauty-of-joseon")
    },
    {
        "id": "prod_centella_ampoule", "brandSlug": "skin1004", "name": "마다가스카르 센텔라 앰플", "englishName": "Madagascar Centella Ampoule",
        "slug": "madagascar-centella-ampoule", "category": "Ampoule",
        "description": "A single-origin Madagascar Centella Asiatica ampoule aimed at soothing and calming sensitive or reactive skin at an accessible price point.",
        "size": "100ml", "priceMin": 14, "priceMax": 18, "currency": "USD",
        "keyIngredientSlugs": ["centella-asiatica"], "skinTypes": ["Sensitive", "Acne-prone", "Combination"],
        "skinConcerns": ["Redness", "Sensitivity", "Breakouts"], "reformulated": False,
        "usageStep": "Serum", "imageTone": "green",
        "globalReviewScore": 81, "koreaScore": 72, "globalScore": 83, "reviewVolume": 21600,
        "dataConfidence": 75, "lastUpdated": "2026-06-25",
        "bestFor": ["Sensitive and reactive skin", "First-time serum buyers", "Acne-prone skin"],
        "considerBefore": ["Very dry skin wanting a richer texture"],
        "likes": ["Very affordable for the size", "Calms redness reliably", "Lightweight, fast-absorbing"],
        "dislikes": ["Mild herbal scent", "Thin texture feels underwhelming to some", "Shipping delays reported in some regions"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 68, "positiveKeywords": ["calming"], "negativeKeywords": ["too light alone"], "sampleSize": 3400},
            {"type": "Oily", "satisfaction": 84, "positiveKeywords": ["lightweight", "calming"], "negativeKeywords": [], "sampleSize": 5200},
            {"type": "Combination", "satisfaction": 82, "positiveKeywords": ["balanced"], "negativeKeywords": [], "sampleSize": 5000},
            {"type": "Sensitive", "satisfaction": 87, "positiveKeywords": ["soothing", "gentle"], "negativeKeywords": [], "sampleSize": 6100},
            {"type": "Acne-prone", "satisfaction": 83, "positiveKeywords": ["calming"], "negativeKeywords": [], "sampleSize": 4300}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 72, "reviewVolume": 1900, "growthPct": 1.8},
            {"country": "United States", "score": 83, "reviewVolume": 8800, "growthPct": 5.9},
            {"country": "United Kingdom", "score": 80, "reviewVolume": 2200, "growthPct": 5.2},
            {"country": "Canada", "score": 79, "reviewVolume": 1500, "growthPct": 4.8},
            {"country": "Japan", "score": 74, "reviewVolume": 800, "growthPct": 1.5},
            {"country": "Thailand", "score": 85, "reviewVolume": 2900, "growthPct": 7.4},
            {"country": "Indonesia", "score": 84, "reviewVolume": 2500, "growthPct": 6.9},
            {"country": "UAE", "score": 78, "reviewVolume": 600, "growthPct": 3.6}
        ],
        "retailLinks": retail_links("skin1004")
    },
    {
        "id": "prod_dive_in_serum", "brandSlug": "torriden", "name": "다이브인 세럼", "englishName": "Dive-In Serum",
        "slug": "dive-in-serum", "category": "Serum",
        "description": "A low-molecular hyaluronic acid serum designed for lightweight, layerable hydration without a heavy or sticky finish.",
        "size": "50ml", "priceMin": 15, "priceMax": 19, "currency": "USD",
        "keyIngredientSlugs": ["hyaluronic-acid"], "skinTypes": ["Combination", "Oily", "Normal"],
        "skinConcerns": ["Dehydration", "Layering base"], "reformulated": False,
        "usageStep": "Serum", "imageTone": "blue",
        "globalReviewScore": 80, "koreaScore": 73, "globalScore": 82, "reviewVolume": 12800,
        "dataConfidence": 68, "lastUpdated": "2026-06-12",
        "bestFor": ["Combination and oily skin", "Buyers who dislike heavy serums", "Layering under other actives"],
        "considerBefore": ["Very dry skin needing richer hydration alone"],
        "likes": ["Extremely lightweight", "Layers well under other products", "Simple, effective hydration"],
        "dislikes": ["Not enough for dry skin alone", "Bottle design makes dosing awkward", "Mild scent for a 'simple' product"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 62, "positiveKeywords": ["lightweight"], "negativeKeywords": ["not enough alone"], "sampleSize": 1800},
            {"type": "Oily", "satisfaction": 85, "positiveKeywords": ["lightweight", "layerable"], "negativeKeywords": [], "sampleSize": 3200},
            {"type": "Combination", "satisfaction": 83, "positiveKeywords": ["balanced", "layerable"], "negativeKeywords": [], "sampleSize": 3000},
            {"type": "Sensitive", "satisfaction": 76, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 1400},
            {"type": "Acne-prone", "satisfaction": 78, "positiveKeywords": ["lightweight"], "negativeKeywords": [], "sampleSize": 1200}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 73, "reviewVolume": 1200, "growthPct": 1.6},
            {"country": "United States", "score": 82, "reviewVolume": 5300, "growthPct": 4.4},
            {"country": "United Kingdom", "score": 79, "reviewVolume": 1200, "growthPct": 3.8},
            {"country": "Canada", "score": 78, "reviewVolume": 900, "growthPct": 3.4},
            {"country": "Japan", "score": 75, "reviewVolume": 500, "growthPct": 1.2},
            {"country": "Thailand", "score": 80, "reviewVolume": 1000, "growthPct": 4.2},
            {"country": "Indonesia", "score": 79, "reviewVolume": 850, "growthPct": 3.9},
            {"country": "UAE", "score": 77, "reviewVolume": 300, "growthPct": 2.1}
        ],
        "retailLinks": retail_links("torriden")
    },
    {
        "id": "prod_dokdo_toner", "brandSlug": "round-lab", "name": "1025 독도 토너", "englishName": "1025 Dokdo Toner",
        "slug": "1025-dokdo-toner", "category": "Toner",
        "description": "A mineral-water toner formulated for gentle, everyday hydration with a minimal ingredient list.",
        "size": "200ml", "priceMin": 15, "priceMax": 19, "currency": "USD",
        "keyIngredientSlugs": ["centella-asiatica"], "skinTypes": ["All"],
        "skinConcerns": ["Hydration", "Sensitivity"], "reformulated": False,
        "usageStep": "Toner", "imageTone": "blue",
        "globalReviewScore": 79, "koreaScore": 80, "globalScore": 78, "reviewVolume": 9200,
        "dataConfidence": 62, "lastUpdated": "2026-05-30",
        "bestFor": ["Everyday hydration", "Sensitive and normal skin", "Minimalist routines"],
        "considerBefore": ["Buyers wanting an actives-forward toner"],
        "likes": ["Very gentle, low irritation", "Good everyday staple", "Unscented feel"],
        "dislikes": ["Unremarkable to buyers wanting visible results", "Plain packaging", "Slower international shipping"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 76, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 1600},
            {"type": "Oily", "satisfaction": 78, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 1800},
            {"type": "Combination", "satisfaction": 80, "positiveKeywords": ["everyday"], "negativeKeywords": [], "sampleSize": 1900},
            {"type": "Sensitive", "satisfaction": 85, "positiveKeywords": ["gentle", "trustworthy"], "negativeKeywords": [], "sampleSize": 2100},
            {"type": "Acne-prone", "satisfaction": 74, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 900}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 80, "reviewVolume": 2600, "growthPct": 1.9},
            {"country": "United States", "score": 79, "reviewVolume": 3200, "growthPct": 3.1},
            {"country": "United Kingdom", "score": 77, "reviewVolume": 800, "growthPct": 2.6},
            {"country": "Canada", "score": 76, "reviewVolume": 600, "growthPct": 2.4},
            {"country": "Japan", "score": 78, "reviewVolume": 600, "growthPct": 1.6},
            {"country": "Thailand", "score": 75, "reviewVolume": 500, "growthPct": 2.6},
            {"country": "Indonesia", "score": 74, "reviewVolume": 450, "growthPct": 2.3},
            {"country": "UAE", "score": 73, "reviewVolume": 200, "growthPct": 1.3}
        ],
        "retailLinks": retail_links("round-lab")
    },
    {
        "id": "prod_atobarrier_cream", "brandSlug": "aestura", "name": "아토베리어365 크림", "englishName": "Atobarrier365 Cream",
        "slug": "atobarrier365-cream", "category": "Cream",
        "description": "A barrier-repair cream developed with dermatological research, aimed at buyers managing a compromised or reactive skin barrier.",
        "size": "80ml", "priceMin": 24, "priceMax": 29, "currency": "USD",
        "keyIngredientSlugs": ["ceramide"], "skinTypes": ["Sensitive", "Dry"],
        "skinConcerns": ["Barrier support", "Dehydration", "Redness"], "reformulated": False,
        "usageStep": "Moisturizer", "imageTone": "white",
        "globalReviewScore": 83, "koreaScore": 85, "globalScore": 80, "reviewVolume": 7600,
        "dataConfidence": 71, "lastUpdated": "2026-06-05",
        "bestFor": ["Compromised or reactive skin barrier", "Dry, sensitive skin", "Post-procedure recovery"],
        "considerBefore": ["Oily or acne-prone skin", "Buyers wanting a lightweight gel-cream"],
        "likes": ["Genuinely calming for irritated skin", "Trusted dermatological reputation", "Fragrance-free formula"],
        "dislikes": ["Heavier texture than expected", "Higher price point", "Limited size options"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 88, "positiveKeywords": ["barrier repair", "nourishing"], "negativeKeywords": [], "sampleSize": 2800},
            {"type": "Oily", "satisfaction": 48, "positiveKeywords": [], "negativeKeywords": ["too heavy"], "sampleSize": 600},
            {"type": "Combination", "satisfaction": 70, "positiveKeywords": ["calming"], "negativeKeywords": ["heavy in T-zone"], "sampleSize": 1100},
            {"type": "Sensitive", "satisfaction": 90, "positiveKeywords": ["barrier repair", "gentle"], "negativeKeywords": [], "sampleSize": 2400},
            {"type": "Acne-prone", "satisfaction": 52, "positiveKeywords": [], "negativeKeywords": ["too rich"], "sampleSize": 500}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 85, "reviewVolume": 3200, "growthPct": 1.4},
            {"country": "United States", "score": 81, "reviewVolume": 2400, "growthPct": 2.6},
            {"country": "United Kingdom", "score": 78, "reviewVolume": 700, "growthPct": 2.1},
            {"country": "Canada", "score": 77, "reviewVolume": 500, "growthPct": 1.8},
            {"country": "Japan", "score": 82, "reviewVolume": 900, "growthPct": 1.3},
            {"country": "Thailand", "score": 76, "reviewVolume": 350, "growthPct": 2.0},
            {"country": "Indonesia", "score": 75, "reviewVolume": 300, "growthPct": 1.8},
            {"country": "UAE", "score": 77, "reviewVolume": 150, "growthPct": 1.1}
        ],
        "retailLinks": retail_links("aestura")
    },
    {
        "id": "prod_zero_pore_pad", "brandSlug": "medicube", "name": "제로 모공 패드 2.0", "englishName": "Zero Pore Pad 2.0",
        "slug": "zero-pore-pad-2", "category": "Pad",
        "description": "A dual-textured toner pad formulated around exfoliating and pore-refining acids, marketed for visible pore and texture improvement.",
        "size": "135ml / 70 pads", "priceMin": 19, "priceMax": 24, "currency": "USD",
        "keyIngredientSlugs": ["niacinamide"], "skinTypes": ["Oily", "Combination"],
        "skinConcerns": ["Enlarged pores", "Texture", "Excess oil"], "reformulated": True,
        "usageStep": "Toner Pad", "imageTone": "blue",
        "globalReviewScore": 76, "koreaScore": 71, "globalScore": 78, "reviewVolume": 15200,
        "dataConfidence": 60, "lastUpdated": "2026-07-08",
        "bestFor": ["Oily and combination skin", "Visible pores and texture concerns"],
        "considerBefore": ["Dry or sensitive skin", "Buyers new to exfoliating acids"],
        "likes": ["Visible smoothing after regular use", "Convenient dual-texture pad format", "Satisfying immediate texture change"],
        "dislikes": ["Can irritate with overuse", "Strong scent for some users", "Results plateau after initial weeks"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 54, "positiveKeywords": [], "negativeKeywords": ["irritation", "drying"], "sampleSize": 1600},
            {"type": "Oily", "satisfaction": 84, "positiveKeywords": ["smoothing", "results"], "negativeKeywords": [], "sampleSize": 5200},
            {"type": "Combination", "satisfaction": 79, "positiveKeywords": ["smoothing"], "negativeKeywords": [], "sampleSize": 4600},
            {"type": "Sensitive", "satisfaction": 46, "positiveKeywords": [], "negativeKeywords": ["irritation"], "sampleSize": 1200},
            {"type": "Acne-prone", "satisfaction": 72, "positiveKeywords": ["texture"], "negativeKeywords": ["purging reported"], "sampleSize": 2600}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 71, "reviewVolume": 2900, "growthPct": 4.8},
            {"country": "United States", "score": 79, "reviewVolume": 6600, "growthPct": 9.6},
            {"country": "United Kingdom", "score": 75, "reviewVolume": 1500, "growthPct": 8.1},
            {"country": "Canada", "score": 74, "reviewVolume": 1100, "growthPct": 7.6},
            {"country": "Japan", "score": 70, "reviewVolume": 700, "growthPct": 3.6},
            {"country": "Thailand", "score": 77, "reviewVolume": 1700, "growthPct": 10.4},
            {"country": "Indonesia", "score": 76, "reviewVolume": 1500, "growthPct": 9.9},
            {"country": "UAE", "score": 72, "reviewVolume": 400, "growthPct": 5.6}
        ],
        "retailLinks": retail_links("medicube")
    },
    {
        "id": "prod_mask_fit_cushion", "brandSlug": "tirtir", "name": "마스크핏 레드 쿠션", "englishName": "Mask Fit Red Cushion",
        "slug": "mask-fit-red-cushion", "category": "Cushion",
        "description": "A cushion foundation offered across an unusually wide shade range, built for a natural, skincare-like finish under everyday wear.",
        "size": "18g + 18g refill", "priceMin": 19, "priceMax": 24, "currency": "USD",
        "keyIngredientSlugs": [], "skinTypes": ["All"],
        "skinConcerns": ["Coverage", "Natural finish"], "reformulated": False,
        "usageStep": "Base Makeup", "imageTone": "beige",
        "globalReviewScore": 78, "koreaScore": 68, "globalScore": 80, "reviewVolume": 26400,
        "dataConfidence": 66, "lastUpdated": "2026-06-28",
        "bestFor": ["Buyers wanting a wide shade range", "Natural, skincare-like coverage"],
        "considerBefore": ["Buyers needing full, long-wear coverage", "Very oily skin needing strong oil control"],
        "likes": ["Genuinely wide, inclusive shade range", "Natural finish that doesn't look cakey", "Comfortable, lightweight wear"],
        "dislikes": ["Oxidizes darker on some skin over the day", "Limited to light-medium coverage", "Deeper shades restock less consistently"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 76, "positiveKeywords": ["natural finish"], "negativeKeywords": [], "sampleSize": 5200},
            {"type": "Oily", "satisfaction": 68, "positiveKeywords": ["lightweight"], "negativeKeywords": ["fades", "oxidizes"], "sampleSize": 7100},
            {"type": "Combination", "satisfaction": 77, "positiveKeywords": ["natural"], "negativeKeywords": [], "sampleSize": 6800},
            {"type": "Sensitive", "satisfaction": 74, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 3200},
            {"type": "Acne-prone", "satisfaction": 70, "positiveKeywords": ["lightweight"], "negativeKeywords": [], "sampleSize": 2900}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 68, "reviewVolume": 1600, "growthPct": 2.6},
            {"country": "United States", "score": 81, "reviewVolume": 12100, "growthPct": 7.4},
            {"country": "United Kingdom", "score": 76, "reviewVolume": 2900, "growthPct": 6.1},
            {"country": "Canada", "score": 75, "reviewVolume": 2100, "growthPct": 5.7},
            {"country": "Japan", "score": 66, "reviewVolume": 600, "growthPct": 2.0},
            {"country": "Thailand", "score": 78, "reviewVolume": 1700, "growthPct": 6.9},
            {"country": "Indonesia", "score": 77, "reviewVolume": 1500, "growthPct": 6.5},
            {"country": "UAE", "score": 74, "reviewVolume": 700, "growthPct": 4.0}
        ],
        "retailLinks": retail_links("tirtir")
    },
    {
        "id": "prod_lip_sleeping_mask", "brandSlug": "laneige", "name": "립 슬리핑 마스크", "englishName": "Lip Sleeping Mask",
        "slug": "lip-sleeping-mask", "category": "Lip Care",
        "description": "An overnight lip treatment mask built around a berry-scented, murumuru-butter formula, one of the most recognized Korean beauty products in Western prestige retail.",
        "size": "20g", "priceMin": 22, "priceMax": 24, "currency": "USD",
        "keyIngredientSlugs": [], "skinTypes": ["All"],
        "skinConcerns": ["Dry lips", "Chapped lips"], "reformulated": False,
        "usageStep": "Lip Treatment", "imageTone": "beige",
        "globalReviewScore": 89, "koreaScore": 84, "globalScore": 90, "reviewVolume": 68000,
        "dataConfidence": 93, "lastUpdated": "2026-07-12",
        "bestFor": ["Dry or chapped lips", "Overnight lip care", "Gifting"],
        "considerBefore": ["Buyers who dislike scented lip products"],
        "likes": ["Noticeably softer lips by morning", "Pleasant berry scent for most users", "Iconic, giftable packaging"],
        "dislikes": ["Scent too strong for some", "Small jar for the price", "Occasional tingling on very chapped lips"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 92, "positiveKeywords": ["soft lips"], "negativeKeywords": [], "sampleSize": 22000},
            {"type": "Oily", "satisfaction": 85, "positiveKeywords": ["soft lips"], "negativeKeywords": [], "sampleSize": 9000},
            {"type": "Combination", "satisfaction": 88, "positiveKeywords": ["soft lips"], "negativeKeywords": [], "sampleSize": 12000},
            {"type": "Sensitive", "satisfaction": 76, "positiveKeywords": ["softening"], "negativeKeywords": ["scent", "tingling"], "sampleSize": 8000},
            {"type": "Acne-prone", "satisfaction": 87, "positiveKeywords": ["soft lips"], "negativeKeywords": [], "sampleSize": 6000}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 84, "reviewVolume": 5200, "growthPct": 1.1},
            {"country": "United States", "score": 91, "reviewVolume": 31000, "growthPct": 2.4},
            {"country": "United Kingdom", "score": 89, "reviewVolume": 8200, "growthPct": 2.0},
            {"country": "Canada", "score": 88, "reviewVolume": 5600, "growthPct": 1.9},
            {"country": "Japan", "score": 85, "reviewVolume": 3400, "growthPct": 0.9},
            {"country": "Thailand", "score": 90, "reviewVolume": 6100, "growthPct": 2.6},
            {"country": "Indonesia", "score": 89, "reviewVolume": 5400, "growthPct": 2.5},
            {"country": "UAE", "score": 87, "reviewVolume": 3200, "growthPct": 1.6}
        ],
        "retailLinks": retail_links("laneige")
    },
    {
        "id": "prod_no5_serum", "brandSlug": "numbuzin", "name": "넘버5 비타민 나이아신아마이드 세럼", "englishName": "No.5 Vitamin Niacinamide Serum",
        "slug": "no5-vitamin-niacinamide-serum", "category": "Serum",
        "description": "A brightening serum named for the exact concern it targets, combining niacinamide and vitamin-derived ingredients for a glow-focused finish.",
        "size": "50ml", "priceMin": 24, "priceMax": 29, "currency": "USD",
        "keyIngredientSlugs": ["niacinamide"], "skinTypes": ["Normal", "Combination", "Dry"],
        "skinConcerns": ["Dullness", "Uneven tone"], "reformulated": False,
        "usageStep": "Serum", "imageTone": "yellow",
        "globalReviewScore": 78, "koreaScore": 69, "globalScore": 80, "reviewVolume": 14600,
        "dataConfidence": 52, "lastUpdated": "2026-06-18",
        "bestFor": ["Dull or uneven-toned skin", "Buyers wanting a visible glow effect"],
        "considerBefore": ["Fragrance- and dye-sensitive users", "Very sensitive or reactive skin"],
        "likes": ["Visible glow after a few uses", "Pleasant, uplifting scent", "Fun, distinctive packaging"],
        "dislikes": ["Fragrance and dye may irritate sensitive skin", "Slightly sticky finish", "Price rose amid viral demand"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 77, "positiveKeywords": ["glow"], "negativeKeywords": [], "sampleSize": 3400},
            {"type": "Oily", "satisfaction": 72, "positiveKeywords": ["glow"], "negativeKeywords": ["sticky"], "sampleSize": 3100},
            {"type": "Combination", "satisfaction": 79, "positiveKeywords": ["glow", "brightening"], "negativeKeywords": [], "sampleSize": 3600},
            {"type": "Sensitive", "satisfaction": 58, "positiveKeywords": ["brightening"], "negativeKeywords": ["fragrance", "irritation"], "sampleSize": 2200},
            {"type": "Acne-prone", "satisfaction": 68, "positiveKeywords": ["glow"], "negativeKeywords": ["breakouts reported"], "sampleSize": 1900}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 69, "reviewVolume": 1700, "growthPct": 5.0},
            {"country": "United States", "score": 81, "reviewVolume": 6100, "growthPct": 11.2},
            {"country": "United Kingdom", "score": 76, "reviewVolume": 1400, "growthPct": 9.4},
            {"country": "Canada", "score": 75, "reviewVolume": 1000, "growthPct": 8.9},
            {"country": "Japan", "score": 68, "reviewVolume": 400, "growthPct": 3.1},
            {"country": "Thailand", "score": 79, "reviewVolume": 1400, "growthPct": 12.6},
            {"country": "Indonesia", "score": 78, "reviewVolume": 1200, "growthPct": 12.0},
            {"country": "UAE", "score": 73, "reviewVolume": 400, "growthPct": 6.4}
        ],
        "retailLinks": retail_links("numbuzin")
    },
    {
        "id": "prod_bio_collagen_mask", "brandSlug": "biodance", "name": "바이오 콜라겐 리얼 딥 마스크", "englishName": "Bio-Collagen Real Deep Mask",
        "slug": "bio-collagen-real-deep-mask", "category": "Sheet Mask",
        "description": "A hydrogel sheet mask designed to conform tightly to the face for an instant plumping effect, sold as an occasional 'reset' treatment rather than a daily product.",
        "size": "1 sheet (34g)", "priceMin": 5, "priceMax": 8, "currency": "USD",
        "keyIngredientSlugs": [], "skinTypes": ["All"],
        "skinConcerns": ["Dehydration", "Dullness", "Instant plumping"], "reformulated": False,
        "usageStep": "Mask", "imageTone": "pink",
        "globalReviewScore": 86, "koreaScore": 75, "globalScore": 88, "reviewVolume": 19800,
        "dataConfidence": 54, "lastUpdated": "2026-07-14",
        "bestFor": ["Special-occasion prep", "Instant hydration and plumping", "Gifting and self-care routines"],
        "considerBefore": ["Buyers looking for a daily, budget staple rather than a treat item"],
        "likes": ["Immediate, satisfying plumping effect", "Comfortable, tight-conforming fit", "Fun to use and share on video"],
        "dislikes": ["Expensive per use versus regular masks", "One-time-use format creates waste", "Effect fades by the next day"],
        "skinTypeResponse": [
            {"type": "Dry", "satisfaction": 88, "positiveKeywords": ["plumping"], "negativeKeywords": [], "sampleSize": 5200},
            {"type": "Oily", "satisfaction": 80, "positiveKeywords": ["hydrating"], "negativeKeywords": [], "sampleSize": 3800},
            {"type": "Combination", "satisfaction": 85, "positiveKeywords": ["plumping"], "negativeKeywords": [], "sampleSize": 4600},
            {"type": "Sensitive", "satisfaction": 83, "positiveKeywords": ["gentle"], "negativeKeywords": [], "sampleSize": 2900},
            {"type": "Acne-prone", "satisfaction": 78, "positiveKeywords": ["hydrating"], "negativeKeywords": [], "sampleSize": 2200}
        ],
        "countryResponse": [
            {"country": "Korea", "score": 75, "reviewVolume": 1500, "growthPct": 8.4},
            {"country": "United States", "score": 90, "reviewVolume": 8200, "growthPct": 16.1},
            {"country": "United Kingdom", "score": 86, "reviewVolume": 1900, "growthPct": 13.4},
            {"country": "Canada", "score": 85, "reviewVolume": 1400, "growthPct": 12.9},
            {"country": "Japan", "score": 78, "reviewVolume": 600, "growthPct": 6.9},
            {"country": "Thailand", "score": 89, "reviewVolume": 2400, "growthPct": 17.9},
            {"country": "Indonesia", "score": 88, "reviewVolume": 2100, "growthPct": 17.1},
            {"country": "UAE", "score": 82, "reviewVolume": 700, "growthPct": 10.4}
        ],
        "retailLinks": retail_links("biodance")
    }
]

with open(os.path.join(DATA, "products.json"), "w", encoding="utf-8") as f:
    json.dump(PRODUCTS, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(PRODUCTS)} products")

# ---------------------------------------------------------------------------
# Data sources
# ---------------------------------------------------------------------------
SOURCES = [
    {"id": "src_hwahae", "name": "Hwahae", "url": "https://www.hwahae.co.kr", "country": "Korea", "sourceType": "Review App", "officialRetailer": False, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": True, "trustWeight": 72},
    {"id": "src_glowpick", "name": "Glowpick", "url": "https://www.glowpick.com", "country": "Korea", "sourceType": "Review App", "officialRetailer": False, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": True, "trustWeight": 70},
    {"id": "src_oliveyoung", "name": "Olive Young", "url": "https://www.oliveyoung.co.kr", "country": "Korea", "sourceType": "Retailer", "officialRetailer": True, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": False, "trustWeight": 88},
    {"id": "src_ulta", "name": "Ulta", "url": "https://www.ulta.com", "country": "United States", "sourceType": "Retailer", "officialRetailer": True, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": False, "trustWeight": 90},
    {"id": "src_amazon", "name": "Amazon", "url": "https://www.amazon.com", "country": "United States", "sourceType": "Retailer", "officialRetailer": True, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": False, "trustWeight": 82},
    {"id": "src_yesstyle", "name": "YesStyle", "url": "https://www.yesstyle.com", "country": "United States", "sourceType": "Retailer", "officialRetailer": True, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": False, "trustWeight": 78},
    {"id": "src_stylekorean", "name": "StyleKorean", "url": "https://www.stylekorean.com", "country": "United States", "sourceType": "Retailer", "officialRetailer": True, "supportsVerifiedPurchase": True, "allowsIncentivizedReviews": False, "trustWeight": 75},
    {"id": "src_reddit", "name": "Reddit (r/SkincareAddiction, r/AsianBeauty)", "url": "https://www.reddit.com", "country": "Global", "sourceType": "Community Forum", "officialRetailer": False, "supportsVerifiedPurchase": False, "allowsIncentivizedReviews": False, "trustWeight": 58},
]

with open(os.path.join(DATA, "sources.json"), "w", encoding="utf-8") as f:
    json.dump(SOURCES, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(SOURCES)} sources")

# ---------------------------------------------------------------------------
# Review aggregates (per product x source x country)
# ---------------------------------------------------------------------------
REVIEW_ROWS = [
    # Bean Essence
    ("bean-essence", "Hwahae", "Korea", 4.3, 2200, 0.74, 0.81, 0.06),
    ("bean-essence", "Amazon", "United States", 4.5, 6100, 0.86, 0.91, 0.02),
    ("bean-essence", "YesStyle", "United States", 4.4, 1500, 0.83, 0.88, 0.01),
    ("bean-essence", "Reddit (r/SkincareAddiction, r/AsianBeauty)", "Global", 4.1, 800, 0.71, None, 0.0),
    # Heartleaf toner
    ("heartleaf-77-soothing-toner", "Amazon", "United States", 4.6, 15900, 0.89, 0.93, 0.01),
    ("heartleaf-77-soothing-toner", "Ulta", "United States", 4.5, 4200, 0.87, 0.95, 0.0),
    ("heartleaf-77-soothing-toner", "Olive Young", "Korea", 4.4, 5100, 0.82, 0.9, 0.03),
    ("heartleaf-77-soothing-toner", "Reddit (r/SkincareAddiction, r/AsianBeauty)", "Global", 4.3, 1400, 0.8, None, 0.0),
    # Snail mucin essence
    ("advanced-snail-96-mucin-power-essence", "Amazon", "United States", 4.5, 22000, 0.86, 0.92, 0.01),
    ("advanced-snail-96-mucin-power-essence", "Ulta", "United States", 4.4, 5100, 0.84, 0.94, 0.0),
    ("advanced-snail-96-mucin-power-essence", "Olive Young", "Korea", 4.3, 6800, 0.78, 0.89, 0.02),
    # Relief sun
    ("relief-sun", "Amazon", "United States", 4.6, 14200, 0.88, 0.91, 0.02),
    ("relief-sun", "YesStyle", "United States", 4.5, 3200, 0.85, 0.87, 0.01),
    ("relief-sun", "Olive Young", "Korea", 4.2, 4400, 0.76, 0.88, 0.04),
    # Centella ampoule
    ("madagascar-centella-ampoule", "Amazon", "United States", 4.4, 8800, 0.83, 0.9, 0.01),
    ("madagascar-centella-ampoule", "Olive Young", "Korea", 4.1, 1900, 0.72, 0.87, 0.05),
    # Dive-in serum
    ("dive-in-serum", "Amazon", "United States", 4.3, 5300, 0.82, 0.89, 0.01),
    ("dive-in-serum", "Olive Young", "Korea", 4.2, 1200, 0.73, 0.86, 0.03),
    # Dokdo toner
    ("1025-dokdo-toner", "Olive Young", "Korea", 4.4, 2600, 0.8, 0.91, 0.02),
    ("1025-dokdo-toner", "Amazon", "United States", 4.2, 3200, 0.79, 0.88, 0.01),
    # Atobarrier cream
    ("atobarrier365-cream", "Olive Young", "Korea", 4.6, 3200, 0.85, 0.92, 0.02),
    ("atobarrier365-cream", "Amazon", "United States", 4.3, 2400, 0.81, 0.88, 0.01),
    # Zero pore pad
    ("zero-pore-pad-2", "Amazon", "United States", 4.1, 6600, 0.79, 0.87, 0.03),
    ("zero-pore-pad-2", "Olive Young", "Korea", 4.0, 2900, 0.71, 0.85, 0.05),
    # Mask fit cushion
    ("mask-fit-red-cushion", "Amazon", "United States", 4.2, 12100, 0.78, 0.86, 0.02),
    ("mask-fit-red-cushion", "Ulta", "United States", 4.1, 2600, 0.76, 0.9, 0.0),
    # Lip sleeping mask
    ("lip-sleeping-mask", "Ulta", "United States", 4.7, 18400, 0.91, 0.94, 0.0),
    ("lip-sleeping-mask", "Amazon", "United States", 4.6, 31000, 0.9, 0.92, 0.01),
    ("lip-sleeping-mask", "Olive Young", "Korea", 4.5, 5200, 0.84, 0.9, 0.02),
    # No.5 serum
    ("no5-vitamin-niacinamide-serum", "Amazon", "United States", 4.3, 6100, 0.81, 0.88, 0.03),
    ("no5-vitamin-niacinamide-serum", "Olive Young", "Korea", 4.0, 1700, 0.69, 0.84, 0.06),
    # Bio-collagen mask
    ("bio-collagen-real-deep-mask", "Amazon", "United States", 4.7, 8200, 0.9, 0.9, 0.02),
    ("bio-collagen-real-deep-mask", "StyleKorean", "United States", 4.6, 2100, 0.87, 0.89, 0.01),
    ("bio-collagen-real-deep-mask", "Olive Young", "Korea", 4.3, 1500, 0.75, 0.86, 0.04),
]

review_aggregates = []
for i, row in enumerate(REVIEW_ROWS):
    slug, source, country, rating, count, pos, verified, incentivized = row
    review_aggregates.append({
        "id": f"rev_{i+1:03d}",
        "productSlug": slug,
        "source": source,
        "country": country,
        "rating": rating,
        "reviewCount": count,
        "positiveRatio": pos,
        "verifiedPurchaseRatio": verified if verified is not None else 0.0,
        "incentivizedRatio": incentivized,
        "dataDate": "2026-07-01",
        "isDemo": True,
    })

with open(os.path.join(DATA, "review-aggregates.json"), "w", encoding="utf-8") as f:
    json.dump(review_aggregates, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(review_aggregates)} review aggregates")

# ---------------------------------------------------------------------------
# Celebrity events
# ---------------------------------------------------------------------------
CELEBRITY_EVENTS = [
    {
        "id": "cel_001", "celebrityName": "Cardi B", "brandSlug": "mixsoon", "productSlug": "bean-essence",
        "eventDate": "2024-11-20", "platform": "Instagram Story", "eventType": "Product shown in routine clip",
        "commercialStatus": "Organic mention", "sourceLabel": "Public social post (unpaid, per brand statement)",
        "attentionLift": [{"window": "7D", "pct": 340}, {"window": "30D", "pct": 210}, {"window": "90D", "pct": 95}],
        "socialMentionsChange": 480, "reviewGrowthPct": 63, "sentimentChangePts": 4,
        "confidenceLevel": "Medium", "isDemo": True
    },
    {
        "id": "cel_002", "celebrityName": "Hailey Bieber", "brandSlug": "beauty-of-joseon", "productSlug": "relief-sun",
        "eventDate": "2023-06-14", "platform": "TikTok", "eventType": "Product mentioned in 'get ready with me' video",
        "commercialStatus": "Unconfirmed", "sourceLabel": "Fan-recorded clip, brand relationship unconfirmed",
        "attentionLift": [{"window": "7D", "pct": 190}, {"window": "30D", "pct": 140}, {"window": "90D", "pct": 70}],
        "socialMentionsChange": 260, "reviewGrowthPct": 38, "sentimentChangePts": 2,
        "confidenceLevel": "Low", "isDemo": True
    },
    {
        "id": "cel_003", "celebrityName": "Sydney Sweeney", "brandSlug": "biodance", "productSlug": "bio-collagen-real-deep-mask",
        "eventDate": "2024-03-02", "platform": "TikTok", "eventType": "Product used in a filmed skincare routine",
        "commercialStatus": "Product seeding", "sourceLabel": "Brand-confirmed press seeding list",
        "attentionLift": [{"window": "7D", "pct": 410}, {"window": "30D", "pct": 250}, {"window": "90D", "pct": 120}],
        "socialMentionsChange": 610, "reviewGrowthPct": 88, "sentimentChangePts": 5,
        "confidenceLevel": "High", "isDemo": True
    },
    {
        "id": "cel_004", "celebrityName": "Dua Lipa", "brandSlug": "laneige", "productSlug": "lip-sleeping-mask",
        "eventDate": "2022-09-10", "platform": "Interview / Press", "eventType": "Named product in a favorites press interview",
        "commercialStatus": "Organic mention", "sourceLabel": "Print magazine interview",
        "attentionLift": [{"window": "7D", "pct": 60}, {"window": "30D", "pct": 35}, {"window": "90D", "pct": 15}],
        "socialMentionsChange": 90, "reviewGrowthPct": 9, "sentimentChangePts": 1,
        "confidenceLevel": "Medium", "isDemo": True
    },
    {
        "id": "cel_005", "celebrityName": "Alix Earle", "brandSlug": "medicube", "productSlug": "zero-pore-pad-2",
        "eventDate": "2024-09-05", "platform": "TikTok", "eventType": "Featured in a viral 'pore routine' video",
        "commercialStatus": "Paid partnership", "sourceLabel": "Sponsored content disclosure on video",
        "attentionLift": [{"window": "7D", "pct": 520}, {"window": "30D", "pct": 300}, {"window": "90D", "pct": 140}],
        "socialMentionsChange": 720, "reviewGrowthPct": 104, "sentimentChangePts": -2,
        "confidenceLevel": "High", "isDemo": True
    },
]

with open(os.path.join(DATA, "celebrity-events.json"), "w", encoding="utf-8") as f:
    json.dump(CELEBRITY_EVENTS, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(CELEBRITY_EVENTS)} celebrity events")

# ---------------------------------------------------------------------------
# Countries
# ---------------------------------------------------------------------------
COUNTRIES = [
    {
        "slug": "united-states", "name": "United States", "region": "North America", "overallAttention": 89,
        "risingBrandSlugs": ["mixsoon", "biodance", "medicube"], "risingProductSlugs": ["bean-essence", "bio-collagen-real-deep-mask", "zero-pore-pad-2"],
        "popularCategories": ["Essence", "Sunscreen", "Sheet Mask"], "popularIngredientSlugs": ["fermented-bean", "centella-asiatica", "niacinamide"],
        "priceBand": "$15-30 typical", "channels": ["Amazon", "Ulta", "Sephora", "TikTok Shop"],
        "positiveKeywords": ["glow", "affordable", "gentle"], "negativeKeywords": ["shipping time", "sticky", "sold out"],
        "koreaGapNote": "Several viral US favorites (mixsoon, biodance) score notably higher abroad than in their home Korea market.",
        "climate": "Temperate to humid-subtropical, varies widely by region"
    },
    {
        "slug": "united-kingdom", "name": "United Kingdom", "region": "Europe", "overallAttention": 68,
        "risingBrandSlugs": ["anua", "beauty-of-joseon"], "risingProductSlugs": ["heartleaf-77-soothing-toner", "relief-sun"],
        "popularCategories": ["Toner", "Sunscreen"], "popularIngredientSlugs": ["heartleaf", "centella-asiatica"],
        "priceBand": "£12-25 typical", "channels": ["Amazon", "Cult Beauty", "YesStyle"],
        "positiveKeywords": ["soothing", "value", "gentle"], "negativeKeywords": ["import cost", "delivery time"],
        "koreaGapNote": "UK sentiment tracks closely with US patterns but at roughly two-thirds the review volume.",
        "climate": "Temperate maritime, generally mild and damp"
    },
    {
        "slug": "canada", "name": "Canada", "region": "North America", "overallAttention": 63,
        "risingBrandSlugs": ["mixsoon", "beauty-of-joseon"], "risingProductSlugs": ["bean-essence", "relief-sun"],
        "popularCategories": ["Essence", "Sunscreen"], "popularIngredientSlugs": ["fermented-bean", "rice"],
        "priceBand": "CA$20-35 typical", "channels": ["Amazon", "YesStyle", "Sephora"],
        "positiveKeywords": ["hydrating", "gentle", "value"], "negativeKeywords": ["shipping cost", "winter dryness fit"],
        "koreaGapNote": "Growth trends mirror the US closely, roughly one quarter of the review volume.",
        "climate": "Cold winters, dry indoor heating season affects product preference"
    },
    {
        "slug": "japan", "name": "Japan", "region": "East Asia", "overallAttention": 47,
        "risingBrandSlugs": ["beauty-of-joseon", "cosrx"], "risingProductSlugs": ["relief-sun", "advanced-snail-96-mucin-power-essence"],
        "popularCategories": ["Sunscreen", "Essence"], "popularIngredientSlugs": ["rice", "snail-mucin"],
        "priceBand": "¥2,000-4,000 typical", "channels": ["@cosme", "Amazon Japan", "Qoo10"],
        "positiveKeywords": ["軽い", "低刺激", "コスパ"], "negativeKeywords": ["香り", "ベタつき"],
        "koreaGapNote": "Attention is the lowest among tracked markets; Japan has its own strong domestic J-beauty alternatives.",
        "climate": "Humid summers, distinct seasons; texture and white-cast sensitivity run high"
    },
    {
        "slug": "thailand", "name": "Thailand", "region": "Southeast Asia", "overallAttention": 61,
        "risingBrandSlugs": ["beauty-of-joseon", "biodance", "medicube"], "risingProductSlugs": ["relief-sun", "bio-collagen-real-deep-mask"],
        "popularCategories": ["Sunscreen", "Sheet Mask"], "popularIngredientSlugs": ["rice", "centella-asiatica"],
        "priceBand": "฿500-900 typical", "channels": ["Shopee", "Lazada", "Watsons"],
        "positiveKeywords": ["ไม่เหนียว", "กันแดด", "คุ้มค่า"], "negativeKeywords": ["สินค้าหมด", "ราคาสูงขึ้น"],
        "koreaGapNote": "Sun care performs unusually well versus most markets, consistent with the hot, humid climate.",
        "climate": "Tropical, hot and humid year-round"
    },
    {
        "slug": "indonesia", "name": "Indonesia", "region": "Southeast Asia", "overallAttention": 58,
        "risingBrandSlugs": ["beauty-of-joseon", "biodance", "numbuzin"], "risingProductSlugs": ["relief-sun", "bio-collagen-real-deep-mask"],
        "popularCategories": ["Sunscreen", "Serum"], "popularIngredientSlugs": ["rice", "niacinamide"],
        "priceBand": "Rp150,000-300,000 typical", "channels": ["Shopee", "Tokopedia", "TikTok Shop"],
        "positiveKeywords": ["ringan", "tidak lengket", "cerah"], "negativeKeywords": ["stok habis", "harga naik"],
        "koreaGapNote": "One of the fastest-growing markets tracked, led by sun care and brightening serums.",
        "climate": "Tropical, hot and humid year-round"
    },
    {
        "slug": "uae", "name": "United Arab Emirates", "region": "Middle East", "overallAttention": 40,
        "risingBrandSlugs": ["mixsoon", "beauty-of-joseon"], "risingProductSlugs": ["bean-essence", "relief-sun"],
        "popularCategories": ["Sunscreen", "Essence"], "popularIngredientSlugs": ["centella-asiatica", "rice"],
        "priceBand": "AED 70-140 typical", "channels": ["Sephora ME", "Amazon.ae", "Namshi"],
        "positiveKeywords": ["hydration", "lightweight", "gentle"], "negativeKeywords": ["heat stability", "availability"],
        "koreaGapNote": "Smallest tracked market by volume but growing consistently across sun care and hydration.",
        "climate": "Arid desert, extreme heat for much of the year"
    },
    {
        "slug": "korea", "name": "South Korea", "region": "East Asia", "overallAttention": 65,
        "risingBrandSlugs": ["round-lab", "aestura"], "risingProductSlugs": ["1025-dokdo-toner", "atobarrier365-cream"],
        "popularCategories": ["Toner", "Cream", "Sunscreen"], "popularIngredientSlugs": ["centella-asiatica", "ceramide"],
        "priceBand": "₩15,000-35,000 typical", "channels": ["Olive Young", "Coupang", "Naver Shopping"],
        "positiveKeywords": ["저자극", "신뢰", "재구매"], "negativeKeywords": ["가격 인상", "품절"],
        "koreaGapNote": "The home market often rates viral overseas hits more moderately than the brands' international scores.",
        "climate": "Four distinct seasons; humid summers, dry cold winters"
    }
]

with open(os.path.join(DATA, "countries.json"), "w", encoding="utf-8") as f:
    json.dump(COUNTRIES, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(COUNTRIES)} countries")

# ---------------------------------------------------------------------------
# Ingredients
# ---------------------------------------------------------------------------
INGREDIENTS = [
    {
        "slug": "fermented-bean", "name": "Fermented Soybean (Bean Ferment Extract)",
        "overview": "A fermented soybean extract used for its hydrating and skin-conditioning properties, closely associated with mixsoon's single-ingredient product line. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 62, "relatedBrandSlugs": ["mixsoon"], "relatedProductSlugs": ["bean-essence", "bean-cream", "bifida-ferment-essence"],
        "positiveKeywords": ["hydrating", "glow", "gentle"], "negativeKeywords": ["sticky", "pilling", "scent"],
        "skinTypeNotes": [
            {"type": "Dry", "note": "Frequently reported as well tolerated and hydrating"},
            {"type": "Oily", "note": "More reports of a heavy or sticky feel"},
            {"type": "Sensitive", "note": "Generally well tolerated, occasional fermentation-scent sensitivity"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 88}, {"country": "United Kingdom", "score": 64},
            {"country": "Korea", "score": 51}, {"country": "Thailand", "score": 55}
        ]
    },
    {
        "slug": "centella-asiatica", "name": "Centella Asiatica",
        "overview": "A widely used botanical extract associated with soothing and calming skincare formulas, appearing across many of the brands tracked here. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 24, "relatedBrandSlugs": ["mixsoon", "skin1004", "round-lab"], "relatedProductSlugs": ["centella-asiatica-essence", "madagascar-centella-ampoule"],
        "positiveKeywords": ["soothing", "calming", "lightweight"], "negativeKeywords": ["scent", "thin texture"],
        "skinTypeNotes": [
            {"type": "Sensitive", "note": "One of the most consistently recommended ingredients for redness-prone skin"},
            {"type": "Acne-prone", "note": "Frequently paired with actives to offset irritation"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 79}, {"country": "Thailand", "score": 74},
            {"country": "Korea", "score": 58}, {"country": "Indonesia", "score": 70}
        ]
    },
    {
        "slug": "heartleaf", "name": "Heartleaf (Houttuynia Cordata)",
        "overview": "A botanical extract most associated with Anua's Heartleaf line, used in soothing, redness-focused formulas. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 8, "relatedBrandSlugs": ["anua"], "relatedProductSlugs": ["heartleaf-77-soothing-toner"],
        "positiveKeywords": ["calming", "gentle", "affordable"], "negativeKeywords": ["scent", "watery"],
        "skinTypeNotes": [
            {"type": "Acne-prone", "note": "Very commonly recommended alongside acne routines for its calming reputation"},
            {"type": "Sensitive", "note": "High tolerance reported across most reviews"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 82}, {"country": "United Kingdom", "score": 66}, {"country": "Korea", "score": 60}
        ]
    },
    {
        "slug": "rice", "name": "Rice Extract / Rice Bran Water",
        "overview": "A traditional hanbang-adjacent ingredient associated with brightening and lightweight hydration, prominent in Beauty of Joseon's formulas. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 31, "relatedBrandSlugs": ["beauty-of-joseon"], "relatedProductSlugs": ["relief-sun"],
        "positiveKeywords": ["brightening", "lightweight", "glow"], "negativeKeywords": ["fragrance often paired"],
        "skinTypeNotes": [
            {"type": "Combination", "note": "Frequently cited for a lightweight, non-greasy finish"},
            {"type": "Dry", "note": "Often paired with richer steps for additional hydration"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 76}, {"country": "Thailand", "score": 81}, {"country": "Indonesia", "score": 78}, {"country": "Korea", "score": 54}
        ]
    },
    {
        "slug": "ceramide", "name": "Ceramide",
        "overview": "A lipid ingredient associated with skin barrier support, common across barrier-repair and derma-cosmetic formulas such as AESTURA's. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 14, "relatedBrandSlugs": ["aestura", "mixsoon"], "relatedProductSlugs": ["atobarrier365-cream", "bean-cream"],
        "positiveKeywords": ["barrier support", "nourishing", "trustworthy"], "negativeKeywords": ["heavy", "price"],
        "skinTypeNotes": [
            {"type": "Dry", "note": "Widely reported as effective for barrier support and comfort"},
            {"type": "Oily", "note": "More reports of a heavy or greasy feel"}
        ],
        "countryAttention": [
            {"country": "Korea", "score": 71}, {"country": "United States", "score": 63}, {"country": "Japan", "score": 60}
        ]
    },
    {
        "slug": "snail-mucin", "name": "Snail Secretion Filtrate",
        "overview": "An ingredient long associated with COSRX's breakout formulas, used for hydration and skin-conditioning benefits. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 3, "relatedBrandSlugs": ["cosrx"], "relatedProductSlugs": ["advanced-snail-96-mucin-power-essence"],
        "positiveKeywords": ["repair", "glow", "staple"], "negativeKeywords": ["sticky", "origin off-putting to some"],
        "skinTypeNotes": [
            {"type": "Dry", "note": "Frequently reported as effective for smoothing and hydrating"},
            {"type": "Oily", "note": "More reports of a sticky or tacky finish"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 74}, {"country": "Korea", "score": 55}, {"country": "United Kingdom", "score": 62}
        ]
    },
    {
        "slug": "niacinamide", "name": "Niacinamide",
        "overview": "A widely used vitamin-derived ingredient associated with brightening and pore-refining formulas, common across brightening serums and pore-focused products in this data set. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 19, "relatedBrandSlugs": ["numbuzin", "medicube"], "relatedProductSlugs": ["no5-vitamin-niacinamide-serum", "zero-pore-pad-2"],
        "positiveKeywords": ["brightening", "pore care", "even tone"], "negativeKeywords": ["irritation at high %", "purging reported"],
        "skinTypeNotes": [
            {"type": "Combination", "note": "Commonly recommended for pore and tone concerns"},
            {"type": "Sensitive", "note": "Can irritate at higher concentrations or with added fragrance"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 77}, {"country": "Thailand", "score": 70}, {"country": "Korea", "score": 56}
        ]
    },
    {
        "slug": "hyaluronic-acid", "name": "Hyaluronic Acid (Low-Molecular)",
        "overview": "A hydration-focused ingredient used in lightweight, layerable serum formulas such as Torriden's Dive-In line. Information here is educational and does not constitute a claim of medical or dermatological treatment.",
        "attentionChangePct": 6, "relatedBrandSlugs": ["torriden"], "relatedProductSlugs": ["dive-in-serum"],
        "positiveKeywords": ["lightweight", "hydrating", "layerable"], "negativeKeywords": ["not enough for very dry skin alone"],
        "skinTypeNotes": [
            {"type": "Oily", "note": "Frequently preferred over heavier hydrators for this skin type"},
            {"type": "Dry", "note": "Often layered with richer moisturizers for full effect"}
        ],
        "countryAttention": [
            {"country": "United States", "score": 68}, {"country": "Korea", "score": 58}, {"country": "United Kingdom", "score": 61}
        ]
    }
]

with open(os.path.join(DATA, "ingredients.json"), "w", encoding="utf-8") as f:
    json.dump(INGREDIENTS, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(INGREDIENTS)} ingredients")

# ---------------------------------------------------------------------------
# Trend events (for the Radar event stream)
# ---------------------------------------------------------------------------
TREND_EVENTS = [
    {"id": "trend_001", "brandSlug": "mixsoon", "productSlug": "bean-cream", "eventType": "New product launch", "eventDate": "2025-06-18", "description": "Bean Cream launched as a richer layering partner to Bean Essence.", "source": "Brand announcement", "confidenceLevel": "High", "impactValue": 62},
    {"id": "trend_002", "brandSlug": "mixsoon", "productSlug": "bean-essence", "eventType": "Celebrity mention", "eventDate": "2024-11-20", "description": "Cardi B seen using Bean Essence in an unpaid social moment.", "source": "Social media", "confidenceLevel": "Medium", "impactValue": 91},
    {"id": "trend_003", "brandSlug": "beauty-of-joseon", "productSlug": "relief-sun", "eventType": "Review surge", "eventDate": "2023-06-01", "description": "Relief Sun goes viral in humid-climate skincare communities for its low white cast.", "source": "Aggregated review data", "confidenceLevel": "High", "impactValue": 78},
    {"id": "trend_004", "brandSlug": "medicube", "productSlug": "zero-pore-pad-2", "eventType": "Reformulation", "eventDate": "2024-05-01", "description": "Zero Pore Pad relaunched as version 2.0 with an updated dual-texture pad.", "source": "Brand announcement", "confidenceLevel": "High", "impactValue": 55},
    {"id": "trend_005", "brandSlug": "tirtir", "productSlug": "mask-fit-red-cushion", "eventType": "Retail expansion", "eventDate": "2023-10-01", "description": "Wide 30-shade range goes viral in inclusive-beauty content.", "source": "Social media", "confidenceLevel": "Medium", "impactValue": 70},
    {"id": "trend_006", "brandSlug": "biodance", "productSlug": "bio-collagen-real-deep-mask", "eventType": "Review surge", "eventDate": "2024-03-01", "description": "Peel-off satisfaction videos drive a sharp global spike in review volume.", "source": "Aggregated review data", "confidenceLevel": "High", "impactValue": 85},
    {"id": "trend_007", "brandSlug": "numbuzin", "productSlug": "no5-vitamin-niacinamide-serum", "eventType": "Review surge", "eventDate": "2024-07-01", "description": "Short-form video trend drives a sharp US review-volume increase.", "source": "Aggregated review data", "confidenceLevel": "Medium", "impactValue": 66},
    {"id": "trend_008", "brandSlug": "anua", "productSlug": "heartleaf-77-soothing-toner", "eventType": "Retail expansion", "eventDate": "2023-05-15", "description": "Added to Ulta Beauty's online assortment, widening US distribution.", "source": "Retailer listing", "confidenceLevel": "High", "impactValue": 48},
    {"id": "trend_009", "brandSlug": "skin1004", "productSlug": "madagascar-centella-ampoule", "eventType": "Retail expansion", "eventDate": "2023-08-01", "description": "Broad relaunch on Amazon US and YesStyle broadens distribution.", "source": "Retailer listing", "confidenceLevel": "High", "impactValue": 44},
    {"id": "trend_010", "brandSlug": "cosrx", "productSlug": "advanced-snail-96-mucin-power-essence", "eventType": "Review milestone", "eventDate": "2024-02-10", "description": "Crosses a major cumulative review-count milestone on Amazon US.", "source": "Aggregated review data", "confidenceLevel": "High", "impactValue": 40},
]

with open(os.path.join(DATA, "trend-events.json"), "w", encoding="utf-8") as f:
    json.dump(TREND_EVENTS, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(TREND_EVENTS)} trend events")

# ---------------------------------------------------------------------------
# Briefs (editorial content)
# ---------------------------------------------------------------------------
BRIEFS = [
    {
        "slug": "why-mixsoon-matters-beyond-cardi-b",
        "title": "Why mixsoon matters beyond the Cardi B moment",
        "category": "Brand",
        "summary": "A single unpaid mention explains a spike, not a brand. mixsoon's underlying growth started well before November 2024.",
        "author": "Radar Editorial",
        "publishedAt": "2025-01-14",
        "dataAsOf": "2026-07-01",
        "relatedBrandSlugs": ["mixsoon"],
        "relatedProductSlugs": ["bean-essence"],
        "sources": ["Aggregated review data (Amazon, YesStyle)", "Social listening (demo sample)"],
        "body": [
            "It is tempting to credit a single celebrity moment for a brand's entire trajectory, and the November 2024 Cardi B mention is the easiest headline to reach for when explaining mixsoon's US growth. The data suggests a more layered story.",
            "mixsoon's US review volume for Bean Essence was already climbing steadily through 2024, driven by sustained 'glass skin' and skin-barrier content on short-form video well before the Cardi B moment. The celebrity mention accelerated an existing curve rather than starting one from zero.",
            "What the mention did do, based on the tracked attention-lift windows, was compress months of expected organic growth into a period of a few weeks. That is a real and measurable effect, but it is different from saying the brand's success depends on it.",
            "The more durable story is a simple one-ingredient premise that is easy to explain and easy to recommend, combined with a hero SKU that does not require a shopper to learn a five-step routine. That is a structural strength independent of any single social moment.",
            "The watch item going forward is concentration risk: Bean Essence still accounts for a large share of the brand's attention and reviews. How mixsoon's newer launches, like Bean Cream, perform over the next few quarters will say more about the brand's staying power than the original viral spike."
        ]
    },
    {
        "slug": "korean-brands-bigger-overseas-than-korea",
        "title": "Brands that read bigger overseas than they do in Korea",
        "category": "Korea vs Global",
        "summary": "Several tracked brands post noticeably higher attention scores abroad than at home. The pattern says as much about discovery channels as it does about the products themselves.",
        "author": "Radar Editorial",
        "publishedAt": "2025-03-02",
        "dataAsOf": "2026-07-01",
        "relatedBrandSlugs": ["mixsoon", "beauty-of-joseon", "skin1004", "biodance"],
        "relatedProductSlugs": [],
        "sources": ["Brand-level market breakdown (demo sample)"],
        "body": [
            "Across the brands tracked here, a handful show a wide gap between their domestic Korea attention score and their global attention score, most visibly mixsoon, Beauty of Joseon, SKIN1004 and Biodance.",
            "Part of this is discovery mechanics rather than product quality. These four brands lean on ingredient-forward, single-hero-product storytelling that travels unusually well through short-form video, a channel where English-language and Southeast Asian content currently outweighs Korean-language content in volume.",
            "It is also worth noting that a large domestic market with many mature, trusted incumbents sets a higher bar for a newer brand to stand out at home than it does for the same brand entering markets with fewer entrenched local alternatives.",
            "None of this means Korea-market sentiment is a lagging indicator, or that these brands are somehow less 'authentic'. It means the two audiences are responding to different things: Korean buyers to a crowded field of comparable options, and overseas buyers to a simple, novel story.",
            "The brands worth watching longer-term are the ones that can convert overseas attention into a broader catalog, since a wide global-Korea gap concentrated in a single SKU is a more fragile position than a gap spread across several well-reviewed products."
        ]
    },
    {
        "slug": "tiktok-virality-vs-consumer-satisfaction",
        "title": "TikTok virality vs. actual consumer satisfaction",
        "category": "Consumer Behavior",
        "summary": "Growth momentum and review sentiment do not always move together. A short look at where they diverge, and what that gap tends to predict.",
        "author": "Radar Editorial",
        "publishedAt": "2025-05-20",
        "dataAsOf": "2026-07-01",
        "relatedBrandSlugs": ["medicube", "biodance", "numbuzin"],
        "relatedProductSlugs": ["zero-pore-pad-2", "bio-collagen-real-deep-mask", "no5-vitamin-niacinamide-serum"],
        "sources": ["Brand-level scores (demo sample)"],
        "body": [
            "Growth momentum and review sentiment scores are correlated across most of the brands tracked here, but not perfectly, and the gap between the two is informative in its own right.",
            "medicube shows one of the largest gaps: high growth momentum paired with sentiment that trails several slower-growing peers. That pattern is consistent with a marketing- and drop-driven growth model, where purchase intent outpaces product fit for a meaningful minority of buyers.",
            "Biodance shows high growth and high sentiment together, which is a less common and generally more durable combination, though its short review history means that combination has not yet been tested over a long period.",
            "numbuzin sits in between: strong growth, moderate sentiment, and a wider skin-type satisfaction spread than most peers, largely driven by fragrance and dye sensitivity in a minority of reviewers.",
            "The practical takeaway for brand-side readers: sustained virality without a corresponding sentiment floor is a signal worth investigating before assuming a growth curve will hold, not a reason to distrust the growth itself."
        ]
    },
    {
        "slug": "korean-sunscreens-winning-in-humid-markets",
        "title": "The Korean sunscreens winning in humid markets",
        "category": "Product",
        "summary": "Relief Sun's regional pattern is a useful case study in how climate, not just ingredient trends, shapes where a Korean sunscreen actually wins.",
        "author": "Radar Editorial",
        "publishedAt": "2025-02-11",
        "dataAsOf": "2026-07-01",
        "relatedBrandSlugs": ["beauty-of-joseon"],
        "relatedProductSlugs": ["relief-sun"],
        "sources": ["Product-level country response data (demo sample)"],
        "body": [
            "Beauty of Joseon's Relief Sun scores highest, by a meaningful margin, in Thailand and Indonesia, both hot and humid year-round, and noticeably lower in Japan, where the market has strong domestic sunscreen alternatives already tuned for its own climate and preferences.",
            "This is a useful reminder that a sunscreen's texture claims, no white cast, lightweight, non-greasy, are climate-dependent in practice. A formula that performs well in a temperate market can perform even better, or worse, once humidity and heat are added to the equation.",
            "The US pattern sits between the two: strong scores, driven in large part by a large population living in hot, humid regions where the product's core claims are most tested and most rewarded.",
            "For brand-side readers evaluating expansion into new sun care markets, this suggests climate-matched go-to-market sequencing, leading with humid, high-heat markets, may outperform a uniform global rollout for texture-driven sunscreens specifically."
        ]
    }
]

with open(os.path.join(DATA, "briefs.json"), "w", encoding="utf-8") as f:
    json.dump(BRIEFS, f, ensure_ascii=False, indent=2)
print(f"Wrote {len(BRIEFS)} briefs")
