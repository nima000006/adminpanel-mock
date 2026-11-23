import CustomCard from "@components/CustomCard/CustomCard";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

const AmountBox = ({
  title,
  price,
  tagDetail,
  hasTag,
  hasPercentage,
  color,
  percentage,
  hasUnit = true,
}: {
  title: string;
  price: number;
  tagDetail?: string;
  hasTag?: boolean;
  hasPercentage?: boolean;
  color?: string;
  percentage?: string;
  hasUnit?: boolean;
}) => {
  return (
    <CustomCard className="flex flex-col gap-2" padding={PADDING_24}>
      <div className="flex gap-2">
        <span>{title}</span>
        {hasTag && (
          <CustomTag className="custom-tag" color={color}>
            {tagDetail}
          </CustomTag>
        )}
      </div>

      <p className="text-xl font-medium">
        {dataPlaceHolder({
          data: price,
          ...(hasUnit && {
            isRial: true,
          }),
          isPrice: true,
          ...(hasUnit && {
            currency: {
              isAvailable: true,
              type: "تومان",
            },
          }),
        })}
      </p>

      {hasPercentage && (
        <CustomTag className="w-fit" color="default">
          {`${percentage} %`}
        </CustomTag>
      )}
    </CustomCard>
  );
};

export default AmountBox;
