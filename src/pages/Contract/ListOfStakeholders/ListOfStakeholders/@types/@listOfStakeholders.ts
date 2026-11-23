import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type StakeholdersListAdvanceFilterFormTYpe = {
  ecosystemIds: SelectType<IdTitle>[];
  status: SelectType<IdTitleName>;
  ruleTypes: SelectType<IdTitleName>[];
  branchTypes: SelectType<IdTitleName>;
  services: SelectType<IdTitleName>;
  categoryIds: string[];
  date: string[];
};
