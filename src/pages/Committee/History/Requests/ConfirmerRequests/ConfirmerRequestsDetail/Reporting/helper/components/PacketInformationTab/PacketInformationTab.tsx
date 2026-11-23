import { useEffect, useState } from "react";

import { Button, Col, Form, Row, UploadFile } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  useGetConfirmerDetailCheckInquiryMutation,
  useSendSignatoryLetterInformationMutation,
} from "@infra/states/redux/Apis/committee/history/history";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import {
  FormData,
  PacketInformationTabProps,
  SendSignatoryLetterInformationResponse,
} from "./@types/@packetInformationTab";
import { GetConfirmerDetailCheckInquiryResponse } from "../../../../CheckInquiry/@types/@checkInquiry";
import "./_packetInformationTab.scss";

const PacketInformationTab = ({ setCurrent }: PacketInformationTabProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [signatoryForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getInquiry, { data: inquiryData, isLoading: isiInquiryLoading }] =
    useGetConfirmerDetailCheckInquiryMutation();

  const [
    sendSignatoryLetterInformation,
    { isLoading: isSendSignatoryLetterInformationLoading },
  ] = useSendSignatoryLetterInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getInquiry({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getInquiryOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getInquiryOnSuccess = async (value: GetConfirmerDetailCheckInquiryResponse) => {
    if (value?.status === 200) {
      signatoryForm.setFieldsValue({
        signatoryName: value?.data?.respondentFirstName,
        signatoryFamily: value?.data?.respondentLastName,
        signatoryOrganization: value?.data?.respondentOrganization,
        signatoryPost: value?.data?.respondentPost,
      });
    }
  };

  const signatorySubmitHandler = (value: FormData) => {
    if (id) {
      sendSignatoryLetterInformation({
        form: "RegisteringInformationSignatoryLetter",
        id: "952aa9ed16834c5fac1995b60de09a18",
        _data_: {
          id: +id,
          respondentFirstName: value?.signatoryName,
          respondentLastName: value?.signatoryFamily,
          respondentOrganization: value?.signatoryOrganization,
          respondentPost: value?.signatoryPost,
        },
      })
        .unwrap()
        .then(sendSignatoryLetterInformationOnSuccess);
    }
  };

  const sendSignatoryLetterInformationOnSuccess = async (
    value: SendSignatoryLetterInformationResponse
  ) => {
    if (value?.status === 200) {
      setCurrent((prev) => prev + 1);
    }
  };

  const backBtnHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-request-detail-reporting-packet-info-tab">
      <CustomCard
        padding={PADDING_20}
        className="information-wrapper"
        loading={isiInquiryLoading}
      >
        <CustomDivider text="اطلاعات استعلام‌کننده" />
        <Row gutter={10}>
          <SingleVerticalWithCol
            span={6}
            label="نام"
            value={inquiryData?.data?.inquirerFirstName}
          />

          <SingleVerticalWithCol
            span={6}
            label="نام خانوادگی"
            value={inquiryData?.data?.inquirerLastName}
          />

          <SingleVerticalWithCol
            span={6}
            label="سمت"
            value={inquiryData?.data?.inquirerPost}
          />

          <SingleVerticalWithCol
            span={6}
            label="سازمان"
            value={inquiryData?.data?.inquirerOrganization}
          />
        </Row>
        <Row gutter={10}>
          <SingleVerticalWithCol
            span={6}
            label="شماره"
            value={inquiryData?.data?.inquirerNumber}
          />

          <SingleVerticalWithCol
            span={6}
            label="تاریخ درخواست"
            value={inquiryData?.data?.inquirerDateRequest}
            isDate
          />
        </Row>
      </CustomCard>
      <CustomCard padding={PADDING_20} className="information-wrapper">
        <CustomDivider text="پیوست‌ها" />
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          hasNullText={true}
          classNameOuterDiv="custom-upload-packet"
        />
      </CustomCard>
      <Form onFinish={signatorySubmitHandler} form={signatoryForm} className="form">
        <CustomCard
          padding={PADDING_20}
          className="information-wrapper"
          loading={isiInquiryLoading}
        >
          <CustomDivider text="اطلاعات امضاء کننده نامه" />
          <Row gutter={10}>
            <Col span={6}>
              <CustomInput label="نام" name="signatoryName" placeholder="نام" />
            </Col>
            <Col span={6}>
              <CustomInput
                label="نام خانوادگی"
                name="signatoryFamily"
                placeholder="نام خانوادگی"
              />
            </Col>
            <Col span={6}>
              <CustomInput label="سمت" name="signatoryPost" placeholder="سمت" />
            </Col>
            <Col span={6}>
              <CustomInput
                label="سازمان"
                name="signatoryOrganization"
                placeholder="سازمان"
              />
            </Col>
          </Row>
        </CustomCard>
        <div className="btns-container">
          <Button type="default" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSendSignatoryLetterInformationLoading}
          >
            بعدی
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PacketInformationTab;
