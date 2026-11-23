import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBasicInfoType = {
  type: IdTitleName;
  count: number;
};

export type GetBasicInfoListResponse = DormitoryBasicInfoType[];
