# SamimServiceTag

**Path:** `src/components/Renderers/SamimServiceTag/SamimServiceTag.tsx`  
**Base Component:** `CustomTag`  
**Styles:** `./_samimServiceTag.scss`  
**Service Configuration:** `@pages/Finance/Accountants/_shared/utils` → `serviceOptions`

## Description

A service-label component that resolves a service code against the shared `serviceOptions` configuration.

By default, it displays the service title inside an outlined `CustomTag`, using the configured color and icon. It can also render only the service title as plain text.

## Props & API

| Prop      | Type             | Default | Required | Description                                                               |
| :-------- | :--------------- | :------ | :------- | :------------------------------------------------------------------------ |
| `service` | `string \| null` | —       | No       | Service code matched against `serviceOptions.value`, ignoring letter case |
| `isText`  | `boolean`        | `false` | No       | Renders only the matched service title instead of a tag                   |

The component does not accept or forward additional `CustomTag` props.

---

## Basic Usage Examples

### 1. Default Service Tag

```tsx
<SamimServiceTag service="FOOD" />
```

### 2. Plain Text

```tsx
<SamimServiceTag service="ROOM" isText />
```
