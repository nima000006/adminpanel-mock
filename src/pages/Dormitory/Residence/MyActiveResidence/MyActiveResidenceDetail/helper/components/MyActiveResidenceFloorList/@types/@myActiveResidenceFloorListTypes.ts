import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MyActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";

export type MyModifyFloorDrawerContentProps = {
  getFloorListHandler: () => void;
  closeDrawerHandler: () => void;
  id: string;
  building: SelectType<IdTitle>;
};

export type MyViewFloorDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle?: string;
};

export type MyArchiveFloorDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle?: string;
};

export type MyActiveResidenceFloorListFormType = {
  reason: SelectType<IdTitle>;
};

export type MyModifyFloorDrawerContentFormType = {
  floor: SelectType<IdTitle>;
  floorTitle: string;
  quality: SelectType<IdTitle>;
  quantity: number;
  faDescription: string;
  amenityFilter: SelectType<IdTitle>[];
};

export type MyActiveResidenceFloorListProps = {
  form: FormInstance<MyActiveResidenceDropDownsFormType>;
};

export type getMyActiveResidenceFloorListContent = {
  uuid: string;
  floorNumber: string;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  roomCount: number;
  bedCount: number;
  amenityCount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getMyActiveResidenceFloorListResponse = {
  content: getMyActiveResidenceFloorListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceFloorListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
