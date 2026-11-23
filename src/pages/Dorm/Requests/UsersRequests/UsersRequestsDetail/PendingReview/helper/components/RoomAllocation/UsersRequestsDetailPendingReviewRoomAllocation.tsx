import useQueryParams from "@infra/hooks/useQueryParams";

import PendingReviewRelocationRequest from "./helper/sections/Relocation/PendingReviewRelocationRequest";
import PendingReviewRenewalAndReserveDormReservation from "./helper/sections/RenewalAndReserve/DormReservation/PendingReviewRenewalAndReserveDormReservation";
import PendingReviewRenewalAndReserveUnconfirmedReservation from "./helper/sections/RenewalAndReserve/UnconfirmedReservation/PendingReviewRenewalAndReserveUnconfirmedReservation";
import "./_usersRequestsDetailPendingReviewRoomAllocation.scss";

const UsersRequestsDetailPendingReviewRoomAllocation = () => {
  // در انتظار بررسی جزئیات
  const {
    params: { requestType, reservationTypeId },
  } = useQueryParams();

  return (
    <div className="users-requests-detail-pending-review-room-allocation-container">
      {+requestType !== 3 ? (
        <>
          {/* درخواست تمدید و رزرو */}
          {+reservationTypeId === 3 ? (
            <PendingReviewRenewalAndReserveDormReservation /> // رزرو خوابگاه / رزرو غیرقطعی
          ) : (
            <PendingReviewRenewalAndReserveUnconfirmedReservation /> // رزرو غیرقطعی اتاق
          )}
        </>
      ) : (
        <PendingReviewRelocationRequest /> // درخواست جا به جایی
      )}
    </div>
  );
};

export default UsersRequestsDetailPendingReviewRoomAllocation;
