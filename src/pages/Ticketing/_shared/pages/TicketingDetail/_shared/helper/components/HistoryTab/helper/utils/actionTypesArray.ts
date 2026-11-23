import { NEUTRAL_07, PRIMARY_6 } from "@infra/VARS/globalColors/globalColors";

export const ACTION_TYPE_MAP: Record<
  string,
  {
    text: string;
    color?: string;
  }
> = {
  CREATE_TICKET: {
    text: "ثبت شد",
    color: NEUTRAL_07,
  },

  CLOSE_TICKET: {
    text: "بسته شد",
    color: "red",
  },

  ASSIGN_TICKET: {
    text: "اختصاص داده شد",
    color: NEUTRAL_07,
  },

  REFER_TICKET: {
    text: "ارجاع داده شد",
    color: NEUTRAL_07,
  },

  CHANGE_PRIORITY: {
    text: "تغییر اولویت یافت",
    color: "orange",
  },

  CHANGE_STATUS: {
    text: "تغییر وضعیت یافت",
    color: PRIMARY_6,
  },
};
