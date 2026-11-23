---
name: custom-table
description: >-
  Implements CustomTable list UIs for this admin panel from a Figma table design:
  create helper/models/{ComponentName}/{ComponentName}TableModel.tsx, record types
  in @types/@{fileName}.ts, mock dataSource, search/sort via GetServerColumnSearchProps,
  and actions via MenuActionPopover or buttons. Use when implementing, adding, or
  wiring a table, CustomTable, TableModel, or list columns from Figma.
---

# Custom Table Implementation

## Anti-goals

- Do **not** run a long interview when the developer already gave a **Figma link** and a **target file path**.
- Do **not** invent columns that are not on the Figma design.
- Do **not** invent list API contracts in default mock mode — use local mock `dataSource`.
- Do **not** place the TableModel outside `helper/models/{ComponentName}/` unless the developer requests an existing shared exception.

## Required inputs from the developer

Only these two are required to start:

1. **Figma link** (table / list design node)
2. **Target file path** (the page/list component that hosts the table)

If either is missing, ask **only** for the missing one(s), then proceed.

Optional: explicit `{ComponentName}` — else derive from the target file stem (e.g. `AllSelfList.tsx` → `AllSelfList`).

## Shared references

- Table: `src/components/Renderers/CustomTable/CustomTable.tsx`
- Parent wiring sample: `AllSelfList.tsx` (`CustomTable` + `manualPaginationConfig`)
- Model sample: `CateringSelfListTableModel.tsx`
- Search/sort helper: `@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable` → `GetServerColumnSearchProps`
- Actions menu: `MenuActionPopover`

For full code samples, read [reference.md](reference.md) when implementing.

## 1. Read Figma, then implement

When Figma link + target path are present:

1. Open Figma (`create_session` then `get_design_context` / screenshot). Parse `fileKey` and `node-id`.
2. Extract columns: Persian **title**, cell kind, search icon, sort icon, actions (⋯ menu vs button/link).
3. Derive `dataIndex` / keys: camelCase English, stable and unique.
4. Classify each column cell (see [Known vs ambiguous cells](#11-known-vs-ambiguous-cells)). For **ambiguous** columns, ask the developer **before** writing those `render`s — in **one** short message listing all unclear columns.
5. After answers (or if every column is known), implement. Also ask if Figma is unreadable.

### 1.1 Known vs ambiguous cells

**Known — implement without asking** (standard patterns):

- Plain text
- `CustomTag` / status chip
- Date / date-time (`dataPlaceHolder` + `isDate`)
- Search / sort via `GetServerColumnSearchProps`
- Actions: `MenuActionPopover` (⋯) or obvious `CustomButton` / link

**Ambiguous — ask before coding that column’s `render`:**

Any non-trivial cell that is **not** clearly one of the known patterns (e.g. star rating + label, avatar+name, icon+text composite, custom badge, progress, multi-line composite UI).

Ask in one message, for each unclear column:

```text
Before implementing, I need confirmation for these column(s):

- "{Persian column title}" (`{dataIndex}`): Is there an existing project component for this cell? If yes, what is its path/name? If not, I will implement the UI inline in the column `render`.
```

- If the developer names an existing component → **reuse it** in `render` (do not rebuild).
- If none exists → implement the cell **inline in the column `render`** to match Figma (see reference: star-rating style example). Do not invent a new shared component unless asked.

## 2. Implementation order

1. **Record type** next to the target file: ensure `@types/@{camelCaseFileStem}.ts` exists (create folder/file if missing). Define `{ComponentName}RecordType` (see mapping). Always include `id: number` for `rowKey`.
2. **Model folders:** Under the target page’s helper tree, ensure `helper/models/` exists; then `helper/models/{ComponentName}/`.
3. **Model file:** Create `{ComponentName}TableModel.tsx` inside that folder (PascalCase filename matching the component, e.g. `AllSelfListTableModel.tsx`).
4. **Parent wiring:** Wire `CustomTable` with typed columns, mock `dataSource`, `rowKey="id"`, and `manualPaginationConfig` from URL `page` / `pageSize` (see reference). Stub action handlers if needed.

## 3. Record type mapping (mock-first)

Map each data column (skip the actions column):

| Figma / cell                      | Record property type                                                 |
| --------------------------------- | -------------------------------------------------------------------- |
| Plain text / number shown as text | `string`                                                             |
| `CustomTag` (status/tag chip)     | `IdTitle` (from `@pages/_shared/@types/@generalTypes/@generalTypes`) |
| Date / date-time                  | `string`                                                             |

Also add `id: number`. Do not invent extra API response wrappers unless the page already has them.

## 4. Column rules

| Figma signal            | Implementation                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Search icon on column   | Spread `GetServerColumnSearchProps({ dataIndex, label, type: "text" })`                                                                                |
| Sort on column          | Spread `GetServerColumnSearchProps({ dataIndex, label, type: "sort" })`                                                                                |
| Plain text cell         | `title` / `dataIndex` / `key` / `width`; optional `dataPlaceHolder`                                                                                    |
| `CustomTag` cell        | `render` with `<CustomTag>{value.title}</CustomTag>` (or color if design shows it and a local color map already exists — do not invent new color maps) |
| Date cell               | `render` with `dataPlaceHolder({ data: value, isDate: true, ... })`                                                                                    |
| Ambiguous / custom cell | Ask developer for an existing component; if none, inline `render` matching Figma                                                                       |
| Actions: vertical ⋯     | Sticky actions column + `MenuActionPopover` with `contentItems`                                                                                        |
| Actions: button / link  | Sticky actions column; render the button(s) / link(s) from the design (prefer `CustomButton`)                                                          |

Actions column shape (required when actions exist):

- `title: ""`, `dataIndex: "id"`, `key: "actions"`, `width: 50`, `fixed: "right" as FixedType`, `className: "tables-sticky-column-left"`

Pass action callbacks into the TableModel factory from the parent (e.g. `onView`, `onEdit`) — keep handlers stubbed in mock mode.

## 5. Naming

| Piece         | Convention                                   | Example (`AllSelfList`)      |
| ------------- | -------------------------------------------- | ---------------------------- |
| Types file    | `@types/@{camelCaseStem}.ts`                 | `@types/@allSelfList.ts`     |
| Record type   | `{ComponentName}RecordType`                  | `AllSelfListRecordType`      |
| Models folder | `helper/models/{ComponentName}/`             | `helper/models/AllSelfList/` |
| Model file    | `{ComponentName}TableModel.tsx`              | `AllSelfListTableModel.tsx`  |
| Model export  | default function `{ComponentName}TableModel` | `AllSelfListTableModel`      |

## 6. Checklist

- [ ] Figma read; columns match the design
- [ ] Ambiguous columns confirmed with developer (reuse component or inline `render`)
- [ ] `@types` record type with correct field mapping + `id`
- [ ] `helper/models/{ComponentName}/{ComponentName}TableModel.tsx` created
- [ ] Search / sort props applied where Figma shows them
- [ ] Actions: sticky column + `MenuActionPopover` or buttons as designed
- [ ] Parent `CustomTable` + mock data + pagination wiring
