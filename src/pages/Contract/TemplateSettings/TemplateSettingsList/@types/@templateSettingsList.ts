import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type TemplateSettingsListFormType = {
  rules: SelectType<IdTitleName>;
  search: string;
};

// ! APIs
export type GetContractTermsTypeListResponse = IdTitleName[];
