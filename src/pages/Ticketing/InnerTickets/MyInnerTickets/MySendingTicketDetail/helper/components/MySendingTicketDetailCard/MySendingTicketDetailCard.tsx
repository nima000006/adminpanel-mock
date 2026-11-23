import { useState } from "react";

import { Badge } from "antd";
import { MdOutlineFolderOpen } from "react-icons/md";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useInnerSendingCloseTicketMutation,
  useInnerSendingSubmitRateMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import TicketRate from "@pages/Ticketing/_shared/components/TicketRate/TicketRate";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";
import { MySendingTicketDetailCardProps } from "@pages/Ticketing/InnerTickets/MyInnerTickets/MySendingTicketDetail/helper/components/MySendingTicketDetailCard/@types/@mySendingTicketDetailCardType";

import SendingTicketRateTicketsModalContent from "../../modal/MySendingTicketRateTicketsModalContent/MySendingTicketRateTicketsModalContent";
import "./_mySendingTicketDetailCard.scss";

const MySendingTicketDetailCard = ({
  data,
  loading,
  onRefreshTicketStatus,
}: MySendingTicketDetailCardProps) => {
  const [closeTicketIsOpen, setCloseTicketIsOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [rate, setRate] = useState<number>(0);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // close ticket
  const [closeTicket, { isLoading: isCloseTicketLoading }] =
    useInnerSendingCloseTicketMutation();

  // submit rate
  const [submitRate, { isLoading: isSubmitRateLoading }] =
    useInnerSendingSubmitRateMutation();

  //* ================================ Util Functions ================================
  //handler
  const closeTicketBtnHandler = () => {
    setCloseTicketIsOpen(true);
  };

  const cancelBtnCloseModalHandler = () => {
    setCloseTicketIsOpen(false);
  };

  const closeTicketModalConfirmHandler = () => {
    closeTicket(id).unwrap().then(closeTicketSuccess);
  };

  const rateBtnHandler = () => {
    setIsRateModalOpen(true);
  };

  const RateModalCloseHandler = () => {
    setIsRateModalOpen(false);
  };

  const RateModalConfirmHandler = () => {
    submitRate({ ticketId: id, rate })
      .unwrap()
      .then(() => submitRateSuccess());
  };

  // success
  const closeTicketSuccess = () => {
    cancelBtnCloseModalHandler();
    onRefreshTicketStatus();
  };

  const submitRateSuccess = () => {
    RateModalCloseHandler();
    onRefreshTicketStatus();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CLOSE TICKET MODAL */}
      {closeTicketIsOpen && (
        <ConfirmationModalWithContent
          title="بستن تیکت!"
          isDangerous
          confirmBtnText="تایید و بستن تیکت"
          backBtnText="انصراف"
          iconType="alert"
          isModalOpen={closeTicketIsOpen}
          onConfirmClickHandler={closeTicketModalConfirmHandler}
          closeModalHandler={cancelBtnCloseModalHandler}
          isConfirmButtonLoading={isCloseTicketLoading}
          content={
            <div>
              با بستن تیکت، کارشناسان دیگر امکان پیگیری و رفع مشکل از طریق این تیکت را
              نخواهند داشت. در صورتی که مشکل شما هنوز برطرف نشده است، پیشنهاد می‌شود تیکت
              را نبندید.
            </div>
          }
        />
      )}
      {/* RATE MODAL */}
      {isRateModalOpen && (
        <ConfirmationModalWithContent
          title="رضایت شما از پاسخ"
          isModalOpen={isRateModalOpen}
          closeModalHandler={RateModalCloseHandler}
          onConfirmClickHandler={RateModalConfirmHandler}
          isConfirmButtonLoading={isSubmitRateLoading}
          isConfirmButtonDisable={rate === 0}
          content={<SendingTicketRateTicketsModalContent rate={rate} setRate={setRate} />}
          backBtnText="انصراف"
          confirmBtnText="ثبت امتیاز"
          showIcon={false}
        />
      )}

      <Div
        loading={loading}
        className="border-neutral-5 bg-neutral-2 sending-ticket-detail-card-container relative flex flex-col gap-4 rounded-lg border p-6"
      >
        {data?.status && (
          <div className="absolute -top-4 -right-0.5">
            <Badge.Ribbon
              text={
                ticketStatusMap[data?.status?.name as keyof typeof ticketStatusMap]?.label
              }
              color={
                ticketStatusMap[data?.status?.name as keyof typeof ticketStatusMap]?.color
              }
              placement="start"
            />
          </div>
        )}

        <div className="flex justify-between max-[960px]:flex-col max-[960px]:gap-4">
          <div className="flex gap-2 max-[800px]:flex-col">
            {/* Tag */}
            {data?.samimService && <SamimServiceTag service={data?.samimService?.name} />}
            <CustomTag
              variant="outlined"
              className="flex items-center gap-1"
              icon={<MdOutlineFolderOpen />}
            >
              {data?.topic?.title}
            </CustomTag>
          </div>

          <div>
            {data?.status?.name === "REPLIED" ||
            data?.status?.name === "WAITING_FOR_REPLY" ? (
              <div className="flex items-center gap-2">
                <span className="body-regular text-neutral-8">تخصیص داده شده به </span>
                <Link
                  className="text-primary-6!"
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: data?.assignedToUserStaffId,
                    }),
                  }}
                >
                  {dataPlaceHolder({ data: data?.assignedToUserStaff })}
                </Link>
              </div>
            ) : data?.status?.name === "USER_CLOSED" ||
              data?.status?.name === "ADMIN_CLOSED" ? (
              <div className="flex items-center gap-2">
                <span className="body-regular text-neutral-8">بسته شده توسط</span>
                <Link
                  className="text-primary-6!"
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: data?.modifiedByUserId,
                    }),
                  }}
                >
                  {dataPlaceHolder({ data: data?.modifiedBy })}
                </Link>

                <TicketRate value={data?.ticketRating} count={5} isForTable />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-between max-[950px]:flex-col max-[950px]:gap-4">
          <div className="flex flex-col">
            <span className="body-regular text-neutral-8">{data?.title}</span>
            <span className="regular text-neutral-12">#{data?.ticketNumber}</span>
          </div>
          {data?.status?.name === "REPLIED" ||
          data?.status?.name === "WAITING_FOR_REPLY" ||
          data?.status?.name === "UNASSIGNED" ? (
            <CustomButton
              onClick={closeTicketBtnHandler}
              danger
              className="border-dustred-6! text-dustred-6! border-dashed!"
            >
              بستن تیکت
            </CustomButton>
          ) : (
            <CustomButton
              type="default"
              onClick={rateBtnHandler}
              disabled={data?.ticketRating !== null}
            >
              ثبت امتیاز
            </CustomButton>
          )}
        </div>
        <div>
          {data?.status?.name === "UNASSIGNED" ? (
            <CustomAlert
              type="warning"
              title={"تیکت در انتظار تخصیص به کارشناس تیکت!"}
              showIcon
            />
          ) : data?.status?.name === "WAITING_FOR_REPLY" ? (
            <CustomAlert type="warning" title={"تیکت در انتظار پاسخ کارشناس!"} showIcon />
          ) : data?.status?.name === "REPLIED" ? (
            <CustomAlert type="success" title={"تیکت پاسخ داده شد!"} showIcon />
          ) : (
            <CustomAlert type="error" title={"تیکت بسته شده است!"} showIcon />
          )}
        </div>
      </Div>
    </>
  );
};
export default MySendingTicketDetailCard;
