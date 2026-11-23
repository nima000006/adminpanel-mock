import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyBusinessInvoicesAndDocsDebtDocumentsTableModelPropsType = {
  openDetailDrawerHandler: (id: string) => void;
};

export type MyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilterFormType = {
  service: SelectType<IdTitleName>[];
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  possibilitySettlement: SelectType<IdTitleName>;
  status: SelectType<IdTitleName>;
};
