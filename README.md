# Daneshjouyar Admin Panel

Internal operations console for university services (dormitory, food, wallet, ticketing, international, business/shop, organization).

**Stack:** Vite 8 · React 19 · TypeScript · RTK Query · Ant Design 6 · Tailwind 4

## Documentation

| Doc | Description |
| --- | --- |
| [Business overview](./docs/BUSINESS_OVERVIEW.md) | Domains, personas, operator journeys |
| [Technical overview](./docs/TECHNICAL_OVERVIEW.md) | Architecture, RTK APIs, environments |
| [Mock mode](./docs/MOCK_MODE.md) | `VITE_USE_MOCK`, credentials, resolver |

## Mock mode (local UI without gateway)

```env
VITE_USE_MOCK=true
```

| | |
| --- | --- |
| **Username** | `0012345678` |
| **Password** | `Mock@1234` |
| **OTP** | any (e.g. `123456`) |

All RTK Query calls go through `customBaseQuery` → mock resolver (options, lists, auth, mutations).

```bash
cp .env.example .env.local
npm install
npm run local
```

App default: [http://localhost:3002](http://localhost:3002)

---

> Front-end setup for the Daneshjouyar admin panel. This document captures what a developer needs to land on the repo, bootstrap the project, and produce production-grade changes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Project Initialization](#project-initialization)
- [Available Scripts](#available-scripts)
- [Quality Tooling](#quality-tooling)
- [Testing](#testing)
- [Build Output](#build-output)
- [Typography & Fonts](#typography--fonts)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Git Workflow](#git-workflow)
- [Commenting Guide](#commenting-guide)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Install Node.js and npm. The stack is validated against Node.js **22.19.0** — align local tooling accordingly.
- Install Git.
- Use a capable editor (VS Code with recommended extensions is the team baseline).

### Git identity baseline

Before touching the repo, make sure your global git identity is configured. Open the config file via:

```
git config --global -e
```

If you do not have a profile yet, set it explicitly:

```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## Environment Configuration

- Create an `.env` file at the repository root if it does not exist.
- Seed it with the environment-specific keys. Example:

```
VITE_ENCRYPTION_KEY = ZZAFORZansdr234$dasd
```

> ⚠️ Use the help of colleagues to find out about what each env keys are.

## Project Initialization

Clone once and keep your remote clean:

```
git clone https://gitlab.example.com/superuni/development/adminpanelproject.git
```

Install dependencies after every `package.json` change:

```
npm install
```

Commitizen is the enforced commit interface across the team. Install it globally:

```
npm install -g commitizen
```

## Available Scripts

- `npm run local` boots the development server against the local configuration bundle.
- `npm run build` creates the production artifact.
- `npm run stage` builds the staging bundle.
- `npm run uat` generates UAT assets.
- `npm run dev` builds against staging with development IP overrides.

## Quality Tooling

Auto-fix lint issues whenever possible to keep diffs lean:

```
npm run lint:fix
```

## Testing

Run the full unit and component test suite via:

```
npm run test
```

## Build Output

- Artifacts are emitted into `dist/`.
- For static deployments the root is `dist` — no trailing assumptions.

**Performance optimizations:**

- WOFF2 format (~70% smaller than TTF)
- Critical weights preloaded (Regular, Bold)
- `font-display: swap` for instant text visibility
- Total size: ~104KB (WOFF2) + 340KB (TTF fallback)

## Pre-commit Hooks

The repository enforces quality gates via Husky pre-commit hooks. **Every commit automatically runs:**

1. **Lint & Format** (~10s) - ESLint + Prettier on staged files
2. **Type Check** (~10s) - TypeScript validation via `tsc --noEmit`
3. **Build Test** (~45s up to ~180s) - Full production build to **prevent CI/CD failures**

**Total time per commit:** ~180 seconds

### Why Build on Commit?

- ✅ Catches errors **before** they break GitLab CI/CD pipeline
- ✅ Prevents failed merge requests
- ✅ Saves team time and CI/CD resources
- ✅ Ensures dev branch stays stable

## Git Workflow

Baseline workflow once your feature is ready:

```
git add .
git cz

git checkout dev        # optional: update from integration branch
git pull                # optional
git checkout -          # optional: return to feature branch
git rebase dev          # optional: rebase ensures a linear history

# Resolve conflicts if any

git push

# Open a merge request against the target branch.
# Log actual effort in GitLab for traceability.
```

## Commenting Guide

- `//!` Descriptor comments highlight critical context.
- `// Todo[developer name]:` Call your backlog items explicitly.
- `// unnecessary code comments` act as temporary placeholders — delete them once context is obvious.

## Troubleshooting

Windows occasionally chokes on long filenames. Fix it once per workstation:

```
git config --system core.longpaths true
git config core.ignorecase false
```
