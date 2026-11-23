import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractsTemplateArchiveListAdvanceFilterFormType = {
  ecosystemIds: SelectType<IdTitle>[];
  services: SelectType<IdTitleName>;
  categoryIds: SelectType<IdTitle>[];
  parties: SelectType<IdTitle>[];
};
