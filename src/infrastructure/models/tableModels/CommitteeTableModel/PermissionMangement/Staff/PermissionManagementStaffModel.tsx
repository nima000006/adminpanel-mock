import { Button, Input } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PermissionManagementStaffModel = () => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 120,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 150,
    },
    {
      title: "نام کاربری",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "رمز عبور",
      dataIndex: "pass",
      key: "pass",
      width: 180,
      render: (value: string) => {
        return (
          <Input.Password
            placeholder="رمز عبور"
            size="large"
            value={value}
            iconRender={(visible) =>
              visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
            }
          />
        );
      },
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

export default PermissionManagementStaffModel;
// as FixedType | undefined
