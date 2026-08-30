# Community Contribution Moderator Test Access

## Purpose

Makes the existing Contribution Review console reachable during local/developer testing without exposing a normal public navigation item.

## Access

The **Moderator** footer link appears automatically when B-Atlas runs on localhost, a private LAN address, or a `.local` hostname.

For hosted testing, append `?developer=1` or `?moderator=1` to `index.html`. This is a visibility convenience only, not authentication.

## End-to-end test

1. Open B-Atlas in moderator test mode.
2. Open a Guide and choose **Contribute to this Guide**, or use global **Contribute**.
3. Submit a contribution.
4. Choose **Open Moderator Review** in the success message, or use the footer **Moderator** link.
5. Review the pending contribution and choose the appropriate moderation action.
6. Return to the model Guide to inspect approved/merged Community Knowledge.

## Security boundary

This remains a static prototype. The moderator link is not an authentication mechanism, and the console only sees contribution data stored under the same browser origin. A shared backend and real administrator authentication are required before public deployment of moderation.
