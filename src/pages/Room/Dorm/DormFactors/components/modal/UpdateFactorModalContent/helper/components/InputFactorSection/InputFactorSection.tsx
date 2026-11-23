import { Button, Col, Form, Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InputFactorSectionProps } from "./@types/@inputFactorSection";
import CustomCard from "../../../../../../../../../../components/CustomCard/CustomCard";
import CustomTextArea from "../../../../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "../../../../../../../../../../components/CustomInputs/InputNumber/CustomInputNumber";
import { PriceSeparator } from "../../../../../../../../../../infrastructure/helpers/utils";
import "./_inputFactorSection.scss";

const InputFactorSection = ({
  totalValue,
  form,
  total,
  setTotal,
}: InputFactorSectionProps) => {
  const values = Form.useWatch([], form);

  //   useEffect(() => {
  //     if (values?.debit && values?.debit !== 0) {
  //       setTotal((prev) => prev + values?.debit);
  //     }
  //     if (values?.credit && values?.credit !== 0) {
  //       setTotal((prev) => prev - values?.credit);
  //     }
  //     // if (values?.credit !== 0) {
  //     //   setTotal((prev) => prev - values?.credit);
  //     // }
  //   }, [form, values]);

  const onRenewFactorTotal = () => {
    if (totalValue) {
      let newTotal = totalValue;
      if (values?.debit) {
        newTotal = newTotal + values?.debit;
      }
      if (values?.credit) {
        newTotal = newTotal - values?.credit;
      }
      if (values?.discount) {
        newTotal = newTotal - (newTotal * (values.discount ?? 0)) / 100;
      }
      setTotal(newTotal);
    }
  };

  return (
    <CustomCard>
      <Row gutter={[10, 10]}>
        <Col md={8} xs={12}>
          <CustomInputNumber
            label="بدهکاری (ریال)"
            name="debit"
            placeholder="بدهکاری"
            isPrice={true}
            min={0}
            maxLength={14}
          />
        </Col>
        <Col md={8} xs={12}>
          <CustomInputNumber
            label="بستانکاری (ریال)"
            name="credit"
            placeholder="بستانکاری"
            isPrice={true}
            min={0}
            maxLength={14}
          />
        </Col>
        <Col md={8} xs={12}>
          <CustomInputNumber
            label="تخفیف (درصد)"
            name="discount"
            placeholder="تخفیف"
            maxLength={2}
            min={0}
            controls={false}
            // // validateTrigger="onBlur"
            // rules={[{ message: "تخفیف نمی تواند بیشتر از 99 باشد", }]}
            // validateDebounce={1000}
            // rules={[{ len: 3, message: "asd", }]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات"
            name="description"
            placeholder="توضیحات"
            maxLength={499}
          />
        </Col>
      </Row>
      <Row className="total-amount-container" gutter={16}>
        <SingleVerticalWithCol
          md={8}
          xs={12}
          label="قیمت نهایی فاکتور (ریال)"
          value={PriceSeparator(total?.toString())}
        />

        <Col md={8} xs={12}>
          <Button type="primary" onClick={onRenewFactorTotal}>
            بروزرسانی فاکتور
          </Button>
        </Col>
      </Row>
    </CustomCard>
  );
};

export default InputFactorSection;
