//! GENERAL
//! LAYOUT
//! API
export type ReportsAdditionalPunishment = {
  id: number;
  title: string;
  createDate: string;
};
export type GetReportsAdditionalPunishmentResponse = {
  msg: string;
  status: number;
  data: ReportsAdditionalPunishment[];
};
