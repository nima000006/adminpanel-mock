import { dataPlaceHolder } from "@infra/helpers/utils";
import { FinalApprovalAmountCard } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/@types/@finalApprovalStepTypes";

type FinalApprovalAmountSummaryCardProps = {
  data: FinalApprovalAmountCard;
};

const HEADER_CLASS_BY_VARIANT: Record<FinalApprovalAmountCard["variant"], string> = {
  deposit: "bg-primary-1 border-primary-8 text-primary-7",
  debtor: "bg-dustred-1 border-dustred-8 text-dustred-6",
  creditor: "bg-yellow-1 border-orange-8 text-yellow",
};

const FinalApprovalAmountSummaryCard = ({
  data,
}: FinalApprovalAmountSummaryCardProps) => {
  const headerClassName = HEADER_CLASS_BY_VARIANT[data.variant];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col">
      <div
        className={`${headerClassName} flex items-center justify-center rounded-t-2xl border-b border-dashed px-6 py-2`}
      >
        <p className="m-0 text-center text-xl font-medium">{data.title}</p>
      </div>
      <div className="bg-neutral-2 flex items-center justify-center rounded-b-md px-6 py-2">
        <span className="text-neutral-13 text-xl font-medium">
          {dataPlaceHolder({
            data: data.amountRial,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
        </span>
      </div>
    </div>
  );
};

export default FinalApprovalAmountSummaryCard;
