import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { entryYearSemesterGenerator } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  HabitntListBranch,
  HabitntListEndDate,
  HabitntListField,
  HabitntListGender,
  HabitntListGrade,
  HabitntListScheduleingType,
  HabitntListStartDate,
  HabitntListUserGroup,
} from "@pages/Dorm/Habitants/_shared/utils/HabitantTableModel";

const DormHabitantsRoomTableModel = () => [
  {
    title: "نام",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
    key: "AssociationCustomer_AssociationCustomerUser_firstName",
    width: 120,
    ...GetServerColumnSearchProps({
      dataIndex: "name",
      label: "نام",
      type: "text",
      pageName: "habitantRoomPage",
      pageSizeName: "habitantRoomPageSize",
    }),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
    key: "AssociationCustomer_AssociationCustomerUser_lastName",
    width: 120,
    ...GetServerColumnSearchProps({
      dataIndex: "lastName",
      label: "نام خانوادگی",
      type: "text",
      pageName: "habitantRoomPage",
      pageSizeName: "habitantRoomPageSize",
    }),
  },
  HabitntListGender,
  HabitntListUserGroup,
  {
    title: "شماره دانشجویی/شماره پرسنلی",
    dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
    key: "AssociationCustomer_AssociationStudent_studentNumber",
    width: 200,
    ...GetServerColumnSearchProps({
      dataIndex: "studentNumber",
      label: "شماره دانشجویی/شماره پرسنلی",
      type: "text",
      pageName: "habitantRoomPage",
      pageSizeName: "habitantRoomPageSize",
    }),
  },
  {
    title: "کدملی/اتباع",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
    key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "nationalCode",
      label: "کدملی/اتباع",
      type: "text",
      pageName: "habitantRoomPage",
      pageSizeName: "habitantRoomPageSize",
    }),
  },
  HabitntListBranch,
  HabitntListGrade,
  HabitntListField,

  {
    title: "سال ورود",
    dataIndex: "AssociationCustomer_AssociationStudent_enCode",
    key: "AssociationCustomer_AssociationStudent_enCode",
    width: 130,
    render: (value: string) => {
      return <>{entryYearSemesterGenerator(value)?.entryYear}</>;
    },
  },
  {
    title: "ترم",
    dataIndex: "AssociationCustomer_AssociationStudent_enCode",
    key: "AssociationCustomer_AssociationStudent_enCode",
    width: 130,
    render: (value: string) => {
      return <>{entryYearSemesterGenerator(value)?.entrySemester}</>;
    },
  },
  {
    title: "برنامه پذیرش",
    dataIndex: "AssociationCategoryDeliverPlan_title",
    key: "AssociationCategoryDeliverPlan_title",
    width: 200,
  },
  HabitntListScheduleingType,
  HabitntListStartDate,
  HabitntListEndDate,
];

export default DormHabitantsRoomTableModel;
