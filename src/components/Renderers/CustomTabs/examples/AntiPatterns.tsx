/**
 * CustomTabs Anti-Patterns
 *
 * ❌ This file shows common mistakes and how to avoid them.
 * DO NOT copy these patterns - they are examples of what NOT to do.
 */

import React from "react";

import CustomTabs, { CustomTabItem } from "../CustomTabs";

// =============================================================================
// ❌ ANTI-PATTERN 1: Inline items array (causes unnecessary re-renders)
// =============================================================================
export const BadInlineItems = () => {
  // ❌ BAD: Creates new array on every render
  return (
    <CustomTabs
      items={[
        { key: "1", label: "تب", children: <div>محتوا</div> },
        { key: "2", label: "تب", children: <div>محتوا</div> },
      ]}
    />
  );
};

// ✅ GOOD: Define items outside or use useMemo
export const GoodDefinedItems = () => {
  const items: CustomTabItem[] = React.useMemo(
    () => [
      { key: "1", label: "تب", children: <div>محتوا</div> },
      { key: "2", label: "تب", children: <div>محتوا</div> },
    ],
    []
  );
  return <CustomTabs items={items} />;
};

// =============================================================================
// ❌ ANTI-PATTERN 2: Not using urlPersist for important navigation
// =============================================================================
export const BadNoUrlPersist = () => {
  // ❌ BAD: User loses their tab position on page refresh
  const items: CustomTabItem[] = [
    { key: "orders", label: "سفارشات", children: <div>...</div> },
    { key: "history", label: "تاریخچه", children: <div>...</div> },
  ];
  return <CustomTabs items={items} />;
};

// ✅ GOOD: Use urlPersist for main navigation tabs
export const GoodWithUrlPersist = () => {
  const items: CustomTabItem[] = [
    { key: "orders", label: "سفارشات", children: <div>...</div> },
    { key: "history", label: "تاریخچه", children: <div>...</div> },
  ];
  return (
    <CustomTabs
      items={items}
      urlPersist="url"
      urlKey="section"
      defaultActiveKey="orders"
    />
  );
};

// =============================================================================
// ❌ ANTI-PATTERN 3: Heavy components without lazyLoad
// =============================================================================
export const BadNoLazyLoad = () => {
  const HeavyDataGrid = () => {
    // Imagine this fetches lots of data on mount
    return <div>Heavy component that loads data</div>;
  };

  // ❌ BAD: All tabs render immediately, causing performance issues
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <HeavyDataGrid /> },
    { key: "2", label: "تب ۲", children: <HeavyDataGrid /> },
    { key: "3", label: "تب ۳", children: <HeavyDataGrid /> },
  ];
  return <CustomTabs items={items} />;
};

// ✅ GOOD: Use lazyLoad for heavy content
export const GoodWithLazyLoad = () => {
  const HeavyDataGrid = () => {
    return <div>Heavy component that loads data</div>;
  };

  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <HeavyDataGrid /> },
    { key: "2", label: "تب ۲", children: <HeavyDataGrid /> },
    { key: "3", label: "تب ۳", children: <HeavyDataGrid /> },
  ];
  return <CustomTabs items={items} lazyLoad keepMounted />;
};

// =============================================================================
// ❌ ANTI-PATTERN 4: Duplicate keys
// =============================================================================
export const BadDuplicateKeys = () => {
  // ❌ BAD: Duplicate keys cause React warnings and bugs
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>محتوا</div> },
    { key: "1", label: "تب ۲", children: <div>محتوا</div> }, // Same key!
  ];
  return <CustomTabs items={items} />;
};

// ✅ GOOD: Use unique keys
export const GoodUniqueKeys = () => {
  const items: CustomTabItem[] = [
    { key: "tab-1", label: "تب ۱", children: <div>محتوا</div> },
    { key: "tab-2", label: "تب ۲", children: <div>محتوا</div> },
  ];
  return <CustomTabs items={items} />;
};

// =============================================================================
// ❌ ANTI-PATTERN 5: Using both controlled and uncontrolled patterns
// =============================================================================
export const BadMixedControl = () => {
  const [active] = React.useState("1");

  // ❌ BAD: Using both activeKey AND defaultActiveKey
  const items: CustomTabItem[] = [
    { key: "1", label: "تب", children: <div>محتوا</div> },
    { key: "2", label: "تب", children: <div>محتوا</div> },
  ];
  return (
    <CustomTabs
      items={items}
      activeKey={active}
      defaultActiveKey="2" // This will be ignored!
    />
  );
};

// ✅ GOOD: Use either controlled OR uncontrolled
export const GoodControlled = () => {
  const [active] = React.useState("1");
  const items: CustomTabItem[] = [
    { key: "1", label: "تب", children: <div>محتوا</div> },
    { key: "2", label: "تب", children: <div>محتوا</div> },
  ];
  return <CustomTabs items={items} activeKey={active} />;
};

export const GoodUncontrolled = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب", children: <div>محتوا</div> },
    { key: "2", label: "تب", children: <div>محتوا</div> },
  ];
  return <CustomTabs items={items} defaultActiveKey="2" />;
};

// =============================================================================
// ❌ ANTI-PATTERN 6: Empty children without proper handling
// =============================================================================
export const BadEmptyChildren = () => {
  // ❌ BAD: No indication that content is loading or empty
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: null },
    { key: "2", label: "تب ۲", children: undefined },
  ];
  return <CustomTabs items={items} />;
};

// ✅ GOOD: Show proper empty/loading states
export const GoodWithEmptyState = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "تب ۱", children: <div>در حال بارگذاری...</div> },
    { key: "2", label: "تب ۲", children: <div>داده‌ای وجود ندارد</div> },
  ];
  return <CustomTabs items={items} />;
};
