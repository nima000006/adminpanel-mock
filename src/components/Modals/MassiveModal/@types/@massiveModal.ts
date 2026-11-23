//! LAYOUT
export type MassiveModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  title?: string;
};
