import { FormInstance } from "antd";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MyActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";

export type getMyActiveResidenceBedDetailResponse = {
  uuid: string;
  accommodationTitle: string;
  buildingTitle: string;
  floorTitle: string;
  roomTitle: string;
  bedType: IdTitleName;
  occupancy: IdTitleName;
  bedNumber: string;
  title: string;
  bedPosition: IdTitleName;
  assetNumber: string;
};

export type MyViewBedDetailDrawerContentProps = {
  closeViewDrawerHandler: () => void;
  data?: getMyActiveResidenceBedDetailResponse;
  loading?: boolean;
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
};

export type MyArchiveBedDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
};

export type MyActiveResidenceBedListProps = {
  form: FormInstance<MyActiveResidenceDropDownsFormType>;
};

export type MyActiveResidenceBedListFormType = {
  reason: SelectType<IdTitle>;
};

export type getMyActiveResidenceBedListContent = {
  uuid: string;
  bedNumber: string;
  title: string;
  bedType: IdTitleName;
  bedPosition: IdTitleName;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getMyActiveResidenceBedListResponse = {
  content: getMyActiveResidenceBedListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceBedListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type MyActiveResidenceBedDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};

export type GetBedTypeResponse = IdTitleName[];
