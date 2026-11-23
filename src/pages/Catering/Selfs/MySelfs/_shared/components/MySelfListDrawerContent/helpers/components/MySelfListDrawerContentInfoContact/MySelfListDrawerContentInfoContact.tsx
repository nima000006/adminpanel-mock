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

import { MySelfListDrawerContentInfoContactProps } from "./@types/MySelfListDrawerContentInfoContactProps";

const MySelfListDrawerContentInfoContact = ({
  isProvinceSelected,
  form,
  getCityListHandler,
  setIsProvinceSelected,
  provinceList,
  cityList,
  getCityListLoading,
  getProvinceListLoading,
}: MySelfListDrawerContentInfoContactProps) => {
  //* ================================ Util Functions ================================
  const onProvinceChangeHandler = (event: unknown) => {
    const provinceId = Number(event);
    if (provinceId) {
      getCityListHandler(provinceId);
    }
    setIsProvinceSelected(true);
    form.setFieldValue("city", undefined);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} sm={12} xs={24}>
        <CustomSelect
          name="province"
          label="استان"
          options={provinceList}
          placeholder="انتخاب کنید"
          form={form}
          isLoading={getProvinceListLoading}
          onChange={onProvinceChangeHandler}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomSelect
          name="city"
          label="شهر"
          options={cityList}
          placeholder="انتخاب کنید"
          form={form}
          isLoading={getCityListLoading}
          rules={[REQUIRED_RULE]}
          disabled={!isProvinceSelected}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="کدپستی"
          name="postalCode"
          placeholder="10 رقمی"
          rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن 1"
          name="phonOne"
          placeholder="02112345678"
          rules={[REQUIRED_RULE, NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن 2"
          name="phoneTwo"
          placeholder="02112345678"
          rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col span={24}>
        <CustomInput
          type="text"
          label="آدرس"
          name="address"
          placeholder="آدرس"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
        />
      </Col>
    </Row>
  );
};
export default MySelfListDrawerContentInfoContact;
