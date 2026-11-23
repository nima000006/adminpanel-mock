import { Dispatch, SetStateAction } from "react";

import { UploadFile } from "antd";

import { AllContractListData } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";

export type FoodMySelfContractsDrawerInfoProps = {
  firstFile: UploadFile[];
  secondFile: UploadFile[];
  thirdFile: UploadFile[];
  fourthFile: UploadFile[];
  setFirstFile: Dispatch<SetStateAction<UploadFile[]>>;
  setSecondFile: Dispatch<SetStateAction<UploadFile[]>>;
  setThirdFile: Dispatch<SetStateAction<UploadFile[]>>;
  setFourthFile: Dispatch<SetStateAction<UploadFile[]>>;
  listData?: AllContractListData;
};
