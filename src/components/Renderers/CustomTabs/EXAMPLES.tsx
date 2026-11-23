/**
 * CustomTabs Component Examples
 *
 * Complete working examples showing all features and usage patterns.
 * Copy and adapt these examples to your needs.
 */

import { useState } from "react";

import {
  PiUser,
  PiGear,
  PiBell,
  PiChatCircle,
  PiSquaresFour,
  PiFile,
} from "react-icons/pi";

import CustomTabs from "./CustomTabs";

import type { CustomTabItem } from "./CustomTabs";
import type { TabsProps } from "antd";

// =============================================================================
// Example 1: Basic Tabs (Same as Ant Design)
// =============================================================================

export const BasicTabsExample = () => {
  // ✅ Can still use TabsProps type!
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: <div>Content of Tab Pane 1</div>,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <div>Content of Tab Pane 2</div>,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <div>Content of Tab Pane 3</div>,
    },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 2: Tabs with Badge Support
// =============================================================================

export const BadgeTabsExample = () => {
  // Use CustomTabItem for badge features
  const items: CustomTabItem[] = [
    {
      key: "messages",
      label: "Messages",
      badgeCount: 5, // ✨ Shows badge with count
      children: <div>You have 5 unread messages</div>,
    },
    {
      key: "notifications",
      label: "Notifications",
      badgeDot: true, // ✨ Shows dot indicator
      badgeStatus: "error",
      children: <div>Important notifications</div>,
    },
    {
      key: "tasks",
      label: "Tasks",
      badgeCount: 12,
      badgeStatus: "processing",
      children: <div>12 pending tasks</div>,
    },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 3: Tabs with Icons
// =============================================================================

export const IconTabsExample = () => {
  const items: CustomTabItem[] = [
    {
      key: "dashboard",
      label: (
        <span>
          <PiSquaresFour />
          Dashboard
        </span>
      ),
      children: <div>Dashboard content</div>,
    },
    {
      key: "profile",
      label: (
        <span>
          <PiUser />
          Profile
        </span>
      ),
      children: <div>Profile content</div>,
    },
    {
      key: "settings",
      label: (
        <span>
          <PiGear />
          Settings
        </span>
      ),
      children: <div>Settings content</div>,
    },
  ];

  return <CustomTabs items={items} centered />;
};

// =============================================================================
// Example 4: Tabs with Icons and Badges
// =============================================================================

export const IconBadgeTabsExample = () => {
  const items: CustomTabItem[] = [
    {
      key: "messages",
      label: (
        <span>
          <PiChatCircle />
          Messages
        </span>
      ),
      badgeCount: 5,
      children: <div>Messages inbox</div>,
    },
    {
      key: "notifications",
      label: (
        <span>
          <PiBell />
          Notifications
        </span>
      ),
      badgeDot: true,
      badgeStatus: "error",
      children: <div>Notification center</div>,
    },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 5: Pills Variant
// =============================================================================

export const PillsVariantExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "Overview", children: <div>Overview content</div> },
    { key: "2", label: "Analytics", children: <div>Analytics content</div> },
    { key: "3", label: "Reports", children: <div>Reports content</div> },
  ];

  return <CustomTabs items={items} variant="pills" />;
};

// =============================================================================
// Example 6: Underline Variant
// =============================================================================

export const UnderlineVariantExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "Profile", children: <div>Profile settings</div> },
    { key: "2", label: "Security", children: <div>Security settings</div> },
    { key: "3", label: "Privacy", children: <div>Privacy settings</div> },
  ];

  return <CustomTabs items={items} variant="underline" />;
};

// =============================================================================
// Example 7: URL Persistence
// =============================================================================

export const UrlPersistenceExample = () => {
  const items: CustomTabItem[] = [
    { key: "profile", label: "Profile", children: <div>Profile content</div> },
    { key: "settings", label: "Settings", children: <div>Settings content</div> },
    { key: "billing", label: "Billing", children: <div>Billing content</div> },
  ];

  // Active tab syncs with URL: ?section=profile
  return (
    <CustomTabs
      items={items}
      urlPersist="url"
      urlKey="section"
      defaultActiveKey="profile"
    />
  );
};

// =============================================================================
// Example 8: Lazy Loading (Performance Optimization)
// =============================================================================

// Heavy component that takes time to render
const HeavyComponent = ({ name }: { name: string }) => {
  return <div>Heavy content: {name}</div>;
};

export const LazyLoadingExample = () => {
  const items: CustomTabItem[] = [
    {
      key: "1",
      label: "Tab 1",
      children: <HeavyComponent name="Tab 1" />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <HeavyComponent name="Tab 2" />,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <HeavyComponent name="Tab 3" />,
    },
  ];

  // Only renders content of active tab
  // keepMounted keeps content after first render
  return <CustomTabs items={items} lazyLoad keepMounted />;
};

// =============================================================================
// Example 9: Controlled Tabs with State
// =============================================================================

export const ControlledTabsExample = () => {
  const [activeKey, setActiveKey] = useState("1");

  const items: CustomTabItem[] = [
    { key: "1", label: "Tab 1", children: <div>Content 1</div> },
    { key: "2", label: "Tab 2", children: <div>Content 2</div> },
    { key: "3", label: "Tab 3", children: <div>Content 3</div> },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        Active Tab: {activeKey}
        <button onClick={() => setActiveKey("2")}>Go to Tab 2</button>
      </div>
      <CustomTabs
        items={items}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
      />
    </div>
  );
};

// =============================================================================
// Example 10: Conditional Badge
// =============================================================================

export const ConditionalBadgeExample = () => {
  const [unreadCount, setUnreadCount] = useState(5);

  const items: CustomTabItem[] = [
    {
      key: "inbox",
      label: "Inbox",
      // Only show badge when there are unread messages
      badgeCount: unreadCount > 0 ? unreadCount : undefined,
      children: (
        <div>
          <p>Unread messages: {unreadCount}</p>
          <button onClick={() => setUnreadCount(0)}>Mark all as read</button>
          <button onClick={() => setUnreadCount(unreadCount + 1)}>New message</button>
        </div>
      ),
    },
    {
      key: "sent",
      label: "Sent",
      children: <div>Sent messages</div>,
    },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 11: Disabled Tabs
// =============================================================================

export const DisabledTabsExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "Active Tab", children: <div>Content 1</div> },
    {
      key: "2",
      label: "Disabled Tab",
      children: <div>Content 2</div>,
      disabled: true,
    },
    { key: "3", label: "Another Active", children: <div>Content 3</div> },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 12: Card Type Tabs
// =============================================================================

export const CardTabsExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "Card Tab 1", children: <div>Card content 1</div> },
    { key: "2", label: "Card Tab 2", children: <div>Card content 2</div> },
    { key: "3", label: "Card Tab 3", children: <div>Card content 3</div> },
  ];

  return <CustomTabs items={items} type="card" />;
};

// =============================================================================
// Example 13: Editable Card Tabs (Dynamic Tabs)
// =============================================================================

export const EditableCardTabsExample = () => {
  const [tabs, setTabs] = useState<CustomTabItem[]>([
    { key: "1", label: "Tab 1", children: <div>Content 1</div> },
    { key: "2", label: "Tab 2", children: <div>Content 2</div> },
  ]);
  const [activeKey, setActiveKey] = useState("1");
  const [newTabIndex, setNewTabIndex] = useState(3);

  const add = () => {
    const newKey = `${newTabIndex}`;
    setTabs([
      ...tabs,
      {
        key: newKey,
        label: `Tab ${newTabIndex}`,
        children: <div>Content {newTabIndex}</div>,
      },
    ]);
    setActiveKey(newKey);
    setNewTabIndex(newTabIndex + 1);
  };

  const remove = (targetKey: string) => {
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
    if (targetKey === activeKey) {
      const newActiveKey = newTabs[newTabs.length - 1]?.key;
      setActiveKey(newActiveKey);
    }
    setTabs(newTabs);
  };

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <CustomTabs
      items={tabs}
      type="editable-card"
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
};

// =============================================================================
// Example 14: Full Width Tabs
// =============================================================================

export const FullWidthTabsExample = () => {
  const items: CustomTabItem[] = [
    { key: "1", label: "Full Width 1", children: <div>Content 1</div> },
    { key: "2", label: "Full Width 2", children: <div>Content 2</div> },
    { key: "3", label: "Full Width 3", children: <div>Content 3</div> },
  ];

  return <CustomTabs items={items} fullWidth />;
};

// =============================================================================
// Example 15: Complete Real-World Example
// =============================================================================

interface Message {
  id: number;
  text: string;
  unread: boolean;
}

export const CompleteRealWorldExample = () => {
  const [messages] = useState<Message[]>([
    { id: 1, text: "New project proposal", unread: true },
    { id: 2, text: "Meeting reminder", unread: true },
    { id: 3, text: "Code review request", unread: true },
  ]);

  const [notifications] = useState([
    { id: 1, text: "System update", critical: true },
    { id: 2, text: "New follower", critical: false },
  ]);

  const unreadCount = messages.filter((m) => m.unread).length;
  const hasCriticalNotification = notifications.some((n) => n.critical);

  const items: CustomTabItem[] = [
    {
      key: "dashboard",
      label: (
        <span>
          <PiSquaresFour />
          Dashboard
        </span>
      ),
      children: (
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back!</p>
        </div>
      ),
    },
    {
      key: "messages",
      label: (
        <span>
          <PiChatCircle />
          Messages
        </span>
      ),
      badgeCount: unreadCount,
      children: (
        <div>
          <h2>Messages</h2>
          {messages.map((msg) => (
            <div key={msg.id} style={{ padding: 8 }}>
              {msg.text} {msg.unread && <strong>(Unread)</strong>}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "notifications",
      label: (
        <span>
          <PiBell />
          Notifications
        </span>
      ),
      badgeDot: hasCriticalNotification,
      badgeStatus: hasCriticalNotification ? "error" : "default",
      children: (
        <div>
          <h2>Notifications</h2>
          {notifications.map((notif) => (
            <div key={notif.id} style={{ padding: 8 }}>
              {notif.text} {notif.critical && <strong>(Critical)</strong>}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "documents",
      label: (
        <span>
          <PiFile />
          Documents
        </span>
      ),
      children: (
        <div>
          <h2>Documents</h2>
          <p>No documents yet.</p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Panel</h1>
      <CustomTabs
        items={items}
        variant="pills"
        urlPersist="url"
        urlKey="tab"
        defaultActiveKey="dashboard"
        lazyLoad
        keepMounted
      />
    </div>
  );
};

// =============================================================================
// Example 16: Persian/RTL Example (From Your Codebase)
// =============================================================================

export const PersianTabsExample = () => {
  const items: CustomTabItem[] = [
    {
      key: "0",
      label: "پروفایل",
      children: (
        <div dir="rtl">
          <h2>اطلاعات پروفایل</h2>
          <p>محتوای پروفایل</p>
        </div>
      ),
    },
    {
      key: "1",
      label: "تنظیمات",
      badgeCount: 3,
      children: (
        <div dir="rtl">
          <h2>تنظیمات</h2>
          <p>3 تنظیمات جدید</p>
        </div>
      ),
    },
    {
      key: "2",
      label: "پیام‌ها",
      badgeDot: true,
      badgeStatus: "error",
      children: (
        <div dir="rtl">
          <h2>پیام‌ها</h2>
          <p>پیام‌های خوانده نشده</p>
        </div>
      ),
    },
  ];

  return <CustomTabs items={items} centered />;
};

// =============================================================================
// Example 17: TypeScript Type Compatibility
// =============================================================================

export const TypeCompatibilityExample = () => {
  // ✅ Option 1: Use standard TabsProps type
  const standardItems: TabsProps["items"] = [
    { key: "1", label: "Tab 1", children: <div>Content</div> },
  ];

  // ✅ Option 2: Use CustomTabItem type for badges
  const customItems: CustomTabItem[] = [
    { key: "1", label: "Tab 1", badgeCount: 5, children: <div>Content</div> },
  ];

  return (
    <div>
      <h3>Standard Type</h3>
      <CustomTabs items={standardItems} />

      <h3>Custom Type with Badges</h3>
      <CustomTabs items={customItems} />
    </div>
  );
};

// =============================================================================
// Example 18: Integration with API Data
// =============================================================================

interface ApiTab {
  id: string;
  title: string;
  count: number;
}

export const ApiIntegrationExample = () => {
  // Simulated API data
  const apiData: ApiTab[] = [
    { id: "pending", title: "Pending", count: 5 },
    { id: "approved", title: "Approved", count: 10 },
    { id: "rejected", title: "Rejected", count: 2 },
  ];

  // Transform API data to tab items
  const items: CustomTabItem[] = apiData.map((tab) => ({
    key: tab.id,
    label: tab.title,
    badgeCount: tab.count > 0 ? tab.count : undefined,
    badgeStatus: tab.id === "rejected" ? "error" : "processing",
    children: (
      <div>
        <h3>{tab.title}</h3>
        <p>Count: {tab.count}</p>
      </div>
    ),
  }));

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 19: With Loading State
// =============================================================================

export const LoadingStateExample = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  setTimeout(() => setLoading(false), 2000);

  const items: CustomTabItem[] = [
    {
      key: "1",
      label: "Data",
      disabled: loading,
      children: loading ? <div>Loading...</div> : <div>Data loaded successfully!</div>,
    },
  ];

  return <CustomTabs items={items} />;
};

// =============================================================================
// Example 20: destroyOnHidden (From Your Codebase)
// =============================================================================

export const DestroyOnHiddenExample = () => {
  const items: CustomTabItem[] = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <div>
          <p>This content is destroyed when tab is hidden</p>
          <input placeholder="Try typing and switching tabs" />
        </div>
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: <div>Content 2</div>,
    },
  ];

  // Content is destroyed when switching tabs (like your Financial page)
  return <CustomTabs items={items} destroyOnHidden={true} />;
};

// =============================================================================
// Export All Examples
// =============================================================================

export const AllTabsExamples = () => {
  return (
    <div style={{ padding: 24 }} className="flex flex-col gap-20">
      <h1>CustomTabs Examples</h1>

      <section>
        <h2>1. Basic Tabs</h2>
        <BasicTabsExample />
      </section>

      <section>
        <h2>2. Tabs with Badges</h2>
        <BadgeTabsExample />
      </section>

      <section>
        <h2>3. Tabs with Icons</h2>
        <IconTabsExample />
      </section>

      <section>
        <h2>4. Icons + Badges</h2>
        <IconBadgeTabsExample />
      </section>

      <section>
        <h2>5. Pills Variant</h2>
        <PillsVariantExample />
      </section>

      <section>
        <h2>6. Underline Variant</h2>
        <UnderlineVariantExample />
      </section>

      <section>
        <h2>7. URL Persistence</h2>
        <UrlPersistenceExample />
      </section>

      <section>
        <h2>8. Lazy Loading</h2>
        <LazyLoadingExample />
      </section>

      <section>
        <h2>9. Controlled Tabs</h2>
        <ControlledTabsExample />
      </section>

      <section>
        <h2>10. Conditional Badge</h2>
        <ConditionalBadgeExample />
      </section>

      <section>
        <h2>11. Disabled Tabs</h2>
        <DisabledTabsExample />
      </section>

      <section>
        <h2>12. Card Tabs</h2>
        <CardTabsExample />
      </section>

      <section>
        <h2>13. Editable Card Tabs</h2>
        <EditableCardTabsExample />
      </section>

      <section>
        <h2>14. Full Width Tabs</h2>
        <FullWidthTabsExample />
      </section>

      <section>
        <h2>15. Real-World Example</h2>
        <CompleteRealWorldExample />
      </section>

      <section>
        <h2>16. Persian/RTL</h2>
        <PersianTabsExample />
      </section>

      <section>
        <h2>17. Type Compatibility</h2>
        <TypeCompatibilityExample />
      </section>

      <section>
        <h2>18. API Integration</h2>
        <ApiIntegrationExample />
      </section>

      <section>
        <h2>19. Loading State</h2>
        <LoadingStateExample />
      </section>

      <section>
        <h2>20. destroyOnHidden</h2>
        <DestroyOnHiddenExample />
      </section>
    </div>
  );
};
