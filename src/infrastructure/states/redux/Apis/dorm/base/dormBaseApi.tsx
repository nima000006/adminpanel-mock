import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  CascaderNode,
  transformDormitoryTreeViewData,
} from "@infra/helpers/NetworkHelpers/commonTransformers/commonTransformers";
import { countTransformResponse } from "@infra/helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { DORM_TAGS, invalidatesList, providesCount } from "@infra/states/redux/config";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  CreateDormAssignmentTypesRequest,
  CreateDormAssignmentTypesResponse,
  GetAssignmentTypeRequest,
  GetAssignmentTypeResponse,
  UpdateDormAssignmentTypesRequest,
  UpdateDormAssignmentTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormAssignmentTypes/@types/@dormAssignmentTypes";
import {
  CreateDormStatusEntityTypesRequest,
  CreateDormStatusEntityTypesResponse,
  GetStatusEntityTypeRequest,
  GetStatusEntityTypeResponse,
  UpdateDormStatusEntityTypesRequest,
  UpdateDormStatusEntityTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormAvailableStatusTypes/@types/@dormAvailableStatusTypes";
import {
  CreateDormBedStatusTypesRequest,
  CreateDormBedStatusTypesResponse,
  GetBedStatusTypeRequest,
  GetBedStatusTypeResponse,
  UpdateDormBedStatusTypesRequest,
  UpdateDormBedStatusTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormBedStatusTypes/@types/@dormBedStatusTypes";
import {
  CreateDormBedTypesRequest,
  CreateDormBedTypesResponse,
  UpdateDormBedTypesRequest,
  UpdateDormBedTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormBedType/@types/@dormBedTypes";
import {
  CreateDormFacilitiesTypeRequest,
  CreateDormFacilitiesTypeResponse,
  UpdateDormFacilitiesRequest,
  UpdateDormFacilitiesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFacilitiesTypes/_shared/@types/@dormFacilitiesTypes";
import {
  CreateDormFeedbackTypeResponse,
  CreateDormFeedbackTypesRequest,
  GetDormFeedbackTypesRequest,
  GetDormFeedbackTypesResponse,
  UpdateDormFeedbackTypesRequest,
  UpdateDormFeedbackTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFeedbackTypes/@types/@dormFeedbackTypes";
import {
  CreateDormStatusTypesRequest,
  CreateDormStatusTypesResponse,
  GetDormStatusTypesRequest,
  GetDormStatusTypesResponse,
  UpdateDormStatusTypesRequest,
  UpdateDormStatusTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormFormStatusTypes/@types/@dormFormStatusTypes";
import {
  CreateDormGenderTypesRequest,
  CreateDormGenderTypesResponse,
  UpdateDormGenderTypesRequest,
  UpdateDormGenderTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormGenderType/@types/@dormGenderTypes";
import {
  CreateDormManagementTypesRequest,
  CreateDormManagementTypesResponse,
  UpdateDormManagementTypesRequest,
  UpdateDormManagementTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormManagementTypes/@types/@dormManagementTypes";
import {
  CreateDormNearByPlacesTypeResponse,
  CreateDormNearByPlacesTypesRequest,
  UpdateDormNearByPlacesTypesRequest,
  UpdateDormNearByPlacesTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormNearByPlacesTypes/@types/@dormNearByPlacesTypes";
import {
  CreateDormPaymentMethodTypesRequest,
  CreateDormPaymentMethodTypesResponse,
  UpdateDormPaymentMethodTypesRequest,
  UpdateDormPaymentMethodTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPaymentMethodTypes/@types/@dormPaymentMethodTypes";
import {
  CreateDormPaymentTypesRequest,
  CreateDormPaymentTypesResponse,
  UpdateDormPaymentTypesRequest,
  UpdateDormPaymentTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPaymentTypes/@types/@dormPaymentTypes";
import {
  CreateDormPresenceAndAbsenceTypeResponse,
  CreateDormPresenceAndAbsenceTypesRequest,
  GetDormPresenceAndAbsenceTypesRequest,
  GetDormPresenceAndAbsenceTypesResponse,
  UpdateDormPresenceAndAbsenceTypesRequest,
  UpdateDormPresenceAndAbsenceTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPresenceAndAbsenceTypes/@types/@dormPresenceAndAbsenceTypes";
import {
  CreateDormQualityTypesRequest,
  CreateDormQualityTypesResponse,
  UpdateDormQualityTypesRequest,
  UpdateDormQualityTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormQualityGradeTypes/@types/@dormQualityGradeTypes";
import {
  CreateDormRelationTypesRequest,
  CreateDormRelationTypesResponse,
  GetRelationTypeRequest,
  GetRelationTypeResponse,
  UpdateDormRelationTypesRequest,
  UpdateDormRelationTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRelationTypes/@types/@dormRelationTypes";
import {
  CreateDormRequestTypesRequest,
  CreateDormRequestTypesResponse,
  GetRequestTypeRequest,
  GetRequestTypeResponse,
  UpdateDormRequestTypesRequest,
  UpdateDormRequestTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRequestTypes/@types/@dormRequestTypes";
import {
  CreateDormReservationTypesRequest,
  CreateDormReservationTypesResponse,
  UpdateDormReservationTypesRequest,
  UpdateDormReservationTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormReserveTypes/@types/@dormReserveTypes";
import {
  CreateDormResidenceTypeResponse,
  CreateDormResidenceTypesRequest,
  UpdateDormResidenceTypesRequest,
  UpdateDormResidenceTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormResidenceTypes/@types/@dormResidenceTypes";
import {
  CreateDormRoomTypesRequest,
  CreateDormRoomTypesResponse,
  UpdateDormRoomTypesRequest,
  UpdateDormRoomTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRoomTypes/@types/@dormRoomTypes";
import {
  CreateDormRuleAndPrincipleTypesRequest,
  CreateDormRuleAndPrincipleTypesResponse,
  GetRuleAndPrincipleTypeRequest,
  GetRuleAndPrincipleTypeResponse,
  UpdateDormRuleAndPrincipleTypesRequest,
  UpdateDormRuleAndPrincipleTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormRulesAndRegulationsTypes/@types/@dormRulesAndRegulationsTypes";
import {
  CreateDormScheduleTypesRequest,
  CreateDormScheduleTypesResponse,
  UpdateDormScheduleTypesRequest,
  UpdateDormScheduleTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormScheduleTypes/@types/@dormScheduleTypes";
import {
  CreateDormSemesterTypesRequest,
  CreateDormSemesterTypesResponse,
  DormSemesterCountRequest,
  DormSemesterCountResponse,
  DormSemesterRequest,
  DormSemesterResponse,
  UpdateDormSemesterTypesRequest,
  UpdateDormSemesterTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSemesterTypes/@types/@dormSemesterTypes";
import {
  CreateDormSpecialConditionsTypesRequest,
  CreateDormSpecialConditionsTypesResponse,
  UpdateDormSpecialConditionsTypesRequest,
  UpdateDormSpecialConditionsTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSpecialConditionsTypes/@types/@dormSpecialConditionsTypes";
import {
  CreateDormSubsetRulesRequest,
  CreateDormSubsetRulesResponse,
  UpdateDormSubsetRulesRequest,
  UpdateDormSubsetRulesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSubsetsRulesAndRegulations/helper/@types/@dormSubsetRulesType";
import {
  CreateDormUserGroupTypesRequest,
  CreateDormUserGroupTypesResponse,
  UpdateDormUserGroupTypesRequest,
  UpdateDormUserGroupTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormUserGroupTypes/@types/@dormUserGroupTypes";
import {
  GetAdmissionAwaitingReviewListCountRequest,
  GetAdmissionAwaitingReviewListRequest,
  GetAdmissionListCountRequest,
  GetAdmissionListRequest,
  GetAdmissionListResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionList/_shared/@types/@admissionListTab";
import {
  GetBuildingsOfDormitoryRequest,
  GetBuildingsOfDormitoryResponse,
  GetDormListByBranchIdRequest,
  GetDormListByBranchIdResponse,
  GetEducationGradeRequest,
  GetEducationGradeResponse,
  GetFeasibilityRequest,
  GetFeasibilityResponse,
  GetFloorsOfBuildingRequest,
  GetFloorsOfBuildingResponse,
  GetManagementTypeRequest,
  GetManagementTypeResponse,
  GetNationalityRequest,
  GetNationalityResponse,
  GetNumberInstallmentsRequest,
  GetNumberInstallmentsResponse,
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
  GetPaymentTypeRequest,
  GetPaymentTypeResponse,
  GetReservationTypeRequest,
  GetReservationTypeResponse,
  GetRoomsOfFloorRequest,
  GetRoomsOfFloorResponse,
  GetSchedulingTypeRequest,
  GetSchedulingTypeResponse,
  GetSpecialStatusRequest,
  GetSpecialStatusResponse,
  GetUserGroupRequest,
  GetUserGroupResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import {
  CreateInActiveTariffRequest,
  CreateInActiveTariffResponse,
  GetConnectionWithTariffRequest,
  GetConnectionWithTariffResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/BasicInfoSection/@types/basicInfoSection";
import {
  GetAllCurrencyRequest,
  GetAllCurrencyResponse,
  GetAllDormitoryRequest,
  GetAllDormitoryResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/BasicInfoStep/@types/@basicInfoStepPropsType";
import { GetTariffBasicInfoDetailResponse } from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/tariffBasicInfoTab";
import {
  CountDormResponse,
  GetTariffListRequest,
  GetTariffListResponse,
} from "@pages/Dorm/Planning/Tariff/TariffList/helper/components/ActiveTab/@types/@activeTab";
import {
  getTariffListAwaitingReviewCountRequest,
  getTariffListAwaitingReviewRequest,
} from "@pages/Dorm/Planning/Tariff/TariffList/helper/components/AwaitingReviewTab/@types/@awaitingReviewTab";
import {
  GetDormBedTypesRequest,
  GetDormBedTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/@types/@bedCreateAndModify";
import {
  getARoomParentInDormRequest,
  getARoomParentInDormResponse,
  GetDormGenderTypesRequest,
  GetDormGenderTypesResponse,
  GetDormQualityTypesRequest,
  GetDormQualityTypesResponse,
  GetDormRulesTypesRequest,
  GetDormRulesTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";
import {
  GetDormResidenceFacilityListRequest,
  GetDormResidenceFacilityListResponse,
  GetDormResidenceFacilityTypesRequest,
  GetDormResidenceFacilityTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";
import {
  GetDormRoomTypesRequest,
  GetDormRoomTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/@types/@roomCreateAndModify";
import {
  getAllDormsCountRequest,
  getAllDormsRequest,
  getAllDormsResponse,
} from "@pages/Dorm/Residence/DormsMainList/@types/@dormsMainList";

import { dormApi } from "../../dormApi";

export const dormBaseApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== DORMS ====================
    getAllDorms: builder.query<getAllDormsResponse, getAllDormsRequest>({
      query: (params) => ({
        url: `/data/form/ListOfHostels${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
      providesTags: [{ type: DORM_TAGS.DORM, id: "LIST" }],
    }),

    getAllDormsCount: builder.query<CountResponse, getAllDormsCountRequest>({
      query: (params) => ({
        url: `/data/form/ListOfHostels/count${createQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
      providesTags: providesCount(DORM_TAGS.DORM),
    }),

    // ==================== ADMISSION ====================
    getAdmissionList: builder.query<GetAdmissionListResponse, GetAdmissionListRequest>({
      query: (params) => {
        return {
          url: `/data/form/DeliverPlanList${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "LIST" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getAdmissionListCount: builder.query<CountDormResponse, GetAdmissionListCountRequest>(
      {
        query: (params) => {
          return {
            url: `/data/form/DeliverPlanList/count${createQueryString(params)}`,
            method: "GET",
          };
        },
        transformResponse: (response: CountDormResponse) =>
          countTransformResponse(response),
        providesTags: providesCount(DORM_TAGS.ADMISSION),
      }
    ),

    getAdmissionAwaitingReview: builder.query<
      GetAdmissionListResponse,
      GetAdmissionAwaitingReviewListRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/DeliverPlanList${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "AWAITING_REVIEW" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getAdmissionAwaitingReviewCount: builder.query<
      CountDormResponse,
      GetAdmissionAwaitingReviewListCountRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/DeliverPlanList/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountDormResponse) =>
        countTransformResponse(response),
      providesTags: [
        { type: DORM_TAGS.ADMISSION, id: "AWAITING_REVIEW_COUNT" },
        { type: DORM_TAGS.ADMISSION, id: "LIST" },
      ],
    }),

    // ==================== TARIFF ====================
    getTariffList: builder.query<GetTariffListResponse, GetTariffListRequest>({
      query: (params) => {
        return {
          url: `/data/form/PriceList${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "LIST" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getTariffListCount: builder.query<
      CountDormResponse,
      {
        recordStatus_EQ: number;
        title_LIKE?: string;
        AssociationDormitory_title_LIKE?: string;
        sortings?: string;
        AssociationBranchid_AssociationCategoryRegion_parentId_IN?: string;
        AssociationBranchid_regionId_IN?: string;
        branchId_IN?: string;
        dormitoryId_IN?: string;
      }
    >({
      query: (params) => {
        return {
          url: `/data/form/PriceList/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountDormResponse) => {
        return countTransformResponse(response);
      },
      providesTags: providesCount(DORM_TAGS.TARIFF),
    }),

    getTariffListAwaitingReview: builder.query<
      GetTariffListResponse,
      getTariffListAwaitingReviewRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/PriceList${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "AWAITING_REVIEW" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getTariffListAwaitingReviewCount: builder.query<
      CountDormResponse,
      getTariffListAwaitingReviewCountRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/PriceList/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [
        { type: DORM_TAGS.TARIFF, id: "AWAITING_REVIEW_COUNT" },
        { type: DORM_TAGS.TARIFF, id: "LIST" },
      ],
      transformResponse: (response: CountDormResponse) => {
        return countTransformResponse(response);
      },
    }),

    getTariffBasicInfoDetail: builder.query<GetTariffBasicInfoDetailResponse, string>({
      query: (id) => ({
        url: `/data/form/TariffViewBasicInformation?maxResults=2000&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: DORM_TAGS.TARIFF, id }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getConnectionWithTariff: builder.query<
      GetConnectionWithTariffResponse,
      GetConnectionWithTariffRequest
    >({
      query: (params) => ({
        url: `/data/form/TariffConnection${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "CONNECTION" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createInActiveTariff: builder.mutation<
      CreateInActiveTariffResponse,
      CreateInActiveTariffRequest
    >({
      query: (body) => ({
        url: "/data/form/DisablePriceList/start-process/DisablePriceList",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.TARIFF),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== DORMITORY & CURRENCY ====================
    getAllDormitory: builder.query<GetAllDormitoryResponse, GetAllDormitoryRequest>({
      query: (params) => ({
        url: `/data/form/Dormitory${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.DORMITORY, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getAllCurrency: builder.query<GetAllCurrencyResponse, GetAllCurrencyRequest>({
      query: (params) => ({
        url: `/data/form/CurrencyType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CURRENCY, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== MANAGEMENT TYPE ====================
    getManagementType: builder.query<GetManagementTypeResponse, GetManagementTypeRequest>(
      {
        query: (params) => ({
          url: `/data/form/ManagementType${createQueryString(params)}`,
          method: "GET",
        }),
        providesTags: [{ type: DORM_TAGS.MANAGEMENT_TYPE, id: "LIST" }],
        transformResponse: (response) => {
          return transformResponse(response);
        },
      }
    ),

    createDormManagementTypes: builder.mutation<
      CreateDormManagementTypesResponse,
      CreateDormManagementTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/ManagementType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.MANAGEMENT_TYPE),
      transformResponse: (response: CreateDormManagementTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormManagementTypes: builder.mutation<
      UpdateDormManagementTypesResponse,
      UpdateDormManagementTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/ManagementType/73f5330174f249d2b9828b8ec1252fa2/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.MANAGEMENT_TYPE),
      transformResponse: (response: UpdateDormManagementTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== SCHEDULING TYPE ====================
    getSchedulingType: builder.query<GetSchedulingTypeResponse, GetSchedulingTypeRequest>(
      {
        query: (params) => ({
          url: `/data/form/SchedulingType${createQueryString(params)}`,
          method: "GET",
        }),
        providesTags: [{ type: DORM_TAGS.SCHEDULING_TYPE, id: "LIST" }],
        transformResponse: (response) => {
          return transformResponse(response);
        },
      }
    ),

    // ==================== RESERVATION TYPE ====================
    getReservationType: builder.query<
      GetReservationTypeResponse,
      GetReservationTypeRequest
    >({
      query: (params) => ({
        url: `/data/form/ReservationType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RESERVATION_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormReservationTypes: builder.mutation<
      CreateDormReservationTypesResponse,
      CreateDormReservationTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/ReservationType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESERVATION_TYPE),
      transformResponse: (response: CreateDormReservationTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormReservationTypes: builder.mutation<
      UpdateDormReservationTypesResponse,
      UpdateDormReservationTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/ReservationType/cf0792f4fdb54d10882b7ec97fbb523b/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESERVATION_TYPE),
      transformResponse: (response: UpdateDormReservationTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PAYMENT TYPE & METHOD ====================
    getPaymentType: builder.query<GetPaymentTypeResponse, GetPaymentTypeRequest>({
      query: (params) => ({
        url: `/data/form/PaymentType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.PAYMENT_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getPaymentMethod: builder.query<GetPaymentMethodResponse, GetPaymentMethodRequest>({
      query: (params) => ({
        url: `/data/form/PaymentMethod${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.PAYMENT_METHOD, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== USER GROUP & LOOKUPS ====================
    getUserGroup: builder.query<GetUserGroupResponse, GetUserGroupRequest>({
      query: (params) => ({
        url: `/data/form/UserGroup${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.USER_GROUP, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getNationality: builder.query<GetNationalityResponse, GetNationalityRequest>({
      query: (params) => ({
        url: `/data/form/Nationality${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.NATIONALITY, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getSpecialStatus: builder.query<GetSpecialStatusResponse, GetSpecialStatusRequest>({
      query: (params) => ({
        url: `/data/form/SpecialStatus${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.SPECIAL_STATUS, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getEducationGrade: builder.query<GetEducationGradeResponse, GetEducationGradeRequest>(
      {
        query: (params) => ({
          url: `/data/form/Grade${createQueryString(params)}`,
          method: "GET",
        }),
        providesTags: [{ type: DORM_TAGS.EDUCATION_GRADE, id: "LIST" }],
        transformResponse: (response) => {
          return transformResponse(response);
        },
      }
    ),

    getFeasibility: builder.query<GetFeasibilityResponse, GetFeasibilityRequest>({
      query: (params) => ({
        url: `/data/form/Feasibility${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FEASIBILITY, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getNumberInstallments: builder.query<
      GetNumberInstallmentsResponse,
      GetNumberInstallmentsRequest
    >({
      query: (params) => ({
        url: `/data/form/NumberInstallments${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.NUMBER_INSTALLMENTS, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== BUILDING STRUCTURE ====================
    getDormListByBranchId: builder.query<
      GetDormListByBranchIdResponse,
      GetDormListByBranchIdRequest
    >({
      query: (params) => ({
        url: `/data/form/Dormitory${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.DORMITORY, id: "BY_BRANCH" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getBuildingsOfDormitory: builder.query<
      GetBuildingsOfDormitoryResponse,
      GetBuildingsOfDormitoryRequest
    >({
      query: (params) => ({
        url: `/data/form/GetBuildingsOfDormitory${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.BUILDING, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getFloorsOfBuilding: builder.query<
      GetFloorsOfBuildingResponse,
      GetFloorsOfBuildingRequest
    >({
      query: (params) => ({
        url: `/data/form/GetFloorsOfBuilding${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FLOOR, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getRoomsOfFloor: builder.query<GetRoomsOfFloorResponse, GetRoomsOfFloorRequest>({
      query: (params) => ({
        url: `/data/form/GetRoomsOfFloor?${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ROOM, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== FACILITIES ====================
    getDormResidenceFacilityTypes: builder.query<
      GetDormResidenceFacilityTypesResponse,
      GetDormResidenceFacilityTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/FacilityTypee${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FACILITY, id: "TYPES" }],
      transformResponse: (response: GetDormResidenceFacilityTypesResponse) => {
        return transformResponse(response);
      },
    }),

    getDormResidenceFacilityListWithTypeId: builder.query<
      GetDormResidenceFacilityListResponse,
      GetDormResidenceFacilityListRequest
    >({
      query: (params) => ({
        url: `/data/form/FacilityList${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FACILITY, id: "BY_TYPE" }],
      transformResponse: (response: GetDormResidenceFacilityListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormResidenceFacilityList: builder.query<
      GetDormResidenceFacilityListResponse,
      GetDormResidenceFacilityListRequest
    >({
      query: (params) => ({
        url: `/data/form/FacilityList${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FACILITY, id: "LIST" }],
      transformResponse: (response: GetDormResidenceFacilityListResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== GENDER TYPE ====================
    getDormGenderTypes: builder.query<
      GetDormGenderTypesResponse,
      GetDormGenderTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/Gender${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.GENDER_TYPE, id: "LIST" }],
      transformResponse: (response: GetDormGenderTypesResponse) => {
        return transformResponse(response);
      },
    }),

    createDormGenderTypes: builder.mutation<
      CreateDormGenderTypesResponse,
      CreateDormGenderTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Gender/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.GENDER_TYPE),
      transformResponse: (response: CreateDormGenderTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormGenderTypes: builder.mutation<
      UpdateDormGenderTypesResponse,
      UpdateDormGenderTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Gender/257320b489ce4607bc77bafd4e12d6b3/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.GENDER_TYPE),
      transformResponse: (response: UpdateDormGenderTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== QUALITY TYPE ====================
    getDormQualityTypes: builder.query<
      GetDormQualityTypesResponse,
      GetDormQualityTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/Quality${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.QUALITY_TYPE, id: "LIST" }],
      transformResponse: (response: GetDormQualityTypesResponse) => {
        return transformResponse(response);
      },
    }),

    createDormQualityTypes: builder.mutation<
      CreateDormQualityTypesResponse,
      CreateDormQualityTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Quality/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.QUALITY_TYPE),
      transformResponse: (response: CreateDormQualityTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormQualityTypes: builder.mutation<
      UpdateDormQualityTypesResponse,
      UpdateDormQualityTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Quality/78af90b7fe5f485a8c1237be3bee300e/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.QUALITY_TYPE),
      transformResponse: (response: UpdateDormQualityTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== ROOM TYPE ====================
    getDormRoomTypes: builder.query<GetDormRoomTypesResponse, GetDormRoomTypesRequest>({
      query: (params) => ({
        url: `/data/form/RoomType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ROOM_TYPE, id: "LIST" }],
      transformResponse: (response: GetDormRoomTypesResponse) => {
        return transformResponse(response);
      },
    }),

    createDormRoomTypes: builder.mutation<
      CreateDormRoomTypesResponse,
      CreateDormRoomTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RoomType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.ROOM_TYPE),
      transformResponse: (response: CreateDormRoomTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormRoomTypes: builder.mutation<
      UpdateDormRoomTypesResponse,
      UpdateDormRoomTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RoomType/b5c04f54f4a34e009049ee1ceaa7019a/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.ROOM_TYPE),
      transformResponse: (response: UpdateDormRoomTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== BED TYPE ====================
    getDormBedTypes: builder.query<GetDormBedTypesResponse, GetDormBedTypesRequest>({
      query: (params) => ({
        url: `/data/form/BedType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.BED_TYPE, id: "LIST" }],
      transformResponse: (response: GetDormBedTypesResponse) => {
        return transformResponse(response);
      },
    }),

    createDormBedTypes: builder.mutation<
      CreateDormBedTypesResponse,
      CreateDormBedTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/BedType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.BED_TYPE),
      transformResponse: (response: CreateDormBedTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormBedTypes: builder.mutation<
      UpdateDormBedTypesResponse,
      UpdateDormBedTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/BedType/8d82d16ff3914062a017c959f6bd58ab/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.BED_TYPE),
      transformResponse: (response: UpdateDormBedTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== RULES TYPES ====================
    getDormGeneralRulesTypes: builder.query<
      GetDormRulesTypesResponse,
      GetDormRulesTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/GetRules${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "GENERAL" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    getDormFinanceRulesTypes: builder.query<
      GetDormRulesTypesResponse,
      GetDormRulesTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/GetRules${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "FINANCE" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    getDormDisciplinaryRulesTypes: builder.query<
      GetDormRulesTypesResponse,
      GetDormRulesTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/GetRules${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "DISCIPLINARY" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    getDormCancellingRulesTypes: builder.query<
      GetDormRulesTypesResponse,
      GetDormRulesTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/GetRules${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "CANCELLING" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    getDormInstallmentsRulesTypes: builder.query<
      GetDormRulesTypesResponse,
      GetDormRulesTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/GetRules${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "INSTALLMENTS" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== STATUS TYPE ====================
    getStatusTypes: builder.query<GetDormStatusTypesResponse, GetDormStatusTypesRequest>({
      query: (params) => ({
        url: `/data/form/Status${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.STATUS_TYPE, id: "LIST" }],
      transformResponse: (response: GetDormStatusTypesResponse) => {
        return transformResponse(response);
      },
    }),

    createStatusTypes: builder.mutation<
      CreateDormStatusTypesResponse,
      CreateDormStatusTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Status/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.STATUS_TYPE),
      transformResponse: (response: CreateDormStatusTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormStatusTypes: builder.mutation<
      UpdateDormStatusTypesResponse,
      UpdateDormStatusTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Status/34158107112c4f08bc0cdb57770194a5/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.STATUS_TYPE),
      transformResponse: (response: UpdateDormStatusTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== SCHEDULE TYPE ====================
    createDormScheduleTypes: builder.mutation<
      CreateDormScheduleTypesResponse,
      CreateDormScheduleTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/SchedulingType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SCHEDULING_TYPE),
      transformResponse: (response: CreateDormScheduleTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormScheduleTypes: builder.mutation<
      UpdateDormScheduleTypesResponse,
      UpdateDormScheduleTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/SchedulingType/7abdabb3b62744b5a905fc7a319d3751/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SCHEDULING_TYPE),
      transformResponse: (response: UpdateDormScheduleTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== REQUEST TYPE ====================
    getRequestType: builder.query<GetRequestTypeResponse, GetRequestTypeRequest>({
      query: (params) => ({
        url: `/data/form/RequestType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.REQUEST_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormRequestTypes: builder.mutation<
      CreateDormRequestTypesResponse,
      CreateDormRequestTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RequestType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.REQUEST_TYPE),
      transformResponse: (response: CreateDormRequestTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormRequestTypes: builder.mutation<
      UpdateDormRequestTypesResponse,
      UpdateDormRequestTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RequestType/9e64ea8889ae4f619a56d3bd61fbb3af/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.REQUEST_TYPE),
      transformResponse: (response: UpdateDormRequestTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== SPECIAL CONDITIONS TYPE ====================
    createSpecialConditionsTypes: builder.mutation<
      CreateDormSpecialConditionsTypesResponse,
      CreateDormSpecialConditionsTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/SpecialStatus/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SPECIAL_CONDITIONS_TYPE),
      transformResponse: (response: CreateDormSpecialConditionsTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateSpecialConditionsTypes: builder.mutation<
      UpdateDormSpecialConditionsTypesResponse,
      UpdateDormSpecialConditionsTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/SpecialStatus/e791ccc088864511a6fc741f963473a6/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SPECIAL_CONDITIONS_TYPE),
      transformResponse: (response: UpdateDormSpecialConditionsTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== ROOM PARENT ====================
    getARoomParentInDorm: builder.query<
      getARoomParentInDormResponse,
      getARoomParentInDormRequest
    >({
      query: (params) => ({
        url: `/data/form/ParentsOfRooms${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ROOM, id: "PARENTS" }],
      transformResponse: (response: GetDormRulesTypesResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== STATUS ENTITY TYPE ====================
    getStatusEntityType: builder.query<
      GetStatusEntityTypeResponse,
      GetStatusEntityTypeRequest
    >({
      query: (params) => ({
        url: `/data/form/StatusEntityForm${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.STATUS_ENTITY_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormStatusEntityTypes: builder.mutation<
      CreateDormStatusEntityTypesResponse,
      CreateDormStatusEntityTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/StatusEntityForm/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.STATUS_ENTITY_TYPE),
      transformResponse: (response: CreateDormStatusEntityTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormStatusEntityTypes: builder.mutation<
      UpdateDormStatusEntityTypesResponse,
      UpdateDormStatusEntityTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/StatusEntityForm/27b17724b9d34ba6a631d1a0086f2624/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.STATUS_ENTITY_TYPE),
      transformResponse: (response: UpdateDormStatusEntityTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== ASSIGNMENT TYPE ====================
    getAssignmentType: builder.query<GetAssignmentTypeResponse, GetAssignmentTypeRequest>(
      {
        query: (params) => ({
          url: `/data/form/TypeAssignment${createQueryString(params)}`,
          method: "GET",
        }),
        providesTags: [{ type: DORM_TAGS.ASSIGNMENT_TYPE, id: "LIST" }],
        transformResponse: (response) => {
          return transformResponse(response);
        },
      }
    ),

    createDormAssignmentTypes: builder.mutation<
      CreateDormAssignmentTypesResponse,
      CreateDormAssignmentTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/TypeAssignment/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.ASSIGNMENT_TYPE),
      transformResponse: (response: CreateDormAssignmentTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormAssignmentTypes: builder.mutation<
      UpdateDormAssignmentTypesResponse,
      UpdateDormAssignmentTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/TypeAssignment/b2d1d025983d445484e5797e533d64ef/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.ASSIGNMENT_TYPE),
      transformResponse: (response: UpdateDormAssignmentTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== RULE AND PRINCIPLE TYPE ====================
    getRuleAndPrincipleType: builder.query<
      GetRuleAndPrincipleTypeResponse,
      GetRuleAndPrincipleTypeRequest
    >({
      query: (params) => ({
        url: `/data/form/RuleAndPrincipleType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RULE_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormRuleAndPrincipleTypes: builder.mutation<
      CreateDormRuleAndPrincipleTypesResponse,
      CreateDormRuleAndPrincipleTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RuleAndPrincipleType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RULE_TYPE),
      transformResponse: (response: CreateDormRuleAndPrincipleTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormRuleAndPrincipleTypes: builder.mutation<
      UpdateDormRuleAndPrincipleTypesResponse,
      UpdateDormRuleAndPrincipleTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/RuleAndPrincipleType/d8cc8f6322d34656874c88811a481e2b/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RULE_TYPE),
      transformResponse: (response: UpdateDormRuleAndPrincipleTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== BED STATUS TYPE ====================
    getBedStatusType: builder.query<GetBedStatusTypeResponse, GetBedStatusTypeRequest>({
      query: (params) => ({
        url: `/data/form/BedState${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.BED_STATUS_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormBedStatusTypes: builder.mutation<
      CreateDormBedStatusTypesResponse,
      CreateDormBedStatusTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/BedState/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.BED_STATUS_TYPE),
      transformResponse: (response: CreateDormBedStatusTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormBedStatusTypes: builder.mutation<
      UpdateDormBedStatusTypesResponse,
      UpdateDormBedStatusTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/BedState/fe957cfa4f1f47c3bd01b732991214de/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.BED_STATUS_TYPE),
      transformResponse: (response: UpdateDormBedStatusTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== USER GROUP TYPE ====================
    createDormUserGroupTypes: builder.mutation<
      CreateDormUserGroupTypesResponse,
      CreateDormUserGroupTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/UserGroup/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.USER_GROUP_TYPE),
      transformResponse: (response: CreateDormUserGroupTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormUserGroupTypes: builder.mutation<
      UpdateDormUserGroupTypesResponse,
      UpdateDormUserGroupTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/UserGroup/30bc5ceedca24261a0d07ddf8e657d8f/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.USER_GROUP_TYPE),
      transformResponse: (response: UpdateDormUserGroupTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PRESENCE AND ABSENCE TYPE ====================
    getDormPresenceAndAbsence: builder.query<
      GetDormPresenceAndAbsenceTypesResponse,
      GetDormPresenceAndAbsenceTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/PresenceAbsenceList${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.PRESENCE_ABSENCE_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormPresenceAndAbsenceTypes: builder.mutation<
      CreateDormPresenceAndAbsenceTypeResponse,
      CreateDormPresenceAndAbsenceTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PresenceAbsenceList/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PRESENCE_ABSENCE_TYPE),
      transformResponse: (response: CreateDormPresenceAndAbsenceTypeResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormPresenceAndAbsenceTypes: builder.mutation<
      UpdateDormPresenceAndAbsenceTypesResponse,
      UpdateDormPresenceAndAbsenceTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PresenceAbsenceList/fd60cd4ed8384ea39a4d7a750df464c0/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PRESENCE_ABSENCE_TYPE),
      transformResponse: (response: UpdateDormPresenceAndAbsenceTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== FEEDBACK TYPE ====================
    getDormFeedbackTypes: builder.query<
      GetDormFeedbackTypesResponse,
      GetDormFeedbackTypesRequest
    >({
      query: (params) => ({
        url: `/data/form/FeedbackType${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.FEEDBACK_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormFeedbackTypes: builder.mutation<
      CreateDormFeedbackTypeResponse,
      CreateDormFeedbackTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/FeedbackType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.FEEDBACK_TYPE),
      transformResponse: (response: CreateDormFeedbackTypeResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormFeedbackTypes: builder.mutation<
      UpdateDormFeedbackTypesResponse,
      UpdateDormFeedbackTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/FeedbackType/1aa774cef5304619b2e390fab91c2284/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.FEEDBACK_TYPE),
      transformResponse: (response: UpdateDormFeedbackTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== RESIDENCE TYPE ====================
    createDormResidenceTypes: builder.mutation<
      CreateDormResidenceTypeResponse,
      CreateDormResidenceTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/AccommodationType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE_TYPE),
      transformResponse: (response: CreateDormResidenceTypeResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormResidenceTypes: builder.mutation<
      UpdateDormResidenceTypesResponse,
      UpdateDormResidenceTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/AccommodationType/180754945a6c443e8e61d446f62dba4f/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE_TYPE),
      transformResponse: (response: UpdateDormResidenceTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== NEARBY PLACES ====================
    createDormNearByPlacesTypes: builder.mutation<
      CreateDormNearByPlacesTypeResponse,
      CreateDormNearByPlacesTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PlacesAroundDormitory/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.NEARBY_PLACES),
      transformResponse: (response: CreateDormNearByPlacesTypeResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormNearByPlacesTypes: builder.mutation<
      UpdateDormNearByPlacesTypesResponse,
      UpdateDormNearByPlacesTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PlacesAroundDormitory/dc566d78f8304a14a11ffcb52d05d4e7/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.NEARBY_PLACES),
      transformResponse: (response: UpdateDormNearByPlacesTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== SUBSET RULES ====================
    createDormSubsetRules: builder.mutation<
      CreateDormSubsetRulesResponse,
      CreateDormSubsetRulesRequest
    >({
      query: (body) => ({
        url: "/data/form/SubsetRules/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SUBSET_RULES),
      transformResponse: (response: CreateDormSubsetRulesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormSubsetRules: builder.mutation<
      UpdateDormSubsetRulesResponse,
      UpdateDormSubsetRulesRequest
    >({
      query: (body) => ({
        url: "/data/form/SubsetRules/ef98ed6496c845f8b2def2faa54ed425/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SUBSET_RULES),
      transformResponse: (response: UpdateDormSubsetRulesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== FACILITIES ====================
    createDormFacilitiesType: builder.mutation<
      CreateDormFacilitiesTypeResponse,
      CreateDormFacilitiesTypeRequest
    >({
      query: (body) => ({
        url: "/data/form/FacilityList/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.FACILITY),
      transformResponse: (response: CreateDormFacilitiesTypeResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormFacilities: builder.mutation<
      UpdateDormFacilitiesResponse,
      UpdateDormFacilitiesRequest
    >({
      query: (body) => ({
        url: "/data/form/FacilityList/500905ef63174e7d8f54ff4c3ea7c526/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.FACILITY),
      transformResponse: (response: UpdateDormFacilitiesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PAYMENT TYPES ====================
    createDormPaymentTypes: builder.mutation<
      CreateDormPaymentTypesResponse,
      CreateDormPaymentTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PaymentType/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PAYMENT_TYPE),
      transformResponse: (response: CreateDormPaymentTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormPaymentTypes: builder.mutation<
      UpdateDormPaymentTypesResponse,
      UpdateDormPaymentTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PaymentType/ae4548c1742f435a9deb69523b20ddc9/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PAYMENT_TYPE),
      transformResponse: (response: UpdateDormPaymentTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== RELATION TYPES ====================
    getRelationType: builder.query<GetRelationTypeResponse, GetRelationTypeRequest>({
      query: (params) => ({
        url: `/data/form/Kinship${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RELATION_TYPE, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    createDormRelationTypes: builder.mutation<
      CreateDormRelationTypesResponse,
      CreateDormRelationTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Kinship/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RELATION_TYPE),
      transformResponse: (response: CreateDormRelationTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormRelationTypes: builder.mutation<
      UpdateDormRelationTypesResponse,
      UpdateDormRelationTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/Kinship/8fc8af7f4a694cfa9553f98c8bfa3ee7/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RELATION_TYPE),
      transformResponse: (response: UpdateDormRelationTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PAYMENT METHOD TYPES ====================
    createDormPaymentMethodTypes: builder.mutation<
      CreateDormPaymentMethodTypesResponse,
      CreateDormPaymentMethodTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PaymentMethod/create",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PAYMENT_METHOD),
      transformResponse: (response: CreateDormPaymentMethodTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormPaymentMethodTypes: builder.mutation<
      UpdateDormPaymentMethodTypesResponse,
      UpdateDormPaymentMethodTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/PaymentMethod/881e5c554e124bbda50c279ca88966dc/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.PAYMENT_METHOD),
      transformResponse: (response: UpdateDormPaymentMethodTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== DORMITORY TREE VIEW ====================
    getDormitoryTreeViewById: builder.query<
      CascaderNode[],
      { maxResults: number; firstResult: number; DormitoryId_EQ: string }
    >({
      query: (params) => ({
        url: `/data/form/treeDormitoryView${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: DORM_TAGS.DORM, id: arg.DormitoryId_EQ },
        { type: DORM_TAGS.BUILDING, id: "LIST" },
        { type: DORM_TAGS.FLOOR, id: "LIST" },
        { type: DORM_TAGS.ROOM, id: "LIST" },
      ],
      transformResponse: (response: any) => {
        return transformDormitoryTreeViewData(response[0]?.buildings);
      },
    }),

    // ==================== SEMESTER ====================
    getSemester: builder.query<DormSemesterResponse, DormSemesterRequest>({
      query: (params) => {
        return {
          url: `/data/form/semester${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.SEMESTER, id: "LIST" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getSemesterCount: builder.query<DormSemesterCountResponse, DormSemesterCountRequest>({
      query: (params) => {
        return {
          url: `/data/form/semester/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.SEMESTER, id: "COUNT" }],
    }),

    createDormSemesterTypes: builder.mutation<
      CreateDormSemesterTypesResponse,
      CreateDormSemesterTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/semesterRegistration/start-process/semesterRegistration",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SEMESTER),
      transformResponse: (response: CreateDormSemesterTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),

    updateDormSemesterTypes: builder.mutation<
      UpdateDormSemesterTypesResponse,
      UpdateDormSemesterTypesRequest
    >({
      query: (body) => ({
        url: "/data/form/semester/c3d0ba0e7539440db3b09e0a845cb7d4/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.SEMESTER),
      transformResponse: (response: UpdateDormSemesterTypesResponse) => {
        return transformObjectResponse(response);
      },
    }),
  }),
});
export const {
  useLazyGetAllDormsQuery,
  useLazyGetAllDormsCountQuery,
  useLazyGetAdmissionListQuery,
  useLazyGetAdmissionAwaitingReviewQuery,
  useLazyGetAdmissionAwaitingReviewCountQuery,
  useLazyGetAdmissionListCountQuery,
  useLazyGetTariffListQuery,
  useLazyGetTariffListCountQuery,
  useLazyGetTariffListAwaitingReviewQuery,
  useLazyGetTariffListAwaitingReviewCountQuery,
  useLazyGetTariffBasicInfoDetailQuery,
  useLazyGetConnectionWithTariffQuery,
  useCreateInActiveTariffMutation,
  useLazyGetAllDormitoryQuery,
  useLazyGetAllCurrencyQuery,
  useLazyGetManagementTypeQuery,
  useCreateDormManagementTypesMutation,
  useUpdateDormManagementTypesMutation,
  useLazyGetSchedulingTypeQuery,
  useLazyGetReservationTypeQuery,
  useCreateDormReservationTypesMutation,
  useUpdateDormReservationTypesMutation,
  useLazyGetPaymentTypeQuery,
  useLazyGetPaymentMethodQuery,
  useLazyGetUserGroupQuery,
  useLazyGetNationalityQuery,
  useLazyGetSpecialStatusQuery,
  useLazyGetEducationGradeQuery,
  useLazyGetFeasibilityQuery,
  useLazyGetNumberInstallmentsQuery,
  useLazyGetDormListByBranchIdQuery,
  useLazyGetBuildingsOfDormitoryQuery,
  useLazyGetFloorsOfBuildingQuery,
  useLazyGetRoomsOfFloorQuery,
  useLazyGetDormResidenceFacilityTypesQuery,
  useLazyGetDormResidenceFacilityListWithTypeIdQuery,
  useLazyGetDormRoomTypesQuery,
  useCreateDormRoomTypesMutation,
  useUpdateDormRoomTypesMutation,
  useLazyGetDormBedTypesQuery,
  useCreateDormBedTypesMutation,
  useUpdateDormBedTypesMutation,
  useLazyGetDormResidenceFacilityListQuery,
  useLazyGetDormGenderTypesQuery,
  useCreateDormGenderTypesMutation,
  useUpdateDormGenderTypesMutation,
  useLazyGetDormQualityTypesQuery,
  useCreateDormQualityTypesMutation,
  useUpdateDormQualityTypesMutation,
  useLazyGetDormGeneralRulesTypesQuery,
  useLazyGetDormFinanceRulesTypesQuery,
  useLazyGetDormDisciplinaryRulesTypesQuery,
  useLazyGetDormCancellingRulesTypesQuery,
  useLazyGetDormInstallmentsRulesTypesQuery,
  useLazyGetStatusTypesQuery,
  useCreateStatusTypesMutation,
  useUpdateDormStatusTypesMutation,
  useCreateDormScheduleTypesMutation,
  useUpdateDormScheduleTypesMutation,
  useLazyGetRequestTypeQuery,
  useCreateDormRequestTypesMutation,
  useUpdateDormRequestTypesMutation,
  useCreateSpecialConditionsTypesMutation,
  useUpdateSpecialConditionsTypesMutation,
  useLazyGetARoomParentInDormQuery,
  useLazyGetStatusEntityTypeQuery,
  useCreateDormStatusEntityTypesMutation,
  useUpdateDormStatusEntityTypesMutation,
  useLazyGetAssignmentTypeQuery,
  useCreateDormAssignmentTypesMutation,
  useUpdateDormAssignmentTypesMutation,
  useLazyGetRuleAndPrincipleTypeQuery,
  useCreateDormRuleAndPrincipleTypesMutation,
  useUpdateDormRuleAndPrincipleTypesMutation,
  useLazyGetBedStatusTypeQuery,
  useCreateDormBedStatusTypesMutation,
  useUpdateDormBedStatusTypesMutation,
  useCreateDormUserGroupTypesMutation,
  useUpdateDormUserGroupTypesMutation,
  useLazyGetDormPresenceAndAbsenceQuery,
  useCreateDormPresenceAndAbsenceTypesMutation,
  useUpdateDormPresenceAndAbsenceTypesMutation,
  useLazyGetDormFeedbackTypesQuery,
  useCreateDormFeedbackTypesMutation,
  useUpdateDormFeedbackTypesMutation,
  useCreateDormResidenceTypesMutation,
  useUpdateDormResidenceTypesMutation,
  useCreateDormNearByPlacesTypesMutation,
  useUpdateDormNearByPlacesTypesMutation,
  useCreateDormSubsetRulesMutation,
  useUpdateDormSubsetRulesMutation,
  useCreateDormFacilitiesTypeMutation,
  useUpdateDormFacilitiesMutation,
  useCreateDormPaymentTypesMutation,
  useUpdateDormPaymentTypesMutation,
  useLazyGetRelationTypeQuery,
  useCreateDormRelationTypesMutation,
  useUpdateDormRelationTypesMutation,
  useCreateDormPaymentMethodTypesMutation,
  useUpdateDormPaymentMethodTypesMutation,
  useLazyGetDormitoryTreeViewByIdQuery,
  useLazyGetSemesterQuery,
  useLazyGetSemesterCountQuery,
  useCreateDormSemesterTypesMutation,
  useUpdateDormSemesterTypesMutation,
} = dormBaseApi;
