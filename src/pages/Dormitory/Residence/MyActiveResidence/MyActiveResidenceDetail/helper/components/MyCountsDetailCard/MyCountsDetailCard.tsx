import { AiOutlineEye } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import { dataPlaceHolder } from "@infra/helpers/utils";

import patternImage from "../../../../../../../../assets/images/dormitory/pattern.svg";

const MyCountsDetailCard = ({
  value,
  title,
  isClickable,
  clickHandler,
  img,
  hasImg,
}: {
  value: string;
  title?: string;
  isClickable?: boolean;
  clickHandler?: () => void;
  img?: string;
  hasImg?: boolean;
}) => {
  return (
    <div
      className="border-neutral-3 body-regular gap-2 rounded-lg border p-6"
      style={{
        backgroundImage: `url("${patternImage}")`,
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
            <div className="text-xl font-medium">
              {dataPlaceHolder({ data: value, isPrice: true })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-neutral-9">{title}</div>
      )}
      {!hasImg ? (
        <div className="text-xl font-medium">
          {dataPlaceHolder({ data: value, isPrice: true })}
        </div>
      ) : null}
    </div>
  );
};
export default MyCountsDetailCard;
