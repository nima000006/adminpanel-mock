import useQueryParams from "@infra/hooks/useQueryParams";

import PendingReviewRelocationRequestInfo from "./helper/components/PendingReviewRelocation/PendingReviewRelocationRequestInfo";
import PendingReviewRenewalAndReserveRequestInfo from "./helper/components/PendingReviewRenewalAndReserve/PendingReviewRenewalAndReserveRequestInfo";
import PendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo from "./helper/components/PendingReviewRenewalAndReserveUnconfirmedReservation/PendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo";
import "./_usersRequestsDetailPendingReviewRequestsInfo.scss";

const UsersRequestsDetailPendingReviewRequestsInfo = () => {
  const {
    params: { requestType, reservationTypeId },
  } = useQueryParams();

  return (
    <div className="users-requests-detail-pending-review-requests-info-container">
      {+requestType !== 3 ? (
        <>
          {/* درخواست تمدید و رزرو */}
          {+reservationTypeId === 3 ? (
            <PendingReviewRenewalAndReserveRequestInfo /> // رزرو خوابگاه / رزرو غیرقطعی
          ) : (
            <PendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo /> // رزرو غیرقطعی با انتخاب اتاق یا تخت
          )}
        </>
      ) : (
        <PendingReviewRelocationRequestInfo /> // درخواست جا به جایی
      )}
    </div>
  );
};

export default UsersRequestsDetailPendingReviewRequestsInfo;
