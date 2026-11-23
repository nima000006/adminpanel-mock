import { dataPlaceHolder } from "@infra/helpers/utils";

const ReservationCompleteRequestDateResidence = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
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
    </div>
  );
};
export default ReservationCompleteRequestDateResidence;
