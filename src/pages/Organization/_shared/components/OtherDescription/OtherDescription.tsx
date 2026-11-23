import { Col, Form, FormInstance, Row } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";

const OtherDescription = ({ form }: { form: FormInstance<any> }) => {
  return (
    <Form form={form}>
      <CustomDivider text={"سایر توضیحات"} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات"
            name="description"
            showCount
            maxLength={1024}
            tooltip={{ icon: <span>(اختیاری)</span> }}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default OtherDescription;
