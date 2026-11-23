import { GetAllFoodHistoryDetailResponse } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/@types/@cateringAllFoodHistory";
import { GetMyFoodHistoryDetailResponse } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/@types/@cateringMyFoodHistory";

export type CateringFoodHistoryDrawerContentData =
  GetAllFoodHistoryDetailResponse | GetMyFoodHistoryDetailResponse;

export type CateringFoodHistoryDrawerContentProps = {
  data?: CateringFoodHistoryDrawerContentData;
  isLoading?: boolean;
  onClose: () => void;
};
