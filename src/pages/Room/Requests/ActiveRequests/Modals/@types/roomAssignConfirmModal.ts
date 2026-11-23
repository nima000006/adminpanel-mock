//! LAYOUT
export type RoomAssignConfirmModalProps = {
  confirmModal: {
    isOpen: boolean;
    key: number;
  };
  setConfirmModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      key: number;
    }>
  >;
  onClickRejectUser: (id: number) => void;
};
