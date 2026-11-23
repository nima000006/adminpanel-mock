import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { GetContractTemplateDetailResponse } from "../../../@types/@contractsTemplateDetail";

export type ContractBasicInfoTabProps = {
  dataSource: GetContractTemplateDetailResponse | undefined;
  onRefresh?: () => void;
  loading?: boolean;
  isArchive?: boolean;
};

export type ChangeModalFormType = {
  changeDate: string;
  reasonChange: SelectType<IdTitleName>;
  desc: string;
};

export type CopyToDraftContractRequest = {
  contractId: number;
  body: { title: string; subject: string };
};

export type addNewServiceRequest = {
  contractId: number;
  categoryId: number;
};

export type deActiveTemplateContractRequest = {
  id: number;
  reason: string;
  description: string;
};
