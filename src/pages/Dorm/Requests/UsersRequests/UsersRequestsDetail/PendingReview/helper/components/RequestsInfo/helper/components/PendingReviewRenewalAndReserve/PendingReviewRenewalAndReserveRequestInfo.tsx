import { useEffect, useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestInformationQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  DormRequestInformationType,
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestInformationResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";

import ReservationRejectRequestModalContent from "../../../../RoomAllocation/helper/sections/RenewalAndReserve/DormReservation/helper/modals/ReservationRejectRequestModalContent/ReservationRejectRequestModalContent";

const REJECT_SUCCESS_MSG = "درخواست مورد نظر رد شد.";

const PendingReviewRenewalAndReserveRequestInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [reserveRejectRequest, setRejectRejectRequest] = useState(false);
  const [disableRejectBtn, setDisableRejectBtn] = useState(false);

  const {
    params: { id },
  } = useQueryParams();
  const [reserveRejectForm] = Form.useForm<{ description: string }>();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [getDormPendingReviewStatus] = useGetDormPendingReviewStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormRequestInformationSuccess = (value: GetDormRequestInformationResponse) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  const reserveRejectRequestHandler = () => {
    reserveRejectForm.submit();
    reserveRejectForm.validateFields().then((value) => {
      if (id) {
        getDormPendingReviewStatus({
          processVariables: [{ name: "id", operator: "eq", value: +id }],
          taskVariables: [],
          firstResult: 0,
          maxResults: 15,
          sorting: [{ sortBy: "created", sortOrder: "desc" }],
          active: true,
          readStatus: true,
        })
          .unwrap()
          .then((res) =>
            getReserveDormPendingReviewStatusSuccess(res, value?.description)
          );
      }
    });
  };

  const getReserveDormPendingReviewStatusSuccess = async (
    res: GetDormPendingReviewStatusResponse,
    desc: string
  ) => {
    if (res?.status === 200) {
      dormRequestsStatus({
        body: {
          variables: {
            resultReview: {
              value: "3",
            },
            descAdmin: {
              value: desc,
            },
          },
        },
        statusCode: res?.data?.[0]?.id,
      })
        .unwrap()
        .then(dormReserveRequestsStatusSuccess);
    }
  };

  const dormReserveRequestsStatusSuccess = async (value: DormRequestsStatusResponse) => {
    if (value?.status === 204) {
      closeReserveRejectRequestHandler();
      toast.success(REJECT_SUCCESS_MSG, { toastId: REJECT_SUCCESS_MSG });
      setDisableRejectBtn(true);
    }
  };

  const openReserveRejectRequestHandler = () => setRejectRejectRequest(true);
  const closeReserveRejectRequestHandler = () => setRejectRejectRequest(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* REJECT MODAL */}
      {reserveRejectRequest && (
        <ConfirmationModalWithContent
          isModalOpen={reserveRejectRequest}
          closeModalHandler={closeReserveRejectRequestHandler}
          content={<ReservationRejectRequestModalContent form={reserveRejectForm} />}
          onConfirmClickHandler={reserveRejectRequestHandler}
          confirmBtnText="رد درخواست"
          backBtnText="انصراف"
          isDangerous
          title="رد درخواست"
          isConfirmButtonLoading={isDormStatusLoading}
        />
      )}
      <Div
        loading={isDormRequestInformationLoading}
        className="users-requests-detail-pending-review-requests-info-container"
      >
        {!disableRejectBtn ? (
          <CustomAlert
            type="warning"
            showIcon
            description={`این درخواست از تاریخ ${dataPlaceHolder({ data: requestInformation?.createDate, isDate: true })} در مرحله “در انتظار بررسی” است.`}
            className="alert"
            closable
          />
        ) : (
          <CustomAlert
            type="error"
            showIcon
            description={`این درخواست در تاریخ ${dataPlaceHolder({ data: requestInformation?.reservationRequestReviewDate, isDate: true })} توسط ادمین رد شده است.`}
            className="alert"
            closable
          />
        )}

        {requestInformation && (
          <>
            <UsersRequestsDetailApplicantInfo data={requestInformation} />
            <UsersRequestsDetailRequestsInfo data={requestInformation} />
          </>
        )}
        {!disableRejectBtn ? (
          <div className="action-btn-container">
            <CustomButton
              type="primary"
              ghost
              danger
              onClick={openReserveRejectRequestHandler}
            >
              رد درخواست
            </CustomButton>
          </div>
        ) : null}
      </Div>
    </>
  );
};

export default PendingReviewRenewalAndReserveRequestInfo;
