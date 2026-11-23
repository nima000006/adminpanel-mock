import {
  GetDetailAllSelfsHistoryContent,
  GetDetailAllSelfsHistoryResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsHistory/@types/@cateringAllSelfsHistory";
import {
  GetDetailMySelfsHistoryContent,
  GetDetailMySelfsHistoryResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/@types/@cateringMySelfsHistory";

export type CateringSelfsHistoryData =
  GetDetailAllSelfsHistoryResponse | GetDetailMySelfsHistoryResponse;

export type CateringSelfsHistoryRecordType =
  GetDetailAllSelfsHistoryContent | GetDetailMySelfsHistoryContent;

export type CateringSelfsHistoryProps = {
  data?: CateringSelfsHistoryData;
  isLoading?: boolean;
  onViewHandler?: (record: CateringSelfsHistoryRecordType) => void;
};
