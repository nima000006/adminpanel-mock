# CustomTabs Migration Guide

Complete guide for migrating from Ant Design Tabs to CustomTabs.

## Why Migrate?

- ✅ **Zero refactoring** - Works with existing code
- ✅ **Badge support** - Show notifications and status
- ✅ **URL persistence** - Better user experience
- ✅ **Visual variants** - More design options
- ✅ **Lazy loading** - Better performance
- ✅ **Type safe** - Full TypeScript support

## Quick Migration (1 Minute)

### Step 1: Update Import

```diff
- import { Tabs } from "antd";
+ import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
```

### Step 2: Update JSX

```diff
- <Tabs
+ <CustomTabs
```

**That's it!** Your existing code continues to work.

## Type Import Options

### Option 1: Keep Using TabsProps (Recommended for migration)

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd"; // Keep existing type import

const items: TabsProps["items"] = [
  { key: "1", label: "Tab 1", children: <div>Content</div> },
];

<CustomTabs items={items} />;
```

### Option 2: Use CustomTabItem (For badge features)

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";

const items: CustomTabItem[] = [
  {
    key: "1",
    label: "Tab 1",
    badgeCount: 5, // ✨ New feature
    children: <div>Content</div>,
  },
];

<CustomTabs items={items} />;
```

## Migration Examples

### Example 1: Simple Tabs

**Before:**

```tsx
import { Tabs, TabsProps } from "antd";

const MyComponent = () => {
  const items: TabsProps["items"] = [
    { key: "0", label: "پروفایل", children: <Profile /> },
    { key: "1", label: "تنظیمات", children: <Settings /> },
  ];

  return <Tabs items={items} centered />;
};
```

**After:**

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd";

const MyComponent = () => {
  const items: TabsProps["items"] = [
    { key: "0", label: "پروفایل", children: <Profile /> },
    { key: "1", label: "تنظیمات", children: <Settings /> },
  ];

  return <CustomTabs items={items} centered />;
};
```

✅ **No changes needed** except the import!

### Example 2: Tabs with Icons

**Before:**

```tsx
import { Tabs, TabsProps } from "antd";
import { PiGitBranch } from "react-icons/pi";

const items: TabsProps["items"] = [
  {
    key: "0",
    label: (
      <div style={{ display: "flex", gap: "8px" }}>
        <PiGitBranch />
        <span>Branches</span>
      </div>
    ),
    children: <BranchList />,
  },
];

<Tabs items={items} />;
```

**After:**

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd";
import { PiGitBranch } from "react-icons/pi";

const items: TabsProps["items"] = [
  {
    key: "0",
    label: (
      <div style={{ display: "flex", gap: "8px" }}>
        <PiGitBranch />
        <span>Branches</span>
      </div>
    ),
    children: <BranchList />,
  },
];

<CustomTabs items={items} />;
```

✅ **Icons work exactly the same**

### Example 3: Tabs with State

**Before:**

```tsx
import { Tabs, TabsProps } from "antd";
import { useState } from "react";

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState("0");

  const items: TabsProps["items"] = [
    { key: "0", label: "Tab 1", children: <Content1 /> },
    { key: "1", label: "Tab 2", children: <Content2 /> },
  ];

  return <Tabs items={items} activeKey={activeTab} onChange={setActiveTab} />;
};
```

**After:**

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd";
import { useState } from "react";

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState("0");

  const items: TabsProps["items"] = [
    { key: "0", label: "Tab 1", children: <Content1 /> },
    { key: "1", label: "Tab 2", children: <Content2 /> },
  ];

  return <CustomTabs items={items} activeKey={activeTab} onChange={setActiveTab} />;
};
```

✅ **State management works the same**

### Example 4: Tabs with URL Params

**Before (Manual URL sync):**

```tsx
import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router-dom";

const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "0";

  const items: TabsProps["items"] = [
    { key: "0", label: "Tab 1", children: <Content1 /> },
    { key: "1", label: "Tab 2", children: <Content2 /> },
  ];

  return (
    <Tabs
      items={items}
      activeKey={activeTab}
      onChange={(key) => setSearchParams({ tab: key })}
    />
  );
};
```

**After (Built-in URL sync):**

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd";

const MyComponent = () => {
  const items: TabsProps["items"] = [
    { key: "0", label: "Tab 1", children: <Content1 /> },
    { key: "1", label: "Tab 2", children: <Content2 /> },
  ];

  return <CustomTabs items={items} urlPersist="url" urlKey="tab" defaultActiveKey="0" />;
};
```

✅ **Simpler code with built-in feature**

### Example 5: Disabled Tabs

**Before:**

```tsx
const items: TabsProps["items"] = [
  { key: "0", label: "Tab 1", children: <Content1 /> },
  { key: "1", label: "Tab 2", children: <Content2 />, disabled: true },
];

<Tabs items={items} />;
```

**After:**

```tsx
const items: TabsProps["items"] = [
  { key: "0", label: "Tab 1", children: <Content1 /> },
  { key: "1", label: "Tab 2", children: <Content2 />, disabled: true },
];

<CustomTabs items={items} />;
```

✅ **Disabled state works the same**

## Adding New Features (Optional)

### Add Badge to Existing Tabs

```diff
  import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
+ import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";

- const items: TabsProps["items"] = [
+ const items: CustomTabItem[] = [
    {
      key: "messages",
      label: "Messages",
+     badgeCount: unreadCount,
      children: <Messages />
    },
  ];
```

### Add Visual Variant

```diff
  <CustomTabs
    items={items}
+   variant="pills"
  />
```

### Add URL Persistence

```diff
  <CustomTabs
    items={items}
+   urlPersist="url"
+   urlKey="section"
+   defaultActiveKey="profile"
  />
```

### Add Lazy Loading

```diff
  <CustomTabs
    items={items}
+   lazyLoad
+   keepMounted
  />
```

## Migration Checklist

Use this checklist for each file:

- [ ] Replace `import { Tabs }` with CustomTabs import
- [ ] Replace `<Tabs` with `<CustomTabs`
- [ ] Verify TypeScript types (TabsProps or CustomTabItem)
- [ ] Test tab switching
- [ ] Test with icons (if used)
- [ ] Test disabled state (if used)
- [ ] Test destroyOnHidden (if used)
- [ ] Test centered alignment (if used)
- [ ] Test editable-card type (if used)
- [ ] Consider adding badges (optional)
- [ ] Consider adding URL persistence (optional)
- [ ] Consider adding lazy loading (optional)

## Common Patterns in Your Codebase

### Pattern 1: Basic Tabs (Most Common)

**Files:** `Finance`, `International`, `Reports`, `Dorm`, etc.

```tsx
// Before
const items: TabsProps["items"] = [
  { key: "0", label: t("label"), children: <Component /> },
];
<Tabs items={items} centered />

// After - just change import
<CustomTabs items={items} centered />
```

### Pattern 2: Tabs with destroyOnHidden

**Files:** `Financial`, `Business`, etc.

```tsx
// Before
<Tabs items={items} destroyOnHidden={true} />

// After
<CustomTabs items={items} destroyOnHidden={true} />
```

### Pattern 3: Tabs with URL Params

**Files:** Many pages use manual URL sync

```tsx
// Before (manual)
const params = useSearchParams();
<Tabs activeKey={params.tab} onChange={...} />

// After (automatic)
<CustomTabs urlPersist="url" urlKey="tab" defaultActiveKey="0" />
```

## Bulk Migration Strategy

### Phase 1: Simple Tabs (Week 1)

Migrate tabs without state management first:

1. Search for `<Tabs items={items}` pattern
2. Replace imports
3. Test each page

**Files to migrate:**

- Finance pages (~10 files)
- Reports pages (~5 files)
- International pages (~3 files)

### Phase 2: Stateful Tabs (Week 2)

Migrate tabs with active key management:

1. Search for `activeKey` prop usage
2. Replace imports
3. Consider replacing with `urlPersist`

**Files to migrate:**

- Business pages
- Committee pages
- Financial pages

### Phase 3: Complex Tabs (Week 3)

Migrate editable-card and dynamic tabs:

1. Search for `type="editable-card"`
2. Carefully test onEdit handlers
3. Verify state management

**Files to migrate:**

- Settings pages
- Management pages

## Rollback Plan

If issues arise, easy rollback:

```diff
- import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
+ import { Tabs as CustomTabs } from "antd";
```

This alias allows reverting without changing JSX.

## Testing After Migration

### Unit Tests

```tsx
import { render, screen } from "@testing-library/react";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";

test("renders tabs", () => {
  const items = [{ key: "1", label: "Tab 1", children: <div>Content 1</div> }];
  render(<CustomTabs items={items} />);
  expect(screen.getByText("Tab 1")).toBeInTheDocument();
});
```

### Manual Testing

1. **Basic rendering**: Tabs appear correctly
2. **Switching**: Clicking tabs changes content
3. **Icons**: Icons display properly
4. **State**: Active state persists
5. **URL**: URL syncs correctly (if enabled)
6. **Badges**: Badges show when defined
7. **Disabled**: Disabled tabs can't be clicked
8. **Responsive**: Works on mobile

## Troubleshooting

### Issue: TypeScript Error on badgeCount

**Error:**

```
Property 'badgeCount' does not exist on type 'TabsProps["items"]'
```

**Solution:**

```diff
- import type { TabsProps } from "antd";
- const items: TabsProps["items"] = [
+ import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";
+ const items: CustomTabItem[] = [
```

### Issue: Tabs Not Rendering

**Check:**

1. Each item has unique `key`
2. `children` prop is provided
3. No console errors
4. Import path is correct

### Issue: URL Persistence Not Working

**Check:**

1. `urlPersist="url"` is set
2. `useQueryParams` hook exists
3. React Router is configured
4. `urlKey` matches expected param name

### Issue: Badge Not Showing

**Check:**

1. Using `CustomTabItem` type
2. `badgeCount > 0` or `badgeDot={true}`
3. Badge import is working

## Performance Considerations

### Before Migration

```tsx
// All tabs render immediately
<Tabs items={items} />
```

### After Migration (Optimized)

```tsx
// Only active tab renders
<CustomTabs items={items} lazyLoad keepMounted />
```

**Benefits:**

- Faster initial render
- Lower memory usage
- Better for tabs with heavy content

## Best Practices

1. **Start small**: Migrate 1-2 files first
2. **Test thoroughly**: Check all tab functionality
3. **Add features gradually**: Don't add all features at once
4. **Keep types simple**: Use TabsProps initially, CustomTabItem when needed
5. **Document changes**: Note which files use new features

## Getting Help

1. **Check documentation**: README.md for API reference
2. **See examples**: EXAMPLES.tsx for working code
3. **Review assessment**: ASSESSMENT.md for compatibility info
4. **Test locally**: Try on dev environment first

## Timeline Estimate

| Task          | Files | Time         |
| ------------- | ----- | ------------ |
| Simple tabs   | 20    | 30 min       |
| Stateful tabs | 15    | 45 min       |
| Complex tabs  | 10    | 1 hour       |
| Testing       | All   | 1 hour       |
| **Total**     | ~45   | **~3 hours** |

## Success Metrics

After migration:

- [ ] All tabs render correctly
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All tests pass
- [ ] No functionality lost
- [ ] New features working (if added)

---

**Ready to migrate?** Start with a simple tab component and work your way up!

For questions, check README.md or ASSESSMENT.md.
