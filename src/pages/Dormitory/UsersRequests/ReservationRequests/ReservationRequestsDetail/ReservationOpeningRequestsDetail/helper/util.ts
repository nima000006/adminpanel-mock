import { ReservationOpeningRequestsStatus } from "@pages/Dormitory/_shared/utils";

export const ReservationOpeningRequestsStatusColor = {
  [ReservationOpeningRequestsStatus.pendingExtension]: "geekblue",
  [ReservationOpeningRequestsStatus.pendingReview]: "gold",
  [ReservationOpeningRequestsStatus.pendingDelivery]: "purple",
  [ReservationOpeningRequestsStatus.pendingResidenceStart]: "cyan",
};
