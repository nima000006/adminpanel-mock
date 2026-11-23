import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlinePercentage } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { makeSearchParams, selectDefaultValueGenerator } from "@infra/helpers/utils";
import { DORM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/room";
import { useSetDormitoryPolicyPaymentMutation } from "@infra/states/redux/Apis/roomApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { EDIT } from "@infra/VARS/globalStrings/globalStrings";
import { DORM_CREATE_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateDormFourthTabProps,
  FourthTabSubmitValues,
} from "./@types/@createDormFourthTab";
import { SetDormitoryPolicyPaymentResponse } from "../CreateDormFirstTab/@types/@createDormFirstTab";
import {
  dormValidateTotalPercentage,
  dueDateErrorMsg,
  installmentErrorMsg,
  installmentsInfo,
} from "./helper/utils/createDormFourthTabUtil";
import "./_createDormFourthTab.scss";

const CreateDormFourthTab = ({
  form,
  isLoading,
  setCurrent,
  installmentType,
  setInstallmentType,
}: CreateDormFourthTabProps) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [setDormPolicy] = useSetDormitoryPolicyPaymentMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (installmentType?.id === 1) {
      form.setFieldsValue({
        firstInstallment: "100",
      });
    }
  }, [installmentType?.id]);

  //* ================================ Util Functions ================================
  // onFormSubmit
  const onFormSubmit = async (values: FourthTabSubmitValues) => {
    // const fakeArray = Array(installmentType?.id).fill("");

    // const [form1, form2, form3] = fakeArray.map((_, index) => {
    //   const formData = new FormData();

    //   // new change is in this phase
    //   formData.append("planid", "1");
    //   formData.append("fromdate", "");
    //   formData.append(
    //     "persentfee",
    //     index + 1 === 1
    //       ? values?.firstInstallment
    //       : index + 1 === 2
    //         ? values?.secondInstallment
    //         : values?.thirdInstallment
    //   ); // needs real data
    //   formData.append("dayscountforpayment", "");
    //   formData.append(
    //     "todate",
    //     index + 1 === 1
    //       ? values?.installmentFirstDate
    //       : index + 1 === 2
    //         ? values?.installmentSecondDate
    //         : values?.installmentThirdDate
    //   );
    //   formData.append("dudays", "0");
    //   formData.append("des", "");
    //   formData.append("ownerid", id); // dorm id
    //   formData.append("ownertype", "2");
    //   formData.append("rezervetype", "2");
    //   return formData;
    // });
    await setDormPolicy({
      dormitoryPolicyPayments: [
        {
          dayscountforpayment: null,
          des: "",
          dudays: 0,
          fromdate: null,
          ownerid: +id, // dorm id
          ownertype: 2,
          planid: 1,
          rezervetype: 2,
          persentfee: +values?.firstInstallment,
          todate: values?.installmentFirstDate,
        },
        ...(installmentType?.id > 1
          ? [
              {
                dayscountforpayment: null,
                des: "",
                dudays: 0,
                fromdate: null,
                ownerid: +id, // dorm id
                ownertype: 2,
                planid: 1,
                rezervetype: 2,
                persentfee: +values?.secondInstallment,
                todate: values?.installmentSecondDate,
              },
            ]
          : []),
        ...(installmentType?.id > 2
          ? [
              {
                dayscountforpayment: null,
                des: "",
                dudays: 0,
                fromdate: null,
                ownerid: +id, // dorm id
                ownertype: 2,
                planid: 1,
                rezervetype: 2,
                persentfee: +values?.thirdInstallment,
                todate: values?.installmentThirdDate,
              },
            ]
          : []),
      ],
    })
      .unwrap()
      .then(onSetDormPolicySuccess);
  };

  // onSetDormPolicySuccess
  const onSetDormPolicySuccess = (res: SetDormitoryPolicyPaymentResponse) => {
    if (res?.status === 200) {
      toast.success(DORM_CREATE_SUCCESS, { toastId: DORM_CREATE_SUCCESS });
      navigate({ pathname: DORM_DETAIL_PAGE_ROUTE, search: makeSearchParams({ id }) });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={onFormSubmit}>
      <CustomCard className="dorm-create-fourth-tab-container" loading={isLoading}>
        <CustomSelect
          label="تعداد اقساط"
          options={installmentsInfo}
          name="installment"
          className="installment-select"
          hasVerticalLabel={false}
          onChange={(_: any, option: any) => setInstallmentType(option?.item)}
          defaultValue={selectDefaultValueGenerator(installmentType)}
        />
      </CustomCard>
      <CustomCard className="dorm-payment-fourth-tab-container">
        <CustomDivider text="وضعیت پرداخت" />
        <div className="dorm-payment-fourth-items-renderer">
          <Row gutter={[16, 16]} className="row">
            <span className="row-label">قسط اول:</span>
            <Col lg={8} md={8} sm={24} xs={24}>
              <CustomInput
                name="firstInstallment"
                label="درصد مبلغ (%)"
                rootClassName="dorm-payment-custom-input"
                disabled={installmentType?.id === 1}
                defaultValue={installmentType?.id === 1 ? 100 : undefined}
                maxLength={installmentType?.id !== 1 ? 2 : 3}
                prefix={<AiOutlinePercentage className="percentage" />}
                dependencies={["secondInstallment", "thirdInstallment"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator: dormValidateTotalPercentage(
                      getFieldValue,
                      installmentType?.id
                    ),
                  }),
                ]}
              />
            </Col>
            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomDatePicker
                form={form}
                name="installmentFirstDate"
                label="تاریخ سررسید"
                customContainerClass="dorm-payment-custom-date"
                rules={[CUSTOM_REQUIRED_RULE(dueDateErrorMsg(1))]}
                // defaultValue={"2024-08-28T00:00:00.000+03:30"}
                // key={Math.random()}
              />
            </Col>
          </Row>
          {installmentType?.id > 1 && (
            <Row gutter={[16, 16]} className="row">
              <span className="row-label">قسط دوم:</span>
              <Col lg={8} md={8} sm={24} xs={24}>
                <CustomInput
                  name="secondInstallment"
                  label="درصد مبلغ (%)"
                  rootClassName="dorm-payment-custom-input"
                  prefix={<AiOutlinePercentage className="percentage" />}
                  dependencies={["firstInstallment", "thirdInstallment"]}
                  maxLength={2}
                  //  rules={[CUSTOM_REQUIRED_RULE(dueDateErrorMsg(1))]}
                  rules={[
                    ...(installmentType?.id > 1
                      ? [CUSTOM_REQUIRED_RULE(installmentErrorMsg(2))]
                      : []),
                    ({ getFieldValue }) => ({
                      validator: dormValidateTotalPercentage(
                        getFieldValue,
                        installmentType?.id
                      ),
                    }),
                  ]}
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24}>
                <CustomDatePicker
                  form={form}
                  name="installmentSecondDate"
                  label="تاریخ سررسید"
                  customContainerClass="dorm-payment-custom-date"
                  rules={[
                    ...(installmentType?.id > 1
                      ? [CUSTOM_REQUIRED_RULE(dueDateErrorMsg(2))]
                      : []),
                  ]}
                />
              </Col>
            </Row>
          )}

          {installmentType?.id > 2 && (
            <Row gutter={[16, 16]} className="row">
              <span className="row-label">قسط سوم:</span>

              <Col lg={8} md={8} sm={24} xs={24}>
                <CustomInput
                  name="thirdInstallment"
                  label="درصد مبلغ (%)"
                  rootClassName="dorm-payment-custom-input"
                  prefix={<AiOutlinePercentage className="percentage" />}
                  dependencies={["firstInstallment", "secondInstallment"]}
                  maxLength={2}
                  rules={[
                    ...(installmentType?.id > 2
                      ? [CUSTOM_REQUIRED_RULE(installmentErrorMsg(3))]
                      : []),
                    ({ getFieldValue }) => ({
                      validator: dormValidateTotalPercentage(
                        getFieldValue,
                        installmentType?.id
                      ),
                    }),
                  ]}
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24}>
                <CustomDatePicker
                  form={form}
                  name="installmentThirdDate"
                  label="تاریخ سررسید"
                  customContainerClass="dorm-payment-custom-date"
                  rules={[
                    ...(installmentType?.id > 2
                      ? [CUSTOM_REQUIRED_RULE(dueDateErrorMsg(3))]
                      : []),
                  ]}
                />
              </Col>
            </Row>
          )}
        </div>
      </CustomCard>
      <div className="dorm-fourth-tab-action-btn-container">
        <CustomButton
          onClick={() => {
            setSearchParams({
              id,
              step: "2",
              mode: EDIT,
            });
            setCurrent((prev) => prev - 1);
          }}
        >
          قبلی
        </CustomButton>
        <CustomButton type="primary" htmlType="submit">
          ایجاد
        </CustomButton>
      </div>
    </Form>
  );
};

export default CreateDormFourthTab;
