import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InsuredContactInfoProps } from "./@types/@insuredContactInfo";

const InsuredContactInfo = ({
  mobile,
  postalCode,
  province,
  city,
  address,
}: InsuredContactInfoProps) => {
  return (
    <div className="insured-contact-info-container">
      <CustomDivider text="اطلاعات تماس بیمه‌شده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol md={12} sm={24} label="شماره موبایل" value={mobile} />

        <SingleVerticalWithCol md={12} sm={24} label="کد پستی" value={postalCode} />

        <SingleVerticalWithCol md={12} sm={24} label="استان" value={province} />

        <SingleVerticalWithCol md={12} sm={24} label="شهر" value={city} />

        <SingleVerticalWithCol span={24} label="آدرس" value={address} />
      </Row>
    </div>
  );
};

export default InsuredContactInfo;
