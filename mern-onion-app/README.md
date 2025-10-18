# MERN Onion Architecture — Proof of Concept

Korte samenvatting

- Full‑stack POC gebouwd met Node/Express (backend) + TypeScript + MongoDB (Atlas) + Vite + React (frontend).
- Opgezet volgens Onion‑architecture principes: scheiding van domain, application (services), infrastructure (persistence, http) en presentation (frontend).
- Doel: browsen, zoeken en bewaren van keuzemodules; thema's, toegankelijkheid en favorieten aanwezig.

Quick links

- Frontend folder: `frontendd/`
- Backend folder: `backend/`
- Startpunt backend source: `backend/src/index.ts`
- Frontend entry: `frontendd/src/main.tsx`

Belangrijkste features

- Authenticatie (register / login / JWT)
- Keuzemodules: list, detail, filters
- Favorieten per gebruiker
- Theming (light / dark / colorblind)
- Frontend kan door de backend geserveerd worden (single host) of los gehost op static hosting.

Locales / Talen

- I18n aanwezig (Nederlands & Engels). Standaard talen in `frontendd/src/contexts/I18nContext.tsx`.

Snelstart — lokaal (ontwikkelomgeving)

1. Backend dependencies installeren

   - Open terminal in `backend/`
   - npm install

2. Frontend dependencies installeren

   - Open terminal in `frontendd/`
   - npm install

3. Voor development: start frontend en backend los

   - Backend (development): vanuit `backend/`:
     - npm run dev (of npm start afhankelijk van package.json)
   - Frontend (Vite): vanuit `frontendd/`:
     - npm run dev

4. Seed sample data (optioneel)
   - Er is een seed script: `backend/src/scripts/seedKeuzeModules.ts`
   - Draai dit lokaal via node/ts-node als gewenst (voorbereid je local MongoDB / Atlas connection).

Build & run single host (backend serveert frontend)

1. Build frontend:

   - from repo root or inside `frontendd/`:
     - npm run build
   - Dit produceert `frontendd/dist`

2. Build/compile backend (TypeScript):

   - from `backend/`:
     - npm run build
   - Zorg dat de gecompileerde output (`backend/dist`) aanwezig is.

3. Start backend zodat het de statische frontend serveert:
   - node backend/dist/index.js
   - Of gebruik de Startup Command in Azure: `node backend/dist/index.js`

Deployment (Azure — korte aanwijzingen)

- Aanbevolen: gebruik Azure App Service voor de Node backend en serve static frontend via de backend (single artifact), of gebruik Azure Static Web Apps / Storage voor frontend en App Service voor backend.
- Belangrijke aandachtspunten:
  - Zorg dat tijdens build de juiste VITE environment variable is ingesteld voor API‑basis-URL: `VITE_API_URL` (gebruik GitHub Secrets in CI).
  - Startup Command voor App Service (Linux) indien je het ZIP‑artifact deployt: `node backend/dist/index.js`
  - Deployment Center kan automatisch bouwen; controleer logs in Deployment Center / Kudu als deploy faalt.
  - Als publish profile niet beschikbaar is (basic auth disabled), gebruik Service Principal / `azure/login` in GitHub Actions of Deployment Center direct via GitHub OAuth.

CI / GitHub Actions (tips)

- Voeg `package-lock.json` toe in backend en frontend voor reproduceerbare builds (maakt `npm ci` betrouwbaar).
- Geef workflow permissions: `id-token: write` als je OIDC gebruikt met `azure/login`.
- Voor Linux runners: zorg dat bestandsnamen en import strings exact dezelfde case hebben (case‑sensitivity).

Veelvoorkomende issues & quick fixes

- TypeScript TS2307 “Cannot find module …” in Actions but not locally (Windows):
  - Meest voorkomende oorzaak: case‑sensitive file name mismatch. Controleer exacte bestandsnamen en imports.
  - Tijdelijke workaround: `// @ts-ignore` boven importregels — niet aanbevolen als permanente oplossing.
- "You do not have permission to view this directory or page." in Azure:
  - Meestal omdat backend process crashed on startup (TS build errors). Inspecteer Log stream & Kudu, fix TS errors, en zorg dat startup command verwijst naar bestaande JS entrypoint.
- CORS: zet frontend origin in backend CORS config of gebruik `*` tijdelijk tijdens testen.

Project structuur (kort)

```
mern-onion-app/
├─ backend/           # TypeScript Express backend (src => dist after build)
└─ frontendd/         # Vite + React frontend
```
