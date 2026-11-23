---
name: advance-filter
description: >-
  Implements AdvanceFilterModal / فیلتر پیشرفته from a Figma link into a target page
  file: read the design, create use{Component}AdvanceFilter in a camelCase file
  (e.g. allSelfDetailAdvanceFilter.tsx) under helper/modals/advanceFilterModals,
  form types, badge/badger, and parent wiring with mock empty select options (no
  option APIs). Use when implementing, adding, wiring, or porting advanced filter
  or AdvanceFilterModal.
---

# Advance Filter Implementation

## Anti-goals

- Do **not** run a long interview / gathering questionnaire when the developer already gave a **Figma link** and a **target file path**.
- Do **not** wire real APIs/hooks for select options in this skill’s default mode — use mock empty `options: []` only.
- Do **not** invent filter fields that are not visible in the Figma design.
- Do **not** put new hooks under a generic `hooks/` folder unless the developer requests an exception.

## Required inputs from the developer

Only these two are required to start:

1. **Figma link** (design node for the advanced filter modal/panel)
2. **Target file path** (the page/list component that opens the filter)

If either is missing, ask **only** for the missing one(s) in a short message — then proceed.

Optional (use if provided; otherwise derive yourself):

- Explicit `{ComponentName}` — else derive from the target file name (e.g. `AllSelfDetail.tsx` → `AllSelfDetail`)

## Shared references

- Modal: `src/components/Modals/AdvanceFilterModal/AdvanceFilterModal.tsx`
- Item types: `src/components/Modals/AdvanceFilterModal/@types/@advanceFilterModal.ts`
- Wiring sample: `BuyersDetailsReturnTable.tsx` (`ToolBox` `rightSide` + badge / badger / button)
- Prefer folder `helper/modals/advanceFilterModals/` (not legacy `hooks/`)

For code samples and URL-param details, read [reference.md](reference.md) when implementing.

## 1. Read Figma, then implement (no waiting on a field checklist)

When Figma link + target path are present:

1. Open the Figma design (project Figma MCP: `create_session` then `get_design_context` / screenshot as needed). Parse `fileKey` and `node-id` from the URL (`node-id` hyphens → colons).
2. From the design, extract each filter control: Persian **label**, control **type**, single vs multi select, date vs range, dividers/sections.
3. Derive form `name` keys yourself: camelCase English from the label/role (stable, unique). Prefer names already used on that page’s URL/list if the file already has filter keys; otherwise invent clear camelCase names once and keep them consistent in form type + `filterItemsList` + URL wiring.
4. Infer cascading only when the Figma UI clearly shows it (e.g. dependent disabled fields). Otherwise treat fields as independent.
5. Implement immediately after reading Figma. Ask the developer **only** if the Figma node cannot be read, or a control type is still ambiguous after inspecting the design (one short clarifying question — not a full template).

## 2. Implementation order

1. Ensure `helper/modals/advanceFilterModals/` exists under the owning feature helper tree (next to the target page’s helper layout).
2. Form type in parent `@types/@{fileName}.ts` (create if missing) — see mapping below.
3. Create `{camelCaseComponentName}AdvanceFilter.tsx` (filename starts with a **lowercase** letter) with hook `use{ComponentName}AdvanceFilter`. Example: component `AllSelfDetail` → file `allSelfDetailAdvanceFilter.tsx`, hook `useAllSelfDetailAdvanceFilter`.
4. Build `filterItemsList` from the Figma-derived field list.
5. Parent wiring in the target file: `advanceModalOpen`, typed `Form`, `badgeCount` from `url.badger`, `AdvanceFilterModal`, and the فیلتر پیشرفته button wrapped in `CustomBadge` inside `ToolBox` **`rightSide`** (do not leave the button bare outside `ToolBox`). Do not invent extra `centerSide` / `leftSide` content unless the page already has it.
6. Wire URL apply/reset via the shared modal (`defaultParams`, `badgeCounter`). If the page already has a list `useEffect`, map the new URL keys into the existing request **only** when those request fields already exist — do not invent list API contracts. If the page is still a stub, wire modal + `ToolBox` badge button + form only; leave list refetch for later.

## 3. Select options = mock only (default)

For every `select` (single or multi):

- Set `options: []`
- Do **not** call RTK Query / lazy APIs / `onClick` fetchers for options
- Do **not** add loading flags tied to option APIs
- Cascading (if any): still clear/disable children in `onChange` / `useWatch`, but child `options` stay `[]` until a future task wires APIs

## 4. Form type mapping

Skip `divider`. Import `SelectType` from `@pages/_shared/@types/@generalTypes/@generalTypes` (use `IdTitle` or `IdTitleName` to match the module; default `IdTitleName` if unclear).

| Control         | Form property type |
| --------------- | ------------------ |
| `input` / text  | `string`           |
| single `select` | `SelectType<…>`    |
| multi `select`  | `SelectType<…>[]`  |
| `date`          | `string`           |
| `range`         | `[string, string]` |

Name: `{ComponentName}AdvanceFilterFormType`.

## 5. Naming

| Piece  | Convention                                                                  | Example (`AllSelfDetail`)        |
| ------ | --------------------------------------------------------------------------- | -------------------------------- |
| Folder | `helper/modals/advanceFilterModals/`                                        | same                             |
| File   | `{camelCaseComponentName}AdvanceFilter.tsx` — **must start with lowercase** | `allSelfDetailAdvanceFilter.tsx` |
| Hook   | `use{ComponentName}AdvanceFilter`                                           | `useAllSelfDetailAdvanceFilter`  |

Do **not** create PascalCase filenames like `AllSelfDetailAdvanceFilter.tsx`.

## 6. `filterItemsList` types

`select` (optional `mode: "multiple"`), `input`, `date`, `range`, `slider`, `divider`.

## 7. Checklist

- [ ] Figma read; fields match the design
- [ ] Folder + file + hook named per convention
- [ ] Form type in parent `@types`; mapping correct
- [ ] All selects use `options: []` (no option APIs)
- [ ] `advanceModalOpen`, typed `Form`, `badgeCount` from `url.badger`
- [ ] `AdvanceFilterModal` + فیلتر پیشرفته in `CustomBadge` inside `ToolBox` `rightSide`
- [ ] Close handler resets the form
