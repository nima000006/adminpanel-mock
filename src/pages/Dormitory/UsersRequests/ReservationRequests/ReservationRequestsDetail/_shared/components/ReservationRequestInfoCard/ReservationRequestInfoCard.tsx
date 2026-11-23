import {
  PiCalendarBlankThin,
  PiCoins,
  PiFileTextDuotone,
  PiHourglassSimpleHigh,
} from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ReservationCompletedRequestsStatus } from "@pages/Dormitory/_shared/utils";
import { ReservationRequestInfoCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestInfoCard/@types/@reservationRequestInfoCardTypes";

const ReservationRequestInfoCard = ({
  showLastActionInfo = true,
  title,
  Icon,
  paymentTypeText,
  paymentTypeColor,
  reservationAcceptanceProgramText,
  reservationAcceptanceProgramColor,
  showAdmissionDate = true,
}: ReservationRequestInfoCardProps) => {
  const { params: url } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomDivider
        text={
          <span className="flex items-center gap-2">
            <PiFileTextDuotone /> اطلاعات درخواست
          </span>
        }
        size="small"
      />

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        {/* ************************************************************************ */}
        {/* first card */}
        <div className="border-neutral-4 bg-neutral-1 flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <span>{<PiCalendarBlankThin size={25} />} </span>
            <span className="text-neutral-7"> برنامه پذیرش</span>
          </div>
          <div className="text-primary-6">کارشناسی ارشد ورودی ۱۴۰5</div>
          <div className="border-neutral-4 border" />
          <CustomTag
            color={reservationAcceptanceProgramColor}
            className="flex w-fit items-center gap-1"
          >
            {reservationAcceptanceProgramText}
          </CustomTag>
          {showAdmissionDate ? <span>از 12مهر 1405 تا 17مهر 1405</span> : null}
        </div>

        {/* ************************************************************************ */}
        {/* second card */}
        <div className="flex h-full flex-col gap-2">
          <div className="border-neutral-4 bg-neutral-1 flex flex-1 flex-col gap-3 rounded-lg border p-3">
            <div className="flex items-center gap-2">
              {Icon ? <Icon /> : null}
              <h5 className="text-neutral-13 text-bold">{title}</h5>
            </div>
          </div>

          <div className="border-neutral-4 bg-neutral-1 flex flex-1 flex-col justify-center gap-3 rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <PiCoins size={23} color={"#8C8C8C"} />
              <CustomTag
                color={paymentTypeColor}
                className="flex w-fit items-center gap-1"
              >
                {paymentTypeText}
              </CustomTag>
            </div>
          </div>
        </div>

        {/* ************************************************************************ */}
        {/* third card */}
        <div className="border-neutral-4 bg-neutral-1 flex flex-col gap-3 rounded-lg border p-3">
          {/* تاریخ ایجاد درخواست */}
          <div className="flex w-full items-center justify-between gap-2 text-xs">
            <span className="text-neutral-8 shrink-0">تاریخ ایجاد درخواست</span>
            <span className="text-neutral-10 min-w-0 truncate">
              {dataPlaceHolder({
                data: "2024-07-02T10:32:00",
                isDate: true,
                customDateFormat: "YYYY/MM/DD،HH:mm",
              })}
            </span>
          </div>
          {/* نوع رزرو */}
          <div className="flex w-full items-center justify-between gap-2 text-xs">
            <span className="text-neutral-8 shrink-0">نوع رزرو</span>
            <CustomTag
              color="gold"
              icon={<PiHourglassSimpleHigh />}
              className="flex w-fit items-center gap-1"
            >
              رزرو درخواستی
            </CustomTag>
          </div>
          {/* تاریخ آخرین اقدام , آخرین اقدام کننده */}
          {showLastActionInfo ? (
            <>
              <div className="flex w-full items-center justify-between gap-2 text-xs">
                <span className="text-neutral-8 shrink-0">تاریخ آخرین اقدام</span>
                <span className="text-neutral-10 min-w-0 truncate">
                  {dataPlaceHolder({
                    data: "2024-07-02T10:32:00",
                    isDate: true,
                    customDateFormat: "YYYY/MM/DD،HH:mm",
                  })}
                </span>
              </div>
              <div className="flex w-full items-center justify-between gap-2 text-xs">
                <span className="text-neutral-8 shrink-0">آخرین اقدام کننده</span>
                <span className="text-neutral-10 min-w-0 truncate">آفاق دانا</span>
              </div>
            </>
          ) : null}
          {url?.status === ReservationCompletedRequestsStatus.expired ||
          url?.status === ReservationCompletedRequestsStatus?.cancelled ? (
            <div className="flex w-full items-center justify-between gap-2 text-xs">
              <span className="text-neutral-8 shrink-0">تاریخ تغییر وضعیت</span>
              <span className="text-neutral-10 min-w-0 truncate">
                {dataPlaceHolder({
                  data: "2024-07-02T10:32:00",
                  isDate: true,
                  customDateFormat: "YYYY/MM/DD،HH:mm",
                })}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReservationRequestInfoCard;
