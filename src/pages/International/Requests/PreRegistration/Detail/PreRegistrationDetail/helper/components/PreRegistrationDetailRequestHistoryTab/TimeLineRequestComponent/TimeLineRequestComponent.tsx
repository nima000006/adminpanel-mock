import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { TimeLineRequestComponentProps } from "./@types/@timeLineRequestComponentType";
import "./_timeLineRequestComponent.scss";
const TimeLineRequestComponent = ({
  role,
  color,
  text,
}: TimeLineRequestComponentProps) => {
  return (
    <div className="step-item-description-container color-[$neutral-8] text-sm">
      <div>
        <span> {role}: </span>
        <span>{"data?.requested"}</span>
      </div>
      <div>
        <span>تاریخ: </span>
        <span>
          {dataPlaceHolder({
            data: "2025/08/12",
            isDate: true,
            customDateFormat: "YYYY/MM/DD",
          })}
        </span>
      </div>
      <div>
        <span>زمان: </span>
        <span>
          {dataPlaceHolder({
            data: "data?.requestDate",
            isDate: true,
            customDateFormat: "HH:mm",
          })}
        </span>
      </div>

      <CustomTag className="w-fit" color={color}>
        {text}
      </CustomTag>
    </div>
  );
};
export default TimeLineRequestComponent;
