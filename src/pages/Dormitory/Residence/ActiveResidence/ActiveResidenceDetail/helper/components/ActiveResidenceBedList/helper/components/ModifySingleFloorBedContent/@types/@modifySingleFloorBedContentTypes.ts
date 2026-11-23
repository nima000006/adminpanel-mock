import { getActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";

export interface ModifySingleFloorBedContentProps {
  id: string;
  bedTypeTitle: string;
  bedDetailData: getActiveResidenceBedDetailResponse | undefined;
}
