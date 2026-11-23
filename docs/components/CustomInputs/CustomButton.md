# CustomButton

**Path:** `src/components/CustomInputs/CustomButton/CustomButton.tsx`  
**Base Library:** Ant Design (`Button`)  
**Styles:** `./_customButton.scss`

## Description

A core base component for system buttons built on top of Ant Design's `Button`. It supports all standard Ant Design Button props while adding custom features such as a warning state (`isWarning`) and streamlined custom styling.

## Props & API

Inherits all standard Ant Design `Button` props (`type`, `size`, `loading`, `icon`, `disabled`, `onClick`, `htmlType`, etc.):

| Prop        | Type         | Default     | Required | Description                                                                |
| :---------- | :----------- | :---------- | :------- | :------------------------------------------------------------------------- |
| `children`  | `ReactNode`  | —           | **Yes**  | Content / label rendered inside the button                                 |
| `className` | `string`     | `""`        | No       | Additional CSS class names                                                 |
| `isWarning` | `boolean`    | `false`     | No       | Applies the warning color styling (`custom-button-warning-color`)          |
| `type`      | `ButtonType` | `"primary"` | No       | Ant Design button variant (`primary`, `default`, `link`, `dashed`, `text`) |

> **Note:** If `type` is omitted, Ant Design defaults to `"default"`, but project components commonly default visually/functionally to `"primary"`.

---

## Basic Usage Examples

### 1. Default Primary Button

```tsx
import CustomButton from "@/components/CustomInputs/CustomButton/CustomButton";

<CustomButton onClick={handleSubmit}>تایید و ثبت</CustomButton>;
```

### 2.Link Variant with Conditional Attributes

```tsx
<CustomButton
  type="link"
  size="small"
  onClick={() => onCancelFactorClickHandler(records)}
  className="dorm-edit-btn"
  disabled={records?.term !== 6 || records?.status === true}
>
  ابطال فاکتور
</CustomButton>
```

### 3.Compound Pattern: Button + Badge Counter (Advanced Filter Pattern)

```tsx
import { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import CustomButton from "@/components/CustomInputs/CustomButton/CustomButton";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import useQueryParams from "@infra/hooks/useQueryParams";

const { params: url, setSearchParams } = useQueryParams();
const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

<CustomBadge count={badgeCount}>
  <CustomButton
    type="primary"
    icon={<AiOutlineFilter />}
    onClick={openAdvanceFilterHandler}
  >
    فیلتر پیشرفته
  </CustomButton>
</CustomBadge>;
```
