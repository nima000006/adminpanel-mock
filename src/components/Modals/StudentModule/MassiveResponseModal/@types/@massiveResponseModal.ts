export type StudentResponseModalProps = {
  studentResponseModal: {
    isOpen: boolean;
    studentId: number;
  };
  setStudentResponseModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      studentId: number;
    }>
  >;
  title: string;
  mainModalCloseHandler: () => void;
};
