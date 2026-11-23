import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type GetDormitoryTaskIdResponse = BPMS_API_RESPONSE<{ id: string }[]>;
export type GetDormitoryTaskIdRequest = {
  processVariables: [{ name: string; operator: string; value: number }];
};

export type SubmitConfirmAndRejectAndReturnModalResponse = BPMS_API_RESPONSE<null>;
type RejectAndAcceptAndReturnedRequest = {
  variables: {
    validation: {
      value: string;
    };
    descriptionAdmin: {
      value: string;
    };
  };
};

export type SubmitConfirmAndRejectAndReturnModalRequest = {
  body: RejectAndAcceptAndReturnedRequest;
  statusCode: string;
};
export interface SelectDefaultValueType {
  label?: string;
  value?: string;
  key?: number;
  code?: number;
  children?: string;
  disabled?: boolean;
  item?: {
    id?: number;
    title?: string;
  };
  title?: string;
  name?: string;
}

export interface ResidenceFormType {
  residenceName: string;
  residenceType: SelectDefaultValueType | SelectDefaultValueType[];
  quality: SelectDefaultValueType | SelectDefaultValueType[];
  capacity: number;
  branch: SelectDefaultValueType | SelectDefaultValueType[];
  gender: SelectDefaultValueType | SelectDefaultValueType[];
  province: SelectDefaultValueType | SelectDefaultValueType[];
  city: SelectDefaultValueType | SelectDefaultValueType[];
  postalCode: string;
  phone: string;
  address: string;
  description?: string;
  status?: SelectDefaultValueType | SelectDefaultValueType[];
  [key: `description${number}`]: string;
}
