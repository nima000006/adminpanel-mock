# CustomEmpty

**Path:** `src/components/Renderers/CustomEmpty/CustomEmpty.tsx`  
**Base Library:** Ant Design (`Empty`)  
**Styles:** `./_customEmpty.scss`

## Description

A shared empty-state component built on top of Ant Design's `Empty`. It displays a customizable description and wraps the empty state in the project's `Div` component to support loading behavior.

The underlying empty state always receives the `empty-container` CSS class.

## Props & API

The wrapper exposes only `loading` and `description`. It does not inherit or forward the complete Ant Design Empty props.

| Custom Prop | Type      | Default | Required | Description                                                        |
| :---------- | :-------- | :------ | :------- | :----------------------------------------------------------------- |
| `loading`   | `boolean` | —       | No       | Forwarded to the surrounding `Div` to control its loading behavior |

The standard `description` prop accepts `React.ReactNode` and is forwarded directly to `Empty`, allowing plain text or custom JSX.

---

## Basic Usage Examples

### 1. Simple Empty Message

```tsx
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";

<CustomEmpty description="واحدی با این مشخصات یافت نشد" />;
```

### 2. Multiline Description

```tsx
<CustomEmpty
  description={
    <div className="flex flex-col">
      <span>واحد اقامتی برای نمایش وجود ندارد!</span>
      <span>لطفاً ساختمان را مشخص بفرمایید.</span>
    </div>
  }
/>
```
