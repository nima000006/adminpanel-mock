import { AiOutlineEye } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import { useTheme } from "@infra/context/ThemeContext";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CountsDetailCardProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/@types/@countsDetailCard";

import patternImage from "../../../../../../../../assets/images/dormitory/pattern.svg";

const CountsDetailCard = ({
  value,
  title,
  isClickable,
  clickHandler,
  img,
  hasImg,
  isPrice = true,
  isRial,
  currency,
}: CountsDetailCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const formattedValue = dataPlaceHolder({ data: value, isPrice, isRial, currency });

  return (
    <div
      className="border-neutral-3 bg-neutral-1 body-regular gap-2 rounded-lg border p-6"
      style={{
        backgroundImage: `url("${isDark ? "" : patternImage}")`,
      }}
    >
      {isClickable ? (
        <CustomButton
          color="blue"
          type="link"
          icon={<AiOutlineEye />}
          iconPlacement="start"
          className="flex-1 cursor-pointer self-start p-0!"
          onClick={clickHandler}
        >
          تخت
        </CustomButton>
      ) : hasImg ? (
        <div className="flex items-center gap-2">
          <img src={img} alt="" className="h-16 w-16 shrink-0 object-contain" />
          <div>
            <div className="text-neutral-9">{title}</div>
            <div className="text-xl font-medium">{formattedValue}</div>
          </div>
        </div>
      ) : (
        <div className="text-neutral-9">{title}</div>
      )}
      {!hasImg ? <div className="text-xl font-medium">{formattedValue}</div> : null}
    </div>
  );
};
export default CountsDetailCard;
