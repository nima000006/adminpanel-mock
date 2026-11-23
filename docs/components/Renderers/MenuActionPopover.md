# MenuActionPopover

**Path:** `src/components/Renderers/MenuActionPopover/MenuActionPopover.tsx`  
**Base Component:** `CustomPopover`  
**Icons:** `react-icons`  
**Styles:** Inline utility classes; no component-specific stylesheet imported

## Description

A reusable action menu displayed through a three-dot popover trigger. It renders a list of actions with icons and labels and is commonly used in table action columns.

The component tracks popover visibility to update the trigger's appearance. Action behavior is provided by the owning feature.

## Props & API

This component exposes only `contentItems`. It does not accept or forward additional popover props.

| Prop           | Type              | Default | Required | Description                          |
| :------------- | :---------------- | :------ | :------- | :----------------------------------- |
| `contentItems` | Action item array | —       | **Yes**  | Actions displayed inside the popover |

### Action Item Structure

| Field     | Type         | Required | Description                                  |
| :-------- | :----------- | :------- | :------------------------------------------- |
| `id`      | `number`     | **Yes**  | Unique identifier used as the React key      |
| `Icon`    | `IconType`   | **Yes**  | Icon component from `react-icons`            |
| `title`   | `string`     | **Yes**  | Visible action label                         |
| `onclick` | `() => void` | **Yes**  | Callback executed when the action is clicked |

> **Naming:** The callback property is `onclick`, with a lowercase `c`. Use this exact spelling when constructing action items.

---

## Basic Usage Examples

### 1. View and Edit Actions

```tsx
import { BsEye } from "react-icons/bs";
import { PiPencilLine } from "react-icons/pi";

const viewActionId = 1;
const editActionId = 2;

const contentItems = [
  {
    id: viewActionId,
    Icon: BsEye,
    title: "مشاهده",
    onclick: handleView,
  },
  {
    id: editActionId,
    Icon: PiPencilLine,
    title: "ویرایش",
    onclick: handleEdit,
  },
];

<MenuActionPopover contentItems={contentItems} />;
```

### 2. Usage in Table Models

```tsx
import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiTrash } from "react-icons/pi";

const actionColumnWidth = 50;

const viewFloorActionId = 1;
const viewUnitsActionId = 2;
const editFloorActionId = 3;
const archiveFloorActionId = 4;

const actionColumn = {
  title: "",
  dataIndex: "grade",
  key: "grade",
  width: actionColumnWidth,
  className: "tables-sticky-column-left",
  fixed: "right" as const,
  render: (_: unknown, record: FloorRecord) => {
    const contentItems = [
      {
        id: viewFloorActionId,
        Icon: BsEye,
        title: "مشاهده",
        onclick: () => viewFloorHandler(record.id),
      },
      {
        id: viewUnitsActionId,
        Icon: BsEye,
        title: "مشاهده واحدهای اقامتی",
        onclick: () => viewUnitHandler(record.id),
      },
      {
        id: editFloorActionId,
        Icon: PiPencilLine,
        title: "ویرایش",
        onclick: () => editFloorClickHandler(record.id),
      },
      {
        id: archiveFloorActionId,
        Icon: PiTrash,
        title: "غیرفعالسازی (انتقال به آرشیو)",
        onclick: () => disableFloorHandler(record.id),
      },
    ];

    return <MenuActionPopover contentItems={contentItems} />;
  },
};
```
