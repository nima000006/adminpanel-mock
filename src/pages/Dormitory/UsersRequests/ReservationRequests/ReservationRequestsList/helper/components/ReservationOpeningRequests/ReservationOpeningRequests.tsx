import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ReservationOpeningRequestsStatus } from "@pages/Dormitory/_shared/utils";
import ReservationOpeningRequestsPendingDeliveryList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationOpeningRequests/helper/components/PendingDeliveryList/ReservationOpeningRequestsPendingDeliveryList";
import ReservationOpeningRequestsPendingExtensionList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationOpeningRequests/helper/components/PendingExtensionList/ReservationOpeningRequestsPendingExtensionList";
import ReservationOpeningRequestPendingResidenceStartList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationOpeningRequests/helper/components/PendingResidenceStartList/ReservationOpeningRequestPendingResidenceStartList";
import ReservationOpeningRequestsPendingReviewList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationOpeningRequests/helper/components/PendingReviewList/ReservationOpeningRequestsPendingReviewList";

const ReservationOpeningRequests = () => {
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: ReservationOpeningRequestsStatus.pendingReview });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <DemandCard
          title="در انتظار تمدید"
          active={url?.status === ReservationOpeningRequestsStatus.pendingExtension}
          clickHandler={() =>
            changeCardHandler(ReservationOpeningRequestsStatus.pendingExtension)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="در انتظار بررسی"
          active={url?.status === ReservationOpeningRequestsStatus.pendingReview}
          clickHandler={() =>
            changeCardHandler(ReservationOpeningRequestsStatus.pendingReview)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="درانتظار تحویل"
          active={url?.status === ReservationOpeningRequestsStatus.pendingDelivery}
          clickHandler={() =>
            changeCardHandler(ReservationOpeningRequestsStatus.pendingDelivery)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="درانتظار شروع اسکان تمدیدی"
          active={url?.status === ReservationOpeningRequestsStatus.pendingResidenceStart}
          clickHandler={() =>
            changeCardHandler(ReservationOpeningRequestsStatus.pendingResidenceStart)
          }
          badgeTitle={"10"}
          className="w-full"
        />
      </div>
      {url?.status === ReservationOpeningRequestsStatus.pendingExtension ? ( // "در انتظار تمدید"
        <ReservationOpeningRequestsPendingExtensionList />
      ) : url?.status === ReservationOpeningRequestsStatus.pendingReview ? ( // "در انتظار بررسی"
        <ReservationOpeningRequestsPendingReviewList />
      ) : url?.status === ReservationOpeningRequestsStatus.pendingDelivery ? ( // "درانتظار تحویل"
        <ReservationOpeningRequestsPendingDeliveryList />
      ) : url?.status === ReservationOpeningRequestsStatus.pendingResidenceStart ? ( // "درانتظار شروع اسکان تمدیدی"
        <ReservationOpeningRequestPendingResidenceStartList />
      ) : null}
    </div>
  );
};

export default ReservationOpeningRequests;
