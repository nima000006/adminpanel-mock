import { TimePicker } from "antd";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";

import { TimeRangePickerComponentProps } from "./@types/@timeRangePickerComponentType";
import "./_timeRangePickerComponent.scss";
const TimeRangePickerComponent = ({
  id,
  day,
  startTime,
  endTime,
}: TimeRangePickerComponentProps) => {
  const format = "HH:mm:ss";
  return (
    <div className="time-range-picker-container">
      <span>{day}</span>
      <TimePicker.RangePicker
        defaultValue={[startTime, endTime]}
        format={format}
        disabled={id === 7 || id === 8}
      />
      <CustomCheckboxGroup
        name={`checkBox${id}`}
        options={[{ label: "امکان برداشت از کیف پول وجود ندارد", value: "1" }]}
      />
    </div>
  );
};
export default TimeRangePickerComponent;
