import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
import { ResidenceInactiveFormType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

//!LAYOUT
export type DormInactiveModalContentProps = {
  form: FormInstance<ResidenceInactiveFormType>;
};

//! APIs
export type ResidenceInactiveResidenceResponse = BPMS_API_RESPONSE<null>;

export type ResidenceInactiveResidenceRequest = {
  form: "DisableDormitory";
  data: {
    id: string;
    descriptionRequest: string;
  };
};
