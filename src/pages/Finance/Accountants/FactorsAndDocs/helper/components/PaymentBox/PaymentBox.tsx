import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";

const PaymentBox = ({
  title,
  amount,
  percentage,
  hasPercentage,
  hasTag,
  hasUnit = true,
}: {
  title: string;
  amount: number | string;
  percentage?: number | string;
  hasPercentage?: boolean;
  hasTag?: boolean;
  hasUnit?: boolean;
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
    <div className="border-$neutral-2 flex h-36 flex-col gap-2 rounded-2xl border p-6">
      <div className="title-wrapper">
        <p className="title">{title}</p>
      </div>
      <p className="amount text-xl font-bold">
        {normalizedAmount === null || normalizedAmount === undefined
          ? "--"
          : dataPlaceHolder({
              data: normalizedAmount,
              isPrice: hasUnit ? true : false,
              isRial: true,
            })}{" "}
        {hasUnit ? <span>تومان</span> : null}
      </p>
      <div className="w-fit">
        {normalizedPercentage !== undefined && hasTag && (
          <CustomTag className="custom-tag">
            {hasPercentage ? `${normalizedPercentage} %` : `${normalizedPercentage}`}
          </CustomTag>
        )}
      </div>
    </div>
  );
};
export default PaymentBox;
