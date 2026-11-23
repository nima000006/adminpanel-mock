# CustomRangePicker

**Path:** `src/components/CustomInputs/CustomRangePicker/CustomRangePicker.tsx`  
**Base Library:** Ant Design (`DatePicker.RangePicker`, `Form.Item`)  
**Date Library:** `dayjs` with `utc` and `timezone` plugins  
**Styles:** `./_customRangePicker.scss`  
**Types:** `CustomRangePickerProps` and `CustomRangePickerOnChange`, currently declared in the component file

## Description

A date-range component built on top of Ant Design's `DatePicker.RangePicker` and `Form.Item`. It supports form validation, range presets, date restrictions, loading behavior, and an optional vertical label layout.

The component converts stored form values into Dayjs objects for display and serializes selected dates into ISO strings before storing them in the form.

It renders `JalaliLocaleListenerFix` and forwards its ref to the underlying range picker.

## Props & API

The component exposes a specific set of props through `CustomRangePickerProps`. It does not extend the complete Ant Design `RangePickerProps` interface.

| Prop                   | Type / Reference                                     | Default  | Required | Description                                                                           |
| :--------------------- | :--------------------------------------------------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| `name`                 | `NamePath`                                           | —        | **Yes**  | Form field identifier; supports nested field paths                                    |
| `label`                | `string`                                             | —        | No       | Form label                                                                            |
| `className`            | `string`                                             | —        | No       | Additional CSS classes applied to `Form.Item`                                         |
| `customContainerClass` | `string`                                             | —        | No       | Additional CSS classes applied to the outer `Div`                                     |
| `placeholder`          | `[string, string]`                                   | —        | No       | Placeholders for the start and end inputs                                             |
| `rules`                | `Rule[]`                                             | —        | No       | Field validation rules                                                                |
| `disabled`             | `boolean`                                            | —        | No       | Disables the range picker                                                             |
| `allowClear`           | `boolean`                                            | `true`   | No       | Allows clearing the selected range                                                    |
| `autoFocus`            | `boolean`                                            | `false`  | No       | Requests focus when the picker mounts                                                 |
| `disabledDate`         | `(currentDate: Dayjs) => boolean \| undefined`       | —        | No       | Determines which dates cannot be selected; `undefined` results are treated as `false` |
| `style`                | `React.CSSProperties`                                | `{}`     | No       | Inline styles applied to the range picker                                             |
| `popupStyle`           | `React.CSSProperties`                                | `{}`     | No       | Popup styling forwarded to the range picker                                           |
| `variant`              | `"filled" \| "outlined" \| "borderless"`             | —        | No       | Visual variant                                                                        |
| `picker`               | `"date" \| "week" \| "month" \| "quarter" \| "year"` | `"date"` | No       | Picker granularity                                                                    |
| `size`                 | `"large" \| "middle" \| "small"`                     | —        | No       | Picker size                                                                           |
| `isLoading`            | `boolean`                                            | `false`  | No       | Forwarded to the outer `Div` as `loading`; also used as `Form.Item.shouldUpdate`      |
| `hasVerticalLabel`     | `boolean`                                            | `true`   | No       | Positions the label above the range picker                                            |
| `defaultValue`         | `unknown`                                            | —        | No       | Converted to a Dayjs pair and forwarded to the underlying picker                      |
| `form`                 | `FormInstance`                                       | —        | No       | Accepted but unused by the current implementation                                     |
| `presets`              | `RangePickerProps["presets"]`                        | —        | No       | Predefined date ranges                                                                |
| `onChange`             | `CustomRangePickerOnChange`                          | —        | No       | Receives selected dates and their display strings                                     |
| `onPanelChange`        | `RangePickerProps["onPanelChange"]`                  | —        | No       | Picker panel-change handler                                                           |
| `onOpenChange`         | `RangePickerProps["onOpenChange"]`                   | —        | No       | Popup visibility-change handler                                                       |

> **Form initialization:** The picker is connected to a named `Form.Item`. Initialize its value through the owning form rather than relying on the underlying picker's `defaultValue`.

> **Validation feedback:** `hasFeedback` is always enabled internally. The wrapper does not expose a prop to disable it.

---

## Basic Usage Examples

### 1. Default Date Range

Use inside the owning Ant Design form:

```tsx
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import { REQUIRED_RULE } from "../../../src/infrastructure/validation/validationSchema";

<CustomRangePicker
  label="بازه تاریخ"
  name="rangeDate"
  placeholder={["تاریخ شروع", "تاریخ پایان"]}
  rules={[REQUIRED_RULE]}
/>;
```
