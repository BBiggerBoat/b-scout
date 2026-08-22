# B-Scout Market Metrics

## Rarity Score

Rarity answers: **How difficult is this model likely to be to find for sale?**

- Scale: 1 (Common) to 5 (Very rare).
- Primary evidence: observed listing frequency and recency across B-Scout listing sources.
- Supporting evidence: geographic spread, reliable production volume and surviving-fleet/owner-club evidence.
- Production volume alone must not determine rarity.
- Missing market observations remain unrated; B-Scout does not infer rarity from missing data.
- `RarityConfidence` records evidence quality separately from the score.

## Price Level

Model-level price is descriptive, not a value judgement.

- Scale: 1 (Generally lower-priced) to 5 (Generally higher-priced).
- It should be calculated from observed asking/sold-price ranges where sufficient comparable data exists.
- It is intentionally named **Price Level**, not Value Score.
- A specific listing may later receive a separate valuation assessment based on condition, engines, location, equipment and asking price.
- Missing price evidence remains unrated.

## Core rule

Known evidence may support a score. Missing evidence produces an unrated metric, never a fabricated score.
