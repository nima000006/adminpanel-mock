import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const CallInfoSection = () => {
  return (
    <div>
      <CustomDivider text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره همراه" value={"0912 245 5910"} />
        <SingleVerticalWithCol label="ایمیل" value={"mohamadkhiali@gmail.com"} />
        <SingleVerticalWithCol label="شماره تلفن محل فعالیت" value={"021 2240416"} />
      </Row>
    </div>
  );
};

export default CallInfoSection;
