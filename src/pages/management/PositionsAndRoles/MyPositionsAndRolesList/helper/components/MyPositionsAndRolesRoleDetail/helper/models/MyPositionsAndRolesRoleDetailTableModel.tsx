import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { MyUserWithRoles } from "../../@types/@myPositionsAndRolesRoleDetail";

const MyPositionsAndRolesRoleDetailTableModel = (): ColumnsType<MyUserWithRoles> => [
  {
    title: "",
    dataIndex: "checkbox",
    key: "checkbox",
    width: 50,
  },
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 150,
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شماره همراه",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    width: 150,
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "کد ملی",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 150,
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "کد پرسنلی",
    dataIndex: "employeeCode",
    key: "employeeCode",
    width: 150,
    render: (_: unknown, record: MyUserWithRoles) =>
      dataPlaceHolder({ data: record.staff?.map((s) => s.employeeCode).join(", ") }),
  },
  {
    title: "واحد دانشگاهی",
    dataIndex: "branchName",
    key: "branchName",
    width: 150,
    render: (_: unknown, record: MyUserWithRoles) =>
      dataPlaceHolder({ data: record.staff?.map((s) => s.branchName).join(", ") }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 100,
    className: "tables-sticky-column-left",
    render: () => {
      return (
        <div className="table-btns-container">
          {/* //TODO[nima] enable when api got ready */}
          <CustomButton disabled type="link">
            مشاهده پروفایل
          </CustomButton>
        </div>
      );
    },
  },
];

export default MyPositionsAndRolesRoleDetailTableModel;
