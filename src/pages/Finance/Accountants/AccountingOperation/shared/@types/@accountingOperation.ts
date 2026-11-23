import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AccountingOperationPaymentQueueAdvanceFilterFormType = {
  branch: SelectType<IdTitleName>[];
  service: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
};

export type GetAccountingAllSamimServiceResponse = IdTitleName[];
