import { Dayjs } from "dayjs";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type HabitantsEvacuationListData = {
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_parentId: number;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_title: string;
  AssociationCustomer_AssociationCustomerUser_mobile: string;
  deliveryDate: string;
  paymentStatus: number;
  AssociationCategoryDeliverPlan_branchId: number;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title: string;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_regionId: number;
  bedId: number;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title: string;
  AssociationBed_dormitoryid: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  AssociationCustomer_userGroupID: number;
  residenceEndDate: string;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_id: number;
  AssociationBed_buildingid: number;
  AssociationBed_AssociationCategoryDormitory_title: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationBed_AssociationCategoryBuliding_title: string;
  AssociationCustomer_AssociationStudent_fieldId: number;
  id: number;
  AssociationBed_floorId: number;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  residenceStartDate: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  AssociationCustomer_AssociationCustomerUser_genderId: number;
  AssociationCustomer_AssociationStudent_gradeId: number;
  AssociationBed_roomId: number;
  AssociationCategoryDeliverPlan_schedulingId: number;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationBed_AssociationCategoryFloor_title: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  AssociationBed_AssociationCategorRoom_title: string;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCategoryDeliverPlan_priceListId: number;
  deliverPlanId: number;
  AssociationBed_title: string;
  amountRemaining: number;
  creditAmount: number;
};
export type GetHabitantsEvacuationListResponse = BPMS_API_RESPONSE<
  HabitantsEvacuationListData[]
>;
export type GetHabitantsEvacuationListRequest = {
  maxResults: number;
  firstResult: number;
  paymentStatus_EQ: number;
};

export type GetHabitantsEvacuationCountRequests = {
  paymentStatus_EQ: number;
};

export type SendAllEvacuationResponse = BPMS_API_RESPONSE<number>;

export type SendAllEvacuationRequest = {
  form: string;
  data: Record<string, never>;
  query: {
    filters: {
      key: string;
      operator: string;
      value: string;
    }[];
  };
};

export type DormFinancialSituationType = {
  tenant_id: null;
  currenttDate: string;
  id: number;
  indebtedness: number;
  paymentStatus: null;
  aAdditionalDebt: number;
};

export type GetDormFinancialSituationResponse = BPMS_API_RESPONSE<
  DormFinancialSituationType[]
>;
export type GetDormFinancialSituationRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};

export type ReasonAdditionsDeductionsIdTitle = { id: number; title: string };

export type GetReasonAdditionsDeductionsResponse = BPMS_API_RESPONSE<
  ReasonAdditionsDeductionsIdTitle[]
>;

export type GetReasonAdditionsDeductionsRequests = {
  maxResults: number;
  firstResult: number;
  type_EQ: number;
};

export type HabitantsEmptyBedResponse = BPMS_API_RESPONSE<
  {
    links: [];
    id: string;
    definitionId: string;
    businessKey: null;
    caseInstanceId: null;
    ended: boolean;
    suspended: boolean;
    tenantId: null;
  }[]
>;

export type HabitantsEmptyBedRequest = {
  form: string;
  data: {
    id: string;
    emptyDesc: string | undefined;
    emptyDate: string;
  };
};

export type DormAdditionalInvoiceResponse = BPMS_API_RESPONSE<
  {
    links: [];
    id: string;
    definitionId: string;
    businessKey: null;
    caseInstanceId: null;
    ended: boolean;
    suspended: boolean;
    tenantId: null;
  }[]
>;

export type DormAdditionalInvoiceRequest = {
  form: string;
  data: {
    additionalAmount: string | undefined;
    additionalAmountDesc: string | undefined;
    requestId: string;
    deductedAmount: string | undefined;
    deductedAmountDesc: string | undefined;
    additionalReason: number;
    deductedReason: number;
  };
};

//! LAYOUT
export type HabitantsEvacuationDrawerDataTypes = {
  isOpen: boolean;
  data: HabitantsEvacuationListData | null;
};

export type HabitantEvacuationDrawerSectionProps = {
  data: HabitantsEvacuationListData | null;
};

type CustomSelectItem = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type ModalFormType = {
  additions: string | undefined;
  additionsDesc: string | undefined;
  deductions: string | undefined;
  deductionsDesc: string | undefined;
  reasonAdditions: CustomSelectItem;
  reasonDeductions: CustomSelectItem;
};

export type DrawerFormType = {
  date: Dayjs | string;
  description: string | undefined;
};
