import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { FaRegCalendar, FaRegCircleCheck, FaRegClock } from "react-icons/fa6";
import { PiXCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { DORMITORY_USER_REQUESTS_RESERVATION_CONFIRM_REQUEST_RESERVATION_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { ReservationOpeningRequestsStatus } from "@pages/Dormitory/_shared/utils";
import ResidenceHistoryDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/ResidenceHistoryDrawerContent";
import { ReservationOpeningRequestActionsHeaderProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/components/ReservationOpeningRequestActionsHeader/@types/@reservationOpeningRequestActionsHeadertypes";
import DeliveryResidenceDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/DeliveryResidenceDrawerContent/DeliveryResidenceDrawerContent";
import ReservationRejectModalContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/modal/ReservationRejectModalContent/ReservationRejectModalContent";
import { ReservationOpeningRequestsStatusColor } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/util";

const ReservationOpeningRequestActionsHeader = ({
  tagTitle,
  confirmText,
  status,
  invoiceStatus,
  base,
}: ReservationOpeningRequestActionsHeaderProps) => {
  const [isRejectModal, setIsRejectModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [isHistoryResidenceDrawerOpen, setIsHistoryResidenceDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isDeliveryResidenceDrawerOpen, setIsDeliveryResidenceDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const CloseRejectModalHandler = () => {
    setIsRejectModal({
      isOpen: false,
      id: -1,
    });
  };

  const submitRejectModalHandler = () => {};

  const confirmBtnHandler = () => {
    if (confirmText === "تایید درخواست") {
      navigate({
        pathname:
          DORMITORY_USER_REQUESTS_RESERVATION_CONFIRM_REQUEST_RESERVATION_PAGE_ROUTE,
        search: makeSearchParams({ base: base }),
      });
    }

    if (
      confirmText === "تحویل اقامتگاه" ||
      confirmText === "تحویل اقامتگاه(تمدید مهلت پرداخت)"
    ) {
      setIsDeliveryResidenceDrawerOpen({
        isOpen: true,
        id: -1,
      });
    }
  };

  // دراور سوابق اقامتی
  const closeHistoryResidenceDrawerHandler = () => {
    setIsHistoryResidenceDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  const residenceHistoryBtnHandler = (id: number) => {
    setIsHistoryResidenceDrawerOpen({
      isOpen: true,
      id,
    });
  };

  // دراور تحویل اقامتگاه
  const closeDeliveryDrawerHandler = () => {
    setIsDeliveryResidenceDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/*  مودال رد درخواست */}
      {isRejectModal?.isOpen && (
        <ConfirmationModalWithContent
          title="رد درخواست رزرو"
          isModalOpen={isRejectModal?.isOpen}
          confirmBtnText="تایید و رد درخواست"
          backBtnText="انصراف"
          closeModalHandler={CloseRejectModalHandler}
          onConfirmClickHandler={submitRejectModalHandler}
          content={<ReservationRejectModalContent />}
          isConfirmButtonLoading={false}
          isDangerous={true}
          showIcon={false}
        />
      )}

      {/* دراور سوابق اقامتی */}
      {isHistoryResidenceDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeHistoryResidenceDrawerHandler}
          open={isHistoryResidenceDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ResidenceHistoryDrawerContent
              closeDrawerHandler={closeHistoryResidenceDrawerHandler}
              id={isHistoryResidenceDrawerOpen?.id}
            />
          }
        />
      )}

      {/* دراور تحویل اقامتگاه */}
      {isDeliveryResidenceDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeDeliveryDrawerHandler}
          open={isDeliveryResidenceDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <DeliveryResidenceDrawerContent
              closeDrawerHandler={closeDeliveryDrawerHandler}
            />
          }
        />
      )}

      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {status === ReservationOpeningRequestsStatus?.pendingReview ||
            status === ReservationOpeningRequestsStatus?.pendingDelivery ? (
              <div className="flex items-center gap-1">
                <span>{<FaRegCalendar />} </span>
                <span> رزرو</span>
              </div>
            ) : null}
            <span>شماره درخواست: </span>
            <span>{23213455}</span>
            <CustomTag color={ReservationOpeningRequestsStatusColor[status]}>
              {dataPlaceHolder({ data: tagTitle })}
            </CustomTag>
          </div>
          {status === ReservationOpeningRequestsStatus?.pendingExtension ||
          status === ReservationOpeningRequestsStatus?.pendingResidenceStart ? (
            <div className="flex items-center">
              <span>درخواست پیشین:</span>
              <CustomButton type="link">15341554545454</CustomButton>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2">
          <CustomButton
            type="text"
            iconPlacement="start"
            loading={false}
            icon={<FaRegClock />}
            onClick={() => residenceHistoryBtnHandler(isHistoryResidenceDrawerOpen?.id)}
          >
            سوابق اقامتی
          </CustomButton>
          {/* در هر ۴ وضعیت نمایش داده می‌شود؛ فقط در تحویل/شروع اسکان تمدیدی و unpaid بودن فاکتور مخفی است */}
          {!(
            (status === ReservationOpeningRequestsStatus?.pendingDelivery ||
              status === ReservationOpeningRequestsStatus?.pendingResidenceStart) &&
            invoiceStatus === false
          ) ? (
            <CustomButton
              danger
              iconPlacement="start"
              loading={false}
              icon={<PiXCircleLight />}
              onClick={() => setIsRejectModal({ isOpen: true, id: -1 })}
            >
              رد درخواست
            </CustomButton>
          ) : null}
          {status !== ReservationOpeningRequestsStatus?.pendingResidenceStart ? (
            <CustomButton
              type="primary"
              iconPlacement="start"
              htmlType="submit"
              loading={false}
              icon={<FaRegCircleCheck />}
              onClick={confirmBtnHandler}
            >
              {confirmText}
            </CustomButton>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReservationOpeningRequestActionsHeader;
