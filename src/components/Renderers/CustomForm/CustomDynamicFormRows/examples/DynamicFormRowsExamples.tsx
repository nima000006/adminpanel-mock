/**
 * DynamicFormRows — usage examples
 *
 * Pattern: write your selects exactly like you always do.
 * DynamicFormRows only handles the list loop and the add/remove button.
 */

import { useEffect, useState } from "react";

import { Col, Form, Input, Row, Spin } from "antd";

import { CustomDatePicker } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import DynamicFormRows from "../CustomDynamicFormRows";

import "./_dynamicFormRowsExamples.scss";

// ─── Shared mock options (replace with your API data) ────────────────────────

const PROVINCE_OPTIONS = [
  { id: 1, title: "تهران" },
  { id: 2, title: "اصفهان" },
  { id: 3, title: "فارس" },
];

const CITY_OPTIONS = [
  { id: 101, title: "تهران" },
  { id: 102, title: "شمیرانات" },
  { id: 201, title: "اصفهان" },
];

const BRANCH_OPTIONS = [
  { id: 1001, title: "شعبه مرکزی" },
  { id: 1002, title: "شعبه غرب" },
  { id: 1003, title: "شعبه شرق" },
];

const ROLE_OPTIONS = [
  { id: 1, title: "مدیر" },
  { id: 2, title: "کارشناس" },
  { id: 3, title: "کارمند" },
];

const DEPARTMENT_OPTIONS = [
  { id: 10, title: "فنی" },
  { id: 11, title: "مالی" },
  { id: 12, title: "اداری" },
];

const SHIFT_OPTIONS = [
  { id: 20, title: "صبح" },
  { id: 21, title: "عصر" },
  { id: 22, title: "شب" },
];

const PRIORITY_OPTIONS = [
  { id: 1, title: "کم" },
  { id: 2, title: "متوسط" },
  { id: 3, title: "بالا" },
];

/** Shows current form values below the form — updates live as the user edits */
function FormValuesPreview({
  values,
  title = "خروجی فرم",
  hint = "این بخش با هر تغییر در فرم به‌روز می‌شود.",
}: {
  values: unknown;
  title?: string;
  hint?: string;
}) {
  return (
    <div className="dynamic-form-example-output">
      <p className="dynamic-form-example-output__title">{title}</p>
      <p className="dynamic-form-example-output__hint">{hint}</p>
      <pre className="dynamic-form-example-output__pre">
        {JSON.stringify(values ?? {}, null, 2)}
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 1 — Basic: 3 selects per row
// ─────────────────────────────────────────────────────────────────────────────
export function Example1_Basic() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.warn(values)}>
      <DynamicFormRows name="routes" addButtonText="افزودن مسیر">
        {(field, remove, canRemove) => (
          <Row key={field.key} gutter={16} align="middle">
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "province"]}
                label="استان"
                options={PROVINCE_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "city"]}
                label="شهر"
                options={CITY_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "branch"]}
                label="شعبه"
                options={BRANCH_OPTIONS}
              />
            </Col>
            {canRemove && (
              <Col span={3} style={{ paddingTop: 28 }}>
                <CustomButton type="text" danger onClick={remove}>
                  حذف
                </CustomButton>
              </Col>
            )}
          </Row>
        )}
      </DynamicFormRows>

      <CustomButton htmlType="submit" type="primary" style={{ marginTop: 16 }}>
        ثبت
      </CustomButton>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 2 — Min 2 rows, max 5 rows
// ─────────────────────────────────────────────────────────────────────────────
export function Example2_MinAndMaxRows() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.warn(values)}>
      <DynamicFormRows
        name="assignments"
        minRows={2}
        maxRows={5}
        initialValue={[{}, {}]}
        addButtonText="افزودن تخصیص (حداکثر ۵)"
      >
        {(field, remove, canRemove) => (
          <Row key={field.key} gutter={16} align="middle">
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "province"]}
                label="استان"
                options={PROVINCE_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "city"]}
                label="شهر"
                options={CITY_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "branch"]}
                label="شعبه"
                options={BRANCH_OPTIONS}
              />
            </Col>
            {canRemove && (
              <Col span={3} style={{ paddingTop: 8 }}>
                <CustomButton type="text" danger onClick={remove}>
                  حذف
                </CustomButton>
              </Col>
            )}
          </Row>
        )}
      </DynamicFormRows>

      <CustomButton htmlType="submit" type="primary" style={{ marginTop: 16 }}>
        ثبت
      </CustomButton>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 3 — Different selects per row (department / role / shift)
// ─────────────────────────────────────────────────────────────────────────────
export function Example3_DifferentSelects() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.warn(values)}>
      <DynamicFormRows name="staff" addButtonText="افزودن پرسنل">
        {(field, remove, canRemove) => (
          <Row key={field.key} gutter={16} align="middle">
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "department"]}
                label="دپارتمان"
                options={DEPARTMENT_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "role"]}
                label="نقش"
                options={ROLE_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "shift"]}
                label="شیفت"
                options={SHIFT_OPTIONS}
              />
            </Col>
            {canRemove && (
              <Col span={3} style={{ paddingTop: 28 }}>
                <CustomButton type="text" danger onClick={remove}>
                  حذف
                </CustomButton>
              </Col>
            )}
          </Row>
        )}
      </DynamicFormRows>

      <CustomButton htmlType="submit" type="primary" style={{ marginTop: 16 }}>
        ذخیره
      </CustomButton>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 4 — Mixed: select + text input per row
// ─────────────────────────────────────────────────────────────────────────────
export function Example4_SelectAndInput() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.warn(values)}>
      <DynamicFormRows name="contacts" addButtonText="افزودن مخاطب">
        {(field, remove, canRemove) => (
          <Row key={field.key} gutter={16} align="middle">
            <Col span={8}>
              <CustomSelect
                form={form}
                name={[field.name, "role"]}
                label="نقش"
                options={ROLE_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={8}>
              <CustomInput
                form={form as never}
                name={[field.name, "fullName"]}
                label="نام و نام خانوادگی"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={5}>
              <CustomInput
                form={form as never}
                name={[field.name, "phone"]}
                label="شماره تماس"
              />
            </Col>
            {canRemove && (
              <Col span={3} style={{ paddingTop: 28 }}>
                <CustomButton type="text" danger onClick={remove}>
                  حذف
                </CustomButton>
              </Col>
            )}
          </Row>
        )}
      </DynamicFormRows>

      <CustomButton htmlType="submit" type="primary" style={{ marginTop: 16 }}>
        ثبت
      </CustomButton>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 5 — Via CustomForm.DynamicRows compound export + pre-filled edit mode
// ─────────────────────────────────────────────────────────────────────────────
export function Example5_EditMode() {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      coverage: [
        { province: "1", city: "101", branch: "1001" },
        { province: "2", city: "201", branch: "1002" },
      ],
    });
  }, [form]);

  return (
    <Form form={form} onFinish={(values) => console.warn(values)}>
      <DynamicFormRows name="coverage" form={form} addButtonText="افزودن منطقه">
        {(field, remove, canRemove) => (
          <Row key={field.key} gutter={16} align="middle">
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "province"]}
                label="استان"
                options={PROVINCE_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "city"]}
                label="شهر"
                options={CITY_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={7}>
              <CustomSelect
                form={form}
                name={[field.name, "branch"]}
                label="شعبه"
                options={BRANCH_OPTIONS}
              />
            </Col>
            {canRemove && (
              <Col span={3} style={{ paddingTop: 28 }}>
                <CustomButton type="text" danger onClick={remove}>
                  حذف
                </CustomButton>
              </Col>
            )}
          </Row>
        )}
      </DynamicFormRows>

      <CustomButton htmlType="submit" type="primary" style={{ marginTop: 16 }}>
        بروزرسانی
      </CustomButton>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 6 — Regular fields + dynamic rows + multi-select + live output
// The main "real world" example: static inputs on top, dynamic rows below,
// and a live JSON preview under the form.
// ─────────────────────────────────────────────────────────────────────────────
export function Example6_MixedFormWithOutput() {
  const [form] = Form.useForm();
  const [submittedValues, setSubmittedValues] = useState<unknown>(null);

  const liveValues = Form.useWatch([], form);

  const handleSubmit = (values: unknown) => {
    setSubmittedValues(values);
    console.warn("Submitted:", values);
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* ── Regular (static) fields ── */}
        <div className="dynamic-form-example-section">
          <p className="dynamic-form-example-section__heading">اطلاعات کلی</p>

          <Row gutter={16}>
            <Col span={12}>
              <CustomInput
                form={form as never}
                name="requestTitle"
                label="عنوان درخواست"
                placeholder="عنوان را وارد کنید"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={12}>
              <CustomSelect
                form={form}
                name="priority"
                label="اولویت"
                options={PRIORITY_OPTIONS}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>

          <Form.Item name="description" label="توضیحات">
            <Input.TextArea rows={3} placeholder="توضیحات تکمیلی..." />
          </Form.Item>
        </div>

        <hr className="dynamic-form-example-section__divider" />

        {/* ── Dynamic rows — branches is multi-select ── */}
        <div className="dynamic-form-example-section">
          <p className="dynamic-form-example-section__heading">
            تخصیص شعب (هر ردیف: استان + شهر + چند شعبه)
          </p>

          <DynamicFormRows name="assignments" addButtonText="افزودن ردیف تخصیص">
            {(field, remove, canRemove) => (
              <Row key={field.key} gutter={16} align="top">
                <Col span={7}>
                  <CustomSelect
                    form={form}
                    name={[field.name, "province"]}
                    label="استان"
                    options={PROVINCE_OPTIONS}
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
                <Col span={7}>
                  <CustomSelect
                    form={form}
                    name={[field.name, "city"]}
                    label="شهر"
                    options={CITY_OPTIONS}
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
                <Col span={8}>
                  <CustomSelect
                    form={form}
                    name={[field.name, "branches"]}
                    label="شعب (چند انتخابی)"
                    options={BRANCH_OPTIONS}
                    mode="multiple"
                    maxTagCount="responsive"
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
                {canRemove && (
                  <Col span={2} style={{ paddingTop: 28 }}>
                    <CustomButton type="text" danger onClick={remove}>
                      حذف
                    </CustomButton>
                  </Col>
                )}
              </Row>
            )}
          </DynamicFormRows>
        </div>

        <CustomButton htmlType="submit" type="primary">
          ثبت درخواست
        </CustomButton>
      </Form>

      <FormValuesPreview
        values={liveValues}
        title="مقادیر لحظه‌ای فرم"
        hint="با پر کردن فیلدها یا افزودن/حذف ردیف، این بخش بلافاصله به‌روز می‌شود."
      />

      {submittedValues !== null && (
        <FormValuesPreview
          values={submittedValues}
          title="نتیجه ثبت (پس از کلیک روی «ثبت درخواست»)"
          hint="این همان داده‌ای است که در onFinish دریافت می‌کنید."
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 7 — Dynamic rows where ALL 3 selects are multi-select
// ─────────────────────────────────────────────────────────────────────────────
export function Example7_AllMultiSelectRows() {
  const [form] = Form.useForm();
  const liveValues = Form.useWatch([], form);

  return (
    <div style={{ maxWidth: 960 }}>
      <Form form={form} className="flex flex-col gap-4">
        <CustomInput
          form={form as never}
          name="teamName"
          label="نام تیم"
          rules={[REQUIRED_RULE]}
        />
        <CustomInput
          form={form as never}
          name="teamPhone"
          label="شماره تماس تیم"
          rules={[REQUIRED_RULE]}
        />

        <DynamicFormRows name="accessRules" addButtonText="افزودن قانون دسترسی">
          {(field, remove, canRemove) => (
            <Row key={field.key} gutter={16}>
              <Col span={5}>
                <CustomSelect
                  form={form}
                  name={[field.name, "departments"]}
                  label="دپارتمان‌ها"
                  options={DEPARTMENT_OPTIONS}
                  mode="multiple"
                  maxTagCount="responsive"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col span={5}>
                <CustomSelect
                  form={form}
                  name={[field.name, "roles"]}
                  label="نقش‌ها"
                  options={ROLE_OPTIONS}
                  mode="multiple"
                  maxTagCount="responsive"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col span={5}>
                <CustomDatePicker form={form} name={[field.name, "time"]} label="زمان" />
              </Col>
              <Col span={5}>
                <CustomInput
                  form={form as never}
                  name={[field.name, "title"]}
                  label="عنوان"
                  placeholder="عنوان"
                />
              </Col>
              {canRemove && (
                <Col span={2} style={{ paddingTop: 28 }}>
                  <CustomButton type="text" danger onClick={remove}>
                    حذف
                  </CustomButton>
                </Col>
              )}
            </Row>
          )}
        </DynamicFormRows>
      </Form>

      <FormValuesPreview values={liveValues} title="خروجی — همه سلکت‌ها چند انتخابی" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 8 — Edit mode (API pre-fill) based on Example 7
//
// Pre-fill with `form.setFieldsValue` after API returns.
// Pass `form` to DynamicFormRows so row count matches the array length.
// ─────────────────────────────────────────────────────────────────────────────

type AccessRuleFormValues = {
  teamName: string;
  teamPhone: string;
  accessRules: {
    departments: string[];
    roles: string[];
    time?: string;
    title?: string;
  }[];
};

/** Simulates GET /teams/:id — replace with your real API hook/service */
function fetchTeamAccessRulesMock(): Promise<AccessRuleFormValues> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        teamName: "تیم پشتیبانی",
        teamPhone: "09121234567",
        accessRules: [
          {
            departments: ["10", "11"],
            roles: ["1", "2"],
            time: "2024-06-15T00:00:00.000+03:30",
            title: "دسترسی مدیران",
          },
          {
            departments: ["12"],
            roles: ["3"],
            time: "2024-08-20T00:00:00.000+03:30",
            title: "دسترسی کارمندان",
          },
        ],
      });
    }, 600);
  });
}

export function Example8_EditMultiSelectRows() {
  const [form] = Form.useForm<AccessRuleFormValues>();
  const [loading, setLoading] = useState(true);

  const liveValues = Form.useWatch([], form);

  useEffect(() => {
    let cancelled = false;

    fetchTeamAccessRulesMock()
      .then((data) => {
        if (!cancelled) {
          form.setFieldsValue(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form]);

  return (
    <div style={{ maxWidth: 960 }}>
      <Spin spinning={loading}>
        <Form
          form={form}
          className="flex flex-col gap-4"
          onFinish={(values) => console.warn("Update:", values)}
        >
          <CustomInput
            form={form as never}
            name="teamName"
            label="نام تیم"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            form={form as never}
            name="teamPhone"
            label="شماره تماس تیم"
            rules={[REQUIRED_RULE]}
          />

          <DynamicFormRows
            name="accessRules"
            form={form}
            addButtonText="افزودن قانون دسترسی"
          >
            {(field, remove, canRemove) => (
              <Row key={field.key} gutter={16}>
                <Col span={5}>
                  <CustomSelect
                    form={form}
                    name={[field.name, "departments"]}
                    label="دپارتمان‌ها"
                    options={DEPARTMENT_OPTIONS}
                    mode="multiple"
                    maxTagCount="responsive"
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
                <Col span={5}>
                  <CustomSelect
                    form={form}
                    name={[field.name, "roles"]}
                    label="نقش‌ها"
                    options={ROLE_OPTIONS}
                    mode="multiple"
                    maxTagCount="responsive"
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
                <Col span={5}>
                  <CustomDatePicker
                    form={form}
                    name={[field.name, "time"]}
                    label="زمان"
                    placeholder="تاریخ"
                  />
                </Col>
                <Col span={5}>
                  <CustomInput
                    form={form as never}
                    name={[field.name, "title"]}
                    label="عنوان"
                    placeholder="عنوان"
                  />
                </Col>
                {canRemove && (
                  <Col span={2} style={{ paddingTop: 28 }}>
                    <CustomButton type="text" danger onClick={remove}>
                      حذف
                    </CustomButton>
                  </Col>
                )}
              </Row>
            )}
          </DynamicFormRows>

          <CustomButton htmlType="submit" type="primary">
            بروزرسانی
          </CustomButton>
        </Form>
      </Spin>

      <FormValuesPreview
        values={liveValues}
        title="حالت ویرایش — ۲ ردیف از API"
        hint="پس از دریافت API با form.setFieldsValue(data) پر می‌شود. form را به DynamicFormRows بدهید تا تعداد ردیف‌ها با طول آرایه sync شود."
      />
    </div>
  );
}
