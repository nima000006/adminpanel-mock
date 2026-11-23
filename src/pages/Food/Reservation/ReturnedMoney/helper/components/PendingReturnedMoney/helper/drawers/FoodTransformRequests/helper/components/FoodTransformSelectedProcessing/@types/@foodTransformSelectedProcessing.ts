import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";

export type FoodTransformSelectedProcessingProps = {
  dataSource: CancelRequestsType[];
  total: number | null;
  loading: boolean;
  onRemove: (ids: React.Key[]) => void;
};
