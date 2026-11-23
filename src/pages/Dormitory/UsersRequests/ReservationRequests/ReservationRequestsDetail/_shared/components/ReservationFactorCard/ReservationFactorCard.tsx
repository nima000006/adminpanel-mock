import { PiArrowLeft } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ReservationFactorCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/@types/@reservationFactorCardTypes";
import { RESERVATION_FACTOR_CARD_STATUS_CONFIG } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";

const ReservationFactorCard = ({
  status,
  lateFeeAmount,
  onViewFactor,
  Installment,
}: ReservationFactorCardProps) => {
  const statusConfig = RESERVATION_FACTOR_CARD_STATUS_CONFIG[status];
  const isPaid = status === "paid";
  const isPending = status === "pendingPayment";
  const isOverdue = status === "overdue";
  const showLateFee = isPaid && lateFeeAmount != null && lateFeeAmount !== "";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={
        "border-neutral-4 bg-neutral-1 flex w-full flex-1 items-stretch gap-2 overflow-hidden rounded-lg border p-2"
      }
    >
      {/* ************************************************************************ */}
      {/* status sidebar — سمت راست */}
      <div className="bg-neutral-1 flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg p-2">
        <CustomTag color={statusConfig.color} className="w-fit">
          {statusConfig.label}
        </CustomTag>

        {/* اگر پرداخت شده بود */}
        {isPaid ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-neutral-7 text-xs">تاریخ پرداخت</span>
            <span className="text-neutral-11 text-sm">
              {dataPlaceHolder({
                data: "2024-04-21",
                isDate: true,
                customDateFormat: "YYYY/MM/DD",
              })}
            </span>
          </div>
        ) : null}

        {/* اگر در انتظار پرداخت بود */}
        {isPending ? (
          <div className="text-neutral-7 text-center text-xs">
            <p className="mb-0">{10} روز</p>
            <p className="mb-0">مانده تا موعد پرداخت</p>
          </div>
        ) : null}

        {/* اگر سر رسید شده بود */}
        {isOverdue ? (
          <div className="text-neutral-13 flex max-w-[196px] flex-col items-center gap-2 text-center text-xs">
            <p className="mb-0">{10} روز از موعد پرداخت گذشته</p>
            <p className="mb-0 whitespace-nowrap">جریمه دیرکرد ندارد</p>
          </div>
        ) : null}
      </div>

      {/* ************************************************************************ */}
      {/* vertical divider */}
      <div className="border-neutral-5 self-stretch border-l border-dashed" />

      {/* ************************************************************************ */}
      {/* main content */}
      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
        {/* تاریخ ایجاد و سررسید*/}
        {Installment ? null : (
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-neutral-7 text-xs">تاریخ ایجاد</span>
              <span className="text-neutral-11 text-sm">
                {dataPlaceHolder({
                  data: "2024-04-21",
                  isDate: true,
                  customDateFormat: "YYYY/MM/DD",
                })}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-neutral-7 text-xs">تاریخ سررسید</span>
              <span className="text-neutral-11 text-sm">
                {dataPlaceHolder({
                  data: "2024-04-21",
                  isDate: true,
                  customDateFormat: "YYYY/MM/DD",
                })}
              </span>
            </div>
          </div>
        )}

        {/* اگر در حالت پایان یافته بود سررسید اقساط نمایش داده میشود. */}
        {Installment ? (
          <div className="flex flex-col gap-2">
            <span className="text-neutral-7 text-xs">تاریخ سررسید قسط اول</span>
            <span className="text-neutral-11 text-sm">
              {dataPlaceHolder({
                data: "2024-04-21",
                isDate: true,
                customDateFormat: "YYYY/MM/DD",
              })}
            </span>
          </div>
        ) : null}

        {/* مبلغ فاکتور */}
        <div className="flex flex-wrap items-center">
          {/* اگر جریمه دیرکرد داشته باشد */}
          {showLateFee ? (
            <>
              <span className="text-neutral-7 text-xs">جریمه دیرکرد</span>
              <span className="text-neutral-12 text-[20px] font-medium">
                {dataPlaceHolder({
                  data: lateFeeAmount?.toString(),
                  isPrice: true,
                  isRial: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </span>
              <span className="text-neutral-7 text-xs"> + </span>
            </>
          ) : null}

          <span className="text-neutral-12 flex text-[20px] font-medium">
            {dataPlaceHolder({
              data: (5000000)?.toString(),
              isPrice: true,
              isRial: true,
              currency: { isAvailable: true, type: "تومان" },
            })}
          </span>
        </div>

        {/* action */}
        {!Installment && isOverdue ? (
          <CustomButton
            type="dashed"
            danger
            block
            loading={false}
            onClick={onViewFactor}
            className="max-h-8 min-h-8"
          >
            مشاهده
          </CustomButton>
        ) : !Installment ? (
          <CustomButton
            type="dashed"
            block
            loading={false}
            icon={<PiArrowLeft size={16} />}
            iconPlacement="end"
            onClick={onViewFactor}
            className="max-h-8 min-h-8"
          >
            مشاهده فاکتور
          </CustomButton>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationFactorCard;
