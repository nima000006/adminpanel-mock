import { PADDING_40 } from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import CustomInput from "../../CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../CustomInputs/CustomTextArea/CustomTextArea";
import "./_basicInfo.scss";

type BasicInfoProps = {
  title: string;
};

const BasicInfo = ({ title }: BasicInfoProps) => {
  return (
    <CustomCard className="base-info-container" padding={PADDING_40}>
      <div className="base-info-label">{title}</div>
      <div className="base-info-top-section">
        <CustomInput type="text" label="نام" name="dormName" placeholder="نام خوابگاه" />
        <CustomInput
          type="text"
          label="تلفن"
          name="phone"
          placeholder="مثلا 55223366 - 021"
        />

        <CustomInput type="text" label="کد پستی " name="userName" placeholder="10 رقمی" />
      </div>
      <div className="base-info-bottom-section">
        <CustomTextArea
          label="آدرس"
          dir="rtl"
          name="address"
          placeholder="آدرس"
          hasVerticalLabel={false}
        />
      </div>
    </CustomCard>
  );
};

export default BasicInfo;
