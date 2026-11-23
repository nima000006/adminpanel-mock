import { Switch } from "antd";

import { PADDING_32 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import "./_roomAssignToGroups.scss";

const RoomAssignToGroups = () => {
  return (
    <CustomCard padding={PADDING_32} className="room-assign-to-group-capsule">
      <div className="label-section">
        <div className="label">تخصیص به گروه‌های کاربری</div>
        <div>
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
        </div>
      </div>
      <CustomCheckboxGroup
        checkboxClassName="check-box"
        containerClassName="check-box-container"
        options={[
          { label: "دانشجویان", value: "students" },
          { label: "خانواده‌ها", value: "families" },
          { label: "کارمندان", value: "staff" },
        ]}
      />
    </CustomCard>
  );
};

export default RoomAssignToGroups;
