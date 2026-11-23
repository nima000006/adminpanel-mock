import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllResidenceModalContentFormType = {
  refuseReason: SelectType<IdTitle>;
  description: string;
};

export type ApprovalRequestCreateResidenceRequest = string;

export type ApprovalRequestCreateResidenceResponse = number;

export type RejectRequestCreateResidenceRequest = {
  uuid: string;
  body: {
    reasonUuid: string;
    faDescription: string;
  };
};

export type RejectRequestCreateResidenceResponse = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  status: IdTitleName;
  reason: string;
  faDescription: string;
};

export type ReturnRequestCreateResidenceRequest = {
  uuid: string;
  body: {
    reasonUuid: string;
    faDescription: string;
  };
};

export type ReturnRequestCreateResidenceResponse = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  status: IdTitleName;
  reason: string;
  faDescription: string;
};

export type ReasonsRejectAndReturnRequestsRequest = {
  kind: string;
  module: string;
  pageNumber: number;
  pageSize: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type ReasonsRejectAndReturnRequestsContent = {
  uuid: string;
  title: string;
};

export type ReasonsRejectAndReturnRequestsResponse = {
  content: ReasonsRejectAndReturnRequestsContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
