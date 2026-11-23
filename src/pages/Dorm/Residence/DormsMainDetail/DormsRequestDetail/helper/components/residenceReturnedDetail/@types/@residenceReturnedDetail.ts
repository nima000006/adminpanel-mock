import { FormInstance } from "antd";

import { ResidenceDetailInfoType } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";

export type ResidenceReturnedDetailProps = {
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<ResidenceFormFields>;
  lat: number;
  lng: number;
  selectedRowKeys: React.Key[];
  loading: boolean;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  residenceData: ResidenceDetailInfoType | undefined;
  getData: () => void;
};

export type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type ResidenceFormFields = {
  residenceName: string;
  residenceType: SelectType;
  quality: SelectType;
  capacity: number;
  branch: SelectType;
  gender: SelectType;
  province: SelectType;
  city: SelectType;
  postalCode: string;
  phone: string;
  address: string;
  description: string;
  desc: string;
  area: number;
  greenSpaceArea: number;
  status?: SelectType;
  [key: `description${string}`]: string | undefined;
};
