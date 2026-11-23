import { CustomRadioGroup } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import {
  CONFIRM_REQUEST_BED_IMAGE_MAP,
  getConfirmRequestBedLocationParts,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBedReservation/helper/util/confirmRequestBedReservationUtil";

const ConfirmRequestBedReservationCard = ({ bed, selected, onSelect }: any) => {
  const bedType = BED_TYPE[bed.bedType as keyof typeof BED_TYPE];
  const BedTypeIcon = bedType.icon;
  const locationParts = getConfirmRequestBedLocationParts(bed);
  const showDeposit = bed.depositAmount !== undefined;

  const cardClassName = selected
    ? "border-primary-7 bg-primary-1 border"
    : "bg-neutral-2 hover:bg-primary-1 border border-transparent";

  //* ================================ Util Functions ================================
  // handler
  const selectHandler = () => {
    onSelect(bed.id);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
  return (
    <div
      onClick={selectHandler}

      className={`flex w-full cursor-pointer rounded-lg p-3 transition-colors ${cardClassName}`}
    >
      <div className="flex w-full gap-2.5">
        <CustomRadioGroup
          noStyle
          value={selected ? bed.id : undefined}
          onChange={(event) => onSelect(event.target.value)}
          options={[{ value: bed.id, label: null }]}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <img
              src={
                CONFIRM_REQUEST_BED_IMAGE_MAP[
                  bed.bedType as keyof typeof CONFIRM_REQUEST_BED_IMAGE_MAP
                ]
              }
              alt={bedType.label}
              className="size-[38px] shrink-0 object-contain"
            />

            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="text-neutral-11 text-sm">{bed.bedTitle}</p>
              {bed.bedPosition ? (
                <p className="text-neutral-8 text-xs">{bed.bedPosition}</p>
              ) : null}
            </div>

            <CustomTag
              className="flex w-fit items-center justify-center gap-2"
              color={bedType.color}
            >
              <BedTypeIcon size={14} />
              {bedType.label}
            </CustomTag>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-1 text-xs">
            {locationParts.map((part: any, index: number) => (
              <span
                key={`${part.text}-${index}`}
                className={part.type === "label" ? "text-neutral-7" : "text-neutral-9"}
              >
                {part.text}
              </span>
            ))}
          </div>

          <div className="border-neutral-5 w-full border-t border-dashed" />

          <div className="flex w-full flex-col gap-1">
            {showDeposit ? (
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-neutral-8 text-xs">ودیعه</span>
                <span>
                  {dataPlaceHolder({
                    data: bed.depositAmount?.toString(),
                    isPrice: true,
                    currency: { isAvailable: true, type: "تومان" },
                  })}
                </span>
              </div>
            ) : null}

            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-neutral-8 text-xs">هزینه اقامتی</span>
              <span>
                {dataPlaceHolder({
                  data: bed.accommodationAmount.toString(),
                  isPrice: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRequestBedReservationCard;
