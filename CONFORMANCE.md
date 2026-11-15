# Accessibility conformance status

**Product:** Savanna Bridge Assistant widget, demo hosts, and agent console
**Target:** WCAG 2.2 Level AA
**Status:** Automated implementation checks pass; human assistive-technology validation pending.

This is a readiness report, not a claim of formal WCAG conformance. Automated
checks can find many markup and interaction problems, but they cannot prove that
the experience works well with a screen reader or for a blind learner.

## Implemented accessibility foundations

- Native buttons, inputs, links, labels, headings, and a named modal dialog.
- A polite conversation log and status announcer for new answers and progress.
- Keyboard focus moves into the dialog, is trapped while open, and returns to the
  launcher on Escape or Close.
- Five-language selector with `lang` metadata and Arabic right-to-left direction.
- Visible text remains available for every spoken answer; voice transcripts remain
  editable and are not retained by default.
- Mock/offline speech uses the browser speech engine rather than presenting a demo
  tone as synthesized language.
- Professional inline SVG icons are decorative (`aria-hidden="true"`); controls keep
  visible text or an accessible name.
- 44 CSS-pixel minimum control targets, visible focus, reduced-motion support, and
  forced-colors styles.

## Automated evidence

The Playwright suite includes:

- axe scans that block critical and serious findings;
- dialog name/role checks;
- keyboard focus-trap and focus-restoration checks;
- five-language and Arabic RTL checks;
- mock-audio/browser-speech fallback with persistent written text;
- a guard against emoji being used as control icons.

The current Edge run passed all 11 Playwright checks with no critical or serious
axe findings. See `docs/test-log.md` and `docs/wcag-report.md` for the evidence ledger.

## Manual tests still required

These rows must stay **Pending** until a named tester records the device, browser,
assistive-technology version, date, task, and result:

| Test | Status | Required task |
|---|---|---|
| NVDA on Windows | Pending | Open the assistant, navigate by headings/forms/buttons, ask a cited question, listen, request a mentor, and close. |
| TalkBack on Android | Pending | Complete the same flow using swipe navigation and double-tap activation. |
| Blind or low-vision co-designer | Pending | Complete the primary task unaided and record observed barriers in their own words. |
| 200% zoom and 320 CSS px reflow | Pending final run | Verify no clipping, overlap, lost controls, or two-dimensional scrolling. |
| Sound-off/Deaf-user flow | Pending final run | Complete voice input review, answer reading, and mentor handoff using text alone. |

Use the run sheet in `docs/test-protocol.md`. Do not convert a pending row to Pass
based only on code review, axe, or a developer rehearsal.

## Reference patterns

- [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WAI-ARIA keyboard interface guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [Android TalkBack web navigation](https://support.google.com/accessibility/android/answer/2633135)
