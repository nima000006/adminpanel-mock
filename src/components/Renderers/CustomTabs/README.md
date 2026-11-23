# CustomTabs Component

A production-ready, feature-rich tabs component built on Ant Design's Tabs with **100% API compatibility**.

## Why Use CustomTabs?

✅ **Drop-in replacement** - Works with existing `TabsProps["items"]` type  
✅ **Badge support** - Show counts and status indicators  
✅ **Visual variants** - Pills, underline, and default styles  
✅ **URL persistence** - Sync active tab with URL automatically  
✅ **Lazy loading** - Render tabs only when active  
✅ **Zero refactoring** - All Ant Design props work the same

## Quick Start

### Basic Usage (Same as Ant Design)

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  { key: "1", label: "Tab 1", children: <div>Content 1</div> },
  { key: "2", label: "Tab 2", children: <div>Content 2</div> },
];

<CustomTabs items={items} />;
```

### With Badge Support

```tsx
import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";

const items: CustomTabItem[] = [
  {
    key: "messages",
    label: "Messages",
    badgeCount: 5, // ✨ New feature
    children: <Messages />,
  },
  {
    key: "alerts",
    label: "Alerts",
    badgeDot: true, // ✨ New feature
    badgeStatus: "error",
    children: <Alerts />,
  },
];

<CustomTabs items={items} />;
```

## Props

### CustomTabs Props

All Ant Design Tabs props are supported. Below are additional props:

| Prop                    | Type                                            | Default     | Description                                                      |
| ----------------------- | ----------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `items`                 | `CustomTabItem[]`                               | required    | Tab items array (compatible with `TabsProps["items"]`)           |
| `variant`               | `"default" \| "card" \| "pills" \| "underline"` | `"default"` | Visual style variant                                             |
| `urlPersist`            | `"url" \| "none"`                               | `"none"`    | Sync active tab with URL query params                            |
| `urlKey`                | `string`                                        | `"tab"`     | Query param key when urlPersist is enabled                       |
| `lazyLoad`              | `boolean`                                       | `false`     | Only render tab content when active                              |
| `keepMounted`           | `boolean`                                       | `true`      | Keep tab content mounted after first render (when lazyLoad=true) |
| `fullWidth`             | `boolean`                                       | `false`     | Make tabs take full container width                              |
| ...all Ant Design props |                                                 |             | All standard Tabs props work                                     |

### CustomTabItem Props

Extends all Ant Design tab item props:

| Prop                             | Type                                                             | Default  | Description                      |
| -------------------------------- | ---------------------------------------------------------------- | -------- | -------------------------------- |
| `key`                            | `string`                                                         | required | Unique tab identifier            |
| `label`                          | `ReactNode`                                                      | required | Tab label/title                  |
| `children`                       | `ReactNode`                                                      | -        | Tab content                      |
| `badgeCount`                     | `number`                                                         | -        | Show badge with count            |
| `badgeDot`                       | `boolean`                                                        | -        | Show dot indicator               |
| `badgeStatus`                    | `"success" \| "processing" \| "default" \| "error" \| "warning"` | -        | Badge status color               |
| ...all Ant Design tab item props |                                                                  |          | All standard tab item props work |

## Features

### 1. Badge Support

Show notification counts or status indicators on tabs:

```tsx
const items: CustomTabItem[] = [
  {
    key: "inbox",
    label: "Inbox",
    badgeCount: 12,
    children: <Inbox />,
  },
  {
    key: "urgent",
    label: "Urgent",
    badgeDot: true,
    badgeStatus: "error",
    children: <Urgent />,
  },
];
```

**Badge Status Colors:**

- `success`: Green
- `processing`: Blue
- `default`: Gray
- `error`: Red
- `warning`: Orange

### 2. Visual Variants

Choose from multiple tab styles:

```tsx
// Default line style
<CustomTabs items={items} variant="default" />

// Card style
<CustomTabs items={items} variant="card" />

// Pill style (rounded)
<CustomTabs items={items} variant="pills" />

// Minimal underline
<CustomTabs items={items} variant="underline" />
```

### 3. URL Persistence

Sync active tab with URL automatically:

```tsx
<CustomTabs items={items} urlPersist="url" urlKey="section" defaultActiveKey="profile" />
// URL becomes: ?section=profile
```

Benefits:

- Shareable URLs
- Browser back/forward works
- Page refresh preserves tab state

### 4. Lazy Loading

Only render tab content when active (performance optimization):

```tsx
<CustomTabs
  items={items}
  lazyLoad
  keepMounted // Keep content after first render
/>
```

### 5. Full Width Tabs

Make tabs take full container width:

```tsx
<CustomTabs items={items} fullWidth />
```

## Complete Examples

### Example 1: Profile Tabs with Badges

```tsx
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";

const ProfileTabs = () => {
  const items: CustomTabItem[] = [
    {
      key: "profile",
      label: "Profile",
      children: <ProfileContent />,
    },
    {
      key: "messages",
      label: "Messages",
      badgeCount: 5,
      children: <Messages />,
    },
    {
      key: "notifications",
      label: "Notifications",
      badgeDot: true,
      badgeStatus: "error",
      children: <Notifications />,
    },
  ];

  return <CustomTabs items={items} urlPersist="url" urlKey="tab" centered />;
};
```

### Example 2: With Icons and Lazy Loading

```tsx
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

const items: CustomTabItem[] = [
  {
    key: "user",
    label: (
      <span>
        <UserOutlined />
        User Info
      </span>
    ),
    children: <UserInfo />,
  },
  {
    key: "settings",
    label: (
      <span>
        <SettingOutlined />
        Settings
      </span>
    ),
    children: <Settings />,
  },
];

<CustomTabs items={items} lazyLoad keepMounted />;
```

### Example 3: Pills Variant with Full Width

```tsx
<CustomTabs items={items} variant="pills" fullWidth defaultActiveKey="overview" />
```

### Example 4: Editable Card Tabs

```tsx
const [tabs, setTabs] = useState<CustomTabItem[]>([
  { key: "1", label: "Tab 1", children: <div>Content 1</div> },
]);

<CustomTabs
  items={tabs}
  type="editable-card"
  onChange={(key) => console.log(key)}
  onEdit={(targetKey, action) => {
    if (action === "add") {
      // Add new tab
    } else {
      // Remove tab
    }
  }}
/>;
```

## Migration from Ant Design Tabs

### Zero Changes Needed

Your existing code works as-is:

```tsx
// Before
import { Tabs, TabsProps } from "antd";
const items: TabsProps["items"] = [...];
<Tabs items={items} centered destroyOnHidden />

// After - only change import
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import type { TabsProps } from "antd"; // Can still use this!
const items: TabsProps["items"] = [...]; // Same type works
<CustomTabs items={items} centered destroyOnHidden />
```

### Gradual Enhancement

Start using new features gradually:

1. **Step 1**: Just change imports (no other changes)
2. **Step 2**: Add badges where useful
3. **Step 3**: Add URL persistence for better UX
4. **Step 4**: Enable lazy loading for performance

## Type Compatibility

```tsx
// ✅ Option 1: Standard Ant Design type
import type { TabsProps } from "antd";
const items: TabsProps["items"] = [{ key: "1", label: "Tab", children: <div /> }];

// ✅ Option 2: CustomTabItem (for badge features)
import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";
const items: CustomTabItem[] = [
  { key: "1", label: "Tab", badgeCount: 5, children: <div /> },
];
```

Both types work! Use `CustomTabItem` when you need badge features.

## Styling

### Custom Class Names

```tsx
<CustomTabs
  items={items}
  className="my-tabs"
  // Apply class to individual tabs:
  // items={[{ key: "1", label: "Tab", className: "custom-tab" }]}
/>
```

### CSS Variables

```scss
.custom-tabs {
  --tabs-border-color: #f0f0f0;
  --tabs-active-color: #1890ff;
  --tabs-hover-color: #40a9ff;
}
```

## Performance Tips

1. **Use lazy loading** for tabs with heavy content
2. **Enable keepMounted** if switching tabs frequently
3. **Use urlPersist** for better user experience
4. **Memoize tab items** if they don't change often

```tsx
const items = useMemo(
  () => [{ key: "1", label: "Tab 1", children: <HeavyComponent /> }],
  [
    /* dependencies */
  ]
);
```

## Common Patterns

### Pattern 1: Tabs with Loading State

```tsx
const items: CustomTabItem[] = [
  {
    key: "data",
    label: "Data",
    disabled: isLoading,
    children: isLoading ? <Spin /> : <Data />,
  },
];
```

### Pattern 2: Conditional Badges

```tsx
const items: CustomTabItem[] = [
  {
    key: "notifications",
    label: "Notifications",
    badgeCount: unreadCount > 0 ? unreadCount : undefined,
    children: <Notifications />,
  },
];
```

### Pattern 3: Dynamic Tabs

```tsx
const [activeKey, setActiveKey] = useState("1");
const [tabs, setTabs] = useState<CustomTabItem[]>(initialTabs);

<CustomTabs
  items={tabs}
  activeKey={activeKey}
  onChange={setActiveKey}
  type="editable-card"
  onEdit={(key, action) => {
    if (action === "add") {
      setTabs([...tabs, newTab]);
    } else {
      setTabs(tabs.filter((t) => t.key !== key));
    }
  }}
/>;
```

## API Reference

See [Ant Design Tabs Documentation](https://ant.design/components/tabs) for complete API reference. All props are supported.

Additional features are documented in this README.

## Troubleshooting

### TypeScript Errors

**Error**: Property 'badgeCount' does not exist on type 'TabsProps["items"]'

**Solution**: Use `CustomTabItem` type:

```tsx
import type { CustomTabItem } from "@components/Renderers/CustomTabs/CustomTabs";
const items: CustomTabItem[] = [...];
```

### URL Persistence Not Working

**Issue**: Active tab doesn't sync with URL

**Check**:

1. `urlPersist="url"` is set
2. `useQueryParams` hook is available
3. Router is properly configured

### Lazy Loading Issues

**Issue**: Tab content not rendering

**Solution**: Make sure `lazyLoad` is set to `true` and content is wrapped properly:

```tsx
{ key: "1", label: "Tab", children: <YourComponent /> }
```

## Support

For issues or questions:

1. Check Ant Design Tabs documentation
2. Review EXAMPLES.tsx for working code
3. See MIGRATION_GUIDE.md for migration help

---

**Version**: 2.0  
**Last Updated**: January 2026  
**Compatible with**: Ant Design 5.x+  
**License**: Same as your project
