import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { FoodMySelfDetailsDrawerInfoContactProps } from "./@types/FoodMySelfDetailsDrawerInfoContactProps";

const FoodMySelfDetailsDrawerInfoContact: React.FC<
  FoodMySelfDetailsDrawerInfoContactProps
> = ({
  form,
  getProvinceListData,
  getProvinceListLoading,
  getCityListHandler,
  cityList,
  getCityListLoading,
}) => {
  //* ================================ Util Functions ===============================

  const onProvinceChangeHandler = (event: unknown) => {
    getCityListHandler(event as string);
    form.setFieldsValue({
      city: {
        key: undefined,
        value: undefined,
        title: undefined,
        code: undefined,
        item: { id: undefined, title: undefined },
      },
    });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="استان"
          name="province"
          options={getProvinceListData?.data ? getProvinceListData?.data : []}
          form={form}
          isLoading={getProvinceListLoading}
          onChange={onProvinceChangeHandler}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="شهر"
          name="city"
          options={cityList}
          form={form}
          isLoading={getCityListLoading}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="کد پستی"
          name="postalCode"
          rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن 1"
          name="firstPhoneNumber"
          rules={[REQUIRED_RULE, NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col span={24}>
        <CustomInput
          type="text"
          label="آدرس"
          name="address"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
        />
      </Col>
    </Row>
  );
};

export default FoodMySelfDetailsDrawerInfoContact;
