import { useState } from "react";

import { Col, Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  NUMBER_MAX_RULE,
  NUMBER_MIN_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { CostItemElementProps } from "./@types/@costItemElement";

const CostItemElement = ({ title, prefix, currency, form }: CostItemElementProps) => {
  const [isDiscountPercent, setIsDiscountPercent] = useState(true);

  const changeSelectHandler = (e: string) => {
    if (e === "1") {
      setIsDiscountPercent(true);
    } else {
      setIsDiscountPercent(false);
    }
  };

  const selectAfter = (
    <CustomSelect
      name={`${prefix}unit`}
      options={[
        {
          title: "%",
          id: 1,
        },
        {
          title: "دلار",
          id: 2,
        },
      ]}
      form={form}
      onChange={(e) => changeSelectHandler(e as string)}
      defaultValue={selectDefaultValueGenerator({
        title: "%",
        id: 1,
      })}
    />
  );

  return (
    <div>
      <CustomDivider text={title} />
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInputNumber
              label="هزینه"
              name={`${prefix}cost`}
              placeholder={`هزینه ${title} را وارد نمایید`}
              addonAfter={currency}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInputNumber
              label="مالیات (اختیاری)"
              name={`${prefix}tax`}
              placeholder="مالیات را وارد نمایید."
              addonAfter="%"
              rules={[NUMBER_MIN_RULE(1), NUMBER_MAX_RULE(100)]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInputNumber
              label="عوارض (اختیاری)"
              name={`${prefix}duty`}
              placeholder="عوارض را وارد نمایید."
              addonAfter="%"
              rules={[NUMBER_MIN_RULE(1), NUMBER_MAX_RULE(100)]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInputNumber
              label="تخفیف (اختیاری)"
              name={`${prefix}discount`}
              placeholder="تخفیف را وارد نمایید."
              addonAfter={selectAfter}
              rules={isDiscountPercent ? [NUMBER_MIN_RULE(1), NUMBER_MAX_RULE(100)] : []}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CostItemElement;
