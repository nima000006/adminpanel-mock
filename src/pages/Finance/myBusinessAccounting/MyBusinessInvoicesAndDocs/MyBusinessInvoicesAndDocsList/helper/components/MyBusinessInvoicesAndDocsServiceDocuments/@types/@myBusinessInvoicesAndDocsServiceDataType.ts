import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyBusinessInvoicesAndDocsServiceDataType = {
  statusDocuments: number;
  id: string;
  amount: number;
  branch: string;
  service: string;
  city: string;
  province: string;
  createAt: string;
};

export type MyBusinessInvoicesAndDocsServiceDocumentsAdvanceFilterFormType = {
  service: SelectType<IdTitleName>[];
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  possibilitySettlement: SelectType<IdTitleName>;
  status: SelectType<IdTitleName>;
};
