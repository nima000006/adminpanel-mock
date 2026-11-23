import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestsContractsListWaitedDrawerContentFormTypes = {
  reason: SelectType<IdTitle>;
  description?: string;
};

export type GetAllRequestContractRejectReasonsRequest = void;

export type GetAllRequestContractRejectReasonsResponse = {
  id: number;
  title: string;
}[];
