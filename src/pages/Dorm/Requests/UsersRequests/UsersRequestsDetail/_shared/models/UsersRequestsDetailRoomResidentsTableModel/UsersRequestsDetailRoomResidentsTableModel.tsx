import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { entryYearSemesterGenerator } from "@pages/Dorm/_shared/utils/DormUtils";
import { HabitantsRoomData } from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/@types/@secondTabRoomInfo";

import {
  gender,
  userGroup,
  grade,
  fieldTitle,
  enCodeYear,
  categoryDeliverPlan,
  categorySchedulingType,
  deliveryDate,
  residenceEndDate,
} from "./utils/usersRequestsDetailRoomTableResidentsModel";

const UsersRequestsDetailRoomResidentsTableModel = () => {
  return [
    {
      title: "نام",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
      key: "AssociationCustomer_AssociationCustomerUser_firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نام",
        type: "text",
      }),
      render: (value: string, records: HabitantsRoomData) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationCustomerUser_firstName;
      },
    },
    {
      title: "نام خانوادگی",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
      key: "AssociationCustomer_AssociationCustomerUser_lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value: string, records: HabitantsRoomData) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationCustomerUser_lastName;
      },
    },
    gender,
    userGroup,
    {
      title: "شماره دانشجویی / شماره پرسنلی",
      dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
      key: "AssociationCustomer_AssociationStudent_studentNumber",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "studentNumber",
        label: "شماره دانشجویی / شماره پرسنلی",
        type: "text",
      }),
      render: (value: string, records: HabitantsRoomData) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationStudent_studentNumber;
      },
    },
    {
      title: "کدملی / اتباع",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalCode",
        label: "کدملی / اتباع",
        type: "text",
      }),
      render: (value: string, records: HabitantsRoomData) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationCustomerUser_nationalCode;
      },
    },
    {
      title: "شعبه / واحد",
      dataIndex:
        "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
      key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
      width: 130,
      render: (value: string, records: HabitantsRoomData) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title;
      },
    },
    grade,
    fieldTitle,
    enCodeYear,
    {
      title: "نیمسال",
      dataIndex: "AssociationCustomer_AssociationStudent_enCode",
      key: "AssociationCustomer_AssociationStudent_enCode",
      width: 130,
      render: (value: string) => {
        if (!value) return "-";
        return <>{entryYearSemesterGenerator(value)?.entrySemester}</>;
      },
    },
    categoryDeliverPlan,
    categorySchedulingType,
    deliveryDate,
    residenceEndDate,
  ];
};

export default UsersRequestsDetailRoomResidentsTableModel;
