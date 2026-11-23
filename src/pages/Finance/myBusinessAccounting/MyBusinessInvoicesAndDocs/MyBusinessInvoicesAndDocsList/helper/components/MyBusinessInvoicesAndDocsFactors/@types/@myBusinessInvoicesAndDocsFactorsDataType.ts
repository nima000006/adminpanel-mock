export type MyBusinessInvoicesAndDocsFactorsDataType = {
  statusDocuments: number;
  id: string;
  amount: number;
  branch: string;
  service: string;
  city: string;
  province: string;
  createAt: string;
  percentageBeneficial: string;
  factorType: number;
};
type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};
export type MyBusinessInvoicesAndDocsFactorsAdvanceFilterFormType = {
  province: SelectTypes[];
  city: SelectTypes[];
  branch: SelectTypes[];
  service: SelectTypes[];
  factorType: SelectTypes[];
};
