import { FormInstance } from "antd";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";

export type getActiveResidenceBedDetailResponse = {
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

export type ViewBedDetailDrawerContentProps = {
  closeViewDrawerHandler: () => void;
  data?: getActiveResidenceBedDetailResponse;
  loading?: boolean;
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
};

export type ArchiveBedDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
};

export type ActiveResidenceBedListProps = {
  form: FormInstance<ActiveResidenceDropDownsFormType>;
};

export type ActiveResidenceBedListFormType = {
  reason: SelectType<IdTitle>;
};

export type getActiveResidenceBedListContent = {
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

export type getActiveResidenceBedListResponse = {
  content: getActiveResidenceBedListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceBedListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type ActiveResidenceBedDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};

export type GetBedTypeResponse = IdTitleName[];
