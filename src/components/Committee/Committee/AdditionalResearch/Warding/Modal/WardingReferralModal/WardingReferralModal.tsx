import { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import {
  ReferralReportItemProps,
  ReferralReportModalProps,
  SendWardingReferralResponse,
} from "./@types/@wardingReferralModal";
import { useSendWardingReferralModalMutation } from "../../../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useLazyGetReasonsReferralQuery,
  useLazyGetTitleReferralModalQuery,
} from "../../../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../../../CustomInputs/CustomTextArea/CustomTextArea";
import { TitleReferralModal } from "../../../../../../Modals/Committee/AccusationCase/AccusationCaseReferralModal/@type/@accusationCaseReferralModal";
import CustomDivider from "../../../../../../Renderers/CustomDivider/CustomDivider";
import { ReferralModalForm } from "../../../ResearchChancellor/Modals/ResearchChancellorReferralModal/@types/@researchChancellorReferralModal";
import "./_wardingReferralModal.scss";

const SEND_REFERRAL_SUCCESS_MSG = "ارجاع با موفقیت انجام شد.";

const ReferralReportItem = ({
  defaultChecked,
  title,
  reasonList,
  form,
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
          <CustomSwitch valuePropName="toBePresent_research" onChange={checkedHandler} />
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

const WardingReferralModal = ({
  isModalOpen,
  closeModalHandler,
}: ReferralReportModalProps) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getTitleReferral, { data: titleReferralData }] =
    useLazyGetTitleReferralModalQuery();

  // get reasons list
  const [getReasonsReferral, { data: reasonsReferralData }] =
    useLazyGetReasonsReferralQuery();

  // send referral modal
  const [sendReferral, { isLoading: isSendReferralLoading }] =
    useSendWardingReferralModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getReasonsReferral();
      getTitleReferral();
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const onSendWardingReferralSuccess = async (value?: SendWardingReferralResponse) => {
    if (value?.status === 200) {
      closeModalHandler();
      toast.success(SEND_REFERRAL_SUCCESS_MSG, {
        toastId: SEND_REFERRAL_SUCCESS_MSG,
      });
    }
  };

  const onFormSubmit = (values: ReferralModalForm) => {
    sendReferral({
      form: "RefToOfficeSecurity",
      id: "fb582907152549d4a44967e8eece3d88",
      _data_: {
        id: +isModalOpen?.id,
        AssociationSecondReferral: {
          reasonRefToOfficeSecurity: values?.reason_research.label,
          descRefToOfficeSecurity: values?.description_research,
          dateRefToOfficeSecurity: new Date().toISOString(),
          refToOfficeSecurity: values?.toBePresent_research,
        },
      },
    })
      .unwrap()
      .then(onSendWardingReferralSuccess);
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
          className="committee-warding-referral-modal-container"
        >
          <Form form={form} onFinish={onFormSubmit}>
            <div className="modal-body-container">
              {titleReferralData?.data?.map((item: TitleReferralModal) => (
                <ReferralReportItem
                  defaultChecked={false}
                  title={item.title}
                  reasonList={reasonsReferralData?.data ? reasonsReferralData?.data : []}
                  form={form}
                  key={item?.id}
                />
              ))}
            </div>
            <div className="submit-buttons-container">
              <Button
                type="primary"
                className="custom-btn"
                htmlType="submit"
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

export default WardingReferralModal;
