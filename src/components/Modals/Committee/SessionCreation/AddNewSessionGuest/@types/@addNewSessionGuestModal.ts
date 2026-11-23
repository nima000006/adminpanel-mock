import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type AddNewSessionGuestModalProps = {
  isModalOpen: { isOpen: boolean; id: number };
  setAddNewSessionGuestModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; id: number }>
  >;
};
//! API
export type GetAgendaListResponse = BPMS_API_RESPONSE<
  {
    nationalCode: string;
    studentName: string;
    id: number;
    meeting: number;
    studentFamily: string;
  }[]
>;
