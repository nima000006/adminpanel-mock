export type ContractSalesShareServiceItem = {
  id: string;
  serviceTitle: string;
  sharePercent: number;
};

export type ContractSalesShareMockData = {
  business: string;
  branch: string;
  services: ContractSalesShareServiceItem[];
};

export type ContractSalesShareProps = {
  data: ContractSalesShareMockData;
};
