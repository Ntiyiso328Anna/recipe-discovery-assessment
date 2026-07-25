# Technical assessment checklist

## Stage 1 — Foundation

- [x] Inspect the existing workspace and Git state.
- [x] Confirm Vue 3, Vite, Vue Router and Pinia are available.
- [x] Create an API service layer for recipe list and detail requests.
- [x] Configure the Vite development proxy for the Afrihost API.
- [x] Establish Pinia recipe state: recipes, selected recipe, loading and errors.
- [x] Add reusable loading, empty and error state components.
- [x] Verify the development command and production build.

## Stage 2 — Routing and data integration

- [ ] Connect the listing view to the service-backed store.
- [ ] Connect the detail view to the selected recipe state.
- [ ] Render loading, empty and error states in both routes.
- [ ] Confirm navigation and direct-link route behaviour.

## Stage 3 — Figma implementation

- [ ] Match the home/listing screen at mobile size.
- [ ] Match the recipe detail ingredients screen.
- [ ] Match the recipe detail instructions state.
- [ ] Apply the supplied Sofia Pro font assets.
- [ ] Add responsive desktop behaviour without changing the mobile design intent.
- [ ] Check keyboard, focus and image alternative text behaviour.

## Stage 4 — Completion

- [ ] Update the README with setup, architecture, routes, store and CORS proxy details.
- [ ] Run a production build.
- [ ] Review Git status and commit the assessment changes.
