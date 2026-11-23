import { FormInstance, UploadFile } from "antd";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MyActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";

export type MyModifyUnitDrawerContentFormType = {
  imageUploader: UploadFile[];
  unitTitle: string;
  unitType: SelectType<IdTitle>;
  quality: SelectType<IdTitle>;
  capacity: number;
  area: number;
  desc: string;
  amenityFilter: SelectType<IdTitle>[];
};

export type MyModifyUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
  getUnitListHandler: () => void;
  id: string;
  floor: SelectType<IdTitle>;
  buildingTitle: string;
};

export type MyActiveResidenceUnitListProps = {
  form: FormInstance<MyActiveResidenceDropDownsFormType>;
};

export type MyActiveResidenceUnitListFormType = {
  reason: SelectType<IdTitle>;
};

export type getMyActiveResidenceUnitListContent = {
  uuid: string;
  roomNumber: string;
  title: string;
  roomType: IdTitleName;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  capacity: number;
  bedCount: number;
  amenityCount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getMyActiveResidenceUnitListResponse = {
  content: getMyActiveResidenceUnitListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceUnitListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type MyActiveResidenceUnitDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};

export type MyActiveResidenceUnitDeactivateResponse = {
  uuid: string;
  roomNumber: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  status: IdTitleName;
  reason: string;
};

export type GetUnitTypeDropDownListResponse = IdTitleName[];

export type GetDetailUnitBedTypeStat = {
  bedType: IdTitleName;
  count: number;
};

export type GetDetailUnitImage = {
  uuid: string;
  fileName: string;
  objectName: string;
  url: string;
};

export type GetDetailUnitResponse = {
  uuid: string;
  bedCount: number;
  bedTypeStats: GetDetailUnitBedTypeStat[];
  images: GetDetailUnitImage[];
  roomNumber: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  roomType: IdTitleName;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  capacity: number;
  areaSquareMeters: number;
};

export type GetRoomAmenitiesSelectAndValueRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
  };
};

export type GetRoomAmenitiesSelectAndValueContent = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  amenityCategory: IdTitleName;
  quantity: number;
  unitOfMeasure: IdTitleName;
  createdBy: string;
  createdDate: string;
};

export type GetRoomAmenitiesSelectAndValueResponse = {
  content: GetRoomAmenitiesSelectAndValueContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
