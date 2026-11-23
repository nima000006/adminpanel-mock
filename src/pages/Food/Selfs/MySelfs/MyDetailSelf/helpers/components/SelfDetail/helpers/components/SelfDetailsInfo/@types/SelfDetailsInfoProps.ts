import React from "react";

import { UploadFile } from "antd";

import { GetMySelfDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";

export type SelfDetailsInfoProps = {
  selfDetailData: GetMySelfDetailResponse | undefined;
  logo: UploadFile<any>[];
  banner: UploadFile<any>[];
  setLogo: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  setBanner: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
};
