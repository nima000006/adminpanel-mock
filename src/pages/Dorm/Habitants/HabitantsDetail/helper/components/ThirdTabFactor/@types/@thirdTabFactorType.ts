//! GENERAL

import { GetDormHabitantsPaymentInvoicePaymentStatus } from "@pages/Dorm/Habitants/HabitantsDetail/@types/@habitantsDetails";

//! LAYOUT
export type MoreDetailsDrawerPropsType = {
  onClose: () => void;
  id?: number;
};

export type PaymentStatusSectionPropsType = {
  data: any;
  opener: {
    isOpen: boolean;
    id: number;
  };
  setter: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};

//cash payment
export type CashPaymentPropsType = {
  opener: {
    isOpen: boolean;
    id: number;
  };

  setter: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};

export type HabitantsFactorReportsMoreDetailsDrawerProps = {
  onClose: () => void;
  data: (GetDormHabitantsPaymentInvoicePaymentStatus & { title: string }) | null;
};

//! API
