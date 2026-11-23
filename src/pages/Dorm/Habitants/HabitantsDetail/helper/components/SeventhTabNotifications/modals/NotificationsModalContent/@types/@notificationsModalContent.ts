import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type HabitantNotificationFormType = {
  description: string;
};

//! API
export type SendDormNotificationRequest = {
  form: "SendNotification";
  data: {
    delayMessagePattern: string;
    userNationalcode: string;
  };
};

export type SendDormNotificationResponse = BPMS_API_RESPONSE<null>;
