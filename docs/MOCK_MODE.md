# Mock mode

Local development runs without the live API gateway by default.

## Flag

No local environment file is required. Mock mode is enabled whenever
`VITE_USE_MOCK` is omitted or set to `true`. Restart Vite after changing it.

When enabled, `customBaseQuery` returns fixtures from `src/infrastructure/mock/` instead of calling `VITE_API_BASE_URL`.

## Mock admin account

| Field                        | Value                    |
| ---------------------------- | ------------------------ |
| **Username / national code** | `0012345678`             |
| **Password**                 | `Mock@1234`              |
| **OTP**                      | any code (e.g. `123456`) |

### Sign-in flow

1. Open the app → redirected to sign-in
2. Enter username `0012345678` and password `Mock@1234`
3. Enter any OTP on the next step
4. Pick the mock admin staff if prompted
5. Sidebar loads from `MENU_ITEMS_MOCK`

Implementation: `src/infrastructure/mock/mockAuth.ts`.

## What is mocked

| Layer                                          | Behavior                       |
| ---------------------------------------------- | ------------------------------ |
| Auth (OTP, staff login, user-info, menu)       | Dedicated fixtures             |
| Token refresh                                  | Local mock tokens              |
| Option / enum / branch / province / city lists | `referenceMocks.ts` heuristics |
| List / filter / page endpoints                 | Sample page with 5 rows        |
| Mutations (POST/PUT/PATCH/DELETE)              | Success (`1` / `true`)         |

Resolver: `src/infrastructure/mock/resolveMockResponse.ts` (URL + method heuristics).

## Disable mock mode

```env
VITE_USE_MOCK=false
```

Then point `VITE_API_BASE_URL` at a real gateway. This explicit `false` value is
required to prevent an accidental live request from this mock workspace.

## Adding better fixtures

1. Prefer enriching `referenceMocks.ts` or auth/menu mocks
2. Or extend `resolveMockResponse.ts` with a URL-specific branch
3. Optional: regenerate typed skeletons with `npm run generate:mocks`

> Mock credentials are for local UI only — never use against staging/production.
