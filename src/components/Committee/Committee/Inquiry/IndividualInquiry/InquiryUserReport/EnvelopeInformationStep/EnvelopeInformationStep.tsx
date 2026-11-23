import { useEffect } from "react";

import { Button, Form, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { useSearchParams } from "react-router";

import {
  EnvelopeInformationStepProps,
  FormDataType,
  GetLetterInformationResponse,
  SendLetterInformationResponse,
} from "./@types/@envelopeInformationStep";
import {
  useLazyGetLetterInformationQuery,
  useSendLetterInformationMutation,
} from "../../../../../../../infrastructure/states/redux/Apis/committee/inquiry/inquiry";
import CustomCard from "../../../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../../CustomInputs/CustomInput/CustomInput";
import SubmitButton from "../../../../../../CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../../../Renderers/Div/Div";
import "./_envelopeInformationStep.scss";

const EnvelopeInformationStep = ({ setCurrent }: EnvelopeInformationStepProps) => {
  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useSearchParams();
  const { id, nationalCode } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getLetterInformation,
    { data: getLetterInformationData, isLoading: isGetLetterInformationLoading },
  ] = useLazyGetLetterInformationQuery();

  const [sendLetterInformation, { isLoading: isSendLetterInformationLoading }] =
    useSendLetterInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getLetterInformation(id).unwrap().then(getLetterInformationOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getLetterInformationOnSuccess = async (value: GetLetterInformationResponse) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        inquirerName: value?.data?.[0]?.inquirerFirstName,
        inquirerRole: value?.data?.[0]?.inquirerPost,
        inquirerNumber: value?.data?.[0]?.inquirerNumber,
        inquirerFamily: value?.data?.[0]?.inquirerLastName,
        inquirerOrganization: value?.data?.[0]?.inquirerOrganization,
        dateOccurrence: value?.data?.[0]?.inquirerDateRequest,
        signerName: value?.data?.[0]?.signatoryFirstName,
        signerRole: value?.data?.[0]?.signatoryPost,
        signerFamily: value?.data?.[0]?.signatoryLastName,
        signerOrganization: value?.data?.[0]?.signatoryOrganization,
      });
    }
  };

  const sendLetterInformationOnSuccess = async (value: SendLetterInformationResponse) => {
    if (value?.status === 200) {
      setSearchParams({
        id: value?.data?.id?.toString(),
        nationalCode,
      });
      setCurrent((prev) => prev + 1);
    }
  };

  const sendLetterInformationHandler = (value: FormDataType) => {
    sendLetterInformation({
      form: "LetterInformation",
      id: "e5b539681efd4ec283648721bea5867b",
      _data_: {
        inquirerFirstName: value?.inquirerName,
        inquirerPost: value?.inquirerRole,
        inquirerNumber: value?.inquirerNumber,
        inquirerLastName: value?.inquirerFamily,
        inquirerOrganization: value?.inquirerOrganization,
        inquirerDateRequest: value?.dateOccurrence,
        signatoryFirstName: value?.signerName,
        signatoryPost: value?.signerRole,
        signatoryLastName: value?.signerFamily,
        signatoryOrganization: value?.signerOrganization,
        id: id ? +id : null,
      },
    })
      .unwrap()
      .then(sendLetterInformationOnSuccess);
  };

  const backBtnHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-individual-inquiry-envelope-information-step"
      onFinish={sendLetterInformationHandler}
      form={form}
    >
      <Div
        loading={isGetLetterInformationLoading}
        className="inquiry-envelope-information"
      >
        <CustomCard>
          <CustomDivider text="اطلاعات استعلام‌ کننده" />
          <div className="inputs-container">
            <CustomInput type="text" label="نام" name="inquirerName" placeholder="نام" />
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="inquirerFamily"
              placeholder="نام خانوادگی"
            />
            <CustomInput type="text" label="سمت" name="inquirerRole" placeholder="سمت" />
            <CustomInput
              type="text"
              label="سازمان"
              name="inquirerOrganization"
              placeholder="سازمان"
            />
            <CustomInput
              type="text"
              label="شماره"
              name="inquirerNumber"
              placeholder="شماره"
            />
            <CustomDatePicker
              label="تاریخ وقوع"
              // className="date-picker"
              placeholder="تاریخ وقوع"
              name="dateOccurrence"
              form={form}
              defaultValue={getLetterInformationData?.data?.[0]?.inquirerDateRequest}
              key={getLetterInformationData?.data?.[0]?.inquirerDateRequest}
            />
          </div>
        </CustomCard>
        <CustomCard>
          <CustomDivider text="پیوست ها" />
          <Upload className="upload-container" listType="picture" multiple disabled>
            <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
              بارگذاری تصاویر
            </Button>
          </Upload>
        </CustomCard>
        <CustomCard>
          <CustomDivider text="اطلاعات امضاء‌کننده نامه" />
          <div className="inputs-container">
            <CustomInput type="text" label="نام" name="signerName" placeholder="نام" />
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="signerFamily"
              placeholder="نام خانوادگی"
            />
            <CustomInput type="text" label="سمت" name="signerRole" placeholder="سمت" />
            <CustomInput
              type="text"
              label="سازمان"
              name="signerOrganization"
              placeholder="سازمان"
            />
          </div>
        </CustomCard>
        <div className="buttons-container">
          <Button className="back-btn" onClick={backBtnHandler}>
            برگشت
          </Button>
          <SubmitButton
            type="primary"
            className="advance-filter-btn"
            label="بعدی"
            form={form}
            loading={isSendLetterInformationLoading}
          />
        </div>
      </Div>
    </Form>
  );
};

export default EnvelopeInformationStep;
