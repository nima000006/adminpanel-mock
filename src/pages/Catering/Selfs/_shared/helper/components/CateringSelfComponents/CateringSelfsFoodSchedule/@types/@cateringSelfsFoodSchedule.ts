import {
  GetDetailAllSelfsFoodScheduleContent,
  GetDetailAllSelfsFoodScheduleResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";
import {
  GetDetailMySelfsFoodScheduleContent,
  GetDetailMySelfsFoodScheduleResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type CateringSelfsFoodScheduleData =
  GetDetailAllSelfsFoodScheduleResponse | GetDetailMySelfsFoodScheduleResponse;

export type CateringSelfsFoodScheduleRecordType =
  GetDetailAllSelfsFoodScheduleContent | GetDetailMySelfsFoodScheduleContent;

export type CateringSelfsFoodScheduleProps = {
  data?: CateringSelfsFoodScheduleData;
  isLoading?: boolean;
};

export type deactiveCateringSelfsListRequest = {
  id: number;
  statusType: number;
  deActiveReason?: number;
};
