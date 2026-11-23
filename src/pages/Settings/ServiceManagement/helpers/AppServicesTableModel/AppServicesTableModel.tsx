import { BranchActiveServicesRecordType } from "@pages/Settings/ServiceManagement/@types/@servicesManagement";

const AppServicesTableModel = [
  {
    title: "شناسه",
    dataIndex: "id",
    key: "id",
    width: 80,
    render: (_: unknown, record: BranchActiveServicesRecordType) => {
      return record?.branchId;
    },
  },
  {
    title: "شناسه دانشگاهی",
    dataIndex: "branchId",
    key: "branchId",
    width: 130,
  },
  // {
  //   title: "نام واحد دانشگاهی",
  //   dataIndex: "branchBranchName",
  //   key: "branchBranchName",
  //   width: 130,
  // },
];

export default AppServicesTableModel;
