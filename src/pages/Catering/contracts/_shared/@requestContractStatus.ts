export enum RequestContractStatus {
  REQUESTED_NEW = 0, //  در انتظار تکمیل ایجاد
  REQUESTED_EXTEND = 1, // در انتظار تکمیل تمدید
  REQUESTED_COPY = 2, // در انتظار تکمیل کپی
  SUBMITTED_NEW = 3, // در انتظار بررسی جدید
  SUBMITTED_EXTEND = 4, // در انتظار بررسی تمدید
  SUBMITTED_COPY = 5, // در انتظار بررسی کپی
  REJECTED_NEW = 6, // رد شده
  ACCEPTED_COPY = 7, // تایید شده کپی
  ACCEPTED_EXTEND = 8, // تایید شده تمدید
  ACCEPTED_NEW = 9, // تایید شده جدید
  REJECTED_EXTEND = 10, // رد شده تمدید
  REJECTED_COPY = 11, // رد شده کپی
}

export const REQUEST_CONTRACT_STATUS_TEXT: Record<RequestContractStatus, string> = {
  [RequestContractStatus.REQUESTED_NEW]: "در انتظار تکمیل ایجاد",
  [RequestContractStatus.REQUESTED_EXTEND]: "در انتظار تکمیل تمدید",
  [RequestContractStatus.REQUESTED_COPY]: "در انتظار تکمیل کپی",
  [RequestContractStatus.SUBMITTED_NEW]: "در انتظار بررسی جدید",
  [RequestContractStatus.SUBMITTED_EXTEND]: "در انتظار بررسی تمدید",
  [RequestContractStatus.SUBMITTED_COPY]: "در انتظار بررسی کپی",
  [RequestContractStatus.REJECTED_NEW]: "رد شده",
  [RequestContractStatus.REJECTED_EXTEND]: "رد شده تمدید",
  [RequestContractStatus.REJECTED_COPY]: "رد شده کپی",
  [RequestContractStatus.ACCEPTED_COPY]: "تایید شده کپی",
  [RequestContractStatus.ACCEPTED_EXTEND]: "تایید شده تمدید",
  [RequestContractStatus.ACCEPTED_NEW]: "تایید شده جدید",
};

export const REQUEST_CONTRACT_STATUS_FILTER = {
  pendingCompletion: [
    RequestContractStatus.REQUESTED_NEW,
    RequestContractStatus.REQUESTED_EXTEND,
    RequestContractStatus.REQUESTED_COPY,
  ],
  waited: [
    RequestContractStatus.SUBMITTED_NEW,
    RequestContractStatus.SUBMITTED_EXTEND,
    RequestContractStatus.SUBMITTED_COPY,
  ],
  rejected: [
    RequestContractStatus.REJECTED_NEW,
    RequestContractStatus.REJECTED_EXTEND,
    RequestContractStatus.REJECTED_COPY,
  ],
  accepted: [
    RequestContractStatus.ACCEPTED_COPY,
    RequestContractStatus.ACCEPTED_EXTEND,
    RequestContractStatus.ACCEPTED_NEW,
  ],
  all: [
    RequestContractStatus.REQUESTED_NEW,
    RequestContractStatus.REQUESTED_EXTEND,
    RequestContractStatus.REQUESTED_COPY,
    RequestContractStatus.SUBMITTED_NEW,
    RequestContractStatus.SUBMITTED_EXTEND,
    RequestContractStatus.SUBMITTED_COPY,
    RequestContractStatus.REJECTED_NEW,
    RequestContractStatus.REJECTED_EXTEND,
    RequestContractStatus.REJECTED_COPY,
    RequestContractStatus.ACCEPTED_COPY,
    RequestContractStatus.ACCEPTED_EXTEND,
    RequestContractStatus.ACCEPTED_NEW,
  ],
} as const;
