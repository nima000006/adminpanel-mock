# Custom Table — reference

Read when implementing TableModel columns, parent `CustomTable` wiring, or mock data.

## Record type (`@types`)

Next to the target page file (e.g. `AllSelfList.tsx`):

- If `@types/@allSelfList.ts` exists → append the record type
- Else create `@types/@allSelfList.ts`

```ts
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllSelfListRecordType = {
  id: number;
  title: string; // plain text
  status: IdTitle; // CustomTag
  modifiedDate: string; // date
};
```

## Folder layout

For target `.../AllSelfList/AllSelfList.tsx`:

```text
AllSelfList/
  AllSelfList.tsx
  @types/
    @allSelfList.ts
  helper/
    models/
      AllSelfList/
        AllSelfListTableModel.tsx
```

## Parent `CustomTable` wiring (mock)

```tsx
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";

import { AllSelfListRecordType } from "./@types/@allSelfList";
import AllSelfListTableModel from "./helper/models/AllSelfList/AllSelfListTableModel";

const mockData: AllSelfListRecordType[] = [
  {
    id: 1,
    title: "نمونه",
    status: { id: 1, title: "فعال" },
    modifiedDate: "2024-04-21T20:20:00",
  },
];

const { params: url, setSearchParams } = useQueryParams();

<CustomTable<AllSelfListRecordType>
  dataSource={mockData}
  loading={false}
  rowKey="id"
  columns={AllSelfListTableModel({
    onView: () => {},
    onEdit: () => {},
  })}
  pagination={manualPaginationConfig({
    total: mockData.length,
    onChange: (page, pageSize) => {
      setSearchParams({
        ...url,
        page: page?.toString(),
        pageSize: pageSize?.toString(),
      });
    },
    pageNumber: url?.page ? Number(url.page) : 1,
    defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
  })}
/>;
```

Match neighboring pages for `ToolBox` / totals if the Figma shows them; do not invent unrelated chrome.

## TableModel skeleton

```tsx
import { BsEye } from "react-icons/bs";
import { PiPencilLine } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { AllSelfListRecordType } from "../../@types/@allSelfList"; // adjust relative path

const AllSelfListTableModel = ({
  onView,
  onEdit,
}: {
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}): CustomColumnType<AllSelfListRecordType>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان",
        type: "text",
      }),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (value: IdTitle) => <CustomTag>{value?.title}</CustomTag>,
    },
    {
      title: "امتیاز",
      dataIndex: "score",
      key: "score",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "score",
        label: "امتیاز",
        type: "sort",
      }),
    },
    {
      title: "تاریخ",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 150,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "actions",
      width: 50,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: AllSelfListRecordType) => {
        const contentItems = [
          {
            id: 1,
            Icon: BsEye,
            title: "مشاهده",
            onclick: () => onView(record.id),
          },
          {
            id: 2,
            Icon: PiPencilLine,
            title: "ویرایش",
            onclick: () => onEdit(record.id),
          },
        ];

        return <MenuActionPopover contentItems={contentItems} />;
      },
    },
  ];
};

export default AllSelfListTableModel;
```

## Search vs sort

**Search** (magnifying glass in Figma):

```ts
...GetServerColumnSearchProps({
  dataIndex: "title",
  label: "عنوان سلف",
  type: "text",
}),
```

**Sort**:

```ts
...GetServerColumnSearchProps({
  dataIndex: "score",
  label: "امتیاز کاربران",
  type: "sort",
}),
```

## Actions: button instead of ⋯

When Figma shows a primary/ghost button (or link) in the actions cell — not a vertical ellipsis — render that control in the sticky actions column instead of `MenuActionPopover`:

```tsx
{
  title: "",
  dataIndex: "id",
  key: "actions",
  width: 100,
  fixed: "right" as FixedType,
  className: "tables-sticky-column-left",
  render: (_: unknown, record: AllSelfListRecordType) => (
    <CustomButton type="link" onClick={() => onView(record.id)}>
      مشاهده
    </CustomButton>
  ),
}
```

Use labels/icons from the Figma. Prefer shared `CustomButton`.

## Ambiguous column: ask, then reuse or inline

Known cells (`CustomTag`, plain text, date, search/sort, standard actions) → implement without asking.

For unclear cells (star rating, icon+text composites, etc.), ask once whether a project component exists. If yes, use it. If no, inline in `render` like this (from `AllResidenceActiveListTableModel`):

```tsx
{
  title: "درجه کیفی",
  dataIndex: "rating",
  key: "rating",
  width: 150,
  render: (value: string) => (
    <div className="flex items-center gap-2">
      {value !== null ? (
        <>
          <PiStarFill width={24} height={24} color="gold" />
          <span>{value}</span>
        </>
      ) : (
        <span className="flex items-center gap-2">
          <PiStarFill width={24} height={24} color={NEUTRAL_05} />
          <span className="body-regular">فاقد درجه کیفی</span>
        </span>
      )}
    </div>
  ),
}
```

Record field type for such mock cells is usually `string` (or whatever the inline UI needs). Do not create a new shared component unless the developer asks.
