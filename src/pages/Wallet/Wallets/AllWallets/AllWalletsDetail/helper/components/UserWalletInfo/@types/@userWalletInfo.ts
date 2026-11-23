import { ReactNode } from "react";

//! LAYOUTs
export type GetPersonalWalletsDetailResponse = {
  firstName: string;
  lastName: string;
  username: string;
  walletUuid: string;
  mobileNumber: string;
  walletStatus: {
    walletStatusId: number;
    walletStatusTitle: string;
  };
  money: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
  userId: number;
  staffTypes: [string];
};
export type staffTypeMapTypes = {
  label: string;
  color: string;
  icon?: ReactNode;
};
