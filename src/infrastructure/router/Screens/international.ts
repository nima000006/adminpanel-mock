import { lazy } from "react";

import {
  INTERNATIONAL_APPLICANTS_DETAIL_ROUTE,
  INTERNATIONAL_APPLICANTS_LIST_ROUTE,
  INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE,
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE,
  INTERNATIONAL_BASIC_INFO_BRANCHES_INTERNATIONAL_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE,
  INTERNATIONAL_BASIC_INFO_GROUPING_ROUTE,
  INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEW_MANAGER_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEWER_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE,
  INTERNATIONAL_BASIC_INFO_REASON_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_REASONS_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
  INTERNATIONAL_INTERVIEW_ARCHIVE_DETAIL_ROUTE,
  INTERNATIONAL_INTERVIEW_PENDING_HOLD_DETAIL_ROUTE,
  INTERNATIONAL_INTERVIEW_PENDING_RESULT_DETAIL_ROUTE,
  INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE,
  INTERNATIONAL_REQUESTS_DEMANDS_ROUTE,
  INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE,
  INTERNATIONAL_REQUESTS_PRE_REGISTRATION_DETAIL_ROUTE,
  INTERNATIONAL_REQUESTS_PRE_REGISTRATION_ROUTE,
} from "../routes/international";

const InternationalAdmissionPrograms = lazy(
  () =>
    import("../../../pages/International/BasicInfo/AdmissionProgram/List/AdmissionProgram")
);
const InternationalAdmissionProgramsDetail = lazy(
  () =>
    import("../../../pages/International/BasicInfo/AdmissionProgram/Detail/AdmissionProgramDetail")
);
const InternationalAdmissionProgramsModify = lazy(
  () =>
    import("../../../pages/International/BasicInfo/AdmissionProgram/Modify/AdmissionProgramModify")
);
const InternationalGrouping = lazy(
  () => import("../../../pages/International/BasicInfo/Grouping/Grouping")
);
const InternationalReasons = lazy(
  () => import("../../../pages/International/BasicInfo/Reasons/List/ReasonList")
);
const InternationalReasonDetail = lazy(
  () => import("../../../pages/International/BasicInfo/Reasons/Detail/ReasonDetail")
);
const InternationalBranches = lazy(
  () => import("../../../pages/International/BasicInfo/Branches/Branches")
);
const InternationalPersons = lazy(
  () => import("../../../pages/International/BasicInfo/Persons/Persons")
);
const InternationalPersonsInterViewerDetails = lazy(
  () =>
    import("../../../pages/International/BasicInfo/Persons/helper/components/InternationalPersonsInterViewerDetails/InternationalPersonsInterViewerDetails")
);
const InternationalPersonsInterViewManagerDetails = lazy(
  () =>
    import("../../../pages/International/BasicInfo/Persons/helper/components/InternationalPersonsInterViewManagerDetails/InternationalPersonsInterViewManagerDetails")
);
const InternationalBaseInfo = lazy(
  () => import("../../../pages/International/BasicInfo/BasicInfo")
);
const InternationalBaseInfoBranchesInternationalDetails = lazy(
  () =>
    import("../../../pages/International/BasicInfo/Branches/helper/components/InternationalBranchesInternational/helper/components/InternationalBranchesInternationalDetails/InternationalBranchesInternationalDetails")
);
const InternationalDemands = lazy(
  () => import("../../../pages/International/Requests/Demands/List/DemandsList")
);
const InternationalDemandsDetail = lazy(
  () => import("../../../pages/International/Requests/Demands/Detail/DemandDetail")
);
const InternationalInterviews = lazy(
  () => import("../../../pages/International/Requests/Interview/List/InterviewList")
);
const InternationalPreRegistration = lazy(
  () =>
    import("../../../pages/International/Requests/PreRegistration/List/PreRegistrationList")
);

const InternationalInterviewPendingHoldDetail = lazy(
  () =>
    import("../../../pages/International/Requests/Interview/Detail/InterviewDetail/InterviewPendingHoldDetail/InterviewPendingHoldDetail")
);
const InternationalInterviewPendingResultDetail = lazy(
  () =>
    import("../../../pages/International/Requests/Interview/Detail/InterviewDetail/InterviewPendingResultDetail/InterviewPendingResultDetail")
);
const InternationalInterviewArchiveDetail = lazy(
  () =>
    import("../../../pages/International/Requests/Interview/Detail/InterviewDetail/InterviewArchiveDetail/InterviewArchiveDetail")
);
const InternationalPreRegistrationDetail = lazy(
  () =>
    import("../../../pages/International/Requests/PreRegistration/Detail/PreRegistrationDetail/PreRegistrationDetail")
);
const InternationalApplicantsList = lazy(
  () => import("../../../pages/International/Applicants/List/ApplicantsList")
);
const InternationalApplicantsDetail = lazy(
  () =>
    import("../../../pages/International/Applicants/Detail/ApplicantsDetail/ApplicantsDetail")
);
const InternationalApplicantsRequestDetail = lazy(
  () =>
    import("../../../pages/International/Applicants/Detail/ApplicantsRequestDetail/ApplicantsRequestDetail")
);

export const InternationalScreens = [
  {
    component: InternationalAdmissionPrograms,
    path: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalAdmissionProgramsDetail,
    path: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalAdmissionProgramsModify,
    path: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalGrouping,
    path: INTERNATIONAL_BASIC_INFO_GROUPING_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalReasons,
    path: INTERNATIONAL_BASIC_INFO_REASONS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalReasonDetail,
    path: INTERNATIONAL_BASIC_INFO_REASON_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalBaseInfo,
    path: INTERNATIONAL_BASIC_INFO_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalBranches,
    path: INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalDemands,
    path: INTERNATIONAL_REQUESTS_DEMANDS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalDemandsDetail,
    path: INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalInterviews,
    path: INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalPreRegistration,
    path: INTERNATIONAL_REQUESTS_PRE_REGISTRATION_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalInterviewPendingHoldDetail,
    path: INTERNATIONAL_INTERVIEW_PENDING_HOLD_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalInterviewPendingResultDetail,
    path: INTERNATIONAL_INTERVIEW_PENDING_RESULT_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalInterviewArchiveDetail,
    path: INTERNATIONAL_INTERVIEW_ARCHIVE_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalPreRegistrationDetail,
    path: INTERNATIONAL_REQUESTS_PRE_REGISTRATION_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalBaseInfoBranchesInternationalDetails,
    path: INTERNATIONAL_BASIC_INFO_BRANCHES_INTERNATIONAL_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalPersons,
    path: INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalPersonsInterViewerDetails,
    path: INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEWER_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalPersonsInterViewManagerDetails,
    path: INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEW_MANAGER_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalApplicantsList,
    path: INTERNATIONAL_APPLICANTS_LIST_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalApplicantsDetail,
    path: INTERNATIONAL_APPLICANTS_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InternationalApplicantsRequestDetail,
    path: INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE,
    isBgContentCustom: false,
  },
];
