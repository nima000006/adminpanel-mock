import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllAdmissionDetailModalContentFormType = {
  reason: SelectType<IdTitle>;
  description: string;
};

export type AllAdmissionDetailRejectRequestRequest = {
  uuid: string;
  body: {
    reasonUuid: string;
    faDescription: string;
  };
};

export type AllAdmissionDetailRejectRequestResponse = number;

export type AllAdmissionDetailReturnRequestRequest = {
  uuid: string;
  body: {
    reasonUuid: string;
    faDescription: string;
  };
};

export type AllAdmissionDetailReturnRequestResponse = {
  uuid: string;
  status: IdTitleName;
  reasonUuid: string;
  reasonTitle: string;
  faDescription: string;
};
