import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { AllUserWithRoles } from "../../../../@types/@allPositionsAndRolesRoleDetail";

const RemoveUsersFromAllRoleContentDrawerTableModel: ColumnsType<AllUserWithRoles> = [
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
    title: "کد ملی",
    dataIndex: "nationalCode",
    key: "nationalCode",
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
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 100,
    className: "tables-sticky-column-left",
    render: () => (
      <div className="table-btns-container">
        {/* //TODO[nima] enable when api got ready */}
        <CustomButton disabled type="link">
          مشاهده پروفایل
        </CustomButton>
      </div>
    ),
  },
];

export default RemoveUsersFromAllRoleContentDrawerTableModel;
