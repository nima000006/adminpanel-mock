import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { AllTransactionDataType } from "../Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";
import { AllTransactionSamimWalletContentType } from "../Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListWalletTab/@types/@allTransactionListWalletTab";
import {
  MyTransactionDataType,
  WalletMyTransactionDataType,
} from "../Transactions/MyTransactions/MyTransactionsList/helper/components/MyTransactionListUsersTab/@types/@myTransactionListUsersTab";
import { WalletsTransactionsContentByWalletIdType } from "../Wallets/AllWallets/AllWalletsDetail/@types/@allWalletsDetail";

// مبدا و مقصئ تراکنش(new logic)
const SERVICE_TITLE_MAP: Record<string, string> = serviceOptions.reduce(
  (acc, item) => {
    acc[item.value] = item.title;
    return acc;
  },
  {} as Record<string, string>
);

type NormalizedTransactionType = "WITHDRAW" | "DEPOSIT" | "REVERT";

const isNormalizedTransactionType = (
  value: string
): value is NormalizedTransactionType => {
  return value === "WITHDRAW" || value === "DEPOSIT" || value === "REVERT";
};
const TRANSACTION_TYPE_MAP: Record<number, NormalizedTransactionType> = {
  1: "DEPOSIT",
  2: "WITHDRAW",
  3: "REVERT",
};

export type TransactionRecord =
  | WalletsTransactionsContentByWalletIdType
  | AllTransactionDataType
  | MyTransactionDataType
  | WalletMyTransactionDataType;

export const getTransactionDetail = (
  record?: TransactionRecord | AllTransactionSamimWalletContentType
) => {
  if (!record) {
    return { detail: "-", start: "-", end: "-", color: "default" as const };
  }

  let normalizedType: NormalizedTransactionType | undefined;

  if (typeof record.transactionType === "number") {
    normalizedType = TRANSACTION_TYPE_MAP[record.transactionType];
  } else if (isNormalizedTransactionType(record.transactionType)) {
    normalizedType = record.transactionType;
  }

  if (!normalizedType) {
    return { detail: "-", start: "-", end: "-", color: "default" as const };
  }

  const serviceValue = record.service;
  const serviceTitle = serviceValue
    ? (SERVICE_TITLE_MAP[serviceValue] ?? serviceValue)
    : null;

  // Helper to safely get walletBranchName with fallbacks
  const getWalletBranchName = (r: typeof record): string | undefined => {
    if ("walletBranchName" in r && typeof r.walletBranchName === "string") {
      return r.walletBranchName;
    }
    if ("branchName" in r && typeof r.branchName === "string") {
      return r.branchName;
    }
    if (
      "bankAccount" in r &&
      r.bankAccount &&
      typeof r.bankAccount === "object" &&
      "branchFaTitle" in r.bankAccount
    ) {
      return r.bankAccount.branchFaTitle;
    }
    return undefined;
  };

  const walletBranchName = getWalletBranchName(record);

  const walletTypeGenerator = (walletType: IdTitleName | undefined) => {
    return "walletType" in record
      ? walletType?.name === "PERSONAL"
        ? "کیف پول کاربر"
        : "کیف پول " + walletBranchName
      : "-";
  };

  // Helper to safely get bankAccountIban
  const getBankAccountIban = (r: typeof record): string | undefined => {
    if (
      "bankAccount" in r &&
      r.bankAccount &&
      typeof r.bankAccount === "object" &&
      "iban" in r.bankAccount
    ) {
      return r.bankAccount.iban;
    }
    return undefined;
  };

  // Helper to safely get gateWayPaymentTitle
  const getGateWayPaymentTitle = (r: typeof record): string | undefined => {
    if ("gateWayPaymentTitle" in r && typeof r.gateWayPaymentTitle === "string") {
      return r.gateWayPaymentTitle;
    }
    return undefined;
  };

  // 🔴 برداشت از کیف پول
  if (normalizedType === "WITHDRAW" && record.transactionSource === "WALLET_BLOCK") {
    const bankAccountIban = getBankAccountIban(record);
    return {
      detail: "برداشت از کیف پول",
      start: walletTypeGenerator(record?.walletType),
      end: "کیف پول مسدودی سامانه " + (bankAccountIban ? " " + bankAccountIban : ""),
      color: "red",
    };
  }

  if (normalizedType === "DEPOSIT" && record.transactionSource === "WALLET_BLOCK") {
    const bankAccountIban = getBankAccountIban(record);
    return {
      detail: "واریز به کیف پول مسدودی سامانه",
      start: walletTypeGenerator(record?.walletType),
      end: "کیف پول مسدودی سامانه " + (bankAccountIban ? " " + bankAccountIban : ""),
      color: "red",
    };
  }
  if (normalizedType === "WITHDRAW" && record.transactionSource === "BLOCK_BANK") {
    const bankAccountIban = getBankAccountIban(record);
    return {
      detail: "برداشت از کیف پول مسدودی سامانه",
      start: "کیف پول مسدودی سامانه",
      end: "حساب بانکی کاربر" + (bankAccountIban ? " " + bankAccountIban : ""),
      color: "red",
    };
  }

  if (
    !serviceValue &&
    normalizedType === "WITHDRAW" &&
    record.transactionSource === "BLOCK_WALLET"
  ) {
    return {
      detail: "برداشت از کیف پول مسدودی سامانه",
      start: "کیف پول مسدودی سامانه",
      end: walletTypeGenerator(record?.walletType),
      color: "red",
    };
  }

  if (
    !serviceValue &&
    normalizedType === "DEPOSIT" &&
    record.transactionSource === "BLOCK_WALLET"
  ) {
    return {
      detail: "واریز مجدد به کیف پول کاربر",
      start: "کیف پول مسدودی سامانه",
      end: walletTypeGenerator(record?.walletType),
      color: "red",
    };
  }

  // 🟢 شارژ کیف پول
  if (normalizedType === "DEPOSIT" && record.transactionSource === "DEPOSIT_IPG") {
    const gateWayPaymentTitle = getGateWayPaymentTitle(record);
    return {
      detail: "شارژ کیف پول",
      start: gateWayPaymentTitle ?? "-",
      end: walletTypeGenerator(record?.walletType),
      color: "green",
    };
  }
  // 🟣 بازگشت وجه (شرط خاص: DEPOSIT با transactionSource = REVERT)
  if (normalizedType === "DEPOSIT" && record.transactionSource === "REVERT") {
    return {
      detail: "بازگشت وجه به حساب کاربر",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول کاربر",
      color: "purple",
    };
  }
  if (normalizedType === "WITHDRAW" && record.transactionSource === "REVERT") {
    return {
      detail: "بازگشت وجه از کیف پول سیستم به حساب کاربر",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول کاربر",
      color: "purple",
    };
  }

  if (record.transactionSource === "WALLET_BANK") {
    return {
      detail: " برداشت از کیف پول مسدودی سامانه ",
      start: "کیف پول مسدودی سامانه " + " " + serviceTitle!,
      end: "حساب بانکی کاربر",
      color: "purple",
    };
  }

  // 🟣 عودت وجه (شرط خاص: WITHDRAWبا transactionSource = REVERT)
  if (normalizedType === "WITHDRAW" && record.transactionSource === "REFUND") {
    return {
      detail: "عودت وجه - برداشت از کیف پول سیستم",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول کاربر",
      color: "purple",
    };
  }

  // 🟣 عودت وجه (شرط خاص: DEPOSIT با transactionSource = REVERT)
  if (normalizedType === "DEPOSIT" && record.transactionSource === "REFUND") {
    return {
      detail: "عودت وجه - واریز به کیف پول کاربر",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول کاربر",
      color: "purple",
    };
  }
  // 🟣 خرید خدمات (شرط خاص: DEPOSIT با transactionSource = WALLET_TO_WALLET)
  if (serviceValue && record.transactionSource === "WALLET_TO_WALLET") {
    return {
      detail: "خرید خدمات",
      start: walletTypeGenerator(record?.walletType),
      end: "کیف پول" + " " + serviceTitle!,
      color: "warning",
    };
  }

  // 🟣 تجمیع درآمد (شرط خاص: transactionSource = CUMULATIVE)
  if (record.transactionSource === "SYSTEM_WALLET_SWEEP") {
    return {
      detail: "تجمیع درآمد",
      start: "استخر کیف پول ",
      end: "کیف پول سیستم تجمیع شده",
      color: "success",
    };
  }
  // 🟣 تسهیم درآمد (شرط خاص: WITHDRAW با transactionSource = SHARING)
  if (
    normalizedType === "WITHDRAW" &&
    serviceValue &&
    record.transactionSource === "SHARING"
  ) {
    return {
      detail: "تسهیم درآمد - برداشت از کیف پول سیستم",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول ذینفع",
      color: "green",
    };
  }
  if (
    normalizedType === "DEPOSIT" &&
    serviceValue &&
    record.transactionSource === "SHARING"
  ) {
    return {
      detail: " تسهیم درآمد - واریز به کیف پول سیستم",
      start: "کیف پول سیستم" + " " + serviceTitle!,
      end: "کیف پول ذینفع",
      color: "green",
    };
  }

  return { detail: "-", start: "-", end: "-", color: "default" as const };
};
