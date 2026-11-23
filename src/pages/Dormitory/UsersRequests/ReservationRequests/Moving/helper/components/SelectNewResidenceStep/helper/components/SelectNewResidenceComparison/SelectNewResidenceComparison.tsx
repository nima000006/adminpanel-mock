import { AiOutlineDown } from "react-icons/ai";

import { SelectNewResidenceComparisonProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceComparison/@types/@selectNewResidenceComparisonTypes";
import SelectNewResidenceInfoCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceInfoCard/SelectNewResidenceInfoCard";

const SelectNewResidenceComparison = ({
  base,
  current,
  alternative,
  moveNotes = [],
}: SelectNewResidenceComparisonProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="bg-neutral-3 flex flex-col items-center gap-2 rounded-3xl p-6">
      <SelectNewResidenceInfoCard
        label="اقامت فعلی"
        variant="current"
        base={base}
        data={current}
      />

      <div className="flex items-center justify-center gap-2 py-1">
        <div className="bg-primary-6 flex size-6 shrink-0 items-center justify-center rounded-full">
          <AiOutlineDown className="text-neutral-1" size={16} />
        </div>
        <p className="text-neutral-7 m-0 text-center text-xs">
          جابه‌جایی به :
          {moveNotes.map((note) => (
            <span key={note} className="text-neutral-10">
              {" "}
              {note}
            </span>
          ))}
        </p>
      </div>

      <SelectNewResidenceInfoCard
        label="اقامت جایگزین"
        variant="alternative"
        base={base}
        data={alternative}
      />
    </div>
  );
};

export default SelectNewResidenceComparison;
