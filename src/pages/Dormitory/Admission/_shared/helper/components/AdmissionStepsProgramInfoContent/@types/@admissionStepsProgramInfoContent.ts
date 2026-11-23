import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetDormitoryManagementTypesResponse = IdTitleName[];

export type AdmissionReservationUnitResponse = IdTitleName[];

export type GetAllAdmissionProgramInfoRequest = string;

export type GetMyAdmissionProgramInfoRequest = string;

export type GetAllAdmissionProgramInfoResponse = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  businessId: number;
  businessTitle: string;
  branchId: number;
  branchTitle: string;
  accommodationUuid: string;
  accommodationTitle: string;
  managementType: IdTitleName;
  saleUnitType: IdTitleName;
  visible: boolean;
  saleUnitLocked: boolean;
};

export type GetMyAdmissionProgramInfoResponse = GetAllAdmissionProgramInfoResponse;

export type AdmissionStepsProgramInfoFormType = {
  programTitle: string;
  business?: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
  residence: SelectType<IdTitle>;
  managementType: SelectType<IdTitleName>;
  reservableCapacity: string;
  checked: boolean;
};

export type AdmissionStepsProgramInfoContentProps = {
  from?: "all" | "my";
  isSubmitAndContinueLoading?: boolean;
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsProgramInfoFormType) => void;
};
