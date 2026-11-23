import { PiStarFill } from "react-icons/pi";

import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";

const DormitoryQualityGrade = ({ value }: { value: string | null }) => (
  <div className="flex items-center gap-2">
    {value != null ? (
      <>
        <PiStarFill width={24} height={24} color="gold" />
        <span>{value}</span>
      </>
    ) : (
      <span className="flex items-center gap-2">
        <PiStarFill width={24} height={24} color={NEUTRAL_05} />
        <span className="body-regular">فاقد درجه کیفی</span>
      </span>
    )}
  </div>
);

export default DormitoryQualityGrade;
