# Savanna Bridge Assistant WCAG 2.2 AA Conformance Report Draft

Status: Draft for G3. No full conformance claim is made. Automated checks have
passed on the current demo fixtures, while the manual, assistive-technology,
and co-designer rows remain not tested until a person performs them.

## Scope

The evaluation scope is the local Shadow DOM widget fixture, Savanna-style demo
page, generic job board, agent console, and the text-equivalent API flows. The
approved production Savanna pages are not yet available, so results for the
local fixture cannot be presented as results for the production platform.

## Tools and evidence

- axe-core through `@axe-core/playwright` 4.10-compatible tooling
- Playwright with installed Chromium or Chrome
- API integration gate in `tests/integration_flow.py`
- Manual scripts in `docs/test-protocol.md`
- Results in `docs/test-log.md` and `docs/axe-baseline.json`

## Criteria table

| WCAG 2.2 criterion or test area | Level | Status | Evidence | Known limitation or owner |
| --- | --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Automated pass in current fixtures | axe run; no critical or serious findings | Manual review of final icons and audio controls: B/D |
| 1.2.1 Audio-only and Video-only | A | Not applicable to current fixture | No prerecorded media | Re-evaluate if demo media is added |
| 1.2.2 Captions | A | Not applicable to current fixture | No prerecorded video | Re-evaluate if video is added |
| 1.3.1 Info and Relationships | A | Automated pass; manual pending | Semantic headings, labels, regions, and axe run | NVDA and TalkBack confirmation: D |
| 1.3.2 Meaningful Sequence | A | Manual pending | Keyboard and screen-reader scripts prepared | D |
| 1.3.3 Sensory Characteristics | A | Manual pending | Main tasks do not rely on position alone | D |
| 1.3.4 Orientation | AA | Manual pending | Reflow protocol prepared | B/D |
| 1.3.5 Identify Input Purpose | AA | Partial | Current inputs have programmatic labels | Final account fields need autocomplete review: B |
| 1.4.1 Use of Color | A | Automated pass; manual pending | Current controls retain text labels | D |
| 1.4.3 Contrast Minimum | AA | Automated pass in current fixtures | axe baseline and blocking CI | Final widget states and production host need review: B/D |
| 1.4.4 Resize Text | AA | Not tested | 200 percent zoom script prepared | D |
| 1.4.10 Reflow | AA | Not tested | 320 CSS-pixel and 200 percent protocol prepared | D |
| 1.4.11 Non-text Contrast | AA | Automated pass; manual pending | axe run | Focus, borders, and custom controls on final build: B/D |
| 1.4.12 Text Spacing | AA | Not tested | Manual protocol required | D |
| 1.4.13 Content on Hover or Focus | AA | Not applicable to current fixture | No hover-only disclosure | Re-evaluate final citations and tooltips: B |
| 2.1.1 Keyboard | A | Not tested end to end | Keyboard script prepared; basic launcher path exists | D |
| 2.1.2 No Keyboard Trap | A | Not tested end to end | Escape closes starter dialog | Full widget and console manual run: B/D |
| 2.2.1 Timing Adjustable | A | Partial | Linking expiry is documented; no short UI timeout | Final session and error behavior: A/B/D |
| 2.2.2 Pause Stop Hide | A | Not applicable to current fixture | No moving content except polite status | Re-evaluate final notifications |
| 2.3.1 Three Flashes | A | Pass by inspection | No flashing content | D |
| 2.4.1 Bypass Blocks | A | Partial | Demo pages are short and semantic | Add skip link if final host navigation grows: D |
| 2.4.2 Page Titled | A | Pass | Unique page titles in demo and console | D |
| 2.4.3 Focus Order | A | Not tested end to end | Keyboard protocol prepared | D |
| 2.4.4 Link Purpose in Context | A | Automated pass; manual pending | Descriptive demo links | Final citations and job actions: B/D |
| 2.4.6 Headings and Labels | AA | Automated pass in current fixtures | axe run and semantic markup | Final integrated widget: B/D |
| 2.4.7 Focus Visible | AA | Partial | Explicit `:focus-visible` styles | Manual browser/device confirmation: D |
| 2.4.11 Focus Not Obscured Minimum | AA | Not tested | Manual keyboard and zoom run required | D |
| 2.5.1 Pointer Gestures | A | Not applicable to current fixture | No multipoint or path gestures | Re-evaluate final mobile interaction |
| 2.5.2 Pointer Cancellation | A | Manual pending | Native click activation used | D |
| 2.5.3 Label in Name | A | Automated pass; manual pending | Visible labels align with accessible names | Final widget: B/D |
| 2.5.4 Motion Actuation | A | Not applicable | No motion input | D |
| 2.5.7 Dragging Movements | AA | Not applicable | No drag-only operation | D |
| 2.5.8 Target Size Minimum | AA | Partial | Starter controls are at least 44 CSS pixels | TalkBack and final widget confirmation: D |
| 3.1.1 Language of Page | A | Pass | `lang` is set on current pages | Language changes inside final conversation: B/D |
| 3.1.2 Language of Parts | AA | Not tested | Multilingual API is available | Final mixed-language UI and screen-reader run: B/D |
| 3.2.1 On Focus | A | Pass by inspection | Focus alone does not trigger context changes | D |
| 3.2.2 On Input | A | Manual pending | Explicit buttons perform submissions | Final language and preference controls: B/D |
| 3.2.3 Consistent Navigation | AA | Partial | Current fixtures use stable simple navigation | Final multi-page host: D |
| 3.2.4 Consistent Identification | AA | Partial | Repeated actions use consistent labels | Final integrated surfaces: B/D |
| 3.2.6 Consistent Help | A | Partial | Help launcher placement is consistent on both demos | Final pages: B/D |
| 3.3.1 Error Identification | A | Partial | API errors use consistent structured responses | Final visible form errors: A/B/D |
| 3.3.2 Labels or Instructions | A | Automated pass in current fixtures | axe run | Final forms: B/D |
| 3.3.3 Error Suggestion | AA | Not tested | Requires final widget error paths | B/D |
| 3.3.4 Error Prevention Legal Financial Data | AA | Not applicable | No legal or financial transaction | Re-evaluate if application submission is added |
| 3.3.7 Redundant Entry | A | Partial | Support preferences persist locally through API | Manual final-flow confirmation: D |
| 3.3.8 Accessible Authentication Minimum | AA | Partial | Linking asks for a short code and no cognitive test | Manual linking run: D |
| 4.1.2 Name Role Value | A | Automated pass; manual pending | axe run; native and ARIA controls | NVDA/TalkBack final confirmation: D |
| 4.1.3 Status Messages | AA | Partial | Polite live regions exist in widget and console | NVDA/TalkBack final confirmation: D |
| Text equivalent and sound-off task | Project gate | Not tested end to end | Protocol prepared; API responses always include text | D |
| Co-designer completes main task unaided | Project gate | Not tested | Session plan prepared | Requires a real co-designer; D |

## Current conclusion

The automated G2 gate passes on the local fixtures and blocks critical or
serious axe findings. WCAG 2.2 AA conformance is not yet established because
manual keyboard, zoom, sound-off, NVDA, TalkBack, production-host, and
co-designer evidence is still required. Those activities are not replaced by
automated simulation.

