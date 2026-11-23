import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { countTransformResponse } from "@infra/helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { DORM_TAGS, invalidatesList } from "@infra/states/redux/config";
import {
  CountResponse,
  GetRoomListCountRequests,
} from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  DormAdditionalInvoiceRequest,
  DormAdditionalInvoiceResponse,
  GetDormFinancialSituationRequest,
  GetDormFinancialSituationResponse,
  GetHabitantsEvacuationCountRequests,
  GetHabitantsEvacuationListRequest,
  GetHabitantsEvacuationListResponse,
  GetReasonAdditionsDeductionsRequests,
  GetReasonAdditionsDeductionsResponse,
  HabitantsEmptyBedRequest,
  HabitantsEmptyBedResponse,
  SendAllEvacuationRequest,
  SendAllEvacuationResponse,
} from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";
import {
  GetDormCheckingExcessDebtRequest,
  GetDormCheckingExcessDebtResponse,
} from "@pages/Dorm/Habitants/Evacuation/helper/components/DebtorsTab/@types/@debtorsTab";
import {
  GetHabitantExtraUserInformationResponse,
  GetHabitantUserInfoRequest,
  GetHabitantUserInfoResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FirstTabUserInfo/@types/@firstTabUserInfo";
import {
  GetHabitantAdmissionTabRequest,
  GetHabitantAdmissionTabResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";
import {
  GetHabitantNewIdAfterMovingRequest,
  GetHabitantNewIdAfterMovingResponse,
  GetHabitantsRoomRequest,
  GetHabitantsRoomResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/@types/@secondTabRoomInfo";
import {
  GetHabitantResidenceInfoRequest,
  GetHabitantResidenceInfoResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/helper/components/ResidentsInfoSection/@types/@residentsInfoSection";
import {
  AdminSubmitDisplacementRequest,
  AdminSubmitDisplacementResponse,
  GetBedListRequest,
  GetBedListResponse,
  GetRoomListRequest,
  GetRoomListResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/helper/drawer/DisplacementDrawerContent/@type/@displacementDrawerContent";
import {
  GetDormReceiveNotificationRequest,
  GetDormReceiveNotificationResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SeventhTabNotifications/@types/@seventhTabNotifications";
import {
  SendDormNotificationRequest,
  SendDormNotificationResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SeventhTabNotifications/modals/NotificationsModalContent/@types/@notificationsModalContent";
import {
  GetCalendarPresenceAbsenceRequest,
  GetCalendarPresenceAbsenceResponse,
  SendAbsencePresenceDrawerRequest,
  SendAbsencePresenceDrawerResponse,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SixthTabPresenceAbsence/@types/@sixthTabPresenceAbsence";
import {
  GetPresenceAbsenceDrawerDataRequest,
  GetPresenceAbsenceDrawerDataResponseTypes,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SixthTabPresenceAbsence/helper/drawer/PresenceAbsenceDrawerContent/@types/@presenceAbsenceDrawerContent";
import {
  GetHabitantsListCountRequest,
  GetHabitantsListRequest,
  GetHabitantsListResponse,
} from "@pages/Dorm/Habitants/HabitantsList/@types/@habitantsList";

import { dormApi } from "../../dormApi";

export const dormHabitantsApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== HABITANTS LIST ====================
    getHabitantsList: builder.query<GetHabitantsListResponse, GetHabitantsListRequest>({
      query: (params) => {
        return {
          url: `/data/form/ResidentInformationList${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response) => transformResponse(response),
      providesTags: [{ type: DORM_TAGS.HABITANTS, id: "LIST" }],
    }),

    getHabitantsListCount: builder.query<CountResponse, GetHabitantsListCountRequest>({
      query: (params) => {
        return {
          url: `/data/form/ResidentInformationList/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.HABITANTS, id: "COUNT" }],
    }),

    // ==================== HABITANT USER INFO (Tab 1) ====================
    getHabitantUserInfo: builder.query<
      GetHabitantUserInfoResponse,
      GetHabitantUserInfoRequest
    >({
      query: (params) => ({
        url: `/data/form/UserInformationResidents${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.HABITANTS, id: "USER_INFO" }],
    }),

    getHabitantExtraUserInformation: builder.mutation<
      GetHabitantExtraUserInformationResponse,
      number
    >({
      query: (id) => ({
        url: "/data/form/ExtraUserInformation/get?relation=2781e080e81e41819929529b07d20320",
        method: "POST",
        body: {
          _data_: {
            id: id,
          },
        },
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== HABITANT ROOM INFO (Tab 2) ====================
    getHabitantResidenceInfo: builder.query<
      GetHabitantResidenceInfoResponse,
      GetHabitantResidenceInfoRequest
    >({
      query: (params) => ({
        url: `/data/form/AllocatedRooms${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.HABITANTS_ROOM, id: "RESIDENCE_INFO" }],
    }),

    getHabitantsRoom: builder.query<GetHabitantsRoomResponse, GetHabitantsRoomRequest>({
      query: (params) => {
        return {
          url: `/data/form/RoomInformationForDormitory${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response) => transformResponse(response),
      providesTags: [{ type: DORM_TAGS.HABITANTS_ROOM, id: "LIST" }],
    }),

    getHabitantNewIdAfterMoving: builder.query<
      GetHabitantNewIdAfterMovingResponse,
      GetHabitantNewIdAfterMovingRequest
    >({
      query: (params) => ({
        url: `/data/form/FindingIdAfterMoving${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.DISPLACEMENT, id: "NEW_ID" }],
    }),

    getHabitantsRoomCount: builder.query<
      CountResponse,
      {
        AssociationCustomer_AssociationCustomerUser_firstName_IN?: string;
        AssociationBed_roomId_EQ?: string;
        AssociationCustomer_AssociationStudent_studentNumber_IN?: string;
        AssociationCustomer_AssociationCustomerUser_nationalCode_IN?: string;
        AssociationCustomer_AssociationCustomerUser_lastName_IN?: string;
      }
    >({
      query: (params) => {
        return {
          url: `/data/form/RoomInformationForDormitory/count?${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountResponse) => countTransformResponse(response),
      providesTags: [{ type: DORM_TAGS.HABITANTS_ROOM, id: "COUNT" }],
    }),

    getRoomList: builder.query<GetRoomListResponse, GetRoomListRequest>({
      query: (params) => ({
        url: `/data/form/ListOfRoomsForChoose${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.ROOM, id: "CHOOSE_LIST" }],
    }),

    getRoomListCount: builder.query<CountResponse, GetRoomListCountRequests>({
      query: (params) => ({
        url: `/data/form/ListOfRoomsForChoose/count${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.ROOM, id: "CHOOSE_COUNT" }],
    }),

    getBedList: builder.query<GetBedListResponse, GetBedListRequest>({
      query: (params) => ({
        url: `/data/form/ViewBedList${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.BED, id: "LIST" }],
    }),

    // ==================== DISPLACEMENT ====================
    adminSubmitDisplacement: builder.mutation<
      AdminSubmitDisplacementResponse,
      AdminSubmitDisplacementRequest
    >({
      query: (body) => ({
        url: "/data/form/MovingAdmin/start-process/MovingAdmin",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.DISPLACEMENT),
        ...invalidatesList(DORM_TAGS.HABITANTS_ROOM),
        ...invalidatesList(DORM_TAGS.HABITANTS),
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== ADMISSION TAB (Tab 4) ====================
    getHabitantAdmissionTab: builder.mutation<
      GetHabitantAdmissionTabResponse,
      GetHabitantAdmissionTabRequest
    >({
      query: (body) => ({
        url: "/data/form/DeliverPlanForDormitory/get?relation=f182f49870de4dac8034f990384d8df1",
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetHabitantAdmissionTabResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PRESENCE & ABSENCE (Tab 6) ====================
    getCalendarPresenceAbsence: builder.query<
      GetCalendarPresenceAbsenceResponse,
      GetCalendarPresenceAbsenceRequest
    >({
      query: (params) => ({
        url: `/data/form/GetAttendance${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.PRESENCE_ABSENCE, id: "CALENDAR" }],
    }),

    getPresenceAbsenceDrawerData: builder.mutation<
      GetPresenceAbsenceDrawerDataResponseTypes,
      GetPresenceAbsenceDrawerDataRequest
    >({
      query: (body) => ({
        url: "data/form/GetAttendance/get?relation=6241358feb384889aadb2e4f7e837481",
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetPresenceAbsenceDrawerDataResponseTypes) => {
        return transformObjectResponse(response);
      },
    }),

    sendAbsencePresenceDrawer: builder.mutation<
      SendAbsencePresenceDrawerResponse,
      SendAbsencePresenceDrawerRequest
    >({
      query: (body) => ({
        url: "data/form/EnterAttendance/start-process/EnterAttendance",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PRESENCE_ABSENCE),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== NOTIFICATIONS (Tab 7) ====================
    getDormReceiveNotification: builder.query<
      GetDormReceiveNotificationResponse,
      GetDormReceiveNotificationRequest
    >({
      query: (params) => ({
        url: `/data/form/ReceiveNotifications${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.NOTIFICATION, id: "LIST" }],
    }),

    sendDormNotification: builder.mutation<
      SendDormNotificationResponse,
      SendDormNotificationRequest
    >({
      query: (body) => ({
        url: "/data/form/SendNotification/start-process/SendNotification",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.NOTIFICATION),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== FINANCIAL ====================
    getDormFinancialSituation: builder.query<
      GetDormFinancialSituationResponse,
      GetDormFinancialSituationRequest
    >({
      query: (params) => ({
        url: `/data/form/FinancialSituation${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.FINANCIAL, id: "SITUATION" }],
    }),

    dormCheckingExcessDebt: builder.query<
      GetDormCheckingExcessDebtResponse,
      GetDormCheckingExcessDebtRequest
    >({
      query: (params) => ({
        url: `/data/form/CheckingExcessDebt${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.FINANCIAL, id: "EXCESS_DEBT" }],
    }),

    // ==================== EVACUATION ====================
    habitantsEmptyBed: builder.mutation<
      HabitantsEmptyBedResponse,
      HabitantsEmptyBedRequest
    >({
      query: (body) => ({
        url: "/data/form/EmptyBed/start-process/EmptyBed",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.EVACUATION),
        ...invalidatesList(DORM_TAGS.HABITANTS),
        ...invalidatesList(DORM_TAGS.HABITANTS_ROOM),
      ],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    dormAdditionalInvoice: builder.mutation<
      DormAdditionalInvoiceResponse,
      DormAdditionalInvoiceRequest
    >({
      query: (body) => ({
        url: "/data/form/AdditionalInvoice/start-process/AdditionalInvoice",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.INVOICE),
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getHabitantsEvacuationList: builder.query<
      GetHabitantsEvacuationListResponse,
      GetHabitantsEvacuationListRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/ResidentInformationList${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response) => transformResponse(response),
      providesTags: [{ type: DORM_TAGS.EVACUATION, id: "LIST" }],
    }),

    getHabitantsEvacuationCount: builder.query<
      CountResponse,
      GetHabitantsEvacuationCountRequests
    >({
      query: (params) => ({
        url: `/data/form/ResidentInformationList/count${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.EVACUATION, id: "COUNT" }],
    }),

    sendAllEvacuation: builder.mutation<
      SendAllEvacuationResponse,
      SendAllEvacuationRequest
    >({
      query: (body) => ({
        url: "/data/form/GroupEvacuation/start-process/GroupEvacuation",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.EVACUATION),
        ...invalidatesList(DORM_TAGS.HABITANTS),
      ],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getReasonAdditionsDeductions: builder.query<
      GetReasonAdditionsDeductionsResponse,
      GetReasonAdditionsDeductionsRequests
    >({
      query: (params) => ({
        url: `/data/form/ReasonAdditionsDeductions${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.FINANCIAL, id: "ADDITIONS_DEDUCTIONS" }],
    }),
  }),
});

export const {
  useLazyGetHabitantsListQuery,
  useLazyGetHabitantsListCountQuery,
  useLazyGetHabitantUserInfoQuery,
  useGetHabitantExtraUserInformationMutation,
  useLazyGetHabitantResidenceInfoQuery,
  useLazyGetHabitantsRoomQuery,
  useLazyGetHabitantsRoomCountQuery,
  useLazyGetHabitantNewIdAfterMovingQuery,
  useLazyGetRoomListQuery,
  useLazyGetRoomListCountQuery,
  useLazyGetBedListQuery,
  useGetHabitantAdmissionTabMutation,
  useLazyGetCalendarPresenceAbsenceQuery,
  useLazyGetDormReceiveNotificationQuery,
  useSendDormNotificationMutation,
  useAdminSubmitDisplacementMutation,
  useGetPresenceAbsenceDrawerDataMutation,
  useSendAbsencePresenceDrawerMutation,
  useLazyGetDormFinancialSituationQuery,
  useLazyDormCheckingExcessDebtQuery,
  useHabitantsEmptyBedMutation,
  useDormAdditionalInvoiceMutation,
  useLazyGetHabitantsEvacuationListQuery,
  useLazyGetHabitantsEvacuationCountQuery,
  useSendAllEvacuationMutation,
  useLazyGetReasonAdditionsDeductionsQuery,
} = dormHabitantsApi;
