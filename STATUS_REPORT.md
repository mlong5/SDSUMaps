# SDSU Maps — Team Status Report

_Auto-generated 2026-04-30 | Master @ `d100e9a` | Sweep branch:_
_`chore/bryan/team-status-sweep`_

> Source of truth for this report: `docs/TEAM_TASKS.md` (after sync) and the
> raw audit at `.agent/audit.json` (gitignored). Every ✅ and ⚠️ below has a
> file path or commit sha behind it. Nothing is guessed.

## TL;DR

10 days to code freeze (May 10). One track is done, one is not started, one
has only the easy task done, one has only env scaffolding. **The team is
behind**, and Brandon + Matt are on the critical path for everyone else.

| Teammate | Track | On track? | Done | Partial | Not done | Notes |
|----------|-------|-----------|------|---------|----------|-------|
| Bryan    | C — UI / map / iOS  | ✅ on-track | 4 | 1 | 0 (1 unverified) | C1 partial (low-res asset), C5 awaiting walkthrough |
| Talan    | B — event display   | ⚠️ lagging | 3 | 0 | 3 | B5 hard-blocked on Brandon (A4); B4 hard-blocked on Matt (D3) |
| Brandon  | A — backend         | 🚫 critical-path blocker | 0 | 0 | 6 | branch only has `.env.example` + `.gitignore`; no Firebase code |
| Matt     | D — pins / integration | 🚫 critical-path blocker | 0 | 0 | 5 | branch `feature/matt/pins-integration` does not exist on origin |

"On track" thresholds (today is 2026-04-30; freeze May 10):

- ✅ ≥ 80% of own track Done
- ⚠️ 50–79% Done
- 🚫 < 50% Done OR a critical-path task (A1 / A3 / A4 / D3 / D4) not done

## Per-track detail

### Track A — Brandon ([@brandonwms120](https://github.com/brandonwms120))

- **Branch:** `feature/brandon/firebase-backend` @ `a1350f2` (1 commit ahead of master, _12 behind_).
- **Last activity:** 2026-04-29 21:51 — "Add Firebase env template and ignore .env"
- **Diff vs master:** `.env.example` (added), `.gitignore` (modified). **No Firebase code, no service layer, no schema doc, no tests.**

| Task | Status | Evidence |
|------|--------|----------|
| A1 `app/utils/firebase.ts` | 🚫 NotDone | file does not exist |
| A2 `docs/DATA_SCHEMA.md` | 🚫 NotDone | file does not exist |
| A3 `eventService.addEvent` | 🚫 NotDone | file does not exist; `AddEventModal.handleSubmit` still calls `addEventStub` |
| A4 `getActiveEvents` | 🚫 NotDone | file does not exist |
| A5 `@react-native-community/datetimepicker` | 🚫 NotDone | not in `package.json` deps |
| A6 Jest tests | 🚫 NotDone | no `*.test.*` files; no `test`/`jest` script |

**What's blocking him:** likely just hasn't started. Branch protection wasn't in place; the env-template commit was 30+ hours ago.

**Outreach scaffolded:** 6 per-task issues + 1 tracking issue + 1 PR comment template (see `.agent/outreach/01-06`, `19`, `22`).

---

### Track B — Talan ([@Kyzzo](https://github.com/Kyzzo))

- **Branch:** `feature/talan/event-display` @ `7c7a8b8` (0 commits ahead of master — fully merged via earlier PR; 11 behind).
- **Last activity:** 2026-04-29 19:55 — "Add EventList component (B2)"
- **Diff vs master:** none. EventList.tsx is on master.

| Task | Status | Evidence |
|------|--------|----------|
| B1 `app/utils/mockEvents.ts` | 🚫 NotDone | file does not exist |
| B2 `EventList.tsx` | ✅ Done | `app/components/EventList.tsx` on master |
| B3 EventList wired into `sideMenu.tsx` | 🚫 NotDone | `sideMenu.tsx` uses an in-file `PLACEHOLDER_EVENTS` array; no `EventList` import; no `ActivityIndicator` / empty-state |
| B4 `pinDetails.tsx` filters events | 🚫 NotDone | only fires a static `Alert.alert('Gym Club…')`; no `events.filter`, no "See All" link |
| B5 swap mock for `getActiveEvents` | 🚫 NotDone (blocked by A4) | `getActiveEvents` not referenced anywhere |
| B6 tests | 🚫 NotDone | no test files |

**What's blocking him:** B5 is hard-blocked on Brandon's A4. B4 is hard-blocked on Matt's D3 (`locations.ts` shared map). B1, B3, B6 are unblocked and can be done today.

**Outreach scaffolded:** 5 per-task issues + 1 tracking issue (see `.agent/outreach/07-11`, `20`).

---

### Track C — Bryan ([@BryanD17](https://github.com/BryanD17))

- **Branch:** `feature/bryan/ui-polish-map` @ `f472bf6` (1 commit ahead — the `pr_body_track_c.md` follow-up; everything else merged via PR #2).
- **Latest merge:** `d100e9a` (PR #2 squashed into master).

| Task | Status | Evidence |
|------|--------|----------|
| C1 local SDSU map | ⚠️ Partial | image present but **276×183 / 22 KB** — thumbnail-sized; needs higher-res export from <https://map.sdsu.edu> |
| C2 iOS portrait fix | ✅ Done | `useWindowDimensions` (`index.tsx:15`), `contentFit="contain"` (`index.tsx:74`), `SafeAreaView` wrap, `minimumZoomScale=1` |
| C3 SDSU theme + a11y | ✅ Done | `app/constants/theme.ts` (`#A6192E`), `onRequestClose` + `accessibilityLabel="Close…"` on every `Modal` |
| C4 Add Event UX | ✅ Done | `app/components/AddEventModal.tsx`: labeled fields, inline validation, `ActivityIndicator`, `Alert.alert` success/failure |
| C5 responsive walkthrough | ❓ Unverified | static contrast pass green; awaiting Bryan's `npx expo start` 3-surface walkthrough |
| C6 README | ✅ Done | 17 hits across `.env`/Firebase/`npm install`/`npx expo start`; project layout and known limits sections present |

**Outreach scaffolded:** 2 per-task issues (C1 follow-up, C5 sign-off) — see `.agent/outreach/12-13`. No tracking issue (Bryan is the lead, per prompt).

---

### Track D — Matt ([@mlong5](https://github.com/mlong5))

- **Branch:** `feature/matt/pins-integration` — **does not exist on origin.**
- **Last activity:** _none_
- **Diff vs master:** _n/a_

| Task | Status | Evidence |
|------|--------|----------|
| D1 `docs/pins_list.txt` | 🚫 NotDone | file does not exist |
| D2 ≥10 pins in `index.tsx` | 🚫 NotDone | only 2 pin sites (one `<PinDetails>` + one inline `<Pressable>`) |
| D3 `app/constants/locations.ts` | 🚫 NotDone | file does not exist; **Talan's B4 hard-blocked on this** |
| D4 `feature/integration` branch | 🚫 NotDone | branch does not exist on origin |
| D5 `docs/E2E_CHECKLIST.md` | 🚫 NotDone | file does not exist |

**What's blocking him:** likely hasn't started. With branch missing and zero commits, Track D is the highest schedule risk after Track A.

**Outreach scaffolded:** 5 per-task issues + 1 tracking issue (see `.agent/outreach/14-18`, `21`).

## Critical path watch

```
A1 (firebase.ts) ─┐
A3 (eventService) ┼─→ A4 (getActiveEvents) ─→ B5 (live data) ─→ demo
A2 (schema)      ─┘
                                              ▲
D3 (locations.ts) ─→ B4 (pin filter) ────────┤
                                              │
D4 (integration branch) ─→ E2E ──────────────┘
```

If Brandon doesn't ship A1+A3+A4 by **May 5**, Talan can't finish B5 and we
present with `addEventStub`. If Matt doesn't ship D3 by **May 4**, Talan
can't finish B4. Both are tight but doable.

## Map asset escalation (per SA2)

The current `assets/images/sdsu_campus_map.jpg` is **276×183 / 22 KB** — a
thumbnail. Pin placement at this resolution is imprecise and any printed
labels are unreadable. Bryan, please drop in a higher-res export from
<https://map.sdsu.edu> before final submission. Pin coords are proportional,
so a similar-aspect-ratio swap is alignment-safe with no code changes.

## Actions for Bryan (today)

- [ ] Review and squash-merge sweep PR `chore/bryan/team-status-sweep`.
- [ ] Apply branch protection on `master` (one-time, GitHub UI):
      Settings → Branches → Add rule for `master`:
      - ☑ Require a pull request before merging
      - ☑ Require approvals = 1
      - ☑ Require review from Code Owners
      - ☑ Require status checks to pass — select **`PR Guardrails / guard`**
      - ☑ Restrict pushes that create matching branches
      - ☐ Allow force pushes — leave OFF
      - ☐ Allow deletions — leave OFF
- [ ] Open the 22 outreach issues / comments from `.agent/outreach/` (paste
      from each numbered file into the GitHub web UI; INDEX.md has the table).
      Do these in order so tracking issues can reference per-task numbers.
- [ ] DM Brandon and Matt today — they're the critical-path blockers.
      Confirm they're not stuck or unaware; offer pairing.
- [ ] Replace the campus map placeholder with a higher-res export.
- [ ] Run `npx expo start` and complete the C5 walkthrough (web + iOS portrait + iOS landscape).

## Actions for the team

| Teammate | Tracking issue (after pasting) | First moves |
|----------|--------------------------------|-------------|
| Brandon  | from `.agent/outreach/19-tracking-brandon.md` | A1 → A2 → A3 → A4. A5 + A6 in parallel. |
| Talan    | from `.agent/outreach/20-tracking-talan.md`   | B1 + B3 + B6 are unblocked — start there. |
| Matt     | from `.agent/outreach/21-tracking-matt.md`    | Push the branch first (`git checkout -b feature/matt/pins-integration && git push -u origin`); then D1 + D3 are highest leverage. |
