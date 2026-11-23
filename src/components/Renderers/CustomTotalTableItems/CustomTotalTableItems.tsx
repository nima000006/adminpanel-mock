import AnimatedCountUp from "@components/Renderers/AnimatedCountUp/AnimatedCountUp";

import { CustomTotalTableItemsProps } from "./@types/@customTotalTableItem";
import "./_customTotalTableItem.scss";

const CustomTotalTableItems = ({
  totalCount,
  label = "تعداد کل",
  separator = "",
  countUpClassName,
  formattingFn,
  className,
}: CustomTotalTableItemsProps) => {
  return (
    <div className={`custom-total-table-items-container ${className ? className : ""}`}>
      <span className="custom-total-table-items-label">{label}</span>
      <span className="custom-total-table-items-count">
        <AnimatedCountUp
          end={totalCount}
          separator={separator}
          className={countUpClassName}
          formattingFn={formattingFn}
        />
      </span>
    </div>
  );
};

export default CustomTotalTableItems;
{
  /* <CountUp end={parseFloat(value as string)} separator="" /> */
}
