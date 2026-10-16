# Inventory web application frontend

This folder is the Vercel-ready frontend for the inventory application. Set Vercel's project root to this `frontend` directory.

```text
Vercel
  └── Frontend GUI (this folder)

Render
  └── Laravel API
  └── PostgreSQL database

Firebase
  └── Authentication
  └── File storage for Excel uploads
```

## Local use

Open `index.html` directly to use the local sample-data mode. Inventory search, pagination, workspace navigation, salary records, CSV export, and responsive UI work without a backend.

To connect the frontend to Laravel, set `window.APP_CONFIG.apiBaseUrl` in `config.js` or replace it during deployment with the Render API URL. The frontend expects these API endpoints:

```text
GET    /api/inventory
POST   /api/inventory/import
GET    /api/inventory/export
GET    /api/employees
```

The client sends a bearer token when `sessionStorage.inventory_api_token` is present. Firebase Admin/service-account credentials must remain on Render and must never be added to this frontend.

## Deployment

1. Import the repository into Vercel and set the project root to `frontend`.
2. Update `assets/config.js` with the deployed Laravel API URL, or add a build step that injects your Vercel environment variable.
3. Deploy the Laravel API separately on Render.
4. Configure Laravel CORS to allow the Vercel domain.
5. Configure Firebase Authentication and Firebase Storage in the Laravel API or a trusted server-side integration.
