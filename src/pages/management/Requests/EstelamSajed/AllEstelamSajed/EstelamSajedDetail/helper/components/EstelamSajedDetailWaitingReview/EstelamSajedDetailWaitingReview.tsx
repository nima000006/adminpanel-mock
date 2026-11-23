import { useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useAcceptRejectSajedRequestMutation } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE,
  ESTELAM_SAJED_REJECT_ACCEPT_STATUS,
  ESTELAM_SAJED_REJECT_SUCCESS_MESSAGE,
} from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { AcceptRejectSajedRequest } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailWaitingReview/@types/@estelamSajedDetailWaitingReviewTypes";

import EstelamSajedRejectDrawerContent from "./helper/drawers/EstelamSajedReject/EstelamSajedRejectDrawerContent";
import "./_estelamSajedDetailWaitingReview.scss";

const EstelamSajedDetailWaitingReview = () => {
  const [isRejectDrawerOpen, setIsRejectDrawerOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);

  const {
    params: { id },
  } = useQueryParams();

  const navigate = useNavigate();

  const [rejectForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [updateAcceptReject, { isLoading: isUpdateAcceptRejectLoading }] =
    useAcceptRejectSajedRequestMutation();

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
          status: ESTELAM_SAJED_REJECT_ACCEPT_STATUS.rejected,
          rejectReasonRequest: value?.rejectReason?.item?.name ?? "",
          ...(trimmedDescription && { description: trimmedDescription }),
        } satisfies AcceptRejectSajedRequest;

        updateAcceptReject(requestBody)
          .unwrap()
          .then(() => {
            closeRejectDrawerHandler();

            toast.success(ESTELAM_SAJED_REJECT_SUCCESS_MESSAGE, {
              toastId: ESTELAM_SAJED_REJECT_SUCCESS_MESSAGE,
            });

            navigate({
              pathname: MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE,
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
        status: ESTELAM_SAJED_REJECT_ACCEPT_STATUS.accepted,
      } satisfies AcceptRejectSajedRequest)
        .unwrap()
        .then(() => {
          closeConfirmedModalHandler();

          toast.success(ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE, {
            toastId: ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE,
          });

          navigate({
            pathname: MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE,
          });
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isRejectDrawerOpen && (
        <CustomDrawer
          onClose={closeRejectDrawerHandler}
          open={isRejectDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <EstelamSajedRejectDrawerContent
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
            <p className="estelam-sajed-confirmed-modal-content">
              در صورت تأیید این درخواست، کاربر مورد نظر می‌تواند به صورت موقت با اطلاعاتی
              که ثبت کرده است تا استعلام بعدی از ساجد استفاده نماید.
            </p>
          }
        />
      )}
      <div className="estelam-sajed-detail-waiting-review">
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

export default EstelamSajedDetailWaitingReview;
