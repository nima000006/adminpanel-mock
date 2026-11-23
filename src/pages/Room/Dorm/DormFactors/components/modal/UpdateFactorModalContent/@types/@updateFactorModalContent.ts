import { FormInstance } from "antd";

import { RoomFactorRow } from "@infra/models/tableModels/RoomTableModel/FactorTableModel/FactorTableModel";
import { UpdateDormFactorFormProps } from "@pages/Room/Dorm/DormFactors/@types/@dormFactors";

//! Layout
export type InfoContentProps = {
  info: Partial<RoomFactorRow>;
};

export type UpdateFactorModalContentProps = {
  info: Partial<RoomFactorRow>;
  form: FormInstance<UpdateDormFactorFormProps>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export type DisableFactorModalContentProps = Pick<UpdateFactorModalContentProps, "info">;
