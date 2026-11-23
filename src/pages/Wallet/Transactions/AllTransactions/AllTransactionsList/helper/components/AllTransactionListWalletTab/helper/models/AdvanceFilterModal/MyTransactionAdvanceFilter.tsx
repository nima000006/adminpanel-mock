import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

const useMyTransactionAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "جهت تراکنش",
      name: "transactionType",
      type: "select",
      options: TRANSACTION_TYPE_STATUS_OPTIONS,
    },
    {
      label: "بازه زمانی  تراکنش",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useMyTransactionAdvanceFilter;
