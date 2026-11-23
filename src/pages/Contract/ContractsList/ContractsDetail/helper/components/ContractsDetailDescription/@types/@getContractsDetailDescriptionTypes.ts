export type GetContractsDetailDescriptionFile = {
  id: number;
  name: string;
  fileName: string;
  url: string;
};

export type GetContractsDetailDescriptionCommitment = {
  id: number;
  type: string;
  clause: string;
  title: string;
  isDefault: boolean;
  systematic: boolean;
};

export type GetContractsDetailDescriptionResponse = {
  title: string;
  subject: string;
  commitments: GetContractsDetailDescriptionCommitment;
  guarantees: GetContractsDetailDescriptionCommitment;
  liquidatedDamages: GetContractsDetailDescriptionCommitment;
  disputedResolution: GetContractsDetailDescriptionCommitment;
  accountingSettlementConditions: GetContractsDetailDescriptionCommitment;
  terminationConditions: GetContractsDetailDescriptionCommitment;
  other: GetContractsDetailDescriptionCommitment[];
  files: GetContractsDetailDescriptionFile[];
};

export type getContractsDetailDescriptionRequest = {
  id: number;
};
