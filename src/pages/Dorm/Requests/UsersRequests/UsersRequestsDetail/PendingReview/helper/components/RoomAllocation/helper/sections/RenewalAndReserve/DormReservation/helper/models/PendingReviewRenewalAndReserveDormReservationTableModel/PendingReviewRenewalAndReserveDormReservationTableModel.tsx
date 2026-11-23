import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { PendingReviewRenewalAndReserveDormReservationTableModelProps } from "./@types/@pendingReviewRenewalAndReserveDormReservationTableModel";
import {
  title,
  activebed,
  freebed,
  price,
  TableModelId,
} from "./utils/pendingReviewRenewalAndReserveDormTableReservationModel";

const PendingReviewRenewalAndReserveDormReservationTableModel = ({
  openBedAllocationHandler,
  openViewDetailHandler,
}: PendingReviewRenewalAndReserveDormReservationTableModelProps) => {
  return [
    title,
    activebed,
    freebed,
    price,
    {
      ...TableModelId,
      render: (id: number) => {
        return (
          <div className="rooms-list-btn-container">
            <CustomButton
              type="text"
              className="text-link"
              onClick={() => openBedAllocationHandler(id)}
            >
              تخصیص تخت
            </CustomButton>
            <CustomButton
              type="text"
              className="text-link"
              onClick={() => openViewDetailHandler(id)}
            >
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default PendingReviewRenewalAndReserveDormReservationTableModel;
