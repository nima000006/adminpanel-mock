import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ManagementUserData } from "@pages/management/EmployeesList/AllEmployeesList/@types/@managementUsersAllEmployeesListTypes";

const OtherRolesTableModel = (): CustomColumnType<ManagementUserData>[] => {
  return [
    {
      title: "سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 130,

      render: (value: string) => (
        <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>
      ),
    },
    {
      title: "کد پرسنلی",
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "branchName",
      key: "branchName",
      width: 290,

      render: (value: string) => (
        <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>
      ),
    },
    {
      title: "نوع استعلام",
      dataIndex: "manuallyCreated",
      key: "manuallyCreated",
      width: 140,
      render: (value: boolean) => {
        return (
          <CustomTag className="management-custom-tag" color={value ? "error" : "blue"}>
            {value ? "دستی" : "سیستمی"}
          </CustomTag>
        );
      },
    },
  ];
};
export default OtherRolesTableModel;
