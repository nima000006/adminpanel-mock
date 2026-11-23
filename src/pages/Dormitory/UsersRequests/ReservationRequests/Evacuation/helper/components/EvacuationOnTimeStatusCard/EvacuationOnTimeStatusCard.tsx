import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const DISABLED_CALCULATION_ROWS = [
  "محاسبه هزینه مازاد اقامت",
  "محاسبه هزینه بابت روز های باقی مانده",
] as const;

const EvacuationOnTimeStatusCard = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-5 bg-neutral-1 flex w-full flex-col gap-6 rounded-2xl border p-6">
      <div className="bg-green-1 flex flex-col items-center gap-4 rounded-xl px-5 py-4 text-center">
        <AiOutlineCheck className="text-green-6" size={20} />
        <p className="text-neutral-13 m-0 text-sm font-medium">
          کاربر تمام روز ها و تمام هزینه اقامتی خود را استفاده کرده است
        </p>
      </div>

      {DISABLED_CALCULATION_ROWS.map((label) => (
        <div key={label} className="flex items-center justify-center gap-2.5">
          <span className="text-neutral-12 text-sm font-bold">{label}</span>
          <AiOutlineClose className="text-dustred-5" size={20} />
        </div>
      ))}
    </div>
  );
};

export default EvacuationOnTimeStatusCard;
