import { useEffect } from "react";

import { Button, Col, Form, Row } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useGetSubmitterAddAccusationRequestMutation,
  useLazyGetSubmitterAddReasonRequestQuery,
  useLazyGetSubmitterAddTypeInformationQuery,
  useSendSubmitterAddAccusationRequestMutation,
} from "@infra/states/redux/Apis/committee/history/history";

import {
  AccusationAndRequestStepProps,
  FormData,
  GetSubmitterAddAccusationRequestResponse,
  GetSubmitterAddReasonRequestResponse,
  GetSubmitterAddTypeInformationResponse,
  SendSubmitterAddAccusationRequestResponse,
} from "./@types/@accusationAndRequestStep";
import "./_accusationAndRequestStep.scss";

const SEND_ACCUSATION_REQUEST_SUCCESS_MSG = "اطلاعات مرحله اول با موفقیت ثبت شد.";

const AccusationAndRequestStep = ({ setCurrent }: AccusationAndRequestStepProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getAccusationAndRequest, { isLoading: isGetAccusationAndRequestLoading }] =
    useGetSubmitterAddAccusationRequestMutation();

  const [
    getTypeInformation,
    { data: typeInformationData, isLoading: isTypeInformationLoading },
  ] = useLazyGetSubmitterAddTypeInformationQuery();

  const [
    getReasonRequest,
    { data: reasonRequestData, isLoading: isReasonRequestLoading },
  ] = useLazyGetSubmitterAddReasonRequestQuery();

  const [sendAccusationAndRequestData, { isLoading: isAccusationAndRequestLoading }] =
    useSendSubmitterAddAccusationRequestMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAccusationAndRequest({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getAccusationAndRequestOnSuccess);
    }
  }, [id]);

  useEffect(() => {
    getTypeInformation().unwrap().then(getRequestInformationOnSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getAccusationAndRequestOnSuccess = (
    value: GetSubmitterAddAccusationRequestResponse
  ) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        description: value?.data?.descRequest,
        familyName: value?.data?.familyOffender,
        name: value?.data?.nameOffender,
        nationalCode: value?.data?.nationalCodeOffender,
        studentNumber: value?.data?.studentNumberOffender,
        reason: selectDefaultValueGenerator(value?.data?.AssociationReasoneRequest),
        requestType: selectDefaultValueGenerator(value?.data?.AssociationTypeInformation),
      });
    }
  };

  const getRequestInformationOnSuccess = (
    value: GetSubmitterAddTypeInformationResponse
  ) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        requestType: selectDefaultValueGenerator(typeInformationData?.data),
      });
    }
  };
  const getReasonRequestOnSuccess = (value: GetSubmitterAddReasonRequestResponse) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        reason: selectDefaultValueGenerator(reasonRequestData?.data),
      });
    }
  };
  const sendAccusationAndRequestDataOnSuccess = (
    value: SendSubmitterAddAccusationRequestResponse
  ) => {
    if (value?.status === 200) {
      toast.success(SEND_ACCUSATION_REQUEST_SUCCESS_MSG, {
        toastId: SEND_ACCUSATION_REQUEST_SUCCESS_MSG,
      });
      setSearchParams({
        id: value?.data?.id?.toString(),
      });
      setCurrent((prev) => prev + 1);
    }
  };

  const typeInformationChangeHandler = (value: number) => {
    getReasonRequest(value).unwrap().then(getReasonRequestOnSuccess);
  };

  const onFormSubmit = (value: FormData) => {
    sendAccusationAndRequestData({
      form: "StudentInformationAndRequest",
      id: "43c8dabc53f14dfa89d4f2dede58d52a",
      _data_: {
        descRequest: value.description,
        familyOffender: value.familyName,
        nameOffender: value.name,
        nationalCodeOffender: value.nationalCode,
        reasonRequest: value.reason?.code,
        studentNumberOffender: value.studentNumber,
        typeInformation: value.requestType?.code,
        id: +id,
      },
    })
      .unwrap()
      .then(sendAccusationAndRequestDataOnSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetAccusationAndRequestLoading}>
      <Form className="accusation-request-container" onFinish={onFormSubmit} form={form}>
        <CustomCard>
          <CustomDivider text="اطلاعات متهم" />
          <Row gutter={[10, 10]}>
            <Col md={8} xs={12}>
              <CustomInput label="نام " name="name" placeholder="نام" />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label=" نام خانوادگی"
                name="familyName"
                placeholder="نام و نام خانوادگی"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="شماره دانشجویی"
                name="studentNumber"
                placeholder="شماره دانشجویی"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="شماره ملی"
                name="nationalCode"
                placeholder="شماره ملی"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomSelect
                label="نوع اطلاعات درخواستی"
                name="requestType"
                options={typeInformationData?.data}
                form={form}
                isLoading={isTypeInformationLoading}
                placeholder="نوع اطلاعات درخواستی"
                // @ts-expect-error:next-line
                onChange={typeInformationChangeHandler}
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomSelect
                label="علت ثبت درخواست"
                name="reason"
                options={reasonRequestData?.data}
                form={form}
                isLoading={isReasonRequestLoading}
                placeholder="علت ثبت درخواست"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomTextArea
                label="توضیحات"
                name="description"
                placeholder="توضیحات"
                hasVerticalLabel={false}
              />
            </Col>
          </Row>
        </CustomCard>
        <div className="custom-btns-container">
          <Button
            type="primary"
            htmlType="submit"
            loading={isAccusationAndRequestLoading}
          >
            بعدی
          </Button>
        </div>
      </Form>
    </Div>
  );
};

export default AccusationAndRequestStep;
