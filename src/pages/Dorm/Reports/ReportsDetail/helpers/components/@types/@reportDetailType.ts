//! GENERAL
//! LAYOUT
export type ReportsMoreDetailsDrawerProps = {
  onClose: () => void;
  id?: number;
};
// cash payment
export type ReportsCashPaymentSectionProps = {
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

export type PaymentToUserContentDrawerType = {
  closeDrawer: () => void;
  id: number;
};
//! API
