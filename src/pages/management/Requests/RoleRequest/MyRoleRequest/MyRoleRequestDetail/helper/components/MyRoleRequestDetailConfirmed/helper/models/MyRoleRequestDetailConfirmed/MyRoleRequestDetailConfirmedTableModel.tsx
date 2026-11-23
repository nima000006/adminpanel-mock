import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { RoleType } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementUsersMyStaffInfo";

const MyRoleRequestDetailConfirmedTableModel: CustomColumnType<RoleType>[] = [
  {
    title: "نام سرویس",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 250,
    render: (value: string) => {
      return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
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

export default MyRoleRequestDetailConfirmedTableModel;
