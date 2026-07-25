# Technical assessment checklist

## Stage 1 - Foundation

- [x] Inspect the existing workspace and Git state.
- [x] Confirm Vue 3, Vite, Vue Router and Pinia are available.
- [x] Create an API service layer for recipe list and detail requests.
- [x] Configure the Vite development proxy for the Afrihost API.
- [x] Establish Pinia recipe state: recipes, selected recipe, loading and errors.
- [x] Add reusable loading, empty and error state components.
- [x] Verify the development command and production build.

## Stage 2 - Recipe listing screen

- [x] Connect the listing route to the service-backed Pinia store.
- [x] Build reusable header, metadata, card and navigation components.
- [x] Render loading, empty and error states in the listing route.
- [x] Link recipe cards to `/recipes/:id`.
- [x] Match the Figma home layout for mobile and centred desktop presentation.

## Stage 3 - Recipe detail screen

- [ ] Connect the detail view to the selected recipe state.
- [ ] Match the recipe detail ingredients screen.
- [ ] Match the recipe detail instructions state.

## Stage 4 - Completion

- [ ] Update the README with setup, architecture, routes, store and CORS proxy details.
- [ ] Review keyboard, focus and image alternative text behaviour.
- [ ] Run a production build.
- [ ] Review Git status and commit the assessment changes.
