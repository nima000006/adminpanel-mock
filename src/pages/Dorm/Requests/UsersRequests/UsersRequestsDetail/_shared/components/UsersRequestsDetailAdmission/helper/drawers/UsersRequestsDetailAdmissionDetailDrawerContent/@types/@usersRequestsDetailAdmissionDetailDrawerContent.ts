import { HabitantAdmissionTabData } from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";

//! LAYOUT
export type UsersRequestsDetailAdmissionDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number | undefined;
  admissionTariffData: HabitantAdmissionTabData | null;
};
