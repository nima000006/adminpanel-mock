import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingPaymentStatusMutation,
  useLazyGetDormRequestInformationQuery,
  useLazyGetDormRequestResidenceInfoQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import PendingPaymentRequestsInfoRejectModalContent from "./helper/modals/PendingPaymentRequestsInfoRejectModalContent/PendingPaymentRequestsInfoRejectModalContent";
import {
  DormRequestInformationType,
  DormRequestResidenceInfo,
  DormRequestsStatusResponse,
  GetDormPendingPaymentStatusResponse,
  GetDormRequestInformationResponse,
  GetDormRequestResidenceInfoResponse,
} from "../../../../@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "../../../../_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "../../../../_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";
import RequestMoreRoomDetail from "../../../../_shared/drawers/RequestMoreRoomDetail/helper/RequestMoreRoomDetail";

import "./_usersRequestsDetailPendingPaymentRequestsInfo.scss";

const REJECT_CODE = "3";

const UsersRequestsDetailPendingPaymentRequestsInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [residenceInfo, setResidenceInfo] = useState<DormRequestResidenceInfo | null>(
    null
  );
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [disableRejectBtn, setDisableRejectBtn] = useState(false);

  const [moreDetail, setMoreDetail] = useState(false);
  const [rejectForm] = Form.useForm<{ description: string }>();
  const { params, setSearchParams } = useQueryParams();
  const { id } = params;
  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [getDormRequestResidenceInfo, { isFetching: isDormRequestResidenceInfoLoading }] =
    useLazyGetDormRequestResidenceInfoQuery();

  const [getDormCancellationStatus] = useGetDormPendingPaymentStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
      getDormRequestResidenceInfo(id).unwrap().then(getDormRequestResidenceInfoSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormRequestResidenceInfoSuccess = async (
    value: GetDormRequestResidenceInfoResponse
  ) => {
    if (value?.status === 200) {
      setResidenceInfo(value?.data?.[0]);
    }
  };

  const getDormRequestInformationSuccess = async (
    value: GetDormRequestInformationResponse
  ) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  //modals
  const openMoreDetailHandler = () => setMoreDetail(true);
  const closeMoreDetailHandler = () => setMoreDetail(false);

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

  const rejectRequestHandler = () => {
    rejectForm?.submit?.();
    rejectForm.validateFields().then(() => {
      requestStatusHandler(rejectForm?.getFieldValue("description"), REJECT_CODE);
    });
  };

  const getDormCancellationStatusSuccess = async (
    res: GetDormPendingPaymentStatusResponse,
    desc: string,
    code: string
  ) => {
    if (res?.status === 200) {
      dormRequestsStatus({
        body: {
          variables: {
            actionResult: {
              value: REJECT_CODE,
            },
            descAdmin: {
              value: desc,
            },
          },
        },
        statusCode: res?.data?.[0]?.id,
      })
        .unwrap()
        .then((value) => dormRequestsStatusSuccess(value, code));
    }
  };

  const dormRequestsStatusSuccess = (value: DormRequestsStatusResponse, code: string) => {
    if (value?.status === 204) {
      if (code === REJECT_CODE) {
        rejectForm.resetFields();
        closeRejectModalHandler();
        setDisableRejectBtn(true);
        setSearchParams({ ...params, cancellationStatus: "3" });
      }
    }
  };

  const closeRejectModalHandler = () => setIsRejectModalOpen(false);
  const openRejectModalHandler = () => setIsRejectModalOpen(true);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* MORE DETAIL DRAWER */}
      {moreDetail && (
        <CustomDrawer
          onClose={closeMoreDetailHandler}
          open={moreDetail}
          content={
            <RequestMoreRoomDetail
              closeDrawerHandler={closeMoreDetailHandler}
              id={residenceInfo?.AssociationBed_roomId}
            />
          }
        />
      )}

      {/* REJECT MODAL */}
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
          content={<PendingPaymentRequestsInfoRejectModalContent form={rejectForm} />}
        />
      )}
      <div className="users-requests-detail-pending-payment-requests-info-container">
        <Div loading={isDormRequestInformationLoading} className="info-container">
          {disableRejectBtn ? (
            <CustomAlert
              type="error"
              showIcon
              description={`این درخواست در تاریخ ${dataPlaceHolder({ data: requestInformation?.reservationRequestReviewDate, isDate: true })} توسط ادمین رد شده است.`}
              className="alert"
              closable
            />
          ) : (
            <CustomAlert
              type="warning"
              showIcon
              description={`این درخواست از تاریخ ${dataPlaceHolder({ data: requestInformation?.createDate, isDate: true })} در مرحله “در انتظار پرداخت” است.`}
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
        </Div>
        <Div loading={isDormRequestResidenceInfoLoading}>
          <CustomDivider
            text="اتاق تخصیص داده شده"
            extraContent={
              <CustomButton
                onClick={openMoreDetailHandler}
                icon={<FaCaretLeft />}
                iconPlacement="end"
                type="text"
                className="extra-content-divider-btn"
              >
                جزئیات بیشتر
              </CustomButton>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نام اقامتگاه"
              value={
                residenceInfo?.AssociationCategoryDeliverPlan_AssociationDormitory_title
              }
            />
            <SingleVerticalWithCol
              label="نام ساختمان"
              value={residenceInfo?.AssociationBed_AssociationCategoryBuliding_title}
            />
            <SingleVerticalWithCol
              label="نام طبقه"
              value={residenceInfo?.AssociationBed_AssociationCategoryFloor_title}
            />
            <SingleVerticalWithCol
              label="نام اتاق"
              value={residenceInfo?.AssociationBed_AssociationCategorRoom_title}
            />
            <SingleVerticalWithCol
              label="جنسیت"
              value={
                residenceInfo?.AssociationBed_AssociationCategorRoom_AssociationGender_title
              }
            />
            <SingleVerticalWithCol
              label="تعداد استاندارد تخت در اتاق"
              value={residenceInfo?.AssociationBed_AssociationCategorRoom_numberStandardBedInRoom?.toString()}
            />
            <SingleVerticalWithCol
              label="تخت‌های فعال"
              value={residenceInfo?.CountActiveBeds?.toString()}
            />
            <SingleVerticalWithCol
              label="ظرفیت قابل رزرو"
              value={residenceInfo?.CountOpenBeds?.toString()}
            />
          </Row>
        </Div>
        {!disableRejectBtn ? (
          <div className="action-btn-container">
            <CustomButton danger onClick={openRejectModalHandler}>
              رد درخواست
            </CustomButton>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UsersRequestsDetailPendingPaymentRequestsInfo;
