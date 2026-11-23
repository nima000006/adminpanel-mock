import { FormInstance } from "antd";

export type FoodScheduleAdvanceFilterModalProps = {
  isModalOpen: boolean;
  onSubmit: ({
    date,
    self,
    contract,
    food,
    requestType,
    meal,
    status,
    branchCode,
  }: AdvancedFilterFormFoodSchedule) => void;
  closeModalHandler: () => void;
  title?: string;
  isDangerous?: boolean;
  centered?: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisable?: boolean;
  confirmBtnText?: string;
  customClass?: string;
  width?: number;
  htmlType?: "submit" | "button" | "reset" | undefined;
  titleIcon?: React.ReactNode;
  form: FormInstance<AdvancedFilterFormFoodSchedule>;
  pageType: string;
};

type SelectType = {
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

export type AdvancedFilterFormFoodSchedule = {
  date?: string;
  self?: SelectType;
  contract?: SelectType;
  food?: SelectType;
  requestType?: SelectType;
  meal?: SelectType;
  status?: SelectType;
  branchCode?: SelectType;
};
