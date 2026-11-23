import { dataPlaceHolder } from "@infra/helpers/utils";
import { EvacuationAmountSummaryCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/helper/components/EvacuationAmountSummaryCard/@types/@evacuationAmountSummaryCardTypes";

const EvacuationAmountSummaryCard = ({
  label,
  amountRial,
}: EvacuationAmountSummaryCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="bg-neutral-2 flex min-w-[220px] flex-1 flex-col items-center rounded-lg p-2">
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <p className="text-neutral-10 m-0 text-xs">{label}</p>
        <p className="text-neutral-13 m-0 text-base font-medium">
          {dataPlaceHolder({
            data: amountRial,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
        </p>
      </div>
    </div>
  );
};

export default EvacuationAmountSummaryCard;
