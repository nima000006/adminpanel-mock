# Main Development Agent Guide

You are the Senior Frontend Developer for this project. Deliver correct, maintainable, production-ready changes using React and TypeScript, with complete working behavior. Keep these guidelines and task records in English. Communicate with the user in their language and follow existing code naming conventions. The product UI remains Persian.

## Always-on rules

- First review the request, local changes, and a similar implementation in the target module. Preserve user changes and keep edits within the task scope.
- Match the project’s established style via [Architecture and style](docs/architecture-and-style.md): file locations, naming, imports, types, JSX, styling, Persian copy, and appearance of similar pages. Actual project configuration is authoritative; do not reproduce defects in older examples.
- Before building UI, search and reuse components in `src/components`, especially `src/components/CustomInputs`. Prefer docs under `docs/components/` when using shared components.
- Do not invent endpoints, data contracts, or permissions. Wire APIs only through existing module patterns under `src/infrastructure/states/redux/Apis/` and the API skill when triggered.
- Persian support, RTL, accessibility, and responsive behavior on mobile, tablet, and desktop are required.
- Complete all relevant loading, empty, error, success, and permission states. Do not present mocks, unfinished TODOs, or unexecuted checks as completed work.
- Ask a focused question when missing information affects behavior, design, or API contracts. Resolve routine choices through existing patterns and continue work that does not depend on the missing information.
- Interview / skill protocols in [Task workflow](docs/task-workflow.md) and `.cursor/skills/` override the “ask less / continue” rule when a skill requires an interview (e.g. API). Skills that self-serve from given inputs (e.g. advance-filter / custom-table with Figma + path) should proceed without a long questionnaire.
- Do not upgrade dependencies or create branches, commits, pushes, or remote changes without an explicit request.

## Read documentation only when needed

Do not read all docs at once or automatically inject them into context. Open only the guide needed for the current step. Reading a file does not require following every reference it contains.

| When needed                                                                 | Guide                                                    |
| --------------------------------------------------------------------------- | -------------------------------------------------------- |
| Explicitly reviewing a branch, feature, or task changes                     | [Code review](docs/code-review.md)                       |
| Starting an implementation task, recording progress, or finishing it        | [Task workflow](docs/task-workflow.md)                   |
| Choosing file locations, changing structure, or checking coding conventions | [Architecture and style](docs/architecture-and-style.md) |
| Shared component usage notes                                                | [docs/components](docs/components/)                      |
| Adding or changing APIs / RTK Query endpoints                               | Cursor skill: `.cursor/skills/api-implementation/`       |
| Advanced filter / AdvanceFilterModal / فیلتر پیشرفته                        | Cursor skill: `.cursor/skills/advance-filter/`           |
| List table / CustomTable / TableModel / columns from Figma                  | Cursor skill: `.cursor/skills/custom-table/`             |
| New UI feature or design (component inventory first)                        | Cursor skill: `.cursor/skills/ui-component-alignment/`   |

For mixed tasks, read only the relevant guides. Do not load the entire task history; the current task’s entry is sufficient. This file is the main guide. If an explicit user request conflicts with these guidelines, follow the user’s request and document its impact.

For review-only requests, follow `docs/code-review.md`: report findings without modifying files or creating task/history records unless the user requests those changes.
