import { getActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";

export interface ModifySecondFloorBedContentProps {
  id: string;
  bedTypeTitle: string;
  bedDetailData: getActiveResidenceBedDetailResponse | undefined;
}
