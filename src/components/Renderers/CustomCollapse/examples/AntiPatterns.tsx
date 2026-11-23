/**
 * CustomCollapse Anti-Patterns
 *
 * ⚠️ WARNING: These are examples of WHAT NOT TO DO.
 * Each example shows a common mistake and the correct alternative.
 */

import { useState } from "react";

import { Collapse, CollapseProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomCollapse, { CustomCollapseItem } from "../CustomCollapse";

// =============================================================================
// ❌ ANTI-PATTERN 1: Using raw antd Collapse instead of CustomCollapse
// =============================================================================
export const BadRawCollapse = () => {
  // ❌ BAD: Using raw antd Collapse loses consistent styling
  const items: CollapseProps["items"] = [
    { key: "1", label: "پنل", children: <p>محتوا</p> },
  ];

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
      )}
      ghost
      items={items}
    />
  );

  // ✅ GOOD: Use CustomCollapse for consistent styling
  // <CustomCollapse
  //   variant="ghost"
  //   items={[{ key: "1", label: "پنل", children: <p>محتوا</p> }]}
  // />
};

// =============================================================================
// ❌ ANTI-PATTERN 2: Recreating expand icon every time
// =============================================================================
export const BadExpandIcon = () => {
  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل", children: <p>محتوا</p> },
  ];

  return (
    // ❌ BAD: CustomCollapse already has animated expand icon built-in
    <Collapse
      expandIcon={({ isActive }) => (
        <IoIosArrowDown
          rotate={isActive ? 0 : 180}
          className="some-custom-class"
          style={{ transition: "transform 0.3s" }}
        />
      )}
      items={items}
    />
  );

  // ✅ GOOD: Use CustomCollapse's built-in animated icon
  // <CustomCollapse
  //   items={items}
  //   animatedIcon
  // />
};

// =============================================================================
// ❌ ANTI-PATTERN 3: Manually managing accordion state
// =============================================================================
export const BadManualAccordion = () => {
  const [activeKey, setActiveKey] = useState<string | null>("1");

  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل اول", children: <p>محتوا</p> },
    { key: "2", label: "پنل دوم", children: <p>محتوا</p> },
  ];

  // ❌ BAD: Manually implementing accordion behavior
  const handleChange = (keys: string | string[]) => {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    // Only keep the last opened key
    setActiveKey(keyArray[keyArray.length - 1] || null);
  };

  return (
    <CustomCollapse
      items={items}
      activeKey={activeKey ? [activeKey] : []}
      onChange={handleChange}
    />
  );

  // ✅ GOOD: Use the accordion prop
  // <CustomCollapse
  //   accordion
  //   items={items}
  // />
};

// =============================================================================
// ❌ ANTI-PATTERN 4: Inconsistent styling with inline styles
// =============================================================================
export const BadInlineStyles = () => {
  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل", children: <p>محتوا</p> },
  ];

  return (
    // ❌ BAD: Using inline styles for common patterns
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <CustomCollapse items={items} bordered={false} className="some-custom-class" />
    </div>
  );

  // ✅ GOOD: Use the card variant
  // <CustomCollapse
  //   variant="card"
  //   items={items}
  // />
};

// =============================================================================
// ❌ ANTI-PATTERN 5: Using defaultActiveKey for controlled components
// =============================================================================
export const BadMixedControl = () => {
  const [activeKey, setActiveKey] = useState<string[]>(["1"]);

  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل اول", children: <p>محتوا</p> },
    { key: "2", label: "پنل دوم", children: <p>محتوا</p> },
  ];

  return (
    // ❌ BAD: Using both defaultActiveKey and activeKey
    <CustomCollapse
      items={items}
      defaultActiveKey={["1"]} // This is ignored when activeKey is set
      activeKey={activeKey}
      onChange={(keys) => setActiveKey(Array.isArray(keys) ? keys : [keys])}
    />
  );

  // ✅ GOOD: Use only one - either defaultActiveKey (uncontrolled) or activeKey (controlled)
  // Uncontrolled:
  // <CustomCollapse items={items} defaultActiveKey={["1"]} />
  //
  // Controlled:
  // <CustomCollapse items={items} activeKey={activeKey} onChange={...} />
};

// =============================================================================
// ❌ ANTI-PATTERN 6: Not using variant for ghost style
// =============================================================================
export const BadGhostStyle = () => {
  const items: CustomCollapseItem[] = [
    { key: "1", label: "پنل", children: <p>محتوا</p> },
  ];

  return (
    // ❌ BAD: Manually applying ghost-like styles
    <CustomCollapse items={items} bordered={false} className="ghost-like-collapse" />
  );

  // ✅ GOOD: Use the ghost variant
  // <CustomCollapse
  //   variant="ghost"
  //   items={items}
  // />
};

// =============================================================================
// ❌ ANTI-PATTERN 7: Nested heavy content without forceRender consideration
// =============================================================================
export const BadNoForceRender = () => {
  const items: CustomCollapseItem[] = [
    {
      key: "1",
      label: "فرم",
      // ❌ BAD: Form content that might lose state when collapsed
      children: (
        <form>
          <input type="text" placeholder="نام" />
          <input type="email" placeholder="ایمیل" />
        </form>
      ),
    },
  ];

  return <CustomCollapse items={items} />;

  // ✅ GOOD: Use forceRender for forms to preserve state
  // const items: CustomCollapseItem[] = [
  //   {
  //     key: "1",
  //     label: "فرم",
  //     forceRender: true, // Keeps form state even when collapsed
  //     children: (
  //       <form>
  //         <input type="text" placeholder="نام" />
  //         <input type="email" placeholder="ایمیل" />
  //       </form>
  //     ),
  //   },
  // ];
};
