/**
 * CustomTable Anti-Patterns
 *
 * ❌ This file shows common mistakes and how to avoid them.
 * DO NOT copy these patterns - they are examples of what NOT to do.
 */

import React from "react";

import CustomTable, { CustomColumnType } from "../CustomTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: "علی", age: 25 },
  { id: 2, name: "سارا", age: 30 },
];

// =============================================================================
// ❌ ANTI-PATTERN 1: Inline columns (causes re-renders)
// =============================================================================
export const BadInlineColumns = () => {
  // ❌ BAD: Creates new columns array on every render
  return (
    <CustomTable<User>
      dataSource={sampleData}
      rowKey="id"
      columns={[
        { title: "نام", dataIndex: "name", key: "name" },
        { title: "سن", dataIndex: "age", key: "age" },
      ]}
    />
  );
};

// ✅ GOOD: Define columns outside or use useMemo
export const GoodDefinedColumns = () => {
  const columns = React.useMemo<CustomColumnType<User>[]>(
    () => [
      { title: "نام", dataIndex: "name", key: "name" },
      { title: "سن", dataIndex: "age", key: "age" },
    ],
    []
  );
  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ❌ ANTI-PATTERN 2: Missing rowKey
// =============================================================================
export const BadNoRowKey = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  // ❌ BAD: No rowKey - will cause React key warnings
  return <CustomTable<User> dataSource={sampleData} columns={columns} />;
};

// ✅ GOOD: Always provide rowKey
export const GoodWithRowKey = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ❌ ANTI-PATTERN 3: Wrong pagination for server data
// =============================================================================
export const BadClientPaginationForServerData = () => {
  // ❌ BAD: Using client pagination (default) when data comes from server
  // This will paginate only the current page data (e.g. 10 items), showing "Page 1 of 1"
  // instead of "Page 1 of 100"
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  return (
    <CustomTable<User>
      dataSource={sampleData} // This is just page 1 from server!
      columns={columns}
      rowKey="id"
      // Missing 'total' and 'onPageChange' props!
    />
  );
};

// ✅ GOOD: Use server pagination for server data
export const GoodServerPagination = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  // In a real component, these would come from state/API
  const total = 100;
  const page = 1;
  const handlePageChange = () => {
    // fetchData(page, pageSize);
  };

  return (
    <CustomTable<User>
      dataSource={sampleData}
      columns={columns}
      rowKey="id"
      // New simplified pagination:
      total={total}
      pageNumber={page}
      onPageChange={handlePageChange}
    />
  );
};

// =============================================================================
// ❌ ANTI-PATTERN 4: Selection without controlled state
// =============================================================================
export const BadUncontrolledSelection = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  // ❌ BAD: Selection enabled but no state management
  // You won't know what's selected!
  return (
    <CustomTable<User>
      dataSource={sampleData}
      columns={columns}
      rowKey="id"
      // Missing: selectedRowKeys and onSelectionChange
    />
  );
};

// ✅ GOOD: Controlled selection
export const GoodControlledSelection = () => {
  // const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  return (
    <CustomTable<User>
      dataSource={sampleData}
      columns={columns}
      rowKey="id"
      // selectedRowKeys={selectedKeys}
      // onSelectionChange={(keys) => setSelectedKeys(keys)}
    />
  );
};

// =============================================================================
// ❌ ANTI-PATTERN 5: Heavy render functions without memoization
// =============================================================================
export const BadHeavyRender = () => {
  // ❌ BAD: Complex render function runs on every cell render
  const columns: CustomColumnType<User>[] = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      render: (name: string) => {
        // Heavy computation on every render!
        const processed = name.split("").reverse().join("");
        return <span>{processed}</span>;
      },
    },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// ✅ GOOD: Memoize columns or use shouldCellUpdate
export const GoodMemoizedColumns = () => {
  const columns = React.useMemo<CustomColumnType<User>[]>(
    () => [
      {
        title: "نام",
        dataIndex: "name",
        key: "name",
        render: (name: string) => {
          const processed = name.split("").reverse().join("");
          return <span>{processed}</span>;
        },
        shouldCellUpdate: (record, prevRecord) => record.name !== prevRecord.name,
      },
    ],
    []
  );

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ❌ ANTI-PATTERN 6: Not handling empty state properly
// =============================================================================
export const BadEmptyState = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  // ❌ BAD: No data but no indication to user
  return <CustomTable<User> dataSource={[]} columns={columns} rowKey="id" />;
};

// ✅ GOOD: Provide meaningful empty description
export const GoodEmptyState = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
  ];

  return (
    <CustomTable<User>
      dataSource={[]}
      columns={columns}
      rowKey="id"
      emptyDescription="هیچ کاربری یافت نشد. لطفاً فیلترها را تغییر دهید."
    />
  );
};

// =============================================================================
// ❌ ANTI-PATTERN 7: Mutating dataSource directly
// =============================================================================
export const BadMutatingData = () => {
  const [data, setData] = React.useState(sampleData);

  const handleDelete = (id: number) => {
    // ❌ BAD: Direct mutation
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1); // Mutating!
    setData(data); // React won't detect change
  };

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => <button onClick={() => handleDelete(record.id)}>حذف</button>,
    },
  ];

  return <CustomTable<User> dataSource={data} columns={columns} rowKey="id" />;
};

// ✅ GOOD: Create new array
export const GoodImmutableData = () => {
  const [data, setData] = React.useState(sampleData);

  const handleDelete = (id: number) => {
    // ✅ GOOD: Create new array
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => <button onClick={() => handleDelete(record.id)}>حذف</button>,
    },
  ];

  return <CustomTable<User> dataSource={data} columns={columns} rowKey="id" />;
};
