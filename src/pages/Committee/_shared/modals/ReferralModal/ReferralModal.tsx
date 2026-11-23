import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import "./_referralModal.scss";
import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import {
  useLazyGetReasonsReferralQuery,
  useSendReferralReportMutation,
} from "@infra/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import {
  ReferralItemProps,
  ReferralModalProps,
  SendReferralReportResponse,
} from "./@types/referralModal.types";

const ReferralItem = ({
  defaultChecked,
  title,
  reasonList,
  form,
  sectionName,
  reasonReferralLoading,
}: ReferralItemProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const checkedHandler = () => setIsChecked(!isChecked);

  return (
    <CustomCard padding={PADDING_20}>
      <div className="divider-switch-btn-container">
        <CustomDivider text={title} />
        <div className="switch-btn">
          <CustomSwitch
            valuePropName={`toBePresent_${sectionName}`}
            onChange={checkedHandler}
          />
        </div>
      </div>
      {isChecked && (
        <Row gutter={[12, 12]}>
          <Col lg={12} md={24} sm={24} xs={24}>
            <CustomSelect
              label="دلیل"
              name={`reason_${sectionName}`}
              options={reasonList}
              form={form}
              placeholder="انتخاب کنید"
              isLoading={reasonReferralLoading}
            />
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <CustomTextArea
              label="توضیحات"
              name={`description_${sectionName}`}
              placeholder="توضیحات"
            />
          </Col>
        </Row>
      )}
    </CustomCard>
  );
};

const SEND_REFERRAL_SUCCESS_MSG = "ارجاع با موفقیت انجام شد.";

const ReferralModal = ({ isModalOpen, closeModalHandler }: ReferralModalProps) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  // const [getTitleReferral, { data: titleReferralData }] =
  //   useLazyGetTitleReferralModalQuery();

  // get reasons list
  const [
    getReasonsReferral,
    { data: reasonsReferralData, isFetching: isReasonReferralFetching },
  ] = useLazyGetReasonsReferralQuery();

  // send referral modal
  const [sendReferral, { isLoading: isSendReferralLoading }] =
    useSendReferralReportMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getReasonsReferral();
      // getTitleReferral();
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const sendReferralOnSuccess = async (value?: SendReferralReportResponse) => {
    if (value?.status === 200) {
      closeModalHandler();
      toast.success(SEND_REFERRAL_SUCCESS_MSG, {
        toastId: SEND_REFERRAL_SUCCESS_MSG,
      });
    }
  };

  const referralHandler = () => {
    const {
      toBePresent_security,
      reason_security,
      description_security,
      toBePresent_research,
      reason_research,
      description_research,
      toBePresent_education,
      reason_education,
      description_education,
      toBePresent_student,
      reason_student,
      description_student,
      toBePresent_reporter,
      reason_reporter,
      description_reporter,
      toBePresent_consultant,
      reason_consultant,
      description_consultant,
    } = form.getFieldsValue();

    const AssociationReferral = {
      //گزارشگر
      sendToReporter: toBePresent_reporter ? true : false,
      reasonSendReporter: toBePresent_reporter ? reason_reporter?.children : null,
      dateReportSentToReporter: toBePresent_reporter ? new Date().toISOString() : null,
      descSendReporter: toBePresent_reporter ? description_reporter : null,
      //حراست
      sendToProtection: toBePresent_security ? true : false,
      reasonSendProtection: toBePresent_security ? reason_security?.children : null,
      dateSentToSecurity: toBePresent_security ? new Date().toISOString() : null,
      descSendProtection: toBePresent_security ? description_security : null,
      //معاونت پژوهشی
      sendToResearchAssistant: toBePresent_research ? true : false,
      reasonSendResearchAssistant: toBePresent_research
        ? reason_research?.children
        : null,
      dateReportSentToResearchAssistant: toBePresent_research
        ? new Date().toISOString()
        : null,
      descSendResearchAssistant: toBePresent_research ? description_research : null,
      // معاونت آموزشی
      sendToEducAssistant: toBePresent_education ? true : false,
      reasonSendEducAssistant: toBePresent_education ? reason_education?.children : null,
      dateReportSentToEducationalAssistant: toBePresent_education
        ? new Date().toISOString()
        : null,
      descSendEducAssistant: toBePresent_education ? description_education : null,
      //معاونت دانشجویی
      sendToStudentPresident: toBePresent_student ? true : false,
      reasonSendStudentPresident: toBePresent_student ? reason_student?.children : null,
      dateReportSentToStudentVice: toBePresent_student ? new Date().toISOString() : null,
      descSendStudentPresident: toBePresent_student ? description_student : null,
      //مشاور
      sendToConsultant: toBePresent_consultant ? true : false,
      reasonSendToConsultant: toBePresent_consultant ? reason_consultant?.children : null,
      dateReportSendToConsultant: toBePresent_consultant
        ? new Date().toISOString()
        : null,
      descSendToConsultant: toBePresent_consultant ? description_consultant : null,
    };

    sendReferral({
      form: "ReferralReport",
      id: "dbdf2bad2182421fa4620c93a2dbb0c9",
      _data_: {
        AssociationReferral,
        id: +isModalOpen?.id,
      },
    })
      .unwrap()
      .then(sendReferralOnSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="ارجاع گزارش"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={500}
          className="committee-referral-report-modal-container"
        >
          <Form form={form}>
            <div className="modal-body-container">
              <ReferralItem
                defaultChecked={false}
                title="حراست"
                reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                form={form}
                sectionName="security"
                reasonReferralLoading={isReasonReferralFetching}
              />
              <ReferralItem
                defaultChecked={false}
                title="معاونت پژوهشی"
                reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                form={form}
                sectionName="research"
                reasonReferralLoading={isReasonReferralFetching}
              />
              <ReferralItem
                defaultChecked={false}
                title="معاونت آموزشی"
                reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                form={form}
                sectionName="education"
                reasonReferralLoading={isReasonReferralFetching}
              />
              <ReferralItem
                defaultChecked={false}
                title="معاونت دانشجویی"
                reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                form={form}
                sectionName="student"
                reasonReferralLoading={isReasonReferralFetching}
              />
            </div>
            <div className="submit-buttons-container">
              <CustomButton
                type="primary"
                className="custom-btn"
                htmlType="submit"
                onClick={referralHandler}
                loading={isSendReferralLoading}
              >
                ارجاع
              </CustomButton>
              <CustomButton className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </CustomButton>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ReferralModal;
