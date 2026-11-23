import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type FactorsAndDocsCreditorDocumentsFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  possibilitySettlement: IdTitle[];
  status: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
};
