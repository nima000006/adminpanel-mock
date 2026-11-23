import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetBasicInfoProvinceAndCityQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { POSTAL_CODE_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { AdminTabLocationInfoProps } from "./@types/@adminTabLocationInfo";

const AdminTabLocationInfo = ({ form }: AdminTabLocationInfoProps) => {
  const [selectedProvince, setSelectedProvince] = useState(false);

  //? ================================  Api Calls ================================
  // get province
  const [getProvinceData, { data: provinceData, isLoading: provinceDataIsLoading }] =
    useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { data: cityData, isLoading: cityDataIsLoading }] =
    useLazyGetBasicInfoProvinceAndCityQuery();

  //* ================================ Util Functions ================================
  //province
  useEffect(() => {
    getProvinceData(103);
  }, []);

  const onProvinceChangeHandler = (event: unknown) => {
    getCityData(event as number);
    setSelectedProvince(true);
    form.setFieldsValue({ city: undefined });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDivider text={"موقعیت مکانی"} />
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="adminProvince"
            label="استان"
            isLoading={provinceDataIsLoading}
            options={provinceData?.map((item: { id: number; name: string }) => {
              return {
                id: item?.id,
                title: item?.name,
              };
            })}
            placeholder="انتخاب کنید"
            form={form}
            onChange={onProvinceChangeHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="adminCity"
            label="شهر"
            options={cityData?.map((item: { id: number; name: string }) => {
              return {
                id: item?.id,
                title: item?.name,
              };
            })}
            isLoading={cityDataIsLoading}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            disabled={!selectedProvince}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد پستی"
            name="adminPostalCode"
            placeholder="کد 10 رقمی پستی"
            rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
          />
        </Col>

        <Col span={24}>
          <CustomInput
            type="text"
            label="آدرس"
            name="adminAddress"
            placeholder="آدرس شعبه را به صورت کامل وارد نمایید."
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default AdminTabLocationInfo;
