import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FinanceBusinessOwnerCardProps } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/_shared/helper/components/FinanceBusinessOwnerCard/@types/@financeBusinessOwnerCard";

const FinanceBusinessOwnerCard = ({
  rightIcon,
  leftIcon,
  title,
  description,
  footerTagIcon,
  footerTagColor,
  footerTagText,
}: FinanceBusinessOwnerCardProps) => {
  return (
    <CustomCard className="[&>div]:flex [&>div]:flex-col [&>div]:gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {rightIcon && (
            <span className="bg-neutral-3 flex h-7 w-7 items-center justify-center rounded-md">
              {rightIcon}
            </span>
          )}
          {title && <p className="m-0! flex items-center justify-center">{title}</p>}
        </div>
        {leftIcon && leftIcon}
      </div>
      {description && <h3 className="text-xl font-black">{description}</h3>}
      {footerTagText && (
        <div>
          <CustomTag className="w-fit" icon={footerTagIcon} color={footerTagColor}>
            {footerTagText}
          </CustomTag>
        </div>
      )}
    </CustomCard>
  );
};

export default FinanceBusinessOwnerCard;
