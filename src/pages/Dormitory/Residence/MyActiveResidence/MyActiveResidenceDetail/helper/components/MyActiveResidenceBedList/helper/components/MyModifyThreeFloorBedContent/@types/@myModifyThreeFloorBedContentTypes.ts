import { getMyActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";

export interface MyModifyThreeFloorBedContentProps {
  id: string;
  bedTypeTitle: string;
  bedDetailData: getMyActiveResidenceBedDetailResponse | undefined;
}
