# CustomSelect

**Path:** `src/components/CustomInputs/CustomSelect/CustomSelect.tsx`  
**Base Library:** Ant Design (`Select`, `Form.Item`)  
**Styles:** `./_customSelect.scss`  
**Types:** `./@types/@customSelect`

## Description

A core select component built on top of Ant Design's `Select` and `Form.Item`. It provides form validation, searchable options, custom option transformation, loading states, and an optional vertical label layout.

The component supports single and multiple selection, forwards its ref to the underlying select, and can explicitly store selected option objects in the supplied form instance.

## Props & API

The component forwards selected form props to `Form.Item` and remaining props to `Select`. Refer to `CustomSelectProps` for the exact supported types.

| Prop                | Type / Reference                     | Default         | Required         | Description                                                        |
| :------------------ | :----------------------------------- | :-------------- | :--------------- | :----------------------------------------------------------------- |
| `name`              | `CustomSelectProps["name"]`          | —               | For form binding | Field identifier used by `Form.Item` and explicit form updates     |
| `label`             | `FormItemProps["label"]`             | —               | No               | Field label; also used as the accessible label when it is a string |
| `className`         | `string`                             | —               | No               | Additional CSS classes applied to `Form.Item`                      |
| `options`           | `CustomSelectProps["options"]`       | `[]`            | No               | Source options passed to `transformOptions`                        |
| `onChange`          | `CustomSelectProps["onChange"]`      | —               | No               | Called with the selected value and selected option or options      |
| `form`              | `CustomSelectProps["form"]`          | —               | No               | Form instance used to explicitly store selected option objects     |
| `skipFormOnChange`  | `boolean`                            | `false`         | No               | Skips the component's explicit `form.setFieldValue` call           |
| `isLoading`         | `boolean`                            | —               | No               | Forwarded to the select's `loading` prop                           |
| `disabled`          | `boolean`                            | `false`         | No               | Disables the select                                                |
| `mode`              | `SelectProps["mode"]`                | —               | No               | Selection mode, such as `"multiple"` or `"tags"`                   |
| `maxTagCount`       | `SelectProps["maxTagCount"]`         | —               | No               | Controls how many selected tags are displayed                      |
| `placeholder`       | `SelectProps["placeholder"]`         | `"انتخاب کنید"` | No               | Placeholder displayed when no value is selected                    |
| `notFoundContent`   | `SelectProps["notFoundContent"]`     | —               | No               | Content displayed when no matching options are available           |
| `onClick`           | `SelectProps["onClick"]`             | —               | No               | Click handler forwarded to the select                              |
| `hasVerticalLabel`  | `boolean`                            | `true`          | No               | Positions the label above the select                               |
| `rules`             | `FormItemProps["rules"]`             | —               | No               | Field validation rules                                             |
| `normalize`         | `FormItemProps["normalize"]`         | —               | No               | Custom form-value normalization                                    |
| `initialValue`      | `FormItemProps["initialValue"]`      | —               | No               | Initial field value                                                |
| `labelAlign`        | `FormItemProps["labelAlign"]`        | `"right"`       | No               | Label alignment                                                    |
| `labelCol`          | `FormItemProps["labelCol"]`          | —               | No               | Label column configuration                                         |
| `colon`             | `boolean`                            | `false`         | No               | Controls the label colon                                           |
| `dependencies`      | `FormItemProps["dependencies"]`      | —               | No               | Related fields used by form dependency handling                    |
| `validateStatus`    | `FormItemProps["validateStatus"]`    | —               | No               | Explicit validation status                                         |
| `validateFirst`     | `FormItemProps["validateFirst"]`     | `false`         | No               | Controls validation behavior when a rule fails                     |
| `validateDebounce`  | `FormItemProps["validateDebounce"]`  | —               | No               | Validation debounce interval                                       |
| `validateTrigger`   | `FormItemProps["validateTrigger"]`   | —               | No               | Events that trigger validation                                     |
| `trigger`           | `FormItemProps["trigger"]`           | —               | No               | Event used to collect the field value                              |
| `valuePropName`     | `string`                             | —               | No               | Child prop used for the field value                                |
| `preserve`          | `boolean`                            | `true`          | No               | Field-value preservation setting                                   |
| `noStyle`           | `boolean`                            | `false`         | No               | Disables the normal `Form.Item` layout                             |
| `hidden`            | `boolean`                            | `false`         | No               | Hides the form item                                                |
| `hasFeedback`       | `FormItemProps["hasFeedback"]`       | `false`         | No               | Enables validation feedback                                        |
| `shouldUpdate`      | `FormItemProps["shouldUpdate"]`      | `false`         | No               | Controls form-item updates                                         |
| `help`              | `FormItemProps["help"]`              | —               | No               | Help or validation message                                         |
| `extra`             | `FormItemProps["extra"]`             | —               | No               | Additional field information                                       |
| `tooltip`           | `FormItemProps["tooltip"]`           | —               | No               | Label tooltip                                                      |
| `messageVariables`  | `FormItemProps["messageVariables"]`  | —               | No               | Variables used in validation messages                              |
| `getValueProps`     | `FormItemProps["getValueProps"]`     | —               | No               | Maps the form value to child props                                 |
| `getValueFromEvent` | `FormItemProps["getValueFromEvent"]` | —               | No               | Extracts the field value from an event                             |

> **Note:** Type references describe the underlying prop roles. The project's `CustomSelectProps` definition remains the source of truth.

> **Form behavior:** When `form` is supplied and `skipFormOnChange` is `false`, the component calls `form.setFieldValue(name, option)` before invoking the supplied `onChange`. This writes the selected option object or array of option objects, rather than only the selected value.

---

## Basic Usage Examples

### 1. Default Single Select

This example uses an explicit identity transformation for options already shaped as `{ label, value }`.

```tsx
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "../../../src/infrastructure/validation/validationSchema";

const reservationTypeOptions = [
  { title: "رزرو روزانه", id: 1 },
  { title: "رزرو ماهانه", id: 2 },
];

<CustomSelect
  label="نوع رزرو"
  name="reservationType"
  options={reservationTypeOptions}
  placeholder="نوع رزرو را انتخاب کنید"
/>;
```

### 2. Required Field with Validation and Multiple Selection

```tsx
<CustomSelect
  label="نوع رزرو"
  name="reservationType"
  rules={[REQUIRED_RULE]}
  mode="multiple"
/>
```

### 3. Loading and Empty States

```tsx
<CustomSelect
  label="نوع رزرو"
  name="reservationType"
  options={reservationTypeOptions}
  isLoading={isReservationTypesLoading}
  notFoundContent="گزینه‌ای یافت نشد"
/>
```
