import { PiBag, PiStudent, PiUser } from "react-icons/pi";

import { staffTypeMapTypes } from "../@types/@userWalletInfo";

export const staffTypeMap: Record<string, staffTypeMapTypes> = {
  EMPLOYEE: { label: "کارمند", color: "orange", icon: <PiBag /> },
  STUDENT: { label: "دانشجو", color: "processing", icon: <PiStudent /> },
  ADMIN: { label: "مدیر", color: "warning", icon: <PiUser /> },
};
