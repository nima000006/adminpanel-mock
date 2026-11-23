import { useState } from "react";

import { Form, Modal } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/business";
import {
  useAcceptBusinessRequestMutation,
  useRejectOrReturnBusinessRequestMutation,
} from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ActionType } from "./@types/@actionType";

import "./_businessRequestsDetailAnswerRequestInfo.scss";

const modalConfig: Record<
  ActionType,
  {
    title: string;
    status: string;
    buttonText: string;
    isWarning?: boolean;
    danger?: boolean;
  }
> = {
  accept: { title: "تأیید درخواست", status: "تأیید شده", buttonText: "تأیید درخواست" },
  reject: {
    title: "رد درخواست",
    status: "رد شده",
    buttonText: "رد درخواست",
    danger: true,
  },
  return: {
    title: "عودت درخواست ایجاد کسب و کار",
    status: "عودت شده",
    buttonText: "عودت",
    isWarning: true,
  },
};

const BusinessRequestsDetailAnswerRequestInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null);
  const [form] = Form.useForm<{ description: string }>();
  const navigate = useNavigate();
  const {
    params: { businessTempHistoryId, statusId },
  } = useQueryParams();

  //? ================================ Api ================================
  const [acceptBusinessRequest] = useAcceptBusinessRequestMutation();
  const [rejectOrReturnBusinessRequest] = useRejectOrReturnBusinessRequestMutation();

  // ================================ Util functions ================================

  const openModal = (action: ActionType) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setCurrentAction(null);
  };

  const handleSubmit = () => {
    if (!currentAction) return;
    const id = Number(businessTempHistoryId);
    if (!id || isNaN(id)) {
      toast.error("شناسه درخواست نامعتبر است.", {
        toastId: "شناسه درخواست نامعتبر است.",
      });
      return;
    } else {
      rejectOrReturnBusinessRequest({
        businessTempHistoryId: +businessTempHistoryId,
        statusId: +statusId,
      })
        .unwrap()
        .then(() => {
          toast.success(`درخواست با موفقیت ${modalConfig[currentAction].status} شد.`);
          handleCancel();
          navigate(MANAGEMENT_REQUESTS_PAGE_ROUTE);
        });
    }

    if (currentAction === "accept") {
      acceptBusinessRequest({ businessTempHistoryId: id })
        .unwrap()
        .then(() => {
          toast.success("درخواست با موفقیت تأیید شد.", {
            toastId: "درخواست با موفقیت تأیید شد.",
          });
          handleCancel();
          navigate(MANAGEMENT_REQUESTS_PAGE_ROUTE);
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {currentAction && (
        <Modal
          title={modalConfig[currentAction].title}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className="business-requests-details-answer-request-modal-container"
        >
          <Form form={form} onFinish={handleSubmit}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="لطفاً توضیحات لازم را وارد نمایید."
              rules={[REQUIRED_RULE]}
              maxLength={1024}
              showCount
              className="custom-text-area"
            />
            <div className="btn-modal-actions">
              <CustomButton onClick={handleCancel}>انصراف</CustomButton>
              <CustomButton
                htmlType="submit"
                type="primary"
                isWarning={modalConfig[currentAction].isWarning}
                danger={modalConfig[currentAction].danger}
              >
                {modalConfig[currentAction].buttonText}
              </CustomButton>
            </div>
          </Form>
        </Modal>
      )}

      <div className="business-requests-details-answer-request-container">
        <CustomAlert
          showIcon
          message="لطفاً قبل از تصمیم گیری نهایی “اطلاعات کسب و کار” و “ اطلاعات شعبه” را به دقت بررسی فرمایید."
          type="warning"
          className="custom-alert"
        />
        <CustomAlert
          showIcon
          message="توضیحات"
          description={
            <ul className="custom-list">
              <li>عودت درخواست: در صورت مشاهده مغایرت جزئی...</li>
              <li>رد درخواست: در صورت مشاهده مغایرت کامل...</li>
              <li>تأیید درخواست: در صورت صحت کامل اطلاعات...</li>
            </ul>
          }
          type="info"
          className="custom-alert custom-alert-duplicate"
        />
        <ToolBox
          className="custom-actions-container"
          rightSide={
            <div className="btn-container">
              <CustomButton type="primary" isWarning onClick={() => openModal("return")}>
                عودت
              </CustomButton>
              <CustomButton type="primary" danger onClick={() => openModal("reject")}>
                رد درخواست
              </CustomButton>
            </div>
          }
          leftSide={
            <CustomButton type="primary" onClick={() => openModal("accept")}>
              تأیید درخواست
            </CustomButton>
          }
        />
      </div>
    </>
  );
};

export default BusinessRequestsDetailAnswerRequestInfo;
