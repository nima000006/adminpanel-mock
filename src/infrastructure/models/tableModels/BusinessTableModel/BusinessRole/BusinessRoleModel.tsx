export const BusinessRoleModel = () => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 30,
  },
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
  },
  {
    title: "توضیحات",
    dataIndex: "description",
    key: "description",
    width: 100,
  },
  {
    title: "محصول",
    dataIndex: "product",
    key: "product",
    width: 100,
  },
  {
    title: "دسترسی ها",
    dataIndex: "access",
    key: "access",
    width: 130,
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
