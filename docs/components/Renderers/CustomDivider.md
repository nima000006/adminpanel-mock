# CustomDivider

**Path:** `src/components/Renderers/CustomDivider/CustomDivider.tsx`  
**Base Library:** Ant Design (`Divider`)  
**Styles:** `./_customDivider.scss`

## Description

An enhanced divider component built on top of Ant Design's `Divider`. It wraps the divider inside a container to support rendering title content alongside an optional auxiliary slot (`extraContent`) for actions, links, or additional metadata aligned next to or within the divider area.

## Props & API

Inherits all standard Ant Design `Divider` props via `GetProps<typeof Divider>` (`dashed`, `orientation`, `orientationMargin`, `plain`, `type`, etc.):

| Prop                    | Type                            | Default        | Required | Description                                                       |
| :---------------------- | :------------------------------ | :------------- | :------- | :---------------------------------------------------------------- |
| `text`                  | `ReactNode`                     | —              | No       | Content / title label rendered inside the divider line            |
| `titlePlacement`        | `"left" \| "right" \| "center"` | `"right"`      | No       | Placement of the title text (RTL default aligned to right)        |
| `extraContent`          | `ReactNode`                     | —              | No       | Additional custom content rendered in an adjacent container slot  |
| `className`             | `string`                        | `""`           | No       | CSS class name applied directly to the internal `Divider` element |
| `rootClassName`         | `string`                        | —              | No       | Root CSS class passed to the Ant Design `Divider` component       |
| `extraContentClassName` | `string`                        | `""`           | No       | CSS class name applied to the wrapper of `extraContent`           |
| `type`                  | `"horizontal" \| "vertical"`    | `"horizontal"` | No       | Direction of the divider line (mapped to Antd `orientation`)      |
| `plain`                 | `boolean`                       | `true`         | No       | Renders title as normal text instead of heading style             |
| `dashed`                | `boolean`                       | `false`        | No       | Renders the divider line as dashed                                |
| `style`                 | `CSSProperties`                 | —              | No       | Inline styles for the inner divider element                       |

> **Note:** By default, `plain` is set to `true` and `titlePlacement` defaults to `"right"` to match standard RTL dashboard design patterns.

---

## Basic Usage Examples

### 1. Simple Section Divider with RTL Title

```tsx
import CustomDivider from "@/components/Renderers/CustomDivider/CustomDivider";

<CustomDivider text="اطلاعات هویتی و پرسنلی" />;
```

### 2.Section Header with Action in extraContent

```tsx
import CustomDivider from "@/components/Renderers/CustomDivider/CustomDivider";
import CustomButton from "@/components/CustomInputs/CustomButton/CustomButton";
import { AiOutlinePlus } from "react-icons/ai";

<CustomDivider
  text="لیست اسناد پیوست"
  extraContent={
    <div classname="flex gap-2 items-center">
      <CustomButton
        type="link"
        size="small"
        icon={<AiOutlinePlus />}
        onClick={handleAddNewDocument}
      >
        افزودن سند جدید
      </CustomButton>

      <CustomButton onClick={handleOpenModal}>تغییر وضعیت</CustomButton>
    </div>
  }
/>;
```
