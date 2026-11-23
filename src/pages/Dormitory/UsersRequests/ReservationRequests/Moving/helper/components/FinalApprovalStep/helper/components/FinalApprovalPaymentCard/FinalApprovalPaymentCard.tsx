import { FinalApprovalPaymentBlock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/@types/@finalApprovalStepTypes";

type FinalApprovalPaymentCardProps = {
  data: FinalApprovalPaymentBlock;
  isAlternative: boolean;
};

const FinalApprovalPaymentCard = ({
  data,
  isAlternative,
}: FinalApprovalPaymentCardProps) => {
  const cardClassName = isAlternative ? "bg-primary-1" : "bg-neutral-3";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`${cardClassName} flex w-full flex-col rounded-2xl border-b border-dashed border-[#e5e7eb] p-6`}
    >
      <div className="text-neutral-11 flex flex-col gap-1.5 text-right text-sm">
        <p className="m-0">{data.title}</p>
        {data.amounts.map((amount) => (
          <p key={amount} className="m-0">
            {amount}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FinalApprovalPaymentCard;
