# B-Atlas Community Contributions — Phase 11

## Privacy and anti-abuse

Phase 11 keeps community contribution account-free while minimizing personal data and adding prototype abuse controls.

### Data minimization
- No profile or login is required.
- Display name and clarification email remain optional.
- Email is private moderation data and must never be rendered into a public Guide.
- Contributors are told not to include addresses, phone numbers, precise boat locations or other unnecessary personal information.

### Browser-side abuse controls
- Hidden honeypot field.
- Minimum form dwell time of 1.8 seconds.
- Local browser rate limit: 5 contributions per 10 minutes and 20 per 24 hours.
- Optional `window.BScoutContributionChallenge.verify()` hook for a future CAPTCHA/challenge provider.

These controls are friction, not security. When a shared submission backend is introduced, rate limits and challenge verification must be enforced server-side.

### Upload safety
- Photos remain limited to 12 MB. Browser-decodable images are re-encoded through canvas before storage, stripping EXIF/GPS and similar embedded metadata where practical.
- PDFs remain limited to 25 MB. Browser file `lastModified` is not retained. PDF-internal metadata/content is not rewritten.
- Malware scanning is explicitly marked unavailable in the static prototype and must be introduced before shared file ingestion.

### Publication
Nothing publishes automatically. Moderation remains mandatory.
