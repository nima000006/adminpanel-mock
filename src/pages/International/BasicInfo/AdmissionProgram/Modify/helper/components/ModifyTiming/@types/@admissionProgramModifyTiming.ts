import dayjs from "dayjs";

// ! LAYOUT
export type TimingInfoForm = {
  semesterStartDate: string;
  semesterEndDate: string;
  displayStartDate: string;
  displayStartTime: dayjs.Dayjs;
  displayEndDate: string;
  displayEndTime: dayjs.Dayjs;
  applicationStartDate: string;
  applicationStartTime: dayjs.Dayjs;
  applicationEndDate: string;
  applicationEndTime: dayjs.Dayjs;
  preRegistrationStartDate: string;
  preRegistrationStartTime: dayjs.Dayjs;
  preRegistrationEndDate: string;
  preRegistrationEndTime: dayjs.Dayjs;
  registrationStartDate: string;
  registrationStartTime: dayjs.Dayjs;
  registrationEndDate: string;
  registrationEndTime: dayjs.Dayjs;
};

//! APIs
export type CreateInternationalAdmissionDateInformationRequest = {
  applicationEndDate: string;
  applicationStartDate: string;
  displayEndDate: string;
  displayStartDate: string;
  id: number;
  preRegistrationEndDate: string;
  preRegistrationStartDate: string;
  registrationEndDate: string;
  registrationStartDate: string;
};
