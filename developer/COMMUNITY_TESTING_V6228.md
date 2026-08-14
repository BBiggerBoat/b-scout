# B-Scout Community Testing — v6.22.8

## Moderator access
When B-Scout runs on localhost or a private LAN, **Moderator** appears in the top navigation and footer. It can also be exposed with `?developer=1`.

## Shared-backend test cycle
1. Start B-Scout with a moderator token:
   `BSCOUT_ADMIN_TOKEN=<private token> npm start`
2. Open B-Scout at the server URL, not as a `file://` page.
3. Submit a contribution.
4. Open **Moderator** from the top navigation.
5. Choose **Connect moderator** and enter the same token.
6. Select the pending contribution.
7. For a new manufacturer/model, edit the Draft canonical record. The Action defaults to **Promote edited manufacturer/model**.
8. Click **Save moderation decision**.
   - Manufacturer/model promotion writes the canonical record immediately.
   - Other approved community material remains reviewed evidence until publication.
9. Click **Publish reviewed knowledge** to update public Guide/community JSON and approved community attachments.

## Browser-local fallback
If the Node backend is not running, contributions can still be tested in the same browser. Canonical manufacturer/model promotion is intentionally blocked in local-only mode because the browser cannot safely rewrite canonical project files.
