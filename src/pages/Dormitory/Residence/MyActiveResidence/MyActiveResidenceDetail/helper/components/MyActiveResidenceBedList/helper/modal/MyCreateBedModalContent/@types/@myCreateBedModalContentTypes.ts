import { GetBedTypeResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";

export interface MyCreateBedModalContentProps {
  setIsModifyDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string;
    }>
  >;
  bedTypeList: GetBedTypeResponse;
  isGetBedTypeLoading: boolean;
}
