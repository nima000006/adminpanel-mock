/**
 * CustomForm Usage Examples
 *
 * These examples demonstrate the various features and configurations
 * available in the CustomForm component.
 */

import { useState } from "react";

import { Col, Row, Input, Select, InputNumber, Checkbox, Space } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import CustomForm, { useForm, useWatch } from "../CustomForm";

// ─────────────────────────────────────────────────────────────────────────────
// Example 1: Basic Form with Vertical Layout (Default)
// ─────────────────────────────────────────────────────────────────────────────
export function BasicFormExample() {
  const [form] = useForm();

  const handleSubmit = (values: unknown) => {
    console.warn("Form values:", values);
  };

  return (
    <CustomForm form={form} onFinish={handleSubmit}>
      <CustomForm.Item name="firstName" label="نام" required>
        <Input placeholder="نام خود را وارد کنید" />
      </CustomForm.Item>

      <CustomForm.Item name="lastName" label="نام خانوادگی" required>
        <Input placeholder="نام خانوادگی خود را وارد کنید" />
      </CustomForm.Item>

      <CustomForm.Item name="email" label="ایمیل" rules={[{ type: "email" }]}>
        <Input placeholder="example@domain.com" />
      </CustomForm.Item>

      <CustomButton htmlType="submit" type="primary">
        ثبت
      </CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 2: Horizontal Layout
// ─────────────────────────────────────────────────────────────────────────────
export function HorizontalLayoutExample() {
  const [form] = useForm();

  return (
    <CustomForm
      form={form}
      layoutPreset="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={(values) => console.warn(values)}
    >
      <CustomForm.Item name="username" label="نام کاربری" required>
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="password" label="رمز عبور" required>
        <Input.Password />
      </CustomForm.Item>

      <CustomForm.Item wrapperCol={{ offset: 6, span: 18 }}>
        <CustomButton htmlType="submit" type="primary">
          ورود
        </CustomButton>
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 3: Inline Layout (Search Form)
// ─────────────────────────────────────────────────────────────────────────────
export function InlineLayoutExample() {
  const [form] = useForm();

  const handleSearch = (values: unknown) => {
    console.warn("Search:", values);
  };

  return (
    <CustomForm form={form} layoutPreset="inline" onFinish={handleSearch}>
      <CustomForm.Item name="keyword">
        <Input placeholder="جستجو..." />
      </CustomForm.Item>

      <CustomForm.Item name="category">
        <Select
          placeholder="دسته‌بندی"
          style={{ width: 150 }}
          options={[
            { value: "all", label: "همه" },
            { value: "active", label: "فعال" },
            { value: "inactive", label: "غیرفعال" },
          ]}
        />
      </CustomForm.Item>

      <CustomForm.Item>
        <CustomButton htmlType="submit" type="primary">
          جستجو
        </CustomButton>
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 4: Compact Layout with Row/Col
// ─────────────────────────────────────────────────────────────────────────────
export function CompactLayoutExample() {
  const [form] = useForm();

  return (
    <CustomForm
      form={form}
      layoutPreset="compact"
      gap={[16, 24]}
      onFinish={(values) => console.warn(values)}
    >
      <CustomForm.Item name="firstName" label="نام" span={12} required>
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="lastName" label="نام خانوادگی" span={12} required>
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="nationalId" label="کد ملی" span={8} required>
        <Input maxLength={10} />
      </CustomForm.Item>

      <CustomForm.Item name="phone" label="شماره تماس" span={8}>
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="email" label="ایمیل" span={8}>
        <Input />
      </CustomForm.Item>

      <Col span={24}>
        <CustomButton htmlType="submit" type="primary">
          ثبت اطلاعات
        </CustomButton>
      </Col>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 5: Form with Different Variants
// ─────────────────────────────────────────────────────────────────────────────
export function VariantsExample() {
  const [form] = useForm();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Outlined (Default) */}
      <CustomForm form={form} variant="outlined">
        <CustomForm.Item name="outlined" label="Outlined Variant">
          <Input placeholder="Default outlined style" />
        </CustomForm.Item>
      </CustomForm>

      {/* Filled */}
      <CustomForm form={form} variant="filled">
        <CustomForm.Item name="filled" label="Filled Variant">
          <Input placeholder="Filled background style" />
        </CustomForm.Item>
      </CustomForm>

      {/* Borderless */}
      <CustomForm form={form} variant="borderless">
        <CustomForm.Item name="borderless" label="Borderless Variant">
          <Input placeholder="No border style" />
        </CustomForm.Item>
      </CustomForm>

      {/* Underlined */}
      <CustomForm form={form} variant="underlined">
        <CustomForm.Item name="underlined" label="Underlined Variant">
          <Input placeholder="Only bottom border" />
        </CustomForm.Item>
      </CustomForm>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 6: Form with Size Variants
// ─────────────────────────────────────────────────────────────────────────────
export function SizesExample() {
  const [form] = useForm();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <CustomForm form={form} size="small">
        <CustomForm.Item name="small" label="Small Size">
          <Input placeholder="Small input" />
        </CustomForm.Item>
      </CustomForm>

      <CustomForm form={form} size="middle">
        <CustomForm.Item name="middle" label="Middle Size (Default)">
          <Input placeholder="Middle input" />
        </CustomForm.Item>
      </CustomForm>

      <CustomForm form={form} size="large">
        <CustomForm.Item name="large" label="Large Size">
          <Input placeholder="Large input" />
        </CustomForm.Item>
      </CustomForm>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 7: Form with Loading State
// ─────────────────────────────────────────────────────────────────────────────
export function LoadingStateExample() {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: unknown) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.warn(values);
    setLoading(false);
  };

  return (
    <CustomForm form={form} loading={loading} onFinish={handleSubmit}>
      <CustomForm.Item name="data" label="داده" required>
        <Input />
      </CustomForm.Item>

      <CustomButton htmlType="submit" type="primary" loading={loading}>
        ارسال
      </CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 8: Form with Validation
// ─────────────────────────────────────────────────────────────────────────────
export function ValidationExample() {
  const [form] = useForm();

  return (
    <CustomForm
      form={form}
      scrollToFirstError
      onFinish={(values) => console.warn("Success:", values)}
      onFinishFailed={(errorInfo) => console.warn("Failed:", errorInfo)}
    >
      <CustomForm.Item
        name="username"
        label="نام کاربری"
        rules={[
          REQUIRED_RULE,
          { min: 3, message: "حداقل ۳ کاراکتر وارد کنید" },
          { max: 20, message: "حداکثر ۲۰ کاراکتر مجاز است" },
        ]}
      >
        <Input />
      </CustomForm.Item>

      <CustomForm.Item
        name="email"
        label="ایمیل"
        rules={[REQUIRED_RULE, { type: "email", message: "ایمیل معتبر وارد کنید" }]}
      >
        <Input />
      </CustomForm.Item>

      <CustomForm.Item
        name="password"
        label="رمز عبور"
        rules={[
          REQUIRED_RULE,
          { min: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: "رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد",
          },
        ]}
      >
        <Input.Password />
      </CustomForm.Item>

      <CustomForm.Item
        name="confirmPassword"
        label="تکرار رمز عبور"
        dependencies={["password"]}
        rules={[
          REQUIRED_RULE,
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

      <CustomButton htmlType="submit" type="primary">
        ثبت‌نام
      </CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 9: Form.useWatch Hook
// ─────────────────────────────────────────────────────────────────────────────
export function UseWatchExample() {
  const [form] = useForm();

  // Watch single field
  const quantity = useWatch("quantity", form);
  const price = useWatch("price", form);

  // Computed total
  const total = (quantity || 0) * (price || 0);

  return (
    <CustomForm form={form} layoutPreset="compact" gap={16}>
      <CustomForm.Item name="quantity" label="تعداد" span={8}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </CustomForm.Item>

      <CustomForm.Item name="price" label="قیمت واحد" span={8}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </CustomForm.Item>

      <CustomForm.Item label="مجموع" span={8}>
        <Input readOnly value={total.toLocaleString("fa-IR")} />
      </CustomForm.Item>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 10: Form.List for Dynamic Fields
// ─────────────────────────────────────────────────────────────────────────────
export function FormListExample() {
  const [form] = useForm();

  const handleSubmit = (values: unknown) => {
    const data = values as { members?: { name?: string; age?: number }[] };
    console.warn("Members:", data.members);
  };

  return (
    <CustomForm form={form} onFinish={handleSubmit}>
      <CustomForm.List name="members" initialValue={[{ name: "", age: undefined }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Row key={key} gutter={16} align="middle" style={{ marginBottom: 16 }}>
                <Col span={10}>
                  <CustomForm.Item
                    name={[name, "name"]}
                    label="نام"
                    required
                    noStyle={false}
                  >
                    <Input placeholder="نام" />
                  </CustomForm.Item>
                </Col>
                <Col span={8}>
                  <CustomForm.Item name={[name, "age"]} label="سن" noStyle={false}>
                    <InputNumber placeholder="سن" style={{ width: "100%" }} />
                  </CustomForm.Item>
                </Col>
                <Col span={6}>
                  {fields.length > 1 && (
                    <CustomButton danger onClick={() => remove(name)}>
                      حذف
                    </CustomButton>
                  )}
                </Col>
              </Row>
            ))}

            <CustomButton type="dashed" onClick={() => add()} block>
              + افزودن عضو
            </CustomButton>
          </>
        )}
      </CustomForm.List>

      <div style={{ marginTop: 24 }}>
        <CustomButton htmlType="submit" type="primary">
          ثبت
        </CustomButton>
      </div>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 11: Integration with Existing CustomInput/CustomSelect
// ─────────────────────────────────────────────────────────────────────────────
export function IntegrationWithCustomInputsExample() {
  const [form] = useForm();

  // Note: Your existing CustomInput/CustomSelect already wrap Form.Item
  // So you can use them directly inside CustomForm
  return (
    <CustomForm form={form} onFinish={(values) => console.warn(values)}>
      <Row gutter={16}>
        <Col span={12}>
          {/* CustomInput already includes Form.Item */}
          <CustomInput
            form={form as any}
            name="firstName"
            label="نام"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={12}>
          <CustomInput
            form={form as any}
            name="lastName"
            label="نام خانوادگی"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CustomSelect
            form={form}
            name="department"
            label="دپارتمان"
            rules={[REQUIRED_RULE]}
            options={[
              { id: 1, title: "فنی" },
              { id: 2, title: "مالی" },
              { id: 3, title: "اداری" },
            ]}
          />
        </Col>
        <Col span={12}>
          <CustomSelect
            form={form}
            name="role"
            label="نقش"
            options={[
              { id: 1, title: "مدیر" },
              { id: 2, title: "کارشناس" },
              { id: 3, title: "کارمند" },
            ]}
          />
        </Col>
      </Row>

      <CustomButton htmlType="submit" type="primary">
        ثبت
      </CustomButton>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 12: Form in Modal with Form Instance
// ─────────────────────────────────────────────────────────────────────────────
export function FormInModalExample() {
  //   const [form] = useForm();

  const [_isModalOpen, setIsModalOpen] = useState(false);

  //   const handleOk = async () => {
  //     try {
  //       const values = await form.validateFields();
  //       console.warn("Form values:", values);
  //       setIsModalOpen(false);
  //       form.resetFields();
  //     } catch (error) {
  //       console.error("Validation failed:", error);
  //     }
  //   };

  return (
    <>
      <CustomButton onClick={() => setIsModalOpen(true)}>افزودن کاربر</CustomButton>

      {/* 
        Use with CustomModal:
        <CustomModal
          open={isModalOpen}
          title="افزودن کاربر جدید"
          variant="form"
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <CustomForm form={form}>
            <CustomForm.Item name="name" label="نام" required>
              <Input />
            </CustomForm.Item>
          </CustomForm>
        </CustomModal>
      */}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 13: Form with Initial Values
// ─────────────────────────────────────────────────────────────────────────────
export function InitialValuesExample() {
  const [form] = useForm();

  const initialValues = {
    firstName: "علی",
    lastName: "محمدی",
    status: "active",
  };

  return (
    <CustomForm form={form} initialValues={initialValues}>
      <CustomForm.Item name="firstName" label="نام">
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="lastName" label="نام خانوادگی">
        <Input />
      </CustomForm.Item>

      <CustomForm.Item name="status" label="وضعیت">
        <Select
          options={[
            { value: "active", label: "فعال" },
            { value: "inactive", label: "غیرفعال" },
          ]}
        />
      </CustomForm.Item>

      <Space>
        <CustomButton htmlType="submit" type="primary">
          ذخیره
        </CustomButton>
        <CustomButton onClick={() => form.resetFields()}>بازنشانی</CustomButton>
      </Space>
    </CustomForm>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 14: Reset Form When Initial Values Change
// ─────────────────────────────────────────────────────────────────────────────
export function ResetOnInitialValuesChangeExample() {
  const [form] = useForm();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: 1, name: "علی", email: "ali@example.com" },
    { id: 2, name: "سارا", email: "sara@example.com" },
  ];

  return (
    <div>
      <Select
        placeholder="انتخاب کاربر"
        style={{ width: 200, marginBottom: 16 }}
        onChange={(id) => setSelectedUser(users.find((u) => u.id === id))}
        options={users.map((u) => ({ value: u.id, label: u.name }))}
      />

      <CustomForm
        form={form}
        initialValues={selectedUser}
        resetOnInitialValuesChange
        onFinish={(values) => console.warn("Updated:", values)}
      >
        <CustomForm.Item name="name" label="نام">
          <Input />
        </CustomForm.Item>

        <CustomForm.Item name="email" label="ایمیل">
          <Input />
        </CustomForm.Item>

        <CustomButton htmlType="submit" type="primary">
          ذخیره تغییرات
        </CustomButton>
      </CustomForm>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 15: Disabled Form State
// ─────────────────────────────────────────────────────────────────────────────
export function DisabledFormExample() {
  const [form] = useForm();
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <Checkbox
        checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
        style={{ marginBottom: 16 }}
      >
        غیرفعال
      </Checkbox>

      <CustomForm
        form={form}
        disabled={disabled}
        initialValues={{ name: "علی محمدی", status: "active" }}
      >
        <CustomForm.Item name="name" label="نام">
          <Input />
        </CustomForm.Item>

        <CustomForm.Item name="status" label="وضعیت">
          <Select
            options={[
              { value: "active", label: "فعال" },
              { value: "inactive", label: "غیرفعال" },
            ]}
          />
        </CustomForm.Item>
      </CustomForm>
    </div>
  );
}
