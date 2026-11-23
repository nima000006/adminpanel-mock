import { PiPencilLine, PiReceiptXLight } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProformaPayableFactorCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaPayableFactorCard/@types/@proformaPayableFactorCardTypes";

const ProformaPayableFactorCard = ({
  variant,
  title,
  dueDate,
  amount,
  onEditDueDate,
}: ProformaPayableFactorCardProps) => {
  const isDeposit = variant === "deposit";
  const dateLabel = isDeposit ? "موعد پرداخت" : "تاریخ سررسید";

  return (
    <div
      className={
        isDeposit
          ? "bg-primary-1 flex min-w-70 flex-1 items-stretch gap-2 overflow-hidden rounded-lg p-2"
          : "border-neutral-4 bg-neutral-1 flex min-w-70 flex-1 items-stretch gap-2 overflow-hidden rounded-lg border p-2"
      }
    >
      <div
        className={
          isDeposit
            ? "flex w-17 shrink-0 flex-col items-center justify-center gap-2 overflow-hidden"
            : "bg-neutral-1 flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg p-2"
        }
      >
        {isDeposit ? (
          <>
            <div className="bg-primary-6 flex size-9 items-center justify-center overflow-hidden rounded-lg">
              <PiReceiptXLight size={30} color="#E6F7FF" />
            </div>
            <span className="text-neutral-13 text-sm font-medium">{title}</span>
          </>
        ) : (
          <CustomTag color="orange" className="w-fit">
            {title}
          </CustomTag>
        )}
      </div>

      <div className="border-neutral-5 self-stretch border-l border-dashed" />

      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-7 text-xs">{dateLabel}</span>
          <span className="text-neutral-11 text-sm">
            {dataPlaceHolder({
              data: dueDate,
              isDate: true,
              customDateFormat: "YYYY/MM/DD",
            })}
          </span>
        </div>

        <span className="text-neutral-12 text-[20px] font-medium">
          {dataPlaceHolder({
            data: amount.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
        </span>

        <CustomButton
          type={isDeposit ? "text" : "dashed"}
          block
          icon={<PiPencilLine />}
          iconPlacement="start"
          onClick={onEditDueDate}
          className="max-h-8 min-h-8"
        >
          ویرایش سررسید
        </CustomButton>
      </div>
    </div>
  );
};

export default ProformaPayableFactorCard;
