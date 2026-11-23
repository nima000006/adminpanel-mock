import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { RoleType } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementUsersAllStaffInfo";

const AllRoleRequestDetailConfirmedTableModel: CustomColumnType<RoleType>[] = [
  {
    title: "نام سرویس",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 250,
    render: function (value: string) {
      return (
        <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
      );
    },
  },
  //Todo[Atefeh]:uncomment when api got ready
  // {
  //   title: "گروه نقش",
  //   dataIndex: "roleGroup",
  //   key: "roleGroup",
  //   width: 130,
  //   render: (value: string) => {
  //     return <CustomTag>{value}</CustomTag>;
  //   },
  // },
  {
    title: "نقش تخصیص داده شده",
    dataIndex: "title",
    key: "title",
    width: 130,
    render: (value: string) => {
      return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
    },
  },
];

export default AllRoleRequestDetailConfirmedTableModel;
