import { Col, Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { IdentitiesEducationalInfoProps } from "./@types/@identitiesEducationalInfo";

const IdentitiesEducationalInfo = ({ form }: IdentitiesEducationalInfoProps) => {
  return (
    <div>
      <CustomDivider text={"اطلاعات تحصیلی"} />
      <Form form={form}>
        <Row gutter={[12, 12]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="grade"
              label="مقطع تحصیلی"
              placeholder="انتخاب کنید"
              options={[]}
              form={form}
              //   isLoading={}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="field"
              label="رشته تحصیلی"
              placeholder="انتخاب کنید"
              options={[]}
              form={form}
              //   isLoading={}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default IdentitiesEducationalInfo;
