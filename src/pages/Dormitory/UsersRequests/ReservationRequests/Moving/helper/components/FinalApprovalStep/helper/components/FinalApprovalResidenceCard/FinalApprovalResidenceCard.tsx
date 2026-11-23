import { FinalApprovalResidenceInfo } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/@types/@finalApprovalStepTypes";

type FinalApprovalResidenceCardProps = {
  data: FinalApprovalResidenceInfo;
  isAlternative: boolean;
};

const FinalApprovalResidenceCard = ({
  data,
  isAlternative,
}: FinalApprovalResidenceCardProps) => {
  const cardClassName = isAlternative ? " border-primary-5" : " border-neutral-4 ";
  const dotClassName = isAlternative ? "bg-primary-6" : "bg-neutral-6";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`${cardClassName} bg-neutral-1 flex w-full flex-col gap-4 rounded-lg border p-3`}
    >
      <div className="flex items-center justify-start gap-2">
        <span className={`${dotClassName} size-1.5 shrink-0 rounded-full`} />
        <span className="text-neutral-11 text-xs">{data.label}</span>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-1 text-xs">
        <span className="text-neutral-9">{data.bed}</span>
        <span className="text-neutral-7">تخت</span>
        <span className="text-neutral-9">{data.unit}</span>
        <span className="text-neutral-7">واحد اقامتی</span>
        <span className="text-neutral-9">{data.floor}</span>
        <span className="text-neutral-7">طبقه</span>
        <span className="text-neutral-9">{data.building}</span>
        <span className="text-neutral-7">ساختمان</span>
      </div>
    </div>
  );
};

export default FinalApprovalResidenceCard;
