# SingleVerticalWithCol

**Path:** `src/components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol.tsx`  
**Base Library:** Ant Design (`Col`, `Statistic`)  
**Styles:** `../SingleVerticalItem/_singleVerticalItem.scss`

## Description

A layout-aware wrapper component that combines Ant Design's grid column system (`Col`) with `SingleVerticalItem` (built over Ant Design's `Statistic`). It is designed for displaying key-value pairs, metrics, and details inside responsive grid rows (`Row`), offering built-in responsive breakpoints and advanced formatting (numbers, count-up animations, dates, times, currencies, and custom placeholder handling).

## Props & API

Inherits all props from `SingleVerticalItemProps` (which extends Ant Design's `StatisticProps`), as well as responsive column grid props from Ant Design's `ColProps`:

### Grid / Layout Props (Ant Design `Col`)

| Prop   | Type                | Default | Required | Description                                                   |
| :----- | :------------------ | :------ | :------- | :------------------------------------------------------------ |
| `span` | `number`            | —       | No       | Raster number of cells to occupy (overrides responsive props) |
| `xs`   | `number \| ColSize` | `24`    | No       | Grid sizing for screen width `< 576px`                        |
| `sm`   | `number \| ColSize` | `12`    | No       | Grid sizing for screen width `≥ 576px`                        |
| `md`   | `number \| ColSize` | `8`     | No       | Grid sizing for screen width `≥ 768px`                        |
| `lg`   | `number \| ColSize` | `6`     | No       | Grid sizing for screen width `≥ 992px`                        |
| `xl`   | `number \| ColSize` | `6`     | No       | Grid sizing for screen width `≥ 1200px`                       |

### Item / Content Props (`SingleVerticalItem`)

| Prop                      | Type                      | Default | Required | Description                                                              |
| :------------------------ | :------------------------ | :------ | :------- | :----------------------------------------------------------------------- |
| `label`                   | `ReactNode`               | —       | No       | Title / label displayed above the value (maps to Antd `title`)           |
| `value`                   | `string \| number`        | —       | No       | Main value to display                                                    |
| `hasCountUpEffect`        | `boolean`                 | `false` | No       | Enables count-up animated effect using `AnimatedCountUp` for numbers     |
| `icon`                    | `ReactNode`               | —       | No       | Optional icon placed before the formatted value inside the container     |
| `symbol`                  | `ReactNode`               | —       | No       | Suffix symbol rendered right after the value (e.g., currency units, `%`) |
| `extraContent`            | `ReactNode`               | —       | No       | Additional custom content aligned on the far end of the value container  |
| `hint`                    | `ReactNode`               | —       | No       | Optional helper text below the value box (e.g. `"X روز"`)                |
| `valueClassName`          | `string`                  | —       | No       | CSS class name applied directly to the value's wrapper span              |
| `className`               | `string`                  | `""`    | No       | CSS class name applied to the underlying `Statistic` element             |
| `isPrice`                 | `boolean`                 | `false` | No       | Formats the value as a separated price string via `dataPlaceHolder`      |
| `isPriceWithExtraNumbers` | `boolean`                 | `false` | No       | Keeps/formats additional floating numbers for price values               |
| `isRial`                  | `boolean`                 | `false` | No       | Signals currency formatting in Rial                                      |
| `currency`                | `string`                  | —       | No       | Currency label/symbol passed to the placeholder formatter                |
| `isDate`                  | `boolean`                 | `false` | No       | Formats the value as a localized date                                    |
| `isTime`                  | `boolean`                 | `false` | No       | Formats the value as time                                                |
| `hasSpecialTime`          | `boolean`                 | `false` | No       | Includes special time formatting along with the date                     |
| `customDateFormat`        | `string`                  | —       | No       | Custom date format string                                                |
| `callBack`                | `(val: any) => ReactNode` | —       | No       | Custom transformation callback for the raw value                         |
| `loading`                 | `boolean`                 | `false` | No       | Ant Design statistic loading skeleton state                              |

> **Note:** If `span` is provided, explicit responsive breakpoints (`xs`, `sm`, `md`, `lg`, `xl`) are bypassed. If neither is specified, the component defaults to a standard 4-column desktop layout (`xl: 6, lg: 6, md: 8, sm: 12, xs: 24`).

---

## Basic Usage Examples

### 1. Default Responsive Information Item

```tsx
import { Row } from "antd";
import SingleVerticalWithCol from "@/components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

<Row gutter={[16, 16]}>
  <SingleVerticalWithCol label="نام و نام خانوادگی" value={userData?.fullName} />
  <SingleVerticalWithCol label="کد پرسنلی" value={userData?.personnelCode} />
</Row>;
```

### 2. Price Formatting with Currency and Custom Grid Span

```tsx
import { Row } from "antd";
import SingleVerticalWithCol from "@/components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

<Row gutter={[16, 16]}>
  <SingleVerticalWithCol
    span={12}
    label="مبلغ کل فاکتور"
    value={invoice?.totalAmount}
    isPrice
    symbol="ریال"
  />
</Row>;
```

### 3. Metric with Animated CountUp and Custom Icon / Extra Action

```tsx
import { Row } from "antd";
import { AiOutlineRise, AiOutlineInfoCircle } from "react-icons/ai";
import SingleVerticalWithCol from "@/components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

<Row gutter={[16, 16]}>
  <SingleVerticalWithCol
    xl={8}
    md={12}
    xs={24}
    label="تعداد تراکنش‌های موفق"
    value={statistics?.transactionCount}
    hasCountUpEffect
    icon={<AiOutlineRise className="text-green-500" />}
    extraContent={
      <AiOutlineInfoCircle
        className="cursor-pointer text-gray-400"
        title="آمار ۲۴ ساعت گذشته"
      />
    }
  />
</Row>;
```

### 4. Value with Hint Text Below the Box

```tsx
import { Row } from "antd";
import SingleVerticalWithCol from "@/components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

<Row gutter={[16, 16]}>
  <SingleVerticalWithCol
    label="تاریخ شروع و پایان مجاز اسکان"
    value="۱۴۰۳/۰۶/۰۱ — ۱۴۰۳/۱۰/۳۰"
    hint="X روز"
    lg={6}
    md={12}
  />
</Row>;
```
