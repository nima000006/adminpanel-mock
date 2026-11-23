import { AdminActionModalProps } from "../../@types/@studentCardModal";

//! LAYOUT
export type StudentAdminDescriptionModalProps = {
  adminActionModal: AdminActionModalProps;
  setAdminActionModal: React.Dispatch<React.SetStateAction<AdminActionModalProps>>;
  isUpdateStudentCardStatusLoading: boolean;
  onTextAreaChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAdminModalConfirmHandler: (data: { isClosingRequest: boolean }) => void; // isClosingRequest: boolean;
};
