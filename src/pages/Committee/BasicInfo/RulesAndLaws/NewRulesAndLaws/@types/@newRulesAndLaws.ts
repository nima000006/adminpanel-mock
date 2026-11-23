import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
export type BPMSUploadReturnType = {
  originalName: string;
  uid: string;
  extension: string;
  size: number;
  serverUrl: string;
  name: string;
  deleteUrl: string;
  relativeUrl: string;
  url: string;
  fileType: string;
};

//! LAYOUT
export type AlreadyUploadedFileProps = {
  count: number;
  data: BPMSUploadReturnType[];
};

//! API
export type CreateRulesAndRegulationsResponse = BPMS_API_RESPONSE<{
  date: string;
  tenant_id: null;
  number: string;
  lastModifiedDate: string;
  id: number;
  attach: boolean;
  title: string;
}>;
export type UploadFileType = {
  originalName: string;
  uid: string;
  extension: string;
  size: number;
  serverUrl: string;
  name: string;
  deleteUrl: string;
  relativeUrl: string;
  url: string;
  fileType: string;
};
export type AssociationRegulationsAttachedFile = {
  UploadFiles: {
    _: [
      {
        data: UploadFileType;
      },
    ];
  };
};
export type CreateRulesAndRegulationsRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    date: string;
    number: string;
    lastModifiedDate: string;
    id: number | null;
    attach: boolean;
    AssociationRegulationsAttached?: AssociationRegulationsAttachedFile[] | null;
  }
>;
export type GetRulesAndRegulationDetailResponse = BPMS_API_RESPONSE<
  {
    date: string;
    number: string;
    lastModifiedDate: string | null;
    id: number;
    title: string;
  }[]
>;
export type GetRegulationAttachmentsResponse = BPMS_API_RESPONSE<BPMSUploadReturnType[]>;
export type UploadFileResponse = BPMS_API_RESPONSE<BPMSUploadReturnType>;
export type UploadFileRequest = {
  dir: string;
  name: string;
  file: File;
};
