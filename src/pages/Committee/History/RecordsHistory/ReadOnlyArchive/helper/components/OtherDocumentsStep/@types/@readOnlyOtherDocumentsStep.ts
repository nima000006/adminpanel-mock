import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

export type ReadOnlyOtherDocumentsStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  deleteRequestStatus: boolean | undefined;
};

export type RemoveRequestModalContentProps = {
  form: FormInstance<{
    removeReason: {
      id: number;
      title: string;
    };
    description: string;
  }>;
};
//! API
export type GetRemoveHistoryOtherDocumentsResponse = BPMS_API_RESPONSE<
  {
    UploadFiles_fileType: string;
    attachedTitle: string;
    UploadFiles_relativeUrl: string;
    UploadFiles_uid: string;
    UploadFiles_size: number;
    UploadFiles_originalName: string;
    UploadFiles_extension: string;
    id: number;
    UploadFiles_name: string;
    violationId: number;
    attachedDate: string;
  }[]
>;
export type SendRegistrationDeletionRequest = BPMS_API_REQUEST<
  string,
  {
    inquirerFirstName?: string;
    inquirerPost?: string;
    inquirerOrganization?: string;
    reasonRequest: number;
    status: 1;
    descRequest: string;
    UniCode?: string;
    inquirerLastName?: string;
    inquirerUnit: string;
    userRequestType: 2;
    inquirerDateRequest: string;
    violationId: number;
    AssociationViolationStudent: {
      recycleBin: true;
      id: number;
    };
    id: null;
  }
>;
export type SendRegistrationDeletionResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type GetRemoveReasonResponse = BPMS_API_RESPONSE<
  {
    title: string;
    typeInformationId: number;
    id: number;
  }[]
>;
