//! GENERAL
//! LAYOUT
//! API
export type RulesAndRegulations = {
  date: string;
  number: string;
  lastModifiedDate: null;
  id: number;
  attach: null;
  title: string;
};
export type GetRulesAndRegulationsResponse = {
  msg: string;
  status: number;
  data: RulesAndRegulations[];
};
