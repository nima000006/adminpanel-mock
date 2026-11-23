import { Col, Form, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { CallInfoSectionProps } from "../../@types/@createBranchStepTypes";

const CallInfoSection = ({ form }: CallInfoSectionProps) => {
  return (
    <Form form={form}>
      <CustomDivider text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره همراه"
            name="mobile"
            placeholder="09 00 000 000"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="ایمیل"
            name="email"
            placeholder="به عنوان مثال Samim@samim.net"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن"
            name="branchPhone"
            placeholder="021 000 0000"
            tooltip={{ icon: <span>(اختیاری)</span> }}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default CallInfoSection;
