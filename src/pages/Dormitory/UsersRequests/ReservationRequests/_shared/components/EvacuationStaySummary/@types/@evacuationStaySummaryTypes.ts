import {
  EvacuationStaySummaryData,
  EvacuationTiming,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

export type EvacuationStaySummaryProps = {
  timing: EvacuationTiming;
  data: EvacuationStaySummaryData;
};
