import { GetBedTypeResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";

export interface CreateBedModalContentProps {
  setIsModifyDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string;
    }>
  >;
  bedTypeList: GetBedTypeResponse;
  isGetBedTypeLoading: boolean;
}
