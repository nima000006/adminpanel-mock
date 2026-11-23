import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { IconArrowsLeftRight, IconHourglass } from "@components/icons/icons";
import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";

export const EDIT_SUCCESS_MSG =
  "درخواست شما با موفقیت به متقاضی عودت داده شد تا اصلاحات لازم را انجام دهد.";
export const EDIT_ERROR_MSG =
  "متاسفانه در انجام عملیات اصلاح درخواست خطایی رخ داده است. لطفا مجددا تلاش کنید.";

export const REJECT_SUCCESS_MSG = "عملیات رد درخواست با موفقیت انجام شد.";
export const REJECT_ERROR_MSG =
  "متاسفانه در انجام عملیات رد درخواست خطایی رخ داده است. لطفا مجددا تلاش کنید.";

export const CONFIRM_SUCCESS_MSG = "درخواست با موفقیت تایید شد.";
export const CONFIRM_ERROR_MSG =
  "متاسفانه در انجام عملیات تایید درخواست خطایی رخ داده است. لطفا مجددا تلاش کنید.";

export const INTERNATIONAL_DEMAND_REQUESTS_PENDING_PROCESS_ID = "4";

export const pageMode: {
  [k: string]: {
    text: string;
    color: string;
    icon: React.JSX.Element;
    pageTitle: string;
  };
} = {
  [INTERNATIONAL_DEMAND_REQUESTS_PENDING_PROCESS_ID]: {
    text: "در انتظار بررسی",
    color: "",
    icon: <IconHourglass fill="#1F1F1F" width={14} height={14} />,
    pageTitle: "بررسی درخواست",
  },
  "2": {
    text: "نیازمند اصلاحات",
    color: "gold",
    icon: <IconArrowsLeftRight fill={GOLD_6} width={14} height={14} />,
    pageTitle: "مشاهده",
  },
  "1": {
    text: "رد شده",
    color: "red",
    icon: <AiOutlineClose color="#F5222D" width={14} height={14} />,
    pageTitle: "مشاهده",
  },
  "6": {
    text: "تایید شده",
    color: "green",
    icon: <AiOutlineCheck color="#52C41A" width={14} height={14} />,
    pageTitle: "مشاهده",
  },
};
