export type AdvancedFilterProps = {
  isModalOpen?: boolean;
  onConfirmClickHandler: () => void;
  closeModalHandler: () => void;
  title?: string;
  isDangerous?: boolean;
  centered?: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisable?: boolean;
  confirmBtnText?: string;
  backBtnText?: string;
  content: React.ReactNode;
  customClass?: string;
  width?: number;
  htmlType?: "submit" | "button" | "reset" | undefined;
  titleIcon?: React.ReactNode;
};
