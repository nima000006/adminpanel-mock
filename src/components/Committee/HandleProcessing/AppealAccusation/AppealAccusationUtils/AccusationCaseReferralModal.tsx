import { useEffect, useState } from "react";

import { Button, Col, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import {
  AccusationCaseReferralModalProps,
  ReferralItemProps,
  ReferralModalFormData,
  SendAccusationReferralAppealResponse,
} from "./@types/@accusationCaseReferralModal";
import {
  useLazyGetReasonsReferralQuery,
  useSendAccusationReferralAppealMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SEND_REFERRAL_SUCCESS_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_accusationCaseReferralModal.scss";

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

const AccusationCaseReferralModal = ({
  isModalOpen,
  closeModalHandler,
}: AccusationCaseReferralModalProps) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getReasonsReferral,
    { data: reasonsReferralData, isFetching: isReasonReferralFetching },
  ] = useLazyGetReasonsReferralQuery();

  const [sendReferral, { isLoading: isSendReferralLoading }] =
    useSendAccusationReferralAppealMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getReasonsReferral();
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const sendReferralOnSuccess = async (value: SendAccusationReferralAppealResponse) => {
    if (value?.status === 200) {
      closeModalHandler();
      toast.success(SEND_REFERRAL_SUCCESS_MSG, {
        toastId: SEND_REFERRAL_SUCCESS_MSG,
      });
    }
  };

  const referralHandler = () => {
    form.submit();

    form?.validateFields().then((value: ReferralModalFormData) => {
      const AssociationReferral = {
        //حراست
        appealReferralToCustody: value?.toBePresent_security ? true : false,
        reasonReferralToCustody: value?.toBePresent_security
          ? value?.reason_security?.children
          : null,
        dateAppealSecurity: value?.toBePresent_security ? new Date().toISOString() : null,
        descReferralToCustody: value?.toBePresent_security
          ? value?.description_security
          : null,
        //معاونت پژوهشی
        appealReferralToResearchAssistant: value?.toBePresent_research ? true : false,
        appealReasonReferralToResearchAssistant: value?.toBePresent_research
          ? value?.reason_research?.children
          : null,
        dateAppealResearchAssistant: value?.toBePresent_research
          ? new Date().toISOString()
          : null,
        appealDescReferralToResearchAssistant: value?.toBePresent_research
          ? value?.description_research
          : null,
        // معاونت آموزشی
        appealReferralToEducAssistant: value?.toBePresent_education ? true : false,
        appealReasonReferralToEducAssistant: value?.toBePresent_education
          ? value?.reason_education?.children
          : null,
        dateAppealEducationalAssistant: value?.toBePresent_education
          ? new Date().toISOString()
          : null,
        appealDescReferralToEducAssistant: value?.toBePresent_education
          ? value?.description_education
          : null,
        //معاونت دانشجویی
        appealReferralToStudentVice: value?.toBePresent_student ? true : false,
        appealReasonReferralToStudentVice: value?.toBePresent_student
          ? value?.reason_student?.children
          : null,
        dateAppealStudentVice: value?.toBePresent_student
          ? new Date().toISOString()
          : null,
        appealDescReferralToStudentVice: value?.toBePresent_student
          ? value?.description_student
          : null,
      };

      sendReferral({
        form: "ReferralCharges",
        id: "26ba82ea702c4838b6390d16db1e76a8",
        _data_: {
          AssociationReferral,
          id: +isModalOpen?.id,
        },
      })
        .unwrap()
        .then(sendReferralOnSuccess);
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="ارجاع اتهام"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={500}
          className="accusation-case-referral-appeal-modal-container"
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
              <Button
                type="primary"
                className="custom-btn"
                htmlType="submit"
                onClick={referralHandler}
                loading={isSendReferralLoading}
              >
                ارجاع
              </Button>
              <Button className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AccusationCaseReferralModal;
