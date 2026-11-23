import { getDetailAllSelfResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsDetail/@types/@cateringAllSelfsDetail";
import { getDetailMySelfsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsDetail/@types/@cateringMySelfsDetail";

export type CateringSelfsDetailData = getDetailAllSelfResponse | getDetailMySelfsResponse;

export type CateringSelfsDetailProps = {
  data?: CateringSelfsDetailData;
  isLoading?: boolean;
  onEdit?: () => void;
};
