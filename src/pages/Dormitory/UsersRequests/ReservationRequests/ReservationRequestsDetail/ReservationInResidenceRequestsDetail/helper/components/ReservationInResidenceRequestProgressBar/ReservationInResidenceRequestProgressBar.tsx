import { Progress } from "antd";

import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  ReservationInResidenceProgressStatus,
  ReservationInResidenceRequestProgressBarProps,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationInResidenceRequestsDetail/helper/components/ReservationInResidenceRequestProgressBar/@types/@reservationInResidenceRequestProgressBarTypes";

const STATUS_CONFIG: Record<
  ReservationInResidenceProgressStatus,
  {
    strokeColor: string;
    defaultPercent: number;
    defaultRemainingText: string;
    colorText: string;
  }
> = {
  inResidence: {
    strokeColor: "#2B91FF",
    colorText: "#383941",
    defaultPercent: 55,
    defaultRemainingText: "۱۲۰روز مانده از اسکان",
  },
  overdue: {
    strokeColor: "#FF4D4F",
    colorText: "#383941",
    defaultPercent: 100,
    defaultRemainingText: "۱۰ روز از موعد تخلیه گذشته",
  },
  dueToday: {
    strokeColor: "#FFA940",
    colorText: "#383941",
    defaultPercent: 98,
    defaultRemainingText: "۲ ساعت مانده از اسکان",
  },
};

const ReservationInResidenceRequestProgressBar = ({
  status = "dueToday",
  percent,
  remainingText,
  residenceCompletionDate = null,
  className,
}: ReservationInResidenceRequestProgressBarProps) => {
  const config = STATUS_CONFIG[status];
  const progressPercent = percent ?? config.defaultPercent;
  const progressText = remainingText ?? config.defaultRemainingText;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className={`flex w-full flex-col gap-4 ${className ?? ""}`}>
      {/* ************************************************************************ */}
      {/* progress bar + remaining text */}
      <div className="flex w-full items-center gap-2">
        <Progress
          className="m-0! min-w-0 flex-1"
          percent={progressPercent}
          strokeColor={config.strokeColor}
          strokeWidth={4}
          showInfo={false}
        />
        <span
          className="shrink-0 text-sm whitespace-nowrap"
          style={{ color: config.colorText }}
        >
          {progressText}
        </span>
      </div>

      {/* ************************************************************************ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex-col gap-2">
          <span className="text-neutral-7 text-xs">تاریخ شروع اسکان</span>
          <span className="text-neutral-11 text-base leading-6">
            {dataPlaceHolder({
              data: "2026-09-23",
              isDate: true,
              customDateFormat: "DDMMMMYYYY",
            })}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-7 text-xs">تاریخ پایان اسکان</span>
          <div className="flex items-center gap-0.5">
            <span className="text-neutral-11 text-base leading-6">
              {dataPlaceHolder({
                data: "2026-06-21",
                isDate: true,
                customDateFormat: "DDMMMMYYYY",
              })}
            </span>
            <span className="text-neutral-7 text-sm">"12:00"</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-7 text-xs">تاریخ ورود</span>
          <span className="text-neutral-11 text-base leading-6">
            {dataPlaceHolder({
              data: "2026-09-27",
              isDate: true,
              customDateFormat: "DDMMMMYYYY",
            })}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-7 text-xs">تاریخ اتمام اسکان</span>
          <span className="text-neutral-11 text-base leading-6">
            {dataPlaceHolder({
              data: residenceCompletionDate,
              isDate: !!residenceCompletionDate,
              customDateFormat: "DDMMMMYYYY",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationInResidenceRequestProgressBar;
