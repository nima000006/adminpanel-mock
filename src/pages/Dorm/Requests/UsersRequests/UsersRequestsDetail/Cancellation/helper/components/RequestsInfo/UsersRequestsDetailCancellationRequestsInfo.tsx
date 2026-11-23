import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsStatusMutation,
  useGetDormCancellationStatusMutation,
  useLazyGetDormRequestInformationQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import CancellationRequestsInfoConfirmModalContent from "./helper/modals/CancellationRequestsInfoConfirmModalContent/CancellationRequestsInfoConfirmModalContent";
import CancellationRequestsInfoRejectModalContent from "./helper/modals/CancellationRequestsInfoRejectModalContent/CancellationRequestsInfoRejectModalContent";
import {
  DormRequestInformationType,
  DormRequestsStatusResponse,
  GetDormCancellationStatusResponse,
  GetDormRequestInformationResponse,
} from "../../../../@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "../../../../_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "../../../../_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";

import "./_usersRequestsDetailCancellationRequestsInfo.scss";

const cancellingStatus = {
  request: 1,
  accept: 2,
  reject: 3,
};

const ACCEPT_CODE = "1";
const REJECT_CODE = "2";

const UsersRequestsDetailCancellationRequestsInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { params, setSearchParams } = useQueryParams();
  const { id, cancellationStatus } = params;

  const [rejectForm] = Form.useForm<{ description: string }>();
  const [confirmedForm] = Form.useForm<{ description: string }>();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [getDormCancellationStatus] = useGetDormCancellationStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRequestInfo();
  }, [id]);

  //* ================================ Util Functions ================================
  const getRequestInfo = () => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
    }
  };

  const getDormRequestInformationSuccess = (value: GetDormRequestInformationResponse) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  //modal
  const openRejectModalHandler = () => setIsRejectModalOpen(true);
  const closeRejectModalHandler = () => setIsRejectModalOpen(false);

  const openConfirmModalHandler = () => setIsConfirmModalOpen(true);
  const closeConfirmModalHandler = () => setIsConfirmModalOpen(false);

  const acceptRequestHandler = () => {
    confirmedForm?.submit?.();
    confirmedForm.validateFields().then(() => {
      requestStatusHandler(confirmedForm?.getFieldValue("description"), ACCEPT_CODE);
    });
  };
  const rejectRequestHandler = () => {
    rejectForm?.submit?.();
    rejectForm.validateFields().then(() => {
      requestStatusHandler(rejectForm?.getFieldValue("description"), REJECT_CODE);
    });
  };

  const requestStatusHandler = (desc: string, code: string) => {
    if (id) {
      getDormCancellationStatus({
        processVariables: [{ name: "id", operator: "eq", value: +id }],
        taskVariables: [],
        firstResult: 0,
        maxResults: 15,
        sorting: [{ sortBy: "created", sortOrder: "desc" }],
        active: true,
        readStatus: true,
      })
        .unwrap()
        .then((value) => getDormCancellationStatusSuccess(value, desc, code));
    }
  };

  const getDormCancellationStatusSuccess = async (
    value: GetDormCancellationStatusResponse,
    desc: string,
    code: string
  ) => {
    if (value?.status === 200) {
      dormRequestsStatus({
        body: {
          variables: {
            validation: {
              value: code,
            },
            adminDescCancellationRequest: {
              value: desc,
            },
          },
        },
        statusCode: value?.data?.[0]?.id,
      })
        .unwrap()
        .then((value) => dormRequestsStatusSuccess(value, code));
    }
  };

  const dormRequestsStatusSuccess = (value: DormRequestsStatusResponse, code: string) => {
    if (value?.status === 204) {
      if (code === ACCEPT_CODE) {
        confirmedForm.resetFields();
        closeConfirmModalHandler();
        setSearchParams({ ...params, cancellationStatus: "2" });
      } else {
        rejectForm.resetFields();
        closeRejectModalHandler();
        setSearchParams({ ...params, cancellationStatus: "3" });
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* CANCELLING REJECT MODAL */}
      {isRejectModalOpen && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isModalOpen={isRejectModalOpen}
          isDangerous
          onConfirmClickHandler={rejectRequestHandler}
          closeModalHandler={closeRejectModalHandler}
          isConfirmButtonLoading={isDormStatusLoading}
          content={<CancellationRequestsInfoRejectModalContent form={rejectForm} />}
        />
      )}

      {/* CANCELLING CONFIRMATION MODAL */}
      {isConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="تأیید کنسلی"
          backBtnText="انصراف"
          confirmBtnText="تأیید کنسلی"
          isModalOpen={isConfirmModalOpen}
          onConfirmClickHandler={acceptRequestHandler}
          closeModalHandler={closeConfirmModalHandler}
          isConfirmButtonLoading={isDormStatusLoading}
          content={<CancellationRequestsInfoConfirmModalContent form={confirmedForm} />}
        />
      )}

      <Div
        loading={isDormRequestInformationLoading}
        className="users-requests-detail-cancellation-requests-info-container"
      >
        <CustomAlert
          type={
            +cancellationStatus === cancellingStatus?.request
              ? "warning"
              : +cancellationStatus === cancellingStatus?.accept
                ? "info"
                : "error"
          }
          showIcon
          description={
            +cancellationStatus === cancellingStatus?.request
              ? `کاربر در تاریخ ${dataPlaceHolder({ data: requestInformation?.cancellationDate, isDate: true })} برای این درخواست تقاضای کنسلی داشته است، لطفاً وضعیت درخواست را بررسی و مراحل کنسلی را نهایی نمایید.`
              : +cancellationStatus === cancellingStatus?.accept
                ? `درخواست کنسلی کاربر در تاریخ ${dataPlaceHolder({ data: requestInformation?.cancellationRequestReviewDate, isDate: true })} توسط ادمین مورد تأیید قرار گرفت.`
                : `درخواست کنسلی کاربر در تاریخ ${dataPlaceHolder({ data: requestInformation?.cancellationRequestReviewDate, isDate: true })} توسط ادمین مورد تأیید واقع نشد.`
          }
          className="alert"
          closable
        />

        {requestInformation && (
          <>
            <UsersRequestsDetailApplicantInfo data={requestInformation} />
            <UsersRequestsDetailRequestsInfo
              data={requestInformation}
              from="cancellation"
            />
          </>
        )}

        {+cancellationStatus === cancellingStatus.request && (
          <div className="action-btn-container">
            <CustomButton danger onClick={openRejectModalHandler}>
              رد درخواست
            </CustomButton>
            <CustomButton type="primary" onClick={openConfirmModalHandler}>
              تأیید کنسلی
            </CustomButton>
          </div>
        )}
      </Div>
    </>
  );
};

export default UsersRequestsDetailCancellationRequestsInfo;
