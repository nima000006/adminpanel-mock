import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { countTransformResponse } from "@infra/helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { makeQueryParams } from "@infra/helpers/utils";
import { DORM_TAGS, invalidatesList } from "@infra/states/redux/config";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  GetAdmissionListRequest,
  GetAdmissionListResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionList/_shared/@types/@admissionListTab";
import { CountDormResponse } from "@pages/Dorm/Planning/Tariff/TariffList/helper/components/ActiveTab/@types/@activeTab";
import { GetReceivePaymentTypeResponse } from "@pages/Dorm/Requests/UsersRequests/ManualRegistration/helper/components/ManualRegistrationResidenceInfoStep/helper/sections/FloorInfo/helper/drawers/ManualRegistrationBedAllocation/helper/modals/ManualRegistrationConfirmBedAllocation/@types/@manualRegistrationConfirmBedAllocationModalContent";
import {
  DormRequestsDeliverRoomRequest,
  DormRequestsDeliverRoomResponse,
  DormRequestsStatusRequest,
  DormRequestsStatusResponse,
  GetDormCancellationStatusRequest,
  GetDormCancellationStatusResponse,
  GetDormPendingPaymentStatusRequest,
  GetDormPendingPaymentStatusResponse,
  GetDormPendingReviewStatusRequest,
  GetDormPendingReviewStatusResponse,
  GetDormRequestBedListResponse,
  GetDormRequestInformationResponse,
  GetDormRequestPaymentInvoiceInfoResponse,
  GetDormRequestPaymentInvoicePaymentStatusResponse,
  GetDormRequestPaymentInvoiceTableResponse,
  GetDormRequestResidenceInfoResponse,
  GetDormRequestRoomListCountRequests,
  GetDormRequestRoomListRequests,
  GetDormRequestRoomListResponse,
  GetDormRequestRoomOtherRequestListCountRequests,
  GetDormRequestRoomOtherRequestListRequests,
  GetDormRequestRoomOtherRequestListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import {
  GetDormUserRecordsListRequests,
  GetDormUserRecordsListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailUserHistory/@types/@usersRequestsDetailUserHistory";
import { GetMaritalStatusResponse } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Confirmed/helper/components/RequestsInfo/helper/modals/RoomDeliverModalContent/@types/@roomDeliverModalContent";
import {
  GetAdmissionProgramRequests,
  GetAdmissionProgramResponse,
  GetDormUsersRequestsListCountRequests,
  GetDormUsersRequestsListRequests,
  GetDormUsersRequestsListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";
import { CountDormRequest } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/components/TariffAdmissionSchedule/@types/@tariffAdmissionSchedule";
import {
  GetAdmissionTaskIdRequest,
  GetAdmissionTaskIdResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedAdmissionProgram/@types/@requestReceivedAdmissionProgram";
import {
  GetDormitoryTaskIdRequest,
  GetDormitoryTaskIdResponse,
  SubmitConfirmAndRejectAndReturnModalRequest,
  SubmitConfirmAndRejectAndReturnModalResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedDormitory/@types/@requestReceivedDormitory";
import {
  GetTariffTaskIdRequest,
  GetTariffTaskIdResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/RequestReceivedTabDetail/RequestReceivedTariff/@types/@requestReceivedTariff";
import {
  GetWorkSpaceAdmissionCountRequests,
  GetWorkSpaceAdmissionRequests,
  GetWorkSpaceAdmissionResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import {
  GetWorkSpaceDormListCountRequests,
  GetWorkSpaceDormListRequests,
  GetWorkSpaceDormListResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import {
  GetWorkSpaceTariffCountRequests,
  GetWorkSpaceTariffRequests,
  GetWorkSpaceTariffResponse,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";

import { dormApi } from "../../dormApi";

export const dormRequestsApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== REQUESTS LIST ====================
    getRequestsList: builder.query<
      GetDormUsersRequestsListResponse,
      GetDormUsersRequestsListRequests
    >({
      query: ({
        firstResult,
        maxResults,
        statusId,
        cancellationStatus,
        requestTypeId,
        genderId,
        userGroupId,
        schedulingId,
        provinceId,
        cityId,
        branchId,
        reservationTypeId,
        waitingTimeId,
        dormitoryId,
        createDate_BTW,
        name,
        sortings,
        lastName,
        deliverPlanTitle,
        studentNumber,
        dormitory,
        nationalCode,
      }) => ({
        url: `/data/form/UserRequestList?maxResults=${maxResults}&firstResult=${firstResult}${statusId ? `&statusId_IN=${statusId}` : ""}${cancellationStatus ? `&cancellationRequestStatus_IN=${cancellationStatus}` : ""}${dormitoryId ? `&AssociationCategoryDeliverPlan_dormitoryId_IN=${dormitoryId}` : ""}${requestTypeId ? `&AssociationCategoryRequestType_id_IN=${requestTypeId}` : ""}${genderId ? `&AssociationCustomer_AssociationCustomerUser_genderId_IN=${genderId}` : ""}${userGroupId ? `&AssociationCustomer_userGroupID_IN=${userGroupId}` : ""}${schedulingId ? `&AssociationCategoryDeliverPlan_schedulingId_IN=${schedulingId}` : ""}${provinceId ? `&AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN=${provinceId}` : ""}${cityId ? `&AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN=${cityId}` : ""}${branchId ? `&AssociationCategoryDeliverPlan_branchId_IN=${branchId}` : ""}${reservationTypeId ? `&AssociationCategoryDeliverPlan_reservationTypeId_IN=${reservationTypeId}` : ""}${waitingTimeId ? `&${waitingTimeId?.queryParam}=${waitingTimeId?.value}` : ""}${createDate_BTW ? `&createDate_BTW=${createDate_BTW}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}${name ? `&AssociationCustomer_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationCustomer_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${deliverPlanTitle ? `&AssociationCategoryDeliverPlan_title_LIKE=${deliverPlanTitle}` : ""}${studentNumber ? `&AssociationCustomer_AssociationStudent_studentNumber_LIKE=${studentNumber}` : ""}${dormitory ? `&AssociationCategoryDeliverPlan_AssociationDormitory_title_LIKE=${dormitory}` : ""}${nationalCode ? `&AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE=${nationalCode}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUESTS, id: "LIST" }],
      transformResponse: (response: GetDormUsersRequestsListResponse) => {
        return transformResponse(response);
      },
    }),

    getRequestsListCount: builder.query<
      CountResponse,
      GetDormUsersRequestsListCountRequests
    >({
      query: ({
        statusId,
        cancellationStatus,
        requestTypeId,
        genderId,
        userGroupId,
        schedulingId,
        provinceId,
        cityId,
        branchId,
        reservationTypeId,
        waitingTimeId,
        dormitoryId,
        createDate_BTW,
        name,
        sortings,
        lastName,
        deliverPlanTitle,
        studentNumber,
        dormitory,
        nationalCode,
      }) => ({
        url: `/data/form/UserRequestList/count?${statusId ? `&statusId_IN=${statusId}` : ""}${cancellationStatus ? `&cancellationRequestStatus_IN=${cancellationStatus}` : ""}${dormitoryId ? `&AssociationCategoryDeliverPlan_dormitoryId_IN=${dormitoryId}` : ""}${requestTypeId ? `&AssociationCategoryRequestType_id_IN=${requestTypeId}` : ""}${genderId ? `&AssociationCustomer_AssociationCustomerUser_genderId_IN=${genderId}` : ""}${userGroupId ? `&AssociationCustomer_userGroupID_IN=${userGroupId}` : ""}${schedulingId ? `&AssociationCategoryDeliverPlan_schedulingId_IN=${schedulingId}` : ""}${provinceId ? `&AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN=${provinceId}` : ""}${cityId ? `&AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN=${cityId}` : ""}${branchId ? `&AssociationCategoryDeliverPlan_branchId_IN=${branchId}` : ""}${reservationTypeId ? `&AssociationCategoryDeliverPlan_reservationTypeId_IN=${reservationTypeId}` : ""}${waitingTimeId ? `&${waitingTimeId?.queryParam}=${waitingTimeId?.value}` : ""}${createDate_BTW ? `&createDate_BTW=${createDate_BTW}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}${name ? `&AssociationCustomer_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationCustomer_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${deliverPlanTitle ? `&AssociationCategoryDeliverPlan_title_LIKE=${deliverPlanTitle}` : ""}${studentNumber ? `&AssociationCustomer_AssociationStudent_studentNumber_LIKE=${studentNumber}` : ""}${dormitory ? `&AssociationCategoryDeliverPlan_AssociationDormitory_title_LIKE=${dormitory}` : ""}${nationalCode ? `&AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE=${nationalCode}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUESTS, id: "COUNT" }],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),

    // ==================== ADMISSION PROGRAM ====================
    getAdmissionProgramList: builder.query<
      GetAdmissionProgramResponse,
      GetAdmissionProgramRequests
    >({
      query: ({ branchId }) => ({
        url: `/data/form/ListAdmissionsProgram?maxResults=2000&firstResult=0&branchId_EQ=${branchId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "PROGRAM_LIST" }],
      transformResponse: (response: GetAdmissionProgramResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== REQUEST INFORMATION ====================
    getDormRequestInformation: builder.query<GetDormRequestInformationResponse, string>({
      query: (requestId) => ({
        url: `/data/form/UserInformationRequests?maxResults=1&firstResult=0&id_EQ=${requestId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        { type: DORM_TAGS.REQUESTS, id: requestId },
      ],
      transformResponse: (response: GetDormRequestInformationResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== REQUEST ROOM ====================
    getDormRequestRoomList: builder.query<
      GetDormRequestRoomListResponse,
      GetDormRequestRoomListRequests
    >({
      query: ({ floorId, tariffId, maxResults, firstResult }) => ({
        url: `/data/form/ListOfRoomsForChoose?maxResults=${maxResults}&firstResult=${firstResult}&floorid_EQ=${floorId}&tarefe_EQ=${tariffId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_ROOM, id: "LIST" }],
      transformResponse: (response: GetDormRequestRoomListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormRequestRoomListCount: builder.query<
      CountResponse,
      GetDormRequestRoomListCountRequests
    >({
      query: ({ floorId, tariffId }) => ({
        url: `/data/form/ListOfRoomsForChoose/count?floorid_EQ=${floorId}&tarefe_EQ=${tariffId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_ROOM, id: "COUNT" }],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),

    getDormRequestResidenceInfo: builder.query<
      GetDormRequestResidenceInfoResponse,
      string
    >({
      query: (requestId) => ({
        url: `/data/form/AllocatedRooms?maxResults=2000&firstResult=0&id_EQ=${requestId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_ROOM, id: "RESIDENCE_INFO" }],
      transformResponse: (response: GetDormRequestResidenceInfoResponse) => {
        return transformResponse(response);
      },
    }),

    getDormRequestRoomOtherRequestList: builder.query<
      GetDormRequestRoomOtherRequestListResponse,
      GetDormRequestRoomOtherRequestListRequests
    >({
      query: ({
        maxResults,
        firstResult,
        admissionId,
        roomId,
        name,
        sortings,
        lastName,
        deliverPlanTitle,
        studentNumber,
        dormitory,
      }) => ({
        url: `/data/form/OtherRoomRequests?maxResults=${maxResults}&firstResult=${firstResult}&deliverPlanId_EQ=${admissionId}&AssociationBed_roomId_EQ=${roomId}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}${name ? `&AssociationCustomer_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationCustomer_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${deliverPlanTitle ? `&AssociationCategoryDeliverPlan_title_LIKE=${deliverPlanTitle}` : ""}${studentNumber ? `&AssociationCustomer_AssociationStudent_studentNumber_LIKE=${studentNumber}` : ""}${dormitory ? `&AssociationBed_AssociationCategoryDormitory_title_LIKE=${dormitory}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_ROOM, id: "OTHER_REQUESTS" }],
      transformResponse: (response: GetDormRequestRoomOtherRequestListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormRequestRoomOtherRequestListCount: builder.query<
      CountResponse,
      GetDormRequestRoomOtherRequestListCountRequests
    >({
      query: ({
        admissionId,
        roomId,
        name,
        sortings,
        lastName,
        deliverPlanTitle,
        studentNumber,
        dormitory,
      }) => ({
        url: `/data/form/OtherRoomRequests/count?deliverPlanId_EQ=${admissionId}&AssociationBed_roomId_EQ=${roomId}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}${name ? `&AssociationCustomer_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationCustomer_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${deliverPlanTitle ? `&AssociationCategoryDeliverPlan_title_LIKE=${deliverPlanTitle}` : ""}${studentNumber ? `&AssociationCustomer_AssociationStudent_studentNumber_LIKE=${studentNumber}` : ""}${dormitory ? `&AssociationBed_AssociationCategoryDormitory_title_LIKE=${dormitory}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_ROOM, id: "OTHER_COUNT" }],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),

    // ==================== USER RECORDS ====================
    getDormUserRecordsList: builder.query<
      GetDormUserRecordsListResponse,
      GetDormUserRecordsListRequests
    >({
      query: ({ maxResults, firstResult, nationalCode, dormitory, sortings }) => ({
        url: `/data/form/ListUserRecords?maxResults=${maxResults}&firstResult=${firstResult}&AssociationCustomer_AssociationCustomerUser_nationalCode_EQ=${nationalCode}${dormitory ? `&AssociationBed_AssociationCategoryDormitory_title_LIKE=${dormitory}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUESTS, id: "USER_RECORDS" }],
      transformResponse: (response: GetDormUserRecordsListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormUserRecordsListCount: builder.query<
      CountResponse,
      { nationalCode: string; dormitory?: string; sortings?: string | undefined }
    >({
      query: ({ nationalCode, dormitory, sortings }) => ({
        url: `/data/form/ListUserRecords/count?AssociationCustomer_AssociationCustomerUser_nationalCode_EQ=${nationalCode}${dormitory ? `&AssociationBed_AssociationCategoryDormitory_title_LIKE=${dormitory}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUESTS, id: "USER_RECORDS_COUNT" }],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),

    // ==================== REQUEST ACTIONS ====================
    dormRequestsDeliverRoom: builder.mutation<
      DormRequestsDeliverRoomResponse,
      DormRequestsDeliverRoomRequest
    >({
      query: (body) => ({
        url: "/data/form/BedDelivery/start-process/BedDelivery",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.REQUESTS),
        ...invalidatesList(DORM_TAGS.REQUEST_ROOM),
        ...invalidatesList(DORM_TAGS.REQUEST_BED),
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== REQUEST STATUS ====================
    getDormPendingReviewStatus: builder.mutation<
      GetDormPendingReviewStatusResponse,
      GetDormPendingReviewStatusRequest
    >({
      query: (body) => ({
        url: "/filter/10311574-bad4-11ef-ae61-4ebc37dd1934/list?firstResult=0&maxResults=15",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
    // در انتظار پرداخت
    getDormPendingPaymentStatus: builder.mutation<
      GetDormPendingPaymentStatusResponse,
      GetDormPendingPaymentStatusRequest
    >({
      query: (body) => ({
        url: "/filter/65ea49d1-bad8-11ef-ae61-4ebc37dd1934/list?firstResult=0&maxResults=15",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== CANCELLATION STATUS ====================
    getDormCancellationStatus: builder.mutation<
      GetDormCancellationStatusResponse,
      GetDormCancellationStatusRequest
    >({
      query: (body) => ({
        url: "/filter/3a630d14-bac8-11ef-ae61-4ebc37dd1934/list?firstResult=0&maxResults=15",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== REQUEST STATUS MUTATION ====================
    dormRequestsStatus: builder.mutation<
      DormRequestsStatusResponse,
      DormRequestsStatusRequest
    >({
      query: ({ body, statusCode }) => ({
        url: `/task/${statusCode}/submit-form`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.REQUESTS),
        ...invalidatesList(DORM_TAGS.WORKSPACE_DORM),
        ...invalidatesList(DORM_TAGS.WORKSPACE_TARIFF),
        ...invalidatesList(DORM_TAGS.WORKSPACE_ADMISSION),
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== REQUEST BED ====================
    getDormRequestBedList: builder.query<GetDormRequestBedListResponse, string>({
      query: (roomId) => ({
        url: `/data/form/ViewBedListt?maxResults=2000&firstResult=0&roomId_EQ=${roomId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, roomId) => [
        { type: DORM_TAGS.REQUEST_BED, id: roomId },
        { type: DORM_TAGS.REQUEST_BED, id: "LIST" },
      ],
      transformResponse: (response: GetDormRequestBedListResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== PAYMENT INVOICE ====================
    getDormRequestPaymentInvoiceInfo: builder.query<
      GetDormRequestPaymentInvoiceInfoResponse,
      string
    >({
      query: (requestId) => ({
        url: `/data/form/PaymentInvoice?maxResults=1&firstResult=0&dormitoryRequestId_EQ=${requestId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        { type: DORM_TAGS.INVOICE, id: requestId },
      ],
      transformResponse: (response: GetDormRequestPaymentInvoiceInfoResponse) => {
        return transformResponse(response);
      },
    }),

    getDormRequestPaymentInvoiceTable: builder.query<
      GetDormRequestPaymentInvoiceTableResponse,
      string
    >({
      query: (requestId) => ({
        url: `/data/form/InvoiceTable?maxResults=2000&firstResult=0&id_EQ=${requestId}&parentId_EQ=${requestId}&orQueries=true`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        { type: DORM_TAGS.INVOICE, id: `TABLE_${requestId}` },
      ],
      transformResponse: (response: GetDormRequestPaymentInvoiceTableResponse) => {
        return transformResponse(response);
      },
    }),

    getDormRequestPaymentInvoicePaymentStatus: builder.query<
      GetDormRequestPaymentInvoicePaymentStatusResponse,
      string
    >({
      query: (requestId) => ({
        url: `/data/form/InvoicePaymentStatus?maxResults=2000&firstResult=0&dormitoryRequestId_EQ=${requestId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        { type: DORM_TAGS.INVOICE, id: `STATUS_${requestId}` },
      ],
      transformResponse: (
        response: GetDormRequestPaymentInvoicePaymentStatusResponse
      ) => {
        return transformResponse(response);
      },
    }),
    // ==================== WORKSPACE DORM ====================
    getWorkSpaceDormReceivedList: builder.query<
      GetWorkSpaceDormListResponse,
      GetWorkSpaceDormListRequests
    >({
      query: ({
        firstResult,
        maxResults,
        branchId,
        requestTypeId,
        statusId,
        waitingTimeId,
        name,
        lastName,
        dormitory,
        sortings,
        provinceId,
        cityId,
      }) => ({
        url: `/data/form/DormitoryRequestsReceived?maxResults=${maxResults}&firstResult=${firstResult}${provinceId ? `&AssociationBranch_AssociationCategoryRegion_parentId_IN=${provinceId}` : ""}${cityId ? `&AssociationBranch_regionId_IN=${cityId}` : ""}${branchId ? `&AssociationUser_AssociationStudent_branchId_IN=${branchId}` : ""}${requestTypeId ? `&requestTypeId_IN=${requestTypeId}` : ""}${statusId ? `&statusId_IN=${statusId}` : ""}${waitingTimeId ? `&${waitingTimeId?.queryParam}=${waitingTimeId?.value}` : ""}${dormitory ? `&title_LIKE=${dormitory}` : ""}${name ? `&AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.WORKSPACE_DORM, id: "LIST" }],
      transformResponse: (response: GetWorkSpaceDormListResponse) => {
        return transformResponse(response);
      },
    }),

    getWorkSpaceDormReceivedListCount: builder.query<
      CountResponse,
      GetWorkSpaceDormListCountRequests
    >({
      query: ({
        branchId,
        requestTypeId,
        statusId,
        waitingTimeId,
        provinceId,
        cityId,
        name,
        lastName,
        dormitory,
        sortings,
      }) => {
        const params = {
          AssociationUser_AssociationStudent_branchId_IN: branchId,
          requestTypeId_IN: requestTypeId,
          statusId_IN: statusId,
          AssociationBranch_AssociationCategoryRegion_parentId_IN: provinceId,
          AssociationBranch_regionId_IN: cityId,
          ...(waitingTimeId ? { [waitingTimeId.queryParam]: waitingTimeId?.value } : {}),
        };

        const baseParams = makeQueryParams(params);

        const extraParams = [
          dormitory ? `title_LIKE=${dormitory}` : "",
          name
            ? `AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}`
            : "",
          lastName
            ? `AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}`
            : "",
          sortings ? `sortings=${encodeURIComponent(sortings)}` : "",
        ]
          .filter(Boolean)
          .join("&");

        const url =
          `/data/form/DormitoryRequestsReceived/count${baseParams}` +
          (extraParams ? (baseParams ? `&${extraParams}` : `?${extraParams}`) : "");

        return {
          url,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.WORKSPACE_DORM, id: "COUNT" }],
      transformResponse: (response: CountResponse) => countTransformResponse(response),
    }),

    // ==================== WORKSPACE TARIFF ====================
    getWorkSpaceTariffReceivedList: builder.query<
      GetWorkSpaceTariffResponse,
      GetWorkSpaceTariffRequests
    >({
      query: ({
        firstResult,
        maxResults,
        branchId,
        requestTypeId,
        statusId,
        provinceId,
        cityId,
        waitingTimeId,
        dormitory,
        name,
        sortings,
        lastName,
      }) => ({
        url: `/data/form/DormitoryRequestsPriceList?maxResults=${maxResults}&firstResult=${firstResult}${provinceId ? `&AssociationBranchid_AssociationCategoryRegion_parentId_IN=${provinceId}` : ""}${cityId ? `&AssociationBranchid_regionId_IN=${cityId}` : ""}${branchId ? `&AssociationUser_AssociationStudent_branchId_IN=${branchId}` : ""}${requestTypeId ? `&requestTypeId_IN=${requestTypeId}` : ""}${statusId ? `&statusId_IN=${statusId}` : ""}${waitingTimeId ? `&${waitingTimeId?.queryParam}=${waitingTimeId?.value}` : ""}${dormitory ? `&AssociationDormitory_title_LIKE=${dormitory}` : ""}${name ? `&AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.WORKSPACE_TARIFF, id: "LIST" }],
      transformResponse: (response: GetWorkSpaceTariffResponse) => {
        return transformResponse(response);
      },
    }),

    getWorkSpaceTariffReceivedListCount: builder.query<
      CountResponse,
      GetWorkSpaceTariffCountRequests
    >({
      query: ({
        branchId,
        requestTypeId,
        statusId,
        waitingTimeId,
        provinceId,
        cityId,
        dormitory,
        name,
        sortings,
        lastName,
      }) => {
        const params = {
          AssociationUser_AssociationStudent_branchId_IN: branchId,
          requestTypeId_IN: requestTypeId,
          statusId_IN: statusId,
          AssociationBranchid_AssociationCategoryRegion_parentId_IN: provinceId,
          AssociationBranchid_regionId_IN: cityId,
          ...(waitingTimeId ? { [waitingTimeId.queryParam]: waitingTimeId?.value } : {}),
        };

        const baseParams = makeQueryParams(params);

        const extraParams = [
          dormitory ? `AssociationDormitory_title_LIKE=${dormitory}` : "",
          name
            ? `AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}`
            : "",
          lastName
            ? `AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}`
            : "",
          sortings ? `sortings=${encodeURIComponent(sortings)}` : "",
        ]
          .filter(Boolean)
          .join("&");

        const url =
          `/data/form/DormitoryRequestsPriceList/count${baseParams}` +
          (extraParams ? (baseParams ? `&${extraParams}` : `?${extraParams}`) : "");

        return {
          url,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.WORKSPACE_TARIFF, id: "COUNT" }],
      transformResponse: (response: CountResponse) => countTransformResponse(response),
    }),

    // ==================== WORKSPACE ADMISSION ====================
    getWorkSpaceAdmissionReceivedList: builder.query<
      GetWorkSpaceAdmissionResponse,
      GetWorkSpaceAdmissionRequests
    >({
      query: ({
        firstResult,
        maxResults,
        branchId,
        requestTypeId,
        statusId,
        provinceId,
        cityId,
        waitingTimeId,
        dormitory,
        lastName,
        name,
        sortings,
      }) => ({
        url: `/data/form/DeliverPlanRequestsReceived?maxResults=${maxResults}&firstResult=${firstResult}${provinceId ? `&AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN=${provinceId}` : ""}${cityId ? `&AssociationCategoryBranch_regionId_IN=${cityId}` : ""}${branchId ? `&AssociationUser_AssociationStudent_branchId_IN=${branchId}` : ""}${requestTypeId ? `&requestTypeId_IN=${requestTypeId}` : ""}${statusId ? `&statusId_IN=${statusId}` : ""}${waitingTimeId ? `&${waitingTimeId?.queryParam}=${waitingTimeId?.value}` : ""}${dormitory ? `&AssociationDormitory_title_LIKE=${dormitory}` : ""}${name ? `&AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}` : ""}${lastName ? `&AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}` : ""}${sortings ? `&sortings=${encodeURIComponent(sortings)}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.WORKSPACE_ADMISSION, id: "LIST" }],
      transformResponse: (response: GetWorkSpaceAdmissionResponse) => {
        return transformResponse(response);
      },
    }),

    getWorkSpaceAdmissionReceivedListCount: builder.query<
      CountResponse,
      GetWorkSpaceAdmissionCountRequests
    >({
      query: ({
        branchId,
        requestTypeId,
        statusId,
        waitingTimeId,
        provinceId,
        cityId,
        dormitory,
        lastName,
        name,
        sortings,
      }) => {
        const params = {
          AssociationUser_AssociationStudent_branchId_IN: branchId,
          requestTypeId_IN: requestTypeId,
          statusId_IN: statusId,
          AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN: provinceId,
          AssociationCategoryBranch_regionId_IN: cityId,
          ...(waitingTimeId ? { [waitingTimeId.queryParam]: waitingTimeId?.value } : {}),
        };

        const baseParams = makeQueryParams(params); // should return '' or start with '?'

        const extraParams = [
          dormitory ? `AssociationDormitory_title_LIKE=${dormitory}` : "",
          name
            ? `AssociationUserStaffNew_AssociationCustomerUser_firstName_LIKE=${name}`
            : "",
          lastName
            ? `AssociationUserStaffNew_AssociationCustomerUser_lastName_LIKE=${lastName}`
            : "",
          sortings ? `sortings=${encodeURIComponent(sortings)}` : "",
        ]
          .filter(Boolean)
          .join("&");

        const url =
          `/data/form/DeliverPlanRequestsReceived/count${baseParams}` +
          (extraParams ? (baseParams ? `&${extraParams}` : `?${extraParams}`) : "");

        return {
          url,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.WORKSPACE_ADMISSION, id: "COUNT" }],
      transformResponse: (response: CountResponse) => countTransformResponse(response),
    }),

    // ==================== WORKSPACE DETAILS ====================
    getWorkSpaceDormSendingDetail: builder.query<GetWorkSpaceDormListResponse, string>({
      query: (id) => ({
        url: `/data/form/DormitoryRequestsReceived?maxResults=2000&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: DORM_TAGS.WORKSPACE_DORM, id }],
      transformResponse: (response: GetWorkSpaceDormListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormitoryTaskId: builder.mutation<
      GetDormitoryTaskIdResponse,
      GetDormitoryTaskIdRequest
    >({
      query: (body) => ({
        url: "/filter/584862ed-b3eb-11ef-b5b9-ba62cbc14737/list?firstResult=0&maxResults=1",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    submitConfirmAndRejectAndReturnModal: builder.mutation<
      SubmitConfirmAndRejectAndReturnModalResponse,
      SubmitConfirmAndRejectAndReturnModalRequest
    >({
      query: ({ body, statusCode }) => ({
        url: `/task/${statusCode}/submit-form`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.WORKSPACE_DORM),
        ...invalidatesList(DORM_TAGS.WORKSPACE_TARIFF),
        ...invalidatesList(DORM_TAGS.WORKSPACE_ADMISSION),
        ...invalidatesList(DORM_TAGS.REQUESTS),
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    getWorkSpaceTariffDetail: builder.query<GetWorkSpaceTariffResponse, string>({
      query: (id) => ({
        url: `/data/form/DormitoryRequestsPriceList?maxResults=2000&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: DORM_TAGS.WORKSPACE_TARIFF, id }],
      transformResponse: (response: GetWorkSpaceTariffResponse) => {
        return transformResponse(response);
      },
    }),

    getTariffTaskId: builder.mutation<GetTariffTaskIdResponse, GetTariffTaskIdRequest>({
      query: (body) => ({
        url: "/filter/b598b6cd-c1f4-11ef-ae61-4ebc37dd1934/list?firstResult=0&maxResults=15",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
    // ==================== WORKSPACE ADMISSION DETAIL ====================
    getWorkSpaceAdmissionDetail: builder.query<GetWorkSpaceAdmissionResponse, string>({
      query: (id) => ({
        url: `/data/form/DeliverPlanRequestsReceived?maxResults=2000&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: DORM_TAGS.WORKSPACE_ADMISSION, id },
      ],
      transformResponse: (response: GetWorkSpaceAdmissionResponse) => {
        return transformResponse(response);
      },
    }),

    getAdmissionTaskId: builder.mutation<
      GetAdmissionTaskIdResponse,
      GetAdmissionTaskIdRequest
    >({
      query: (body) => ({
        url: "/filter/ae73cbaa-c1f4-11ef-ae61-4ebc37dd1934/list?firstResult=0&maxResults=1",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== ADMISSION BY PRICE ====================
    getAdmissionByPriceList: builder.query<
      GetAdmissionListResponse,
      GetAdmissionListRequest
    >({
      query: (params) => ({
        url: `/data/form/DeliverPlanList${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "PRICE_LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getAdmissionListByPriceCount: builder.query<CountDormResponse, CountDormRequest>({
      query: ({ type, priceId }) => ({
        url: `/data/form/DeliverPlanList/count?recordStatus_EQ=${type}&priceListId_EQ=${priceId}`,
        method: "GET",
      }),
      transformResponse: (response: CountDormResponse) => {
        return countTransformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "PRICE_COUNT" }],
    }),

    // ==================== PAYMENT TYPE ====================
    getReceivePaymentType: builder.query<GetReceivePaymentTypeResponse, number>({
      query: (deliverId) => ({
        url: `/data/form/ReceivePaymentType?maxResults=2000&firstResult=0&deliverPlanId_EQ=${deliverId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, deliverId) => [
        { type: DORM_TAGS.PAYMENT_TYPE, id: deliverId },
      ],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== MARITAL STATUS ====================
    getMaritalStatus: builder.query<GetMaritalStatusResponse, void>({
      query: () => ({
        url: "/data/form/MaritalStatus?maxResults=200&firstResult=0",
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.MARITAL_STATUS, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
  }),
});

export const {
  useLazyGetRequestsListQuery,
  useLazyGetRequestsListCountQuery,
  useLazyGetAdmissionProgramListQuery,
  useLazyGetDormRequestInformationQuery,
  useLazyGetDormRequestRoomListQuery,
  useLazyGetDormRequestRoomListCountQuery,
  useLazyGetDormRequestResidenceInfoQuery,
  useLazyGetDormRequestRoomOtherRequestListQuery,
  useLazyGetDormRequestRoomOtherRequestListCountQuery,
  useLazyGetDormUserRecordsListQuery,
  useLazyGetDormUserRecordsListCountQuery,
  useDormRequestsDeliverRoomMutation,
  useGetDormPendingReviewStatusMutation,
  useGetDormPendingPaymentStatusMutation,
  useGetDormCancellationStatusMutation,
  useDormRequestsStatusMutation,
  useLazyGetDormRequestBedListQuery,
  useLazyGetDormRequestPaymentInvoiceInfoQuery,
  useLazyGetDormRequestPaymentInvoiceTableQuery,
  useLazyGetDormRequestPaymentInvoicePaymentStatusQuery,
  useLazyGetWorkSpaceDormReceivedListQuery,
  useLazyGetWorkSpaceDormReceivedListCountQuery,
  useLazyGetWorkSpaceTariffReceivedListQuery,
  useLazyGetWorkSpaceTariffReceivedListCountQuery,
  useLazyGetWorkSpaceAdmissionReceivedListQuery,
  useLazyGetWorkSpaceAdmissionReceivedListCountQuery,
  useLazyGetWorkSpaceDormSendingDetailQuery,
  useGetDormitoryTaskIdMutation,
  useSubmitConfirmAndRejectAndReturnModalMutation,
  useLazyGetWorkSpaceTariffDetailQuery,
  useGetTariffTaskIdMutation,
  useLazyGetWorkSpaceAdmissionDetailQuery,
  useGetAdmissionTaskIdMutation,
  useLazyGetAdmissionByPriceListQuery,
  useLazyGetAdmissionListByPriceCountQuery,
  useLazyGetReceivePaymentTypeQuery,
  useLazyGetMaritalStatusQuery,
} = dormRequestsApi;
