# Recipe discovery assessment

A Vue 3 recipe discovery assessment built with Vite, Vue Router and Pinia.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The two routes are:

- `/` – recipe discovery/home
- `/recipes/1` – recipe detail

## Architecture

- `src/router` contains the listing and recipe-detail routes.
- `src/stores/recipes.js` manages recipes, the selected recipe, loading and error state.
- `src/services/recipesApi.js` is the single boundary for recipe API requests.
- `src/components` contains reusable UI components and async state components.

## CORS in development

The app calls `/api/recipes.json` and `/api/recipes/:id.json`. Vite proxies `/api` to `https://www.afrihost.com/assessments/2603-fe-mid`, so a browser extension is not required during local development.

## Production check

```bash
npm run build
```
