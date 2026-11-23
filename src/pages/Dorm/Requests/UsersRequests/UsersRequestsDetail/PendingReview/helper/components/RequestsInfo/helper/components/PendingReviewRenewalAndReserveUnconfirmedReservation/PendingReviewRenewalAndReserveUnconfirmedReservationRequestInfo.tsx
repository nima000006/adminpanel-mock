import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";
import { toast } from "react-toastify";

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
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestInformationQuery,
  useLazyGetDormRequestResidenceInfoQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  DormRequestInformationType,
  DormRequestResidenceInfo,
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestInformationResponse,
  GetDormRequestResidenceInfoResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";
import UserRequestRoomMoreInfoDrawerContent from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/drawers/UserRequestRoomMoreInfoDrawerContent/UserRequestRoomMoreInfoDrawerContent";

import UnconfirmedReservationAnotherRoomAllocationDrawerContent from "../../../../RoomAllocation/helper/sections/RenewalAndReserve/UnconfirmedReservation/helper/Drawer/UnconfirmedReservationAnotherRoomAllocationDrawerContent/UnconfirmedReservationAnotherRoomAllocationDrawerContent";
import UnconfirmedReservationRoomAllocationDrawerContent from "../../../../RoomAllocation/helper/sections/RenewalAndReserve/UnconfirmedReservation/helper/Drawer/UnconfirmedReservationRoomAllocationDrawerContent/UnconfirmedReservationRoomAllocationDrawerContent";
import UnconfirmedReservationRejectRequestModalContent from "../../../../RoomAllocation/helper/sections/RenewalAndReserve/UnconfirmedReservation/helper/modal/UnconfirmedReservationRejectRequestModalContent/UnconfirmedReservationRejectRequestModalContent";
import "./_pendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo.scss";

const REJECT_SUCCESS_MSG = "درخواست مورد نظر رد شد.";

const PendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [residenceInfo, setResidenceInfo] = useState<DormRequestResidenceInfo | null>(
    null
  );

  // modals
  const [moreDetail, setMoreDetail] = useState(false);
  const [rejectRequest, setRejectRequest] = useState(false);
  const [roomAllocation, setBedAllocation] = useState(false);
  const [anotherRoomAllocation, setAnotherRoomAllocation] = useState(false);
  const [disableRejectBtn, setDisableRejectBtn] = useState(false);

  const {
    params: { id },
  } = useQueryParams();

  const [rejectForm] = Form.useForm<{ description: string }>();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [getDormRequestResidenceInfo, { isFetching: isDormRequestResidenceInfoLoading }] =
    useLazyGetDormRequestResidenceInfoQuery();

  const [getDormPendingReviewStatus] = useGetDormPendingReviewStatusMutation();

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
  const getDormRequestInformationSuccess = (value: GetDormRequestInformationResponse) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  const getDormRequestResidenceInfoSuccess = (
    value: GetDormRequestResidenceInfoResponse
  ) => {
    if (value?.status === 200) {
      setResidenceInfo(value?.data?.[0]);
    }
  };

  // modals
  const openMoreDetailHandler = () => setMoreDetail(true);
  const closeMoreDetailHandler = () => setMoreDetail(false);

  //reject
  const openRejectRequestHandler = () => setRejectRequest(true);
  const closeRejectRequestHandler = () => {
    setRejectRequest(false);
    rejectForm.resetFields();
  };

  const rejectRequestHandler = () => {
    rejectForm.submit();
    rejectForm.validateFields().then((value) => {
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
          .then((res) => getDormPendingReviewStatusSuccess(res, value?.description));
      }
    });
  };

  const getDormPendingReviewStatusSuccess = async (
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
        .then(dormRequestsStatusSuccess);
    }
  };

  const dormRequestsStatusSuccess = async (value: DormRequestsStatusResponse) => {
    if (value?.status === 204) {
      closeRejectRequestHandler();
      toast.success(REJECT_SUCCESS_MSG, { toastId: REJECT_SUCCESS_MSG });
      setDisableRejectBtn(true);
    }
  };

  const openRoomAllocationHandler = () => setBedAllocation(true);
  const closeRoomAllocationHandler = () => setBedAllocation(false);

  const openAnotherRoomAllocationHandler = () => setAnotherRoomAllocation(true);
  const closeAnotherRoomAllocationHandler = () => setAnotherRoomAllocation(false);

  return (
    <>
      {/* MORE DETAIL DRAWER */}
      {moreDetail && (
        <CustomDrawer
          onClose={closeMoreDetailHandler}
          open={moreDetail}
          content={
            <UserRequestRoomMoreInfoDrawerContent
              closeDrawerHandler={closeMoreDetailHandler}
              id={residenceInfo?.AssociationBed_roomId}
            />
          }
        />
      )}

      {/* ANOTHER_ROOM_ALLOCATION_DRAWER */}
      {anotherRoomAllocation && (
        <CustomDrawer
          onClose={closeAnotherRoomAllocationHandler}
          open={anotherRoomAllocation}
          content={
            <UnconfirmedReservationAnotherRoomAllocationDrawerContent
              closeDrawerHandler={closeAnotherRoomAllocationHandler}
              dormId={residenceInfo?.AssociationBed_dormitoryid}
              residenceInfo={residenceInfo}
            />
          }
        />
      )}

      {/* REJECT MODAL */}
      {rejectRequest && (
        <ConfirmationModalWithContent
          isModalOpen={rejectRequest}
          closeModalHandler={closeRejectRequestHandler}
          content={<UnconfirmedReservationRejectRequestModalContent form={rejectForm} />}
          onConfirmClickHandler={rejectRequestHandler}
          confirmBtnText="رد درخواست"
          backBtnText="انصراف"
          isDangerous
          title="رد درخواست"
          isConfirmButtonLoading={isDormStatusLoading}
        />
      )}

      {/* ROOM ALLOCATION DRAWER */}
      {roomAllocation && (
        <CustomDrawer
          onClose={closeRoomAllocationHandler}
          open={roomAllocation}
          content={
            <UnconfirmedReservationRoomAllocationDrawerContent
              closeDrawerHandler={closeRoomAllocationHandler}
              roomId={residenceInfo?.AssociationBed_roomId}
              residenceInfo={residenceInfo}
            />
          }
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
        <Div loading={isDormRequestResidenceInfoLoading}>
          <CustomDivider
            text="مشخصات اتاق"
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
        <div className="action-btn-container">
          {!disableRejectBtn ? (
            <div className="reject-btn-container">
              <CustomButton
                type="primary"
                ghost
                danger
                onClick={openRejectRequestHandler}
              >
                رد درخواست
              </CustomButton>
            </div>
          ) : null}

          <div className="allocation-btn-container">
            <CustomButton type="primary" ghost onClick={openAnotherRoomAllocationHandler}>
              تخصیص یک اتاق دیگر
            </CustomButton>
            <CustomButton type="primary" onClick={openRoomAllocationHandler}>
              تخصیص اتاق
            </CustomButton>
          </div>
        </div>
      </Div>
    </>
  );
};

export default PendingReviewRenewalAndReserveUnconfirmedReservationRequestInfo;
