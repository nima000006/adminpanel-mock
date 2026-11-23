/**
 * CustomTable Usage Examples
 *
 * This file demonstrates various ways to use the CustomTable component.
 * Copy and modify these examples for your specific use case.
 */

import React, { useState, useEffect } from "react";

import { Tag, Button, Space } from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import CustomTable, { CustomColumnType } from "../CustomTable";

// =============================================================================
// Sample Data Types
// =============================================================================
interface User {
  id: number;
  name: string;
  age: number;
  status: "active" | "inactive";
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "علی محمدی", age: 25, status: "active", email: "ali@example.com" },
  { id: 2, name: "سارا احمدی", age: 30, status: "inactive", email: "sara@example.com" },
  { id: 3, name: "رضا کریمی", age: 28, status: "active", email: "reza@example.com" },
  { id: 4, name: "مریم حسینی", age: 35, status: "active", email: "maryam@example.com" },
  {
    id: 5,
    name: "محمد رضایی",
    age: 22,
    status: "inactive",
    email: "mohammad@example.com",
  },
  { id: 6, name: "علی محمدی", age: 25, status: "active", email: "ali@example.com" },
  { id: 7, name: "سارا احمدی", age: 30, status: "inactive", email: "sara@example.com" },
  { id: 8, name: "رضا کریمی", age: 28, status: "active", email: "reza@example.com" },
  { id: 9, name: "مریم حسینی", age: 35, status: "active", email: "maryam@example.com" },
  {
    id: 10,
    name: "محمد رضایی",
    age: 22,
    status: "inactive",
    email: "mohammad@example.com",
  },
  { id: 11, name: "علی محمدی", age: 25, status: "active", email: "ali@example.com" },
  { id: 12, name: "سارا احمدی", age: 30, status: "inactive", email: "sara@example.com" },
  { id: 13, name: "رضا کریمی", age: 28, status: "active", email: "reza@example.com" },
  { id: 14, name: "مریم حسینی", age: 35, status: "active", email: "maryam@example.com" },
  {
    id: 15,
    name: "محمد رضایی",
    age: 22,
    status: "inactive",
    email: "mohammad@example.com",
  },
];

// =============================================================================
// ✅ EXAMPLE 1: Basic Usage
// =============================================================================
export const BasicExample = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    { title: "ایمیل", dataIndex: "email", key: "email" },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "فعال" : "غیرفعال"}
        </Tag>
      ),
    },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ✅ EXAMPLE 2: With Loading State
// =============================================================================
export const WithLoadingExample = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 2000);
  }, []);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
  ];

  return (
    <CustomTable<User>
      dataSource={data}
      columns={columns}
      loading={loading}
      rowKey="id"
    />
  );
};

// =============================================================================
// ✅ EXAMPLE 3: Server-Side Pagination
// =============================================================================
export const ServerPaginationExample = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
    total: 0,
  });

  const fetchData = (page: number, pageSize: number) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.warn(`[Example] Fetching page ${page} with pageSize ${pageSize}`);
      setData(sampleData); // In real app, this would be API response
      setPagination({ page, pageSize, total: sampleData.length }); // simulated total
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize);
  }, []);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    { title: "ایمیل", dataIndex: "email", key: "email" },
  ];

  return (
    <div className="mb-10">
      EXAMPLE
      <CustomTable<User>
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
        // New simplified pagination props
        total={pagination.total}
        pageNumber={pagination.page}
        pageSize={pagination.pageSize}
        onPageChange={(page, pageSize) => {
          fetchData(page, pageSize);
        }}
      />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 4: With Row Selection
// =============================================================================
export const WithSelectionExample = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    { title: "ایمیل", dataIndex: "email", key: "email" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>انتخاب شده: {selectedKeys.length} مورد</span>
        {selectedKeys.length > 0 && (
          <Button onClick={() => setSelectedKeys([])} style={{ marginRight: 8 }}>
            پاک کردن انتخاب
          </Button>
        )}
      </div>
      <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 5: With Actions Column
// =============================================================================
export const WithActionsExample = () => {
  const handleEdit = (record: User) => {
    // In real app, this would open edit modal/page
    console.warn("[Example] Edit:", record);
  };

  const handleDelete = (record: User) => {
    // In real app, this would show confirmation and call API
    console.warn("[Example] Delete:", record);
  };

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    {
      title: "عملیات",
      key: "actions",
      fixed: "left", // Fixed to left for RTL
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<AiOutlineEdit />} onClick={() => handleEdit(record)}>
            ویرایش
          </Button>
          <Button
            type="link"
            danger
            icon={<AiOutlineDelete />}
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ✅ EXAMPLE 6: Hidden Columns
// =============================================================================
export const HiddenColumnsExample = () => {
  const [showEmail, setShowEmail] = useState(true);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    { title: "ایمیل", dataIndex: "email", key: "email", hidden: !showEmail },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "فعال" : "غیرفعال"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => setShowEmail(!showEmail)}>
          {showEmail ? "مخفی کردن ایمیل" : "نمایش ایمیل"}
        </Button>
      </div>
      <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 7: With Total Count
// =============================================================================
export const WithTotalExample = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ✅ EXAMPLE 8: No Pagination
// =============================================================================
export const NoPaginationExample = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
  ];

  return (
    <CustomTable<User>
      dataSource={sampleData}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

// =============================================================================
// ✅ EXAMPLE 9: Custom Empty State
// =============================================================================
export const CustomEmptyExample = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
  ];

  return (
    <CustomTable<User>
      dataSource={[]}
      columns={columns}
      rowKey="id"
      emptyDescription="هیچ کاربری یافت نشد"
    />
  );
};

// =============================================================================
// ✅ EXAMPLE 10: Searchable Columns
// =============================================================================
export const SearchableColumnsExample = () => {
  const columns: CustomColumnType<User>[] = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      searchable: true, // ✨ Enables built-in client-side search
    },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
      searchable: true,
    },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ✅ EXAMPLE 11: With Sorting
// =============================================================================
export const WithSortingExample = () => {
  const columns: CustomColumnType<User>[] = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      defaultSortOrder: "descend",
    },
    { title: "ایمیل", dataIndex: "email", key: "email" },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};

// =============================================================================
// ✅ EXAMPLE 11: Radio Selection
// =============================================================================
export const RadioSelectionExample = () => {
  // const [selectedKey, setSelectedKey] = useState<React.Key[]>([]);

  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>انتخاب شده: {"هیچکدام"}</div>
      <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />
    </div>
  );
};

// =============================================================================
// ✅ EXAMPLE 12: Conditional Checkbox (Disable some rows)
// =============================================================================
export const ConditionalSelectionExample = () => {
  const columns: CustomColumnType<User>[] = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "وضعیت", dataIndex: "status", key: "status" },
  ];

  return <CustomTable<User> dataSource={sampleData} columns={columns} rowKey="id" />;
};
