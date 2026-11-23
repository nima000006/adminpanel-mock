import { ReservationCompletedRequestsStatus } from "@pages/Dormitory/_shared/utils";

export const ReservationCompletedRequestsStatusColor = {
  [ReservationCompletedRequestsStatus.accommodationCompleted]: "magenta",
  [ReservationCompletedRequestsStatus.rejected]: "red",
  [ReservationCompletedRequestsStatus.expired]: "default",
  [ReservationCompletedRequestsStatus.cancelled]: "volcano",
};
