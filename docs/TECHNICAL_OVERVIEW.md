# Technical overview — Admin Panel

## Summary

Vite **8** + **React 19** SPA with **Redux Toolkit Query** as the single HTTP layer, **Ant Design 6**, **Tailwind 4**, and a multi-service gateway configuration via `VITE_URL_*` env vars.

## Stack

| Layer | Choice |
| --- | --- |
| App | Vite 8, React 19, TypeScript |
| State / API | Redux Toolkit, RTK Query (`customBaseQuery` + `apiFactory`) |
| UI | Ant Design 6, Tailwind 4, MUI charts (selected views) |
| Auth | OTP admin login + Bearer tokens + refresh |
| Testing | Vitest, Cypress |
| Quality | ESLint, Prettier, Husky, Commitizen |

## Architecture

```
Browser (Vite)
  └─ AuthProvider + Redux store
       ├─ RTK API slices (auth, dormitory, food, wallet, …)
       │    └─ customBaseQuery
       │         ├─ VITE_USE_MOCK=true → resolveMockResponse
       │         └─ else → fetchBaseQuery → gateway
       └─ Role menu sidebar → feature pages
```

### Key paths

| Path | Role |
| --- | --- |
| `src/infrastructure/helpers/customBaseQuery/` | All HTTP + refresh |
| `src/infrastructure/states/redux/Apis/` | Endpoint definitions |
| `src/infrastructure/mock/` | Mock mode flag, auth, options, resolver |
| `src/pages/**` | Feature UI + colocated `@types` / `helper/mock` |
| `scripts/generateFeatureMocks.mjs` | Typed mock skeleton generator |

## Mock mode

See [MOCK_MODE.md](./MOCK_MODE.md). Single interception point in `customBaseQuery` keeps page churn low while option/list heuristics feed selects and tables.

## Environments

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Gateway root |
| `VITE_URL_AUTHENTICATION` / `VITE_URL_AUTH` | Auth services |
| `VITE_URL_DORMITORY`, `VITE_URL_FOOD`, `VITE_URL_WALLET`, … | Domain services |
| `VITE_USE_MOCK` | Local fixtures |

Copy `.env.example` → `.env.local` for local work. **Do not commit secrets.**

## Scripts

```bash
npm run local            # Vite on :3002
npm run type-check
npm run lint
npm run test
npm run generate:mocks
```
