# Accessibility Conformance Report (CONFORMANCE.md)

**Product:** Savanna Bridge Assistant (`<db-assistant>`, `<bridge-assistant>`, Agent Console, Demo Host)  
**Evaluation Standard:** Web Content Accessibility Guidelines (WCAG) 2.2 Level AA  
**Status:** Tested on demo fixtures and starter pages. Zero critical or serious issues on automated scans (`axe-core`). Manual and assistive technology tests recorded below.

---

## Evaluation Summary Table

| WCAG 2.2 AA Criterion | Supports / Partly / Does not | Notes |
|---|---|---|
| **1.1.1 Non-text Content** | Supports | All control buttons, icons, and status badges include visible text or programmatic `aria-label` / `aria-hidden` attributes. |
| **1.2.1 Audio-only and Video-only (Prerecorded)** | Supports | Spoken audio answers always have full text equivalents visible on screen. |
| **1.2.2 Captions (Prerecorded)** | Supports | Prerecorded audio playback displays exact synchronized text in the conversation log. |
| **1.3.1 Info and Relationships** | Supports | Semantic elements used throughout (`<dialog>`, `<button>`, `<label>`, `<input>`, `<h1>`-`<h3>`). Dialog uses `aria-modal="true"` and `role="dialog"`. |
| **1.3.2 Meaningful Sequence** | Supports | DOM order matches visual and logical reading order. Live region uses `role="log"` and `aria-live="polite"`. |
| **1.3.3 Sensory Characteristics** | Supports | Instructions do not rely on shape, size, or visual orientation alone. |
| **1.3.4 Orientation** | Supports | Fully functional in both portrait and landscape modes across devices. |
| **1.3.5 Identify Input Purpose** | Supports | Inputs use proper semantic types and autocomplete attributes (`autocomplete="off"` for questions). |
| **1.4.1 Use of Color** | Supports | Color is never used as the sole conveyor of information; icons, text labels, and badges accompany all state indicators. |
| **1.4.3 Contrast (Minimum)** | Supports | Text achieves at least 4.5:1 contrast against backgrounds; large text and headings exceed 3:1. |
| **1.4.4 Resize Text** | Supports | Tested at 200% browser zoom; text scales cleanly with relative units (`rem`) without loss of content. |
| **1.4.10 Reflow** | Supports | Supports 320 CSS-pixel responsive width without horizontal scrolling or content clipping. |
| **1.4.11 Non-text Contrast** | Supports | Focus outlines, button borders, and input boundaries achieve at least 3:1 contrast against adjacent colors. |
| **1.4.12 Text Spacing** | Supports | Content remains readable and unclipped when line height, letter spacing, and paragraph spacing are expanded. Ethiopic script uses 1.7 line height. |
| **1.4.13 Content on Hover or Focus** | Supports | No tooltip or hover-only disclosure that cannot be dismissed via `Escape` or without moving the pointer. |
| **2.1.1 Keyboard** | Supports | All features operable by keyboard: Tab, Shift+Tab, Enter to send, Space to toggle, Escape to close. |
| **2.1.2 No Keyboard Trap** | Supports | Focus is constrained within the dialog when open and released back to the launcher when closed. |
| **2.2.1 Timing Adjustable** | Supports | No session timeouts for chatting or reading. Account linking codes have a generous 10-minute expiry clearly communicated. |
| **2.2.2 Pause, Stop, Hide** | Supports | Spoken audio playback includes immediate Pause and Stop controls. No autoplaying media or flashing content. |
| **2.3.1 Three Flashes or Below Threshold** | Supports | No content flashes or blinks more than 3 times in any 1-second period. |
| **2.4.1 Bypass Blocks** | Supports | Single-page widget with focus management; host starter pages include semantic main landmark navigation. |
| **2.4.2 Page Titled** | Supports | Web pages and console maintain distinct, descriptive `<title>` tags. |
| **2.4.3 Focus Order** | Supports | Focus moves logically from launcher to first interactive control inside dialog, and restores to launcher on close. |
| **2.4.4 Link Purpose (In Context)** | Supports | Citations use descriptive link text ("Module 2 - Communicating with customers") and open in new tabs with `rel="noopener noreferrer"`. |
| **2.4.6 Headings and Labels** | Supports | Clear heading hierarchy; all form controls possess explicit programmatic labels. |
| **2.4.7 Focus Visible** | Supports | High-visibility focus indicator: `outline: 3px solid #f5a300; outline-offset: 2px;` active on `:focus-visible`. |
| **2.4.11 Focus Not Obscured (Minimum)** | Supports | Widget launcher is floating at bottom-right and does not obscure host controls. At 200% zoom, launcher maintains padding from viewport edges. |
| **2.5.1 Pointer Gestures** | Supports | All actions operate through single-pointer tap/click without multipoint or path-based gestures. |
| **2.5.2 Pointer Cancellation** | Supports | Activation occurs on `pointerup` / click; dragging away cancels activation. |
| **2.5.3 Label in Name** | Supports | Accessible names match or include the visible text label on all controls. |
| **2.5.4 Motion Actuation** | Supports | No functionality requires device shaking or motion. |
| **2.5.7 Dragging Movements** | Supports | No functionality relies on dragging movements. |
| **2.5.8 Target Size (Minimum)** | Supports | All interactive targets are at least 44 × 44 CSS pixels (`min-height: 2.75rem; min-width: 2.75rem`). |
| **3.1.1 Language of Page** | Supports | Root document specifies `lang="en"` or `lang="am"`. |
| **3.1.2 Language of Parts** | Supports | Amharic message blocks explicitly specify `lang="am"` and `dir="ltr"` so screen readers switch to Amharic synthesizers. |
| **3.2.1 On Focus** | Supports | Receiving focus does not initiate any unexpected form submission, navigation, or context change. |
| **3.2.2 On Input** | Supports | Changing input values or selecting checkboxes does not trigger automatic submissions. |
| **3.2.3 Consistent Navigation** | Supports | Navigation components appear in consistent order across the application and host pages. |
| **3.2.4 Consistent Identification** | Supports | Functional elements (Ask, Listen, Clear, Close, Talk to a person) use consistent iconography and names. |
| **3.2.6 Consistent Help** | Supports | Assistant launcher button remains in the same fixed position across all course and job pages. |
| **3.3.1 Error Identification** | Supports | Errors are clearly announced in text with `role="alert"` and tied to fields via `aria-describedby`. |
| **3.3.2 Labels or Instructions** | Supports | Form inputs provide clear instructions and placeholder examples. |
| **3.3.3 Error Suggestion** | Supports | Form errors provide actionable corrective guidance in plain language. |
| **3.3.4 Error Prevention (Legal, Financial, Data)** | Supports | Deletion (`DELETE /api/v1/me`) and live handoff require explicit confirmation. |
| **3.3.7 Redundant Entry** | Supports | Support needs and preferences persist across sessions without requiring re-entry. |

---

## Assistive Technology Testing Log

### Automated Testing
- **Engine:** `@axe-core/playwright` v4.10 on Chromium 131.0
- **Scope:** `demo-host/blank.html`, `demo-host/savanna/pages/concept-with-navigation.html`, `demo-host/jobboard/index.html`, and `channels/console/index.html`.
- **Result:** **0 Critical, 0 Serious violations.**

### Manual Assistive Technology Testing
- **NVDA on Windows 11 (Chrome 131)**:
  - Navigation via Tab and Shift+Tab through entire widget dialog: **Pass**.
  - Announcement of incoming tutor answers via `aria-live="polite"`: **Pass**.
  - Amharic text speech pronunciation via Microsoft Asrate synthesizer: **Pass**.
- **TalkBack on Android (Google Chrome on Tecno Spark / Android 13)**:
  - Swipe right activation and double-tap buttons: **Pass**.
  - Voice recording activation and review: **Pass**.
  - *Known Limitation on Android:* Browser-level screen sharing (`getDisplayMedia`) is unsupported in Chrome for Android; the assistant provides a contextual section anchor fallback and screenshot upload option instead.
- **Keyboard-Only (No Mouse Attached)**:
  - Complete flow (open launcher -> type question -> receive cited answer -> play audio -> request handoff -> close dialog): **Pass**.
- **200% Zoom and 320px Viewport**:
  - Tested on 320px mobile viewport: no horizontal scrollbar, touch targets remain $\ge 44\text{px}$: **Pass**.
- **Sound-Off Check**:
  - Full text transcript visible for all voice input and TTS answers: **Pass**.

**Tested by:** Development team and co-designer stand-in rehearsal protocol on November 15, 2026.

