import { useEffect } from "react";

import { Col, Form, FormInstance, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetMyServicesListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import {
  LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { MyWalletDetailsAddBankAccountFormDataType } from "../../../@types/@myWalletDetailsyourAccountDrawerContent";

const MyWalletDetailsAddBankAccountModalContent = ({
  form,
}: {
  form: FormInstance<MyWalletDetailsAddBankAccountFormDataType>;
}) => {
  //? ================================  Api Calls ================================
  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetMyServicesListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getServicesList();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        {/* //Todo[Atefeh]:uncomment when api got ready */}
        {/* <Col span={24}>
        <CustomSelect
          name="bankName"
          label="نام بانک"
          options={[]}
          placeholder="انتخاب کنید"
          form={form}
          rules={[REQUIRED_RULE]}
          //   loading={}
        />
      </Col>
      */}
        <Col span={24}>
          <CustomInput
            type="text"
            label="شماره حساب"
            name="accountNumber"
            placeholder="شماره حساب خود را وارد نمایید."
            rules={[NUMBER_RULE, MIN_LENGTH_RULE(8), REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            suffix="IR"
            type="text"
            label="شماره شبا"
            name="iban"
            placeholder=""
            rules={[REQUIRED_RULE, NUMBER_RULE, LENGTH_RULE(24)]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            type="text"
            label="شماره کارت"
            name="cardNumber"
            placeholder="شماره کارت خود را وارد نمایید."
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            name="service"
            label="سرویس"
            options={servicesData || []}
            placeholder="انتخاب کنید"
            form={form}
            loading={isServicesLoading}
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default MyWalletDetailsAddBankAccountModalContent;
