# Code Review

Read only when the user explicitly requests a review of a branch, feature, or task changes, including requests to review according to this file.

## Purpose

Act as a Senior Frontend Code Reviewer supporting the team lead. Review the requested changes against the task requirements and the team lead's criteria below. This file is the entry point for the review workflow.

## Team lead's review criteria

Apply these checks to the branch changes. Report violations with the file path, line number where applicable, and a suggested correction.

### 1. Added file size

Flag any newly added file larger than **100 KB (102,400 bytes)**, including images, assets, and generated files.

### 2. API section marker

Group API hook declarations and initialization under this exact marker:

```tsx
//? ================================  Api Calls ================================
const [getAdminBanner, { isFetching: isGetAdminBannerLoading }] =
  useLazyGetTicketingSuperAgentCountOfTicketsQuery();
```

### 3. Effects section marker

Place this exact marker above the `useEffect` section:

```tsx
//* ================================ Effects  ================================
```

### 4. Utility functions section marker

Place this exact marker above the component's utility functions:

```tsx
//* ================================ Util Functions ================================
```

### 5. Main JSX section marker

Place this exact marker immediately before the component's main JSX return:

```tsx
//* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
```

### 6. Protected shared components

Flag any additions, modifications, deletions, or renames under `src/components/`.

### 7. Protected environment files

Flag any additions, modifications, deletions, or renames involving `.env` files or their variants, including `.env.local`, `.env.development`, `.env.production`, and `.env.example`.

Do not reproduce environment values or secrets in the review report.

### 8. Component prop count

Keep component interfaces small, preferably with **7 or fewer props**, and flag components accepting **more than 8 props**.

Count all declared props, including optional props. Do not hide unrelated props inside an object merely to bypass this limit.

### 9. No magic numbers

Do not use unexplained numeric literals directly in function calls, conditions, or business logic. Extract them into meaningfully named variables or constants.

Incorrect:

```tsx
getAdminBanner(10);

if (status === 1) {
  // ...
}
```

Correct:

```tsx
const bannerPageSize = 10;

const pendingStatus = 1; // The request is waiting for review.

getAdminBanner(bannerPageSize);

if (status === pendingStatus) {
  // ...
}
```

Reuse existing constants when available. Every constant representing a status, mode, or other business state must have an adjacent explanatory comment describing its meaning. Names such as `numberOne` do not adequately explain intent.

### 10. No explicit `any`

Flag explicit `any` types, including component props, function parameters, return types, assertions, arrays, and generic arguments.

Use precise types, existing project types, or `unknown` with proper narrowing when the value is genuinely unknown.

### 11. Explain complex logic

Complex or non-obvious logic must include a meaningful comment explaining its purpose, reasoning, assumptions, or edge cases.

Flag missing explanations and comments that merely restate the code without explaining why it is necessary.

### 12. Keep TypeScript type definitions outside components

Do not define `type` aliases or `interface` declarations inside component bodies or component implementation files. Do not define component prop contracts inline.

Place these definitions in the appropriate type files, following the owning module's existing conventions, and import them into the component. Reuse existing types whenever possible.

### 13. Prefer `.unwrap().then()` after RTK Query mutations/lazy queries

After calling an RTK Query trigger (mutation or lazy query), chain `.unwrap().then(...)` to handle the resolved response. Do not rely on bare `await` without `.unwrap()`, or on handling success only through the hook result object, when the call site needs success handling.

Incorrect:

```tsx
const response = await getAllStudents({
  status: DELIVERED_TO_POST_CODE,
  requestType: GET_ALL,
});

setDataSource(response?.data);
```

Correct:

```tsx
getAllStudents({
  status: DELIVERED_TO_POST_CODE,
  requestType: GET_ALL,
})
  .unwrap()
  .then(onGetAllStudentSuccess);
```

### 14. Success handlers for `.then()` must be named `on…Success` and be `async`

The callback passed to `.then()` after `.unwrap()` must be a named function that:

1. Is declared with `async`
2. Starts with `on`
3. Ends with `Success`

Do not pass an inline anonymous function or arrow callback to `.then()`.

Incorrect:

```tsx
getAllStudents({
  status: DELIVERED_TO_POST_CODE,
  requestType: GET_ALL,
})
  .unwrap()
  .then((response) => {
    setDataSource(response?.data);
  });
```

Correct:

```tsx
const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
  setDataSource(response?.data);
};

const getListData = () => {
  getAllStudents({
    status: DELIVERED_TO_POST_CODE,
    requestType: GET_ALL,
  })
    .unwrap()
    .then(onGetAllStudentSuccess);
};
```

### 15. Every branch must have a `changelog.md` entry and matching `package.json` version

Every reviewed branch must include a new entry at the top of `changelog.md` (root of the project). The entry must follow this format exactly.

**Header line**

```md
# 1.0.36 1405-06-23(feat)
```

- Starts with `#` and a version of the form `1.0.N`
- The first entry in the project history starts at `1.0.01` style; each new entry must bump the trailing number by **1** relative to the previous (latest) entry — e.g. if the latest is `1.0.35`, the new entry must be `1.0.36`
- Next comes the Jalali date the entry was written (`YYYY-MM-DD`)
- Then the task kind in parentheses, one of: `feat`, `fix`, `refactor`, `style` , `docs` , `perf`, `test`

**Summary line**

```md
feat(Food): implement baseInfo list and detail ([#1865](https://gitlab.example.com/superuni/development/front-group/adminpanelproject/-/work_items/1865))
```

- Starts with the same kind (`feat` / `fix` / `refactor` / `style` / `docs` / `perf`/ `test`)
- Module name in parentheses; if the branch touches multiple modules, use `fields`
- Short description of the change
- Work-item link: the branch/work-item number must appear both as `[#NNNN]` and as the same number in the GitLab work-items URL

**Detail bullets**

- After the summary line, add further bullet points describing the branch changes as needed

**`package.json` version sync**

The same version string used in the changelog header (e.g. `1.0.36`) must be set as the top-level `"version"` value in `package.json`. Flag any mismatch between the latest `changelog.md` version and `package.json` `"version"`.

Correct full example:

```md
# 1.0.36 1405-06-23(feat)

feat(Food): implement baseInfo list and detail ([#1865](https://gitlab.example.com/superuni/development/front-group/adminpanelproject/-/work_items/1865))

- implement baseInfo list and detail
```

Flag branches that are missing a changelog entry, use a wrong version bump, omit or mistype the work-item link/number, use an invalid kind, or leave `package.json` `"version"` out of sync.
