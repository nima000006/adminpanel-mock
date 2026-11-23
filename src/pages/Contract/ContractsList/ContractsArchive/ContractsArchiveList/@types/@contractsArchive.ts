import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type ContractsArchiveListFilterFormType = {
  ecosystemIds: SelectType<IdTitle>[];
  parties: SelectType<IdTitle>[];
  services: SelectType<IdTitleName>;
  categoryIds: SelectType<IdTitle>[];
  ruleBeneficiariesUsernames: SelectType<IdTitleName>;
  date: string[];
};
