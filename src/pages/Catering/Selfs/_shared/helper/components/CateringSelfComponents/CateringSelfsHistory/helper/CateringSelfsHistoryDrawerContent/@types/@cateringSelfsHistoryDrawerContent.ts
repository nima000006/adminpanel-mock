import { GetDetailAllSelfsHistoryDetailResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsHistory/helper/components/CateringAllSelfsHistoryDrawer/@types/@cateringAllSelfsHistoryDrawer";
import { GetDetailMySelfsHistoryDetailResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/helper/components/CateringMySelfsHistoryDrawer/@types/@cateringMySelfsHistoryDrawer";

export type CateringSelfsHistoryDrawerContentData =
  GetDetailAllSelfsHistoryDetailResponse | GetDetailMySelfsHistoryDetailResponse;

export type CateringSelfsHistoryDrawerContentProps = {
  data?: CateringSelfsHistoryDrawerContentData;
  isLoading?: boolean;
  onClose: () => void;
};
