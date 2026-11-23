import {
  CateringSelfAccessMode,
  CateringSelfRecordType,
  GetCateringSelfsListRequest,
  GetCateringSelfsListResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

export type CateringSelfListDrawerState = {
  open: boolean;
  mode: "create" | "edit";
  record?: CateringSelfRecordType | null;
};

export type UseCateringSelfListPageParams = {
  getCateringSelfsList: (request: GetCateringSelfsListRequest) => {
    unwrap: () => Promise<GetCateringSelfsListResponse>;
  };
  isSelfDataLoading: boolean;
  statusType: number[];
  variant: "list" | "archive";
  accessMode: CateringSelfAccessMode;
  defaultPageSize?: number;
};
