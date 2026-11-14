# Accessibility Test Protocol

The delivery gate is WCAG 2.2 AA with zero critical and zero serious axe
findings. Automated checks are necessary but not sufficient.

## Main task

1. Open the learning demo on the target device.
2. Open the assistant using only the keyboard or the device's assistive control.
3. Switch between English and Amharic.
4. Ask a course question and open its citation.
5. Ask an unrelated question and confirm the assistant refuses and offers a person.
6. Request a person and confirm the summary card avoids unnecessary personal data.
7. Start and stop screen sharing yourself; the system must never start it silently.
8. Receive a job alert in Telegram and use reply 2 to request a person.

## Keyboard-only run

- Start with the pointer unavailable.
- Confirm a logical focus order and clearly visible focus.
- Confirm launcher, dialog, language, send, citations, read-aloud controls, support needs, handoff, and close are operable.
- Confirm Escape closes the dialog and focus returns to the launcher.
- Confirm no keyboard trap exists.

## Zoom and reflow

- Set browser zoom to 200 percent at a 1280 CSS-pixel viewport.
- Repeat at a 320 CSS-pixel viewport or low-cost Android.
- Confirm content reflows without two-dimensional scrolling, overlap, clipping, or lost controls.

## Sound-off and text equivalence

- Mute the device before starting.
- Confirm voice input exposes an editable transcript before sending.
- Confirm every spoken answer has visible equivalent text.
- Complete the full main task without hearing any audio.

## NVDA run

- Record the Windows, browser, and NVDA versions.
- Navigate by Tab, Shift+Tab, headings, buttons, links, form fields, and landmarks.
- Confirm names, roles, states, errors, citations, and polite new-message announcements.
- Confirm the transcript and support preferences are understandable out of context.

## TalkBack run

- Record the Android device, Android version, browser, and TalkBack version.
- Repeat the main task with swipe navigation and activation gestures.
- Check touch target size, reading order, language changes, live announcements, and the low-bandwidth path.

## Co-designer gate

Give the task, not step-by-step instructions. Record whether the co-designer
completed it unaided, where they paused, and what they expected. Do not record a
diagnosis, medical history, or other unnecessary identifying information.
Use the scheduling and evidence template in `docs/co-designer-plan.md`.

