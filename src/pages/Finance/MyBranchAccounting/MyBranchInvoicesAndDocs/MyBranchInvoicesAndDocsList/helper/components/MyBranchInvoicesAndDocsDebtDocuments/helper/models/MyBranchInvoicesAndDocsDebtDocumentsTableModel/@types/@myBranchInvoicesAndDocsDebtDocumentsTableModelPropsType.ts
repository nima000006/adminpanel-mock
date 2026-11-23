import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyInvoicesAndDocsDebtDocumentsTableModelPropsType = {
  openDetailDrawerHandler?: (id: string) => void;
};

export type MyInvoicesAndDocsDebtDocumentsAdvanceFilterFormType = {
  samimService: SelectType<IdTitle>;
  isPaid: SelectType<IdTitle>;
};
