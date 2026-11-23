import { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import {
  AccusationCaseReferralModalProps,
  ReferralItemProps,
  SendReferralResponse,
} from "./@type/@accusationCaseReferralModal";
import {
  useLazyGetReasonsReferralQuery,
  useSendReferralMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
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

  //* ================================ Util Functions ================================
  const checkedHandler = () => setIsChecked(!isChecked);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
        <div className="inputs-container">
          <CustomSelect
            label="دلیل"
            name={`reason_${sectionName}`}
            options={reasonList}
            form={form}
            placeholder="انتخاب کنید"
            isLoading={reasonReferralLoading}
          />
          <CustomTextArea
            label="توضیحات"
            name={`description_${sectionName}`}
            placeholder="توضیحات"
          />
        </div>
      )}
    </CustomCard>
  );
};

const SEND_REFERRAL_SUCCESS_MSG = "ارجاع با موفقیت انجام شد.";

const AccusationCaseReferralModal = ({
  isModalOpen,
  closeModalHandler,
}: AccusationCaseReferralModalProps) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  // const [getTitleReferral, { data: titleReferralData }] =
  //   useLazyGetTitleReferralModalQuery();

  // get reasons list
  const [
    getReasonsReferral,
    { data: reasonsReferralData, isFetching: isReasonReferralFetching },
  ] = useLazyGetReasonsReferralQuery();

  // send referral
  const [sendReferral, { isLoading: isSendReferralLoading }] = useSendReferralMutation();

  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getReasonsReferral();
      // getTitleReferral();
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const sendReferralOnSuccess = async (value?: SendReferralResponse) => {
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
    } = form.getFieldsValue();

    const AssociationReferral = {
      //حراست
      sentToSecurity: toBePresent_security ? true : false,
      reasonSecurity: toBePresent_security ? reason_security?.children : null,
      dateSentToSecurity: toBePresent_security ? new Date().toISOString() : null,
      descProtection: toBePresent_security ? description_security : null,
      //معاونت پژوهشی
      sentToResearchAssistant: toBePresent_research ? true : false,
      reasonResearchAssistant: toBePresent_research ? reason_research?.children : null,
      dateSentToResearchAssistant: toBePresent_research ? new Date().toISOString() : null,
      descResearchAsistant: toBePresent_research ? description_research : null,
      // معاونت آموزشی
      sentToEducationalAssistant: toBePresent_education ? true : false,
      reasonEducAssistant: toBePresent_education ? reason_education?.children : null,
      dateSentToEducationalAssistant: toBePresent_education
        ? new Date().toISOString()
        : null,
      descEducAssistant: toBePresent_education ? description_education : null,
      //معاونت دانشجویی
      sentToStudentVice: toBePresent_student ? true : false,
      reasonStudentPresident: toBePresent_student ? reason_student?.children : null,
      dateSentToStudentVice: toBePresent_student ? new Date().toISOString() : null,
      descStudentPresident: toBePresent_student ? description_student : null,
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
          centered={true}
          className="accusation-case-referral-modal-container"
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
