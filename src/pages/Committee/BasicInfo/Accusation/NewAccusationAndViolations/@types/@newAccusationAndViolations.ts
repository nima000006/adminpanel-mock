import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
import { getDetailsAccusationAndViolationsData } from "../../DetailsAccusationAndViolations/@types/@detailsAccusationAndViolations";
//! GENERAL
//! LAYOUT
//! API
export type GetAllowedPunishmentTableResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type CreateOrEditRulesAndRegulationsResponse =
  BPMS_API_RESPONSE<getDetailsAccusationAndViolationsData>;
export type SelectRequestList = {
  title: string;
  id: number;
};
export type CreateOrEditViolationsRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    AssociationViolationPenalty: SelectRequestList[];
    AssociationAdditionalViolationPunishment: SelectRequestList[];
    desc: string;
    type: number | null;
    RegulId: number | null;
    regulationsId?: string;
    tenant_id?: null;
    AssociationRegulations?: SelectRequestList;
    AssociationInfractionType?: SelectRequestList;
    textType?: string;
    id: number | null;
    createDate: string;
  }
>;
