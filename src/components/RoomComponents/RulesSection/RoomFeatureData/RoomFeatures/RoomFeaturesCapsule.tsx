import { Form, Switch } from "antd";

import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_32 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomSelectField from "../../../../CustomInputs/CustomSelectField/CustomSelectField";
import "./_roomFeaturesCapsule.scss";

const RoomFeaturesCapsule = () => {
  return (
    <CustomCard padding={PADDING_32} className="room-features-capsule">
      <div className="label-container">
        <div className="label">ویژگی‌ها</div>
        <Switch
          disabled
          checkedChildren={<span className="switch-text">فعال</span>}
          unCheckedChildren={<span className="switch-text">غیرفعال</span>}
        />
      </div>
      <div className="inputs-container">
        <Form.Item name="management-type" rules={[REQUIRED_RULE]}>
          <CustomSelectField
            label="نوع مدیریت"
            placeholder="انتخاب کنید"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            name="management-type"
          />
        </Form.Item>
        <Form.Item name="confirmation-of-reservation" rules={[REQUIRED_RULE]}>
          <CustomSelectField
            label="قطعیت رزرو"
            placeholder="انتخاب کنید"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            name="confirmation-of-reservation"
          />
        </Form.Item>
        <Form.Item name="quality-grade" rules={[REQUIRED_RULE]}>
          <CustomSelectField
            label="درجه کیفی"
            placeholder="انتخاب کنید"
            name="quality-grade"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
          />
        </Form.Item>
        <Form.Item name="gender" rules={[REQUIRED_RULE]}>
          <CustomSelectField
            label="جنسیت"
            placeholder="انتخاب کنید"
            name="gender"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
          />
        </Form.Item>
        <Form.Item name="reservation-period" className="check-box-group-wrapper">
          <CustomCheckboxGroup
            containerClassName=""
            checkboxClassName="radio-btns"
            label="مدت رزرو"
            options={[
              { label: "روزانه", value: "dailt" },
              { label: "ماهانه", value: "monthly" },
              { label: "ترمیک", value: "termic" },
            ]}
            name="reservation-period"
          />
        </Form.Item>
      </div>
    </CustomCard>
  );
};

export default RoomFeaturesCapsule;
