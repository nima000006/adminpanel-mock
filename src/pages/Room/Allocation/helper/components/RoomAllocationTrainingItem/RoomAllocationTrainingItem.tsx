import { Switch, Tag } from "antd";

import CustomSelectField from "@components/CustomInputs/CustomSelectField/CustomSelectField";
import "./_roomAllocationTrainingItem.scss";

const qualityGradeOptions = [
  {
    value: "وابسته",
    label: "وابسته",
  },
];

const RoomAllocationTrainingItem = ({ title }: { title: string }) => {
  return (
    <div className="room-allocation-training-item">
      <h3 className="training-item-title">{title}</h3>
      <div>
        <Switch
          checkedChildren="مستقل"
          unCheckedChildren="وابسته"
          defaultChecked={true}
          className="switch"
        />
      </div>
      <div className="select-field-container">
        <CustomSelectField placeholder="انتخاب کنید" options={qualityGradeOptions} />
      </div>
      <div className="tags-container">
        <Tag closeIcon className="allocation-tag">
          اسلامشهر
        </Tag>
        <Tag closeIcon className="allocation-tag">
          تهران جنوب
        </Tag>
        <Tag closeIcon className="allocation-tag">
          اسلامشهر
        </Tag>
        <Tag closeIcon className="allocation-tag">
          تهران جنوب
        </Tag>
      </div>
    </div>
  );
};

export default RoomAllocationTrainingItem;
