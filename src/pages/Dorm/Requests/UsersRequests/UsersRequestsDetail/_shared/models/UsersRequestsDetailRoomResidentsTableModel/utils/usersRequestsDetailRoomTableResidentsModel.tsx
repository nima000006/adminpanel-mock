import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  dormGenderStatusColor,
  dormSchedulingStatusColor,
  dormUserGroupStatusColor,
  entryYearSemesterGenerator,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { HabitantsRoomData } from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/@types/@secondTabRoomInfo";

export const firstName = {
  title: "نام",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
  key: "AssociationCustomer_AssociationCustomerUser_firstName",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_firstName;
  },
};
export const lastName = {
  title: "نام خانوادگی",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
  key: "AssociationCustomer_AssociationCustomerUser_lastName",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_lastName;
  },
};
export const gender = {
  title: "جنسیت",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  key: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  width: 100,
  render: (value: number, records: HabitantsRoomData) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormGenderStatusColor[
            records?.AssociationCustomer_AssociationCustomerUser_AssociationGender_id
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const userGroup = {
  title: "گروه کاربری",
  dataIndex: "AssociationCustomer_AssociationUserGroup_title",
  key: "AssociationCustomer_AssociationUserGroup_title",
  width: 150,
  render: (value: number, records: HabitantsRoomData) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormUserGroupStatusColor[records?.AssociationCustomer_AssociationUserGroup_id]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const studentNumber = {
  title: "شماره دانشجویی / شماره پرسنلی",
  dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
  key: "AssociationCustomer_AssociationStudent_studentNumber",
  width: 200,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_studentNumber;
  },
};
export const nationalCode = {
  title: "کدملی / اتباع",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_nationalCode;
  },
};
export const branchId = {
  title: "واحد دانشگاهی",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title;
  },
};
export const grade = {
  title: "مقطع تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  key: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_AssociationGrade_title;
  },
};
export const fieldTitle = {
  title: "رشته تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_fieldTitle",
  key: "AssociationCustomer_AssociationStudent_fieldTitle",
  width: 130,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_fieldTitle;
  },
};
export const enCodeYear = {
  title: "سال ورود",
  dataIndex: "AssociationCustomer_AssociationStudent_enCode",
  key: "AssociationCustomer_AssociationStudent_enCode",
  width: 130,
  render: (value: string) => {
    if (!value) return "-";
    return <>{entryYearSemesterGenerator(value)?.entryYear}</>;
  },
};
export const enCodeTerm = {
  title: "ترم",
  dataIndex: "AssociationCustomer_AssociationStudent_enCode",
  key: "AssociationCustomer_AssociationStudent_enCode",
  width: 130,
  render: (value: string) => {
    if (!value) return "-";
    return <>{entryYearSemesterGenerator(value)?.entrySemester}</>;
  },
};
export const categoryDeliverPlan = {
  title: "برنامه پذیرش",
  dataIndex: "AssociationCategoryDeliverPlan_title",
  key: "AssociationCategoryDeliverPlan_title",
  width: 300,
  render: (value: string, records: HabitantsRoomData) => {
    if (!value) return "-";
    return records.AssociationCategoryDeliverPlan_title;
  },
};
export const categorySchedulingType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  render: (value: number, records: HabitantsRoomData) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormSchedulingStatusColor[records?.AssociationCategoryDeliverPlan_schedulingId]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const deliveryDate = {
  title: "شروع اسکان",
  dataIndex: "deliveryDate",
  key: "deliveryDate",
  width: 150,
  render: (value: string) => {
    if (!value) return "-";
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm ,YYYY/MM/DD",
        })}
      </>
    );
  },
};
export const residenceEndDate = {
  title: "پایان اسکان",
  dataIndex: "residenceEndDate",
  key: "residenceEndDate",
  width: 150,
  render: (value: string) => {
    if (!value) return "-";
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm ,YYYY/MM/DD",
        })}
      </>
    );
  },
};
