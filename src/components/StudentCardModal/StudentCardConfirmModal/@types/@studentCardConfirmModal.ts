//! LAYOUT
export type StudentCardConfirmModalProps = {
  isCloseRequestModalOpen: boolean;
  setIsCloseRequestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAdminModalConfirmHandler: (params: { isClosingRequest: boolean }) => void;
  isUpdateStudentCardStatusLoading: boolean;
  setAdminActionModal: React.Dispatch<React.SetStateAction<{ isModalOpen: boolean }>>;
};
