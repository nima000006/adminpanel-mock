import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormBedInfoProps } from "./@types/@dormBedInfo";

const DormBedInfo = ({ bedId, title }: DormBedInfoProps) => {
  return (
    <div className="bed-info-container">
      <CustomDivider text={title} />
      <Row gutter={[16, 24]}>
        <Col lg={6} md={8} xs={12} sm={24}>
          <CustomInput
            label="عنوان تخت"
            name={bedId === 1 ? "bottBedTitle" : "topBedTitle"}
            placeholder="عنوان تخت"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} xs={12} sm={24}>
          <CustomInput
            label="شماره تخت"
            name={bedId === 1 ? "bottBedNumber" : "topBedNumber"}
            placeholder="شماره تخت"
            rules={[REQUIRED_RULE, NUMBER_RULE]}
          />
        </Col>
        <Col lg={6} md={8} xs={12} sm={24}>
          <CustomInput
            label="شماره اموال"
            name={bedId === 1 ? "bottPropertyNumber" : "topPropertyNumber"}
            placeholder="شماره اموال"
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات تخت"
            name={bedId === 1 ? "bottDescription" : "topDescription"}
            placeholder="توضیحات تخت"
            maxLength={100}
            showCount
          />
        </Col>
      </Row>
    </div>
  );
};

export default DormBedInfo;
