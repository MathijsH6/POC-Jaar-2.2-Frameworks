Testplan voor POC

Doel: Verifiëren van core flows: gebruikers, projecten en taken.

Te testen features:
- User registratie / CRUD
- Project aanmaken / ophalen / updaten / verwijderen
- Task aanmaken / toewijzen aan project / status togglen / verwijderen
- API integratie tussen frontend en backend

Testtypes:
- Unit tests: Domain logic (TypeScript, Jest)
- Integration tests: Repositories and Mongoose (in-memory MongoDB)
- E2E tests: Minimal Cypress/Playwright flow: create user -> create project -> add task

Acceptatiecriteria:
- Unit tests: 90%+ for domain logic
- Integration: all repos CRUD pass
- E2E: 3 main flows pass

Testdata & setup:
- Use a test database or in-memory MongoDB for CI
- Fixtures for users/projects/tasks

Prioriteit:
1. Unit tests for domain
2. Integration tests for repositories
3. E2E smoke tests for major flows