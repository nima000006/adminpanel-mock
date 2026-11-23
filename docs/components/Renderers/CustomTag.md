# CustomTag

**Path:** `src/components/Renderers/CustomTag/CustomTag.tsx`  
**Base Library:** Ant Design (`Tag`)  
**Styles:** `./_customTag.scss`

## Description

A customized wrapper over Ant Design's `Tag` component implemented with `forwardRef`. It applies the default project outline variant (`variant="outlined"`), standard styling classes, and an optional fixed-width constraint (`staticWidth`) for consistent status labeling across tables and views.

## Props & API

Inherits all standard Ant Design `Tag` props via `GetProps<typeof Tag>` (`color`, `closable`, `onClose`, `icon`, `bordered`, etc.):

| Prop          | Type               | Default      | Required | Description                                                           |
| :------------ | :----------------- | :----------- | :------- | :-------------------------------------------------------------------- |
| `children`    | `ReactNode`        | —            | **Yes**  | Content / label rendered inside the tag                               |
| `staticWidth` | `number \| string` | —            | No       | Fixed width applied to the tag style (e.g. `80`, `"100px"`, `"100%"`) |
| `className`   | `string`           | `""`         | No       | Additional CSS class names appended to `.custom-tag-main-container`   |
| `variant`     | `string`           | `"outlined"` | No       | Tag variant (hardcoded by default to `"outlined"`)                    |

> **Note:** Supports ref forwarding via `forwardRef<GetRef<typeof Tag>, CustomTagProps>`.

---

## Basic Usage Examples

### 1. Basic Status Tag

```tsx
import CustomTag from "@/components/Renderers/CustomTag/CustomTag";

<CustomTag color="success">فعال</CustomTag>;
```

### 2. Fixed-Width Status Tag (for Table Column Alignment)

```tsx
import CustomTag from "@/components/Renderers/CustomTag/CustomTag";

<CustomTag
  color={status === "PENDING" ? "warning" : "error"}
  staticWidth={90}
  className="text-center"
>
  {status === "PENDING" ? "در انتظار تایید" : "رد شده"}
</CustomTag>;
```

### 3. Tag with Icon and Close Handler

```tsx
import CustomTag from "@/components/Renderers/CustomTag/CustomTag";
import { AiOutlineClockCircle } from "react-icons/ai";

<CustomTag
  color="processing"
  icon={<AiOutlineClockCircle />}
  closable
  onClose={handleRemoveFilter}
>
  فیلتر: امروز
</CustomTag>;
```
