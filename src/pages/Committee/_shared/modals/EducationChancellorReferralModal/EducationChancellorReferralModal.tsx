import { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import { ReferralModalForm } from "@components/Committee/Committee/AdditionalResearch/ResearchChancellor/Modals/ResearchChancellorReferralModal/@types/@researchChancellorReferralModal";
import CustomCard from "@components/CustomCard/CustomCard";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { TitleReferralModal } from "@components/Modals/Committee/AccusationCase/AccusationCaseReferralModal/@type/@accusationCaseReferralModal";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import {
  useLazyGetTitleEducationChancellorReferralModalQuery,
  useSendEducationChancellorReferralModalMutation,
} from "@infra/states/redux/Apis/committee/committees/committees";
import { useLazyGetReasonsReferralQuery } from "@infra/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import {
  ReferralReportItemProps,
  ReferralReportModalProps,
  SendEducationChancellorReferralModalResponse,
} from "./@types/@educationChancellorReferralModal";
import "./_educationChancellorReferralModal.scss";

const SEND_REFERRAL_SUCCESS_MSG = "ارجاع با موفقیت انجام شد.";

const ReferralReportItem = ({
  defaultChecked,
  title,
  reasonList,
  form,
  sectionName,
}: ReferralReportItemProps) => {
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
            name="reason_research"
            options={reasonList}
            form={form}
            {...{ placeholder: "انتخاب کنید" }}
          />
          <CustomTextArea
            label="توضیحات"
            name="description_research"
            placeholder="توضیحات"
          />
        </div>
      )}
    </CustomCard>
  );
};

const EducationChancellorReferralModal = ({
  isModalOpen,
  closeModalHandler,
}: ReferralReportModalProps) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getTitleReferral, { data: titleReferralData }] =
    useLazyGetTitleEducationChancellorReferralModalQuery();

  // get reasons list
  const [getReasonsReferral, { data: reasonsReferralData }] =
    useLazyGetReasonsReferralQuery();

  // send referral modal
  const [sendReferral, { isLoading: isSendReferralLoading }] =
    useSendEducationChancellorReferralModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getReasonsReferral();
      getTitleReferral();
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const onSendReferralSuccess = async (
    value?: SendEducationChancellorReferralModalResponse
  ) => {
    if (value?.status === 200) {
      closeModalHandler();
      toast.success(SEND_REFERRAL_SUCCESS_MSG, {
        toastId: SEND_REFERRAL_SUCCESS_MSG,
      });
      form.resetFields();
    }
  };

  const onFormSubmit = (values: ReferralModalForm) => {
    sendReferral({
      form: "RefToOfficeResearchAssis",
      id: "d5fea3e9c5ea4aecb30e01ca3cccce02",
      _data_: {
        id: +isModalOpen?.id,
        AssociationSecondReferral: {
          reasonRefToOfficeEducAssis: values?.reason_research.label,
          descRefeToOfficeEducAssis: values?.description_research,
          dateRefToOfficeEducAssis: new Date().toISOString(),
          refToOfficeEducAssis: values?.toBePresent_research,
        },
      },
    })
      .unwrap()
      .then(onSendReferralSuccess);
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
          centered={true}
          className="committee-education-chancellor-referral-modal-container"
        >
          <Form form={form} onFinish={onFormSubmit}>
            <div className="modal-body-container">
              {titleReferralData?.data?.map((item: TitleReferralModal) => (
                <ReferralReportItem
                  defaultChecked={false}
                  title={item.title}
                  reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                  form={form}
                  sectionName="research"
                  key={item?.id}
                />
              ))}
            </div>
            <div className="submit-buttons-container">
              <Button
                type="primary"
                className="custom-btn"
                htmlType="submit"
                // onClick={referralHandler}
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

export default EducationChancellorReferralModal;
