import { FormInstance } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

export type DynamicFormField = {
  key: number;
  name: number;
};

export type CustomDynamicFormRowsProps = {
  /** Form.List field name — e.g. `"routes"` */
  name: NamePath;
  /**
   * Pass the same form instance when pre-filling rows via `form.setFieldsValue`.
   * Keeps row count in sync with the array length in the form store.
   */
  form?: FormInstance;
  /** Render one row. Receives the field (use `field.name` for nested names) and a remove callback. */
  children: (
    field: DynamicFormField,
    remove: () => void,
    canRemove: boolean
  ) => React.ReactNode;
  /** Text on the add button. Default: "افزودن ردیف" */
  addButtonText?: string;
  /** Minimum rows before remove is allowed. Default: 1 */
  minRows?: number;
  /** Maximum rows before add is hidden. Default: unlimited */
  maxRows?: number;
  /** Initial rows inserted when the list is empty. Default: one empty row `[{}]` */
  initialValue?: object[];
  className?: string;
};
