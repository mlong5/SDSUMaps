# SDSU Maps — Group 4 Task Board

**Course:** CS 250 &nbsp;|&nbsp; **Code deadline:** May 10, 2026 &nbsp;|&nbsp; **Presentation:** May 13, 2026

This doc is the single source of truth for who owns what. Update the
checkboxes as you finish things and push to your branch.

---

## Team & Branches

| Owner   | Track                                | Branch                              |
|---------|--------------------------------------|-------------------------------------|
| Brandon | A — Database & Backend (Firebase)    | `feature/brandon/firebase-backend`  |
| Talan   | B — Event Display & Side Menu        | `feature/talan/event-display`       |
| Bryan   | C — UI Polish, Map Upgrade, iOS Fix  | `feature/bryan/ui-polish-map`       |
| Matt    | D — Pins, Locations, Integration Lead| `feature/matt/pins-integration`     |

**Merge lead:** Matt. All branches merge into `feature/integration` first,
then into `master` once the end-to-end flow passes.

---

## Phase 1 — Setup & Orientation (Apr 28–29) — ALL TEAM

- [ ] Clone repo, run `npm install`, confirm `npx expo start` loads the app
- [ ] Read every file in `app/` before editing anything
- [ ] Brandon: create Firebase project "SDSUMaps", enable Firestore + Auth,
      share `firebaseConfig` (do **not** commit keys — use `.env`)
- [ ] All: open a GitHub issue per task section below and self-assign

---

## Track A — Brandon (Backend)

Branch: `feature/brandon/firebase-backend`

- [ ] **A1** `app/utils/firebase.ts` — initialize Firebase JS SDK from `.env`
- [ ] **A2** Firestore schema for `events` collection (document in
      `docs/DATA_SCHEMA.md`)
- [ ] **A3** `app/services/eventService.ts` — `addEvent()` wired into the
      Add Event modal in `app/index.tsx`
- [ ] **A4** `getActiveEvents()` filters by `expiresAt > now`
- [ ] **A5** Replace strict text date inputs with
      `@react-native-community/datetimepicker`
- [ ] **A6** Jest tests for `addEvent` (valid + invalid) and
      `getActiveEvents` (expiry filter)

**Deliverables:** working `eventService.ts`, schema doc, date picker on the
form, Jest run green.

---

## Track B — Talan (Event Display)

Branch: `feature/talan/event-display`

- [ ] **B1** `app/utils/mockEvents.ts` — 4–5 mock events matching A2 schema
- [x] **B2** `app/components/EventList.tsx` — card list sorted by time
- [ ] **B3** Wire `EventList` into `app/sideMenu.tsx`; add loading + empty
      states
- [ ] **B4** `app/pinDetails.tsx` — filter events to the tapped pin's
      location (use `app/constants/locations.ts` from D3 for exact strings)
- [ ] **B5** Swap mock data for `getActiveEvents()` once A4 lands
- [ ] **B6** Render and filter tests; manual run via `npx expo start`

**Deliverables:** event list visible in side menu and pin modal, live data
once A4 ships, no hardcoded `Aztec Game Lab` placeholder rows.

---

## Track C — Bryan (UI / Map / iOS)

Branch: `feature/bryan/ui-polish-map`

- [x] **C1** Source updated SDSU campus map image, save as
      `assets/images/sdsu_campus_map.jpg`, switch `app/index.tsx` from the
      external `ontheworldmap.com` URL to the local asset
      &nbsp;— *initial commit done; replace with a higher-res export from
      https://map.sdsu.edu before final submission*
- [ ] **C2** Fix iOS portrait layout — `useWindowDimensions()` is already
      in place, but verify `mapHeight` and `ScrollView` behave on rotation;
      fix the map `contentFit` if pins drift
- [ ] **C3** UI polish: SDSU scarlet (`#CC0033`) accents, ≥44pt touch
      targets, clean navbar, dismiss buttons on every modal
- [ ] **C4** Add Event form polish: labels, validation indicators, Cancel
      button (already present — style it), submit spinner, success toast
- [ ] **C5** Layout pass on web / iOS portrait / iOS landscape
- [ ] **C6** Update `README.md` with Firebase `.env` setup, screenshots,
      file map

**Deliverables:** clean UI, no portrait-iOS layout breakage, polished
README with screenshots.

---

## Track D — Matt (Pins & Integration)

Branch: `feature/matt/pins-integration`

- [ ] **D1** Audit current pins in `app/index.tsx`, write
      `docs/pins_list.txt` (PinID | Location | x | y | Notes)
- [ ] **D2** Add 5–10 missing campus pins (Student Union, Love Library,
      GMCS, ENS, Viejas, etc.) — aim for 10–15 total
- [ ] **D3** `app/constants/locations.ts` — shared `LOCATIONS` map so pin
      labels and Firestore `location` strings always match
- [ ] **D4** Integration merge: Brandon → Talan → Matt → Bryan, run
      `npx expo start` after each merge
- [ ] **D5** End-to-end flow test (open app → tap pin → see events → add
      event → confirm it shows up → confirm expired events are hidden)

**Deliverables:** ≥10 pins, shared locations constant, green integration
branch, signed-off E2E checklist.

---

## Shared Conventions

- **New folders to create as needed:** `app/components/`, `app/services/`,
  `app/utils/`, `app/constants/`, `docs/`
- **Never commit:** `.env`, Firebase API keys, anything in `node_modules/`
- **Branch flow:** branch off `master` → push → PR → Matt reviews → merge
  into `feature/integration` first, then into `master`
- **Daily standup (async, group chat):** yesterday / today / blockers

---

## Timeline

| Date          | Milestone                                                  |
|---------------|------------------------------------------------------------|
| Apr 28–29     | Setup, Firebase project, GitHub issues opened              |
| Apr 30        | Mock data ready, schema written, individual tracks started |
| May 1–3       | Core features land on each branch                          |
| May 4–5       | Real Firestore wired in; cross-track coordination          |
| May 5–6       | Matt runs integration merge                                |
| May 6–7       | E2E testing, bug fixes                                     |
| May 8         | Final polish, code freeze prep                             |
| May 9         | Demo rehearsal, presentation script                        |
| May 10        | **Code deadline** — final push to master                   |
| May 13        | **Presentation day**                                       |

Speaking parts (5–7 min): Bryan intro + map, Brandon backend, Talan event
display, Matt pins + integration story.
