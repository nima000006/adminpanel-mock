import { FormInstance, UploadFile } from "antd";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";

export type ModifyUnitDrawerContentFormType = {
  imageUploader: UploadFile[];
  unitTitle: string;
  unitType: SelectType<IdTitle>;
  quality: SelectType<IdTitle>;
  capacity: number;
  area: number;
  desc: string;
  amenityFilter: SelectType<IdTitle>[];
};

export type ModifyUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
  getUnitListHandler: () => void;
  id: string;
  floor: SelectType<IdTitle>;
  buildingTitle: string;
};

export type ActiveResidenceUnitListProps = {
  form: FormInstance<ActiveResidenceDropDownsFormType>;
};

export type ActiveResidenceUnitListFormType = {
  reason: SelectType<IdTitle>;
};

export type getActiveResidenceUnitListContent = {
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

export type getActiveResidenceUnitListResponse = {
  content: getActiveResidenceUnitListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceUnitListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type ActiveResidenceUnitDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};

export type ActiveResidenceUnitDeactivateResponse = {
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
