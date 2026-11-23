import { Dispatch, SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

type ResidencePlaceValue =
  | "PARK"
  | "GREEN_SPACE"
  | "TAXI"
  | "BRT"
  | "BUSS"
  | "METRO"
  | "SHOPPING"
  | "FRUIT_MARKET"
  | "CINEMA"
  | "STADIUM"
  | "LIBRARY";

type ResidencePlaceAddressKey = `address-${ResidencePlaceValue}`;

type ResidencePlaceAddresses = {
  [K in ResidencePlaceAddressKey]?: string;
};

export type ResidenceInfoStepContentFormType = {
  // ================================
  // Step 1 - Residence Info
  // ================================
  residenceName: string;
  residenceType: SelectType<IdTitle>;
  quality: SelectType<IdTitle>;
  capacity: number;
  area: number;
  greenSpaceArea?: number;
  province: SelectType<IdTitle>;
  city: SelectType<IdTitle>;
  address: string;
  postalCode: string;
  phoneNumber: string;
  imageUploader: UploadFile[];
  business: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
} & ResidencePlaceAddresses;

export type ResidenceInfoStepContentProps = {
  form: FormInstance<ResidenceInfoStepContentFormType>;
  lat: number;
  lng: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLng: Dispatch<SetStateAction<number>>;
  firstImageList: UploadFile[];
  setFirstImageList: Dispatch<SetStateAction<UploadFile[]>>;
  isUploadFileLoading: boolean;
  onUploadFileChange: (image: any) => void;
};

export type EditResidenceFirstSegmentRequest = {
  uuid: string;
  body: {
    uploadFileUuids: string[];
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    accommodationType: string;
    qualityGradeUuid: string;
    nominalCapacity: number;
    businessId: number;
    branchId: number;
    areaSquareMeters: number;
    greenSpaceAreaSquareMeters?: number;
    zipCode: string;
    phone: string;
    provinceId: number;
    cityId: number;
    faAddress: string;
    enAddress?: string;
    arAddress?: string;
    latitude: number;
    longitude: number;
  };
};

export type EditResidenceFirstSegmentResponse = string;
