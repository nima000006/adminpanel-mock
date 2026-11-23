# CustomInput

**Path:** `src/components/CustomInputs/CustomInput/CustomInput.tsx`  
**Base Library:** Ant Design (`Input`, `Form.Item`)  
**Styles:** `./_customInput.scss`  
**Types:** `./@types/@customInput`

## Description

A core input component built on top of Ant Design's `Input` and `Form.Item`. It combines form validation, shared styling, value normalization, and an optional vertical label layout.

The component forwards its ref to the underlying Ant Design input. String values handled by its form normalization function are processed through `normalizeArabicPersianToEnglishAndFarsi`.

## Props & API

The component forwards selected form props to `Form.Item` and remaining props to `Input`. Refer to `CustomInputProps` for the exact supported types.

| Prop                | Type / Reference                     | Default   | Required         | Description                                                     |
| :------------------ | :----------------------------------- | :-------- | :--------------- | :-------------------------------------------------------------- |
| `name`              | `CustomInputProps["name"]`           | —         | For form binding | Field identifier; also passed to the input's `id` and `name`    |
| `label`             | `FormItemProps["label"]`             | `""`      | No               | Field label; also used to generate the input's accessible label |
| `type`              | `InputProps["type"]`                 | `"text"`  | No               | Input type                                                      |
| `placeholder`       | `string`                             | —         | No               | Hint displayed when the input is empty                          |
| `rules`             | `FormItemProps["rules"]`             | —         | No               | Field validation rules                                          |
| `size`              | `InputProps["size"]`                 | —         | No               | Input size                                                      |
| `maxLength`         | `number`                             | —         | No               | Maximum input length                                            |
| `addonBefore`       | `InputProps["addonBefore"]`          | —         | No               | Content displayed before the input                              |
| `className`         | `string`                             | —         | No               | Additional CSS classes applied to `Form.Item`                   |
| `rootClassName`     | `string`                             | —         | No               | Additional CSS classes applied to the outer wrapper             |
| `hasVerticalLabel`  | `boolean`                            | `true`    | No               | Positions the label above the input                             |
| `labelAlign`        | `FormItemProps["labelAlign"]`        | `"right"` | No               | Label alignment                                                 |
| `labelCol`          | `FormItemProps["labelCol"]`          | —         | No               | Label column configuration                                      |
| `colon`             | `boolean`                            | `false`   | No               | Controls the label colon                                        |
| `initialValue`      | `FormItemProps["initialValue"]`      | —         | No               | Initial field value                                             |
| `dependencies`      | `FormItemProps["dependencies"]`      | —         | No               | Related fields used by form dependency handling                 |
| `validateStatus`    | `FormItemProps["validateStatus"]`    | —         | No               | Explicit validation status                                      |
| `validateFirst`     | `FormItemProps["validateFirst"]`     | `false`   | No               | Controls validation behavior when a rule fails                  |
| `validateDebounce`  | `number`                             | —         | No               | Validation debounce interval                                    |
| `validateTrigger`   | `FormItemProps["validateTrigger"]`   | —         | No               | Events that trigger validation                                  |
| `trigger`           | `FormItemProps["trigger"]`           | —         | No               | Event used to collect the field value                           |
| `valuePropName`     | `string`                             | —         | No               | Child prop used for the field value                             |
| `preserve`          | `boolean`                            | `true`    | No               | Preserves the field value when the field is removed             |
| `noStyle`           | `boolean`                            | `false`   | No               | Disables the inner `Form.Item` layout styling                   |
| `hidden`            | `boolean`                            | `false`   | No               | Hides the inner `Form.Item`                                     |
| `hasFeedback`       | `FormItemProps["hasFeedback"]`       | `false`   | No               | Enables validation feedback                                     |
| `shouldUpdate`      | `FormItemProps["shouldUpdate"]`      | `false`   | No               | Controls form-item updates                                      |
| `help`              | `FormItemProps["help"]`              | —         | No               | Help or validation message                                      |
| `extra`             | `FormItemProps["extra"]`             | —         | No               | Additional field information                                    |
| `tooltip`           | `FormItemProps["tooltip"]`           | —         | No               | Label tooltip                                                   |
| `messageVariables`  | `FormItemProps["messageVariables"]`  | —         | No               | Variables used in validation messages                           |
| `getValueProps`     | `FormItemProps["getValueProps"]`     | —         | No               | Maps the form value to child props                              |
| `getValueFromEvent` | `FormItemProps["getValueFromEvent"]` | —         | No               | Extracts the field value from an event                          |

> **Note:** The type references above describe the underlying prop roles. The project's `CustomInputProps` definition remains the source of truth.

> **Normalization:** Nullish values become `""`, strings pass through the project's normalization helper, and other values remain unchanged. The component supplies this behavior internally; it does not forward a custom `normalize` prop to `Form.Item`.

---

## Basic Usage Examples

### 1. Default Text Input

```tsx
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  REQUIRED_RULE,
  MIN_LENGTH_RULE,
} from "../../../src/infrastructure/validation/validationSchema";

<CustomInput
  label="نوع رزرو"
  type="text"
  placeholder="نوع رزرو اتاق"
  name="reservationType"
/>;
```

### 2. Required Field with Validation

```tsx
<CustomInput
  label="نوع رزرو"
  name="reservationType"
  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
/>
```

### 3. Custom Label Layout and Styling

```tsx
<CustomInput
  label="نوع رزرو"
  name="reservationType"
  placeholder="نوع رزرو اتاق"
  hasVerticalLabel={false}
  rootClassName="reservation-type-input"
  className="reservation-type-form-item"
/>
```
