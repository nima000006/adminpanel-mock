/**
 * CustomTable Usage Examples
 *
 * This file demonstrates various usage patterns for CustomTable component.
 *
 * NOTE: This file contains example/demo code with intentional unused variables
 * and simplified implementations. It's meant for documentation purposes only.
 *
 * @eslint-disable - This is a documentation file
 */

/* eslint-disable */

import { useState } from "react";
import CustomTable, {
  CustomColumnType,
} from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

// =============================================================================
// Example 1: Basic Usage (Drop-in Replacement)
// =============================================================================

export const BasicExample = () => {
  const dataSource = [
    { id: 1, name: "علی احمدی", age: 25, address: "تهران" },
    { id: 2, name: "مریم رضایی", age: 30, address: "اصفهان" },
  ];

  const columns = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "سن", dataIndex: "age", key: "age" },
    { title: "آدرس", dataIndex: "address", key: "address" },
  ];

  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      pagination={paginationConfig}
      {...TABLE_PROPS(dataSource?.length)}
    />
  );
};

// =============================================================================
// Example 2: Hidden Columns (New Feature!)
// =============================================================================

export const HiddenColumnsExample = () => {
  const [showAge, setShowAge] = useState(false);

  const dataSource = [
    { id: 1, name: "علی احمدی", age: 25, salary: 5000000 },
    { id: 2, name: "مریم رضایی", age: 30, salary: 7000000 },
  ];

  const columns = [
    { title: "نام", dataIndex: "name", key: "name" },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
      hidden: !showAge, // ✨ Hide column conditionally
    },
    {
      title: "حقوق",
      dataIndex: "salary",
      key: "salary",
      hidden: true, // ✨ Always hidden
    },
  ];

  return (
    <div>
      <button onClick={() => setShowAge(!showAge)}>
        {showAge ? "مخفی کردن سن" : "نمایش سن"}
      </button>
      <CustomTable dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};

// =============================================================================
// Example 3: With Loading State
// =============================================================================

export const LoadingExample = () => {
  const [loading] = useState(true);
  const [data] = useState<any>([]);

  // Simulate API call
  // const fetchData = async () => {
  //   setLoading(true);
  //   // await api.getData()
  //   setTimeout(() => {
  //     setData([
  //       { id: 1, name: "علی احمدی" },
  //       { id: 2, name: "مریم رضایی" },
  //     ]);
  //     setLoading(false);
  //   }, 2000);
  // };

  const columns = [{ title: "نام", dataIndex: "name" }];

  return (
    <CustomTable dataSource={data} columns={columns} loading={loading} rowKey="id" />
  );
};

// =============================================================================
// Example 4: Server-Side Pagination
// =============================================================================

export const ServerPaginationExample = () => {
  const [data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    // const response = await api.getData({ page: currentPage, pageSize: currentPageSize });
    // setData(response.data);
    // setTotal(response.total);
    setLoading(false);
  };

  const columns = [
    { title: "نام", dataIndex: "name" },
    { title: "سن", dataIndex: "age" },
  ];

  return (
    <CustomTable
      dataSource={data}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={{
        total: total,
        current: page,
        pageSize: pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["8", "10", "25", "50", "100"],
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
          fetchData();
        },
      }}
    />
  );
};

// =============================================================================
// Example 5: Row Selection
// =============================================================================

export const RowSelectionExample = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dataSource = [
    { id: 1, name: "علی احمدی", age: 25 },
    { id: 2, name: "مریم رضایی", age: 30 },
    { id: 3, name: "حسن محمدی", age: 28 },
  ];

  const columns = [
    { title: "نام", dataIndex: "name" },
    { title: "سن", dataIndex: "age" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>تعداد انتخاب شده: {selectedRowKeys.length}</div>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (keys, rows) => {
            console.log("Selected keys:", keys);
            console.log("Selected rows:", rows);
            setSelectedRowKeys(keys);
          },
        }}
      />
    </div>
  );
};

// =============================================================================
// Example 6: Custom Empty State
// =============================================================================

export const CustomEmptyExample = () => {
  const columns = [
    { title: "نام", dataIndex: "name" },
    { title: "سن", dataIndex: "age" },
  ];

  return (
    <CustomTable
      dataSource={[]}
      columns={columns}
      rowKey="id"
      emptyDescription="هیچ رکوردی یافت نشد!" // ✨ Custom empty message
    />
  );
};

// =============================================================================
// Example 7: With Scroll (Fixed Header)
// =============================================================================

export const ScrollExample = () => {
  const dataSource = Array.from({ length: 1000 }).map((_, i) => ({
    id: i,
    name: `نام ${i}`,
    age: 20 + (i % 50),
    address: `آدرس ${i}`,
  }));

  const columns = [
    { title: "نام", dataIndex: "name", width: 150, fixed: "right" },
    { title: "سن", dataIndex: "age", width: 100 },
    { title: "آدرس", dataIndex: "address", width: 200 },
    { title: "توضیحات", dataIndex: "desc", width: 300 },
    { title: "عملیات", dataIndex: "action", width: 150, fixed: "left" },
  ];

  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns as any}
      rowKey="id"
      scroll={{ y: 400, x: 1000 }}
      pagination={{ pageSize: 20, placement: ["bottomStart"] }}
    />
  );
};

// =============================================================================
// Example 8: Responsive Columns (Hide on Mobile)
// =============================================================================

export const ResponsiveExample = () => {
  const isMobile = window.innerWidth < 768;

  const dataSource = [
    { id: 1, name: "علی احمدی", age: 25, email: "ali@example.com", phone: "09123456789" },
    {
      id: 2,
      name: "مریم رضایی",
      age: 30,
      email: "maryam@example.com",
      phone: "09987654321",
    },
  ];

  const columns = [
    { title: "نام", dataIndex: "name" },
    { title: "سن", dataIndex: "age", hidden: isMobile, searchable: true }, // ✨ Hide on mobile
    { title: "ایمیل", dataIndex: "email", hidden: isMobile }, // ✨ Hide on mobile
    { title: "تلفن", dataIndex: "phone" },
  ];

  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

// =============================================================================
// Example 9: With Expandable Rows
// =============================================================================

export const ExpandableExample = () => {
  const dataSource = [
    { id: 1, name: "علی احمدی", description: "توضیحات کامل درباره علی احمدی" },
    { id: 2, name: "مریم رضایی", description: "توضیحات کامل درباره مریم رضایی" },
  ];

  const columns = [{ title: "نام", dataIndex: "name" }];

  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
      }}
    />
  );
};

// =============================================================================
// Example 10: Real-World Example (From Your Codebase Pattern)
// =============================================================================

interface Vendor {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  isDeleted: boolean;
}

export const RealWorldExample = () => {
  const [dataSource] = useState<Vendor[]>([]);
  const [loading] = useState(false);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);

  const columns = [
    {
      title: "نام تامین کننده",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "نام مسئول",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "تلفن",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "وضعیت",
      key: "status",
      hidden: !isDeletedEnabled, // ✨ Show only when viewing deleted items
      render: (_: any, record: any) => (
        <span>{record.isDeleted ? "حذف شده" : "فعال"}</span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setIsDeletedEnabled(!isDeletedEnabled)}>
          {isDeletedEnabled ? "نمایش فعلی" : "نمایش حذف شده ها"}
        </button>
      </div>

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        columns={columns}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        className="vendor-list-table"
      />
    </div>
  );
};

// =============================================================================
// TypeScript Examples
// =============================================================================

// Define your data type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
}

export const TypeScriptExample = () => {
  const users: User[] = [
    {
      id: 1,
      firstName: "علی",
      lastName: "احمدی",
      email: "ali@example.com",
      role: "admin",
    },
    {
      id: 2,
      firstName: "مریم",
      lastName: "رضایی",
      email: "maryam@example.com",
      role: "user",
    },
  ];

  // Fully typed columns
  const columns: CustomColumnType<User>[] = [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "نقش",
      dataIndex: "role",
      key: "role",
      render: (role: User["role"]) => <span>{role === "admin" ? "مدیر" : "کاربر"}</span>,
    },
  ];

  return (
    <CustomTable<User>
      dataSource={users}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
};

export const AllTableExamples = () => {
  return (
    <div className="flex flex-col gap-2">
      <BasicExample />
      <HiddenColumnsExample />
      <TypeScriptExample />
      <RealWorldExample />
      <ScrollExample />
      <RowSelectionExample />
      <ServerPaginationExample />
      <LoadingExample />
      <ExpandableExample />
      <ResponsiveExample />
    </div>
  );
};
