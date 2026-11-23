import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetContractsDetailBaseInfoRequest = {
  contractId: number;
};

export type GetContractsDetailParty = {
  id: number;
  name: string;
  nationalCode: string;
};

export type GetContractsBeneficiary = {
  categoryTitle: string;
  supplierName: string;
  template: number;
  ruleBeneficiaries: number;
  hasTax: boolean;
  indexNumber: number;
  categoryId: number;
  ruleBeneficiaryStatus: IdTitleName;
  beneficiarySupport: IdTitle;
  isSupplier: boolean;
};

export type GetContractsDetailBaseInfoResponse = {
  id: number;
  title: string;
  parties: GetContractsDetailParty[];
  createdBy: string;
  createdDate: string;
  startDate: string;
  contractStatus: string;
  contractTitle: string;
  beneficiaries: GetContractsBeneficiary[];
  countConnectedContract: number;
};
