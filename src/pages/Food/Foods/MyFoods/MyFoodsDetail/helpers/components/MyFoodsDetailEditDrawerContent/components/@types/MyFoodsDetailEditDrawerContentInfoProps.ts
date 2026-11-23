import { FormInstance } from "antd";

import { GetMyContractsListResponse } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";

export type MyFoodsDetailEditDrawerContentInfoProps = {
  myContractsListData: GetMyContractsListResponse | undefined;
  form: FormInstance;
  isMyContractsListLoading: boolean;
};
