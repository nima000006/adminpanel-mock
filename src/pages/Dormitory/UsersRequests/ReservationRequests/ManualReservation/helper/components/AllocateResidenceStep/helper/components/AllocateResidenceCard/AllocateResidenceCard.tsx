import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import secondFloorBed from "@assets/images/dormitory/secondFloorBed.svg";
import threeFloorBed from "@assets/images/dormitory/threeFloorBed.svg";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

import { AllocateResidenceCardProps } from "../../../@types/@allocateResidenceStep";

const BED_TIER_ICON = {
  secondFloor: {
    src: secondFloorBed,
    bedType: BED_TYPE.TWO_STORY,
  },
  threeFloor: {
    src: threeFloorBed,
    bedType: BED_TYPE.THREE_STORY,
  },
} as const;

const AllocateResidenceCard = ({ item, allocationType }: AllocateResidenceCardProps) => {
  const bedTierConfig = item.bedTier ? BED_TIER_ICON[item.bedTier] : undefined;
  const BedTierIcon = bedTierConfig?.bedType.icon;

  //* ================================ Util Functions ================================

  const renderCardIcon = () => {
    if (allocationType === "bed" && bedTierConfig) {
      return <img src={bedTierConfig.src} alt="" className="size-9.5 object-contain" />;
    }

    if (allocationType === "building") {
      return <BuildingIcon size="38" fillColor="#8C8C8C" />;
    }

    return <RoomIcon size="38" fillColor="#8C8C8C" />;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="allocate-residence-card flex w-full flex-col gap-2">
      {/* flex-row-reverse restores Figma LTR header order inside RTL: Tag left, Icon right */}
      <div className="flex min-h-6 w-full flex-row-reverse items-start gap-2">
        <CustomTag
          color={item.tagColor ?? "default"}
          className="inline-flex shrink-0 items-center gap-1"
        >
          {dataPlaceHolder({ data: item.tagLabel })}
          {BedTierIcon ? <BedTierIcon size={14} /> : null}
        </CustomTag>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-neutral-11 body-regular m-0">
            {dataPlaceHolder({ data: item.title })}
          </p>
          {item.subtitle ? (
            <p className="text-neutral-8 footnote m-0">
              {dataPlaceHolder({ data: item.subtitle })}
            </p>
          ) : null}
        </div>

        <div className="flex size-9.5 shrink-0 items-center justify-center overflow-hidden">
          {renderCardIcon()}
        </div>
      </div>

      <div className="footnote flex w-full flex-wrap items-center gap-1 whitespace-nowrap">
        {item.metaItems.map((meta) => (
          <span
            key={`${item.id}-meta-${meta.label}`}
            className="inline-flex items-center gap-1"
          >
            <span className="text-neutral-9">
              {dataPlaceHolder({ data: meta.value })}
            </span>
            {meta.label ? (
              <span className="text-neutral-7">
                {dataPlaceHolder({ data: meta.label })}
              </span>
            ) : null}
          </span>
        ))}
      </div>

      <div className="border-neutral-5 w-full border-t border-dashed" />

      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="footnote text-neutral-7 m-0 min-w-14.5 text-end">ودیعه</p>
          <p className="body-regular text-neutral-12 m-0">
            {dataPlaceHolder({
              data: item.deposit,
              isPrice: true,
              currency: { isAvailable: true, type: "تومان" },
            })}
          </p>
        </div>

        {item.residenceFee > 0 ? (
          <div className="flex w-full items-center justify-between gap-2">
            <p className="footnote text-neutral-7 m-0 min-w-14.5 text-end">
              هزینه اقامتی
            </p>
            <p className="body-regular text-neutral-12 m-0">
              {dataPlaceHolder({
                data: item.residenceFee,
                isPrice: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AllocateResidenceCard;
