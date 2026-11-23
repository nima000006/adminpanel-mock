import { DormRequestResidenceInfo } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

export type UnconfirmedReservationAnotherRoomAllocationDrawerContentProps = {
  closeDrawerHandler: () => void;
  dormId: number | undefined;
  residenceInfo: DormRequestResidenceInfo | null;
};
