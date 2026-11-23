# CustomInputNumber

**Path:** `src/components/CustomInputs/InputNumber/CustomInputNumber.tsx`  
**Base Library:** Ant Design (`InputNumber`, `Form.Item`)  
**Styles:** `./_customInputNumber.scss`  
**Types:** `CustomInputProps`, currently declared in the component file

## Description

A numeric-input component built on top of Ant Design's `InputNumber` and `Form.Item`. It provides form validation, configurable numeric controls, an optional vertical label layout, and a price-display mode.

When `isPrice` is enabled, the component formats the displayed value through `PriceSeparator` and shows its equivalent in Toman words through a focus-triggered tooltip and additional text below the field.

The component forwards its ref to the underlying `InputNumber`.

## Props & API

The component extends Ant Design InputNumber props with form-related options and price-display behavior. Selected form props are forwarded to `Form.Item`, while remaining props are spread onto `InputNumber`.

| Prop                | Type / Reference                                          | Default   | Required         | Description                                                                      |
| :------------------ | :-------------------------------------------------------- | :-------- | :--------------- | :------------------------------------------------------------------------------- |
| `name`              | `NamePath`                                                | —         | For form binding | Field identifier; also passed to the input's `id` and `name`                     |
| `label`             | `string`                                                  | —         | No               | Form label and source for the accessible label                                   |
| `className`         | `string`                                                  | —         | No               | Additional CSS classes applied to `Form.Item`                                    |
| `placeholder`       | `string`                                                  | —         | No               | Hint displayed when the input is empty                                           |
| `type`              | Inherited input type                                      | `"text"`  | No               | Input type forwarded to `InputNumber`                                            |
| `size`              | `SizeType`                                                | —         | No               | Input size                                                                       |
| `isPrice`           | `boolean`                                                 | —         | No               | Enables price formatting and Toman text                                          |
| `addonBefore`       | `ReactNode`                                               | —         | No               | Content displayed before the input                                               |
| `maxLength`         | `number`                                                  | `16`      | No               | Input-length setting forwarded to `InputNumber`                                  |
| `min`               | `number`                                                  | —         | No               | Minimum-value setting                                                            |
| `controls`          | `boolean \| { upIcon?: ReactNode; downIcon?: ReactNode }` | `false`   | No               | Enables or customizes increment and decrement controls                           |
| `disabled`          | `boolean`                                                 | —         | No               | Forwarded to `InputNumber` through remaining props                               |
| `autoFocus`         | `boolean`                                                 | —         | No               | Forwarded to `InputNumber` through remaining props                               |
| `hasVerticalLabel`  | `boolean`                                                 | `true`    | No               | Adds the vertical-label class to `Form.Item`                                     |
| `rules`             | `Rule[]`                                                  | —         | No               | Field validation rules                                                           |
| `normalize`         | `CustomInputProps["normalize"]`                           | —         | No               | Custom form-value normalization                                                  |
| `initialValue`      | `CustomInputProps["initialValue"]`                        | —         | No               | Initial form field value; also initializes local price-description state         |
| `labelAlign`        | `FormLabelAlign`                                          | `"right"` | No               | Label alignment                                                                  |
| `labelCol`          | `ColProps`                                                | —         | No               | Label column configuration                                                       |
| `colon`             | `boolean`                                                 | `false`   | No               | Controls the label colon                                                         |
| `dependencies`      | `NamePath[]`                                              | —         | No               | Related fields used by form dependency handling                                  |
| `validateStatus`    | `"" \| "success" \| "warning" \| "error" \| "validating"` | —         | No               | Explicit validation status                                                       |
| `validateFirst`     | `boolean \| "parallel"`                                   | `false`   | No               | Controls validation behavior when a rule fails                                   |
| `validateDebounce`  | `number`                                                  | —         | No               | Validation debounce interval                                                     |
| `validateTrigger`   | `string \| string[] \| false`                             | —         | No               | Events that trigger validation                                                   |
| `trigger`           | `string`                                                  | —         | No               | Event used by `Form.Item` to collect the value                                   |
| `valuePropName`     | `string`                                                  | —         | No               | Child prop used for form-value binding                                           |
| `preserve`          | `boolean`                                                 | `true`    | No               | Field-value preservation setting                                                 |
| `noStyle`           | `boolean`                                                 | `false`   | No               | Disables the inner `Form.Item` layout styling                                    |
| `hidden`            | `boolean`                                                 | `false`   | No               | Hides the inner `Form.Item`                                                      |
| `hasFeedback`       | `boolean \| { icons: FeedbackIcons }`                     | `false`   | No               | Form validation feedback configuration                                           |
| `shouldUpdate`      | `CustomInputProps["shouldUpdate"]`                        | `false`   | No               | Controls form-item updates                                                       |
| `help`              | `ReactNode`                                               | —         | No               | Help or validation message                                                       |
| `extra`             | `ReactNode`                                               | —         | No               | Additional field information, shown after the amount-in-words text in price mode |
| `tooltip`           | `FormItemTooltipType`                                     | —         | No               | Form-label tooltip; separate from the price tooltip                              |
| `messageVariables`  | `Record<string, string>`                                  | —         | No               | Variables used in validation messages                                            |
| `getValueProps`     | `CustomInputProps["getValueProps"]`                       | —         | No               | Maps the form value to child props                                               |
| `getValueFromEvent` | `CustomInputProps["getValueFromEvent"]`                   | —         | No               | Extracts a form value from an event                                              |

> **Additional input props:** Properties such as `max`, `step`, `precision`, and `onChange` come from the inherited InputNumber props. Confirm their supported types in the project before using them.

> **Type inconsistency:** The supplied type declares `defaultValue` as `dayjs.Dayjs` despite wrapping a numeric input. Do not use a Dayjs object as a numeric value. Prefer the owning form's initialization pattern.

---

## Basic Usage Examples

### 1. Default Numeric Input

```tsx
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import { REQUIRED_RULE } from "../../../src/infrastructure/validation/validationSchema";

<CustomInputNumber
  label="تعداد"
  name="quantity"
  placeholder="تعداد را وارد کنید."
  rules={[REQUIRED_RULE]}
/>;
```

### 2.Price Input

Use when the entered amount is in Rial and the amount-in-words display should be in Toman:

```tsx
const minimumAmount = 0;

<CustomInputNumber
  label="مبلغ"
  name="amount"
  placeholder="مبلغ را به ریال وارد کنید."
  min={minimumAmount}
  isPrice
  extra="مبلغ را به ریال وارد کنید."
/>;
```
