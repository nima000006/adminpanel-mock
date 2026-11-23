import { FormInstance } from "antd";

export type MySelfListDrawerContentInfoContactProps = {
  form: FormInstance;
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  lng: number;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  rerenderTrigger: number;
  isProvinceSelected: boolean;
  setIsProvinceSelected: React.Dispatch<React.SetStateAction<boolean>>;
};
