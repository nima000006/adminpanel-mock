export type RefundTransactionDetailDrawerContentProps = {
  closeDrawer: () => void;
  uuid: string;
  setIsOpenMainTransactionDetailDrawer: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | undefined;
    }>
  >;
  setIsOpenDetailDrawer: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string;
    }>
  >;
};

export type RefundMainTransactionDetailDrawerContentProps = {
  closeDrawer: () => void;
  uuid: string | undefined;
};
