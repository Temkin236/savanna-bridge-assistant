# Bug List

Use one row per reproducible issue. Accessibility impact determines severity;
do not downgrade an issue only because a workaround exists.

| ID | Severity | Owner | Found by | Reproduction | Expected result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D-001 | Medium | D | Clean-install review | Start from a clean export where `widget/dist` is absent and open either demo page | Demo image builds and serves `/widget/widget.js` itself | Fixed by multi-stage `demo-host/Dockerfile`; verification pending clean-install run |
| D-002 | High | D | CI review | Introduce a serious axe violation in a demo page and inspect the accessibility job | The pull request fails | Fixed by removing `continue-on-error`; requires first remote CI run |
| D-003 | Medium | D | Milestone audit | Inspect D-M2 evidence files | A machine-readable axe baseline exists | Fixed by `tests/capture-axe-baseline.mjs`; capture pending current rebuild |
| D-004 | Medium | D | Milestone audit | Follow the README as a REST or open-standards integrator | All three installation levels are documented | Fixed in README; clean-install rehearsal pending |

