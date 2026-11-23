# CustomDatePicker

**Path:** `src/components/CustomInputs/CustomDatePicker/CustomDatePicker.tsx`  
**Base Library:** Ant Design (`DatePicker`, `Form.Item`)  
**Date Libraries:** `dayjs`, `jalali-moment`, `moment`  
**Styles:** `./_customDatePicker.scss`

## Description

A date-picker component built on top of Ant Design's `DatePicker` and `Form.Item`. It integrates form validation, date-value conversion, shared styling, loading behavior, and an optional vertical label layout.

The component renders `JalaliLocaleListenerFix`, converts stored form values into Dayjs values for display, and formats selected dates before storing them in the form.

It forwards its ref to the underlying Ant Design date picker.

## Props & API

The component extends Ant Design DatePicker props with project-specific form and formatting options. Refer to `CustomDatePickerProps` for the exact supported contract.

| Prop                   | Type / Reference                                     | Default                      | Required | Description                                                                           |
| :--------------------- | :--------------------------------------------------- | :--------------------------- | :------- | :------------------------------------------------------------------------------------ |
| `name`                 | `NamePath`                                           | —                            | **Yes**  | Form field identifier; supports nested field paths                                    |
| `label`                | `string`                                             | —                            | No       | Form label and source for the accessible label                                        |
| `className`            | `string`                                             | —                            | No       | Additional CSS classes applied to `Form.Item`                                         |
| `customContainerClass` | `string`                                             | —                            | No       | Additional CSS classes applied to the outer `Div`                                     |
| `placeholder`          | `string`                                             | —                            | No       | Placeholder displayed when no date is selected                                        |
| `rules`                | `Rule[]`                                             | —                            | No       | Field validation rules                                                                |
| `disabled`             | `boolean`                                            | —                            | No       | Disables the date picker                                                              |
| `allowClear`           | `boolean`                                            | `true`                       | No       | Allows clearing the selected date                                                     |
| `hasFeedback`          | `boolean`                                            | `true`                       | No       | Enables form validation feedback                                                      |
| `autoFocus`            | `boolean`                                            | `false`                      | No       | Requests focus when the picker mounts                                                 |
| `disabledDate`         | `(currentDate: Dayjs) => boolean \| undefined`       | —                            | No       | Determines which dates cannot be selected; `undefined` results are treated as `false` |
| `style`                | `React.CSSProperties`                                | `{}`                         | No       | Inline styles applied to the date picker                                              |
| `popupStyle`           | `React.CSSProperties`                                | `{}`                         | No       | Popup styling forwarded to the date picker                                            |
| `picker`               | `"date" \| "week" \| "month" \| "quarter" \| "year"` | `"date"`                     | No       | Picker granularity                                                                    |
| `size`                 | `"large" \| "middle" \| "small"`                     | —                            | No       | Picker size                                                                           |
| `variant`              | `GetProps<typeof DatePicker>["variant"]`             | `"outlined"`                 | No       | Visual variant                                                                        |
| `isLoading`            | `boolean`                                            | `false`                      | No       | Forwarded to the outer `Div` as `loading`; also used as `Form.Item.shouldUpdate`      |
| `isGregorian`          | `boolean`                                            | `false`                      | No       | Selects the Gregorian branch of form-value formatting                                 |
| `hasNullInitiator`     | `boolean`                                            | `false`                      | No       | Displays the current date when the parsed form value is absent                        |
| `hasVerticalLabel`     | `boolean`                                            | `true`                       | No       | Positions the label above the picker                                                  |
| `formDateFormat`       | `string`                                             | `"YYYY-MM-DDTHH:mm:ss.SSSZ"` | No       | Output format used by the non-Gregorian conversion branch                             |
| `validateTrigger`      | `string \| string[] \| false`                        | `undefined`                  | No       | Forwarded to `Form.Item`                                                              |
| `onChange`             | `GetProps<typeof DatePicker>["onChange"]`            | —                            | No       | Receives the picker event's date and date string                                      |
| `onPanelChange`        | `GetProps<typeof DatePicker>["onPanelChange"]`       | —                            | No       | Picker panel-change handler                                                           |
| `onOpenChange`         | `GetProps<typeof DatePicker>["onOpenChange"]`        | —                            | No       | Popup visibility-change handler                                                       |
| `form`                 | `FormInstance`                                       | —                            | No       | Accepted but unused by the current implementation                                     |
| `defaultValue`         | See `CustomDatePickerProps`                          | —                            | No       | Accepted but discarded by the current implementation                                  |
| `forceRerender`        | `boolean`                                            | —                            | No       | Accepted but unused by the current implementation                                     |

> **Initialization:** Passing `form` or `defaultValue` does not initialize this component. Set the value through the owning form's initialization or field-update mechanism.

> **Calendar behavior:** `isGregorian` changes form-value serialization. It does not directly configure the picker calendar or locale.

---

## Basic Usage Examples

### 1. Required Meeting Date

Use inside the owning Ant Design form. `REQUIRED_RULE` represents the existing project validation rule.

```tsx
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import { REQUIRED_RULE } from "../../../src/infrastructure/validation/validationSchema";

<CustomDatePicker
  label="تاریخ جلسه"
  placeholder="انتخاب کنید"
  name="appealSessionDate"
  rules={[REQUIRED_RULE]}
/>;
```

### 2. Initialize Through the Owning Form

For data loaded after initialization, follow the existing page’s form-update pattern:

```tsx
submitForm.setFieldsValue({
  appealSessionDate: meetingDate,
});

<Form form={submitForm}>
  <CustomDatePicker
    label="تاریخ جلسه"
    placeholder="انتخاب کنید"
    name="appealSessionDate"
    rules={[REQUIRED_RULE]}
  />
</Form>;
```
