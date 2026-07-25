# Recipe discovery assessment

A Vue 3 implementation of the supplied recipe discovery screens.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The two routes are:

- `/` – recipe discovery/home
- `/recipes/1` – recipe detail

The Pinia store requests the supplied Afrihost endpoints. When the browser blocks those requests because of CORS, it displays the supplied recipe data as a graceful fallback, so the screens remain usable without a browser extension.

## Production check

```bash
npm run build
```
