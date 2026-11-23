# AdvanceFilterModalV2 - Usage Examples

## What changed from V1?

| Before (V1)                                                  | After (V2)                                           |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Manually manage `useState` for modal open, badge count, form | `useAdvanceFilter` hook handles everything           |
| Define `FILTER_DEPENDENCIES` array by hand                   | `filterDeps` auto-computed from `filterItems` config |
| Duplicate `useEffect` for badge count                        | Badge count auto-computed from URL params            |
| Pass `defaultParams`, `badgeCounter`, `closeModalHandler`    | Pass the single `advanceFilter` object               |
| Modal mutates `defaultParams` (side effect)                  | Clean URL update without mutation                    |
| Page resets page params manually                             | Auto page-reset on filter submit                     |
| Missing `key` on FilterItems map                             | Proper `key={String(item.name)}`                     |

---

## Example 1: Basic Usage (replaces FoodReportMyFoodsList pattern)

```tsx
import { useEffect, useState } from "react";
import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  AdvanceFilterModalV2,
  useAdvanceFilter,
} from "@components/Modals/AdvanceFilterModalV2";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useMyFoodAdvanceFilter from "./helpers/utils/useMyFoodAdvanceFilter";

const MyFoodsList = () => {
  const [form] = Form.useForm<any>();
  const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);

  // ✅ One hook replaces 3 useState + 2 useEffect + handler functions
  const advanceFilter = useAdvanceFilter({
    filterItems: filterItemsList,
    form,
    onOpen: fetchInitialData,
  });

  const { params } = advanceFilter;

  // ✅ filterDeps auto-computed: ["selfId", "contractId", "vendorId"]
  useEffect(() => {
    getData();
  }, [
    params?.pageNo,
    params?.pageSize,
    ...advanceFilter.filterDeps.map((key) => params?.[key]),
  ]);

  const getData = () => {
    getMyFoodByFilter({
      pageNo: params?.pageNo === "0" ? "0" : params?.pageNo,
      pageSize: params?.pageSize ?? "8",
      restaurantId: params?.selfId,
      contractId: params?.contractId,
      vendorId: params?.vendorId,
    });
  };

  return (
    <>
      {/* ✅ Always rendered - modal visibility controlled by hook */}
      <AdvanceFilterModalV2 filterItems={filterItemsList} advanceFilter={advanceFilter} />

      <ToolBox
        rightSide={
          <CustomBadge count={advanceFilter.badgeCount}>
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              onClick={advanceFilter.openModal}
            >
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
      />
      {/* ... table ... */}
    </>
  );
};
```

---

## Example 2: With Extra Dependencies (table column filters + advance filters)

When you have params from BOTH advance filter modal AND table column filters:

```tsx
const advanceFilter = useAdvanceFilter({
  filterItems: filterItemsList,
  form,
  onOpen: fetchInitialData,
});

const { params } = advanceFilter;

// Extra deps from table column sorts/filters (not managed by advance filter)
const TABLE_DEPS = ["title", "dormitory", "sortings"];

useEffect(() => {
  getListData();
}, [
  params?.pageNo,
  params?.pageSize,
  // Advance filter deps (auto-computed)
  ...advanceFilter.filterDeps.map((key) => params?.[key]),
  // Table column deps (manual)
  ...TABLE_DEPS.map((key) => params?.[key]),
]);
```

---

## Example 3: Complex Filters (Dorm Admission pattern)

With dependent selects, multi-select, dates, and custom `onChange` handlers:

```tsx
const [form] = Form.useForm<AdmissionFilterFormType>();
const { filterItemsList, fetchInitialData } = useAdmissionAdvanceFilter(form);

const advanceFilter = useAdvanceFilter({
  filterItems: filterItemsList,
  form,
  onOpen: fetchInitialData,
});

const { params } = advanceFilter;

// filterDeps is auto-computed from filterItems:
// ["activeProvinceId", "activeCityId", "activeUniId", "activeDormitoryId",
//  "activeSchedulingId", "activeReservationTypeId", "activeManagementTypeId"]
```

The filter config hook (unchanged from V1):

```tsx
const useAdmissionAdvanceFilter = (form: FormInstance) => {
  // ... RTK Query hooks, state, handlers ...

  const filterItemsList: FilterItemConfig[] = [
    {
      label: "استان",
      name: "activeProvince",
      mode: "multiple",
      type: "select",
      options: provinceData ?? [],
      loading: isProvinceLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "activeCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      disabled: !form.getFieldsValue()?.activeProvince?.length,
    },
    {
      label: "شعبه / واحد",
      name: "activeUni",
      mode: "multiple",
      type: "select",
      options: universityData ?? [],
      onChange: (id) => branchChangeHandler(id as string),
    },
    // ... more items ...
  ];

  return { filterItemsList, fetchInitialData };
};
```

---

## Example 4: Local Mode (no URL sync)

When you don't want filters in the URL:

```tsx
const advanceFilter = useAdvanceFilter({
  filterItems: filterItemsList,
  form,
  mode: "local",
  onSubmit: (formData, count) => {
    // formData contains raw form values
    // count is the number of active filters
    console.log("Filters applied:", formData);
    fetchDataWithFilters(formData);
  },
  onReset: () => {
    fetchDataWithoutFilters();
  },
});
```

---

## Example 5: All Filter Types

```tsx
const filterItemsList: FilterItemConfig[] = [
  // Single select
  {
    label: "سلف",
    name: "self",
    type: "select",
    mode: "single",
    options: selfData,
    loading: isSelfLoading,
  },
  // Multi select
  {
    label: "واحد دانشگاهی",
    name: "branchCode",
    type: "select",
    mode: "multiple",
    options: universityData ?? [],
    loading: isUniversityLoading,
  },
  // Select with name field (isNeedsName)
  {
    label: "خدمات",
    name: "service",
    type: "select",
    isNeedsName: true,
    itemOptionName: "name",
    options: serviceData,
  },
  // Text input
  {
    label: "عنوان محصول",
    name: "productTitle",
    type: "input",
  },
  // Date picker
  {
    label: "تاریخ",
    name: "createdDate",
    type: "date",
  },
  // Date range picker
  {
    label: "بازه زمانی",
    name: "dateRange",
    type: "range",
    picker: "date",
  },
  // Slider (numeric range)
  {
    label: "قیمت",
    name: "price",
    type: "slider",
    min: 0,
    max: 1000000,
    labelMin: "حداقل",
    labelMax: "حداکثر",
  },
  // Custom column span
  {
    label: "توضیحات",
    name: "description",
    type: "input",
    col: { span: 24 },
  },
];
```

---

## Migration Guide (V1 → V2)

### Before (V1):

```tsx
const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
const [badgeCount, setBadgeCount] = useState(0);
const [form] = Form.useForm();
const { params, setSearchParams } = useQueryParams();
const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);

const FILTER_DEPENDENCIES = ["selfId", "contractId", "vendorId"];

useEffect(() => {
  getData();
}, [...FILTER_DEPENDENCIES.map((key) => params?.[key])]);

useEffect(
  () => {
    const count = FILTER_DEPENDENCIES.filter((key) => params?.[key]).length;
    setBadgeCount(count);
  },
  FILTER_DEPENDENCIES.map((key) => params?.[key])
);

// JSX:
<CustomBadge count={badgeCount}>
  <CustomButton
    onClick={() => {
      setAdvanceModalOpen(true);
      fetchInitialData();
    }}
  >
    فیلتر پیشرفته
  </CustomButton>
</CustomBadge>;

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
      badgeCounter={(amount) => setBadgeCount(amount)}
      defaultParams={params}
    />
  );
}
```

### After (V2):

```tsx
const [form] = Form.useForm();
const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);

const advanceFilter = useAdvanceFilter({
  filterItems: filterItemsList,
  form,
  onOpen: fetchInitialData,
});

const { params } = advanceFilter;

useEffect(() => {
  getData();
}, [...advanceFilter.filterDeps.map((key) => params?.[key])]);

// JSX:
<CustomBadge count={advanceFilter.badgeCount}>
  <CustomButton onClick={advanceFilter.openModal}>
    فیلتر پیشرفته
  </CustomButton>
</CustomBadge>

<AdvanceFilterModalV2
  filterItems={filterItemsList}
  advanceFilter={advanceFilter}
/>
```

**What you delete:**

- `const [advanceModalOpen, setAdvanceModalOpen] = useState(false);`
- `const [badgeCount, setBadgeCount] = useState(0);`
- `const { params, setSearchParams } = useQueryParams();` (now from `advanceFilter.params`)
- `const FILTER_DEPENDENCIES = [...]` (auto-computed)
- Badge count `useEffect`
- Close/open handler functions
- `defaultParams` prop
