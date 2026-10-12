# Flowboard — SaaS Project Management Starter

A production-minded monorepo starter for a project-management SaaS built with **Angular 20+**, **NestJS**, **PostgreSQL**, and **TypeORM**.

> Starter status: this repository provides a structured foundation and representative working flows. It has not been installed, built, or integration-tested in this generated environment. Run the verification checklist below before describing it as production-ready.

## Included

### Frontend (`apps/web`)
- Angular standalone components and `provideRouter` configuration
- Lazy-loaded feature route files
- Feature-first organization: dashboard, projects, tasks
- Shared shell, sidebar, page header, status badge, loading and error states
- Typed API models and a dedicated `ProjectsService`
- Reactive form for creating projects
- Responsive layout with desktop sidebar and mobile navigation
- HTTP interceptor for API base URL and consistent error propagation
- Unit test examples using Angular's test runner conventions

### Backend (`apps/api`)
- NestJS modules split by feature (`health`, `projects`)
- REST API with DTO validation, Swagger, CORS, and a global validation pipe
- TypeORM PostgreSQL configuration via environment variables
- Project entity, repository-backed service, controller and DTOs
- Pagination-ready project listing contract
- Jest unit test example
- Docker Compose PostgreSQL service

## Repository layout

```text
flowboard-saas-starter/
├── apps/
│   ├── web/                  # Angular 20+ frontend
│   └── api/                  # NestJS REST API
├── infra/
│   └── docker-compose.yml
├── .editorconfig
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 22 LTS or a Node version supported by your selected Angular/NestJS releases
- npm
- Docker Desktop (recommended for local PostgreSQL), or a PostgreSQL instance
- Git

## Configuration

### API

```bash
cd apps/api
cp .env.example .env
```

Update `DATABASE_URL` or the individual `DB_*` variables in `.env`. The example defaults are for local development only.

### Web

```bash
cd apps/web
cp .env.example .env
```

`src/environments/environment.ts` contains the API URL used by this starter. For deployment, configure environment replacement or your preferred runtime configuration strategy rather than committing secrets.

## Run locally

From the repository root:

```bash
docker compose -f infra/docker-compose.yml up -d
```

Start the API in one terminal:

```bash
cd apps/api
npm install
npm run start:dev
```

Start the Angular app in another terminal:

```bash
cd apps/web
npm install
npm start
```

- Angular: `http://localhost:4200`
- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api/docs`
- Health: `http://localhost:3000/api/health`
- PostgreSQL: `localhost:5432`

The frontend calls `GET /api/projects` and `POST /api/projects`. If the API is unavailable, the UI shows an error state with a retry action instead of silently pretending the request succeeded.

## Important database note

`synchronize: true` is enabled only when `NODE_ENV` is not `production` to make the starter easy to explore. Before production deployment:
1. Set `NODE_ENV=production`.
2. Add reviewed TypeORM migrations and a migration deployment step.
3. Disable schema synchronization in every environment used for real data.
4. Add authentication, tenant/workspace scoping, authorization and audit logging before exposing business data.

## Quality checklist before publishing

This ZIP was generated as source code and **was not installed or executed here**. After uploading to GitHub, verify it in your development environment or CI:

```bash
# API
cd apps/api
npm install
npm test
npm run build

# Web
cd ../web
npm install
npm test -- --watch=false
npm run build
```

Angular's test CLI flags can vary with the test runner selected by the installed Angular CLI version. If a command differs, use the `test` script from the generated `package.json` and the current Angular CLI documentation.

## Security and production hardening roadmap

This is a portfolio starter, not a finished multi-tenant production service. Before real users or customer data:
- Implement authentication (OIDC/OAuth2 or secure session/JWT design), refresh-token handling and password-reset flows if applicable.
- Add server-side authorization guards and workspace/tenant isolation on every query.
- Add migrations, rate limiting, structured logging, request IDs and monitoring.
- Configure secure CORS origins, HTTPS, secret management and database backups.
- Add pagination limits, API contract tests, accessibility checks and end-to-end tests.
- Add CSRF protections if using cookie-based authentication.
- Review privacy, retention, deletion and audit requirements.

## Suggested next features

1. Authentication and workspace onboarding
2. Workspace membership and role-based permissions
3. Task CRUD, comments, labels and activity feed
4. Kanban board with drag-and-drop
5. Due-date reminders and notifications
6. CI pipeline for lint, tests and build
7. Deployment to a managed PostgreSQL service and static hosting

## License

MIT — add a `LICENSE` file before redistributing this project publicly.
