# CustomSegmented

**Path:** `src/components/Renderers/CustomSegmented/CustomSegmented.tsx`  
**Base Library:** Ant Design (`Segmented`)  
**Styles:** `./_customSegmented.scss`

## Description

A shared segmented control built on top of Ant Design's `Segmented`. Use it to switch between related views or options within a page.

The wrapper adds the `custom-segmented-main-container` CSS class and forwards the ref and remaining props to the underlying control.

## Props & API

Inherits the underlying Segmented component's props without adding custom props.

The standard `className` prop appends additional CSS classes to `custom-segmented-main-container`.

---

## Basic Usage Examples

### 1. Switch Between Accommodation Views

```tsx
<CustomSegmented
  options={[
    {
      value: "0",
      label: "اطلاعات واحد اقامتی",
    },
    {
      value: "1",
      label: "امکانات واحد اقامتی",
      disabled: false,
    },
  ]}
  block
  value={view}
  onChange={(value) => {
    setView(value);
  }}
/>
```
