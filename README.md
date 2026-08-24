# Together

A private, local-first relationship reflection app for two partners sharing one device. Together uses guided check-ins and neutral, deterministic comparison rules—never diagnosis or automated therapy.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run unit tests with `npm test`, the production check with `npm run build`, and the browser flow with `npm run test:e2e`.

## Project structure

- `app/` — routed Next.js screens, responsive styling, and full check-in flow
- `components/` — shared app state and reusable UI primitives
- `lib/questions.ts` — 35 categorized seed prompts and small-action library
- `lib/summary.ts` — deterministic rating comparison and conversation logic
- `lib/storage.ts` — versioned, corruption-tolerant browser persistence
- `tests/` — unit tests for summary rules
- `e2e/` — full sequential two-partner check-in test

## Local storage schema

One key, `together.app.v1`, stores an `AppData` object:

```text
settings: { checkInFrequency, privateMode, partnerNames, lastCheckInDate? }
sessions[]: {
  id, type, createdAt, completedAt?, partners[], questionIds[],
  answers[]: { questionId, partnerId, value },
  sharedIntention?: { shared, actionA, actionB, nextDate? }
}
```

No account or backend is used. Data remains in the current browser, can disappear when browser storage is cleared, and may be visible to anyone with access to the device.

## Design and safety

The interface uses inclusive language, visible focus states, labelled controls, and a calm responsive layout. Potential danger-related words trigger a supportive notice without attempting crisis assessment. The Support and safety page explains when joint exercises may be inappropriate.

## Future improvements

Optional encrypted cloud sync, separate private partner links, end-to-end encrypted accounts, localization, a professional directory, downloadable summaries, calendar integration, user-controlled AI reflections, and shared/private journaling modes.
