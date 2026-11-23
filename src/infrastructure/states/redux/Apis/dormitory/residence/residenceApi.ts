import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  CreateDormitoryCourseRequest,
  CreateDormitoryCourseResponse,
  EditDormitoryCourseRequest,
  EditDormitoryCourseResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/@types/@dormitoryBasicInfoCourseList";
import {
  GetActiveResidenceAllBedListRequest,
  GetActiveResidenceAllBedListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceAllBedList/@types/@activeResidenceAllBedList";
import {
  getActiveResidenceDetailBannerResponse,
  GetAmenityCategoryResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";
import {
  ActiveResidenceBedDeactivateRequest,
  getActiveResidenceBedDetailResponse,
  getActiveResidenceBedListRequest,
  getActiveResidenceBedListResponse,
  GetBedTypeResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";
import {
  getActiveResidenceArchivedBedListRequest,
  getActiveResidenceArchivedBedListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ArchiveBedDrawerContent/@types/@archiveBedDrawerContentTypes";
import {
  CreateBedRequest,
  CreateBedResponse,
  EditBedRequest,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ModifyBedDrawerContent/@types/@modifyBedDrawerContentTypes";
import {
  ActiveResidenceBuildingDeactivateRequest,
  getActiveResidenceBuildingListRequest,
  getActiveResidenceBuildingListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/@types/@activeResidenceBuildingListTypes";
import { getActiveResidenceBuildingDetailResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/components/ViewBuildingInfoSegmentContent/@types/@viewBuildingInfoSegmentContentTypes";
import {
  getActiveResidenceBuildingDetailFacilitySegmentRequest,
  getActiveResidenceBuildingDetailFacilitySegmentResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/components/ViewFacilityBuildingSegmentContent/@types/@viewFacilityBuildingSegmentContentTypes";
import {
  getActiveResidenceArchivedBuildingListRequest,
  getActiveResidenceArchivedBuildingListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ArchiveBuildingDrawerContent/@types/@archiveBuildingDrawerContentTypes";
import {
  CreateBuildingRequest,
  CreateBuildingResponse,
  CreateBuildingSecondStepRequest,
  CreateBuildingSecondStepResponse,
  EditBuildingFirstStepRequest,
  EditBuildingFirstStepResponse,
  EditBuildingSecondStepRequest,
  EditBuildingSecondStepResponse,
  GetResidenceDataRequest,
  GetResidenceDataResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";
import {
  getActiveResidenceBuildingDropdownListResponse,
  getActiveResidenceDropdownListRequest,
  getActiveResidenceFloorDropdownListResponse,
  getActiveResidenceUnitDropdownListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceDropDowns/@types/@activeResidenceDropDownsTypes";
import {
  getActiveResidenceFloorListRequest,
  getActiveResidenceFloorListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import {
  getActiveResidenceFloorDetailFacilitySegmentRequest,
  getActiveResidenceFloorDetailFacilitySegmentResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFacilityFloorSegmentContent/@types/@viewFacilityFloorSegmentContentTypes";
import { getActiveResidenceFloorDetailInfoSegmentResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFloorInfoSegmentContent/@types/@viewFloorInfoSegmentContentTypes";
import {
  getActiveResidenceArchivedFloorListRequest,
  getActiveResidenceArchivedFloorListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ArchiveFloorDrawerContent/@types/@archiveFloorDrawerContentTypes";
import {
  CreateFloorRequest,
  CreateFloorResponse,
  EditFloorRequest,
  EditFloorResponse,
  GetEditFloorResponse,
  GetFloorAmenitiesSelectAndValueRequest,
  GetFloorAmenitiesSelectAndValueResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ModifyFloorDrawerContent/@types/@modifyFloorDrawerContentTypes";
import { ActiveResidenceFloorDeactivateRequest } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/modal/DisableFloorModalContent/@types/@disableFloorModalContentTypes";
import {
  ActiveResidenceUnitDeactivateRequest,
  ActiveResidenceUnitDeactivateResponse,
  getActiveResidenceUnitListRequest,
  getActiveResidenceUnitListResponse,
  GetDetailUnitResponse,
  GetRoomAmenitiesSelectAndValueRequest,
  GetRoomAmenitiesSelectAndValueResponse,
  GetUnitTypeDropDownListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";
import {
  getActiveResidenceArchivedUnitListRequest,
  getActiveResidenceArchivedUnitListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ArchiveUnitDrawerContent/@types/@archiveUnitDrawerContentTypes";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  EditUnitRequest,
  ResidenceUploadFileRequest,
  ResidenceUploadFileResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ModifyUnitDrawerContent/@types/@modifyUnitDrawerContentTypes";
import {
  GetPreparationStepsResidenceDetailRequest,
  GetPreparationStepsResidenceDetailResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/drawer/PreparationStepsResidenceDrawerContent/@types/@preparationStepsResidenceDrawerContent";
import {
  ApprovalRequestCreateResidenceRequest,
  ApprovalRequestCreateResidenceResponse,
  RejectRequestCreateResidenceRequest,
  RejectRequestCreateResidenceResponse,
  ReturnRequestCreateResidenceRequest,
  ReturnRequestCreateResidenceResponse,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/@types/@allResidenceDetail";
import {
  EditResidenceSecondSegmentRequest,
  EditResidenceSecondSegmentResponse,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/drawer/CreateResidenceDrawerContent/helper/components/PlacesAroundResidenceStepContent/@types/@placesAroundResidenceStepContent";
import {
  EditResidenceFirstSegmentRequest,
  EditResidenceFirstSegmentResponse,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/drawer/CreateResidenceDrawerContent/helper/components/ResidenceInfoStepContent/@types/@residenceInfoStepContent";
import { GetResidenceListBannerResponse } from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/@types/@allResidenceList";
import {
  AllResidenceListSearchRequest,
  AllResidenceListSearchResponse,
  GetResidenceDropDownListRequest,
  GetResidenceDropDownListResponse,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";
import {
  GetMyActiveResidenceAllBedListRequest,
  GetMyActiveResidenceAllBedListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceAllBedList/@types/@myActiveResidenceAllBedList";
import { getMyActiveResidenceDetailBannerResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";
import {
  getMyActiveResidenceBedDetailResponse,
  getMyActiveResidenceBedListRequest,
  getMyActiveResidenceBedListResponse,
  MyActiveResidenceBedDeactivateRequest,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";
import {
  getMyActiveResidenceArchivedBedListRequest,
  getMyActiveResidenceArchivedBedListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/drawer/MyArchiveBedDrawerContent/@types/@myArchiveBedDrawerContentTypes";
import {
  getMyActiveResidenceBuildingListRequest,
  getMyActiveResidenceBuildingListResponse,
  MyActiveResidenceBuildingDeactivateRequest,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";
import { getMyActiveResidenceBuildingDetailResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewBuildingInfoSegmentContent/@types/@myViewBuildingInfoSegmentContentTypes";
import {
  getMyActiveResidenceBuildingDetailFacilitySegmentRequest,
  getMyActiveResidenceBuildingDetailFacilitySegmentResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewFacilityBuildingSegmentContent/@types/@myViewFacilityBuildingSegmentContentTypes";
import {
  getMyActiveResidenceArchivedBuildingListRequest,
  getMyActiveResidenceArchivedBuildingListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/drawer/MyArchiveBuildingDrawerContent/@types/@myArchiveBuildingDrawerContentTypes";
import {
  getMyActiveResidenceBuildingDropdownListResponse,
  getMyActiveResidenceDropdownListRequest,
  getMyActiveResidenceFloorDropdownListResponse,
  getMyActiveResidenceUnitDropdownListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceDropDowns/@types/@myActiveResidenceDropDownsTypes";
import {
  getMyActiveResidenceFloorListRequest,
  getMyActiveResidenceFloorListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/@types/@myActiveResidenceFloorListTypes";
import {
  getMyActiveResidenceFloorDetailFacilitySegmentRequest,
  getMyActiveResidenceFloorDetailFacilitySegmentResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFacilityFloorSegmentContent/@types/@myViewFacilityFloorSegmentContentTypes";
import { getMyActiveResidenceFloorDetailInfoSegmentResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFloorInfoSegmentContent/@types/@myViewFloorInfoSegmentContentTypes";
import {
  getMyActiveResidenceArchivedFloorListRequest,
  getMyActiveResidenceArchivedFloorListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/drawer/MyArchiveFloorDrawerContent/@types/@myArchiveFloorDrawerContentTypes";
import { MyActiveResidenceFloorDeactivateRequest } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/modal/MyDisableFloorModalContent/@types/@myDisableFloorModalContentTypes";
import {
  getMyActiveResidenceUnitListRequest,
  getMyActiveResidenceUnitListResponse,
  MyActiveResidenceUnitDeactivateRequest,
  MyActiveResidenceUnitDeactivateResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/@types/@myActiveResidenceUnitListType";
import {
  getMyActiveResidenceArchivedUnitListRequest,
  getMyActiveResidenceArchivedUnitListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyArchiveUnitDrawerContent/@types/@myArchiveUnitDrawerContentTypes";
import {
  GetMyPreparationStepsResidenceDetailRequest,
  GetMyPreparationStepsResidenceDetailResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/drawer/MyPreparationStepsResidenceDrawerContent/@types/@myPreparationStepsResidenceDrawerContent";
import {
  CancelMyResidenceRequestRequest,
  CancelMyResidenceRequestResponse,
  GetMyResidenceDataRequest,
  GetMyResidenceDataResponse,
} from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";
import { GetMyResidenceListBannerResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/@types/@myResidenceList";
import {
  GetMyResidenceDropDownListRequest,
  GetMyResidenceDropDownListResponse,
  MyResidenceListSearchRequest,
  MyResidenceListSearchResponse,
} from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";

import { dormitoryApi } from "../../dormitoryApi";

export const residenceApi = dormitoryApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDormitoryList: builder.mutation<string, string>({
      query: (body) => ({
        url: "example",
        method: "POST",
        body,
      }),
    }),

    // banner
    geActiveResidenceDetailBanner: builder.query<
      getActiveResidenceDetailBannerResponse,
      string
    >({
      query: (uuid) => ({
        url: `/admin/accommodations/${uuid}/banner`,
        method: "GET",
      }),
    }),

    // my banner
    geMyActiveResidenceDetailBanner: builder.query<
      getMyActiveResidenceDetailBannerResponse,
      string
    >({
      query: (uuid) => ({
        url: `/manager/accommodations/${uuid}/banner`,
        method: "GET",
      }),
    }),

    // my building list
    geMyActiveResidenceBuildingList: builder.query<
      getMyActiveResidenceBuildingListResponse,
      getMyActiveResidenceBuildingListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/accommodations/${uuid}/buildings${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my building dropdown list
    geMyActiveResidenceBuildingDropdownList: builder.query<
      getMyActiveResidenceBuildingDropdownListResponse,
      getMyActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/accommodations/${uuid}/buildings/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my floor dropdown list
    geMyActiveResidenceFloorDropdownList: builder.query<
      getMyActiveResidenceFloorDropdownListResponse,
      getMyActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/buildings/${uuid}/floors${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my unit dropdown list
    geMyActiveResidenceUnitDropdownList: builder.query<
      getMyActiveResidenceUnitDropdownListResponse,
      getMyActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/rooms/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my unit list
    geMyActiveResidenceUnitList: builder.query<
      getMyActiveResidenceUnitListResponse,
      getMyActiveResidenceUnitListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/rooms${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my floor list
    geMyActiveResidenceFloorList: builder.query<
      getMyActiveResidenceFloorListResponse,
      getMyActiveResidenceFloorListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/buildings/${uuid}/floors/list${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my bed list
    geMyActiveResidenceBedList: builder.query<
      getMyActiveResidenceBedListResponse,
      getMyActiveResidenceBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/rooms/${uuid}/beds${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getMyActiveResidenceAllBedList: builder.query<
      GetMyActiveResidenceAllBedListResponse,
      GetMyActiveResidenceAllBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/accommodations/${uuid}/beds${createQueryString(params ?? {})}`,
        method: "GET",
      }),
    }),

    // my archived building list
    geMyActiveResidenceArchivedBuildingList: builder.query<
      getMyActiveResidenceArchivedBuildingListResponse,
      getMyActiveResidenceArchivedBuildingListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/accommodations/${uuid}/buildings/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my archived floor list
    geMyActiveResidenceArchivedFloorList: builder.query<
      getMyActiveResidenceArchivedFloorListResponse,
      getMyActiveResidenceArchivedFloorListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/buildings/${uuid}/floors/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my archived unit list
    geMyActiveResidenceArchivedUnitList: builder.query<
      getMyActiveResidenceArchivedUnitListResponse,
      getMyActiveResidenceArchivedUnitListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/rooms/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my archived bed list
    geMyActiveResidenceArchivedBedList: builder.query<
      getMyActiveResidenceArchivedBedListResponse,
      getMyActiveResidenceArchivedBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/rooms/${uuid}/beds/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my building detail segment 1
    getMyActiveResidenceBuildingDetail: builder.query<
      getMyActiveResidenceBuildingDetailResponse,
      string
    >({
      query: (uuid) => ({
        url: `/manager/buildings/${uuid}`,
        method: "GET",
      }),
    }),

    // my building detail segment 2
    getMyActiveResidenceBuildingDetailFacilitySegment: builder.query<
      getMyActiveResidenceBuildingDetailFacilitySegmentResponse,
      getMyActiveResidenceBuildingDetailFacilitySegmentRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/buildings/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my floor detail segment 1
    getMyActiveResidenceFloorDetailInfoSegment: builder.query<
      getMyActiveResidenceFloorDetailInfoSegmentResponse,
      string
    >({
      query: (uuid) => ({
        url: `/manager/floors/${uuid}`,
        method: "GET",
      }),
    }),

    // my floor detail segment 2
    getMyActiveResidenceFloorDetailFacilitySegment: builder.query<
      getMyActiveResidenceFloorDetailFacilitySegmentResponse,
      getMyActiveResidenceFloorDetailFacilitySegmentRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my bed detail
    getMyActiveResidenceBedDetail: builder.query<
      getMyActiveResidenceBedDetailResponse,
      string
    >({
      query: (uuid) => ({
        url: `/manager/beds/${uuid}`,
        method: "GET",
      }),
    }),

    // my floor deactivate
    myActiveResidenceFloorDeactivate: builder.mutation<
      number,
      MyActiveResidenceFloorDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // my bed deactivate
    myActiveResidenceBedDeactivate: builder.mutation<
      number,
      MyActiveResidenceBedDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/beds/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // my unit deactivate
    myActiveResidenceUnitDeactivate: builder.mutation<
      MyActiveResidenceUnitDeactivateResponse,
      MyActiveResidenceUnitDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/rooms/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // my building deactivate
    myActiveResidenceBuildingDeactivate: builder.mutation<
      number,
      MyActiveResidenceBuildingDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/buildings/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // building list
    geActiveResidenceBuildingList: builder.query<
      getActiveResidenceBuildingListResponse,
      getActiveResidenceBuildingListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/accommodations/${uuid}/buildings${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // building dropdown list
    geActiveResidenceBuildingDropdownList: builder.query<
      getActiveResidenceBuildingDropdownListResponse,
      getActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/accommodations/${uuid}/buildings/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // floor dropdown list
    geActiveResidenceFloorDropdownList: builder.query<
      getActiveResidenceFloorDropdownListResponse,
      getActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/buildings/${uuid}/floors${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // unit dropdown list
    geActiveResidenceUnitDropdownList: builder.query<
      getActiveResidenceUnitDropdownListResponse,
      getActiveResidenceDropdownListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/rooms/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // unit list
    geActiveResidenceUnitList: builder.query<
      getActiveResidenceUnitListResponse,
      getActiveResidenceUnitListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/rooms${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // floor list
    geActiveResidenceFloorList: builder.query<
      getActiveResidenceFloorListResponse,
      getActiveResidenceFloorListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/buildings/${uuid}/floors/list${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // bed list
    geActiveResidenceBedList: builder.query<
      getActiveResidenceBedListResponse,
      getActiveResidenceBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/rooms/${uuid}/beds${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getActiveResidenceAllBedList: builder.query<
      GetActiveResidenceAllBedListResponse,
      GetActiveResidenceAllBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/accommodations/${uuid}/beds${createQueryString(params ?? {})}`,
        method: "GET",
      }),
    }),

    // archived building list
    geActiveResidenceArchivedBuildingList: builder.query<
      getActiveResidenceArchivedBuildingListResponse,
      getActiveResidenceArchivedBuildingListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/accommodations/${uuid}/buildings/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // archived floor list
    geActiveResidenceArchivedFloorList: builder.query<
      getActiveResidenceArchivedFloorListResponse,
      getActiveResidenceArchivedFloorListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/buildings/${uuid}/floors/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // archived unit list
    geActiveResidenceArchivedUnitList: builder.query<
      getActiveResidenceArchivedUnitListResponse,
      getActiveResidenceArchivedUnitListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/rooms/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // archived bed list
    geActiveResidenceArchivedBedList: builder.query<
      getActiveResidenceArchivedBedListResponse,
      getActiveResidenceArchivedBedListRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/rooms/${uuid}/beds/archive${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // building detail segment 1
    getActiveResidenceBuildingDetail: builder.query<
      getActiveResidenceBuildingDetailResponse,
      string
    >({
      query: (uuid) => ({
        url: `/admin/buildings/${uuid}`,
        method: "GET",
      }),
    }),

    // building detail segment 2
    getActiveResidenceBuildingDetailFacilitySegment: builder.query<
      getActiveResidenceBuildingDetailFacilitySegmentResponse,
      getActiveResidenceBuildingDetailFacilitySegmentRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/buildings/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // floor detail segment 1
    getActiveResidenceFloorDetailInfoSegment: builder.query<
      getActiveResidenceFloorDetailInfoSegmentResponse,
      string
    >({
      query: (uuid) => ({
        url: `/admin/floors/${uuid}`,
        method: "GET",
      }),
    }),

    // floor detail segment 2
    getActiveResidenceFloorDetailFacilitySegment: builder.query<
      getActiveResidenceFloorDetailFacilitySegmentResponse,
      getActiveResidenceFloorDetailFacilitySegmentRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // bed detail
    getActiveResidenceBedDetail: builder.query<
      getActiveResidenceBedDetailResponse,
      string
    >({
      query: (uuid) => ({
        url: `/admin/beds/${uuid}`,
        method: "GET",
      }),
    }),

    // floor deactivate
    activeResidenceFloorDeactivate: builder.mutation<
      number,
      ActiveResidenceFloorDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // bed deactivate
    activeResidenceBedDeactivate: builder.mutation<
      number,
      ActiveResidenceBedDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/beds/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // unit deactivate
    activeResidenceUnitDeactivate: builder.mutation<
      ActiveResidenceUnitDeactivateResponse,
      ActiveResidenceUnitDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/rooms/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // building deactivate
    activeResidenceBuildingDeactivate: builder.mutation<
      number,
      ActiveResidenceBuildingDeactivateRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/buildings/${uuid}/deactivate${createQueryString(params)}`,
        method: "PUT",
      }),
    }),

    // amenity category
    getAmenityCategory: builder.query<GetAmenityCategoryResponse, void>({
      query: () => ({
        url: "/enums/amenity-categories",
        method: "GET",
      }),
    }),

    // get residence data
    getResidenceData: builder.query<GetResidenceDataResponse, GetResidenceDataRequest>({
      query: (uuid) => ({
        url: `/admin/accommodations/${uuid}`,
        method: "GET",
      }),
    }),

    // get my residence detail
    getMyResidenceData: builder.query<
      GetMyResidenceDataResponse,
      GetMyResidenceDataRequest
    >({
      query: (uuid) => ({
        url: `/manager/accommodations/${uuid}`,
        method: "GET",
      }),
    }),

    // create building first step
    createBuilding: builder.mutation<CreateBuildingResponse, CreateBuildingRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/accommodations/${uuid}/buildings`,
        method: "POST",
        body,
      }),
    }),

    // edit building first step
    editBuildingFirstStep: builder.mutation<
      EditBuildingFirstStepResponse,
      EditBuildingFirstStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/buildings/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // create building second step
    createBuildingSecondStep: builder.mutation<
      CreateBuildingSecondStepResponse,
      CreateBuildingSecondStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/buildings/${uuid}/amenities`,
        method: "POST",
        body,
      }),
    }),

    // edit building second step
    editBuildingSecondStep: builder.mutation<
      EditBuildingSecondStepResponse,
      EditBuildingSecondStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/buildings/${uuid}/amenities`,
        method: "PUT",
        body,
      }),
    }),

    // my create building first step
    createMyBuilding: builder.mutation<CreateBuildingResponse, CreateBuildingRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/accommodations/${uuid}/buildings`,
        method: "POST",
        body,
      }),
    }),

    // my edit building first step
    editMyBuildingFirstStep: builder.mutation<
      EditBuildingFirstStepResponse,
      EditBuildingFirstStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/buildings/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // my create building second step
    createMyBuildingSecondStep: builder.mutation<
      CreateBuildingSecondStepResponse,
      CreateBuildingSecondStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/buildings/${uuid}/amenities`,
        method: "POST",
        body,
      }),
    }),

    // my edit building second step
    editMyBuildingSecondStep: builder.mutation<
      EditBuildingSecondStepResponse,
      EditBuildingSecondStepRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/buildings/${uuid}/amenities`,
        method: "PUT",
        body,
      }),
    }),

    // create floor
    createFloor: builder.mutation<CreateFloorResponse, CreateFloorRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/buildings/${uuid}/floors`,
        method: "POST",
        body,
      }),
    }),

    // get edit floor
    getEditFloor: builder.query<GetEditFloorResponse, string>({
      query: (uuid) => ({
        url: `/admin/floors/${uuid}`,
        method: "GET",
      }),
    }),

    // get floor amenities select and value
    getFloorAmenitiesSelectAndValue: builder.query<
      GetFloorAmenitiesSelectAndValueResponse,
      GetFloorAmenitiesSelectAndValueRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/floors/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // get room amenities select and value
    getRoomAmenitiesSelectAndValue: builder.query<
      GetRoomAmenitiesSelectAndValueResponse,
      GetRoomAmenitiesSelectAndValueRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/admin/rooms/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // get detail unit
    getDetailUnit: builder.query<GetDetailUnitResponse, string>({
      query: (uuid) => ({
        url: `/admin/rooms/${uuid}`,
        method: "GET",
      }),
    }),

    // edit floor
    editFloor: builder.mutation<EditFloorResponse, EditFloorRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/floors/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // bed type
    getBedType: builder.query<GetBedTypeResponse, void>({
      query: () => ({
        url: "/enums/bed-types",
        method: "GET",
      }),
    }),

    // unit type dropdown list
    getUnitTypeDropDownList: builder.query<GetUnitTypeDropDownListResponse, void>({
      query: () => ({
        url: "/enums/room-types",
        method: "GET",
      }),
    }),

    // residence upload file
    residenceUploadFile: builder.mutation<
      ResidenceUploadFileResponse,
      ResidenceUploadFileRequest
    >({
      query: (formData) => ({
        url: "/admin/files",
        method: "POST",
        body: formData,
      }),
    }),

    // my residence upload file
    myResidenceUploadFile: builder.mutation<
      ResidenceUploadFileResponse,
      ResidenceUploadFileRequest
    >({
      query: (formData) => ({
        url: "/manager/files",
        method: "POST",
        body: formData,
      }),
    }),

    // create room
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/floors/${uuid}/rooms`,
        method: "POST",
        body,
      }),
    }),

    // edit unit
    editUnit: builder.mutation<string, EditUnitRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/rooms/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // create bed
    createBed: builder.mutation<CreateBedResponse, CreateBedRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/rooms/${uuid}/beds`,
        method: "POST",
        body,
      }),
    }),

    // edit bed
    editBed: builder.mutation<number, EditBedRequest>({
      query: ({ uuid, body }) => ({
        url: `/admin/beds/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // my create floor
    createMyFloor: builder.mutation<CreateFloorResponse, CreateFloorRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/buildings/${uuid}/floors`,
        method: "POST",
        body,
      }),
    }),

    // my get edit floor
    getMyEditFloor: builder.query<GetEditFloorResponse, string>({
      query: (uuid) => ({
        url: `/manager/floors/${uuid}`,
        method: "GET",
      }),
    }),

    // my get floor amenities select and value
    getMyFloorAmenitiesSelectAndValue: builder.query<
      GetFloorAmenitiesSelectAndValueResponse,
      GetFloorAmenitiesSelectAndValueRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/floors/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my get room amenities select and value
    getMyRoomAmenitiesSelectAndValue: builder.query<
      GetRoomAmenitiesSelectAndValueResponse,
      GetRoomAmenitiesSelectAndValueRequest
    >({
      query: ({ uuid, params }) => ({
        url: `/manager/rooms/${uuid}/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my get detail unit
    getMyDetailUnit: builder.query<GetDetailUnitResponse, string>({
      query: (uuid) => ({
        url: `/manager/rooms/${uuid}`,
        method: "GET",
      }),
    }),

    // my edit floor
    editMyFloor: builder.mutation<EditFloorResponse, EditFloorRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/floors/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // my create room
    createMyRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/floors/${uuid}/rooms`,
        method: "POST",
        body,
      }),
    }),

    // my edit unit
    editMyUnit: builder.mutation<string, EditUnitRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/rooms/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // my create bed
    createMyBed: builder.mutation<CreateBedResponse, CreateBedRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/rooms/${uuid}/beds`,
        method: "POST",
        body,
      }),
    }),

    // my edit bed
    editMyBed: builder.mutation<number, EditBedRequest>({
      query: ({ uuid, body }) => ({
        url: `/manager/beds/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // all residence list search
    allResidenceListSearch: builder.query<
      AllResidenceListSearchResponse,
      AllResidenceListSearchRequest
    >({
      query: (params) => ({
        url: `/admin/accommodations/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // residence drop down list (advance filter)
    getResidenceDropDownList: builder.query<
      GetResidenceDropDownListResponse,
      GetResidenceDropDownListRequest
    >({
      query: (params) => ({
        url: `/admin/accommodations/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // residence list status banner
    getResidenceListBanner: builder.query<GetResidenceListBannerResponse, void>({
      query: () => ({
        url: "/admin/accommodations/status-banner",
        method: "GET",
      }),
    }),

    // my residence list search
    myResidenceListSearch: builder.query<
      MyResidenceListSearchResponse,
      MyResidenceListSearchRequest
    >({
      query: (params) => ({
        url: `/manager/accommodations/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // my residence list status banner
    getMyResidenceListBanner: builder.query<GetMyResidenceListBannerResponse, void>({
      query: () => ({
        url: "/manager/accommodations/status-banner",
        method: "GET",
      }),
    }),

    // my residence drop down list (advance filter)
    getMyResidenceDropDownList: builder.query<
      GetMyResidenceDropDownListResponse,
      GetMyResidenceDropDownListRequest
    >({
      query: (params) => ({
        url: `/manager/accommodations/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // approve create residence request
    approvalRequestCreateResidence: builder.mutation<
      ApprovalRequestCreateResidenceResponse,
      ApprovalRequestCreateResidenceRequest
    >({
      query: (uuid) => ({
        url: `/admin/accommodations/${uuid}/approve`,
        method: "PUT",
      }),
    }),

    // reject create residence request
    rejectRequestCreateResidence: builder.mutation<
      RejectRequestCreateResidenceResponse,
      RejectRequestCreateResidenceRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/accommodations/${uuid}/reject`,
        method: "PUT",
        body,
      }),
    }),

    // return create residence request
    returnRequestCreateResidence: builder.mutation<
      ReturnRequestCreateResidenceResponse,
      ReturnRequestCreateResidenceRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/accommodations/${uuid}/return`,
        method: "PUT",
        body,
      }),
    }),

    // edit residence first segment
    editResidenceFirstSegment: builder.mutation<
      EditResidenceFirstSegmentResponse,
      EditResidenceFirstSegmentRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/accommodations/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // edit residence second segment
    editResidenceSecondSegment: builder.mutation<
      EditResidenceSecondSegmentResponse,
      EditResidenceSecondSegmentRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/accommodations/${uuid}/nearby-places`,
        method: "PUT",
        body,
      }),
    }),

    // my edit residence first segment
    editMyResidenceFirstSegment: builder.mutation<
      EditResidenceFirstSegmentResponse,
      EditResidenceFirstSegmentRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/accommodations/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // my edit residence second segment
    editMyResidenceSecondSegment: builder.mutation<
      EditResidenceSecondSegmentResponse,
      EditResidenceSecondSegmentRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/accommodations/${uuid}/nearby-places`,
        method: "PUT",
        body,
      }),
    }),

    // cancel my residence request
    cancelMyResidenceRequest: builder.mutation<
      CancelMyResidenceRequestResponse,
      CancelMyResidenceRequestRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/manager/accommodations/${uuid}/cancel`,
        method: "PUT",
        body,
      }),
    }),

    createDormitoryCourse: builder.mutation<
      CreateDormitoryCourseResponse,
      CreateDormitoryCourseRequest
    >({
      query: (body) => ({
        url: "/admin/academic-terms",
        method: "POST",
        body,
      }),
    }),

    editDormitoryCourse: builder.mutation<
      EditDormitoryCourseResponse,
      EditDormitoryCourseRequest
    >({
      query: ({ uuid, visible }) => ({
        url: `/admin/academic-terms/${uuid}${createQueryString({ visible })}`,
        method: "PUT",
      }),
    }),

    getPreparationStepsResidenceDetail: builder.query<
      GetPreparationStepsResidenceDetailResponse,
      GetPreparationStepsResidenceDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/accommodations/${uuid}/preparation`,
        method: "GET",
      }),
    }),

    // my preparation steps
    getMyPreparationStepsResidenceDetail: builder.query<
      GetMyPreparationStepsResidenceDetailResponse,
      GetMyPreparationStepsResidenceDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/manager/accommodations/${uuid}/preparation`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetDormitoryListMutation,
  useGeActiveResidenceDetailBannerQuery,
  useGeMyActiveResidenceDetailBannerQuery,
  useLazyGeMyActiveResidenceBuildingListQuery,
  useLazyGeMyActiveResidenceBuildingDropdownListQuery,
  useLazyGeMyActiveResidenceFloorDropdownListQuery,
  useLazyGeMyActiveResidenceUnitDropdownListQuery,
  useLazyGeMyActiveResidenceUnitListQuery,
  useLazyGeMyActiveResidenceFloorListQuery,
  useLazyGeMyActiveResidenceBedListQuery,
  useLazyGetMyActiveResidenceAllBedListQuery,
  useLazyGeMyActiveResidenceArchivedBuildingListQuery,
  useLazyGeMyActiveResidenceArchivedFloorListQuery,
  useLazyGeMyActiveResidenceArchivedUnitListQuery,
  useLazyGeMyActiveResidenceArchivedBedListQuery,
  useLazyGetMyActiveResidenceBuildingDetailQuery,
  useLazyGetMyActiveResidenceBuildingDetailFacilitySegmentQuery,
  useLazyGetMyActiveResidenceFloorDetailInfoSegmentQuery,
  useLazyGetMyActiveResidenceFloorDetailFacilitySegmentQuery,
  useLazyGetMyActiveResidenceBedDetailQuery,
  useMyActiveResidenceFloorDeactivateMutation,
  useMyActiveResidenceBedDeactivateMutation,
  useMyActiveResidenceUnitDeactivateMutation,
  useMyActiveResidenceBuildingDeactivateMutation,
  useLazyGeActiveResidenceBuildingListQuery,
  useLazyGeActiveResidenceBuildingDropdownListQuery,
  useLazyGeActiveResidenceFloorDropdownListQuery,
  useLazyGeActiveResidenceUnitDropdownListQuery,
  useLazyGeActiveResidenceUnitListQuery,
  useLazyGeActiveResidenceFloorListQuery,
  useLazyGeActiveResidenceBedListQuery,
  useLazyGetActiveResidenceAllBedListQuery,
  useLazyGeActiveResidenceArchivedBuildingListQuery,
  useLazyGeActiveResidenceArchivedFloorListQuery,
  useLazyGeActiveResidenceArchivedUnitListQuery,
  useLazyGeActiveResidenceArchivedBedListQuery,
  useLazyGetActiveResidenceBuildingDetailQuery,
  useLazyGetActiveResidenceBuildingDetailFacilitySegmentQuery,
  useLazyGetActiveResidenceFloorDetailInfoSegmentQuery,
  useLazyGetActiveResidenceFloorDetailFacilitySegmentQuery,
  useLazyGetActiveResidenceBedDetailQuery,
  useActiveResidenceFloorDeactivateMutation,
  useActiveResidenceBedDeactivateMutation,
  useActiveResidenceUnitDeactivateMutation,
  useActiveResidenceBuildingDeactivateMutation,
  useLazyGetAmenityCategoryQuery,
  useLazyGetResidenceDataQuery,
  useLazyGetMyResidenceDataQuery,
  useCreateBuildingMutation,
  useEditBuildingFirstStepMutation,
  useCreateBuildingSecondStepMutation,
  useEditBuildingSecondStepMutation,
  useCreateMyBuildingMutation,
  useEditMyBuildingFirstStepMutation,
  useCreateMyBuildingSecondStepMutation,
  useEditMyBuildingSecondStepMutation,
  useCreateFloorMutation,
  useLazyGetEditFloorQuery,
  useLazyGetFloorAmenitiesSelectAndValueQuery,
  useLazyGetRoomAmenitiesSelectAndValueQuery,
  useLazyGetDetailUnitQuery,
  useEditFloorMutation,
  useLazyGetBedTypeQuery,
  useLazyGetUnitTypeDropDownListQuery,
  useResidenceUploadFileMutation,
  useMyResidenceUploadFileMutation,
  useCreateRoomMutation,
  useEditUnitMutation,
  useCreateBedMutation,
  useEditBedMutation,
  useCreateMyFloorMutation,
  useLazyGetMyEditFloorQuery,
  useLazyGetMyFloorAmenitiesSelectAndValueQuery,
  useLazyGetMyRoomAmenitiesSelectAndValueQuery,
  useLazyGetMyDetailUnitQuery,
  useEditMyFloorMutation,
  useCreateMyRoomMutation,
  useEditMyUnitMutation,
  useCreateMyBedMutation,
  useEditMyBedMutation,
  useLazyAllResidenceListSearchQuery,
  useLazyMyResidenceListSearchQuery,
  useLazyGetResidenceDropDownListQuery,
  useLazyGetMyResidenceDropDownListQuery,
  useLazyGetResidenceListBannerQuery,
  useLazyGetMyResidenceListBannerQuery,
  useApprovalRequestCreateResidenceMutation,
  useRejectRequestCreateResidenceMutation,
  useReturnRequestCreateResidenceMutation,
  useEditResidenceFirstSegmentMutation,
  useEditResidenceSecondSegmentMutation,
  useEditMyResidenceFirstSegmentMutation,
  useEditMyResidenceSecondSegmentMutation,
  useCancelMyResidenceRequestMutation,
  useCreateDormitoryCourseMutation,
  useEditDormitoryCourseMutation,
  useLazyGetPreparationStepsResidenceDetailQuery,
  useLazyGetMyPreparationStepsResidenceDetailQuery,
} = residenceApi;
