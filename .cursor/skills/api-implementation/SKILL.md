---
name: api-implementation
description: >-
  Implements RTK Query APIs for this admin panel: gather URL/method/types/paths from
  the developer, then add injectEndpoints, @types Request/Response, imports, and UI
  hook usage. Use when writing, adding, wiring, or implementing an API, endpoint,
  mutation, query, or injectEndpoints.
---

# API Implementation

## Anti-goals

- Do not invent URL, method, request/response shapes, file paths, or API names.
- Do not start coding until the gathering list below is confirmed.
- Do not switch GET lazy vs standard on your own.

## 1. Information gathering

Send **exactly one** message with this template (adapt language; keep order/labels). Leave values blank for the developer:

```text
To implement this API, please fill in the following:

1. API URL:
2. HTTP Method: (GET / POST / PUT / PATCH / DELETE)
3. Request Body / Params Type:
4. Response Type:
5. Implementation File Path: (where the endpoint will be written under Apis/)
6. Usage File Path: (where the hook will be consumed)
7. API Name: (camelCase, starts with a lowercase letter, e.g. canceledInvoiceList)
8. Query mode (only if GET): (lazy / standard)

Reply with the filled list. I will not start coding until all required fields are confirmed.
```

After the reply:

- Ask only for missing/unclear fields in one follow-up.
- If method is `GET` and field 8 is missing, ask lazy vs standard before coding. Skip field 8 for mutations.
- When complete (7 fields for mutations; 8 for GET), restate the list, then implement.

## 2. Implementation

- Add the endpoint in the confirmed Implementation File Path using the **exact** API Name (camelCase, lowercase start).
- Types: PascalCase API name + suffix:
  - `[PascalCaseApiName]Request`
  - `[PascalCaseApiName]Response`
  - Example: `canceledInvoiceList` → `CanceledInvoiceListRequest` / `CanceledInvoiceListResponse`.
- **URL quoting:** If the URL has no dynamic path/query interpolation (no `${...}`), use a normal string (`"..."` / `'...'`), not a template literal (backticks). Use backticks only when the URL embeds variables (e.g. `` `/admin/items/${id}` `` or `` `/path${createQueryString(params)}` ``).

## 3. Types (`@types` next to Usage File Path)

- If `@types` exists: append Request/Response `type`s to the existing file.
- If missing: create `@types/@[componentName].ts` (filename starts lowercase, e.g. `@canceledInvoiceList.ts`) and define types with the `type` keyword only.

## 4. Integration

In the Implementation File Path, import the new Request/Response types from that `@types` file.

## 5. Usage (Usage File Path)

Use the mode confirmed for GET. Do not switch modes.

**Mutations** — rename `isLoading`:

```ts
const [forgetPassword, { isLoading: isForgetPasswordLoading }] =
  useForgetPasswordMutation();
```

**GET lazy** — rename `isFetching`:

```ts
const [getReasonsReferral, { isFetching: isGetReasonsReferralLoading }] =
  useLazyGetReasonsReferralQuery();
```

**GET standard**:

```ts
const { data: getAllSurveyData, isFetching: isGetAllSurveyLoading } = useSurveyAllQuery({
  page: 0,
  size: 100,
});
```
