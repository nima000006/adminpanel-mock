import { lazy } from "react";

import {
  DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE,
  DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE,
  DORMITORY_MY_RESIDENCE_DETAIL_PAGE_ROUTE,
  DORMITORY_ALL_RESIDENCE_DETAIL_PAGE_ROUTE,
  DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
  DORMITORY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
  DORMITORY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
  DORMITORY_MY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_QUALITY_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_RULES_AND_REGULATION_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_FACILITIES_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_COURSE_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_REASON_RETURN_AND_REFUSE_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_DEDUCTION_AND_ADD_REASONS_LIST_PAGE_ROUTE,
  DORMITORY_BASIC_INFO_DETAIL_DEACTIVATION_REASONS_LIST_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE,
  DORMITORY_Habitants_LIST_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_OPENING_REQUESTS_DETAIL_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_IN_RESIDENCE_REQUESTS_DETAIL_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_COMPLETED_REQUESTS_DETAIL_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_CONFIRM_REQUEST_RESERVATION_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_MANUAL_RESERVATION_PAGE_ROUTE,
  DORMITORY_MY_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_EVACUATION_PAGE_ROUTE,
  DORMITORY_CONTRACT_DETAIL_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_STEPS_EDIT_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_ADMISSION_CREATION_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_CREATION_PAGE_ROUTE,
  DORMITORY_ACTIVE_ADMISSION_DETAIL_PAGE_ROUTE,
  DORMITORY_ALL_STAFFS_LIST_PAGE_ROUTE,
  DORMITORY_MY_STAFFS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";

import { DORMITORY_USER_REQUESTS_RESERVATION_MOVING_PAGE_ROUTE } from "../routes/dormitory";

const ResidenceBasicInfoList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoList/DormitoryBasicInfoList")
);
const ResidenceMyResidenceList = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/MyResidence/MyResidenceList/MyResidenceList")
);
const ResidenceAllResidenceList = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/AllResidence/AllResidenceList/AllResidenceList")
);
const ResidenceMyResidenceDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/MyResidence/MyResidenceDetail/MyResidenceDetail")
);
const ResidenceAllResidenceDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/AllResidence/AllResidenceDetail/AllResidenceDetail")
);
const ResidenceActiveResidenceDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/ActiveResidenceDetail")
);
const ResidenceActiveResidenceAllBedList = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/ActiveResidence/ActiveResidenceAllBedList/ActiveResidenceAllBedList")
);
const ResidenceActiveResidenceMoreDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/ActiveResidence/ActiveResidenceMoreDetail/ActiveResidenceMoreDetail")
);
const ResidenceMyActiveResidenceDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/MyActiveResidenceDetail")
);
const ResidenceMyActiveResidenceAllBedList = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceAllBedList/MyActiveResidenceAllBedList")
);
const ResidenceMyActiveResidenceMoreDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceMoreDetail/MyActiveResidenceMoreDetail")
);
const ResidenceBasicInfoDetailQualityList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/DormitoryBasicInfoQualityList")
);
const ResidenceBasicInfoDetailRulesAndRegulationList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/DormitoryBaseInfoRulesAndRegulationList")
);
const ResidenceBasicInfoDetailFacilitiesList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/DormitoryBaseInfoFacilitiesList")
);
const ResidenceBasicInfoDetailCourseList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/DormitoryBasicInfoCourseList")
);
const ResidenceBasicInfoDetailReasonReturnAndRefuseList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/DormitoryReasonReturnAndRefuseList")
);
const ResidenceBasicInfoDetailDeductionAndAddReasonsList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/DormitoryBaseInfoDeductionAndAddReasonsList")
);
const ResidenceBasicInfoDetailDeActivationReasonsList = lazy(
  () =>
    import("../../../pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/DormitoryBaseInfoDeActivationReasonsList")
);
const UserRequestsReservationRequestsList = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/ReservationRequests")
);
const HabitantsList = lazy(
  () => import("../../../pages/Dormitory/Habitants/HabitantsList/HabitantsList")
);
const UserRequestsReservationOpeningRequestsDetail = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ReservationOpeningRequestsDetail")
);
const UserRequestsReservationInResidenceRequestsDetail = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationInResidenceRequestsDetail/ReservationInResidenceRequestsDetail")
);
const UserRequestsReservationCompletedRequestsDetail = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/ReservationCompletedRequestsDetail")
);
const UserRequestsReservationConfirmRequestReservation = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/ConfirmRequestReservation")
);
const UserRequestsReservationManualReservation = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/ManualReservation")
);
const MyAdmissionDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/MyAdmission/MyAdmissionDetail/MyAdmissionDetail")
);
const MyAdmissionList = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/MyAdmission/MyAdmissionList/MyAdmissionList")
);
const AllAdmissionList = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/AllAdmission/AllAdmissionList/AllAdmissionList")
);
const UserRequestsReservationEvacuation = lazy(
  () =>
    import("../../../pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/Evacuation")
);
const UserRequestsReservationMoving = lazy(
  () => import("../../../pages/Dormitory/UsersRequests/ReservationRequests/Moving/Moving")
);

const AllAdmissionDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/AllAdmissionDetail")
);

const AdmissionContractDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/_shared/pages/Contract/DormitoryContractDetail")
);

const AllAdmissionStepsEditDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/AllAdmissionStepsEditDetail")
);

const MyAdmissionCreation = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/MyAdmission/MyAdmissionCreation/MyAdmissionCreation")
);

const AllAdmissionCreation = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/AllAdmissionCreation")
);
const ActiveAdmissionDetail = lazy(
  () =>
    import("../../../pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/ActiveAdmissionDetail")
);

const AllStaffsList = lazy(
  () => import("../../../pages/Dormitory/Staffs/AllStaffs/AllStaffsList/AllStaffsList")
);

const MyStaffsList = lazy(
  () => import("../../../pages/Dormitory/Staffs/MyStaffs/MyStaffsList/MyStaffsList")
);

export const DormitoryScreens = [
  {
    component: ResidenceBasicInfoList,
    path: DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceMyResidenceList,
    path: DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceAllResidenceList,
    path: DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceMyResidenceDetail,
    path: DORMITORY_MY_RESIDENCE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceAllResidenceDetail,
    path: DORMITORY_ALL_RESIDENCE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceActiveResidenceDetail,
    path: DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceActiveResidenceAllBedList,
    path: DORMITORY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceActiveResidenceMoreDetail,
    path: DORMITORY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceMyActiveResidenceDetail,
    path: DORMITORY_MY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceMyActiveResidenceAllBedList,
    path: DORMITORY_MY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceMyActiveResidenceMoreDetail,
    path: DORMITORY_MY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailQualityList,
    path: DORMITORY_BASIC_INFO_DETAIL_QUALITY_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailRulesAndRegulationList,
    path: DORMITORY_BASIC_INFO_DETAIL_RULES_AND_REGULATION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailFacilitiesList,
    path: DORMITORY_BASIC_INFO_DETAIL_FACILITIES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailCourseList,
    path: DORMITORY_BASIC_INFO_DETAIL_COURSE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailReasonReturnAndRefuseList,
    path: DORMITORY_BASIC_INFO_DETAIL_REASON_RETURN_AND_REFUSE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailDeductionAndAddReasonsList,
    path: DORMITORY_BASIC_INFO_DETAIL_DEDUCTION_AND_ADD_REASONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ResidenceBasicInfoDetailDeActivationReasonsList,
    path: DORMITORY_BASIC_INFO_DETAIL_DEACTIVATION_REASONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationRequestsList,
    path: DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: HabitantsList,
    path: DORMITORY_Habitants_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationOpeningRequestsDetail,
    path: DORMITORY_USER_REQUESTS_RESERVATION_OPENING_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationInResidenceRequestsDetail,
    path: DORMITORY_USER_REQUESTS_RESERVATION_IN_RESIDENCE_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationCompletedRequestsDetail,
    path: DORMITORY_USER_REQUESTS_RESERVATION_COMPLETED_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationConfirmRequestReservation,
    path: DORMITORY_USER_REQUESTS_RESERVATION_CONFIRM_REQUEST_RESERVATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationManualReservation,
    path: DORMITORY_USER_REQUESTS_RESERVATION_MANUAL_RESERVATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyAdmissionDetail,
    path: DORMITORY_MY_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyAdmissionList,
    path: DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllAdmissionList,
    path: DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllAdmissionDetail,
    path: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationEvacuation,
    path: DORMITORY_USER_REQUESTS_RESERVATION_EVACUATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: UserRequestsReservationMoving,
    path: DORMITORY_USER_REQUESTS_RESERVATION_MOVING_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AdmissionContractDetail,
    path: DORMITORY_CONTRACT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllAdmissionStepsEditDetail,
    path: DORMITORY_ALL_ADMISSION_STEPS_EDIT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyAdmissionCreation,
    path: DORMITORY_MY_ADMISSION_CREATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllAdmissionCreation,
    path: DORMITORY_ALL_ADMISSION_CREATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ActiveAdmissionDetail,
    path: DORMITORY_ACTIVE_ADMISSION_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllStaffsList,
    path: DORMITORY_ALL_STAFFS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyStaffsList,
    path: DORMITORY_MY_STAFFS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
