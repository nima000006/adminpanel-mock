import { useEffect } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import {
  ConfirmationVerdictModalType,
  ConfirmationVerdictResponse,
} from "./@types/@ConfirmationVerdict";
import {
  useConfirmationVerdictMutation,
  useLazyGetReasonConfirmingVerdictQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import "./_confirmationVerdict.scss";

const CONFIRMATION_VERDICT_SUCCESS_MSG = "تایید حکم با موفقیت انجام شد.";

const ConfirmationVerdictModal = ({
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
}: ConfirmationVerdictModalType) => {
  const [confirmingVerdictForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getReasonConfirmingVerdict,
    { data: reasonConfirmingVerdictData, isLoading: isReasonConfirmingVerdictLoading },
  ] = useLazyGetReasonConfirmingVerdictQuery();

  const [confirmingVerdict, { isLoading: isConfirmingVerdictLoading }] =
    useConfirmationVerdictMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isConfirmationModalOpen?.isOpen) {
      getReasonConfirmingVerdict();
    }
  }, [isConfirmationModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const confirmationHandler = (event: {
    rejectReportReason: { children: string };
    rejectReportDescription: string;
  }) => {
    confirmingVerdict({
      form: "ConfirmationVerdict",
      id: "f92cf72312e047e9a97692d18fba2df2",
      _data_: {
        AssociationSessionProblems: {
          reasonConfirmationVerdict: event?.rejectReportReason?.children,
          confirmationVerdict: true,
          descConfirmationVerdict: event?.rejectReportDescription,
        },
        id: isConfirmationModalOpen?.id,
      },
    })
      .unwrap()
      .then(confirmationVerdictOnSuccess);
  };

  const confirmationVerdictOnSuccess = async (value: ConfirmationVerdictResponse) => {
    if (value?.status === 200) {
      toast.success(CONFIRMATION_VERDICT_SUCCESS_MSG, {
        toastId: CONFIRMATION_VERDICT_SUCCESS_MSG,
      });
      closeModalHandler();
    }
  };
  const closeModalHandler = () => {
    setIsConfirmationModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isConfirmationModalOpen?.isOpen && (
        <Modal
          title="تایید حکم"
          open={isConfirmationModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="session-confirm-verdict-modal"
        >
          <Form onFinish={confirmationHandler} form={confirmingVerdictForm}>
            <CustomCard className="box-wrapper">
              <CustomSelect
                label="دلیل"
                name="rejectReportReason"
                options={reasonConfirmingVerdictData?.data}
                placeholder="انتخاب کنید"
                form={confirmingVerdictForm}
                isLoading={isReasonConfirmingVerdictLoading}
              />
              <CustomTextArea
                label="توضیحات"
                name="rejectReportDescription"
                placeholder="توضیحات"
              />
            </CustomCard>
            <div className="btn-wrapper">
              <Button
                type="primary"
                danger
                className="btn-modal"
                htmlType="submit"
                loading={isConfirmingVerdictLoading}
              >
                تایید حکم
              </Button>
              <Button
                type="primary"
                ghost
                onClick={closeModalHandler}
                className="btn-modal"
              >
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ConfirmationVerdictModal;
