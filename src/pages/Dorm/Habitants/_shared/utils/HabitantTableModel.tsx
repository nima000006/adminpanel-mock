import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  daysRemaining,
  dormGenderStatusColor,
  dormSchedulingStatusColor,
  dormUserGroupStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";

import { HabitantsListData } from "../../HabitantsList/@types/@habitantsList";

export const HabitntListFirstName = {
  title: "نام",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
  key: "AssociationCustomer_AssociationCustomerUser_firstName",
  width: 120,
  // ...GetServerColumnSearchProps({
  //   dataIndex: "name",
  // }),
};
export const HabitntListLastName = {
  title: "نام خانوادگی",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
  key: "AssociationCustomer_AssociationCustomerUser_lastName",
  width: 120,
};
export const HabitntListGender = {
  title: "جنسیت",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  key: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  width: 100,
  render: (value: number, records: HabitantsListData) => {
    return (
      <CustomTag
        color={
          dormGenderStatusColor[
            records?.AssociationCustomer_AssociationCustomerUser_genderId
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const HabitntListUserGroup = {
  title: "گروه کاربری",
  dataIndex: "AssociationCustomer_AssociationUserGroup_title",
  key: "AssociationCustomer_AssociationUserGroup_title",
  width: 150,
  render: (value: number, records: HabitantsListData) => {
    return (
      <CustomTag
        color={dormUserGroupStatusColor[records?.AssociationCustomer_userGroupID]}
      >
        {value}
      </CustomTag>
    );
  },
};
export const HabitntListStudentNumber = {
  title: "شماره دانشجویی/شماره پرسنلی",
  dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
  key: "AssociationCustomer_AssociationStudent_studentNumber",
  width: 200,
};
export const HabitntListMobileNumber = {
  title: "شماره همراه",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_mobile",
  key: "AssociationCustomer_AssociationCustomerUser_mobile",
  width: 200,
};
export const HabitntListNationalCode = {
  title: "کدملی/اتباع",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  width: 150,
};
export const HabitntListDormitory = {
  title: "اقامتگاه",
  dataIndex: "AssociationBed_AssociationCategoryDormitory_title",
  key: "AssociationBed_AssociationCategoryDormitory_title",
  width: 150,
};
export const HabitntListBuilding = {
  title: "ساختمان",
  dataIndex: "AssociationBed_AssociationCategoryBuliding_title",
  key: "AssociationBed_AssociationCategoryBuliding_title",
  width: 150,
};
export const HabitntListFloor = {
  title: "طبقه",
  dataIndex: "AssociationBed_AssociationCategoryFloor_title",
  key: "AssociationBed_AssociationCategoryFloor_title",
  width: 150,
};
export const HabitntListRoom = {
  title: "اتاق",
  dataIndex: "AssociationBed_AssociationCategorRoom_title",
  key: "AssociationBed_AssociationCategorRoom_title",
  width: 150,
};
export const HabitntListBranch = {
  title: "شعبه / واحد",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  width: 150,
};
export const HabitntListGrade = {
  title: "مقطع تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  key: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  width: 150,
};
export const HabitntListField = {
  title: "رشته تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_fieldTitle",
  key: "AssociationCustomer_AssociationStudent_fieldTitle",
  width: 150,
};
export const HabitntListBed = {
  title: "تخت",
  dataIndex: "AssociationBed_title",
  key: "AssociationBed_title",
  width: 100,
};
export const HabitntListOProvince = {
  title: "استان",
  dataIndex:
    "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
  width: 100,
};
export const HabitntListCity = {
  title: "شهر",
  dataIndex:
    "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
  width: 100,
};
export const HabitntListRemainDays = {
  title: "مانده به پایان اسکان",
  dataIndex: "residenceEndDate",
  key: "residenceEndDate",
  width: 150,
  render: (value: string) => {
    const remainDays = daysRemaining(value);

    const colorGenerator =
      +remainDays >= 7 ? "green" : +remainDays >= 2 && +remainDays < 7 ? "orange" : "red";

    return <CustomTag color={colorGenerator}>{remainDays}</CustomTag>;
  },
};
export const HabitntListYearOfEntry = {
  title: "سال ورود",
  dataIndex: "AssociationCustomer_AssociationStudent_enCode",
  key: "AssociationCustomer_AssociationStudent_enCode",
  width: 150,
  render: (enCode: string) => {
    if (!enCode) return "-";
    const str = enCode.toString();
    const transformed = `1${str.slice(0, -1)}`;
    return transformed;
  },
};
export const HabitntListScheduleingType = {
  title: "نوع زمانبندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  // sorter: true,
  render: (value: number, records: HabitantsListData) => {
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
export const HabitntListStartDate = {
  title: "شروع اسکان",
  dataIndex: "deliveryDate",
  key: "deliveryDate",
  width: 150,
  render: (startOfSettlement: string) => {
    return dataPlaceHolder({
      data: startOfSettlement,
      isDate: true,
      customDateFormat: "HH:mm - YYYY/M/D",
    });
  },
};
export const HabitntListEndDate = {
  title: "پایان اسکان",
  dataIndex: "residenceEndDate",
  key: "residenceEndDate",
  width: 150,
  render: (endOfSettlement: string) => {
    return dataPlaceHolder({
      data: endOfSettlement,
      isDate: true,
      customDateFormat: "HH:mm - YYYY/M/D",
    });
  },
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 150,
  className: "tables-sticky-column-left",
};
