//! GENERAL
//! LAYOUT
export type AddNewSessionRuleModalProps = {
  isModalOpen: { isOpen: boolean; id: number };
  setAddNewSessionRuleModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; id: number }>
  >;
};
export type FilterDataType = {
  name?: string;
  family?: string;
  nationalCode?: string;
  studentNumber?: string;
  mobile?: string;
  id?: number;
};
//! APIS
