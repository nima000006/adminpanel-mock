import React from "react";

import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";

export type FoodTransInstantSettlementDrawerContentProps = {
  closeDrawerHandler: () => void;
  selectedRequests: CancelRequestsType[];
  setSelectedRequests: React.Dispatch<React.SetStateAction<CancelRequestsType[]>>;
};
