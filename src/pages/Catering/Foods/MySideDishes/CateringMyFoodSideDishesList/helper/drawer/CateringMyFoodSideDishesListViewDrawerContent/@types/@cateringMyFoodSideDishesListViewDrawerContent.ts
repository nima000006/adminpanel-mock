import { GetMyFoodHistoryContent } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/@types/@cateringMyFoodHistory";

export type CateringMyFoodSideDishesListViewDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
  onOpenHistoryDetail: (revisionNumber: number) => void;
};

export type CateringMyFoodSideDishesListViewHistoryRecordType = GetMyFoodHistoryContent;
