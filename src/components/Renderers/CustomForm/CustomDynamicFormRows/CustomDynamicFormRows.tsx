import { useEffect, useRef } from "react";

import { Form } from "antd";
import { FormListFieldData, FormListOperation } from "antd/es/form/FormList";
import { NamePath } from "antd/es/form/interface";
import { AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { CustomDynamicFormRowsProps } from "./@types/@customDynamicFormRows";
import "./_customDynamicFormRows.scss";

type DynamicFormRowsContentProps = Pick<
  CustomDynamicFormRowsProps,
  "name" | "form" | "minRows" | "maxRows" | "children" | "addButtonText" | "className"
> & {
  fields: FormListFieldData[];
  add: FormListOperation["add"];
  remove: FormListOperation["remove"];
};

/** Expands Form.List row count after `form.setFieldsValue`; respects manual row removal. */
function DynamicFormRowsContent({
  name,
  form,
  minRows = 1,
  maxRows,
  fields,
  add,
  remove,
  children,
  addButtonText = "افزودن ردیف",
  className,
}: DynamicFormRowsContentProps) {
  const listValue = Form.useWatch(name, form);
  const listLength = Array.isArray(listValue) ? listValue.length : 0;
  const prevFieldsLengthRef = useRef(fields.length);

  useEffect(() => {
    const prevFieldsLength = prevFieldsLengthRef.current;
    prevFieldsLengthRef.current = fields.length;

    if (!form) return;

    const stored = form.getFieldValue(name);
    if (!Array.isArray(stored)) return;

    // User removed a row — trim stale store entries so expand logic does not re-add it
    if (fields.length < prevFieldsLength) {
      if (stored.length > fields.length) {
        form.setFieldValue(name, stored.slice(0, fields.length));
      }
      return;
    }

    const targetLength = Math.max(stored.length, listLength, minRows);
    const cappedLength =
      maxRows !== undefined ? Math.min(targetLength, maxRows) : targetLength;

    if (fields.length < cappedLength) {
      for (let i = fields.length; i < cappedLength; i++) {
        add(stored[i] ?? {});
      }
    }
  }, [form, name, listLength, fields.length, minRows, maxRows, add]);

  const handleRemove = (fieldIndex: number) => {
    remove(fieldIndex);

    if (form) {
      const stored = form.getFieldValue(name);
      if (Array.isArray(stored) && stored.length > fields.length - 1) {
        form.setFieldValue(
          name,
          stored.filter((_, index) => index !== fieldIndex)
        );
      }
    }
  };

  const canRemove = fields.length > minRows;
  const canAdd = maxRows === undefined || fields.length < maxRows;

  return (
    <div className={`dynamic-form-rows ${className ?? ""}`}>
      {fields.map((field) => children(field, () => handleRemove(field.name), canRemove))}

      {canAdd && (
        <CustomButton
          type="dashed"
          block
          icon={<AiOutlinePlus />}
          className="dynamic-form-rows__add-btn"
          onClick={() => add({})}
        >
          {addButtonText}
        </CustomButton>
      )}
    </div>
  );
}

/**
 * Drop this inside any `<Form>` to get dynamic rows with an add/remove button.
 * Write your selects/inputs exactly like you normally would — just use
 * `[field.name, "yourKey"]` as the name.
 *
 * @example
 * // Pre-fill from API with setFieldsValue (pass `form` so row count syncs):
 * useEffect(() => {
 *   form.setFieldsValue({ routes: [{ province: "1" }, { province: "2" }] });
 * }, [form]);
 *
 * <Form form={form}>
 *   <DynamicFormRows name="routes" form={form}>
 *     {(field, remove, canRemove) => (
 *       <CustomSelect form={form} name={[field.name, "province"]} label="استان" options={...} />
 *     )}
 *   </DynamicFormRows>
 * </Form>
 */
function DynamicFormRows({
  name,
  form,
  children,
  addButtonText = "افزودن ردیف",
  minRows = 1,
  maxRows,
  initialValue = [{}],
  className,
}: CustomDynamicFormRowsProps) {
  return (
    <Form.List name={name} initialValue={initialValue}>
      {(fields, { add, remove }) => (
        <DynamicFormRowsContent
          name={name as NamePath}
          form={form}
          minRows={minRows}
          maxRows={maxRows}
          fields={fields}
          add={add}
          remove={remove}
          addButtonText={addButtonText}
          className={className}
        >
          {children}
        </DynamicFormRowsContent>
      )}
    </Form.List>
  );
}

export default DynamicFormRows;
