import { ResidenceDetailInfoType } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";

//! LAYOUT
export type ResidenceDetailsProps = {
  setLng?: React.Dispatch<React.SetStateAction<number>>;
  lat?: number;
  lng?: number;
  setLat?: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  data: ResidenceDetailInfoType | undefined;
};

export type TitleIdType = {
  id: number;
  title: string;
};
