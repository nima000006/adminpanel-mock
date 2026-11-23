import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import {
  DormAddPropertySectionRequest,
  DormAddPropertySectionResponse,
  GetFloorInformationResponse,
  acceptRequestByMangerRequest,
  acceptRequestByMangerResponse,
  CreateDormitoryPlanRequest,
  SetDormitoryPolicyPaymentRequest,
  RejectPendingUserResponse,
  ManualDormRegistrationResponse,
  ManualDormRegistrationRequest,
  ManualRevertRequestResponse,
  ManualRevertRequestRequest,
  GetAllPaidFactorDetailsOfRequestIdResponse,
  BulkRevertRequestResponse,
  BulkRevertRequestRequest,
  FactorManualPaymentResponse,
  FactorManualPaymentRequest,
} from "./models/roomApi.model";
import {
  ListOfManagersDormDataResponse,
  TransferByAddBedRequest,
  TransferUserWithoutExitRequest,
  TransferUserWithoutExitResponse,
} from "../../../../components/Modals/Dorm/MovingRequestModal/@types/@movingRequestModal";
import {
  DirectTransferRequest,
  DirectTransferResponse,
  GetPersonInRoomByRoomIdRequest,
  GetPersonInRoomByRoomIdResponse,
} from "../../../../components/Modals/Dorm/TransferRequestModal/@types/@transferRequestModal";
import { GetListOfDormsResponse } from "../../../../pages/Reports/dorms/DormsReportList/@types/@dormsReportList";
import { ListOfRequestDormitoryResponse } from "../../../../pages/Reports/dorms/DormsRequests/DormReportRequests/ActiveDormReportRequests/@types/@activeDormReportRequests";
import {
  GetListOfDormResidentsRequest,
  GetListOfDormResidentsResponse,
} from "../../../../pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";
import { GetBuildingInformationResponse } from "../../../../pages/Room/Dorm/CreateApartment/@types/@createApartment";
import {
  CreateBuildingFirstTabRequest,
  CreateBuildingFirstTabResponse,
} from "../../../../pages/Room/Dorm/CreateApartment/helper/components/CreateApartmentFirstTab/@types/@createApartmentFirstTab";
import {
  CreateBuildingSecondTabRequest,
  CreateBuildingSecondTabResponse,
} from "../../../../pages/Room/Dorm/CreateApartment/helper/components/CreateApartmentSecondTab/@types/@createApartmentSecondTab";
import { GetDormInformationResponse } from "../../../../pages/Room/Dorm/CreateDorm/@types/@createDorm";
import {
  CreateDormFirstTabRequest,
  CreateDormFirstTabResponse,
  CreateDormitoryPlanResponse,
  EditDormThirdTabRequest,
  SetDormitoryPolicyPaymentResponse,
} from "../../../../pages/Room/Dorm/CreateDorm/helper/components/CreateDormFirstTab/@types/@createDormFirstTab";
import { CreateDormSecondTabRequest } from "../../../../pages/Room/Dorm/CreateDorm/helper/components/CreateDormSecondTab/@types/@createDormSecondTab";
import { CreateDormThirdTabRequest } from "../../../../pages/Room/Dorm/CreateDorm/helper/components/CreateDormThirdTab/@types/@createDormThirdTab";
import {
  CreateFloorRequest,
  CreateFloorResponse,
  EditFloorRequest,
} from "../../../../pages/Room/Dorm/CreateFloor/@types/@createFloor";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  EditRoomRequest,
  GetRoomInformationResponse,
} from "../../../../pages/Room/Dorm/CreateRoom/@types/@createRoom";
import {
  CancelDormitoryFactorRequest,
  CancelDormitoryFactorResponse,
  DormUpdateFactorRequest,
  DormUpdateFactorResponse,
  GetDormFactorListRequest,
  GetDormFactorListResponse,
} from "../../../../pages/Room/Dorm/DormFactors/@types/@dormFactors";
import {
  ManualPaymentSuccessRequest,
  ManualPaymentSuccessResponse,
} from "../../../../pages/Room/Requests/PendingRequests/@types/@roomPendingRequests";

export const roomApi = createApi({
  reducerPath: "api/room",
  tagTypes: ["api/room"],
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_URL_ROOM }),
  endpoints: (builder) => ({
    getListOfRoomRequest: builder.mutation<ListOfRequestDormitoryResponse, any>({
      query: () => ({
        url: "v1/dormitory/ListOfRequesDormitorytFromUser",
        method: "POST",
      }),
      invalidatesTags: ["api/room"],
    }),
    rejectUser: builder.mutation<RejectPendingUserResponse, number>({
      query: (id) => ({
        url: `v1/dormitory/ManagerSetCanselRequest?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    listOfManagersDormData: builder.mutation<ListOfManagersDormDataResponse, any>({
      query: (id) => ({
        url: `v1/dormitory/ManagerListOfBuildingAndFloorAndRoom?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    acceptRequestByManager: builder.mutation<
      acceptRequestByMangerResponse,
      acceptRequestByMangerRequest
    >({
      query: (data) => ({
        url: "v1/dormitory/ManagerAcceptRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api/room"],
    }),
    getListOfDormResidents: builder.mutation<
      GetListOfDormResidentsResponse,
      GetListOfDormResidentsRequest
    >({
      query: ({ semester, branchCode }) => ({
        url: `v1/dormitory/PersonInDormitory?term=${semester}&branchCode=${branchCode}`,
        method: "POST",
      }),
      invalidatesTags: ["api/room"],
    }),
    getListOfDormResidentsWithStatusCode: builder.mutation<
      GetListOfDormResidentsResponse,
      {
        statusCode?: number;
        semester: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
      }
    >({
      query: ({ statusCode, semester }) => ({
        url: `v1/dormitory/ListOfRequesDormitorytFromUserWithStatuscode?statusid=${statusCode}&term=${semester}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    DeliveredToResident: builder.mutation<any, any>({
      query: (id) => ({
        url: "v1/dormitory/ManagerDeliveryRequest",
        method: "POST",
        body: { reqid: id },
      }),
      invalidatesTags: ["api/room"],
    }),
    getListOfDorms: builder.mutation<GetListOfDormsResponse, void>({
      query: () => ({
        url: "v1/dormitory/DormitoryListForManger",
        method: "POST",
      }),
      invalidatesTags: ["api/room"],
    }),
    createFloor: builder.mutation<CreateFloorResponse, CreateFloorRequest>({
      query: (body) => ({
        url: "v1/dormitory/CreateFloorBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createDormFirstTab: builder.mutation<
      CreateDormFirstTabResponse,
      CreateDormFirstTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateDormitoryBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    editFloor: builder.mutation<CreateFloorResponse, EditFloorRequest>({
      query: (body) => ({
        url: "v1/dormitory/EditFloorBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createDormSecondTab: builder.mutation<
      CreateDormFirstTabResponse,
      CreateDormSecondTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateDormitoryCommentSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: (body) => ({
        url: "v1/dormitory/CreateRoomBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createDormThirdTab: builder.mutation<
      CreateDormFirstTabResponse,
      CreateDormThirdTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateDormitoryAddTrainingParametersBranchSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    editRoom: builder.mutation<CreateRoomResponse, EditRoomRequest>({
      query: (body) => ({
        url: "v1/dormitory/EditRoomBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    editDormFirstTab: builder.mutation<
      CreateDormFirstTabResponse,
      EditDormThirdTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/EditDormitoryBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    dormAddPropertySection: builder.mutation<
      DormAddPropertySectionResponse,
      DormAddPropertySectionRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateDormitoryAddPropertiesSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    getDormInformation: builder.mutation<GetDormInformationResponse, string>({
      query: (id) => ({
        url: `v1/dormitory/DormitoryGetInformation?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    getRoomInformation: builder.mutation<GetRoomInformationResponse, string>({
      query: (id) => ({
        url: `v1/dormitory/RoomGetInformation?roomId=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    createBuildingFirstTab: builder.mutation<
      CreateBuildingFirstTabResponse,
      CreateBuildingFirstTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateBuildingBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    editBuildingFirstTab: builder.mutation<
      CreateBuildingFirstTabResponse,
      CreateBuildingFirstTabRequest & { buildingId: number }
    >({
      query: (body) => ({
        url: "v1/dormitory/EditBuildingBaseSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createBuildingSecondTab: builder.mutation<
      CreateBuildingSecondTabResponse,
      CreateBuildingSecondTabRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateBuildingCommentSection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    getBuildingInformation: builder.mutation<GetBuildingInformationResponse, string>({
      query: (id) => ({
        url: `v1/dormitory/BuildingGetInformation?buildingId=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    getFloorInformation: builder.mutation<GetFloorInformationResponse, string>({
      query: (id) => ({
        url: `v1/dormitory/FloorGetInformation?FloorId=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/room"],
    }),
    transferUserWithoutExit: builder.mutation<
      TransferUserWithoutExitResponse,
      TransferUserWithoutExitRequest
    >({
      query: (body) => ({
        url: "ManageMovement/TransferEnterWithoutExit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    TransferByAddBed: builder.mutation<
      TransferUserWithoutExitResponse,
      TransferByAddBedRequest
    >({
      query: (body) => ({
        url: "ManageMovement/TransferByAddBed",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    getPersonInRoomByRoomId: builder.query<
      GetPersonInRoomByRoomIdResponse,
      GetPersonInRoomByRoomIdRequest
    >({
      query: ({ roomId: id, term }) => ({
        url: `ManageMovement/GetPersonInRoom?roomId=${id}&term=${term}`,
        method: "GET",
      }),
      providesTags: ["api/room"],
    }),
    directTransfer: builder.mutation<DirectTransferResponse, DirectTransferRequest>({
      query: (body) => ({
        url: "ManageMovement/DirectTransfer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    createDormitoryPlan: builder.mutation<
      CreateDormitoryPlanResponse,
      CreateDormitoryPlanRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/CreateDormitoryPlan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    SetDormitoryPolicyPayment: builder.mutation<
      SetDormitoryPolicyPaymentResponse,
      SetDormitoryPolicyPaymentRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/SetDormitoryPalicyPayment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/room"],
    }),
    getDormFactorList: builder.mutation<
      GetDormFactorListResponse,
      GetDormFactorListRequest
    >({
      query: ({ dormitoryId }) => ({
        url: "v1/dormitory/DormitoryFactorListForManger",
        method: "POST",
        body: { dormitoryId },
      }),
      invalidatesTags: ["api/room"],
    }),
    updateFactor: builder.mutation<DormUpdateFactorResponse, DormUpdateFactorRequest>({
      query: (body) => ({
        url: "v1/dormitory/updateFactor",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/room"],
    }),
    manualPaymentSuccess: builder.mutation<
      ManualPaymentSuccessResponse,
      ManualPaymentSuccessRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/manualPaymentSuccess",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/room"],
    }),
    manualDormRegistration: builder.mutation<
      ManualDormRegistrationResponse,
      ManualDormRegistrationRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/manualRegistration",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/room"],
    }),
    manualRevertRequest: builder.mutation<
      ManualRevertRequestResponse,
      ManualRevertRequestRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/manualRevertRequest",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/room"],
    }),
    bulkRevertRequest: builder.mutation<
      BulkRevertRequestResponse,
      BulkRevertRequestRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/manualBulkRevertRequest",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/room"],
    }),
    getAllPaidFactorDetailsOfRequestId: builder.query<
      GetAllPaidFactorDetailsOfRequestIdResponse,
      number
    >({
      query: (id) => ({
        url: `v1/dormitory/getAllPaidFactorDetailsOfRequestId?requestId=${id}`,
        method: "GET",
      }),
      providesTags: ["api/room"],
    }),
    factorManualPayment: builder.mutation<
      FactorManualPaymentResponse,
      FactorManualPaymentRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/FactorManualPayment",
        method: "POST",
        body,
      }),
    }),
    cancelDormitoryFactor: builder.mutation<
      CancelDormitoryFactorResponse,
      CancelDormitoryFactorRequest
    >({
      query: (body) => ({
        url: "v1/dormitory/approveFactorStatus",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetListOfRoomRequestMutation,
  useRejectUserMutation,
  useListOfManagersDormDataMutation,
  useAcceptRequestByManagerMutation,
  useGetListOfDormResidentsMutation,
  useGetListOfDormResidentsWithStatusCodeMutation,
  useDeliveredToResidentMutation,
  useGetListOfDormsMutation,
  useCreateFloorMutation,
  useEditFloorMutation,
  useCreateDormFirstTabMutation,
  useCreateDormSecondTabMutation,
  useCreateDormThirdTabMutation,
  useGetDormInformationMutation,
  useEditDormFirstTabMutation,
  useDormAddPropertySectionMutation,
  useCreateBuildingFirstTabMutation,
  useCreateBuildingSecondTabMutation,
  useEditBuildingFirstTabMutation,
  useGetBuildingInformationMutation,
  useCreateRoomMutation,
  useEditRoomMutation,
  useGetRoomInformationMutation,
  useGetFloorInformationMutation,
  useTransferUserWithoutExitMutation,
  useTransferByAddBedMutation,
  useLazyGetPersonInRoomByRoomIdQuery,
  useDirectTransferMutation,
  useCreateDormitoryPlanMutation,
  useSetDormitoryPolicyPaymentMutation,
  useGetDormFactorListMutation,
  useUpdateFactorMutation,
  useManualPaymentSuccessMutation,
  useManualDormRegistrationMutation,
  useManualRevertRequestMutation,
  useLazyGetAllPaidFactorDetailsOfRequestIdQuery,
  useBulkRevertRequestMutation,
  useFactorManualPaymentMutation,
  useCancelDormitoryFactorMutation,
} = roomApi;
