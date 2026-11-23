import { FormInstance } from "antd";

import { GetAllContractsListResponse } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";

export type AllFoodsDetailEditDrawerContentInfoProps = {
  allContractsListData: GetAllContractsListResponse | undefined;
  isAllContractsListLoading: boolean;
  form: FormInstance;
};
