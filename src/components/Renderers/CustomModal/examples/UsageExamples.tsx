/**
 * CustomModal Usage Examples
 *
 * This file demonstrates various ways to use the CustomModal component.
 * Copy and modify these examples for your specific use case.
 */

import { useState } from "react";

import { Form, Input, Row, Col } from "antd";
import {
  AiOutlineWarning,
  AiOutlineDelete,
  AiOutlineFilter,
  AiOutlineUser,
} from "react-icons/ai";

import CustomModal from "../CustomModal";

// =============================================================================
// ✅ EXAMPLE 1: Basic Usage
// =============================================================================
export const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>باز کردن مودال</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="عنوان مودال"
        onConfirm={() => {
          console.warn("[Example] Confirmed");
          setIsOpen(false);
        }}
      >
        <p>محتوای مودال در اینجا قرار می‌گیرد.</p>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 2: Different Sizes
// =============================================================================
export const SizesExample = () => {
  const [openSize, setOpenSize] = useState<
    "small" | "medium" | "large" | "fullscreen" | null
  >(null);

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOpenSize("small")}>کوچک</button>
        <button onClick={() => setOpenSize("medium")}>متوسط</button>
        <button onClick={() => setOpenSize("large")}>بزرگ</button>
        <button onClick={() => setOpenSize("fullscreen")}>تمام صفحه</button>
      </div>

      <CustomModal
        open={openSize !== null}
        onCancel={() => setOpenSize(null)}
        title={`مودال سایز ${openSize}`}
        size={openSize || "medium"}
        onConfirm={() => setOpenSize(null)}
      >
        <p>این یک مودال با سایز {openSize} است.</p>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 3: Confirmation Modal (Danger)
// =============================================================================
export const ConfirmDeleteExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setIsOpen(false);
    console.warn("[Example] Item deleted");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>حذف آیتم</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="حذف آیتم"
        titleIcon={<AiOutlineDelete />}
        variant="danger"
        size="small"
        confirmText="حذف"
        confirmDanger
        confirmLoading={isDeleting}
        onConfirm={handleDelete}
        description="این عملیات غیرقابل بازگشت است. آیا از حذف این آیتم مطمئن هستید؟"
      >
        <p>آیتم مورد نظر: محصول شماره ۱۲۳</p>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 4: Warning Modal
// =============================================================================
export const WarningExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>نمایش هشدار</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="توجه!"
        titleIcon={<AiOutlineWarning />}
        variant="warning"
        size="small"
        confirmText="متوجه شدم"
        hideCancel
        onConfirm={() => setIsOpen(false)}
        description="تغییرات شما ذخیره نشده است. آیا می‌خواهید ادامه دهید؟"
      >
        <p>در صورت خروج، تمام تغییرات از دست خواهد رفت.</p>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 5: Form Modal
// =============================================================================
export const FormModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.warn("[Example] Form submitted:", values);
    setIsSubmitting(false);
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>افزودن کاربر</button>
      <CustomModal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
        title="افزودن کاربر جدید"
        titleIcon={<AiOutlineUser />}
        variant="form"
        size="medium"
        confirmText="ذخیره"
        confirmLoading={isSubmitting}
        onConfirm={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="firstName" label="نام" rules={[{ required: true }]}>
                <Input placeholder="نام را وارد کنید" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[{ required: true }]}
              >
                <Input placeholder="نام خانوادگی را وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" label="ایمیل" rules={[{ type: "email" }]}>
            <Input placeholder="ایمیل را وارد کنید" />
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 6: Filter Modal (Common Pattern)
// =============================================================================
export const FilterModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleApplyFilters = (values: any) => {
    console.warn("[Example] Filters applied:", values);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    form.resetFields();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>فیلتر پیشرفته</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="فیلتر پیشرفته"
        titleIcon={<AiOutlineFilter />}
        size="large"
        variant="form"
        footerButtons={[
          {
            text: "بازنشانی",
            type: "default",
            onClick: handleResetFilters,
          },
          {
            text: "انصراف",
            type: "default",
            onClick: () => setIsOpen(false),
          },
          {
            text: "اعمال فیلترها",
            type: "primary",
            onClick: () => form.submit(),
          },
        ]}
        description="فیلتر کردن اطلاعات بر اساس فیلدهای زیر، نتایج جستجوی شما را شخصی‌سازی می‌کند."
      >
        <Form form={form} layout="vertical" onFinish={handleApplyFilters}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="name" label="نام">
                <Input placeholder="جستجو بر اساس نام" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="وضعیت">
                <Input placeholder="انتخاب وضعیت" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="date" label="تاریخ">
                <Input placeholder="انتخاب تاریخ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 7: Custom Footer
// =============================================================================
export const CustomFooterExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>مودال با فوتر سفارشی</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="مودال سفارشی"
        size="medium"
        customFooter={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#888" }}>آخرین بروزرسانی: امروز</span>
            <button onClick={() => setIsOpen(false)}>بستن</button>
          </div>
        }
      >
        <p>این مودال یک فوتر کاملاً سفارشی دارد.</p>
      </CustomModal>
    </>
  );
};

// =============================================================================
// ✅ EXAMPLE 8: With Subtitle
// =============================================================================
export const WithSubtitleExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>مودال با زیرعنوان</button>
      <CustomModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="جزئیات سفارش"
        subtitle="سفارش شماره: ORD-2024-1234"
        titleIcon={<AiOutlineUser />}
        size="medium"
        hideConfirm
        cancelText="بستن"
      >
        <p>اطلاعات کامل سفارش در اینجا نمایش داده می‌شود.</p>
      </CustomModal>
    </>
  );
};
