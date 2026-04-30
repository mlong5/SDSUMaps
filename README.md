# SDSU Maps

An interactive campus map for San Diego State University, built in Expo +
React Native. Tap a pin to see what's happening on campus, browse the
events list, and post your own club event.

> CS 250 Group 4 project · Spring 2026

## What it does

- Renders the SDSU campus map with tappable event pins
- Pin details popup with backdrop tap / X close / hardware back dismissal
- Events side menu listing live events
- Add Event modal with labeled fields, inline validation, submit spinner,
  and success/failure feedback

## Tech stack

- [Expo](https://expo.dev) ~54 (React Native 0.81, React 19)
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based
  routing
- TypeScript (strict)
- [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context)
  for notch / home-indicator awareness
- [`expo-image`](https://docs.expo.dev/versions/latest/sdk/image/) for the
  campus map asset (better caching + format support than RN's built-in)
- Firebase Firestore (wiring lives on `feature/brandon/firebase-backend`)

## Group 4 — who's doing what

| Owner   | Track                                | Branch                              |
|---------|--------------------------------------|-------------------------------------|
| Brandon | Database & Backend (Firebase)        | `feature/brandon/firebase-backend`  |
| Talan   | Event Display & Side Menu            | `feature/talan/event-display`       |
| Bryan   | UI Polish, Map Upgrade, iOS Fix      | `feature/bryan/ui-polish-map`       |
| Matt    | Pins, Locations, Integration Lead    | `feature/matt/pins-integration`     |

See [`docs/TEAM_TASKS.md`](docs/TEAM_TASKS.md) for the full task board.

## Prerequisites

- Node 20.x or 22.x (LTS)
- npm 10+
- One of:
  - [Expo Go](https://expo.dev/go) on a physical iOS / Android device
  - Xcode 15+ (iOS Simulator)
  - Android Studio (Android Emulator)

## Setup

PowerShell (Windows):

```powershell
git clone https://github.com/BryanD17/SDSUMaps.git
cd SDSUMaps
npm install
Copy-Item .env.example .env
# Open .env and paste your Firebase Web config values
npx expo start
```

bash / zsh (macOS / Linux):

```bash
git clone https://github.com/BryanD17/SDSUMaps.git
cd SDSUMaps
npm install
cp .env.example .env
# Open .env and paste your Firebase Web config values
npx expo start
```

Once `npx expo start` is running, press:

- `i` — open in iOS Simulator
- `a` — open in Android Emulator
- `w` — open in a web browser
- Or scan the QR code with Expo Go on your phone

## Firebase configuration

1. Create a Firebase project at <https://console.firebase.google.com>.
2. Enable **Cloud Firestore** (test mode is fine for development).
3. Register a **Web app** in the project settings; copy its config.
4. Paste those values into `.env` (the file is gitignored):

   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   EXPO_PUBLIC_FIREBASE_APP_ID=...
   ```

`.env` and `.env.*` are gitignored (with `.env.example` whitelisted).
**Never commit your real Firebase keys.** If a key ever lands in a commit,
rotate it in the Firebase console and rewrite history with `git filter-repo`.

## Project layout

```
app/
├─ _layout.tsx                – root Stack + SafeAreaProvider
├─ index.tsx                  – main map screen, pins, modals composition
├─ image.tsx                  – thin expo-image wrapper (ImageC)
├─ pinDetails.tsx             – pin marker + tap → details
├─ sideMenu.tsx               – left-slide events list panel
├─ aboutScreen.tsx            – tagline banner pinned above bottom bar
├─ constants/
│  └─ theme.ts                – colors, spacing, radius, typography, tap
└─ components/
   ├─ AddEventModal.tsx       – labeled form, validation, submit spinner
   └─ EventList.tsx           – Talan's track: live event list
assets/
└─ images/                    – campus map, marker, app icons
```

## Screenshots

<!-- TODO(bryan): add 2–3 screenshots before May 10 — portrait map,
     event details modal, Add Event form. -->

## Known limitations

- The bundled campus map (`assets/images/sdsu_campus_map.jpg`) is a
  placeholder. A higher-resolution export from <https://map.sdsu.edu>
  should be dropped in before final submission. Pin coordinates are
  proportional, so swapping a similar-aspect image will not break alignment.
- Add Event currently writes to a 600 ms stub (`addEventStub` in
  `app/components/AddEventModal.tsx`). It will hit Firestore once
  Brandon's `eventService.ts` lands on `master`; replacing the stub is a
  one-line import swap.
- No authentication yet — anyone running the app can post an event.
  Auth is planned for a follow-up sprint.
- Date/time inputs are currently text fields with `YYYY-MM-DDTHH:MM`
  validation, not a native date picker; we'll add
  `@react-native-community/datetimepicker` after the data layer lands.
- App icon (`assets/images/icon.png`) is the Expo default; needs a
  designed mark before submission.

## Development commands

```bash
npm run start    # expo start
npm run android  # expo start --android
npm run ios      # expo start --ios
npm run web      # expo start --web
npm run lint     # expo lint
npx tsc --noEmit # type-check without building
```

## Team workflow

- Each track works on its own `feature/<owner>/<topic>` branch.
- Open a PR against `master`. Matt is the merge lead and uses **squash
  merge** so `master` history stays linear.
- Never push directly to `master`; never `git push --force` (use
  `--force-with-lease` on your own feature branch only, after a rebase
  you initiated).
