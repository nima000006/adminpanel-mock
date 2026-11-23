# CustomAlert

**Path:** `src/components/Renderers/CustomAlert/CustomAlert.tsx`  
**Base Library:** Ant Design (`Alert`)  
**Styles:** `./_customAlert.scss`

## Description

A shared alert component built on top of Ant Design's `Alert`. It adds the project's `custom-alert-container` CSS class and forwards all remaining props and the ref to the underlying alert.

Use it for informational messages, success feedback, warnings, and errors.

## Props & API

Inherits standard Ant Design `Alert` props without adding custom props.

The wrapper always adds `custom-alert-container`. Use the standard `className` prop to append additional CSS classes.

---

## Basic Usage Examples

### 1. Informational Alert

```tsx
<CustomAlert type="info" title="لطفاً اطلاعات فرم را پیش از ثبت بررسی کنید." showIcon />
```

### 2. Warning with Description

```tsx
<CustomAlert
  type="warning"
  title="اطلاعات ناقص است."
  description="برای ادامه، فیلدهای الزامی را تکمیل کنید."
  showIcon
/>
```
