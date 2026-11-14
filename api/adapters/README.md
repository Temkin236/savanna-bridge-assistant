# Adapter boundary

Person A owns this folder. Implement these interfaces without importing code from
the widget or channels folders:

- `ContentSource`: returns content chunks with title, heading, URL, page, and text.
- `LearnerDirectory`: resolves the linked learner's deadlines and modules.
- `JobSource`: returns schema.org `JobPosting` records.
- `NotificationChannel`: delivers already-authorized notifications.

Initial drivers are Savanna static HTML, generic HTML, a mock learner directory,
schema.org job JSON, Telegram, Africa's Talking sandbox, and mock SMS. Keep every
platform-specific assumption behind an adapter.

