import { FormInstance } from "antd";

import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllSelfListDrawerContentInfoProps = {
  universityData: GetAllBranchesResponse | undefined;
  isUniversityDataLoading: boolean;
  form: FormInstance;
};
