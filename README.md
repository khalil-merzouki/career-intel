# Career Intel

A Vite and React application organised as a modular monolith. Each functional area owns its views, types, and API client under `src/modules`. The root router maps URLs to module views, and the root page links to every view for review.

## Current module: Profile

`src/modules/profile` contains the profile overview (`index.tsx`), onboarding steps, CV review, preferences, and edit views. `src/router.tsx` is the single route map. `src/RootPage.tsx` links to each view for user testing.

The manual setup path is: start → experience → skills → education and credentials → preferences → final review → profile. The CV path is: start → upload → review imported details → preferences → final review → profile. Edit links lead back to the relevant Profile view.

The API client calls `/api/profile` and `/api/profile/import`. MSW owns the mock responses in `src/mocks/handlers.ts`. The import currently returns a sample extracted profile independent of the document contents; it does not parse a CV. Mock profile changes persist in browser local storage to support page refresh during review. The backend can replace the MSW handlers without changing the views.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL and use the root page to explore the Profile views. Run `npm run build` and `npm run lint` to check the app.
