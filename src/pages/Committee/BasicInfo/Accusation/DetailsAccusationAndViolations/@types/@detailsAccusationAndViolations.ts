//!API
export type AssociationViolationPenalty = {
  tenant_id: null;
  selectableAppeal: boolean;
  description: string;
  selectablePrimitive: boolean;
  id: number;
  title: string;
  selectableCentral: boolean;
  createDate: string;
};
export type AssociationAdditionalViolationPunishment = {
  tenant_id: null;
  id: number;
  title: string;
  createDate: string;
  desc: string;
};

export type getDetailsAccusationAndViolationsData = {
  regulationsId: null;
  tenant_id: null;
  AssociationAdditionalViolationPunishment: AssociationAdditionalViolationPunishment[];
  AssociationRegulations: {
    date: string;
    tenant_id: null;
    number: string;
    lastModifiedDate: string;
    id: number;
    attach: null;
    title: string;
  };
  AssociationInfractionType: {
    sourceId: number;
    tenant_id: null;
    id: number;
    title: string;
    createDate: string;
    desc: string;
  };
  textType: string;
  title: string;
  type: number;
  AssociationViolationPenalty: AssociationViolationPenalty[];
  id: number;
  RegulId: number;
  desc: string;
  createDate: string;
};
export type getDetailsAccusationAndViolationsResponse = {
  data: getDetailsAccusationAndViolationsData;
  msg: string;
  status: number;
};
export type getDetailsAccusationAndViolationsRequest = {
  _data_: {
    id: string;
  };
};
