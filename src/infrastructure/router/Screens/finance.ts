import { lazy } from "react";

import {
  FINANCE_TRANSACTIONS_LIST_PAGE_ROUTE,
  FINANCE_BUYERS_DETAIL_PAGE_ROUTE,
  FINANCE_BUSINESS_OWNER_PAGE_ROUTE,
  FINANCE_OVERVIEW_PAGE_ROUTE,
  FINANCE_ACCOUNTING_PAGE_ROUTE,
  FINANCE_TURNOVER_PAGE_ROUTE,
  FINANCE_BUYERS_PAGE_ROUTE,
  FINANCE_REQUESTS_RETURN_MONEY_LIST_PAGE_ROUTE,
  FINANCE_REQUESTS_PAYMENT_ON_ACCOUNT_LIST_PAGE_ROUTE,
  FINANCE_REQUESTS_RETURN_MONEY_DETAIL_PAGE_ROUTE,
  FINANCE_REQUESTS_PAYMENT_PAYMENT_ON_ACCOUNT_DETAIL_PAGE_ROUTE,
  FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE,
  FINANCE_MY_TURN_OVER_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_TURN_OVER_PAGE_ROUTE,
  FINANCE_MY_INVOICES_AND_DOCS_SETTLEMENT_DETAIL_PAGE_ROUTE,
  FINANCE_MY_TURN_OVER_DETAIL_PAGE_ROUTE,
  FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
  FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_TURN_OVER_DETAIL_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_SETTLEMENT_DETAIL_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
  FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE,
  FINANCE_ACCOUNTING_OPERATION_SETTLEMENT_DOCUMENTS_PAGE_ROUTE,
  FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
} from "../routes/finance";

//! FILES
const financeTransactionsList = lazy(
  () => import("../../../pages/Finance/Transactions/TransactionsList/TransactionsList")
);
const financeBuyers = lazy(
  () => import("../../../pages/Finance/Buyers/BuyersList/BuyersList")
);
const financeBuyersDetails = lazy(
  () => import("../../../pages/Finance/Buyers/BuyersDetails/BuyersDetails")
);
const financeBusinessOwner = lazy(
  () => import("../../../pages/Finance/BusinessOwners/BusinessOwners")
);
const financeTurnOver = lazy(
  () => import("../../../pages/Finance/Accountants/TurnOver/TurnOver")
);

const financeAccounting = lazy(
  () => import("../../../pages/Finance/Accountants/FactorsAndDocs/FactorsAndDocs")
);
const financeAccountingFactorsDetails = lazy(
  () =>
    import("../../../pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/helper/components/FactorsAndDocsFactorDetails/FactorsAndDocsFactorDetails")
);
const financeOverview = lazy(
  () => import("../../../pages/Finance/Accountants/Overview/Overview")
);

const financeRequestsReturnMoneyList = lazy(
  () =>
    import("../../../pages/Finance/Requests/ReturnMoney/ReturnMoneyList/ReturnMoneyList")
);
const financeRequestsPaymentOnAccountList = lazy(
  () =>
    import("../../../pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/PaymentOnAccountList")
);
const financeRequestsReturnMoneyDetail = lazy(
  () =>
    import("../../../pages/Finance/Requests/ReturnMoney/ReturnMoneyDetail/ReturnMoneyDetail")
);
const financeRequestsPaymentOnAccountDetail = lazy(
  () =>
    import("../../../pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountDetail/PaymentOnAccountDetail")
);
const financeMyAccountingInvoicesAndDocsList = lazy(
  () =>
    import("../../../pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/MyBranchInvoicesAndDocsList")
);
const financeMyBusinessAccountingInvoicesAndDocsList = lazy(
  () =>
    import("../../../pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/MyBusinessInvoicesAndDocsList")
);
const financeMyAccountingInvoicesSettlementAndDocsDetail = lazy(
  () =>
    import("../../../pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/MyBranchInvoicesAndDocsSettlementDetail")
);
const financeMyBusinessAccountingInvoicesSettlementAndDocsDetail = lazy(
  () =>
    import("../../../pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsDetail/MyBusinessInvoicesAndDocsSettlementDetail/MyBusinessInvoicesAndDocsSettlementDetail")
);
const financeMyAccountingInvoicesFactorAndDocsDetail = lazy(
  () =>
    import("../../../pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsFactorsDetail/MyBranchInvoicesAndDocsFactorsDetail")
);
const financeMyBusinessAccountingInvoicesFactorAndDocsDetail = lazy(
  () =>
    import("../../../pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsDetail/MyBusinessInvoicesAndDocsFactorsDetail/MyBusinessInvoicesAndDocsFactorsDetail")
);
const financeMyAccountingMyTurnOverList = lazy(
  () =>
    import("../../../pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/MyBranchTurnOverList")
);
const financeMyBusinessAccountingMyTurnOverList = lazy(
  () =>
    import("../../../pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/MyBusinessTurnOverList")
);
const financeMyAccountingMyTurnOverDetail = lazy(
  () =>
    import("../../../pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/MyBranchTurnOverDetail")
);
const financeMyBusinessAccountingMyTurnOverDetail = lazy(
  () =>
    import("../../../pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/MyBusinessTurnOverDetail")
);
const financeAccountingOperation = lazy(
  () =>
    import("../../../pages/Finance/Accountants/AccountingOperation/AccountingOperation")
);
const financeAccountingOperationSettlementDetail = lazy(
  () =>
    import("../../../pages/Finance/_shared/Pages/AccountingSettlementDocumentDetails/AccountingSettlementDocumentDetails")
);
const financeAccountingOperationSettlementDocument = lazy(
  () =>
    import("../../../pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/AccountingOperationSettlementDocument")
);
//! SCREENS
export const FinanceScreens = [
  {
    component: financeTransactionsList,
    path: FINANCE_TRANSACTIONS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeBuyers,
    path: FINANCE_BUYERS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeBuyersDetails,
    path: FINANCE_BUYERS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeBusinessOwner,
    path: FINANCE_BUSINESS_OWNER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeTurnOver,
    path: FINANCE_TURNOVER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  // {
  //   component: financeTurnOverMoveWalletDetails,
  //   path: FINANCE_TURNOVER_MOVE_WALLET_PAGE_DETAILS,
  //   isBgContentCustom: false,
  // },
  {
    component: financeAccounting,
    path: FINANCE_ACCOUNTING_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: financeAccountingFactorsDetails,
    path: FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeOverview,
    path: FINANCE_OVERVIEW_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  // {
  //   component: financeTurnOverSettlementDetails,
  //   path: FINANCE_TURNOVER_SETTLEMENT_PAGE_DETAILS,
  //   isBgContentCustom: false,
  // },
  {
    component: financeRequestsReturnMoneyList,
    path: FINANCE_REQUESTS_RETURN_MONEY_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeRequestsPaymentOnAccountList,
    path: FINANCE_REQUESTS_PAYMENT_ON_ACCOUNT_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeRequestsReturnMoneyDetail,
    path: FINANCE_REQUESTS_RETURN_MONEY_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeRequestsPaymentOnAccountDetail,
    path: FINANCE_REQUESTS_PAYMENT_PAYMENT_ON_ACCOUNT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyAccountingInvoicesAndDocsList,
    path: FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyBusinessAccountingInvoicesAndDocsList,
    path: FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyAccountingInvoicesSettlementAndDocsDetail,
    path: FINANCE_MY_INVOICES_AND_DOCS_SETTLEMENT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyBusinessAccountingInvoicesSettlementAndDocsDetail,
    path: FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_SETTLEMENT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyAccountingInvoicesFactorAndDocsDetail,
    path: FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyBusinessAccountingInvoicesFactorAndDocsDetail,
    path: FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyAccountingMyTurnOverList,
    path: FINANCE_MY_TURN_OVER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyBusinessAccountingMyTurnOverList,
    path: FINANCE_MY_BUSINESS_TURN_OVER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyAccountingMyTurnOverDetail,
    path: FINANCE_MY_TURN_OVER_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeMyBusinessAccountingMyTurnOverDetail,
    path: FINANCE_MY_BUSINESS_TURN_OVER_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeAccountingOperation,
    path: FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeAccountingOperationSettlementDetail,
    path: FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: financeAccountingOperationSettlementDocument,
    path: FINANCE_ACCOUNTING_OPERATION_SETTLEMENT_DOCUMENTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
