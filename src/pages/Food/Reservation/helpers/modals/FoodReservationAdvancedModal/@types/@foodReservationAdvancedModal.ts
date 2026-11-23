import { FormInstance } from "antd";

export type AdvancedFilterForm = {
  date?: string[];
  firstName?: string;
  lastName?: string;
  username?: string;
  studentNumber?: string;
  branchCode?: any;
  restaurantId?: any;
  requestType?: any;
  mealId?: any;
  delivery?: any;
};

export type FoodReservationAdvancedModalProps = {
  pageType: "admin" | "manager";
  isModalOpen: boolean;
  onSubmit: ({
    date,
    branchCode,
    lastName,
    mealId,
    firstName,
    username,
    restaurantId,
    studentNumber,
    requestType,
    delivery,
  }: AdvancedFilterForm) => void;
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
  form: FormInstance<AdvancedFilterForm>;
};
