import { useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useAllAcceptRejectAmozeshyarRequestMutation } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ESTELAM_AMOZESHYAR_ACCEPT_SUCCESS_MESSAGE,
  ESTELAM_AMOZESHYAR_REJECT_ACCEPT_STATUS,
  ESTELAM_AMOZESHYAR_REJECT_SUCCESS_MESSAGE,
} from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";

import { AllAcceptRejectAmozeshyarRequestRequest } from "./@types/@estelamAmozeshyarDetailWaitingReview";
import EstelamAmozeshyarRejectDrawerContent from "./helper/drawers/EstelamAmozeshyarReject/EstelamAmozeshyarRejectDrawerContent";
import "./_estelamAmozeshyarDetailWaitingReview.scss";

const EstelamAmozeshyarDetailWaitingReview = () => {
  const [isRejectDrawerOpen, setIsRejectDrawerOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);

  const {
    params: { id },
  } = useQueryParams();

  const navigate = useNavigate();

  const [rejectForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [updateAcceptReject, { isLoading: isUpdateAcceptRejectLoading }] =
    useAllAcceptRejectAmozeshyarRequestMutation();

  //* ================================ Util Functions ================================
  //Reject
  const openRejectDrawerHandler = () => setIsRejectDrawerOpen(true);
  const closeRejectDrawerHandler = () => {
    setIsRejectDrawerOpen(false);
    rejectForm.resetFields();
  };

  const rejectRequestHandler = () => {
    if (id) {
      rejectForm.validateFields().then((value) => {
        const trimmedDescription = (value?.description ?? "").trim();
        const requestBody = {
          id: +id,
          status: ESTELAM_AMOZESHYAR_REJECT_ACCEPT_STATUS.rejected,
          rejectReasonRequest: value?.rejectReason?.item?.name ?? "",
          ...(trimmedDescription && { description: trimmedDescription }),
        } satisfies AllAcceptRejectAmozeshyarRequestRequest;

        updateAcceptReject(requestBody)
          .unwrap()
          .then(() => {
            closeRejectDrawerHandler();

            toast.success(ESTELAM_AMOZESHYAR_REJECT_SUCCESS_MESSAGE, {
              toastId: ESTELAM_AMOZESHYAR_REJECT_SUCCESS_MESSAGE,
            });

            navigate({
              pathname: MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
            });
          });
      });
    }
  };

  //Accept
  const openConfirmedModalHandler = () => setIsConfirmedModalOpen(true);
  const closeConfirmedModalHandler = () => setIsConfirmedModalOpen(false);

  const acceptRequestHandler = () => {
    if (id) {
      updateAcceptReject({
        id: +id,
        status: ESTELAM_AMOZESHYAR_REJECT_ACCEPT_STATUS.accepted,
      } satisfies AllAcceptRejectAmozeshyarRequestRequest)
        .unwrap()
        .then(() => {
          closeConfirmedModalHandler();

          toast.success(ESTELAM_AMOZESHYAR_ACCEPT_SUCCESS_MESSAGE, {
            toastId: ESTELAM_AMOZESHYAR_ACCEPT_SUCCESS_MESSAGE,
          });

          navigate({
            pathname: MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
          });
        });
    }
  };

  return (
    <>
      {isRejectDrawerOpen && (
        <CustomDrawer
          onClose={closeRejectDrawerHandler}
          open={isRejectDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <EstelamAmozeshyarRejectDrawerContent
              closeDrawerHandler={closeRejectDrawerHandler}
              rejectRequestHandler={rejectRequestHandler}
              form={rejectForm}
            />
          }
        />
      )}
      {isConfirmedModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmedModalOpen}
          closeModalHandler={closeConfirmedModalHandler}
          onConfirmClickHandler={acceptRequestHandler}
          confirmBtnText="تایید درخواست"
          backBtnText="انصراف"
          title="آیا از تأیید درخواست اطمینان کافی دارید؟"
          isConfirmButtonLoading={isUpdateAcceptRejectLoading}
          content={
            <p className="estelam-amozeshyar-confirmed-modal-content">
              در صورت تأیید این درخواست، کاربر مورد نظر می‌تواند به صورت موقت با اطلاعاتی
              که ثبت کرده است تا استعلام بعدی از دانشجویار استفاده نماید.
            </p>
          }
        />
      )}
      <div className="estelam-amozeshyar-detail-waiting-review">
        <CustomButton type="primary" danger onClick={openRejectDrawerHandler}>
          رد درخواست
        </CustomButton>
        <CustomButton type="primary" onClick={openConfirmedModalHandler}>
          تایید درخواست
        </CustomButton>
      </div>
    </>
  );
};

export default EstelamAmozeshyarDetailWaitingReview;
