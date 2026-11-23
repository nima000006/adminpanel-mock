import { Form, Switch } from "antd";

import { PADDING_32 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelectField from "../../../../CustomInputs/CustomSelectField/CustomSelectField";
import "./_roomAssignEducationalParams.scss";

const RoomAssignEducationalParams = () => {
  return (
    <CustomCard padding={PADDING_32} className="room-assign-edu-capsule">
      <div className="label-section">
        <div className="label">تخصیص پارامترهای آموزش</div>
        <div>
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" disabled={true} />
        </div>
      </div>
      <div className="selects-container">
        <Form.Item name="university" valuePropName="name" /*rules={[REQUIRED_RULE]}*/>
          <CustomSelectField
            label="دانشگاه"
            options={[]}
            placeholder="انتخاب کنید"
            hasSwitch={true}
            name="university"
            disabled={true}
            disabledSwitch={true}
          />
        </Form.Item>
        <Form.Item name="degree" valuePropName="name" /*rules={[REQUIRED_RULE]}*/>
          <CustomSelectField
            label="مقطع"
            options={[]}
            placeholder="انتخاب کنید"
            hasSwitch={true}
            name="degree"
            disabled={true}
            disabledSwitch={true}
          />
        </Form.Item>

        <CustomSelectField
          label="سال ورود"
          options={[]}
          placeholder="انتخاب کنید"
          hasSwitch={true}
          disabled={true}
          disabledSwitch={true}
        />
        <CustomSelectField
          label="رشته"
          options={[]}
          placeholder="انتخاب کنید"
          hasSwitch={true}
          disabled={true}
          disabledSwitch={true}
        />
        <CustomSelectField
          label="دین"
          options={[]}
          placeholder="انتخاب کنید"
          hasSwitch={true}
          disabled={true}
          disabledSwitch={true}
        />
        <CustomSelectField
          label="مذهب"
          options={[]}
          placeholder="انتخاب کنید"
          hasSwitch={true}
          disabled={true}
          disabledSwitch={true}
        />
      </div>
    </CustomCard>
  );
};

export default RoomAssignEducationalParams;
