import {
  GetAllFoodHistoryContent,
  GetAllFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/@types/@cateringAllFoodHistory";
import {
  GetMyFoodHistoryContent,
  GetMyFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/@types/@cateringMyFoodHistory";

export type CateringFoodHistoryData =
  GetAllFoodHistoryResponse | GetMyFoodHistoryResponse;

export type CateringFoodHistoryRecordType =
  GetAllFoodHistoryContent | GetMyFoodHistoryContent;

export type CateringFoodHistoryProps = {
  data?: CateringFoodHistoryData;
  isLoading?: boolean;
  onViewHandler?: (record: CateringFoodHistoryRecordType) => void;
};
