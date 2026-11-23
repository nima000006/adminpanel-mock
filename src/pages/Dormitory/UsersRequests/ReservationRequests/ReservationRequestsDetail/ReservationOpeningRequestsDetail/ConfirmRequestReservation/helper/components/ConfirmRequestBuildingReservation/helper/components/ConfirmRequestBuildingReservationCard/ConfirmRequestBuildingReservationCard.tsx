import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import { CustomRadioGroup } from "@components/CustomInputs";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { getConfirmRequestBuildingLocationParts } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBuildingReservation/helper/util/confirmRequestResidenceReservationCardUtil";

const ConfirmRequestBuildingReservationCard = ({ building, selected, onSelect }: any) => {
  const locationParts = getConfirmRequestBuildingLocationParts(building);
  const showDeposit = building.depositAmount !== undefined;

  const cardClassName = selected
    ? "border-primary-7 bg-primary-1 border"
    : "bg-neutral-2 hover:bg-primary-1 border border-transparent";

  //* ================================ Util Functions ================================
  // handler
  const selectHandler = () => {
    onSelect(building.id);
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
          value={selected ? building.id : undefined}
          onChange={(event) => onSelect(event.target.value)}
          options={[{ value: building.id, label: null }]}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <BuildingIcon size="20" />

            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="text-neutral-11 text-sm">{building.buildingTitle}</p>

              <p className="text-neutral-8 text-xs">{building.capacity}</p>
            </div>
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
                    data: building.depositAmount?.toString(),
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
                  data: building.accommodationAmount.toString(),
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

export default ConfirmRequestBuildingReservationCard;
