import { AiOutlineInfoCircle } from "react-icons/ai";

import { EvacuationSettlementResultCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationSettlementResultCard/@types/@evacuationSettlementResultCardTypes";

const EvacuationSettlementResultCard = ({
  data,
}: EvacuationSettlementResultCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className="bg-neutral-3 border-neutral-4 flex flex-col gap-6 rounded-2xl border p-6"
      dir="rtl"
    >
      <p className="text-neutral-13 text-center font-medium">
        نتیجه صورت حساب تخلیه اسکان :
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 text-sm">
          <p className="text-neutral-13 font-bold">{data.userToResidence.label}</p>
          <p className="text-neutral-13 font-bold">{data.userToResidence.value}</p>
          <p className="text-neutral-10">{data.userToResidence.description}</p>
        </div>

        <div className="bg-neutral-5 h-px" />

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-neutral-13 font-bold">{data.residenceToUser.label}</p>
          <p className="text-neutral-13 font-bold">{data.residenceToUser.value}</p>
          {data.residenceToUser.extraValues?.map((value) => (
            <p key={value} className="text-neutral-13 font-bold">
              {value}
            </p>
          ))}
          <p className="text-neutral-10">{data.residenceToUser.description}</p>
        </div>
      </div>

      <div className="bg-primary-1 flex flex-col items-start gap-2 rounded-xl p-3">
        <AiOutlineInfoCircle className="text-primary-6" size={16} />
        <p className="text-neutral-10 w-full text-base font-medium">{data.infoNote}</p>
      </div>
    </div>
  );
};

export default EvacuationSettlementResultCard;
