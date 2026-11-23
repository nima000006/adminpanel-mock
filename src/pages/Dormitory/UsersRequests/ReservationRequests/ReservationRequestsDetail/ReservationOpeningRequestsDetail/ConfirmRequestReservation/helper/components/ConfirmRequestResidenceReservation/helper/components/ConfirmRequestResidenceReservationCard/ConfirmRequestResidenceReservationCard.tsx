import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomRadioGroup } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { getConfirmRequestResidenceLocationParts } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/helper/util/confirmRequestResidenceReservationCardUtil";

const ConfirmRequestResidenceReservationCard = ({
  residence,
  selected,
  onSelect,
}: any) => {
  const locationParts = getConfirmRequestResidenceLocationParts(residence);
  const showDeposit = residence.depositAmount !== undefined;

  const cardClassName = selected
    ? "border-primary-7 bg-primary-1 border"
    : "bg-neutral-2 hover:bg-primary-1 border border-transparent";

  //* ================================ Util Functions ================================
  // handler
  const selectHandler = () => {
    onSelect(residence.id);
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
          value={selected ? residence.id : undefined}
          onChange={(event) => onSelect(event.target.value)}
          options={[{ value: residence.id, label: null }]}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <RoomIcon size="20" />

            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="text-neutral-11 text-sm">{residence.roomTitle}</p>

              <p className="text-neutral-8 text-xs">{residence.floorTitle}</p>
            </div>

            <CustomTag
              className="flex w-fit items-center justify-center gap-2"
              color="default"
            >
              {residence.roomType}
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
                    data: residence.depositAmount?.toString(),
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
                  data: residence.accommodationAmount.toString(),
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

export default ConfirmRequestResidenceReservationCard;
