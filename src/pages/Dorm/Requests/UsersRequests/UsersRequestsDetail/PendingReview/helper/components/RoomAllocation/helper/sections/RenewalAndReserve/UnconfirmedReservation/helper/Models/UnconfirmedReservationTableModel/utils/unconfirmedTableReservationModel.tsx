import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import {
  dateTimeCombiner,
  dormGenderStatusColor,
  dormRequestsTypeStatusColor,
  dormReservationTypeStatusColor,
  dormSchedulingStatusColor,
  dormUserGroupStatusColor,
  entryYearSemesterGenerator,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { RoomOtherRequestListType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

export const id = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 130,
};
export const requestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationCategoryRequestType_title",
  key: "AssociationCategoryRequestType_title",
  width: 200,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return (
      <CustomTag color={dormRequestsTypeStatusColor[records?.requestTypeId]}>
        {value}
      </CustomTag>
    );
  },
};
export const firstName = {
  title: "نام",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
  key: "AssociationCustomer_AssociationCustomerUser_firstName",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_firstName;
  },
};
export const lastName = {
  title: "نام خانوادگی",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
  key: "AssociationCustomer_AssociationCustomerUser_lastName",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_lastName;
  },
};
export const gender = {
  title: "جنسیت",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  key: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  width: 100,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
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
export const userGroup = {
  title: "گروه کاربری",
  dataIndex: "AssociationCustomer_AssociationUserGroup_title",
  key: "AssociationCustomer_AssociationUserGroup_title",
  width: 150,
  render: (value: number, records: RoomOtherRequestListType) => {
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
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_studentNumber;
  },
};
export const nationalCode = {
  title: "کدملی / اتباع",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationCustomerUser_nationalCode;
  },
};
export const branchId = {
  title: "واحد دانشگاهی",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title;
  },
};
export const gradeTilte = {
  title: "مقطع تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  key: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_AssociationGrade_title;
  },
};
export const fieldTitle = {
  title: "رشته تحصیلی",
  dataIndex: "AssociationCustomer_AssociationStudent_fieldTitle",
  key: "AssociationCustomer_AssociationStudent_fieldTitle",
  width: 130,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return records.AssociationCustomer_AssociationStudent_fieldTitle;
  },
};
export const enCode = {
  title: "سال ورود",
  dataIndex: "AssociationCustomer_AssociationStudent_enCode",
  key: "AssociationCustomer_AssociationStudent_enCode",
  width: 130,
  return: (value: string) => {
    if (!value) return "-";
    return <>{entryYearSemesterGenerator(value)?.entryYear}</>;
  },
};
// todo[Atefeh]: uncomment when api got ready
// {
//   title: "ترم",
//   dataIndex: "term",
//   key: "term",
//   width: 130,
// },
export const schedulingType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormSchedulingStatusColor[
            records?.AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_id
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const reservationType = {
  title: "نوع رزرو",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  width: 150,
  render: (value: number, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormReservationTypeStatusColor[
            records?.AssociationCategoryDeliverPlan_AssociationCategoryReservationType_id
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const createDateReq = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return <>{dateTimeCombiner(value, records?.createTime)}</>;
  },
};
export const updateDate = {
  title: "تاریخ آخرین تغییر",
  dataIndex: "updateDate",
  key: "updateDate",
  width: 150,
  render: (value: string, records: RoomOtherRequestListType) => {
    if (!value) return "-";
    return <>{dateTimeCombiner(value, records?.updateTime)}</>;
  },
};
export const createDateWait = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => {
    if (!value) return "-";
    return <CustomTagWithDiffDays value={value} />;
  },
};
//todo[Atefeh]: delete if not needed in the future
// {
//   title: "",
//   dataIndex: "id",
//   key: "id",
//   fixed: "right" as FixedType,
//   width: 225,
//   className: "tables-sticky-column-left",
//   render: (value: number, records: RoomOtherRequestListType) => {
//     return (
//       <div className="table-action-btn-container">
//         <Link
//           to={{
//             pathname: DORM_USERS_REQUESTS_DETAIL_PENDING_REVIEW_PAGE_ROUTE,
//             search: makeSearchParams({
//               resetTab: true,
//               id: value,
//               requestType: records?.requestTypeId,
//               reservationTypeId:
//                 records?.AssociationCategoryDeliverPlan_AssociationCategoryReservationType_id,
//               tariffId: records?.AssociationCategoryDeliverPlan_priceListId,
//               admissionId: records?.deliverPlanId,
//               residenceTitle:
//                 records?.AssociationBed_AssociationCategoryDormitory_title,
//               userNationalCode:
//                 records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
//             }),
//           }}
//           className="text-link"
//         >
//           مشاهده
//         </Link>
//         <CustomButton
//           type="text"
//           className="text-link"
//           onClick={() => openThisRoomAllocationHandler(value)}
//         >
//           تخصیص این اتاق
//         </CustomButton>
//       </div>
//     );
//   },
// },
