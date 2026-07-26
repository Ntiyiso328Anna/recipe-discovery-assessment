# Recipe Discovery

A responsive Vue application implementing the two screens supplied in the Afrihost frontend
technical assessment. Recipe listing and detail data come from the provided JSON API.

## Features

- Responsive recipe discovery and recipe detail screens
- Route-based recipe navigation and direct detail URLs
- Pinia state management for recipe data, loading, empty and error states
- Ingredient and instruction tabs
- Expandable recipe descriptions
- API-driven ingredients, instructions and nutrition metadata
- Related-recipe selection based on shared recipe data
- Local Sofia Pro font files and accessible keyboard focus styles

## Technology

- Vue 3
- Vue Router
- Pinia
- Vite
- Modern CSS
- Prettier

## Local setup

Node.js 20.19 or newer is required.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The main routes are:

- `/` — recipe discovery
- `/recipes/:id` — recipe detail

## API and CORS

The app requests `/api/recipes.json` and `/api/recipes/:id.json`. During local development, Vite
proxies these requests to:

`https://www.afrihost.com/assessments/2603-fe-mid`

This avoids requiring a browser CORS extension while running the assessment locally. The proxy is
a development-server feature, so a separately hosted production build would require an equivalent
server-side proxy.

## Project structure

- `src/components` — reusable interface and asynchronous-state components
- `src/views` — home and recipe-detail screens
- `src/router` — application routes and scroll restoration
- `src/stores` — Pinia recipe state and actions
- `src/services` — JSON API boundary
- `src/assets` — supplied fonts and local visual assets

## Quality checks

```bash
npm run format:check
npm run build
```

To preview the generated production bundle:

```bash
npm run preview
```
