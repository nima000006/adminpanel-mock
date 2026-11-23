import { FormInstance } from "antd";

import { GetAllContractsListResponse } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";

export type AllFoodsListDrawerContentInfoProps = {
  allContractsListData: GetAllContractsListResponse | undefined;
  form: FormInstance;
  isAllContractsListLoading: boolean;
};
