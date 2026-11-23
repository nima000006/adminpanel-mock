/**
 * CustomForm Anti-Patterns
 *
 * This file documents common mistakes and anti-patterns when using CustomForm,
 * along with their correct implementations.
 */

import { useState } from "react";

import { Input, Select } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";

import CustomForm, { useForm, useWatch } from "../CustomForm";

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 1: Using both CustomForm.Item AND existing CustomInput
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Double Form.Item wrapper (CustomInput already has Form.Item)
export function WrongDoubleFormItem() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      {/* This creates DOUBLE Form.Item - one from CustomForm.Item, one from CustomInput */}
      <CustomForm.Item name="name" label="نام">
        <CustomInput form={form as any} name="name" label="نام" />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Use CustomInput directly (it already includes Form.Item)
export function CorrectCustomInputUsage() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      {/* CustomInput already wraps Form.Item internally */}
      <CustomInput form={form as any} name="name" label="نام" />
    </CustomForm>
  );
}

// ✅ CORRECT: Or use CustomForm.Item with raw antd Input
export function CorrectFormItemUsage() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 2: Not passing form instance when needed
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Missing form instance for programmatic control
export function WrongNoFormInstance() {
  const handleSubmit = () => {
    // Can't access form values without form instance!
    // form.getFieldsValue() won't work
  };

  return (
    <CustomForm onFinish={handleSubmit}>
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
      <CustomButton onClick={handleSubmit}>ثبت</CustomButton>
    </CustomForm>
  );
}

// ✅ CORRECT: Always create and pass form instance for programmatic control
export function CorrectWithFormInstance() {
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.warn(values);
  };

  return (
    <CustomForm form={form} onFinish={handleSubmit}>
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
      <CustomButton htmlType="submit">ثبت</CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 3: Using controlled state instead of form state
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Managing state outside form
export function WrongControlledState() {
  const [form] = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // This duplicates state management unnecessarily!
  return (
    <CustomForm form={form}>
      <CustomForm.Item name="name" label="نام">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </CustomForm.Item>
      <CustomForm.Item name="email" label="ایمیل">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Let form manage state, use useWatch for derived values
export function CorrectFormState() {
  const [form] = useForm();

  // Use useWatch only when you need to react to value changes
  const name = useWatch("name", form);

  // Derived value based on form state
  const greeting = name ? `سلام ${name}!` : "";

  return (
    <CustomForm form={form}>
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
      <CustomForm.Item name="email" label="ایمیل">
        <Input />
      </CustomForm.Item>
      {greeting && <p>{greeting}</p>}
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 4: Using setFieldsValue in useEffect incorrectly
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: setFieldsValue in useEffect without form in deps
export function WrongSetFieldsValue() {
  const [form] = useForm();
  const [_userData, _setUserData] = useState<Record<string, unknown> | null>(null);

  // Note: This pattern is shown as wrong - do not use
  // useEffect with missing dependencies

  return (
    <CustomForm form={form}>
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Use initialValues or resetOnInitialValuesChange
export function CorrectInitialValues() {
  const [form] = useForm();
  const [userData] = useState({ name: "علی" });

  return (
    <CustomForm
      form={form}
      initialValues={userData}
      resetOnInitialValuesChange // Auto-update when initialValues change
    >
      <CustomForm.Item name="name" label="نام">
        <Input />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 5: Not handling async validation properly
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Sync validation for async check
export function WrongAsyncValidation() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.Item
        name="username"
        label="نام کاربری"
        rules={[
          {
            // This won't wait for API!
            validator: (_, value) => {
              // Bad: calling API synchronously - shown for demonstration
              void fetch(`/api/check-username?u=${value}`);
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Async validator with proper promise handling
export function CorrectAsyncValidation() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.Item
        name="username"
        label="نام کاربری"
        rules={[
          {
            validator: async (_, value) => {
              if (!value) return;

              const response = await fetch(`/api/check-username?u=${value}`);
              const { exists } = await response.json();

              if (exists) {
                return Promise.reject(new Error("این نام کاربری قبلا استفاده شده"));
              }
              return Promise.resolve();
            },
          },
        ]}
        // Validate on blur to reduce API calls
        validateTrigger="onBlur"
      >
        <Input />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 6: Not using dependencies for cross-field validation
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Password confirmation without dependencies
export function WrongPasswordConfirmation() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.Item name="password" label="رمز عبور">
        <Input.Password />
      </CustomForm.Item>

      {/* Missing dependencies - won't revalidate when password changes */}
      <CustomForm.Item
        name="confirmPassword"
        label="تکرار رمز عبور"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("رمز عبور مطابقت ندارد"));
            },
          }),
        ]}
      >
        <Input.Password />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Use dependencies for cross-field validation
export function CorrectPasswordConfirmation() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.Item name="password" label="رمز عبور">
        <Input.Password />
      </CustomForm.Item>

      <CustomForm.Item
        name="confirmPassword"
        label="تکرار رمز عبور"
        dependencies={["password"]} // Revalidates when password changes
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("رمز عبور مطابقت ندارد"));
            },
          }),
        ]}
      >
        <Input.Password />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 7: Mixing controlled and uncontrolled inputs
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: value prop overrides form control
export function WrongMixedControl() {
  const [form] = useForm();

  return (
    <CustomForm form={form} initialValues={{ status: "active" }}>
      {/* value prop makes this controlled - form won't manage it */}
      <CustomForm.Item name="status" label="وضعیت">
        <Select
          value="inactive" // This overrides form value!
          options={[
            { value: "active", label: "فعال" },
            { value: "inactive", label: "غیرفعال" },
          ]}
        />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ✅ CORRECT: Let form control the value
export function CorrectUncontrolledInput() {
  const [form] = useForm();

  return (
    <CustomForm form={form} initialValues={{ status: "active" }}>
      {/* No value prop - form manages the value */}
      <CustomForm.Item name="status" label="وضعیت">
        <Select
          options={[
            { value: "active", label: "فعال" },
            { value: "inactive", label: "غیرفعال" },
          ]}
        />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 8: Using wrong htmlType for submit button
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Button without htmlType="submit"
export function WrongSubmitButton() {
  const [form] = useForm();

  const handleClick = () => {
    form.submit(); // Manual submit - won't trigger native form validation
  };

  return (
    <CustomForm form={form} onFinish={(values) => console.warn(values)}>
      <CustomForm.Item name="name" label="نام" required>
        <Input />
      </CustomForm.Item>
      {/* onClick instead of htmlType="submit" */}
      <CustomButton onClick={handleClick}>ثبت</CustomButton>
    </CustomForm>
  );
}

// ✅ CORRECT: Use htmlType="submit"
export function CorrectSubmitButton() {
  const [form] = useForm();

  return (
    <CustomForm form={form} onFinish={(values) => console.warn(values)}>
      <CustomForm.Item name="name" label="نام" required>
        <Input />
      </CustomForm.Item>
      <CustomButton htmlType="submit" type="primary">
        ثبت
      </CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 9: Not using Form.List for dynamic fields
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Manual array management
export function WrongDynamicFields() {
  const [form] = useForm();
  const [items, setItems] = useState([{ id: 1 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now() }]);
  };

  //   const removeItem = (id: number) => {
  //     setItems(items.filter((item) => item.id !== id));
  //     // Have to manually clean up form values!
  //   };

  return (
    <CustomForm form={form}>
      {items.map((item, index) => (
        <CustomForm.Item key={item.id} name={`item_${index}`} label={`آیتم ${index + 1}`}>
          <Input />
        </CustomForm.Item>
      ))}
      <CustomButton onClick={addItem}>افزودن</CustomButton>
    </CustomForm>
  );
}

// ✅ CORRECT: Use Form.List
export function CorrectDynamicFields() {
  const [form] = useForm();

  return (
    <CustomForm form={form}>
      <CustomForm.List name="items" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div key={key} style={{ display: "flex", gap: 8 }}>
                <CustomForm.Item name={[name, "value"]} label={`آیتم ${name + 1}`}>
                  <Input />
                </CustomForm.Item>
                <CustomButton onClick={() => remove(name)}>حذف</CustomButton>
              </div>
            ))}
            <CustomButton onClick={() => add()}>افزودن</CustomButton>
          </>
        )}
      </CustomForm.List>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❌ Anti-Pattern 10: Not resetting form on modal close
// ─────────────────────────────────────────────────────────────────────────────

// ❌ WRONG: Form state persists after modal close
export function WrongModalForm() {
  const [form] = useForm();

  const [_open, setOpen] = useState(false);

  //   const handleClose = () => {
  //     setOpen(false);
  //     // Forgot to reset form!
  //   };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>باز کردن</CustomButton>
      {/* Modal with persistent form state - form not passed for demo */}
      <CustomForm form={form}>
        <CustomForm.Item name="demo" label="نمایشی">
          <Input />
        </CustomForm.Item>
      </CustomForm>
    </>
  );
}

// ✅ CORRECT: Reset form when modal closes
export function CorrectModalForm() {
  const [form] = useForm();

  const [_open, setOpen] = useState(false);

  //   const handleClose = () => {
  //     setOpen(false);
  //     form.resetFields(); // Always reset form on close
  //   };

  //   const handleSubmit = async () => {
  //     try {
  //       const values = await form.validateFields();
  //       console.warn(values);
  //       handleClose();
  //     } catch {
  //       // Validation failed
  //     }
  //   };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>باز کردن</CustomButton>
      {/* Modal with proper form reset */}
      <CustomForm form={form}>
        <CustomForm.Item name="demo" label="نمایشی">
          <Input />
        </CustomForm.Item>
      </CustomForm>
    </>
  );
}
