import { PiStarFill } from "react-icons/pi";

import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";

import { TicketRateProps } from "./@types/ticket-rate.types";

const TicketRate = ({
  value,
  isForTable = false,
  rateProps,
  count = 5,
  disabled = true,
  allowHalf = true,
}: TicketRateProps) => {
  const hasValue =
    value !== null &&
    value !== undefined &&
    value !== "" &&
    value !== 0 &&
    !Number.isNaN(Number(value));

  const rateText = hasValue ? `${value} از ${count}` : "امتیاز ثبت نشده";

  return (
    <div className="flex gap-2">
      {isForTable ? (
        <>
          <PiStarFill width={24} height={24} color={hasValue ? "gold" : NEUTRAL_05} />
          <div>{rateText}</div>
        </>
      ) : (
        <>
          <CustomRate
            count={count}
            value={hasValue ? Number(value) : 0}
            {...rateProps}
            disabled={disabled}
            allowHalf={allowHalf}
          />
          <div>{rateText}</div>
        </>
      )}
    </div>
  );
};

export default TicketRate;
