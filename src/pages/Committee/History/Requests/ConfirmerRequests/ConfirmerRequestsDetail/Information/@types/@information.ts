import { BPMS_API_RESPONSE } from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetViolationsInquiryResponse = BPMS_API_RESPONSE<
  {
    AssociationViolationStudent_uniStudent: string;
    AssociationViolationStudent_nationalCode: string;
    AssociationCommittee_title: string;
    AssociationViolationStudent_fieldStudent: string;
    executionDate: string;
    certainty: string;
    AssociationViolationStudent_gradeStudent: string;
    id: number;
    AssociationViolationStudent_createDate: string;
    AssociationViolationStudent_AssociationInfractions_title: string;
    AssociationViolationStudent_AssociationPlaintiffType_title: string;
  }[]
>;
