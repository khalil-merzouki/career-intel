# Career Intel

A Vite and React application organised as a modular monolith. Each functional area owns its views, types, API client, and MSW handlers under `src/modules`. The root router maps URLs to module views. Components used across modules live under `src/shared`.

## License

Career Intel is licensed under the [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0). Commercial use is not permitted under this license. If you redistribute this software, including a modified version or a project containing any part of it, include the license and preserve the required attribution notice in `LICENSE` so users can identify Career Intel and its author. This is source-available software, not OSI-approved open source. Third-party dependencies remain under their own licenses.

The repository previously used MIT. Changing the license does not revoke permissions already granted for copies distributed under MIT.

## Job Opportunities module

`src/modules/job-opportunities` contains the opportunity list, job capture, requirement review, and opportunity detail views. Users paste a description and optional URL, then review and edit the extracted details and criteria before confirming. The detail view keeps the original description, confirmed requirements, profile match analysis, and notes together. Apply opens the original posting; users can then create an application record to track their progress. Archived roles can be restored.

`GET /api/jobs/:jobId/match` compares a confirmed opportunity with the saved Career Profile. Findings include the confirmed job criterion and the matching profile entry, or clearly say when profile evidence is absent. Experience duration counts overlapping dated roles once. Work authorization and other constraints remain for user review when preferences cannot prove eligibility. The NestJS API in `../career-intel-server` keeps the deterministic comparison rules. Job detail extraction runs in the private Hono service in `../career-intel-ai`; any missing or uncertain information is reviewed before confirmation.

Reusable page shell, form field, aside illustration, and review components are in `src/shared/components` and are also used by Profile.

## Applications module

`src/modules/applications` contains an active and closed application overview, opportunity conversion, and application detail. Each application links to one saved opportunity and has a stage, application date, progress history, important dates, interview records, and notes. Stage changes add a dated history entry. Applications are stored by the NestJS API in PostgreSQL and can be updated through `/api/applications` endpoints. The related job analysis stays available from the application detail page.

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

The module API client calls `/api/profile` and `/api/profile/import`. The NestJS API extracts PDF and DOCX text and fills only an explicitly labeled role; users review and complete their profile. MSW handlers remain available for isolated UI demos with `VITE_USE_MOCKS=true`.

## Run locally

```sh
npm install
npm run dev
```

Start `../career-intel-server` first. Vite proxies `/api` to `http://127.0.0.1:3000` by default. Set `VITE_API_PROXY_TARGET` to use another API address, or `VITE_USE_MOCKS=true` to run with browser mocks.

Open the local URL and use the root page to explore the modules. Run `npm run build` and `npm run lint` to check the app.
