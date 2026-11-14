# Privacy and Secrets Release Checklist

Person D completes this checklist at G3 and repeats it before submission. A
checked item means evidence was reviewed; it does not replace legal or security
review for production deployment.

## Repository and configuration

- [x] `.env`, private keys, database files, recordings, and test reports with personal data are ignored by Git.
- [x] `.env.example` contains names and safe defaults only, not credentials.
- [x] Provider, Telegram, and Africa's Talking credentials are supplied only to server-side containers.
- [x] SMS defaults to `mock`; Africa's Talking is labelled sandbox-only.
- [x] Offline mode works without paid services or external model calls.
- [x] CORS uses an explicit allowlist instead of `*`.
- [x] Local development secrets are labelled as unsuitable for shared or production deployment.

## Learner data

- [x] Account linking requests no ID, diagnosis, or medical evidence.
- [x] Support-needs fields accept user preferences without proof.
- [x] Voice retention defaults to false and the transcript remains editable.
- [x] Teacher statistics are aggregated and exclude learner identities.
- [x] Handoff creation requires explicit consent.
- [x] Screen sharing remains learner-initiated and learner-controlled.
- [x] Logs and test evidence must not contain names, phone numbers, chat IDs, support histories, voice recordings, or tokens.

## Release verification

- [x] A repository scan found no configured non-empty secret values.
- [x] Mock and sandbox output is labelled in documentation and responses.
- [ ] A human reviewer will inspect the staged Git diff before the first push.
- [ ] Production credentials will be rotated if they were ever pasted into a terminal transcript, issue, pull request, or chat.
