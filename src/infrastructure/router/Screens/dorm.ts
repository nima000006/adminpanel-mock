import { lazy } from "react";

import {
  DORM_ADMISSIONS_DETAIL_ACTIVE_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_INACTIVE_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_RETURNED_PAGE_ROUTE,
  DORM_ADMISSIONS_LIST_PAGE_ROUTE,
  DORM_ADMISSIONS_MODIFY_PAGE_ROUTE,
  DORM_HABITANTS_DETAIL_PAGE_ROUTE,
  DORM_HABITANTS_LIST_PAGE_ROUTE,
  DORM_LIST_DETAIL_PAGE_ROUTE,
  DORM_LIST_PAGE_ROUTE,
  DORM_REPORTS_CREATORS_DETAIL_PAGE_ROUTE,
  DORM_REPORTS_DEBTORS_DETAIL_PAGE_ROUTE,
  DORM_REPORTS_LIST_PAGE_ROUTE,
  DORM_REPORTS_SETTLED_DETAIL_PAGE_ROUTE,
  DORM_TARIFF_MODIFY_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_ACTIVE_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_INACTIVE_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_REJECTED_PAGE_ROUTE,
  DORM_TARIFFS_LIST_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_REVIEW_PAGE_ROUTE,
  DORM_USERS_REQUESTS_LIST_PAGE_ROUTE,
  DORM_USERS_REQUESTS_MANUAL_REGISTRATION_PAGE_ROUTE,
  DORM_BASIC_INFO_LIST_PAGE_ROUTE,
  DORM_BASIC_INFO_ROOM_TYPES_PAGE_ROUTE,
  DORM_MODIFY_Building_PAGE_ROUTE,
  DORM_MODIFY_RESIDENCE_PAGE_ROUTE,
  DORM_BASIC_INFO_BED_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_GENDER_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_QUALITY_GRADE_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_RESERVE_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_MANAGEMENT_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_FORM_STATUS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_SPECIAL_CONDITIONS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_SCHEDULE_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_REQUEST_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_USER_GROUP_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_PRESENCE_ABSENCE_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_FEEDBACK_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_RESIDENCE_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_PAYMENT_METHOD_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_PAYMENT_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_RELATION_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_BED_STATUS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_AVAILABLE_STATUS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_ASSIGNMENT_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_RULES_AND_REGULATIONS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_DORM_NEAR_BY_PLACES_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_SUBSETS_RULES_AND_REGULATIONS_TYPES_PAGE_ROUTE,
  DORM_BASIC_INFO_FACILITIES_TYPES_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_PAYMENT_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_DELIVERED_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_CANCELLATION_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE,
  DORM_WORK_SPACES_LIST_PAGE_ROUTE,
  DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_ADMISSION_PROGRAM_PAGE_ROUTE,
  DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_TARIFF_PAGE_ROUTE,
  DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_DORMITORY_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE,
  DORM_MODIFY_FLOOR_PAGE_ROUTE,
  DORM_MODIFY_ROOM_PAGE_ROUTE,
  DORM_MODIFY_BED_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_RETURNED_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_REJECTED_PAGE_ROUTE,
  DORM_REQUESTS_LIST_DETAIL_PAGE_ROUTE,
  DORM_BASIC_INFO_SEMESTER_TYPES_PAGE_ROUTE,
  DORM_HABITANTS_EVACUATION_PAGE_ROUTE,
} from "../routes/dorm";

//! FILES
const DormsList = lazy(
  () => import("../../../pages/Dorm/Residence/DormsMainList/DormsMainList")
);
const DormsListDetail = lazy(
  () => import("../../../pages/Dorm/Residence/DormsMainDetail/DormsDetail/DormsDetail")
);
const DormsRequestsListDetail = lazy(
  () =>
    import("../../../pages/Dorm/Residence/DormsMainDetail/DormsRequestDetail/DormsRequestDetail")
);
const DormsTariffsList = lazy(
  () => import("../../../pages/Dorm/Planning/Tariff/TariffList/TariffListPage/TariffList")
);
const DormsAdmissionList = lazy(
  () => import("../../../pages/Dorm/Planning/Admission/AdmissionList/AdmissionList")
);
const DormsAdmissionDetailActive = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/AdmissionDetailActive")
);
const DormsAdmissionDetailInactive = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailInactive/AdmissionDetailInactive")
);
const DormsAdmissionDetailAwaitingReview = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailAwaitingReview/AdmissionDetailAwaitingReview")
);
const DormsAdmissionDetailReturned = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailReturned/AdmissionDetailReturned")
);
const DormsAdmissionDetailRejected = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailRejected/AdmissionDetailRejected")
);
const DormsAdmissionModify = lazy(
  () => import("../../../pages/Dorm/Planning/Admission/AdmissionModify/AdmissionModify")
);
const DormsTariffsActiveDetail = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/TariffDetailActive/TariffDetailActiveTab")
);
const DormsTariffsInActiveDetail = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailInActiveTab/TariffDetailInActive/TariffDetailInActiveTab")
);
const DormsTariffsAwaitingReviewDetail = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailAwaitingReviewTab/TariffDetailAwaitingReview/TariffDetailAwaitingReviewTab")
);
const DormsTariffsReturnedDetail = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailReturnedTab/TariffDetailReturnedTab")
);
const DormsTariffsRejectedDetail = lazy(
  () =>
    import("../../../pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailRejectedTab/TariffDetailRejectedTab")
);
const DormsTariffModify = lazy(
  () => import("../../../pages/Dorm/Planning/Tariff/TariffModify/TariffModify")
);
const DormsHabitantsList = lazy(
  () => import("../../../pages/Dorm/Habitants/HabitantsList/HabitantsList")
);
const DormsHabitantsDetail = lazy(
  () => import("../../../pages/Dorm/Habitants/HabitantsDetail/HabitantsDetail")
);
const DormsUsersRequestsList = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsList/UsersRequestsList")
);
const DormsUsersRequestsManualRegistration = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/ManualRegistration/UsersRequestsManualRegistration")
);
const DormsReportsList = lazy(
  () => import("../../../pages/Dorm/Reports/ReportsList/ReportsList")
);
const DormsReportsDebtorsDetail = lazy(
  () =>
    import("../../../pages/Dorm/Reports/ReportsDetail/ReportsDebtorsDetail/ReportsDebtorsDetail")
);
const DormsReportsCreatorsDetail = lazy(
  () =>
    import("../../../pages/Dorm/Reports/ReportsDetail/ReportsCreatorsDetail/ReportsCreatorsDetail")
);
const DormsReportsSettledDetail = lazy(
  () =>
    import("../../../pages/Dorm/Reports/ReportsDetail/ReportsSettledDetail/ReportsSettledDetail")
);
const DormsUsersRequestsDetailPendingReview = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingReview/UsersRequestsDetailPendingReview")
);
const DormsUsersRequestsDetailPendingPayment = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingPayment/UsersRequestsDetailPendingPayment")
);
const DormsUsersRequestsDetailConfirmed = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Confirmed/UsersRequestsDetailConfirmed")
);
const DormsUsersRequestsDetailDelivered = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Delivered/UsersRequestsDetailDelivered")
);
const DormsUsersRequestsDetailCancellation = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Cancellation/UsersRequestsDetailCancellation")
);
const DormsUsersRequestsDetailCancelled = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Cancelled/UsersRequestsDetailCancelled")
);
const DormsUsersRequestsDetailPendingList = lazy(
  () =>
    import("../../../pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/UsersRequestsDetailPendingList")
);

const dormBasicInfoList = lazy(
  () => import("../../../pages/Dorm/BasicInfo/DormBasicInfoList/DormBasicInfoList")
);
const dormBasicInfoRoomType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRoomTypes/DormRoomTypes")
);
const DormsModifyResidence = lazy(
  () => import("../../../pages/Dorm/Residence/DormCreateAndModify/DormCreateAndModify")
);
const DormsModifyBuilding = lazy(
  () =>
    import("../../../pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/BuildingCreateAndModify")
);
const DormsModifyFloor = lazy(
  () =>
    import("../../../pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Floor/FloorCreateAndModify/FloorCreateAndModify")
);
const DormsModifyRoom = lazy(
  () =>
    import("../../../pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/RoomCreateAndModify")
);
const DormsModifyBed = lazy(
  () =>
    import("../../../pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/BedCreateAndModify")
);
const dormBasicInfoBedType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormBedType/DormBedType")
);
const dormBasicInfoGenderType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormGenderType/DormGenderType")
);
const dormBasicInfoQualityGradeType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormQualityGradeTypes/DormQualityGradeTypes")
);
const dormBasicInfoReserveType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormReserveTypes/DormReserveTypes")
);
const dormBasicInfoManagementType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormManagementTypes/DormManagementTypes")
);
const dormBasicInfoFormStatusType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFormStatusTypes/DormFormStatusTypes")
);
const dormBasicInfoSpecialConditionsType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSpecialConditionsTypes/DormSpecialConditionsTypes")
);
const dormBasicInfoScheduleType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormScheduleTypes/DormScheduleTypes")
);
const dormBasicInfoRequestType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRequestTypes/DormRequestTypes")
);
const dormBasicInfoUserGroupType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormUserGroupTypes/DormUserGroupTypes")
);
const dormBasicInfoPresenceAndAbsenceType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPresenceAndAbsenceTypes/DormPresenceAndAbsenceTypes")
);
const dormBasicInfoFeedbackType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFeedbackTypes/DormFeedbackTypes")
);
const dormBasicInfoResidenceType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormResidenceTypes/DormResidenceTypes")
);
const dormBasicInfoPaymentMethodType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPaymentMethodTypes/DormPaymentMethodTypes")
);
const dormBasicInfoPaymentType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPaymentTypes/DormPaymentTypes")
);
const dormBasicInfoRelationType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRelationTypes/DormRelationTypes")
);
const dormBasicInfoBedStatusType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormBedStatusTypes/DormBedStatusTypes")
);
const dormBasicInfoAvailableStatusType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormAvailableStatusTypes/DormAvailableStatusTypes")
);
const dormBasicInfoAssignmentType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormAssignmentTypes/DormAssignmentTypes")
);
const dormBasicInfoRuleAndRegulationsType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRulesAndRegulationsTypes/DormRulesAndRegulationsTypes")
);
const dormBasicInfoNearByPlacesType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormNearByPlacesTypes/DormNearByPlacesTypes")
);
const dormBasicInfoSubsetsRuleAndRegulationsType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSubsetsRulesAndRegulations/DormSubsetsRulesAndRegulations")
);
const dormBasicInfoFacilitiesType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFacilitiesTypes/DormFacilitiesTypes")
);
const dormBasicInfoSemesterType = lazy(
  () =>
    import("../../../pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSemesterTypes/DormSemesterTypes")
);

const DormsWorkSpacesList = lazy(
  () => import("../../../pages/Dorm/Requests/WorkSpaces/WorkSpacesList/WorkSpacesList")
);
const DormsWorkSpacesDetailRequestReceivedAdmissionProgram = lazy(
  () =>
    import("../../../pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedAdmissionProgram/RequestReceivedAdmissionProgram")
);

const DormsWorkSpacesDetailRequestReceivedTariff = lazy(
  () =>
    import("../../../pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedTariff/RequestReceivedTariff")
);
const DormsWorkSpacesDetailRequestReceivedDormitory = lazy(
  () =>
    import("../../../pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedDormitory/RequestReceivedDormitory")
);
const DormsHabitantsEvacuation = lazy(
  () => import("../../../pages/Dorm/Habitants/Evacuation/Evacuation")
);

//! SCREENS
export const BPMSDormScreens = [
  {
    component: DormsList,
    path: DORM_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsListDetail,
    path: DORM_LIST_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsRequestsListDetail,
    path: DORM_REQUESTS_LIST_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsTariffsList,
    path: DORM_TARIFFS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsAdmissionList,
    path: DORM_ADMISSIONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsAdmissionDetailActive,
    path: DORM_ADMISSIONS_DETAIL_ACTIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsAdmissionDetailInactive,
    path: DORM_ADMISSIONS_DETAIL_INACTIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsAdmissionDetailAwaitingReview,
    path: DORM_ADMISSIONS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsAdmissionDetailReturned,
    path: DORM_ADMISSIONS_DETAIL_RETURNED_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsAdmissionDetailRejected,
    path: DORM_ADMISSIONS_DETAIL_REJECTED_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsAdmissionModify,
    path: DORM_ADMISSIONS_MODIFY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsTariffsActiveDetail,
    path: DORM_TARIFFS_DETAIL_ACTIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsTariffsInActiveDetail,
    path: DORM_TARIFFS_DETAIL_INACTIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsTariffsAwaitingReviewDetail,
    path: DORM_TARIFFS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsTariffsReturnedDetail,
    path: DORM_TARIFFS_DETAIL_RETURNED_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsTariffsRejectedDetail,
    path: DORM_TARIFFS_DETAIL_REJECTED_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsTariffModify,
    path: DORM_TARIFF_MODIFY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsHabitantsList,
    path: DORM_HABITANTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsHabitantsDetail,
    path: DORM_HABITANTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsList,
    path: DORM_USERS_REQUESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsUsersRequestsManualRegistration,
    path: DORM_USERS_REQUESTS_MANUAL_REGISTRATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsReportsList,
    path: DORM_REPORTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsReportsDebtorsDetail,
    path: DORM_REPORTS_DEBTORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsReportsCreatorsDetail,
    path: DORM_REPORTS_CREATORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsReportsSettledDetail,
    path: DORM_REPORTS_SETTLED_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailPendingReview,
    path: DORM_USERS_REQUESTS_DETAIL_PENDING_REVIEW_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailPendingPayment,
    path: DORM_USERS_REQUESTS_DETAIL_PENDING_PAYMENT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailConfirmed,
    path: DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailDelivered,
    path: DORM_USERS_REQUESTS_DETAIL_DELIVERED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailCancellation,
    path: DORM_USERS_REQUESTS_DETAIL_CANCELLATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailCancelled,
    path: DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsUsersRequestsDetailPendingList,
    path: DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoList,
    path: DORM_BASIC_INFO_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoRoomType,
    path: DORM_BASIC_INFO_ROOM_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoBedType,
    path: DORM_BASIC_INFO_BED_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoGenderType,
    path: DORM_BASIC_INFO_GENDER_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoQualityGradeType,
    path: DORM_BASIC_INFO_QUALITY_GRADE_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoReserveType,
    path: DORM_BASIC_INFO_RESERVE_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoManagementType,
    path: DORM_BASIC_INFO_MANAGEMENT_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoFormStatusType,
    path: DORM_BASIC_INFO_FORM_STATUS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoSpecialConditionsType,
    path: DORM_BASIC_INFO_SPECIAL_CONDITIONS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoScheduleType,
    path: DORM_BASIC_INFO_SCHEDULE_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoRequestType,
    path: DORM_BASIC_INFO_REQUEST_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoUserGroupType,
    path: DORM_BASIC_INFO_USER_GROUP_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoPresenceAndAbsenceType,
    path: DORM_BASIC_INFO_PRESENCE_ABSENCE_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoFeedbackType,
    path: DORM_BASIC_INFO_FEEDBACK_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoResidenceType,
    path: DORM_BASIC_INFO_RESIDENCE_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoPaymentMethodType,
    path: DORM_BASIC_INFO_PAYMENT_METHOD_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoPaymentType,
    path: DORM_BASIC_INFO_PAYMENT_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoRelationType,
    path: DORM_BASIC_INFO_RELATION_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoBedStatusType,
    path: DORM_BASIC_INFO_BED_STATUS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoAvailableStatusType,
    path: DORM_BASIC_INFO_AVAILABLE_STATUS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoAssignmentType,
    path: DORM_BASIC_INFO_ASSIGNMENT_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoRuleAndRegulationsType,
    path: DORM_BASIC_INFO_RULES_AND_REGULATIONS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoNearByPlacesType,
    path: DORM_BASIC_INFO_DORM_NEAR_BY_PLACES_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoSubsetsRuleAndRegulationsType,
    path: DORM_BASIC_INFO_SUBSETS_RULES_AND_REGULATIONS_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoFacilitiesType,
    path: DORM_BASIC_INFO_FACILITIES_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: dormBasicInfoSemesterType,
    path: DORM_BASIC_INFO_SEMESTER_TYPES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsModifyResidence,
    path: DORM_MODIFY_RESIDENCE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsModifyBuilding,
    path: DORM_MODIFY_Building_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsModifyFloor,
    path: DORM_MODIFY_FLOOR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsModifyRoom,
    path: DORM_MODIFY_ROOM_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsModifyBed,
    path: DORM_MODIFY_BED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsWorkSpacesList,
    path: DORM_WORK_SPACES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormsWorkSpacesDetailRequestReceivedAdmissionProgram,
    path: DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_ADMISSION_PROGRAM_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsWorkSpacesDetailRequestReceivedTariff,
    path: DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_TARIFF_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsWorkSpacesDetailRequestReceivedDormitory,
    path: DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_DORMITORY_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: DormsHabitantsEvacuation,
    path: DORM_HABITANTS_EVACUATION_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];
