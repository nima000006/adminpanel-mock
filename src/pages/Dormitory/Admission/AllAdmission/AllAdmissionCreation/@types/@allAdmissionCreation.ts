import { SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";

export type CreateAllAdmissionProgramInfoRequest = {
  uuid?: string;
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  businessId: number;
  branchId: number;
  accommodationUuid: string;
  managementType: string;
  saleUnitType: string;
  visible: boolean;
};

export type CreateAllAdmissionProgramInfoResponse = string;

export type CreateAllAdmissionSchedulingRequest = {
  uuid: string;
  periodType: string;
  academicTermUuid?: string;
  occupancyStartDate: string;
  occupancyEndDate: string;
  reservationStartAt: string;
  reservationEndAt: string;
  bookingMode?: string;
  minStayPeriods?: number;
  maxStayPeriods?: number;
  packageDays: number;
};

export type CreateAllAdmissionSchedulingResponse = string;

export type CreateAllAdmissionRulesFormItem = {
  uuid: string;
  title: string;
};

export type CreateAllAdmissionRulesRegulationItem = {
  templateUuid: string;
  faDescription: string;
};

export type CreateAllAdmissionRulesRequest = {
  uuid: string;
  allowAllBranches: boolean;
  branchIds?: number[];
  gender: string;
  restrictEligibility: boolean;
  userGroupTypes?: string[];
  citizenShip?: string;
  academicDegrees?: string[];
  studyFieldIds?: number[];
  needUploadForms: boolean;
  forms?: CreateAllAdmissionRulesFormItem[];
  regulations?: CreateAllAdmissionRulesRegulationItem[];
  allowGuestInfo: boolean;
};

export type CreateAllAdmissionRulesResponse = string;

export type DormitoryUploadFileWithTextRequest = FormData;

export type DormitoryUploadFileWithTextResponse = {
  uuid: string;
};

export type ContractPersonType = "legal" | "natural";

export type AllAdmissionCreationContractBeneficiary = {
  id: string;
  business: string | null;
  businessId: string | null;
  branch: string | null;
  branchId: string | null;
  isSeller: boolean;
  sharePercent: number;
  personType: ContractPersonType;
};

export type AllAdmissionCreationContractService = {
  id: string;
  title: string;
  beneficiaries: AllAdmissionCreationContractBeneficiary[];
};

export type AllAdmissionCreationContractTemplate = {
  id: string;
  title: string;
  servicesCount: number;
  services: AllAdmissionCreationContractService[];
};

export type AllAdmissionCreationBeneficiaryOptionItem = {
  id: string | number;
  title: string;
};

export type AllAdmissionCreationBeneficiaryFormType = {
  business?: SelectType<AllAdmissionCreationBeneficiaryOptionItem>;
  branch?: SelectType<AllAdmissionCreationBeneficiaryOptionItem>;
};

export type AllAdmissionCreationBeneficiaryModalMode = "define" | "edit";

export type AllAdmissionCreationBeneficiaryModalProps = {
  open: boolean;
  mode: AllAdmissionCreationBeneficiaryModalMode;
  initialValues?: AllAdmissionCreationBeneficiaryFormType | null;
  onCancel: () => void;
  onConfirm: (values: AllAdmissionCreationBeneficiaryFormType) => void;
};

export type AllAdmissionCreationContractAllocationDrawerProps = {
  open: boolean;
  scheduling?: AdmissionStepsSchedulingFormType | null;
  onClose: () => void;
  onConfirm: () => void;
};

export type AllAdmissionCreationContractTemplateStepProps = {
  templates: AllAdmissionCreationContractTemplate[];
  selectedTemplateId?: string;
  stayDateRange?: AdmissionStepsSchedulingFormType["stayDateRange"];
  onSelectTemplate: (templateId: string) => void;
};

export type AllAdmissionCreationContractServicesStepProps = {
  services: AllAdmissionCreationContractService[];
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onDefineBeneficiary: (serviceId: string, beneficiaryId: string) => void;
  onEditBeneficiary: (serviceId: string, beneficiaryId: string) => void;
};

export type AllAdmissionCreationContractServiceCardProps = {
  service: AllAdmissionCreationContractService;
  selected: boolean;
  onToggle: () => void;
  onDefineBeneficiary: (beneficiaryId: string) => void;
  onEditBeneficiary: (beneficiaryId: string) => void;
};
