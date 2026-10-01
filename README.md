# Career Intel

A Vite and React application organised as a modular monolith. Each functional area owns its views, types, API client, and MSW handlers under `src/modules`. The root router maps URLs to module views. Components used across modules live under `src/shared`.

## Dashboard module

`src/modules/dashboard` provides the home page at `/`. It summarizes active applications, scheduled interviews, saved opportunities, opportunity alignment, and recurring undocumented skills. The dashboard reads `/api/dashboard`, an MSW summary composed from the current Profile, Opportunities, and Applications mock stores. Opportunity ranking uses explicit profile evidence across confirmed job criteria; recurring gaps appear when the same undocumented skill occurs in at least two confirmed opportunities. The former view index remains available at `/modules` for review.

## Job Opportunities module

`src/modules/job-opportunities` contains the opportunity list, job capture, requirement review, and opportunity detail views. Users paste a description and optional URL, then review and edit the extracted details and criteria before confirming. The detail view keeps the original description, confirmed requirements, profile match analysis, and notes together. Apply opens the original posting; users can then create an application record to track their progress. Archived roles can be restored.

`GET /api/jobs/:jobId/match` compares a confirmed opportunity with the saved Career Profile. Findings include the confirmed job criterion and the matching profile entry, or clearly say when profile evidence is absent. Experience duration counts overlapping dated roles once. Work authorization and other constraints remain for user review when preferences cannot prove eligibility. The mock extraction and comparison use deterministic rules, and salary suggestions are illustrative estimates. A backend can replace these handlers through the module API client.

Reusable page shell, form field, aside illustration, and review components are in `src/shared/components` and are also used by Profile.

## Applications module

`src/modules/applications` contains an active and closed application overview, opportunity conversion, and application detail. Each application links to one saved opportunity and has a stage, application date, progress history, important dates, interview records, and notes. Stage changes add a dated history entry. Applications are stored by MSW in browser local storage and can be updated through `/api/applications` endpoints. The related job analysis stays available from the application detail page.

## Profile module

`src/modules/profile` follows the feature module layout in `agents.md`:

- `api/` contains profile network requests.
- `components/` contains UI shared by Profile views.
- `hooks/` contains profile state, context, and reusable business logic.
- `view/` contains the profile overview, onboarding steps, CV review, preferences, edit, and the root view used for user testing. Each view has its own `index.tsx` and `styles.css`.
- `types.ts` re-exports shared Profile models from `src/shared/types/profile.ts` for use by the comparison module.
- `profile.css` contains the module's shared visual rules. Colors come from variables in `src/styles/globals.css`.

`src/router.tsx` is the single route map.

The manual setup path is: start → experience → skills → education and credentials → preferences → final review → profile. The CV path is: start → upload → review imported details → preferences → final review → profile. Edit links lead back to the relevant Profile view.

The module API client calls `/api/profile` and `/api/profile/import`. Profile MSW responses live in `api/handlers.ts` and are registered by `src/mocks/handlers.ts`. The import currently returns a sample extracted profile independent of the document contents; it does not parse a CV. Mock profile changes persist in browser local storage to support page refresh during review. The backend can replace the MSW handlers without changing the views.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL for the dashboard, or `/modules` to browse all views. Run `npm run build` and `npm run lint` to check the app.
