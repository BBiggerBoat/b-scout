# B-Scout Lifecycle Structure — Dream, Buy, Own, Sell

Updated: 2026-08-07

The visible lifecycle vocabulary is now:

1. Dream — discover, search, understand and compare permanent boat models.
2. Buy — continue saved model research, evaluate candidate listings and make acquisition decisions.
3. Own — maintain the permanent record of an individual boat and access owner resources.
4. Sell — prepare an owned boat's records, disclosures and buyer-facing evidence.

Internal compatibility:
- Existing workspace keys `dreaming`, `buying`, `owning`, `selling` remain unchanged.
- Existing localStorage and saved-record schemas remain unchanged.
- Legacy app actions such as `research-models`, `saved-models` and `my-boats` remain supported.

Design principle:
The four lifecycle stages are not four separate databases. Permanent model knowledge persists across the lifecycle, while individual-boat facts live in My Boats.
