# Career Intel

A Vite and React application organised as a modular monolith. Each functional area owns its views, types, and API client under `src/modules`. The root router maps URLs to module views, and the root page links to every view for review.

## Current module: Profile

`src/modules/profile` follows the feature module layout in `agents.md`:

- `api/` contains profile network requests.
- `components/` contains UI shared by Profile views.
- `hooks/` contains profile state, context, and reusable business logic.
- `view/` contains the profile overview, onboarding steps, CV review, preferences, edit, and the root view used for user testing. Each view has its own `index.tsx` and `styles.css`.
- `types.ts` contains the module's TypeScript models.
- `profile.css` contains the module's shared visual rules. Colors come from variables in `src/styles/globals.css`.

`src/router.tsx` is the single route map.

The manual setup path is: start → experience → skills → education and credentials → preferences → final review → profile. The CV path is: start → upload → review imported details → preferences → final review → profile. Edit links lead back to the relevant Profile view.

The module API client calls `/api/profile` and `/api/profile/import`. Profile MSW responses live in `api/handlers.ts` and are registered by `src/mocks/handlers.ts`. The import currently returns a sample extracted profile independent of the document contents; it does not parse a CV. Mock profile changes persist in browser local storage to support page refresh during review. The backend can replace the MSW handlers without changing the views.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL and use the root page to explore the Profile views. Run `npm run build` and `npm run lint` to check the app.
