import { FormInstance } from "antd";

import { GetMyContractsListResponse } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";

export type MyFoodsListDrawerContentInfoProps = {
  myContractsListData: GetMyContractsListResponse | undefined;
  isMyContractsListLoading: boolean;
  form: FormInstance;
};
