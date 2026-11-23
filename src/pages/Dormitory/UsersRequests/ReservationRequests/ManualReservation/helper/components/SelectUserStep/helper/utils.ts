import { ManualReservationUserType } from "../@types/@selectUserStep";

export const filterManualReservationUsersByNationalCode = (
  users: ManualReservationUserType[],
  nationalCode: string
): ManualReservationUserType[] => {
  const normalized = nationalCode.replace(/\s+/g, "").trim();

  return users.filter((user) => user.nationalCode.includes(normalized));
};
