export type ResolveConflictModalContentProps = {
  id: number;
};

export type ResolveConflictEstelamResponse = {
  requestPaymentStatus: {
    id: number;
    name: string;
    title: string;
  };
  totalAmount: number;
  currency: {
    id: number;
    name: string;
    title: string;
  };
  moneyType: {
    id: number;
    name: string;
    title: string;
  };
};
