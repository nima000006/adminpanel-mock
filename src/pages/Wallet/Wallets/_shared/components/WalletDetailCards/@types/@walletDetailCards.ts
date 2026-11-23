export type WalletDetailCardsProps = {
  title: string;
  price: string;
  icon: React.ReactNode;
  centered?: boolean;
  showCurrency?: boolean;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
};
