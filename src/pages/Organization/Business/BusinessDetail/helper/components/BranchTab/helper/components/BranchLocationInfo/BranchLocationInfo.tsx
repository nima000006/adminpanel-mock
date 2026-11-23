import { useState } from "react";

import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { POSTAL_CODE_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BranchLocationInfoProps } from "../@types/@branchTabComponentsType";

const BranchLocationInfo = ({ form }: BranchLocationInfoProps) => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text={"موقعیت مکانی"} />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="province"
            label="استان"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchParent"
            label="شهر"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="کد پستی"
            name="postalCode"
            placeholder="کد 10 رقمی پستی"
            rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
          />
        </Col>

        <Col span={24}>
          <CustomInput
            type="text"
            label="آدرس"
            name="address"
            placeholder="آدرس شعبه را به صورت کامل وارد نمایید."
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
      <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
    </div>
  );
};
export default BranchLocationInfo;
