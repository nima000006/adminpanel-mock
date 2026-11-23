import { Progress } from "antd";

import { dataPlaceHolder } from "@infra/helpers/utils";
import { EvacuationStaySummaryProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationStaySummary/@types/@evacuationStaySummaryTypes";
import {
  EVACUATION_TIMING,
  EvacuationTiming,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

const PROGRESS_STROKE_BY_TIMING: Record<EvacuationTiming, string> = {
  [EVACUATION_TIMING.early]: "#1890FF",
  [EVACUATION_TIMING.late]: "#FF4D4F",
  [EVACUATION_TIMING.onTime]: "#FFA940",
};

const EvacuationStaySummary = ({ timing, data }: EvacuationStaySummaryProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-4 bg-neutral-1 flex w-full flex-col gap-4 overflow-hidden rounded-lg border p-2">
      <div className="flex w-full items-center gap-2">
        <Progress
          className="m-0! min-w-0 flex-1"
          percent={data.progressPercent}
          strokeColor={PROGRESS_STROKE_BY_TIMING[timing]}
          strokeWidth={4}
          showInfo={false}
        />
        <span className="text-neutral-11 shrink-0 text-sm whitespace-nowrap">
          {data.progressText}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item) => (
          <div
            key={item.label}
            className="flex w-full flex-col items-start gap-2 text-right"
          >
            <span className="text-neutral-7 w-full text-xs">{item.label}</span>
            <span className="text-neutral-11 w-full text-base leading-6">
              {item.isPrice
                ? dataPlaceHolder({
                    data: item.value,
                    isPrice: true,
                    isRial: true,
                    currency: { isAvailable: true, type: "تومان" },
                  })
                : `${dataPlaceHolder({ data: item.value?.toString() })}${
                    item.suffix ? ` ${item.suffix}` : ""
                  }`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvacuationStaySummary;
