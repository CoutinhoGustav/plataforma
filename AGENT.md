# AGENT.md — plataforma (IBRC)

Repository agent for `projects/igreja/plataforma`.

Work context (plans, status, history) lives in the vault, not here:

```text
vault/01 - Work/igreja/plataforma/
```

Read that folder (and `tasks/<ID>/` when a ticket exists) before implementing.

This file owns coding conventions, architecture, build, and deploy for this repo.

---

## Layout

```text
plataforma/
  frontend/         Vite + React 19 (JavaScript)
  backend-nest/     NestJS 11 + TypeORM + Postgres
  AGENT.md          this file
```

Two independent npm packages. There is no root `package.json`. Run commands inside `frontend/` or `backend-nest/`.

Do not invent a third app or a monorepo tool (pnpm-workspace, turbo, nx).

---

## Architecture

```text
Vite React (:5173)
  AuthContext + localStorage (authToken, user)
  Axios services in frontend/src/services/
  config.useMock from VITE_USE_MOCK (true unless the value is the string "false")
NestJS (:3000)
  JWT auth — POST /auth/login, POST /auth/register
  TypeORM, synchronize: false, migrations in backend-nest/src/migrations/
  Postgres 15 (docker compose)
```

Active Nest modules (`backend-nest/src/app.module.ts`):

- `alunos`
- `turmas`
- `developers`
- `admin` (auth, users, database migrations endpoint)

Present on disk but **not** imported in `AppModule` (inactive until wired):

- `assembly`
- `attendances`
- `system-status`
- `events`

Do not call those inactive HTTP routes as if they were live. To activate one, import its module in `AppModule` and say so in the vault task.

---

## Frontend conventions

- Language: JavaScript (`.js` / `.jsx`). Do not convert the app to TypeScript unless a task asks for it.
- UI: React 19, React Router v7, Tailwind CSS 4, lucide-react.
- Pages in `frontend/src/pages/`. Shared UI in `frontend/src/components/`.
- API access goes through `frontend/src/services/*`. Pages and components do not call Axios directly.
- Reuse `useCrud` / `useApiCall` from `frontend/src/hooks/useApi.js` for list/CRUD screens.
- Auth: `AuthContext`. Protected routes: `ProtectedRoute` + `MainLayout`.
- Env: `frontend/.env.local` from `.env.example`. Keys: `VITE_API_URL`, `VITE_USE_MOCK`.
- Token keys: `authToken` and `user` in `localStorage` (`frontend/src/config.js`).

Routes:

| Path | Auth | Page |
|---|---|---|
| `/login` | public | Login |
| `/cadastro` | public | Cadastro |
| `/` | protected | Dashboard |
| `/turmas` | protected | Turma |
| `/usuarios` | protected | Usuarios |
| `/configuracoes` | protected | Config |

---

## Backend conventions

- Language: TypeScript. NestJS 11. Node `24.x`.
- One module per domain under `backend-nest/src/<domain>/` (`*.module.ts`, `*.controller.ts`, `*.service.ts`, `entities/`).
- Controllers stay thin. Persistence stays in services + TypeORM entities.
- Auth: `@nestjs/jwt` + `passport-jwt`. Guards: `JwtAuthGuard`, `AdminRoleGuard`.
- New self-registered users: `role: 'user'`, `isApproved: false`. Only admin approves.
- Do not turn `synchronize` on. Schema changes are migrations.
- CORS is currently `origin: '*'`. Do not widen it further. Narrowing it is allowed if a task asks.
- Body parser limit is 50mb in `main.ts` (avatar uploads). Keep that if you touch bootstrap.
- Env: never commit `.env` / `.env.dev`. Document keys only in `.env.example`.
- `GET /` is a health JSON response, not a Nest controller.

HTTP surface that is actually mounted:

| Prefix | Role |
|---|---|
| `/auth/*` | login, register, profile, users, approve, roles |
| `/alunos` | CRUD alunos |
| `/turmas` | CRUD turmas |
| `/developers` | CRUD developers |
| `/database/migrations/run` | run migrations (admin module) |

---

## Commands

Frontend:

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

Backend:

```bash
cd backend-nest
npm install
npm run start:dev
npm run migration:run
npm run migration:generate -- src/migrations/NomeDaMigration
```

Postgres (dev compose reads `.env.dev`):

```bash
cd backend-nest
docker compose up -d
```

Vault copy of these commands: `vault/01 - Work/igreja/plataforma/03 Commands - plataforma.md`.

---

## Testing

Neither package.json defines a test script today.

Do not claim tests passed. If you add tests, add the runner and a script in the same change (`frontend` and/or `backend-nest`), and document the command in the vault Commands note.

---

## Deployment

- Frontend: Vite build + `frontend/vercel.json` SPA rewrites. Vercel project `plataforma-r3iz`.
- Backend: NestJS `src/main.ts` as Vercel Function (Fluid). No `api/` + `serverless-http`. Project `plataforma`.
- Push to `main` deploys both. Preview deploys on other branches/PRs.
- Local Postgres only: `backend-nest/docker-compose.yml`. Do not add a VPS/Traefik/Docker production stack unless a task asks for it.

Do not change deploy targets in the same PR as a feature unless the task is about deploy.

---

## Secrets

- Never write secrets into the vault or into this file.
- Local secrets: `frontend/.env.local`, `backend-nest/.env` / `.env.dev`.
- `.env.example` lists names only.

---

## Agent working rules

1. Identify the vault task folder when the work is ticket-shaped. Create it before coding if it is missing.
2. Touch only the app the task needs (`frontend` or `backend-nest`). Cross-app changes need a reason in the task plan.
3. Keep changes minimal. Do not add compatibility shims or new frameworks unless asked.
4. Match the style of the file you edit (quotes, imports, names in Portuguese vs English).
5. After a meaningful session, append `vault/01 - Work/igreja/plataforma/tasks/<ID>/history.md` and refresh `status.md`. If there is no task folder, append `05 Development Log - plataforma.md`.
6. Update `frontend/README.md` only if setup/run behavior changed.

---

## Quick checklist

- [ ] Vault task folder read or created (if ticket-shaped)
- [ ] Change scoped to `frontend/` and/or `backend-nest/`
- [ ] Inactive Nest modules left unwired unless the task activates them
- [ ] Migrations used instead of `synchronize`
- [ ] No secrets committed
- [ ] Mock vs real API (`VITE_USE_MOCK`) considered if the UI talks to the API
