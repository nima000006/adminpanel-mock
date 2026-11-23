import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_branchBalancedAmountCard.scss";
const BranchBalanceAmountCard = ({
  title,
  amount,
  percentage,
  color,
  hasPercentage,
  hasTag,
}: {
  title: string;
  amount: number | string;
  percentage?: number | string;
  color?: string;
  hasPercentage?: boolean;
  hasTag?: boolean;
}) => {
  // Convert emptyString to null so dataPlaceHolder can properly handle it
  const normalizedAmount =
    amount === emptyString || amount === null || amount === undefined
      ? null
      : amount?.toString();
  const normalizedPercentage =
    percentage === emptyString || percentage === null || percentage === undefined
      ? "--"
      : percentage;
  return (
    <div className="my-branch-turn-over-balance-amount-card flex h-full">
      <div className="title-wrapper">
        <p className="title">{title}</p>
        {normalizedPercentage !== undefined && hasTag && (
          <CustomTag className="custom-tag" color={color}>
            {hasPercentage ? `${normalizedPercentage} %` : `${normalizedPercentage}`}
          </CustomTag>
        )}
      </div>
      <p className="amount text-xl font-bold">
        {normalizedAmount === null || normalizedAmount === undefined
          ? "--"
          : dataPlaceHolder({ data: normalizedAmount, isPrice: true })}{" "}
        <span>تومان</span>
      </p>
    </div>
  );
};
export default BranchBalanceAmountCard;
