//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type OtherDocumentsStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type attachedFileType = {
  file: { uid: string; name: string; value: string | Blob };
  fileList: [
    {
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
    },
  ];
};

export type NewDocumentType = {
  documentTitle: string;
  attachedFile: attachedFileType;
  attachedDate: string;
};
//! API
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
export type GetCreateAndEditOtherDocumentsInfoResponse = BPMS_API_RESPONSE<void>;
export type GetCreateAndEditOtherDocumentsInfoRequest = BPMS_API_REQUEST<
  string,
  {
    violationStatus: number;
    sendToEducAssistant: null;
    recordsStage: number;
    dateLastStatusChange: string;
    id: number;
    AssociationViolationAttached: {
      attachedTitle: string;
      attachedDate: string;
      UploadFiles: {
        _: [
          {
            data: UploadFileType;
          },
        ];
      };
    }[];
  }
>;
