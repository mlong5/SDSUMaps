## Summary

Track C deliverables: SDSU theme system, iOS portrait fix, modal a11y,
Add Event UX overhaul, README rewrite. No data-layer changes — Track A
(Brandon) and Track B (Talan) integrations are stub-friendly.

## Tasks closed

- [ ] **C1** Map image refresh — _Deferred._ No new asset supplied; the
  existing `assets/images/sdsu_campus_map.jpg` is retained. Pin coords
  in `app/index.tsx` are **proportional** (`mapWidth * 0.17`,
  `mapHeight * 0.42`), so swapping in a similar-aspect image will not
  break alignment. Bryan to drop in a higher-res export from
  <https://map.sdsu.edu> before final submission.
- [x] **C2** iOS portrait layout fix
  - Wrapped root in `SafeAreaProvider` / `SafeAreaView` so notch and
    home indicator are respected.
  - Subtracted `insets.top + insets.bottom` from `mapHeight` so the
    map ScrollView no longer clips under iOS chrome.
  - Pinned `minimumZoomScale` to `1` (was `0.6` on iOS) — that was
    the actual broken-portrait bug: pinch-zoom under 1.0 left the
    map shrunken with white space around it.
  - Switched the campus-map `contentFit` from `cover` to `contain`
    so the full map is visible in any orientation.
- [x] **C3** UI polish + SDSU tokens
  - New `app/constants/theme.ts` (colors, spacing, radius, typography,
    `tap.minSize: 44`).
  - Used official SDSU red **#A6192E** (PMS 200) instead of the team
    plan's #CC0033 — see file header for rationale; one-line edit if
    we want to switch back.
  - Refactored every Track C-owned file (`index.tsx`, `aboutScreen.tsx`,
    `sideMenu.tsx`, `_layout.tsx`) to use tokens. Zero hardcoded hex in
    Track C files now.
  - All buttons / Pressables ≥44 pt min hit area.
  - Every `Modal` has `onRequestClose` (Android hardware back) and a
    visible top-right X with `accessibilityLabel="Close dialog"`.
  - Backdrop tap dismisses both event-details and side-menu modals.
  - About screen rewritten as a scarlet tagline banner using tokens.
- [x] **C4** Add Event form UX
  - Extracted to `app/components/AddEventModal.tsx` so `index.tsx`
    stays focused on map composition.
  - 6 labeled fields with `accessibilityLabel`s matching visible
    labels: title, description, location, clubName, startDate,
    endDate.
  - Inline validation: required, max-length, future-only start, end
    > start. Red borders + inline error text appear after first
    submit attempt (not while still typing).
  - Cancel button: clears form, closes; disabled mid-submit so an
    in-flight write cannot be orphaned.
  - Submit button: shows `ActivityIndicator` and "Adding…" label;
    disabled during in-flight, so a double-tap cannot fire two writes.
  - Unmount-safe: `mountedRef` guards `setState` if the user dismisses
    while submitting.
  - Success: `Alert` + form reset + close. Failure: `Alert` with the
    error message; form data preserved so the user can retry.
  - `addEvent` is currently stubbed (600 ms latency). Swap
    `addEventStub` for the real `addEvent` import once Brandon's
    `app/services/eventService.ts` lands — one line.
- [x] **C5** Responsive QA pass
  - Static contrast check on every theme color pair used in Track C
    surfaces. All pass WCAG AA (≥4.5:1 for normal text). Lowest is
    placeholder/error text at **4.83:1**, well above threshold.
  - Manual checklist for Bryan to verify on web / iOS portrait /
    iOS landscape — see "Test plan" below.
- [x] **C6** README update
  - New sections: tech stack, prerequisites, PowerShell + bash setup
    steps, Firebase Web config walkthrough, project layout tree, dev
    commands, known-limitations punch list, team workflow rules.
  - Added `.env.example` so contributors know which Firebase keys to
    populate. `.env` and `.env.*` are gitignored (with `.env.example`
    whitelisted).

## Test plan

- [ ] `npx expo start` — clean boot, no red-screen errors.
- [ ] **Web** (`w`): map renders; side menu opens/closes; both modals
  open and dismiss via X, backdrop tap, and Esc.
- [ ] **iOS portrait** (Expo Go on a phone or Simulator):
  - SDSU Maps banner sits below the notch / Dynamic Island.
  - The campus map fills the available area with no horizontal scroll
    and no white gap under it.
  - Floating Add Event button is above the home indicator, not behind it.
  - Pinch-zooming the map cannot shrink it below the container size.
- [ ] **iOS landscape**: side menu remains usable; Add Event modal
  doesn't overflow.
- [ ] **Add Event flow**: required-field errors render in red below
  each field after the first submit attempt; Submit shows a spinner
  and disables itself; tapping twice rapidly does not fire two writes.
- [ ] **Hardware back (Android)**: dismisses each modal cleanly.
- [x] `npx tsc --noEmit` — clean (preserves baseline).

## Coordination notes

- **@mlong5 (Matt)**: pin coords are now proportional, so a future
  image swap is alignment-safe as long as aspect ratio is similar. No
  scaling work needed unless aspect ratio changes materially.
- **@brandon**: `AddEventModal.handleSubmit` calls `addEventStub`. Once
  `app/services/eventService.ts` exports `addEvent(payload)`, replace
  the stub import with the real one. The form already shapes
  `EventInput` with `title / description / location / clubName /
  startDate / endDate`.
- **@talan**: `app/components/EventList.tsx` still hardcodes `#CC0033`,
  `darkgray`, `#222`, `#333334`, `#555`. When you next touch that file,
  consider importing from `app/constants/theme.ts` to stay aligned with
  the rest of the UI. Did **not** edit it here per the "don't touch
  other tracks' files" rule.
- **Brand color**: Theme uses official SDSU red **#A6192E** (PMS 200),
  not the team plan's #CC0033. Tell me if you want it switched — it's
  a one-line change in `app/constants/theme.ts`.

## Out of scope / follow-ups

- App icon (`assets/images/icon.png`) is the Expo default; needs a
  designed mark. Not included here — needs design input.
- Native date picker (`@react-native-community/datetimepicker`) for the
  Add Event form. Currently text fields with format validation. Will
  add once data layer is in place.
- Auth on the Add Event flow.
- Screenshots in README — added once portrait look is verified on a
  physical device.

## Merge plan

Squash-merge to `master`, per team workflow. Reviewer: @mlong5.
