import {
  gender,
  userGroup,
  branch,
  grade,
  fieldTitle,
  enCodeYear,
  enCodeTerm,
  deliverPlan,
  schedulingType,
  residenceStartDate,
  residenceEndDate,
} from "./utils/usersRequestsDetailResidentsRoomTableModel";

const UsersRequestsDetailRoomResidentsTableModel = () => {
  return [
    {
      title: "نام",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
      key: "AssociationCustomer_AssociationCustomerUser_firstName",
      width: 130,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
      key: "AssociationCustomer_AssociationCustomerUser_lastName",
      width: 130,
    },
    gender,
    userGroup,
    {
      title: "شماره دانشجویی / شماره پرسنلی",
      dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
      key: "AssociationCustomer_AssociationStudent_studentNumber",
      width: 200,
    },
    {
      title: "کدملی / اتباع",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      width: 130,
    },
    branch,
    grade,
    fieldTitle,
    enCodeYear,
    enCodeTerm,
    deliverPlan,
    schedulingType,
    residenceStartDate,
    residenceEndDate,
  ];
};

export default UsersRequestsDetailRoomResidentsTableModel;
