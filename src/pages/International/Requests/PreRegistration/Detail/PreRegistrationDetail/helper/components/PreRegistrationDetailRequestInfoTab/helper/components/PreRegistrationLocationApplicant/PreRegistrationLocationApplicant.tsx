import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const PreRegistrationLocationApplicant = () => {
  return (
    <div>
      <CustomDivider text="موقعیت مکانی فعلی متقاضی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="کشور محل اقامت" value={"data"} />
        <SingleVerticalWithCol label="شهر محل اقامت" value={"data"} />
        <SingleVerticalWithCol label="کد پستی" value={"data"} />
      </Row>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol span={24} label="آدرس محل اقامت" value={"data"} />
      </Row>
    </div>
  );
};
export default PreRegistrationLocationApplicant;
