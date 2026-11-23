import { Button } from "antd";

const PermissionManagementRolesModel = () => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 120,
    },
    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: 150,
    },
    {
      title: "محصول",
      dataIndex: "product",
      key: "product",
      width: 150,
    },
    {
      title: "دسترسی‌ها",
      dataIndex: "permissions",
      key: "permissions",
      width: 120,
    },
    {
      title: "",
      dataIndex: "grade",
      key: "grade",
      width: 170,
      className: "tables-sticky-column-left",
      fixed: "right",
      render: () => {
        return (
          <div className="table-btns-container">
            <Button className="change-btn" type="primary">
              تغییر
            </Button>
            <Button className="delete-btn" danger>
              حذف
            </Button>
          </div>
        );
      },
    },
  ];
};

export default PermissionManagementRolesModel;
