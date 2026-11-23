# CustomTextArea

**Path:** `src/components/CustomInputs/CustomTextArea/CustomTextArea.tsx`  
**Base Library:** Ant Design (`Input.TextArea`, `Form.Item`)  
**Styles:** `./_customTextArea.scss`  
**Types:** `./@types/@customTextArea`

## Description

A core multiline text-input component built on top of Ant Design's `Input.TextArea` and `Form.Item`. It combines form validation, shared styling, configurable automatic sizing, and an optional vertical label layout.

The component forwards its ref to the underlying text area and accepts a custom form-value normalization function.

## Props & API

The component forwards selected form props to `Form.Item` and remaining props to `Input.TextArea`. Refer to `CustomTextAreaProps` for the exact supported types.

| Prop                | Type / Reference                     | Default   | Required         | Description                                                        |
| :------------------ | :----------------------------------- | :-------- | :--------------- | :----------------------------------------------------------------- |
| `name`              | `CustomTextAreaProps["name"]`        | —         | For form binding | Field identifier; also passed to the text area's `id` and `name`   |
| `label`             | `CustomTextAreaProps["label"]`       | —         | No               | Form label; also passed directly to `aria-label`                   |
| `className`         | `string`                             | —         | No               | Additional CSS classes applied to `Form.Item`                      |
| `placeholder`       | `string`                             | —         | No               | Hint displayed when the text area is empty                         |
| `autoSize`          | `CustomTextAreaProps["autoSize"]`    | —         | No               | Automatic height configuration, including minimum and maximum rows |
| `disabled`          | `boolean`                            | `false`   | No               | Disables the text area                                             |
| `maxLength`         | `number`                             | —         | No               | Maximum input length                                               |
| `hasVerticalLabel`  | `boolean`                            | `true`    | No               | Positions the label above the text area                            |
| `rules`             | `FormItemProps["rules"]`             | —         | No               | Field validation rules                                             |
| `normalize`         | `FormItemProps["normalize"]`         | —         | No               | Custom form-value normalization                                    |
| `initialValue`      | `FormItemProps["initialValue"]`      | —         | No               | Initial field value                                                |
| `labelAlign`        | `FormItemProps["labelAlign"]`        | `"right"` | No               | Label alignment                                                    |
| `labelCol`          | `FormItemProps["labelCol"]`          | —         | No               | Label column configuration                                         |
| `colon`             | `boolean`                            | `false`   | No               | Controls the label colon                                           |
| `dependencies`      | `FormItemProps["dependencies"]`      | —         | No               | Related fields used by form dependency handling                    |
| `validateStatus`    | `FormItemProps["validateStatus"]`    | —         | No               | Explicit validation status                                         |
| `validateFirst`     | `FormItemProps["validateFirst"]`     | `false`   | No               | Controls validation behavior when a rule fails                     |
| `validateDebounce`  | `FormItemProps["validateDebounce"]`  | —         | No               | Validation debounce interval                                       |
| `validateTrigger`   | `FormItemProps["validateTrigger"]`   | —         | No               | Events that trigger validation                                     |
| `trigger`           | `FormItemProps["trigger"]`           | —         | No               | Event used to collect the field value                              |
| `valuePropName`     | `string`                             | —         | No               | Child prop used for the field value                                |
| `preserve`          | `boolean`                            | `true`    | No               | Field-value preservation setting                                   |
| `noStyle`           | `boolean`                            | `false`   | No               | Disables the inner `Form.Item` layout styling                      |
| `hidden`            | `boolean`                            | `false`   | No               | Hides the inner `Form.Item`                                        |
| `hasFeedback`       | `FormItemProps["hasFeedback"]`       | `false`   | No               | Enables validation feedback                                        |
| `shouldUpdate`      | `FormItemProps["shouldUpdate"]`      | `false`   | No               | Controls form-item updates                                         |
| `help`              | `FormItemProps["help"]`              | —         | No               | Help or validation message                                         |
| `extra`             | `FormItemProps["extra"]`             | —         | No               | Additional field information                                       |
| `tooltip`           | `FormItemProps["tooltip"]`           | —         | No               | Label tooltip                                                      |
| `messageVariables`  | `FormItemProps["messageVariables"]`  | —         | No               | Variables used in validation messages                              |
| `getValueProps`     | `FormItemProps["getValueProps"]`     | —         | No               | Maps the form value to child props                                 |
| `getValueFromEvent` | `FormItemProps["getValueFromEvent"]` | —         | No               | Extracts the field value from an event                             |

> **Note:** Type references describe the underlying prop roles. The project's `CustomTextAreaProps` definition remains the source of truth.

> **Normalization:** This component forwards the supplied `normalize` function to `Form.Item`. It does not apply automatic character or digit normalization internally.

---

## Basic Usage Examples

### 1. Default Text Area

```tsx
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "../../../src/infrastructure/validation/validationSchema";

<CustomTextArea
  label="توضیحات"
  name="description"
  placeholder="توضیحات خود را وارد کنید."
/>;
```

### 2. Required Field with Validation

```tsx
<CustomTextArea
  label="دلیل درخواست"
  name="requestReason"
  placeholder="دلیل درخواست را وارد کنید."
  rules={[REQUIRED_RULE]}
/>
```

### 3. Character Limit

```tsx
<CustomTextArea
  label="توضیحات"
  name="description"
  placeholder="توضیحات خود را وارد کنید."
  maxLength={500}
/>
```
