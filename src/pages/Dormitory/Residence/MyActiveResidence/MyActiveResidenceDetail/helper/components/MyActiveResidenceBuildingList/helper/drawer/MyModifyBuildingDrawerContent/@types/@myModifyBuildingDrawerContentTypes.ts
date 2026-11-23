import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CreateBuildingRequest = {
  uuid: string;
  body: {
    uploadFileUuids: string[];
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    qualityGradeUuid?: string;
    builtUpArea?: number;
    livingArea?: number;
    commonArea?: number;
    zipCode?: string;
    phone?: string;
    faAddress?: string;
    enAddress?: string;
    arAddress?: string;
    latitude?: number;
    longitude?: number;
  };
};

export type CreateBuildingResponse = string;

export type EditBuildingFirstStepRequest = {
  uuid: string;
  body: {
    uploadFileUuids: string[];
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    qualityGradeUuid?: string;
    builtUpArea?: number;
    livingArea?: number;
    commonArea?: number;
    zipCode?: string;
    phone?: string;
    faAddress?: string;
    enAddress?: string;
    arAddress?: string;
    latitude?: number;
    longitude?: number;
  };
};

export type EditBuildingFirstStepResponse = string;

export type CreateBuildingSecondStepAmenityBody = {
  templateUuid: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
};

export type CreateBuildingSecondStepRequest = {
  uuid: string;
  body: CreateBuildingSecondStepAmenityBody[];
};

export type CreateBuildingSecondStepResponse = string;

export type EditBuildingSecondStepAmenityBody = {
  templateUuid: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
  uuid?: string;
};

export type EditBuildingSecondStepRequest = {
  uuid: string;
  body: EditBuildingSecondStepAmenityBody[];
};

export type EditBuildingSecondStepResponse = string;

export type GetResidenceDataRequest = string;

export type GetResidenceDataReason = {
  uuid: string;
  title: string;
};

export type GetResidenceDataImage = {
  uuid: string;
  fileName: string;
  objectName: string;
  url: string;
};

export type GetResidenceDataNearbyPlace = {
  uuid: string;
  title: string;
  description: string;
};

export type GetResidenceDataResponse = {
  uuid: string;
  returnDate: string;
  returnReason: GetResidenceDataReason;
  returnDescription: string;
  rejectDate: string;
  rejectReason: GetResidenceDataReason;
  rejectDescription: string;
  approveDate: string;
  cancelDate: string;
  cancelledBy: string;
  requestKind: IdTitleName;
  status: IdTitleName;
  requestNumber: string;
  createdDate: string;
  lastActor: string;
  lastActionDate: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantNationalCode: string;
  applicantMobile: string;
  title: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  visible: boolean;
  images: GetResidenceDataImage[];
  accommodationType: IdTitleName;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  nominalCapacity: number;
  businessId: number;
  businessName: string;
  branchId: number;
  branchName: string;
  areaSquareMeters: number;
  greenSpaceAreaSquareMeters: number;
  zipCode: string;
  phone: string;
  provinceId: number;
  provinceTitle: string;
  cityId: number;
  cityTitle: string;
  address: string;
  faAddress: string;
  enAddress: string;
  arAddress: string;
  latitude: number;
  longitude: number;
  nearbyPlaces: GetResidenceDataNearbyPlace[];
};
