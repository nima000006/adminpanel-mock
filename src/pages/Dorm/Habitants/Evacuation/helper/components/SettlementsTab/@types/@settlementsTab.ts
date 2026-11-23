import { FormInstance } from "antd";
import { SetURLSearchParams } from "react-router";

import { CountResponse } from "@pages/Committee/BasicInfo/Accusation/AccusationAndViolations/@types/@accusationAndViolations";
import {
  HabitantsEvacuationListData,
  ModalFormType,
} from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";

export type HabitantsSettlementsDrawerContentProps = {
  closeDrawerHandler: () => void;
  data: HabitantsEvacuationListData | null;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HabitantsSettlementsModalContentProps = {
  form: FormInstance<ModalFormType>;
};
export type HabitantsCreditorsModalContentProps = {
  form: FormInstance<ModalFormType>;
  data: number | null;
};

export type SettlementsTabProps = {
  dataSource: HabitantsEvacuationListData[];
  ListLoading: boolean;
  CountLoading: boolean;
  habitantsListCount: CountResponse | undefined;
  isAllEvacuationLoading?: boolean;
  allEvacuationHandler?: () => void;
  selectedRowKeys: React.Key[];
  onSelectedRowKeysChange: (keys: React.Key[]) => void;
  url: Record<string, string>;
  setSearchParams: SetURLSearchParams;
  tabType: number;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
};
