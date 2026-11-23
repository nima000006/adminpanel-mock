import {
  SelectNewResidenceBase,
  SelectNewResidenceInfo,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceInfoCard/@types/@selectNewResidenceInfoCardTypes";

export type SelectNewResidenceComparisonProps = {
  base: SelectNewResidenceBase;
  current: SelectNewResidenceInfo;
  alternative: SelectNewResidenceInfo;
  moveNotes?: string[];
};
