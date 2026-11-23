import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { ContractsTemplateStakeholderCardProps } from "./@types/@contractsTemplateStakeholderCardProps";

const ContractsTemplateStakeholderCard = ({
  title,
  tagText,
  tagColor,
  beneficiaryCount,
  isActive = false,
  onClick,
}: ContractsTemplateStakeholderCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`body-regular cursor-pointer rounded-3xl border p-4! transition-all ${
        isActive ? "border-primary-5" : "bg-neutral-2 border-neutral-4"
      }`}
      style={
        isActive
          ? {
              backgroundColor: "rgba(24, 144, 255, 0.1)", // primary-6 with 10% opacity
            }
          : undefined
      }
    >
      <h3
        className={`text-lg ${
          isActive ? "text-primary-8 font-semibold" : "text-neutral-9"
        }`}
      >
        {dataPlaceHolder({ data: title })}
      </h3>
      <div className="flex justify-end">
        <CustomTag className="w-fit" color={tagColor}>
          {dataPlaceHolder({ data: tagText })}
        </CustomTag>
      </div>
      <h1 className={`mt-2! text-xl ${isActive ? "text-primary-9" : "text-neutral-13"}`}>
        {dataPlaceHolder({ data: beneficiaryCount })} ذینفع
      </h1>
    </div>
  );
};

export default ContractsTemplateStakeholderCard;
