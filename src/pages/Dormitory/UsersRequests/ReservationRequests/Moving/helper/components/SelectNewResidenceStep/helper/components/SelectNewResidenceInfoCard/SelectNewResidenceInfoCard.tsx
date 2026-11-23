import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import { SelectNewResidenceInfoCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceInfoCard/@types/@selectNewResidenceInfoCardTypes";
import {
  CONFIRM_REQUEST_BED_IMAGE_MAP,
  getConfirmRequestBedLocationParts,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBedReservation/helper/util/confirmRequestBedReservationUtil";
import { getConfirmRequestBuildingLocationParts } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBuildingReservation/helper/util/confirmRequestResidenceReservationCardUtil";
import { getConfirmRequestResidenceLocationParts } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/helper/util/confirmRequestResidenceReservationCardUtil";

const SelectNewResidenceInfoCard = ({
  label,
  variant,
  base,
  data,
}: SelectNewResidenceInfoCardProps) => {
  const hasDeposit = data.depositAmount !== undefined;
  const cardClassName = variant === "alternative" ? "bg-primary-1" : "bg-neutral-1";
  const dotClassName = variant === "alternative" ? "bg-primary-6" : "bg-neutral-6";

  const bedType =
    base === "bed" && data.bedType
      ? BED_TYPE[data.bedType as keyof typeof BED_TYPE]
      : null;
  const BedTypeIcon = bedType?.icon;

  const locationParts =
    base === "bed"
      ? getConfirmRequestBedLocationParts({
          buildingTitle: data.buildingTitle ?? "",
          floorTitle: data.floorTitle ?? "",
          unitTitle: data.unitTitle ?? "",
          roomType: data.roomType ?? "",
        })
      : base === "residence"
        ? getConfirmRequestResidenceLocationParts({
            buildingTitle: data.buildingTitle ?? "",
            floorTitle: data.floorTitle ?? "",
          })
        : getConfirmRequestBuildingLocationParts({
            floorTitle: data.floorTitle ?? "",
            unitTitle: data.unitTitle ?? "",
          });

  const title =
    base === "bed"
      ? data.bedTitle
      : base === "residence"
        ? data.roomTitle
        : data.buildingTitle;

  const subtitle =
    base === "bed"
      ? data.bedPosition
      : base === "residence"
        ? data.floorTitle
        : data.capacity;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className={`flex w-full flex-col gap-3 rounded-xl p-3 ${cardClassName}`}>
      <div className="flex items-center justify-start gap-2">
        <span className={`size-1.5 shrink-0 rounded-full ${dotClassName}`} />
        <p className="text-neutral-11 m-0 text-xs">{label}</p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-start gap-2">
          {base === "bed" && data.bedType ? (
            <img
              src={
                CONFIRM_REQUEST_BED_IMAGE_MAP[
                  data.bedType as keyof typeof CONFIRM_REQUEST_BED_IMAGE_MAP
                ]
              }
              alt={bedType?.label}
              className="size-[38px] shrink-0 object-contain"
            />
          ) : null}

          {base === "residence" ? <RoomIcon size="20" /> : null}

          {base === "building" ? <BuildingIcon size="20" /> : null}

          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <p className="text-neutral-11 m-0 text-sm">{title}</p>
            {subtitle ? <p className="text-neutral-8 m-0 text-xs">{subtitle}</p> : null}
          </div>

          {base === "bed" && bedType && BedTypeIcon ? (
            <CustomTag
              className="flex w-fit items-center justify-center gap-2"
              color={bedType.color}
            >
              <BedTypeIcon size={14} />
              {bedType.label}
            </CustomTag>
          ) : null}

          {base === "residence" && data.roomType ? (
            <CustomTag
              className="flex w-fit items-center justify-center gap-2"
              color="default"
            >
              {data.roomType}
            </CustomTag>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-start gap-1 text-xs">
          {locationParts.map((part, index) => (
            <span
              key={`${part.text}-${index}`}
              className={part.type === "label" ? "text-neutral-7" : "text-neutral-9"}
            >
              {part.text}
            </span>
          ))}
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-neutral-8 text-xs">هزینه اقامتی</span>
            <span className="text-neutral-13 text-sm font-medium">
              {dataPlaceHolder({
                data: data.accommodationAmount,
                isPrice: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {hasDeposit ? (
              <>
                <span className="text-neutral-8 text-xs">ودیعه</span>
                <span className="text-neutral-13 text-sm font-medium">
                  {dataPlaceHolder({
                    data: data.depositAmount,
                    isPrice: true,
                    currency: { isAvailable: true, type: "تومان" },
                  })}
                </span>
              </>
            ) : (
              <span className="text-neutral-8 text-xs">ودیعه ندارد</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectNewResidenceInfoCard;
