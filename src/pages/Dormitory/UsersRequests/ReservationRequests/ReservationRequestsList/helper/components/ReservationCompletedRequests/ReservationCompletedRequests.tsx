import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ReservationCompletedRequestsStatus } from "@pages/Dormitory/_shared/utils";
import ReservationCompletedRequestsAccommodationCompletedList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationCompletedRequests/helper/components/AccommodationCompletedList/ReservationCompletedRequestsAccommodationCompletedList";
import ReservationCompletedRequestsCancelledList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationCompletedRequests/helper/components/CancelledList/ReservationCompletedRequestsCancelledList";
import ReservationCompletedRequestsExpiredList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationCompletedRequests/helper/components/ExpiredList/ReservationCompletedRequestsExpiredList";
import ReservationCompletedRequestsRejectedList from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationCompletedRequests/helper/components/RejectedList/ReservationCompletedRequestsRejectedList";

const ReservationCompletedRequests = () => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <DemandCard
          title="اتمام اسکان"
          active={
            url?.status === ReservationCompletedRequestsStatus.accommodationCompleted
          }
          clickHandler={() =>
            changeCardHandler(ReservationCompletedRequestsStatus.accommodationCompleted)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="رد شده"
          active={url?.status === ReservationCompletedRequestsStatus.rejected}
          clickHandler={() =>
            changeCardHandler(ReservationCompletedRequestsStatus.rejected)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="منقضی شده"
          active={url?.status === ReservationCompletedRequestsStatus.expired}
          clickHandler={() =>
            changeCardHandler(ReservationCompletedRequestsStatus.expired)
          }
          badgeTitle={"10"}
          className="w-full"
        />
        <DemandCard
          title="لغو شده"
          active={url?.status === ReservationCompletedRequestsStatus.cancelled}
          clickHandler={() =>
            changeCardHandler(ReservationCompletedRequestsStatus.cancelled)
          }
          badgeTitle={"10"}
          className="w-full"
        />
      </div>
      {url?.status === ReservationCompletedRequestsStatus.accommodationCompleted ? (
        <ReservationCompletedRequestsAccommodationCompletedList /> //اتمام اسکان
      ) : url?.status === ReservationCompletedRequestsStatus.rejected ? (
        <ReservationCompletedRequestsRejectedList /> //رد شده
      ) : url?.status === ReservationCompletedRequestsStatus.expired ? (
        <ReservationCompletedRequestsExpiredList /> //منقضی شده
      ) : url?.status === ReservationCompletedRequestsStatus.cancelled ? (
        <ReservationCompletedRequestsCancelledList /> //لغو شده
      ) : null}
    </div>
  );
};

export default ReservationCompletedRequests;
