# Advance Filter — reference

Read when implementing parent wiring, hook details, or URL integration.

**Filename:** always camelCase starting with lowercase, e.g. `allSelfDetailAdvanceFilter.tsx` (not `AllSelfDetailAdvanceFilter.tsx`). Hook name stays `useAllSelfDetailAdvanceFilter`.

## Form type example

```ts
import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type FactorsAndDocsFactorsAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  factorType: SelectType<IdTitleName>;
  uuid: string;
  createdAt: string;
  date: [string, string];
};
```

If `@types/@{fileName}.ts` exists next to the parent, append; otherwise create `@types/` and the file (`@` + lowercase stem). Prefer an existing types file in that folder when it already owns related types.

## Parent wiring

```ts
const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
const [form] = Form.useForm<FactorsAndDocsFactorsAdvanceFilterFormType>();
const { params: url } = useQueryParams();
const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

const { filterItemsList } = use{ComponentName}AdvanceFilter({
  advanceModalOpen,
  form,
});
```

```tsx
{
  advanceModalOpen && (
    <AdvanceFilterModal
      isModalOpen={advanceModalOpen}
      closeModalHandler={() => {
        setAdvanceModalOpen(false);
        form.resetFields();
      }}
      filterItemsList={filterItemsList}
      form={form}
      badgeCounter={(amount) => setBadgeCount(amount.toString())}
      defaultParams={{ ...url }}
    />
  );
}

{
  /* Always place badge + button in ToolBox rightSide (see BuyersDetailsReturnTable).
    Do not add centerSide/leftSide unless the page already has them. */
}
<ToolBox
  rightSide={
    <CustomBadge count={badgeCount}>
      <CustomButton
        type="default"
        icon={<AiOutlineFilter />}
        onClick={() => setAdvanceModalOpen(true)}
      >
        فیلتر پیشرفته
      </CustomButton>
    </CustomBadge>
  }
/>;
```

## Hook shape (mock options)

```ts
const filterItemsList: AdvanceFilterItemsListType[] = [
  {
    label: "استان",
    name: "province",
    type: "select",
    mode: "multiple",
    options: [], // mock — no API in default skill mode
  },
  {
    label: "بازه زمانی",
    name: "date",
    type: "range",
  },
];

return { filterItemsList };
```

Pass `form` into the hook only when cascading/`useWatch` needs it. Do not add option-fetch effects in default mock mode.

## `filterItemsList` from Figma

| Figma / UX    | `type`      | Notes                             |
| ------------- | ----------- | --------------------------------- |
| Single select | `"select"`  | omit `mode`; `options: []`        |
| Multi select  | `"select"`  | `mode: "multiple"`; `options: []` |
| Text          | `"input"`   |                                   |
| Single date   | `"date"`    |                                   |
| Date range    | `"range"`   | optional `picker`                 |
| Numeric range | `"slider"`  | `min` / `max`                     |
| Section title | `"divider"` | `label` only                      |

Optional: `name`, `disabled`, `onChange` (for clear-child cascading only), `col`, `rules`, `placeHolder`, `notFoundContent`.

### Cascading (UI only, still mock options)

1. `useWatch` parent field(s).
2. Clear children in `onChange` via `form.setFieldsValue`.
3. Disable children until parent has a value.
4. Keep child `options: []` (no fetch until a later API task).

## URL params (`mode: "urlSet"`)

- select: `{name}Id`, `{name}Title`, optionally `{name}Name`
- input / date: `{name}Title`
- range: `{name}DateStart`, `{name}DateEnd`
- slider: `{name}MinAmount`, `{name}MaxAmount`
- count: `badger`

If the parent already refetches a list from URL, keep an `advanceFilterItems` (or equivalent) key list in sync. Do not invent new list API request fields.
