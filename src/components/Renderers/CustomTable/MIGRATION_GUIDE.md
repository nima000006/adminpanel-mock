# CustomTable Migration Guide

## Overview

`CustomTable` is a production-ready, drop-in replacement for Ant Design's `Table` component with additional features like hidden columns support and Persian empty state defaults.

## Key Benefits

✅ **100% Compatible**: Works exactly like Ant Design Table - no breaking changes
✅ **Hidden Columns**: Support for `column.hidden` property
✅ **Persian Defaults**: Built-in Persian empty state message
✅ **Type Safe**: Full TypeScript support with generics
✅ **Production Ready**: Minimal abstraction, maximum compatibility

## Migration Steps

### 1. Simple Replace (No Changes Needed)

Your existing Table code will work without any modifications:

```tsx
// ✅ Before (Ant Design Table)
import { Table } from "antd";

<CustomTable
  dataSource={dataSource}
  columns={columns}
  loading={loading}
  pagination={paginationConfig}
  {...TABLE_PROPS(dataSource?.length)}
  rowKey="id"
/>;

// ✅ After (CustomTable) - Exact same usage!
import CustomTable from "@components/Renderers/CustomTable/CustomTable";

<CustomTable
  dataSource={dataSource}
  columns={columns}
  loading={loading}
  pagination={paginationConfig}
  {...TABLE_PROPS(dataSource?.length)}
  rowKey="id"
/>;
```

### 2. Using Hidden Columns Feature

The only new feature is the ability to hide columns dynamically:

```tsx
const columns = [
  { title: "نام", dataIndex: "name" },
  { title: "سن", dataIndex: "age", hidden: shouldHideAge }, // ✨ New feature
  { title: "آدرس", dataIndex: "address" },
];

<CustomTable dataSource={data} columns={columns} />;
```

### 3. Custom Empty Message

```tsx
// Default Persian message
<CustomTable
  dataSource={[]}
  columns={columns}
  // Shows: "داده‌ای وجود ندارد"
/>

// Custom message
<CustomTable
  dataSource={[]}
  columns={columns}
  emptyDescription="اطلاعاتی یافت نشد"
/>
```

## Real Examples from Your Codebase

### Example 1: Food Report All Vendor List

```tsx
// ✅ Current code - works as-is
<CustomTable
  dataSource={dataSource}
  rowKey="id"
  loading={vendorAllListLoading}
  columns={AllVendorListTableModel({
    isDeletedEnabled,
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
  })}
  pagination={paginationConfig}
  {...TABLE_PROPS(dataSource?.length)}
  className="food-all-vendor-list-table"
/>
```

### Example 2: Dorms Report List

```tsx
// ✅ Current code - works as-is
<CustomTable
  dataSource={dataSource}
  columns={ReportRoomListModel({
    searchInput,
    searchedColumn,
    setSearchedColumn,
    searchText,
    setSearchText,
    roomClickHandler,
  })}
  pagination={paginationConfig}
  loading={isListOfDormLoading}
  className="dorm-table-container"
  {...TABLE_PROPS(dataSource?.length)}
/>
```

### Example 3: With Row Selection

```tsx
<CustomTable
  dataSource={data}
  columns={columns}
  rowSelection={{
    type: "checkbox",
    selectedRowKeys,
    onChange: (keys, rows) => setSelectedKeys(keys),
  }}
  pagination={paginationConfig}
/>
```

## API Reference

### Props

All Ant Design Table props are supported. The only additions are:

| Prop               | Type      | Default                | Description                   |
| ------------------ | --------- | ---------------------- | ----------------------------- |
| `columns[].hidden` | `boolean` | `false`                | Hide this column from display |
| `emptyDescription` | `string`  | `"داده‌ای وجود ندارد"` | Custom empty state text       |

### Column Type

```typescript
type CustomColumnType<T> = AntdColumnType<T> & {
  hidden?: boolean; // ✨ New property
};
```

## Common Patterns

### 1. Conditionally Hide Columns

```tsx
const columns = [
  { title: "نام", dataIndex: "name" },
  {
    title: "عملیات حذف",
    dataIndex: "delete",
    hidden: !hasDeletePermission, // Hide based on permission
  },
];
```

### 2. Hide Columns on Mobile

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");

const columns = [
  { title: "نام", dataIndex: "name" },
  { title: "شرح کامل", dataIndex: "description", hidden: isMobile },
  { title: "عملیات", dataIndex: "actions" },
];
```

### 3. Server-Side Pagination (Using Ant Design's pagination prop)

```tsx
<CustomTable
  dataSource={data}
  columns={columns}
  loading={isLoading}
  pagination={{
    total: totalRecords,
    current: currentPage,
    pageSize: pageSize,
    onChange: (page, pageSize) => {
      fetchData(page, pageSize);
    },
    showSizeChanger: true,
    pageSizeOptions: ["8", "10", "25", "50"],
  }}
/>
```

## TypeScript Support

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

## Performance Notes

- ✅ Hidden columns are filtered at render time using `useMemo`
- ✅ No extra wrappers or DOM elements (unlike previous version)
- ✅ Direct passthrough to Ant Design Table for optimal performance

## Troubleshooting

### Q: My existing Table code doesn't work

**A:** CustomTable is 100% compatible. Make sure you:

1. Import from the correct path: `@components/Renderers/CustomTable/CustomTable`
2. Pass all the same props you were passing to `Table`

### Q: How do I use pagination?

**A:** Exactly the same as Ant Design Table:

```tsx
// Use paginationConfig from your app
pagination={paginationConfig}

// Or custom object
pagination={{ pageSize: 10, total: 100 }}

// Or false to disable
pagination={false}
```

### Q: Can I use all Ant Design Table features?

**A:** Yes! All props, methods, and features are supported including:

- `rowSelection`
- `expandable`
- `scroll`
- `onChange`
- `onRow`
- Everything else from Ant Design Table API

## Migration Checklist

- [ ] Import `CustomTable` instead of `Table`
- [ ] Test existing functionality (should work unchanged)
- [ ] Consider using `hidden` property for conditional columns
- [ ] Verify pagination still works
- [ ] Check row selection if used
- [ ] Test loading states
- [ ] Verify empty states show correctly

## Support

For issues or questions, refer to:

- [Ant Design Table Documentation](https://ant.design/components/table)
- CustomTable source code with inline comments
