# CustomBadge

**Path:** `src/components/Renderers/CustomBadge/CustomBadge.tsx`  
**Base Library:** Ant Design (`Badge`)  
**Styles:** `./_customBadge.scss`

## Description

A shared badge component built on top of Ant Design's `Badge`. It displays a count or status indicator around child content while applying the project's `custom-badge-container` CSS class.

The component forwards its ref and remaining props to the underlying badge.

## Props & API

Inherits standard Ant Design `Badge` props without adding custom props.

The wrapper introduces the following requirements and styling behavior:

| Prop        | Type              | Required | Wrapper Behavior                                          |
| :---------- | :---------------- | :------- | :-------------------------------------------------------- |
| `children`  | `React.ReactNode` | **Yes**  | Required by the wrapper's type; rendered inside the badge |
| `className` | `string`          | No       | Appended to the base `custom-badge-container` class       |

---

## Basic Usage Examples

### 1. Advanced Filter Counter

```tsx
import { AiOutlineFilter } from "react-icons/ai";

import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

<CustomBadge count={badgeCount}>
  <CustomButton
    type="default"
    icon={<AiOutlineFilter />}
    className="advance-filter-btn"
    onClick={openAdvanceFilter}
  >
    فیلتر پیشرفته
  </CustomButton>
</CustomBadge>;
```
