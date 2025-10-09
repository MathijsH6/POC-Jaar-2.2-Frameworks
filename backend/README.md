Backend (Node + TypeScript)

Project structuur follows Onion Architecture:

- src/domain: Domain entities (pure classes)
- src/application: Use-cases, services, DTOs
- src/infrastructure: DB, external APIs, repositories
- src/presentation: Express controllers, routes

Setup:
1. cd backend
2. npm install
3. npm run dev

Notes:
- Install dependencies if npm install isn't run yet.