import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { DORM_TAGS, invalidatesList } from "@infra/states/redux/config";
import {
  GetDormCityRequest,
  GetDormCityResponse,
  GetDormProvinceRequest,
  GetDormProvinceResponse,
  GetPlacesAroundDormitoryRequest,
  GetPlacesAroundDormitoryResponse,
  GetResidenceTypeRequest,
  GetResidenceTypeResponse,
  ResidenceCreateResidenceRequest,
  ResidenceCreateResidenceResponse,
  ResidenceUpdateResidenceRequest,
  ResidenceUpdateResidenceResponse,
} from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";
import {
  ResidenceInactiveResidenceRequest,
  ResidenceInactiveResidenceResponse,
} from "@pages/Dorm/Residence/DormCreateAndModify/helpers/modal/DormInactiveModalContent/@types/@dormInactiveModalContent";
import {
  GetResidenceDetailInfoRequest,
  GetResidenceDetailInfoResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";
import {
  GetDormResidenceBedListRequest,
  GetDormResidenceBedListResponse,
  GetRoomCapacityRequest,
  GetRoomCapacityResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBed/@types/@residenceCardsDataBed";
import {
  GetDormResidenceBuildingListRequest,
  GetDormResidenceBuildingListResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import {
  GetDormResidenceFloorListRequest,
  GetDormResidenceFloorListResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";
import {
  GetDormResidenceRoomListRequest,
  GetDormResidenceRoomListResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataRoom/@types/@residenceCardsDataRoom";
import {
  GetResidenceBedInfoRequest,
  GetResidenceBedInfoResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormBedSingleCard/helper/drawers/BedDetail/@types/@bedDetailDrawerContent";
import {
  GetResidenceBuildingInfoRequest,
  GetResidenceBuildingInfoResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormBuildingSingleCard/helper/drawers/BuildingDetail/@types/@buildingDetailDrawerContent";
import {
  GetDormResidenceBuildingCapacityRequest,
  GetDormResidenceBuildingCapacityResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormBuildingSingleCard/helper/drawers/BuildingDetail/helper/components/BuildingDetailStatistics/@types/@buildingDetailStatistics";
import {
  GetResidenceFloorInfoRequest,
  GetResidenceFloorInfoResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormFloorSingleCard/helper/drawers/FloorDetail/@types/@floorDetailDrawerContent";
import {
  GetDormResidenceFloorCapacityRequest,
  GetDormResidenceFloorCapacityResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormFloorSingleCard/helper/drawers/FloorDetail/helper/components/FloorDetailStatistics/@types/@floorDetailStatistics";
import {
  GetDormResidenceRoomCapacityRequest,
  GetDormResidenceRoomCapacityResponse,
  GetResidenceRoomInfoRequest,
  GetResidenceRoomInfoResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";
import {
  ResidenceCreateBedRequest,
  ResidenceCreateBedResponse,
  ResidenceUpdateBedRequest,
  ResidenceUpdateBedResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/@types/@bedCreateAndModify";
import {
  ResidenceCreateBuildingRequest,
  ResidenceCreateBuildingResponse,
  ResidenceUpdateBuildingRequest,
  ResidenceUpdateBuildingResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";
import {
  ResidenceCreateFloorRequest,
  ResidenceCreateFloorResponse,
  ResidenceUpdateFloorRequest,
  ResidenceUpdateFloorResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Floor/FloorCreateAndModify/@types/@floorCreateAndModify";
import {
  ResidenceCreateRoomRequest,
  ResidenceCreateRoomResponse,
  ResidenceUpdateRoomRequest,
  ResidenceUpdateRoomResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/@types/@roomCreateAndModify";

import { dormApi } from "../../dormApi";

export const dormResidenceApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== RESIDENCE DETAIL ====================
    getResidenceDetailInfo: builder.mutation<
      GetResidenceDetailInfoResponse,
      GetResidenceDetailInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/ViewDetailsOfHostel/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetResidenceDetailInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== RESIDENCE TYPE ====================
    getResidenceType: builder.query<GetResidenceTypeResponse, GetResidenceTypeRequest>({
      query: (params) => {
        return {
          url: `/data/form/AccommodationType${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.RESIDENCE_TYPE, id: "LIST" }],
      transformResponse: (response: GetResidenceTypeResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== PLACES AROUND DORMITORY ====================
    getPlacesAroundDormitory: builder.query<
      GetPlacesAroundDormitoryResponse,
      GetPlacesAroundDormitoryRequest
    >({
      query: (params) => ({
        url: `/data/form/PlacesAroundDormitory${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.NEARBY_PLACES, id: "LIST" }],
      transformResponse: (response: GetPlacesAroundDormitoryResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== RESIDENCE CRUD ====================
    residenceCreateResidence: builder.mutation<
      ResidenceCreateResidenceResponse,
      ResidenceCreateResidenceRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateDormitory/start-process/CreatingDormitory",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    residenceUpdateResidence: builder.mutation<
      ResidenceUpdateResidenceResponse,
      ResidenceUpdateResidenceRequest
    >({
      query: (body) => ({
        url: "/data/form/ViewDetailsOfHostel/96b76ab15cf64391b7bb70d5141773af/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE),
      transformResponse: (response: ResidenceUpdateResidenceResponse) => {
        return transformObjectResponse(response);
      },
    }),

    residenceInactiveResidence: builder.mutation<
      ResidenceInactiveResidenceResponse,
      ResidenceInactiveResidenceRequest
    >({
      query: (body) => ({
        url: "/data/form/DisableDormitory/start-process/DisableDormitory",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    // ==================== BUILDING CAPACITY & INFO ====================
    getDormResidenceBuildingCapacity: builder.query<
      GetDormResidenceBuildingCapacityResponse,
      GetDormResidenceBuildingCapacityRequest
    >({
      query: (params) => ({
        url: `/data/form/CapacityBuilding${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CAPACITY, id: "BUILDING" }],
      transformResponse: (response: GetDormResidenceBuildingCapacityResponse) => {
        return transformResponse(response);
      },
    }),

    getResidenceBuildingInfo: builder.mutation<
      GetResidenceBuildingInfoResponse,
      GetResidenceBuildingInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/ViewDetailsOfBuilding/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetResidenceDetailInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== FLOOR CAPACITY & INFO ====================
    getDormResidenceFloorCapacity: builder.query<
      GetDormResidenceFloorCapacityResponse,
      GetDormResidenceFloorCapacityRequest
    >({
      query: (params) => ({
        url: `/data/form/CapacityFloor${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CAPACITY, id: "FLOOR" }],
      transformResponse: (response: GetDormResidenceFloorCapacityResponse) => {
        return transformResponse(response);
      },
    }),

    getResidenceFloorInfo: builder.mutation<
      GetResidenceFloorInfoResponse,
      GetResidenceFloorInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/EditDetailsOfFloor1/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetResidenceFloorInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== ROOM CAPACITY & INFO ====================
    getDormResidenceRoomCapacity: builder.query<
      GetDormResidenceRoomCapacityResponse,
      GetDormResidenceRoomCapacityRequest
    >({
      query: (params) => ({
        url: `/data/form/CapacityRoom${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CAPACITY, id: "ROOM" }],
      transformResponse: (response: GetDormResidenceRoomCapacityResponse) => {
        return transformResponse(response);
      },
    }),

    getResidenceRoomInfo: builder.mutation<
      GetResidenceRoomInfoResponse,
      GetResidenceRoomInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/ViewDetailsOfRoom/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetResidenceRoomInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== BED INFO ====================
    getResidenceBedInfo: builder.mutation<
      GetResidenceBedInfoResponse,
      GetResidenceBedInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/ViewBedDetails/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetResidenceBedInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== BUILDING CRUD ====================
    residenceCreateBuilding: builder.mutation<
      ResidenceCreateBuildingResponse,
      ResidenceCreateBuildingRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateBuilding/start-process/CreateBuilding",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_BUILDING),
        { type: DORM_TAGS.CAPACITY, id: "BUILDING" },
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    residenceUpdateBuilding: builder.mutation<
      ResidenceUpdateBuildingResponse,
      ResidenceUpdateBuildingRequest
    >({
      query: (body) => ({
        url: "/data/form/ViewDetailsOfBuilding/052c8d9c6fd64922b4b0675b2ad4e0eb/save",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_BUILDING),
        { type: DORM_TAGS.CAPACITY, id: "BUILDING" },
      ],
      transformResponse: (response: ResidenceUpdateBuildingResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== FLOOR CRUD ====================
    residenceCreateFloor: builder.mutation<
      ResidenceCreateFloorResponse,
      ResidenceCreateFloorRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateFloor/start-process/CreateFloor",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_FLOOR),
        { type: DORM_TAGS.CAPACITY, id: "FLOOR" },
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    residenceUpdateFloor: builder.mutation<
      ResidenceUpdateFloorResponse,
      ResidenceUpdateFloorRequest
    >({
      query: (body) => ({
        url: "/data/form/EditDetailsOfFloor1/08cb9bad1f04459fb6934e31924b191b/save",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_FLOOR),
        { type: DORM_TAGS.CAPACITY, id: "FLOOR" },
      ],
      transformResponse: (response: ResidenceUpdateFloorResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== ROOM CRUD ====================
    residenceCreateRoom: builder.mutation<
      ResidenceCreateRoomResponse,
      ResidenceCreateRoomRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateRoom/start-process/CreateRoom",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_ROOM),
        { type: DORM_TAGS.CAPACITY, id: "ROOM" },
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    residenceUpdateRoom: builder.mutation<
      ResidenceUpdateRoomResponse,
      ResidenceUpdateRoomRequest
    >({
      query: (body) => ({
        url: "/data/form/ViewDetailsOfRoom/f97278c53e50446bad348f7f92a47abe/save",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.RESIDENCE_ROOM),
        { type: DORM_TAGS.CAPACITY, id: "ROOM" },
      ],
      transformResponse: (response: ResidenceUpdateRoomResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== BED CRUD ====================
    residenceCreateBed: builder.mutation<
      ResidenceCreateBedResponse,
      ResidenceCreateBedRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateBed/start-process/CreateBed",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE_BED),
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    residenceUpdateBed: builder.mutation<
      ResidenceUpdateBedResponse,
      ResidenceUpdateBedRequest
    >({
      query: (body) => ({
        url: "/data/form/ViewBedDetails/19f5755d39ad44be97b46e7b339aaa97/save",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidatesList(DORM_TAGS.RESIDENCE_BED),
      transformResponse: (response: ResidenceUpdateBedResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== LISTS ====================
    getDormResidenceBuildingList: builder.query<
      GetDormResidenceBuildingListResponse,
      GetDormResidenceBuildingListRequest
    >({
      query: (params) => ({
        url: `/data/form/Buildings${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RESIDENCE_BUILDING, id: "LIST" }],
      transformResponse: (response: GetDormResidenceBuildingListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormResidenceFloorList: builder.query<
      GetDormResidenceFloorListResponse,
      GetDormResidenceFloorListRequest
    >({
      query: (params) => ({
        url: `/data/form/Floors${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RESIDENCE_FLOOR, id: "LIST" }],
      transformResponse: (response: GetDormResidenceFloorListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormResidenceRoomList: builder.query<
      GetDormResidenceRoomListResponse,
      GetDormResidenceRoomListRequest
    >({
      query: (params) => ({
        url: `/data/form/Rooms${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RESIDENCE_ROOM, id: "LIST" }],
      transformResponse: (response: GetDormResidenceRoomListResponse) => {
        return transformResponse(response);
      },
    }),

    getDormResidenceBedList: builder.query<
      GetDormResidenceBedListResponse,
      GetDormResidenceBedListRequest
    >({
      query: (params) => ({
        url: `/data/form/Beds${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.RESIDENCE_BED, id: "LIST" }],
      transformResponse: (response: GetDormResidenceBedListResponse) => {
        return transformResponse(response);
      },
    }),

    getRoomCapacity: builder.query<GetRoomCapacityResponse, GetRoomCapacityRequest>({
      query: (params) => ({
        url: `/data/form/roomCapacity${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CAPACITY, id: "ROOM_DETAIL" }],
      transformResponse: (response: GetRoomCapacityResponse) => {
        return transformResponse(response);
      },
    }),

    // ==================== LOCATION ====================
    getDormProvinceList: builder.query<GetDormProvinceResponse, GetDormProvinceRequest>({
      query: (params) => ({
        url: `/data/form/getProvinceIran${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.PROVINCE, id: "LIST" }],
      transformResponse: (response: GetDormProvinceResponse) => {
        return transformResponse(response);
      },
    }),

    getDormCityList: builder.query<GetDormCityResponse, GetDormCityRequest>({
      query: (params) => ({
        url: `/data/form/getCityOfProvince${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.CITY, id: "LIST" }],
      transformResponse: (response: GetDormCityResponse) => {
        return transformResponse(response);
      },
    }),
  }),
});

export const {
  useGetResidenceDetailInfoMutation,
  useLazyGetResidenceTypeQuery,
  useLazyGetPlacesAroundDormitoryQuery,
  useResidenceCreateResidenceMutation,
  useResidenceUpdateResidenceMutation,
  useResidenceInactiveResidenceMutation,
  useLazyGetDormResidenceBuildingCapacityQuery,
  useGetResidenceBuildingInfoMutation,
  useLazyGetDormResidenceFloorCapacityQuery,
  useGetResidenceFloorInfoMutation,
  useLazyGetDormResidenceRoomCapacityQuery,
  useGetResidenceRoomInfoMutation,
  useGetResidenceBedInfoMutation,
  useResidenceCreateBuildingMutation,
  useResidenceUpdateBuildingMutation,
  useResidenceCreateFloorMutation,
  useResidenceUpdateFloorMutation,
  useResidenceCreateRoomMutation,
  useResidenceUpdateRoomMutation,
  useResidenceCreateBedMutation,
  useResidenceUpdateBedMutation,
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
  useLazyGetDormResidenceRoomListQuery,
  useLazyGetDormResidenceBedListQuery,
  useLazyGetRoomCapacityQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetDormCityListQuery,
} = dormResidenceApi;
