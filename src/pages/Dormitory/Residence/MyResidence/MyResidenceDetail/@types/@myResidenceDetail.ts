import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CancelMyResidenceRequestRequest = {
  uuid: string;
  body: {
    faDescription: string;
  };
};

export type CancelMyResidenceRequestResponse = number;

export type GetMyResidenceDataRequest = string;

export type GetMyResidenceDataReason = {
  uuid: string;
  title: string;
};

export type GetMyResidenceDataImage = {
  uuid: string;
  fileName: string;
  objectName: string;
  url: string;
};

export type GetMyResidenceDataNearbyPlace = {
  uuid: string;
  title: string;
  description: string;
};

export type GetMyResidenceDataResponse = {
  uuid: string;
  returnDate: string;
  returnReason: GetMyResidenceDataReason;
  returnDescription: string;
  rejectDate: string;
  rejectReason: GetMyResidenceDataReason;
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
  images: GetMyResidenceDataImage[];
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
  nearbyPlaces: GetMyResidenceDataNearbyPlace[];
};
