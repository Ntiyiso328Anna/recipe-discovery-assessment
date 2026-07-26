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

- [x] Fetch the selected recipe through the route ID and Pinia store.
- [x] Build reusable hero, back button, nutrition, ingredient and method components.
- [x] Add loading, error and not-found states.
- [x] Match the Figma ingredient and instruction states.
- [x] Preserve the listing screen and support direct detail URLs.

## Stage 4 - Completion

- [x] Review keyboard, focus and image alternative text behaviour.
- [x] Run a final production build.
- [x] Review Git status and commit the assessment changes.
