export const BusinessStaffModel = () => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 30,
  },
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 100,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 120,
  },
  {
    title: "نام کاربری",
    dataIndex: "userName",
    key: "userName",
    width: "15%",
  },
  {
    title: "رمز عبور",
    dataIndex: "pass",
    key: "pass",
    width: 100,
  },
  {
    title: "پوزیشن",
    dataIndex: "position",
    key: "position",
    width: 100,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 120,
  },
  {
    title: "",
    dataIndex: "grade",
    key: "grade",
    width: 100,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: () => {
      return (
        <div className="operation-business-structure-wrapper">
          <span className="change-btn">تغییر</span>
          <span className="delete-btn">حذف</span>
        </div>
      );
    },
  },
];
