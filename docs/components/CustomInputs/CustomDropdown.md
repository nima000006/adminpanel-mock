# CustomDropdown

**Path:** `src/components/CustomInputs/CustomDropdown/CustomDropdown.tsx`  
**Base Library:** Ant Design (`Dropdown`, `Form.Item`)  
**Styles:** `./_customDropdown.scss`  
**Types:** `CustomDropDownProps`, currently declared in the component file

## Description

A dropdown component built on top of Ant Design's `Dropdown` and `Form.Item`. It combines an action menu with optional form-label layout and shared project styling.

The component accepts a complete menu configuration through `items` and renders its trigger content through `children`. Trigger content is wrapped in an anchor that prevents default navigation.

## Props & API

The component extends Ant Design Dropdown props with form-related options. Selected form props are forwarded to `Form.Item`, while remaining props are spread onto `Dropdown`.

| Prop                | Type / Reference                                           | Default     | Required | Description                                                  |
| :------------------ | :--------------------------------------------------------- | :---------- | :------- | :----------------------------------------------------------- |
| `items`             | `MenuProps`                                                | —           | **Yes**  | Complete menu configuration passed to `Dropdown.menu`        |
| `children`          | `ReactNode`                                                | —           | **Yes**  | Content rendered inside the dropdown's trigger anchor        |
| `trigger`           | `Array<"click" \| "hover" \| "contextMenu">`               | `["hover"]` | No       | Interactions that open the dropdown                          |
| `placement`         | `"bottomLeft" \| "bottomRight" \| "topLeft" \| "topRight"` | —           | No       | Popup placement                                              |
| `arrow`             | `boolean \| { pointAtCenter: boolean }`                    | —           | No       | Controls the popup arrow                                     |
| `disabled`          | `boolean`                                                  | —           | No       | Disables the dropdown                                        |
| `className`         | `string`                                                   | —           | No       | Additional CSS classes applied to `Form.Item`                |
| `label`             | `string`                                                   | —           | No       | Optional form label                                          |
| `name`              | `NamePath`                                                 | —           | No       | Optional form field identifier                               |
| `rules`             | `CustomDropDownProps["rules"]`                             | —           | No       | Validation rules forwarded to `Form.Item`                    |
| `help`              | `ReactNode`                                                | —           | No       | Help or validation message                                   |
| `colon`             | `boolean`                                                  | `false`     | No       | Controls the label colon                                     |
| `valuePropName`     | `string`                                                   | —           | No       | Child prop used for form-value binding                       |
| `dependencies`      | `NamePath[]`                                               | —           | No       | Related fields used by form dependency handling              |
| `validateStatus`    | `"" \| "success" \| "warning" \| "error" \| "validating"`  | —           | No       | Explicit validation status                                   |
| `validateFirst`     | `boolean \| "parallel"`                                    | `false`     | No       | Controls validation behavior when a rule fails               |
| `validateDebounce`  | `number`                                                   | —           | No       | Validation debounce interval                                 |
| `validateTrigger`   | `string \| string[] \| false`                              | —           | No       | Events that trigger form validation                          |
| `formTrigger`       | `string`                                                   | —           | No       | Declared but not connected to `Form.Item.trigger`            |
| `tooltip`           | `FormItemTooltipType`                                      | —           | No       | Label tooltip                                                |
| `shouldUpdate`      | `CustomDropDownProps["shouldUpdate"]`                      | `false`     | No       | Controls form-item updates                                   |
| `required`          | `boolean`                                                  | `false`     | No       | Required-label presentation setting forwarded to `Form.Item` |
| `preserve`          | `boolean`                                                  | `true`      | No       | Field-value preservation setting                             |
| `noStyle`           | `boolean`                                                  | `false`     | No       | Disables the inner `Form.Item` layout styling                |
| `hidden`            | `boolean`                                                  | `false`     | No       | Hides the inner `Form.Item`                                  |
| `normalize`         | `CustomDropDownProps["normalize"]`                         | —           | No       | Custom form-value normalization                              |
| `messageVariables`  | `Record<string, string>`                                   | —           | No       | Variables used in validation messages                        |
| `labelCol`          | `ColProps`                                                 | —           | No       | Label column configuration                                   |
| `labelAlign`        | `FormLabelAlign`                                           | `"right"`   | No       | Label alignment                                              |
| `initialValue`      | `CustomDropDownProps["initialValue"]`                      | —           | No       | Initial form field value                                     |
| `hasFeedback`       | `boolean \| { icons: FeedbackIcons }`                      | `false`     | No       | Form validation feedback configuration                       |
| `getValueProps`     | `CustomDropDownProps["getValueProps"]`                     | —           | No       | Maps the form value to child props                           |
| `getValueFromEvent` | `CustomDropDownProps["getValueFromEvent"]`                 | —           | No       | Extracts a form value from an event                          |
| `extra`             | `ReactNode`                                                | —           | No       | Additional field information                                 |
| `otherProps`        | `InputProps & { disabled?: boolean }`                      | —           | No       | Declared but not unpacked or applied to an input             |

> **Menu structure:** Despite its name, `items` expects a complete `MenuProps` object, such as `{ items: [...] }`, rather than a menu-item array.

> **Form behavior:** This wrapper does not explicitly store clicked menu keys in the form. Passing `name` and `rules` alone does not make it behave like a select input.

---

## Basic Usage Examples

### 1. Export Menu

```tsx
import type { MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDropdown from "@components/CustomInputs/CustomDropdown/CustomDropdown";

const exportMenu: MenuProps = {
  items: [
    {
      key: "excel",
      label: "خروجی اکسل",
      onClick: handleExportExcel,
    },
    {
      key: "pdf",
      label: "خروجی PDF",
      onClick: handleExportPdf,
    },
  ],
};

<CustomDropdown items={exportMenu} trigger={["click"]}>
  <CustomButton>
    خروجی <IoIosArrowDown />
  </CustomButton>
</CustomDropdown>;
```
