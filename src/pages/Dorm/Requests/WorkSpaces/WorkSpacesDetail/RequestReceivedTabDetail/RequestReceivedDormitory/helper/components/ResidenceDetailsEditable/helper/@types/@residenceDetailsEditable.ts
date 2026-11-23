import { FormInstance } from "antd";

import { ResidenceDetailInfoType } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";

export type ResidenceDetailsEditableProps = {
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  lat: number;
  lng: number;
  selectedRowKeys: React.Key[];
  loading: boolean;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  residenceData: ResidenceDetailInfoType | undefined;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => void;
};
