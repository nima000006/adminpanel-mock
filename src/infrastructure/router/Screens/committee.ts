import { lazy } from "react";

import {
  COMMITTEE_ACCUSATIONS_LIST_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_ARCHIVE_ANNUAL_REPORT_PAGE_ROUTE,
  COMMITTEE_ARCHIVE_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
  COMMITTEE_REPORT_PAGE_ROUTE,
  COMMITTEE_SESSION_LIST_PAGE_ROUTE,
  COMMITTEE_SESSION_CREATION_FINAL_CHECK_PAGE_ROUTE,
  COMMITTEE_SESSION_CREATION_PAGE_ROUTE,
  COMMITTEE_SUBMIT_INFRINGEMENT_PAGE_ROUTE,
  COMMITTEE_SUBMIT_PAGE_ROUTE,
  COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
  COMMITTEE_RULES_AND_LAWS_PAGE_ROUTE,
  COMMITTEE_REGULATIONS_PAGE_ROUTE,
  COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE,
  COMMITTEE_SESSION_DETAIL_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_CATEGORIES_PAGE_ROUTE,
  COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE,
  COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
  COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
  COMMITTEE_GENERAL_PUNISHMENT_PAGE_ROUTE,
  COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE,
  COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE,
  COMMITTEE_SUPPLEMENTARY_PUNISHMENT_LIST_PAGE_ROUTE,
  COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE,
  COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE,
  PRIMARY_COMMITTEE_PAGE_ROUTE,
  PRIMARY_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
  COMMITTEE_SESSION_Edition_PAGE_ROUTE,
  COMMITTEE_REVISION_PAGE_ROUTE,
  COMMITTEE_REVISION_CREATE_CHANGE_PAGE_ROUTE,
  CENTRAL_COMMITTEE_PAGE_ROUTE,
  CENTRAL_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
  COMMITTEE_AGGRAVATION_CAUSE_LIST_PAGE_ROUTE,
  COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE,
  COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE,
  COMMITTEE_TIMING_INFO_LIST_PAGE_ROUTE,
  COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
  COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE,
  COMMITTEE_REALIZATION_CREATE_CHANGE_PAGE_ROUTE,
  COMMITTEE_REALIZATION_PAGE_ROUTE,
  COMMITTEE_DOCUMENTS_CONSULTING_CENTER_PAGE_ROUTE,
  COMMITTEE_REALIZATION_LIST_PAGE_ROUTE,
  COMMITTEE_CONSULTING_CENTER_DETAIL_PAGE_ROUTE,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_ARCHIVE_PAGE_ROUTE,
  COMMITTEE_RESEARCH_CHANCELLOR_LIST_PAGE_ROUTE,
  COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_LIST_PAGE_ROUTE,
  COMMITTEE_CENTRAL_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_INQUIRY_USERS_LIST_PAGE_ROUTE,
  COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE,
  COMMITTEE_INQUIRY_USER_REPORT_PAGE_ROUTE,
  COMMITTEE_INQUIRY_USERS_SEARCH_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_LIST_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_PERMISSION_STAFF_LIST_PAGE_ROUTE,
  COMMITTEE_PERMISSION_ROLES_LIST_PAGE_ROUTE,
  COMMITTEE_RESEARCH_EDUCATION_CHANCELLOR_LIST_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_LIST_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_DETAIL_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ADD_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_YEAR_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER__ARCHIVE_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_ARCHIVE_YEAR_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_CHECK_INQUIRY_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Reporting_PAGE_ROUTE,
  COMMITTEE_CENTRAL_ACCUSATION_DETAIL_PAGE_ROUTE,
  COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_DETAIL_PAGE_ROUTE,
  COMMITTEE_RECORDS_DETAIlE_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_REMOVE_HISTORY_PAGE_ROUTE,
} from "../routes/committee";

const CommitteeReport = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/CommitteeReport/CommitteeReport")
);
const CommitteeArchiveReport = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/ArchiveReport/ArchiveReport")
);
const CommitteeArchiveAnnualReport = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/ArchiveAnnualReports/ArchiveAnnualReports")
);

const CommitteeReportSubmit = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/ReportSubmit/CommitteeReportSubmit")
);
const CommitteeReportDetail = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/ReportDetail/CommitteeReportDetail")
);
const CommitteeSubmitInfringement = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Reports/SubmitInfringement/SubmitInfringement")
);
const CommitteeAccusationsList = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Accusations/AccusationsList/AccusationsList")
);
const CommitteeAccusationCase = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/Accusations/AccusationCase/CommitteeAccusationCase")
);
const CommitteeSessionList = lazy(
  () => import("../../../pages/Committee/Committees/Meetings/SessionList/SessionList")
);
const CommitteeSessionCreation = lazy(
  () =>
    import("../../../pages/Committee/Committees/Meetings/SessionCreation/CommitteeSessionCreation")
);
const CommitteeSessionCreationFinalCheck = lazy(
  () =>
    import("../../../pages/Committee/Committees/Meetings/SessionCreationFinalCheck/CommitteeSessionCreationFinalCheck")
);
const CommitteeRecordsSubmit = lazy(
  () =>
    import("../../../pages/Committee/History/RecordsHistory/RecordSubmit/CommitteeRecordSubmit")
);
const CommitteeRecordsDetail = lazy(
  () =>
    import("../../../pages/Committee/History/RecordsHistory/ReadOnlyArchive/CommitteeReadOnlyArchive")
);
const CommitteeArchive = lazy(
  () => import("../../../pages/Committee/History/RecordsHistory/Archive/CommitteeArchive")
);
const CommitteeSessionDetail = lazy(
  () => import("../../../pages/Committee/Committees/Meetings/SessionDetail/SessionDetail")
);
const CommitteeRulesAndLaws = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/RulesAndLaws/RulesAndLaws/RulesAndLaws")
);
const CommitteeRegulations = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/RulesAndLaws/RulesAndLawsTabs/RulesAndLawsTabs")
);

const CommitteeNewRulesAndLaws = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/NewRulesAndLaws")
);
const CommitteeAccusationCategories = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationCategories/AccusationCategories/AccusationCategories")
);
const CommitteeDetailsAccusationCategories = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationCategories/DetailsAccusationCategories/DetailsAccusationCategories")
);
const CommitteeNewAccusationCategories = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationCategories/NewAccusationCategories/NewAccusationCategories")
);
const CommitteeAccusationAndViolations = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/Accusation/AccusationAndViolations/AccusationAndViolations")
);
const CommitteeAppealAccusationAndViolationsList = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/AccusationAppeal/AccusationAppealList/AccusationAppealList")
);
const CommitteeAppealAccusationAndViolationsDetail = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/AccusationAppeal/AccusationAppealDetail/AccusationAppealDetail")
);
const CommitteeCentralAccusationAndViolations = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/AccusationCentral/AccusationCentralList/AccusationCentralList")
);
const CommitteeDetailsAccusationAndViolations = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/Accusation/DetailsAccusationAndViolations/DetailsAccusationAndViolations")
);
const CommitteeNewAccusationAndViolations = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/Accusation/NewAccusationAndViolations/NewAccusationAndViolations")
);
const CommitteeAccusationAndViolationsDetails = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationDetails/AccusationAndViolationsDetails/AccusationAndViolationsDetails")
);
const CommitteeAccusationAndViolationsDetailsInfo = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationDetails/AccusationAndViolationsDetailsInfo/AccusationAndViolationsDetailsInfo")
);
const CommitteeCreationAccusationAndViolationsDetails = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AccusationDetails/NewAccusationAndViolationsDetails/NewAccusationAndViolationsDetails")
);
const CommitteeGeneralPunishment = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/GeneralPunishment/GeneralPunishment/GeneralPunishment")
);
const CommitteeGeneralPunishmentDetails = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/GeneralPunishment/GeneralPunishmentTabs/GeneralPunishmentTabs")
);
const CommitteeNewGeneralPunishment = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/GeneralPunishment/NewGeneralPunishment/NewGeneralPunishment")
);
const CommitteeSupplementaryPunishmentList = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/SupplementaryPunishment/SupplementaryPunishmentList/SupplementaryPunishmentList")
);
const CommitteeSupplementaryPunishmentTabs = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/SupplementaryPunishment/SupplementaryPunishmentTabs/SupplementaryPunishmentTabs")
);
const CommitteeNewSupplementaryPunishment = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/SupplementaryPunishment/NewSupplementaryPunishment/NewSupplementaryPunishment")
);
const PrimaryCommittee = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/PrimaryCommittee/PrimaryCommitteeTabs/PrimaryCommitteeTabs")
);
const PrimaryCommitteeCreateChange = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/PrimaryCommittee/CreateChange/CreateChange")
);
const CommitteeSessionEdition = lazy(
  () =>
    import("../../../pages/Committee/Committees/Meetings/SessionEdition/CommitteeSessionEdition")
);
const CommitteeRevision = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CommitteeRevision/CommitteeRevisionTabs/CommitteeRevisionTabs")
);
const CommitteeRevisionCreateChange = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CommitteeRevision/CommitteeRevisionCreateChange/CommitteeRevisionCreateChange")
);
const CentralCommittee = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CentralCommittee/CentralCommitteeTabs/CentralCommitteeTabs")
);
const CentralCommitteeCreateChange = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CentralCommittee/CentralCommitteeCreateChange/CentralCommitteeCreateChange")
);
const aggravationCauseList = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AggravationCause/AggravationCauseList/AggravationCauseList")
);
const aggravationCauseTabs = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AggravationCause/AggravationCauseTabs/AggravationCauseTabs")
);
const NewAggravationCause = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/AggravationCause/NewAggravationCause/NewAggravationCause")
);
const CommitteeTimingInfoList = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/TimingInfo/TimingInfoList/TimingInfoList")
);
const CommitteeTimingInfoTabs = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/TimingInfo/TimingInfoTabs/TimingInfoTabs")
);
const CommitteeNewTimingInfo = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/TimingInfo/NewTimingInfo/NewTimingInfo")
);
const CommitteeRealization = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CommitteeRealization/CommitteeRealizationTabs/CommitteeRealizationTabs")
);
const CommitteeRealizationCreateChange = lazy(
  () =>
    import("../../../pages/Committee/BasicInfo/CommitteeRealization/CommitteeRealizationCreateChange/CommitteeRealizationCreateChange")
);
const CommitteeDocumentsConsultingCenter = lazy(
  () =>
    import("../../../pages/Committee/ConsultingCenter/ConsultingCenterDocuments/ConsultingCenterDocumentsTabs")
);
const CommitteeRealizationList = lazy(
  () =>
    import("../../../pages/Committee/RealizationList/CommitteeRealizationList/CommitteeRealizationList")
);
const CommitteeConsultingCenterDetail = lazy(
  () =>
    import("../../../pages/Committee/ConsultingCenter/ConsultingCenterDetail/ConsultingCenterDetail/ConsultingCenterDetail")
);
const CommitteeConsultingCenterSessionList = lazy(
  () =>
    import("../../../pages/Committee/ConsultingCenter/ConsultingCenterSessionList/ConsultingCenterSessionListTabs")
);
const CommitteeAdditionalResearchWardingList = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/Warding/WardingListTabs/WardingListTabs")
);
const CommitteeAdditionalResearchWardingRecordReport = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/Warding/RecordReport/WardingRecordReport")
);
const CommitteeResearchChancellorList = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTabs/ResearchChancellorListTabs")
);
const CommitteeResearchChancellorRecordReport = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorRecordReport/ResearchChancellorRecordReport")
);
const CommitteeInquiryUsersSearch = lazy(
  () =>
    import("../../../pages/Committee/History/IndividualInquiry/InquiryUsersSearch/InquiryUsersSearch")
);
const CommitteeInquiryUsersList = lazy(
  () =>
    import("../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/InquiryUsersList")
);
const CommitteeInquiryUserInformation = lazy(
  () =>
    import("../../../pages/Committee/History/IndividualInquiry/InquiryUserInformation/InquiryUserInformation")
);
const CommitteeInquiryUserReport = lazy(
  () =>
    import("../../../pages/Committee/History/IndividualInquiry/InquiryUserReport/InquiryUserReport")
);

const CommitteeStudentChancellorList = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/StudentChancellor/StudentChancellorListTabs/StudentChancellorListTabs")
);
const CommitteeStudentChancellorRecordReport = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/StudentChancellor/StudentChancellorRecordReport/StudentChancellorRecordReport")
);
const CommitteeEducationChancellorList = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/EducationChancellor/EducationChancellorListTabs/EducationChancellorListTabs")
);

const CommitteePermissionManagementStaff = lazy(
  () => import("../../../pages/Committee/PermissionManagement/Staff/StaffList/StaffList")
);
const CommitteePermissionManagementRole = lazy(
  () => import("../../../pages/Committee/PermissionManagement/Roles/RolesList/RolesList")
);
const CommitteeEducationChancellorRecordReport = lazy(
  () =>
    import("../../../pages/Committee/AdditionalResearch/EducationChancellor/EducationChancellorRecordReport/EducationChancellorRecordReport")
);

const CommitteeHistoryRequestsSubmitterList = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsList/SubmitterRequestsList")
);
const CommitteeHistoryRequestsSubmitterDetail = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/SubmitterRequestsListDetail")
);
const CommitteeHistoryRequestsSubmitterAdd = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsAdd/SubmitterRequestsAdd")
);
const CommitteeHistoryRequestsSubmitterArchive = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsArchive/List/SubmitterRequestsArchiveList")
);
const CommitteeHistoryRequestsSubmitterYear = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsArchive/Year/SubmitterRequestsArchiveYear")
);
const CommitteeHistoryRequestsConfirmerList = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsList/ConfirmerRequestsList")
);
const CommitteeHistoryRequestsConfirmerDetailCheckInquiry = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/CheckInquiry/CheckInquiry")
);
const CommitteeHistoryRequestsConfirmerDetailInformation = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Information/Information")
);
const CommitteeHistoryRequestsConfirmerDetailReporting = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Reporting/Reporting")
);

const CommitteeHistoryRequestsConfirmerArchive = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmRequestsArchive/List/ConfirmRequestsArchiveList")
);
const CommitteeHistoryRequestsConfirmerYear = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmRequestsArchive/Year/ConfirmRequestsArchiveYear")
);
const CommitteeCentralAccusationDetail = lazy(
  () =>
    import("../../../pages/Committee/HandleProcessing/AccusationCentral/AccusationCentralDetail/CentralAccusationDetail")
);
const CommitteeConfirmDetailRemoveHistory = lazy(
  () =>
    import("../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/RemoveHistory/RemoveHistory")
);
export const CommitteeScreens = [
  {
    component: CommitteeReport,
    path: COMMITTEE_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeArchiveReport,
    path: COMMITTEE_ARCHIVE_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeReportSubmit,
    path: COMMITTEE_SUBMIT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeArchiveAnnualReport,
    path: COMMITTEE_ARCHIVE_ANNUAL_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeReportDetail,
    path: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeSubmitInfringement,
    path: COMMITTEE_SUBMIT_INFRINGEMENT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAccusationsList,
    path: COMMITTEE_ACCUSATIONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAccusationCase,
    path: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeSessionList,
    path: COMMITTEE_SESSION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeSessionCreation,
    path: COMMITTEE_SESSION_CREATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeSessionCreationFinalCheck,
    path: COMMITTEE_SESSION_CREATION_FINAL_CHECK_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRecordsSubmit,
    path: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRecordsDetail,
    path: COMMITTEE_RECORDS_DETAIlE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeArchive,
    path: COMMITTEE_ARCHIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsSubmitterList,
    path: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeSessionDetail,
    path: COMMITTEE_SESSION_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRulesAndLaws,
    path: COMMITTEE_RULES_AND_LAWS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRegulations,
    path: COMMITTEE_REGULATIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeNewRulesAndLaws,
    path: COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAccusationCategories,
    path: COMMITTEE_ACCUSATION_CATEGORIES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeDetailsAccusationCategories,
    path: COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeNewAccusationCategories,
    path: COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeAccusationAndViolations,
    path: COMMITTEE_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAppealAccusationAndViolationsList,
    path: COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAppealAccusationAndViolationsDetail,
    path: COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeCentralAccusationAndViolations,
    path: COMMITTEE_CENTRAL_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeDetailsAccusationAndViolations,
    path: COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeNewAccusationAndViolations,
    path: COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAccusationAndViolationsDetails,
    path: COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAccusationAndViolationsDetailsInfo,
    path: COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeCreationAccusationAndViolationsDetails,
    path: COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeGeneralPunishment,
    path: COMMITTEE_GENERAL_PUNISHMENT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeGeneralPunishmentDetails,
    path: COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeNewGeneralPunishment,
    path: COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeSupplementaryPunishmentList,
    path: COMMITTEE_SUPPLEMENTARY_PUNISHMENT_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeSupplementaryPunishmentTabs,
    path: COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeNewSupplementaryPunishment,
    path: COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: PrimaryCommittee,
    path: PRIMARY_COMMITTEE_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: PrimaryCommitteeCreateChange,
    path: PRIMARY_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeSessionEdition,
    path: COMMITTEE_SESSION_Edition_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRevision,
    path: COMMITTEE_REVISION_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeRevisionCreateChange,
    path: COMMITTEE_REVISION_CREATE_CHANGE_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CentralCommittee,
    path: CENTRAL_COMMITTEE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CentralCommitteeCreateChange,
    path: CENTRAL_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: aggravationCauseList,
    path: COMMITTEE_AGGRAVATION_CAUSE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: aggravationCauseTabs,
    path: COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: NewAggravationCause,
    path: COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeTimingInfoList,
    path: COMMITTEE_TIMING_INFO_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeTimingInfoTabs,
    path: COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeNewTimingInfo,
    path: COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRealizationCreateChange,
    path: COMMITTEE_REALIZATION_CREATE_CHANGE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRealization,
    path: COMMITTEE_REALIZATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeDocumentsConsultingCenter,
    path: COMMITTEE_DOCUMENTS_CONSULTING_CENTER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeRealizationList,
    path: COMMITTEE_REALIZATION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeConsultingCenterDetail,
    path: COMMITTEE_CONSULTING_CENTER_DETAIL_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeConsultingCenterSessionList,
    path: COMMITTEE_CONSULTING_CENTER_SESSION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAdditionalResearchWardingList,
    path: COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeAdditionalResearchWardingRecordReport,
    path: COMMITTEE_ADDITIONAL_RESEARCH_WARDING_RECORD_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeResearchChancellorList,
    path: COMMITTEE_RESEARCH_CHANCELLOR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeResearchChancellorRecordReport,
    path: COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeInquiryUsersSearch,
    path: COMMITTEE_INQUIRY_USERS_SEARCH_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeInquiryUsersList,
    path: COMMITTEE_INQUIRY_USERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeInquiryUserInformation,
    path: COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CommitteeInquiryUserReport,
    path: COMMITTEE_INQUIRY_USER_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeStudentChancellorList,
    path: COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeStudentChancellorRecordReport,
    path: COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteePermissionManagementStaff,
    path: COMMITTEE_PERMISSION_STAFF_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteePermissionManagementRole,
    path: COMMITTEE_PERMISSION_ROLES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeEducationChancellorList,
    path: COMMITTEE_RESEARCH_EDUCATION_CHANCELLOR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeEducationChancellorRecordReport,
    path: COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  //
  {
    component: CommitteeHistoryRequestsSubmitterDetail,
    path: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsSubmitterAdd,
    path: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ADD_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsSubmitterArchive,
    path: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsSubmitterYear,
    path: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_YEAR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsConfirmerList,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsConfirmerDetailCheckInquiry,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_CHECK_INQUIRY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsConfirmerDetailInformation,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsConfirmerDetailReporting,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Reporting_PAGE_ROUTE,
    isBgContentCustom: false,
  },

  {
    component: CommitteeHistoryRequestsConfirmerArchive,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER__ARCHIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeHistoryRequestsConfirmerYear,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_ARCHIVE_YEAR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeCentralAccusationDetail,
    path: COMMITTEE_CENTRAL_ACCUSATION_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CommitteeConfirmDetailRemoveHistory,
    path: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_REMOVE_HISTORY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
