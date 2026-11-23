import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  PiArrowsLeftRightLight,
  PiHourglassLow,
  PiHourglassSimpleHigh,
} from "react-icons/pi";

import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";

export const INTERNATIONAL_DEMAND_REQUESTS_PENDING_PROCESS_ID = "4";
export const preRegistrationPageMode: {
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
    icon: <PiHourglassSimpleHigh fill="#1F1F1F" width={14} height={14} />,
    pageTitle: "بررسی درخواست",
  },
  "5": {
    text: "در انتظار بررسی مجدد",
    color: "orange",
    icon: <PiHourglassSimpleHigh fill={GOLD_6} width={14} height={14} />,
    pageTitle: "بررسی مجدد درخواست",
  },
  "2": {
    text: "نیازمند اصلاحات",
    color: "gold",
    icon: <PiArrowsLeftRightLight fill={GOLD_6} width={14} height={14} />,
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
  "3": {
    text: "منقضی شده",
    color: "volcano",
    icon: <PiHourglassLow color="#FA541C" width={14} height={14} />,
    pageTitle: "مشاهده",
  },
};
