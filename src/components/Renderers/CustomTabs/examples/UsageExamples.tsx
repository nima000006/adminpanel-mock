/**
 * CustomTabs Usage Examples
 *
 * This file demonstrates various ways to use the CustomTabs component.
 * Copy and modify these examples for your specific use case.
 */

import { useState } from "react";

import { AiOutlineUser, AiOutlineSetting, AiOutlineBell } from "react-icons/ai";

import CustomTabs, { CustomTabItem } from "../CustomTabs";

// =============================================================================
// ✅ EXAMPLE 1: Basic Usage
// =============================================================================
export const BasicExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب اول", children: <div>محتوای تب اول</div> },
    { key: "2", label: "تب دوم", children: <div>محتوای تب دوم</div> },
    { key: "3", label: "تب سوم", children: <div>محتوای تب سوم</div> },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// ✅ EXAMPLE 2: With Icons and Badges
// =============================================================================
export const WithIconsAndBadges = () => {
  const items: CustomTabItem[] = [
    {
      key: "users",
      label: "کاربران",
      icon: <AiOutlineUser />,
      badgeCount: 12,
      children: <div>لیست کاربران</div>,
    },
    {
      key: "notifications",
      label: "اعلان‌ها",
      icon: <AiOutlineBell />,
      badgeDot: true,
      badgeStatus: "processing",
      children: <div>اعلان‌های جدید</div>,
    },
    {
      key: "settings",
      label: "تنظیمات",
      icon: <AiOutlineSetting />,
      children: <div>تنظیمات سیستم</div>,
    },
  ];

  return <CustomTabs items={items} variant="pills" />;
};

// =============================================================================
// ✅ EXAMPLE 3: With URL Persistence
// Great for pages where you want to preserve the active tab in URL
// =============================================================================
export const WithUrlPersistence = () => {
  const items: CustomTabItem[] = [
    { key: "all", label: "همه", children: <div>نمایش همه موارد</div> },
    {
      key: "pending",
      label: "در انتظار",
      badgeCount: 5,
      children: <div>موارد در انتظار</div>,
    },
    { key: "completed", label: "تکمیل شده", children: <div>موارد تکمیل شده</div> },
  ];

  return (
    <CustomTabs
      items={items}
      urlPersist="url"
      urlKey="status" // URL will be ?status=all, ?status=pending, etc.
      defaultActiveKey="all"
    />
  );
};

// =============================================================================
// ✅ EXAMPLE 4: Different Variants
// =============================================================================
export const VariantsExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>محتوا</div> },
    { key: "2", label: "تب ۲", children: <div>محتوا</div> },
    { key: "3", label: "تب ۳", children: <div>محتوا</div> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4>Default (Line)</h4>
        <CustomTabs items={items} variant="default" />
      </div>
      <div>
        <h4>Card</h4>
        <CustomTabs items={items} variant="card" />
      </div>
      <div>
        <h4>Pills</h4>
        <CustomTabs items={items} variant="pills" />
      </div>
      <div>
        <h4>Underline</h4>
        <CustomTabs items={items} variant="underline" />
      </div>
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 5: Lazy Loading (Good for heavy content)
// =============================================================================
export const LazyLoadingExample = () => {
  const HeavyComponent = ({ name }: { name: string }) => {
    console.warn(`${name} rendered`); // Check console - only renders when visited
    return <div>محتوای سنگین: {name}</div>;
  };

  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <HeavyComponent name="Tab 1" /> },
    { key: "2", label: "تب ۲", children: <HeavyComponent name="Tab 2" /> },
    { key: "3", label: "تب ۳", children: <HeavyComponent name="Tab 3" /> },
  ];

  return (
    <CustomTabs
      items={items}
      lazyLoad // Only render when tab is first visited
      keepMounted // Keep rendered after first visit (optional)
    />
  );
};

// =============================================================================
// ✅ EXAMPLE 6: Controlled Mode
// =============================================================================
export const ControlledExample = () => {
  const [activeKey, setActiveKey] = useState("1");

  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>محتوای تب ۱</div> },
    { key: "2", label: "تب ۲", children: <div>محتوای تب ۲</div> },
    { key: "3", label: "تب ۳", children: <div>محتوای تب ۳</div> },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>تب فعال: {activeKey}</span>
        <button onClick={() => setActiveKey("2")} style={{ marginRight: 8 }}>
          برو به تب ۲
        </button>
      </div>
      <CustomTabs items={items} activeKey={activeKey} />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 7: Full Width Tabs
// =============================================================================
export const FullWidthExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "اطلاعات شخصی", children: <div>اطلاعات</div> },
    { key: "2", label: "تاریخچه", children: <div>تاریخچه</div> },
    { key: "3", label: "تنظیمات", children: <div>تنظیمات</div> },
  ];

  return <CustomTabs items={items} fullWidth variant="underline" />;
};

// =============================================================================
// ✅ EXAMPLE 8: Different Sizes
// =============================================================================
export const SizesExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>محتوا</div> },
    { key: "2", label: "تب ۲", children: <div>محتوا</div> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4>Small</h4>
        <CustomTabs items={items} size="small" />
      </div>
      <div>
        <h4>Middle (Default)</h4>
        <CustomTabs items={items} size="middle" />
      </div>
      <div>
        <h4>Large</h4>
        <CustomTabs items={items} size="large" />
      </div>
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 9: Disabled Tabs
// =============================================================================
export const DisabledExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "فعال", children: <div>این تب فعال است</div> },
    {
      key: "2",
      label: "غیرفعال",
      disabled: true,
      children: <div>این تب غیرفعال است</div>,
    },
    { key: "3", label: "فعال", children: <div>این تب هم فعال است</div> },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// ✅ EXAMPLE 10: Tab Positions
// =============================================================================
export const PositionsExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>محتوا</div> },
    { key: "2", label: "تب ۲", children: <div>محتوا</div> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4>Top (Default)</h4>
        <CustomTabs items={items} tabPosition="top" />
      </div>
      <div>
        <h4>Right</h4>
        <CustomTabs items={items} tabPosition="right" />
      </div>
      <div>
        <h4>Left</h4>
        <CustomTabs items={items} tabPosition="left" />
      </div>
    </div>
  );
};
