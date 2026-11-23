//! LAYOUT
export type ConfirmationModalProps = {
  title: string;
  msg: string;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  onConfirmClickHandler: () => void;
};
