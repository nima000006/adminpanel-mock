# Task Workflow and Records

Read at the start of each implementation task. When continuing the same task, update its existing record; do not create a new file for every message. Write task records in English.

## Starting a task

1. Identify the owning feature, the expected behavior, and verifiable acceptance criteria. Record requirements supplied by the user; do not invent missing business rules or API contracts.

2. Read only the guides relevant to the current task from `AGENTS.md`, followed by the necessary files in the owning module. Do not read every guide or component document.

3. Follow the project's existing architecture, component usage, naming, styling, and data-handling patterns ([Architecture and style](architecture-and-style.md)).

4. If a required skill below needs inputs, follow that skill’s own rules (some skills self-serve from Figma/path; others interview first). Do not invent contracts the skill forbids.

## Project Cursor skills (STRICT)

When a trigger matches, **open and follow the skill’s `SKILL.md` in full** before writing dependent code. Skills live under `.cursor/skills/` so Cursor can discover them as project Agent Skills.

| When                                                                                 | Skill                                                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| New UI feature or design                                                             | [ui-component-alignment](../.cursor/skills/ui-component-alignment/SKILL.md) |
| Write / add / wire an API, endpoint, RTK Query `injectEndpoints`, mutation, or query | [api-implementation](../.cursor/skills/api-implementation/SKILL.md)         |
| Implement / wire advanced filter, `AdvanceFilterModal`, or فیلتر پیشرفته             | [advance-filter](../.cursor/skills/advance-filter/SKILL.md)                 |
| Implement / wire list table, `CustomTable`, `TableModel`, or columns from Figma      | [custom-table](../.cursor/skills/custom-table/SKILL.md)                     |
