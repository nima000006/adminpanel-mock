import { lazy } from "react";

import {
  WALLET_ALL_BANK_ACCOUNT_REQUESTS_DETAIL_PAGE_ROUTE,
  WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE,
  WALLET_ALL_TRANSACTIONS_DETAIL_PAGE_ROUTE,
  WALLET_ALL_TRANSACTIONS_PAGE_ROUTE,
  WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
  WALLET_ALL_WALLETS_PAGE_ROUTE,
  WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
  WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE,
  WALLET_BASIC_INFO_PAGE_ROUTE,
  WALLET_My_TRANSACTIONS_DETAIL_PAGE_ROUTE,
  WALLET_My_TRANSACTIONS_PAGE_ROUTE,
  WALLET_ALL_WALLET_DETAILS_PAGE_ROUTE,
  WALLET_MY_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
  WALLET_MY_WITHDRAWAL_REQUESTS_PAGE_ROUTE,
  WALLET_MY_WALLET_DETAILS_PAGE_ROUTE,
  WALLET_BASIC_INFO_FINANCE_SETTING_PAGE_ROUTE,
  WALLET_BASIC_INFO_SETTING_TRANSACTION_PAGE_ROUTE,
  WALLET_BASIC_INFO_TIME_SETTING_PAGE_ROUTE,
  WALLET_BASIC_INFO_SECURITY_SETTING_PAGE_ROUTE,
  WALLET_BANK_TRANSACTIONS_PAGE_ROUTE,
} from "../routes/wallet";

const allWallets = lazy(
  () => import("../../../pages/Wallet/Wallets/AllWallets/AllWalletsList/AllWalletsList")
);
const allWalletsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Wallets/AllWallets/AllWalletsDetail/AllWalletsDetail")
);
const allWalletDetails = lazy(
  () =>
    import("../../../pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/allWalletDetailsWalletList")
);
const myWalletDetails = lazy(
  () =>
    import("../../../pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/MyWalletDetailsWalletList")
);
const walletBasicInfo = lazy(
  () =>
    import("../../../pages/Wallet/BasicInformation/BasicInformationList/BasicInformationList")
);
const walletAllTransactions = lazy(
  () =>
    import("../../../pages/Wallet/Transactions/AllTransactions/AllTransactionsList/AllTransactionsList")
);
const walletAllTransactionsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Transactions/AllTransactions/AllTransactionsDetail/AllTransactionsDetail")
);
const walletMyTransactions = lazy(
  () =>
    import("../../../pages/Wallet/Transactions/MyTransactions/MyTransactionsList/MyTransactionsList")
);
const walletMyTransactionsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Transactions/MyTransactions/MyTransactionsDetail/MyTransactionsDetail")
);
const walletBankTransactions = lazy(
  () => import("../../../pages/Wallet/Transactions/BankTransactions/BankTransactions")
);
const walletAllWithdrawalRequests = lazy(
  () =>
    import("../../../pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/AllWithdrawalList")
);
const walletAllWithdrawalRequestsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalDetail/AllWithdrawalDetail")
);
const walletMyWithdrawalRequests = lazy(
  () =>
    import("../../../pages/Wallet/Requests/Withdrawal/MyWithdrawal/MyWithdrawalList/MyWithdrawalList")
);
const walletMyWithdrawalRequestsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Requests/Withdrawal/MyWithdrawal/MyWithdrawalDetail/MyWithdrawalDetail")
);
const walletAllBankAccountRequests = lazy(
  () =>
    import("../../../pages/Wallet/Requests/BankAccount/BankAccountList/BankAccountList")
);
const walletAllBankAccountRequestsDetail = lazy(
  () =>
    import("../../../pages/Wallet/Requests/BankAccount/AllBankAccountDetail/BankAccountDetail")
);
const walletBasicInfoFinanceSettingDetail = lazy(
  () =>
    import("../../../pages/Wallet/BasicInformation/BasicInformationDetail/WalletFinancialSettings/WalletFinancialSettings")
);
const walletBasicInfoSettingTransactionDetail = lazy(
  () =>
    import("../../../pages/Wallet/BasicInformation/BasicInformationDetail/SettingTransactionWallet/SettingTransactionWallet")
);
const walletBasicInfoTimeSettingDetail = lazy(
  () =>
    import("../../../pages/Wallet/BasicInformation/BasicInformationDetail/WalletTimeSettings/WalletTimeSetting")
);
const walletBasicInfoSecuritySettingDetail = lazy(
  () =>
    import("../../../pages/Wallet/BasicInformation/BasicInformationDetail/WalletSecuritySetting/WalletSecuritySetting")
);

export const WalletScreens = [
  {
    component: allWallets,
    path: WALLET_ALL_WALLETS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allWalletsDetail,
    path: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allWalletDetails,
    path: WALLET_ALL_WALLET_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myWalletDetails,
    path: WALLET_MY_WALLET_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBasicInfo,
    path: WALLET_BASIC_INFO_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllTransactions,
    path: WALLET_ALL_TRANSACTIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllTransactionsDetail,
    path: WALLET_ALL_TRANSACTIONS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletMyTransactions,
    path: WALLET_My_TRANSACTIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletMyTransactionsDetail,
    path: WALLET_My_TRANSACTIONS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBankTransactions,
    path: WALLET_BANK_TRANSACTIONS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllWithdrawalRequests,
    path: WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllWithdrawalRequestsDetail,
    path: WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletMyWithdrawalRequests,
    path: WALLET_MY_WITHDRAWAL_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletMyWithdrawalRequestsDetail,
    path: WALLET_MY_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllBankAccountRequests,
    path: WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletAllBankAccountRequestsDetail,
    path: WALLET_ALL_BANK_ACCOUNT_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBasicInfoFinanceSettingDetail,
    path: WALLET_BASIC_INFO_FINANCE_SETTING_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBasicInfoSettingTransactionDetail,
    path: WALLET_BASIC_INFO_SETTING_TRANSACTION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBasicInfoTimeSettingDetail,
    path: WALLET_BASIC_INFO_TIME_SETTING_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: walletBasicInfoSecuritySettingDetail,
    path: WALLET_BASIC_INFO_SECURITY_SETTING_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
