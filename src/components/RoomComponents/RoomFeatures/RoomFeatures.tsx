import { PADDING_40 } from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import CustomSelectField from "../../CustomInputs/CustomSelectField/CustomSelectField";
import CustomTextArea from "../../CustomInputs/CustomTextArea/CustomTextArea";
import "./_roomFeatures.scss";

const RoomFeatures = () => {
  return (
    <CustomCard className="dorm-info-container" padding={PADDING_40}>
      <div className="dorm-info-label">توضیحات</div>
      <div className="dorm-info-top-section">
        <CustomSelectField
          label="امکانات"
          placeholder="انتخاب کنید"
          //   handleChange={capacityHandler}
          options={[]}
        />
        <CustomSelectField
          label="امکانات اطراف"
          placeholder="انتخاب کنید"
          //   handleChange={capacityHandler}
          options={[]}
        />
      </div>
      <div className="dorm-info-bottom-section">
        <CustomTextArea
          label="درباره"
          dir="rtl"
          name="about"
          placeholder="درباره"
          hasVerticalLabel={false}
        />
        <CustomTextArea
          label="قوانین و مقررات"
          dir="rtl"
          name="rules"
          placeholder="قوانین و مقررات"
          hasVerticalLabel={false}
        />
      </div>
    </CustomCard>
  );
};

export default RoomFeatures;
