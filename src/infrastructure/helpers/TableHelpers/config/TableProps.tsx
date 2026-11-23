import { DirectionType } from "antd/es/config-provider";
import { SizeType } from "antd/es/config-provider/SizeContext";

type tableProps = {
  bordered: boolean;
  size: SizeType;
  direction: DirectionType | undefined;
  scroll: { y?: number; x?: number | string };
  showSorterTooltip: boolean;
};

const TABLE_PROPS: (count: number) => tableProps = (count) => {
  return {
    bordered: true,
    size: "small",
    direction: "rtl",
    scroll: { y: count ? 392 : undefined, x: "max-content" },
    showSorterTooltip: true,
  };
};

export default TABLE_PROPS;
