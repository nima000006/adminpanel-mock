# Project Architecture and Style

Read when choosing file locations, adding a module, or checking coding conventions.  
Process/interview flows live in Cursor skills under `.cursor/skills/` and in [task-workflow](task-workflow.md) — not here.

## Existing directory map

| Path                               | Responsibility                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| `src/pages/`                       | Pages and business-domain code; preserve the owning module’s directory names and casing |
| `src/components/`                  | Existing components, including both shared and domain-specific components               |
| `src/infrastructure/hooks/`        | Existing infrastructure hooks                                                           |
| `src/infrastructure/helpers/`      | Existing helpers and utilities                                                          |
| `src/infrastructure/states/redux/` | Store, slices, and APIs (`Apis/` for RTK Query endpoints)                               |
| `src/infrastructure/router/`       | Routing infrastructure                                                                  |
| `src/infrastructure/config/`       | Shared configuration                                                                    |
| `src/assets/`                      | Project assets                                                                          |
| `.cursor/skills/`                  | Project Cursor Agent Skills (API, advance filter, custom table, UI alignment, …)        |

Do not introduce a parallel structure such as `src/features`, `src/store`, or a new service layer for an ordinary task. First locate the consumer and one or two similar implementations. Keep domain-specific logic close to its owning module; shared code should have actual consumers.

## Coding conventions

- Read versions and commands from `package.json` and the project’s installation configuration. Do not add a library for a problem existing tools already solve.
- Treat `tsconfig.json`, `eslint.config.js`, and `.prettierrc.cjs` as authoritative. Current Prettier settings include two-space indentation, double quotes, semicolons, and a print width of 90. If configuration changes, follow the actual file.
- Use existing aliases `@components/`, `@assets/`, `@infra/`, and `@pages/` consistently with neighboring files.
- Follow the target module’s component names, exports, type locations, SCSS naming, and import ordering. Search for existing types before creating new ones.
- Preserve strict TypeScript checking. Do not bypass errors with `any`, `@ts-ignore`, or disabled lint rules. Narrow uncertain data with type guards.
- Keep UI, data transformations, and server communication separated along existing boundaries. Do not move local state into Redux or duplicate RTK Query data in another slice without a reason.
- Implement hooks, effects, and cleanup correctly. Add memoization only for an explainable need.
- Shared changes must remain compatible with existing consumers. Avoid unrelated refactoring, renaming, or broad formatting.
- Project style also includes visual consistency: follow similar pages for fonts, spacing, colors, control sizes, and message tone.
