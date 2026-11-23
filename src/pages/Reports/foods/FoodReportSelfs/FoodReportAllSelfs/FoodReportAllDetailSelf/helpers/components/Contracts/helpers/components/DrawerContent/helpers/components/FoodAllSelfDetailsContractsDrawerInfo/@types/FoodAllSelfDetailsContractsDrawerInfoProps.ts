import { UploadFile } from "antd";

import { AllContractListData } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";

export type FoodAllSelfDetailsContractsDrawerInfoProps = {
  firstFile: UploadFile<any>[];
  setFirstFile: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  secondFile: UploadFile<any>[];
  setSecondFile: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  ThirdFile: UploadFile<any>[];
  setThirdFile: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  fourthFile: UploadFile<any>[];
  setFourthFile: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  listData: AllContractListData | undefined;
};
