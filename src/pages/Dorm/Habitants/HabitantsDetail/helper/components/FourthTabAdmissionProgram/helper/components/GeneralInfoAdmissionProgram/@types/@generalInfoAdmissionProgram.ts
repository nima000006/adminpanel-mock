import { HabitantAdmissionTabData } from "../../../../@types/@fourthTabAdmissionProgram";

//! LAYOUT
export type GeneralInfoAdmissionProgramProps = {
  data: HabitantAdmissionTabData;
};

export type HabitantsAdmissionTimingInfoProps = {
  dataSource: {
    title: string;
    startDate: string;
    endDate: string;
  }[];
};
