import { useEffect, useState } from "react";

import { Button, Col, Form, Row, UploadFile } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { COMMITTEE_HISTORY_REQUESTS_SUBMITTER_LIST_PAGE_ROUTE } from "@infra/router/routes/committee";

import {
  FormData,
  GetSubmitterAddPacketInfoResponse,
  PacketInfoStepProps,
  SendSubmitterAddPacketInfoResponse,
} from "./@types/@packetInfoStep";

import "./_packetInfoStep.scss";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  useLazyGetSubmitterAddPacketInfoQuery,
  useSendSubmitterAddPacketInfoMutation,
} from "@infra/states/redux/Apis/committee/history/history";

const SEND_PACKET_INFO_ERROR_MSG = ".خطایی رخ داده است ";

const PacketInfoStep = ({ setCurrent }: PacketInfoStepProps) => {
  const [forMyself, setForMyself] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getPacketInfo, { data: getPacketInfoData, isLoading: isGetPacketInfoLoading }] =
    useLazyGetSubmitterAddPacketInfoQuery();

  const [sendPacketInfo, { isLoading: isPacketInfoLoading }] =
    useSendSubmitterAddPacketInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getPacketInfo(id).unwrap().then(getPacketInfoOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getPacketInfoOnSuccess = (value: GetSubmitterAddPacketInfoResponse) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        inquiryFirstName: value?.data?.[0]?.inquirerFirstName,
        inquiryFamilyName: value?.data?.[0]?.inquirerLastName,
        inquiryPosition: value?.data?.[0]?.inquirerPost,
        inquiryOrganization: value?.data?.[0]?.inquirerOrganization,
        packetNumber: value?.data?.[0]?.inquirerNumber,
        inquiryDate: value?.data?.[0]?.inquirerDateRequest,
        signatoryFirstName: value?.data?.[0]?.signatoryFirstName,
        signatoryFamilyName: value?.data?.[0]?.signatoryLastName,
        signatoryPosition: value?.data?.[0]?.signatoryPost,
        signatoryOrganization: value?.data?.[0]?.signatoryOrganization,
      });
    }
  };
  const sendPacketInfoOnSuccess = (value: SendSubmitterAddPacketInfoResponse) => {
    if (value?.status === 200) {
      navigate({
        pathname: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_LIST_PAGE_ROUTE,
      });
    } else {
      toast.error(SEND_PACKET_INFO_ERROR_MSG, { toastId: SEND_PACKET_INFO_ERROR_MSG });
    }
  };
  // Other functions
  const onFormSubmit = (value: FormData) => {
    if (id) {
      sendPacketInfo({
        form: "ClosingEducationalAssistant",
        id: "703b98a908444a258a44285736b99694",
        _data_: {
          dateRegistration: new Date().toISOString(),
          id: +id,
          inquirerDateRequest: !forMyself ? value.inquiryDate : null,
          inquirerFirstName: value.inquiryFirstName,
          inquirerLastName: value.inquiryFamilyName,
          inquirerNationalCode: user?.nationalCode || "",
          inquirerNumber: !forMyself ? value.packetNumber : null,
          inquirerOrganization: value.inquiryOrganization,
          inquirerPost: value.inquiryPosition,
          signatoryFirstName: value.signatoryFirstName,
          signatoryLastName: value.signatoryFamilyName,
          signatoryOrganization: value.signatoryOrganization,
          signatoryPost: value.signatoryPosition,
          status: 1,
          UniCode: user?.staff?.admin?.branchId?.toString() || "",
        },
      })
        .unwrap()
        .then(sendPacketInfoOnSuccess);
    }
  };

  const backBtnHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetPacketInfoLoading}>
      <Form className="packet-info-request-container" form={form} onFinish={onFormSubmit}>
        <CustomCard>
          <CustomDivider text="اطلاعات استعلام‌کننده" />
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <CustomCheckboxGroup
                name="forMyself"
                options={[{ label: "برای خودم", value: "1" }]}
                onChange={(e: CheckboxChangeEvent) => {
                  setForMyself(e.target.checked);
                  form.setFieldsValue({
                    packetNumber: null,
                    inquiryDate: null,
                  });
                }}
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput label="نام" name="inquiryFirstName" placeholder="نام" />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="نام خانوادگی"
                name="inquiryFamilyName"
                placeholder="نام خانوادگی"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput label="سمت" name="inquiryPosition" placeholder="سمت" />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="سازمان"
                name="inquiryOrganization"
                placeholder="سازمان"
              />
            </Col>
            {!forMyself && (
              <>
                <Col md={8} xs={12}>
                  <CustomInput
                    label="شماره نامه"
                    name="packetNumber"
                    placeholder="شماره نامه"
                  />
                </Col>
                <Col md={8} xs={12}>
                  <CustomDatePicker
                    label="تاریخ"
                    name="inquiryDate"
                    placeholder="انتخاب کنید"
                    form={form}
                    defaultValue={getPacketInfoData?.data?.[0]?.inquirerDateRequest}
                    key={getPacketInfoData?.data?.[0]?.inquirerDateRequest}
                  />
                </Col>
              </>
            )}
          </Row>
        </CustomCard>
        <CustomCard>
          <CustomDivider text="پیوست‌ها" />
          <CustomUploader
            setFileList={setFileList}
            fileList={fileList}
            hasNullText={true}
          />
        </CustomCard>
        <CustomCard>
          <CustomDivider text="اطلاعات امضاء‌کننده نامه" />
          <Row gutter={[10, 10]}>
            <Col md={8} xs={12}>
              <CustomInput label="نام" name="signatoryFirstName" placeholder="نام" />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="نام خانوادگی"
                name="signatoryFamilyName"
                placeholder="نام خانوادگی"
              />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput label="سمت" name="signatoryPosition" placeholder="سمت" />
            </Col>
            <Col md={8} xs={12}>
              <CustomInput
                label="سازمان"
                name="signatoryOrganization"
                placeholder="سازمان"
              />
            </Col>
          </Row>
        </CustomCard>
        <div className="packet-info-btns-container">
          <Button type="default" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button type="primary" htmlType="submit" loading={isPacketInfoLoading}>
            بعدی
          </Button>
        </div>
      </Form>
    </Div>
  );
};

export default PacketInfoStep;
