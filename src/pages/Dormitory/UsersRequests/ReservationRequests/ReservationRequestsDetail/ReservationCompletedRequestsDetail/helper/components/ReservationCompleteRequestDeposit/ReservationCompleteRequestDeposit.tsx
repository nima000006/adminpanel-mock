import { PiArrowLeft, PiReceiptLight, PiReceiptXLight } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ReservationCompleteRequestDepositProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/components/ReservationCompleteRequestDeposit/@types/@reservationCompleteRequestDepositTypes";

const STATUS_CONFIG: Record<
  any,
  {
    icon: React.ReactNode;
    flowFrom: string;
    flowTo: string;
    receiptLabel?: string;
    showPendingTag?: boolean;
    dateLabel: string;
  }
> = {
  pendingRefund: {
    icon: <PiReceiptXLight size={30} color="#E6F7FF" />,
    flowFrom: "واریز توسط اقامتگاه",
    flowTo: "کاربر",
    showPendingTag: true,
    dateLabel: "تاریخ بازپرداخت",
  },
  paid: {
    icon: <PiReceiptLight size={30} color="#E6F7FF" />,
    flowFrom: "واریز توسط کاربر",
    flowTo: "اقامتگاه",
    receiptLabel: "سند رسید پرداخت",
    dateLabel: "تاریخ پرداخت",
  },
  refunded: {
    icon: <PiReceiptLight size={30} color="#E6F7FF" />,
    flowFrom: "واریز توسط اقامتگاه",
    flowTo: "کاربر",
    receiptLabel: "سند رسید بازپرداخت",
    dateLabel: "تاریخ بازپرداخت",
  },
};

const ReservationCompleteRequestDeposit = ({
  status = "pendingRefund",
  paymentDate = "2026-03-03",
  repaymentDate = null,
  onViewReceipt,
  className,
}: ReservationCompleteRequestDepositProps) => {
  const config = STATUS_CONFIG[status];
  const isPendingRefund = status === "pendingRefund";
  const isPaid = status === "paid";
  const dateValue = isPaid ? paymentDate : repaymentDate;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`bg-primary-1 flex min-h-30.5 w-full flex-col gap-1 overflow-hidden rounded-lg p-3 ${className ?? ""}`}
    >
      {/* ************************************************************************ */}
      {/* header */}
      <div className="flex w-full flex-wrap items-start justify-between gap-x-2.5 gap-y-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="bg-primary-6 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            {config.icon}
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-neutral-13 text-sm font-medium">ودیعه</span>

            {config.showPendingTag ? (
              <CustomTag color="orange" className="w-fit">
                در‌انتظار پرداخت
              </CustomTag>
            ) : null}

            {config.receiptLabel ? (
              <CustomButton
                type="link"
                loading={false}
                onClick={onViewReceipt}
                className="text-primary-7! h-auto min-h-0 p-0 text-sm leading-none"
              >
                {config.receiptLabel}
              </CustomButton>
            ) : null}
          </div>
        </div>

        <div className="text-neutral-8 flex max-w-full flex-wrap items-center gap-1 text-xs">
          <span className="whitespace-nowrap">{config.flowFrom}</span>
          <PiArrowLeft size={16} className="shrink-0" />
          <span className="whitespace-nowrap">{config.flowTo}</span>
        </div>
      </div>

      {/* ************************************************************************ */}
      {/* amount */}
      <div className="flex min-h-0 flex-1 items-center justify-end">
        <span className="text-neutral-13 text-lg font-medium sm:text-[20px]">
          {dataPlaceHolder({
            data: (15000000)?.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
        </span>
      </div>

      {/* ************************************************************************ */}
      {/* footer date */}
      <p className="text-neutral-8 mb-0 text-xs">
        {config.dateLabel}:
        {isPendingRefund || !dateValue
          ? " -"
          : ` ${dataPlaceHolder({
              data: dateValue,
              isDate: true,
              customDateFormat: "YYYY/MM/DD",
            })}`}
      </p>
    </div>
  );
};

export default ReservationCompleteRequestDeposit;
