import { SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

import { AdmissionStepsRulesHandoverDocumentFormItem } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { GetAllAdmissionRulesResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";

export type AdmissionStepsRulesHandoverConditionsProps = {
  form: FormInstance;
  documentFileLists: UploadFile[][];
  onUpdateDocumentFileList: (index: number, value: SetStateAction<UploadFile[]>) => void;
  onRemoveHandoverDocument: (index: number, remove: () => void) => void;
  onRequiresHandoverDocumentsChange: (checked: boolean) => void;
  defaultRequiresHandoverDocuments?: boolean;
  initialHandoverDocuments?: AdmissionStepsRulesHandoverDocumentFormItem[];
  isDocumentUploaderReadOnly?: boolean;
  data: GetAllAdmissionRulesResponse | undefined;
};
