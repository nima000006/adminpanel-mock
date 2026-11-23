import {
  EvacuationBalanceStatus,
  EvacuationSettlementLedgerCardData,
  EvacuationSettlementMock,
  EvacuationSettlementResultCardData,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuationSettlement";

/** true = با ودیعه | false = بدون ودیعه */
export const HAS_DEPOSIT = false;

/** بدهکار | بستانکار | تسویه */
export const BALANCE_STATUS: EvacuationBalanceStatus = "debtor";

const INFO_NOTE = "تسویه صورتحساب تخلیه پس از تأیید مسئول امور مالی انجام خواهد شد.";

// ================================ ماک کارت‌ها ================================

/** کارت ودیعه */
export const depositCardMock: EvacuationSettlementLedgerCardData = {
  variant: "deposit",
  title: "ودیعه پرداخت شده کاربر",
  amountRial: 150000000,
  showViewAll: false,
  items: [
    {
      id: "1",
      title: "ودیعه",
      side: "creditor",
      amountRial: 150000000,
    },
  ],
};

/** کارت بدهکاری */
export const debtorCardMock: EvacuationSettlementLedgerCardData = {
  variant: "debtor",
  title: "بدهکاری کاربر",
  amountRial: 90000000,
  showViewAll: true,
  items: [
    {
      id: "1",
      title: "هزینه اقامتی",
      side: "debtor",
      amountRial: -100000000,
    },
    {
      id: "2",
      title: "هزینه اقامتی،پیش پرداخت",
      side: "creditor",
      amountRial: 25000000,
    },
  ],
};

/** کارت بستانکاری */
export const creditorCardMock: EvacuationSettlementLedgerCardData = {
  variant: "creditor",
  title: "بستانکاری کاربر",
  amountRial: 90000000,
  showViewAll: true,
  items: [
    {
      id: "1",
      title: "هزینه اقامتی",
      side: "debtor",
      amountRial: -100000000,
    },
    {
      id: "2",
      title: "هزینه اقامتی،پیش پرداخت",
      side: "creditor",
      amountRial: 25000000,
    },
  ],
};

/** کارت تسویه شده */
export const settledCardMock: EvacuationSettlementLedgerCardData = {
  variant: "settled",
  title: "هزینه اقامتی کاربر تسویه شده",
  showViewAll: true,
  items: [
    {
      id: "1",
      title: "هزینه اقامتی",
      side: "debtor",
      amountRial: -100000000,
    },
    {
      id: "2",
      title: "هزینه اقامتی،پیش پرداخت",
      side: "creditor",
      amountRial: 25000000,
    },
  ],
};

/** کارت نتیجه — بر اساس بدهکار / بستانکار / تسویه */
export const resultCardByBalanceMock: Record<
  EvacuationBalanceStatus,
  EvacuationSettlementResultCardData
> = {
  debtor: {
    userToResidence: {
      label: "پرداختی کاربر به اقامتگاه:",
      value: "۹ میلیون تومان",
      description:
        "کاربر باید ۹ میلیون تومان بابت هزینه‌های اقامت به اقامتگاه پرداخت کند.",
    },
    residenceToUser: {
      label: "پرداختی اقامتگاه به کاربر:",
      value: "تسویه شده",
      description: "اقامتگاه نباید پولی به کاربر پرداخت کند.",
    },
    infoNote: INFO_NOTE,
  },
  creditor: {
    userToResidence: {
      label: "پرداختی کاربر به اقامتگاه:",
      value: "تسویه شده",
      description: "کاربر نباید پولی بدهد",
    },
    residenceToUser: {
      label: "پرداختی اقامتگاه به کاربر:",
      value: "۹ میلیون تومان",
      description: "اقامتگاه باید ۹ میلیون بابت هزینه های اقامتی به کاربر پرداخت کند.",
    },
    infoNote: INFO_NOTE,
  },
  settled: {
    userToResidence: {
      label: "پرداختی کاربر به اقامتگاه:",
      value: "تسویه شده",
      description: "کاربر نباید پولی بدهد",
    },
    residenceToUser: {
      label: "پرداختی اقامتگاه به کاربر:",
      value: "تسویه شده",
      description: "اقامتگاه نباید پولی بدهد",
    },
    infoNote: INFO_NOTE,
  },
};

const balanceCardByStatus: Record<
  EvacuationBalanceStatus,
  EvacuationSettlementLedgerCardData
> = {
  debtor: debtorCardMock,
  creditor: creditorCardMock,
  settled: settledCardMock,
};

/**
 * اگر ودیعه داشته باشیم، بخش پرداختی اقامتگاه به کاربر
 * متن بازپرداخت ودیعه را هم نشان می‌دهد.
 */
const buildResultCard = (
  hasDeposit: boolean,
  balanceStatus: EvacuationBalanceStatus
): EvacuationSettlementResultCardData => {
  const base = resultCardByBalanceMock[balanceStatus];

  if (!hasDeposit) {
    return base;
  }

  if (balanceStatus === "debtor") {
    return {
      ...base,
      residenceToUser: {
        label: "پرداختی اقامتگاه به کاربر:",
        value: "۱۵ میلیون تومان",
        description:
          "اقامتگاه باید ۱۵ میلیون تومان بابت بازپرداخت ودیعه به کاربر پرداخت کند.",
      },
    };
  }

  if (balanceStatus === "creditor") {
    return {
      ...base,
      residenceToUser: {
        label: "پرداختی اقامتگاه به کاربر:",
        value: "۱۵ میلیون تومان",
        extraValues: ["۹ میلیون تومان"],
        description:
          "اقامتگاه باید ۱۵ میلیون تومان بابت بازپرداخت ودیعه و ۹ میلیون بابت هزینه های اقامت به کاربر پرداخت کند.",
      },
    };
  }

  // settled + deposit
  return {
    ...base,
    residenceToUser: {
      label: "پرداختی اقامتگاه به کاربر:",
      value: "۱۵ میلیون تومان",
      description:
        "اقامتگاه باید ۱۵ میلیون تومان بابت بازپرداخت ودیعه به کاربر پرداخت کند.",
    },
  };
};

export const getActiveEvacuationSettlementMock = (): EvacuationSettlementMock => ({
  // فلگ نمایش سناریوی با ودیعه یا بدون ودیعه
  hasDeposit: HAS_DEPOSIT,
  // وضعیت مالی کاربر: debtor | creditor | settled
  balanceStatus: BALANCE_STATUS,
  // داده کارت ودیعه؛ اگر بدون ودیعه باشد null و کارت رندر نمی‌شود
  depositLedger: HAS_DEPOSIT ? depositCardMock : null,
  // داده کارت بدهکاری / بستانکاری / تسویه مطابق BALANCE_STATUS
  balanceLedger: balanceCardByStatus[BALANCE_STATUS],
  // داده کارت نتیجه صورتحساب؛ متن بازپرداخت ودیعه فقط وقتی HAS_DEPOSIT=true اضافه می‌شود
  result: buildResultCard(HAS_DEPOSIT, BALANCE_STATUS),
});
