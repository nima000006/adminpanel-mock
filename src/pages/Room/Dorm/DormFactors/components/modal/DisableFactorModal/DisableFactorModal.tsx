import { Col, Row } from "antd";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";

import InfoContent from "../../InfoContent/InfoContent";
import { DisableFactorModalContentProps } from "../UpdateFactorModalContent/@types/@updateFactorModalContent";
import "./_disableFactorModal.scss";

const DisableFactorModal = ({ info }: DisableFactorModalContentProps) => {
  return (
    <div className="disable-modal-content-container">
      <InfoContent info={info} />
      <CustomCard>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات"
              maxLength={499}
            />
          </Col>
          <Col span={24} className="checkbox-cancelled">
            <CustomCheckboxGroup
              label="وضعیت عودت"
              name="isCancelled"
              options={[{ label: "عودت داده شده", value: true }]}
            />
          </Col>
        </Row>
      </CustomCard>
    </div>
  );
};

export default DisableFactorModal;
