import { FormInstance } from "antd";

export type ExcelModalProps = {
  isModalOpen: boolean;
  onExcelSubmit: ({
    count,
    totalItems,
  }: {
    count?: string;
    totalItems?: ["all"];
  }) => void;
  closeModalHandler: () => void;
  title?: string;
  inputLabel?: string;
  isDangerous?: boolean;
  centered?: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisable?: boolean;
  confirmBtnText?: string;
  customClass?: string;
  width?: number;
  htmlType?: "submit" | "button" | "reset" | undefined;
  titleIcon?: React.ReactNode;
  form: FormInstance<{ count?: string; totalItems?: ["all"] }>;
};
