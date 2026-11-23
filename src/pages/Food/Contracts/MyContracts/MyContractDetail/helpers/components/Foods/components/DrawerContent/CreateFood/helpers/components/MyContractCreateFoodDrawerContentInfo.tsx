import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  CUSTOM_INPUT_NUMBER_MAX_RULE,
  CUSTOM_INPUT_NUMBER_MIN_RULE,
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

const MyContractCreateFoodDrawerContentInfo = ({ title }: { title: string }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="عنوان"
          name="foodName"
          placeholder="عنوان"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        md={12}
        sm={24}
        label="قرارداد"
        value={title}
      />

      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInputNumber
          type="text"
          label="قیمت دانشجویی (ریال)"
          name="studentPrice"
          placeholder="قیمت دانشجویی (ریال)"
          isPrice={true}
          dependencies={["maxPrice", "minPrice"]}
          rules={[
            REQUIRED_RULE,
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "studentPrice", 9),
            }),
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "studentPrice", 4),
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (+getFieldValue("minPrice") > +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید بیشتر از قیمت حداقل باشد.")
                  );
                }
                if (+getFieldValue("maxPrice") < +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید کمتر از قیمت حداکثر باشد.")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInputNumber
          type="text"
          label="قیمت حداقل (ریال)"
          name="minPrice"
          placeholder="قیمت حداقل (ریال)"
          isPrice={true}
          dependencies={["maxPrice", "studentPrice"]}
          rules={[
            REQUIRED_RULE,
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "minPrice", 9),
            }),
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "minPrice", 4),
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (+getFieldValue("studentPrice") < +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید کمتر از قیمت دانشجویی باشد.")
                  );
                }
                if (+getFieldValue("maxPrice") < +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید کمتر از قیمت حداکثر باشد.")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInputNumber
          type="text"
          label="قیمت حداکثر (ریال)"
          name="maxPrice"
          placeholder="قیمت حداکثر (ریال)"
          isPrice={true}
          dependencies={["studentPrice", "minPrice"]}
          rules={[
            REQUIRED_RULE,
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "maxPrice", 9),
            }),
            ({ getFieldValue }) => ({
              validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "maxPrice", 4),
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (+getFieldValue("minPrice") > +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید بیشتر از قیمت حداقل باشد.")
                  );
                }
                if (+getFieldValue("studentPrice") > +value) {
                  return Promise.reject(
                    new Error(" عدد وارد شده باید بیشتر از قیمت دانشجویی باشد.")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="توضیحات"
          name="description"
          placeholder="توضیحات"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={500}
        />
      </Col>
    </Row>
  );
};

export default MyContractCreateFoodDrawerContentInfo;
