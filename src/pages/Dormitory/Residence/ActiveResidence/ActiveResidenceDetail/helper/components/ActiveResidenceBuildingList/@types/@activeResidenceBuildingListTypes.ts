import { FormInstance, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ModifyBuildingDrawerContentProps = {
  closeDrawerHandler: () => void;
  getBuildingListHandler: () => void;
  id: string;
};

export type ViewBuildingDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
};

export type ArchiveBuildingDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
};

export type CreateBuildingDrawerContentFormType = {
  // Step 1
  imageUploader: UploadFile[];
  buildingName: string;
  quality: SelectType<IdTitle>;
  area: number;
  greenSpaceArea?: number;
  publicSpace?: number;
  postalCode: string;
  phoneNumber: string;
  address: string;
};

export type BuildingInfoStepContentProps = {
  form: FormInstance<CreateBuildingDrawerContentFormType>;
  firstImageList: UploadFile[];
  setFirstImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  lat: number;
  lng: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  qualityOptions: { id: string; title: string }[];
  isQualityLoading: boolean;
  getQualityHandler: () => void;
  isUploadFileLoading: boolean;
  onUploadFileChange: (image: any) => void;
  data: { provinceTitle?: string; cityTitle?: string } | null;
  loading: boolean;
};

export type getActiveResidenceBuildingListContent = {
  uuid: string;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  floorCount: number;
  roomCount: number;
  bedCount: number;
  amenityCount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getActiveResidenceBuildingListResponse = {
  content: getActiveResidenceBuildingListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceBuildingListRequest = {
  uuid: string;
  params: {
    title?: string;
    qualityGradeUuid?: string;
    createdBy?: string;
    createdDateFrom?: string;
    createdDateTo?: string;
    modifiedBy?: string;
    modifiedDateFrom?: string;
    modifiedDateTo?: string;
    branchIds?: number[];
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type ActiveResidenceBuildingListFormType = {
  reason: SelectType<IdTitle>;
};

export type ActiveResidenceBuildingDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};
