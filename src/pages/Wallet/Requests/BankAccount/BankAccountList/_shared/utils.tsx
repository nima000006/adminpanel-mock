import { ReactNode } from "react";

import { PiBuildingsLight, PiUserLight } from "react-icons/pi";

export type BusinessTypeConfigItem = {
  color: string;
  icon: ReactNode;
  label: string;
};

/** PERSONAL(1) / LEGAL(2) — string names or numeric codes from wallet type APIs */
export const businessTypeConfig: Record<string, BusinessTypeConfigItem> = {
  0: {
    color: "gold",
    icon: <PiUserLight />,
    label: "حقیقی",
  },
  1: {
    color: "blue",
    icon: <PiBuildingsLight />,
    label: "حقوقی",
  },
};

export const getBusinessTypeConfig = (
  type?: string | number | null
): BusinessTypeConfigItem | undefined => {
  if (type === null || type === undefined || type === "") return undefined;

  return businessTypeConfig[String(type)];
};

export const statusConfig = {
  REQUESTED: {
    color: "gold",
    label: "در انتظار بررسی",
  },
  REJECTED: {
    color: "red",
    label: "رد شده",
  },
  ACCEPTED: {
    color: "green",
    label: "تایید شده",
  },
};
