/**
 * CustomCollapse Usage Examples
 *
 * This file demonstrates various ways to use the CustomCollapse component.
 * Copy and modify these examples for your specific use case.
 */

import { useState } from "react";

import { Row, Col } from "antd";
import { AiOutlineSetting, AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai";

import CustomDivider from "../../CustomDivider/CustomDivider";
import CustomCollapse, { CustomCollapseItem } from "../CustomCollapse";

// =============================================================================
// ✅ EXAMPLE 1: Basic Usage
// =============================================================================
export const BasicExample = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "1",
      label: "پنل اول",
      children: <p>محتوای پنل اول در اینجا قرار می‌گیرد.</p>,
    },
    {
      key: "2",
      label: "پنل دوم",
      children: <p>محتوای پنل دوم در اینجا قرار می‌گیرد.</p>,
    },
    {
      key: "3",
      label: "پنل سوم",
      children: <p>محتوای پنل سوم در اینجا قرار می‌گیرد.</p>,
    },
  ];

  return <CustomCollapse items={items} defaultActiveKey={["1"]} />;
};

// =============================================================================
// ✅ EXAMPLE 2: Ghost Variant (Most Common in Project)
// =============================================================================
export const GhostVariantExample = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "1",
      label: <CustomDivider text="آمار" />,
      children: (
        <Row gutter={16}>
          <Col span={8}>
            <div>آمار ۱: ۱۲۳</div>
          </Col>
          <Col span={8}>
            <div>آمار ۲: ۴۵۶</div>
          </Col>
          <Col span={8}>
            <div>آمار ۳: ۷۸۹</div>
          </Col>
        </Row>
      ),
    },
  ];

  return <CustomCollapse variant="ghost" items={items} defaultActiveKey={["1"]} />;
};

// =============================================================================
// ✅ EXAMPLE 3: Accordion Mode
// =============================================================================
export const AccordionExample = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "1",
      label: "سوالات متداول - سوال اول",
      children: <p>پاسخ سوال اول در اینجا قرار می‌گیرد.</p>,
    },
    {
      key: "2",
      label: "سوالات متداول - سوال دوم",
      children: <p>پاسخ سوال دوم در اینجا قرار می‌گیرد.</p>,
    },
    {
      key: "3",
      label: "سوالات متداول - سوال سوم",
      children: <p>پاسخ سوال سوم در اینجا قرار می‌گیرد.</p>,
    },
  ];

  return <CustomCollapse accordion variant="card" items={items} />;
};

// =============================================================================
// ✅ EXAMPLE 4: Card Variant
// =============================================================================
export const CardVariantExample = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "user",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AiOutlineUser />
          اطلاعات کاربری
        </span>
      ),
      children: <p>اطلاعات کاربر در اینجا نمایش داده می‌شود.</p>,
    },
    {
      key: "settings",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AiOutlineSetting />
          تنظیمات
        </span>
      ),
      children: <p>تنظیمات سیستم در اینجا قرار می‌گیرد.</p>,
    },
    {
      key: "info",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AiOutlineInfoCircle />
          راهنما
        </span>
      ),
      children: <p>راهنمای استفاده در اینجا قرار می‌گیرد.</p>,
    },
  ];

  return <CustomCollapse variant="card" items={items} defaultActiveKey={["user"]} />;
};

// =============================================================================
// ✅ EXAMPLE 5: Controlled State
// =============================================================================
export const ControlledExample = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);

  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل اول", children: <p>محتوا</p> },
    { key: "2", label: "پنل دوم", children: <p>محتوا</p> },
    { key: "3", label: "پنل سوم", children: <p>محتوا</p> },
  ];

  const handleChange = (keys: string | string[]) => {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(keyArray);
    console.warn("[Example] Active panels:", keyArray);
  };

  return (
    <div>
      <p>پنل‌های باز: {activeKeys.join(", ") || "هیچکدام"}</p>
      <CustomCollapse
        items={items}
        activeKey={activeKeys}
        onChange={handleChange}
        variant="bordered"
      />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 6: With Extra Content
// =============================================================================
export const WithExtraExample = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "1",
      label: "اطلاعات سفارش",
      extra: <span style={{ color: "#52c41a" }}>تکمیل شده</span>,
      children: <p>جزئیات سفارش...</p>,
    },
    {
      key: "2",
      label: "اطلاعات پرداخت",
      extra: <span style={{ color: "#faad14" }}>در انتظار</span>,
      children: <p>جزئیات پرداخت...</p>,
    },
    {
      key: "3",
      label: "اطلاعات ارسال",
      extra: <span style={{ color: "#1890ff" }}>در حال پردازش</span>,
      children: <p>جزئیات ارسال...</p>,
    },
  ];

  return <CustomCollapse variant="bordered" items={items} />;
};

// =============================================================================
// ✅ EXAMPLE 7: Different Sizes
// =============================================================================
export const SizesExample = () => {
  const items: CustomCollapseItem[] = [
    { key: "1", label: "محتوا", children: <p>متن نمونه</p> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4>سایز کوچک</h4>
        <CustomCollapse size="small" items={items} variant="bordered" />
      </div>
      <div>
        <h4>سایز متوسط (پیش‌فرض)</h4>
        <CustomCollapse size="middle" items={items} variant="bordered" />
      </div>
      <div>
        <h4>سایز بزرگ</h4>
        <CustomCollapse size="large" items={items} variant="bordered" />
      </div>
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 8: Icon Position End
// =============================================================================
export const IconPositionEndExample = () => {
  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل با آیکون در انتها", children: <p>محتوا</p> },
    { key: "2", label: "پنل دوم", children: <p>محتوا</p> },
  ];

  return <CustomCollapse expandIconPosition="end" items={items} variant="bordered" />;
};
