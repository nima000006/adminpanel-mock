//! LAYOUT
export type StatusHistoryModalProps = {
  historyModal: {
    id: number;
    isOpen: boolean;
  };
  setHistoryModal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      isOpen: boolean;
    }>
  >;
  // studentId: number | undefined;
};

//! APIs
export type GetStudentDateHistoryInfoResponse = {
  status: number;
  msg: string;
  data: {
    id: number;
    name: string;
    comment: null;
    requestDate: string;
  }[];
};
