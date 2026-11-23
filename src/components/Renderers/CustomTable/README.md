# CustomTable Component

A production-ready, drop-in replacement for Ant Design's Table component with additional features.

## ✨ Features

- ✅ **100% Compatible** with Ant Design Table API
- ✅ **Hidden Columns** support via `column.hidden` property
- ✅ **Persian Defaults** for empty states
- ✅ **TypeScript** with full generic support
- ✅ **Zero Breaking Changes** - works with existing code
- ✅ **Production Ready** - minimal abstraction, maximum compatibility

## 📦 Installation

The component is already available in your project at:

```
src/components/Renderers/CustomTable/CustomTable.tsx
```

## 🚀 Quick Start

### Basic Usage (Drop-in Replacement)

```tsx
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const MyComponent = () => {
  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={paginationConfig}
      {...TABLE_PROPS(dataSource?.length)}
      rowKey="id"
    />
  );
};
```

### With Hidden Columns (New Feature!)

```tsx
const columns = [
  { title: "نام", dataIndex: "name" },
  { title: "سن", dataIndex: "age", hidden: shouldHideAge }, // ✨ Conditionally hide
  { title: "آدرس", dataIndex: "address" },
];

<CustomTable dataSource={data} columns={columns} />;
```

## 📚 Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Complete migration guide from Table to CustomTable
- **[EXAMPLES.tsx](./EXAMPLES.tsx)** - 10+ real-world usage examples
- **[Ant Design Table Docs](https://ant.design/components/table)** - All Table props are supported

## 🎯 Key Differences from Ant Design Table

| Feature           | Ant Design Table | CustomTable            |
| ----------------- | ---------------- | ---------------------- |
| All Table props   | ✅               | ✅                     |
| Hidden columns    | ❌               | ✅ via `column.hidden` |
| Empty state       | English default  | Persian default        |
| API Compatibility | -                | 100% compatible        |

## 🔧 API

### Props

Accepts all [Ant Design Table props](https://ant.design/components/table/#table) plus:

| Prop               | Type      | Default                | Description          |
| ------------------ | --------- | ---------------------- | -------------------- |
| `columns[].hidden` | `boolean` | `false`                | Hide this column     |
| `emptyDescription` | `string`  | `"داده‌ای وجود ندارد"` | Custom empty message |

### Column Type

```typescript
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";

type CustomColumnType<T> = AntdColumnType<T> & {
  hidden?: boolean; // ✨ New property
};
```

## 💡 Common Use Cases

### 1. Conditionally Show/Hide Columns

```tsx
const [showDetails, setShowDetails] = useState(false);

const columns = [
  { title: "نام", dataIndex: "name" },
  { title: "جزئیات", dataIndex: "details", hidden: !showDetails },
];
```

### 2. Hide Columns Based on Permissions

```tsx
const columns = [
  { title: "نام", dataIndex: "name" },
  {
    title: "حذف",
    dataIndex: "delete",
    hidden: !hasDeletePermission, // Hide from users without permission
  },
];
```

### 3. Responsive Design

```tsx
const isMobile = window.innerWidth < 768;

const columns = [
  { title: "نام", dataIndex: "name" },
  { title: "توضیحات", dataIndex: "desc", hidden: isMobile },
];
```

### 4. Server-Side Pagination

```tsx
<CustomTable
  dataSource={data}
  columns={columns}
  loading={isLoading}
  pagination={{
    total: totalRecords,
    current: currentPage,
    pageSize: pageSize,
    onChange: (page, pageSize) => fetchData(page, pageSize),
  }}
/>
```

## 🎨 Styling

The component uses your existing table styles plus:

```scss
// _customTable.scss
.custom-table-container {
  // Your custom styles
}
```

## 🔍 TypeScript Support

Full generic type support:

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

<CustomTable<User>
  dataSource={users}
  columns={userColumns}
  rowKey={(record) => record.id}
/>
```

## 📖 Examples

Check [EXAMPLES.tsx](./EXAMPLES.tsx) for:

- ✅ Basic usage
- ✅ Hidden columns
- ✅ Loading states
- ✅ Server-side pagination
- ✅ Row selection
- ✅ Custom empty state
- ✅ Scrolling tables
- ✅ Responsive columns
- ✅ Expandable rows
- ✅ Real-world patterns from your codebase
- ✅ TypeScript examples

## ⚡ Performance

- Hidden columns are filtered using `useMemo` - no extra re-renders
- Direct passthrough to Ant Design Table - no wrapper divs
- Optimized for large datasets

## 🔄 Migration

To migrate from `Table` to `CustomTable`:

1. **Find & Replace**: `import { Table } from "antd"` → `import CustomTable from "@components/Renderers/CustomTable/CustomTable"`
2. **Replace Component**: `<Table` → `<CustomTable`
3. **Test**: Everything should work exactly the same!

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions.

## ❓ FAQ

### Can I use all Ant Design Table features?

**Yes!** CustomTable supports all Table props including:

- `rowSelection` - for selecting rows
- `expandable` - for expandable rows
- `scroll` - for fixed headers/columns
- `onChange` - for handling changes
- `onRow` - for row events
- Everything else from the Table API

### Will this break my existing code?

**No!** It's a drop-in replacement. Your existing Table code will work without any changes.

### What's the performance impact?

**Minimal.** The only overhead is filtering hidden columns with `useMemo`, which is negligible.

### Can I customize the empty state?

**Yes!** Use the `emptyDescription` prop:

```tsx
<CustomTable emptyDescription="هیچ داده‌ای یافت نشد" />
```

### Do I need to change my column definitions?

**No!** Your existing columns work as-is. The `hidden` property is optional.

## 🤝 Contributing

To improve this component:

1. Keep it simple - avoid over-engineering
2. Maintain 100% compatibility with Ant Design Table
3. Add tests for new features
4. Update documentation

## 📝 License

Same as your project license.

## 🔗 Related

- [Ant Design Table Documentation](https://ant.design/components/table)
- [Your Project's Table Helper Functions](../../../infrastructure/helpers/TableHelpers)
- [Custom Empty Component](../CustomEmpty/CustomEmpty.tsx)

---

**Made with ❤️ for your admin panel**

_Last updated: January 2026_
