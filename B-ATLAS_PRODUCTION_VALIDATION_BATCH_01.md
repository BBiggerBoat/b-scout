# B-Atlas Production Validation Batch 01 — Albin + Nimble + Camano

**Release:** v6.30.0  
**Schema:** Canonical Schema v1.3 — Global Power + Sail Ready  
**Scope:** All 14 current B-Atlas models from Albin, Nimble and Camano.

## Result

This is the first full manufacturer-level migration batch after the six-model pilot.

The batch validates and canonicalizes stable identity, dimensions, propulsion, hull behaviour, layout and selected accommodation facts while deliberately preserving year/configuration uncertainty.

## Albin

Nine current B-Atlas Albin records were reviewed.

### High-value corrections / normalization

- **Albin 25:** factory metric documentation now anchors the canonical dimensions and power data.
- **Albin 27 Family Cruiser:** core dimensions, Joe Puccia designer attribution, full-length keel and wet-head arrangement are retained. Production end year remains disputed.
- **Albin 27 Sport Cruiser:** core dimensions and enclosed head/shower arrangement canonicalized.
- **Albin 28 TE Engine Box / Flush Deck:** retained as two configuration records of the same hull family. Their different cockpit/engine arrangement is real.
- **Albin 30 Family Cruiser:** legacy `Sportfisher` family classification is replaced by a family/express-cruiser classification. HMY explicitly describes a skeg-mounted rudder.
- **Albin 32+2:** engine count remains unresolved because documented single and twin installations exist.
- **Albin 36 Trawler:** model-level engine count remains unresolved because later twin installations exist.
- **Albin 40 Trawler:** core dimensions, headroom, semi-displacement form and protected running gear canonicalized.

## Nimble

Both current B-Atlas Nimble power/motorsailer records were reviewed.

- **Nomad:** Ted Brewer attribution, outboard propulsion, trailerable dimensions and displacement are now canonicalized at moderate confidence. Factory documentation remains scarce.
- **Wanderer:** the pilot canonicalization is retained. The model is classified as motorsailer-capable, while evidence notes that individual boats could be supplied mastless/power-only.

## Camano

All three current B-Atlas Camano records were reviewed.

- **28/31 Gnome:** same hull family as the Troll, but no flybridge.
- **28/31 Troll:** retains the 28→31 naming history rather than creating duplicate models.
- **41:** 41-foot / 14-foot / 3-foot-9-inch dimensions, single Yanmar shaft propulsion and separate shower arrangement are now canonicalized. Standard 440-hp power is recorded with optional/test-engine variation preserved in evidence.

## Tankage policy confirmed

Camano is the clearest example of why B-Atlas must not simply copy a table of model specifications.

The Camano handbook explicitly identifies early fuel/water/waste capacities in **US gallons**, so those figures can be converted accurately. However, later Troll fuel capacity increased materially. The handbook values are therefore stored as production-era evidence, not falsely promoted as universal values for every Camano 28/31.

The same conservatism is used for Albin sources that say only `gal` without stating US or Imperial.

## Remaining unresolved items

- Albin 27 production end year.
- Universal engine count for Albin 32+2 and Albin 36.
- Universal tankage for Camano 28/31 across all production years.
- Factory-grade documentation for the Nimble Nomad.
- Some legacy narrative fields remain until later UI/data migration passes.

## Next recommended validation batch

Proceed manufacturer-by-manufacturer rather than by random model.

A strong next batch would be:

**Grand Banks + Marine Trader + CHB**

These families are central to B-Atlas's current trawler audience and will stress-test:
- production-era variation,
- builder/brand ambiguity,
- Taiwan-yard variation,
- single/twin configurations,
- wood/fiberglass transitions,
- model/variant naming.
