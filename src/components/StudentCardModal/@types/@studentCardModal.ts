import { userData } from "../../../infrastructure/models/general.model";

//! GENERAL
export type AdminActionModalProps = {
  isModalOpen: boolean;
  title?: string;
  id?: number;
};

//!LAYOUT
export type StudentCardModalProps = {
  studentModal: {
    isOpen: boolean;
    id: number;
  };
  setStudentModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  getListData: () => void;
};

//!APIs
export type getStudentInfoResponse = {
  status: number;
  msg: string;
  data: userData;
};

export type GetStudentPrevOrNextRequest = {
  state: "prev" | "next";
  studentCardId: number;
};

export type UpdateStudentCardStatusRequest = {
  id: number;
  status: number;
  comment: string;
};

export type UpdateStudentCardStatusResponse = {
  status: number;
  msg: string;
  data: userData;
};
