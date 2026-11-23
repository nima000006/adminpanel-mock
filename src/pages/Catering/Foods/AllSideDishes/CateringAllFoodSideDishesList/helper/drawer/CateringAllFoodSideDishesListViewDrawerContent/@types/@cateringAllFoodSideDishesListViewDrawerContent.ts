import { GetAllFoodHistoryContent } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/@types/@cateringAllFoodHistory";

export type CateringAllFoodSideDishesListViewDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
  onOpenHistoryDetail: (revisionNumber: number) => void;
};

export type CateringAllFoodSideDishesListViewHistoryRecordType = GetAllFoodHistoryContent;
