import { useState } from "react";

import { PiCaretDown, PiCaretUp } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import ReservationFactorCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/ReservationFactorCard";
import { ResidenceHistoryCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/helper/components/ResidenceHistoryCard/@types/@residenceHistoryCardTypes";
import { reservationAcceptanceProgramMap } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";

const LOCATION_FIELDS = [
  { key: "floor", label: "طبقه" },
  { key: "building", label: "ساختمان" },
  { key: "room", label: "اتاق" },
  { key: "bed", label: "تخت" },
] as const;

const ResidenceHistoryCard = ({ item }: ResidenceHistoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(item.defaultExpanded));
  const scheduleType = reservationAcceptanceProgramMap[item.scheduleType];
  const hasExpandableContent = Boolean(item.location || item.installments?.length);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="flex w-full flex-col gap-4">
      {/* عنوان، نوع برنامه و بازه زمانی */}
      <div className="flex w-full flex-wrap items-center justify-start gap-2">
        <span className="text-neutral-11 text-base leading-6">{item.title}</span>

        <CustomTag color={scheduleType.color} className="w-fit">
          {scheduleType.label}
        </CustomTag>

        <span className="bg-neutral-4 h-4 w-px shrink-0" />

        <span className="text-neutral-10 text-sm">{item.dateRange}</span>
      </div>

      {/* تاریخ ورود و اتمام اسکان */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-neutral-7 text-xs">تاریخ ورود</span>
          <span className="text-neutral-11 text-sm">{item.entryDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-7 text-xs">تاریخ اتمام اسکان</span>
          <span className="text-neutral-11 text-sm">{item.endDate}</span>
        </div>
      </div>

      {/* جزئیات مکان و فاکتورها — فقط در حالت باز */}
      {isExpanded ? (
        <>
          {item.location ? (
            <div className="flex w-full flex-wrap items-center gap-2">
              {LOCATION_FIELDS.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-neutral-7 text-xs">{label}</span>
                  <span className="text-neutral-9 text-sm">{item.location?.[key]}</span>
                </div>
              ))}
            </div>
          ) : null}

          {item.installments?.length ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {item.installments.map((installment) => (
                <ReservationFactorCard
                  key={installment.id}
                  status={installment.status}
                  Installment
                />
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      {/* دکمه بیشتر / کمتر */}
      {hasExpandableContent ? (
        <div className="flex w-full justify-start">
          <CustomButton
            type="link"
            className="max-h-6 min-h-6 p-0 text-xs"
            icon={isExpanded ? <PiCaretUp size={16} /> : <PiCaretDown size={16} />}
            iconPlacement="start"
            onClick={toggleExpanded}
          >
            {isExpanded ? "کمتر" : "بیشتر"}
          </CustomButton>
        </div>
      ) : null}
    </div>
  );
};

export default ResidenceHistoryCard;
