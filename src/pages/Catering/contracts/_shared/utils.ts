import { CATERING_STATUS_TYPES } from "@pages/Catering/_shared/utils";
import {
  RequestContractStatus,
  REQUEST_CONTRACT_STATUS_FILTER,
  REQUEST_CONTRACT_STATUS_TEXT as REQUEST_CONTRACT_STATUS_LABEL,
} from "@pages/Catering/contracts/_shared/@requestContractStatus";

export const CATERING_CONTRACT_HISTORY_REVISION_TYPES = {
  ADD: "ADD",
  MOD: "MOD",
  DEL: "DEL",
} as const;

export const CATERING_CONTRACT_HISTORY_REVISION_TYPES_LABELS: Record<string, string> = {
  [CATERING_CONTRACT_HISTORY_REVISION_TYPES.ADD]: "افزودن",
  [CATERING_CONTRACT_HISTORY_REVISION_TYPES.MOD]: "ویرایش",
  [CATERING_CONTRACT_HISTORY_REVISION_TYPES.DEL]: "حذف",
};

export const getCateringContractHistoryRevisionTypeLabel = (
  revisionType: string | null | undefined
): string => {
  if (!revisionType) {
    return "";
  }

  return CATERING_CONTRACT_HISTORY_REVISION_TYPES_LABELS[revisionType] ?? revisionType;
};

export type CateringContractStatusTypeDto = {
  id: number;
  title?: string;
  faTitle?: string;
};

/** Ant Design tag preset — same entity statusType as Self / Food / Vendor */
export const CATERING_CONTRACT_STATUS_TYPES_COLORS: Record<number, string> = {
  [CATERING_STATUS_TYPES.ACTIVE_SHOW]: "green",
  [CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW]: "orange",
  [CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW]: "red",
  [CATERING_STATUS_TYPES.DELETED]: "gray",
};

export const getCateringContractStatusTypeTagConfig = (
  statusType: CateringContractStatusTypeDto | null | undefined
): { label: string; color?: string } | null => {
  if (!statusType?.faTitle) {
    return null;
  }

  return {
    label: statusType.faTitle,
    color: CATERING_CONTRACT_STATUS_TYPES_COLORS[statusType.id],
  };
};

export {
  RequestContractStatus,
  REQUEST_CONTRACT_STATUS_FILTER,
  REQUEST_CONTRACT_STATUS_LABEL,
};

/** Accepted contractStatus values for active contract lists (CTO) */
export const CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS: number[] = [
  ...REQUEST_CONTRACT_STATUS_FILTER.accepted,
];

/** Tab / advance-filter row groups */
export const REQUEST_CONTRACT_STATUS = {
  pendingCompletion: "0", // در انتظار تکمیل (status 0, 1, 2)
  waited: "1", // در انتظار بررسی
  accepted: "2", // تایید شده
  rejected: "3", // رد شده
  all: "4", // همه
} as const;

export type RequestContractRowStatus =
  | typeof REQUEST_CONTRACT_STATUS.pendingCompletion
  | typeof REQUEST_CONTRACT_STATUS.waited
  | typeof REQUEST_CONTRACT_STATUS.accepted
  | typeof REQUEST_CONTRACT_STATUS.rejected;

export const REQUEST_CONTRACT_STATUS_TEXT: Record<RequestContractRowStatus, string> = {
  [REQUEST_CONTRACT_STATUS.pendingCompletion]: "در انتظار تکمیل",
  [REQUEST_CONTRACT_STATUS.waited]: "در انتظار بررسی",
  [REQUEST_CONTRACT_STATUS.accepted]: "تایید شده",
  [REQUEST_CONTRACT_STATUS.rejected]: "رد شده",
};

export const REQUEST_CONTRACT_STATUS_COLOR: Record<RequestContractRowStatus, string> = {
  [REQUEST_CONTRACT_STATUS.pendingCompletion]: "orange",
  [REQUEST_CONTRACT_STATUS.waited]: "orange",
  [REQUEST_CONTRACT_STATUS.accepted]: "green",
  [REQUEST_CONTRACT_STATUS.rejected]: "red",
};

export const REQUEST_CONTRACT_STATUS_OPTIONS = [
  {
    id: Number(REQUEST_CONTRACT_STATUS.pendingCompletion),
    title: REQUEST_CONTRACT_STATUS_TEXT[REQUEST_CONTRACT_STATUS.pendingCompletion],
  },
  {
    id: Number(REQUEST_CONTRACT_STATUS.waited),
    title: REQUEST_CONTRACT_STATUS_TEXT[REQUEST_CONTRACT_STATUS.waited],
  },
  {
    id: Number(REQUEST_CONTRACT_STATUS.accepted),
    title: REQUEST_CONTRACT_STATUS_TEXT[REQUEST_CONTRACT_STATUS.accepted],
  },
  {
    id: Number(REQUEST_CONTRACT_STATUS.rejected),
    title: REQUEST_CONTRACT_STATUS_TEXT[REQUEST_CONTRACT_STATUS.rejected],
  },
];

export const REQUEST_CONTRACT_STATUS_TAG_COLOR: Record<RequestContractStatus, string> = {
  [RequestContractStatus.REQUESTED_NEW]: "orange",
  [RequestContractStatus.REQUESTED_EXTEND]: "orange",
  [RequestContractStatus.REQUESTED_COPY]: "orange",
  [RequestContractStatus.SUBMITTED_NEW]: "orange",
  [RequestContractStatus.SUBMITTED_EXTEND]: "orange",
  [RequestContractStatus.SUBMITTED_COPY]: "orange",
  [RequestContractStatus.REJECTED_NEW]: "red",
  [RequestContractStatus.REJECTED_EXTEND]: "red",
  [RequestContractStatus.REJECTED_COPY]: "red",
  [RequestContractStatus.ACCEPTED_COPY]: "green",
  [RequestContractStatus.ACCEPTED_EXTEND]: "green",
  [RequestContractStatus.ACCEPTED_NEW]: "green",
};

// نوع درخواست قرارداد
export const REQUEST_CONTRACT_TYPE = {
  create: 1, // ایجاد قرارداد
  copy: 2, // کپی قرارداد
  renew: 3, // تمدید قرارداد
} as const;

export type RequestContractType =
  (typeof REQUEST_CONTRACT_TYPE)[keyof typeof REQUEST_CONTRACT_TYPE];

export const REQUEST_CONTRACT_TYPE_TEXT: Record<RequestContractType, string> = {
  [REQUEST_CONTRACT_TYPE.create]: "ایجاد قرارداد",
  [REQUEST_CONTRACT_TYPE.copy]: "کپی قرارداد",
  [REQUEST_CONTRACT_TYPE.renew]: "تمدید قرارداد",
};

export const REQUEST_CONTRACT_TYPE_COLOR: Record<
  RequestContractType,
  string | undefined
> = {
  [REQUEST_CONTRACT_TYPE.create]: undefined, // neutral / default
  [REQUEST_CONTRACT_TYPE.copy]: "purple",
  [REQUEST_CONTRACT_TYPE.renew]: "volcano",
};

export const REQUEST_CONTRACT_WAITING_DAY = {
  lessThan3: 1, // کمتر از 3 روز
  between3And7: 2, // بین 3 تا 7 روز
  moreThan7: 3, // بیشتر از 7 روز
} as const;

export type RequestContractWaitingDay =
  (typeof REQUEST_CONTRACT_WAITING_DAY)[keyof typeof REQUEST_CONTRACT_WAITING_DAY];

export const REQUEST_CONTRACT_WAITING_DAY_OPTIONS: {
  id: RequestContractWaitingDay;
  title: string;
}[] = [
  { id: REQUEST_CONTRACT_WAITING_DAY.lessThan3, title: "کمتر از 3 روز" },
  { id: REQUEST_CONTRACT_WAITING_DAY.between3And7, title: "بین 3 تا 7 روز" },
  { id: REQUEST_CONTRACT_WAITING_DAY.moreThan7, title: "بیشتر از 7 روز" },
];

export const REQUEST_CONTRACT_TYPE_OPTIONS = [
  {
    id: REQUEST_CONTRACT_TYPE.create,
    title: REQUEST_CONTRACT_TYPE_TEXT[REQUEST_CONTRACT_TYPE.create],
  },
  {
    id: REQUEST_CONTRACT_TYPE.copy,
    title: REQUEST_CONTRACT_TYPE_TEXT[REQUEST_CONTRACT_TYPE.copy],
  },
  {
    id: REQUEST_CONTRACT_TYPE.renew,
    title: REQUEST_CONTRACT_TYPE_TEXT[REQUEST_CONTRACT_TYPE.renew],
  },
];

export const getRequestContractTypeByStatus = (
  status: number
): RequestContractType | null => {
  switch (status) {
    case RequestContractStatus.REQUESTED_NEW:
    case RequestContractStatus.SUBMITTED_NEW:
    case RequestContractStatus.ACCEPTED_NEW:
    case RequestContractStatus.REJECTED_NEW:
      return REQUEST_CONTRACT_TYPE.create;
    case RequestContractStatus.REQUESTED_COPY:
    case RequestContractStatus.SUBMITTED_COPY:
    case RequestContractStatus.ACCEPTED_COPY:
    case RequestContractStatus.REJECTED_COPY:
      return REQUEST_CONTRACT_TYPE.copy;
    case RequestContractStatus.REQUESTED_EXTEND:
    case RequestContractStatus.SUBMITTED_EXTEND:
    case RequestContractStatus.ACCEPTED_EXTEND:
    case RequestContractStatus.REJECTED_EXTEND:
      return REQUEST_CONTRACT_TYPE.renew;
    default:
      return null;
  }
};

export const getRequestContractTypeIdTitle = (
  status: number
): { id: RequestContractType; title: string } | null => {
  const requestType = getRequestContractTypeByStatus(status);

  if (requestType === null) return null;

  return {
    id: requestType,
    title: REQUEST_CONTRACT_TYPE_TEXT[requestType],
  };
};

/** Unique request-type options derived from a status pool (e.g. waited / accepted). */
export const getRequestContractTypeOptionsByStatuses = (
  statuses: readonly number[]
): { id: RequestContractType; title: string }[] => {
  const optionsMap = new Map<
    RequestContractType,
    { id: RequestContractType; title: string }
  >();

  statuses.forEach((status) => {
    const option = getRequestContractTypeIdTitle(status);

    if (option != null) {
      optionsMap.set(option.id, option);
    }
  });

  return Array.from(optionsMap.values());
};

/** All contract-status ids for a request type (create / copy / renew). */
export const REQUEST_CONTRACT_STATUS_BY_TYPE: Record<
  RequestContractType,
  RequestContractStatus[]
> = {
  [REQUEST_CONTRACT_TYPE.create]: [
    RequestContractStatus.REQUESTED_NEW,
    RequestContractStatus.SUBMITTED_NEW,
    RequestContractStatus.ACCEPTED_NEW,
    RequestContractStatus.REJECTED_NEW,
  ],
  [REQUEST_CONTRACT_TYPE.copy]: [
    RequestContractStatus.REQUESTED_COPY,
    RequestContractStatus.SUBMITTED_COPY,
    RequestContractStatus.ACCEPTED_COPY,
    RequestContractStatus.REJECTED_COPY,
  ],
  [REQUEST_CONTRACT_TYPE.renew]: [
    RequestContractStatus.REQUESTED_EXTEND,
    RequestContractStatus.SUBMITTED_EXTEND,
    RequestContractStatus.ACCEPTED_EXTEND,
    RequestContractStatus.REJECTED_EXTEND,
  ],
};

/** Status ids for request types; optional `statusPool` limits to that tab’s statuses. */
export const getRequestContractStatusesByRequestTypes = (
  requestTypeIds: number[],
  statusPool?: readonly number[]
): number[] => {
  if (!requestTypeIds.length) {
    return [];
  }

  const statuses = requestTypeIds.flatMap(
    (requestTypeId) =>
      REQUEST_CONTRACT_STATUS_BY_TYPE[requestTypeId as RequestContractType] ?? []
  );

  if (!statusPool?.length) {
    return statuses;
  }

  return statuses.filter((status) => statusPool.includes(status));
};

export const getRequestContractRowStatusByStatus = (
  status: number
): RequestContractRowStatus | null => {
  if (
    (REQUEST_CONTRACT_STATUS_FILTER.pendingCompletion as readonly number[]).includes(
      status
    )
  ) {
    return REQUEST_CONTRACT_STATUS.pendingCompletion;
  }

  if ((REQUEST_CONTRACT_STATUS_FILTER.waited as readonly number[]).includes(status)) {
    return REQUEST_CONTRACT_STATUS.waited;
  }

  if ((REQUEST_CONTRACT_STATUS_FILTER.accepted as readonly number[]).includes(status)) {
    return REQUEST_CONTRACT_STATUS.accepted;
  }

  if ((REQUEST_CONTRACT_STATUS_FILTER.rejected as readonly number[]).includes(status)) {
    return REQUEST_CONTRACT_STATUS.rejected;
  }

  return null;
};

/** Expand advance-filter option ids (0/1/2/3) to API contractStatus values. */
export const getRequestContractStatusesByFilterOptionIds = (
  optionIds: number[]
): number[] => {
  if (!optionIds.length) {
    return [];
  }

  return optionIds.flatMap((id) => {
    if (id === Number(REQUEST_CONTRACT_STATUS.pendingCompletion)) {
      return [...REQUEST_CONTRACT_STATUS_FILTER.pendingCompletion];
    }

    if (id === Number(REQUEST_CONTRACT_STATUS.waited)) {
      return [...REQUEST_CONTRACT_STATUS_FILTER.waited];
    }

    if (id === Number(REQUEST_CONTRACT_STATUS.accepted)) {
      return [...REQUEST_CONTRACT_STATUS_FILTER.accepted];
    }

    if (id === Number(REQUEST_CONTRACT_STATUS.rejected)) {
      return [...REQUEST_CONTRACT_STATUS_FILTER.rejected];
    }

    return [];
  });
};

export const getRequestContractStatusLabel = (status: number): string => {
  return REQUEST_CONTRACT_STATUS_LABEL[status as RequestContractStatus] ?? "-";
};

/** Menu label for completing an incomplete request (status 0 / 1 / 2). */
export const getRequestContractCompleteActionTitle = (status: number): string | null => {
  switch (status) {
    case RequestContractStatus.REQUESTED_NEW:
      return "تکمیل ایجاد";
    case RequestContractStatus.REQUESTED_EXTEND:
      return "تکمیل تمدید";
    case RequestContractStatus.REQUESTED_COPY:
      return "تکمیل کپی";
    default:
      return null;
  }
};

export const getRequestContractStatusTagColor = (status: number): string | undefined => {
  return REQUEST_CONTRACT_STATUS_TAG_COLOR[status as RequestContractStatus];
};
