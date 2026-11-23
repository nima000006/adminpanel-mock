import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { MdOutlineFolderOpen } from "react-icons/md";
import { PiArrowUUpLeft, PiCircleDashed } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
  TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/ticketing";
import {
  useTicketingAdminCancelAllocationMutation,
  useTicketingManagerCancelAllocationMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import TicketRate from "@pages/Ticketing/_shared/components/TicketRate/TicketRate";
import {
  priorityMap,
  ticketStatusMap,
  ticketTypeMap,
} from "@pages/Ticketing/_shared/utils/utils";
import { AgentTicketAllTicketPriority } from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";
import CustomConvertTimeToDays from "@pages/Ticketing/Agent/AgentTicketList/helper/components/CustomConvertTimeToDays/CustomConvertTimeToDays";

import type { TicketInfoSegmentContentProps } from "./@types/@ticketInfoSegmentContent";

const TicketInfoSegmentContent = ({
  detailInfoData,
  isDetailInfoLoading,
  onDetailInfo,
  variant,
  sectionRoute,
  closeDrawerHandler,
}: TicketInfoSegmentContentProps & { sectionRoute?: string }) => {
  const { params } = useQueryParams();
  const navigate = useNavigate();
  const data = detailInfoData;
  const [isOpenCancelAllocationModal, setIsOpenCancelAllocationModal] = useState(false);

  const [managerCancelAllocation, { isLoading: isManagerCancelAllocationLoading }] =
    useTicketingManagerCancelAllocationMutation();

  const [adminCancelAllocation, { isLoading: isAdminCancelAllocationLoading }] =
    useTicketingAdminCancelAllocationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.ticketId && onDetailInfo) {
      onDetailInfo({ ticketId: params.ticketId });
    }
  }, [params?.ticketId, onDetailInfo]);

  //* ================================ Util Functions ================================

  const cancelBtnHandle = () => {
    setIsOpenCancelAllocationModal(true);
  };

  const closeCancelAllocationHandler = () => {
    setIsOpenCancelAllocationModal(false);
  };

  const confirmCancelAllocationHandler = async () => {
    try {
      if (variant === "ALL") {
        await adminCancelAllocation({
          ticketId: data?.ticketId,
        }).unwrap();
      } else {
        await managerCancelAllocation({
          ticketId: data?.ticketId,
        }).unwrap();
      }

      setIsOpenCancelAllocationModal(false);
      toast.success("لغو تخصیص با موفقیت انجام شد.", {
        toastId: "CANCEL_ALLOCATION_SUCCESS",
      });

      if (sectionRoute) {
        navigate(sectionRoute);
      }
    } catch (error) {
      console.error("Cancel allocation failed:", error);
    }
  };

  const ticketInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شماره تیکت",
      children: `#${data?.ticketNumber}`,
    },
    ...(data?.status?.name === "ADMIN_CLOSED" ||
    data?.status?.name === "AUTO_CLOSED" ||
    data?.status?.name === "USER_CLOSED"
      ? [
          {
            key: "2",
            label: "رضایت کاربر",
            children: <TicketRate value={data?.ticketRating} count={5} isForTable />,
          },
        ]
      : []),
    {
      key: "3",
      label: "وضعیت",
      children: (
        <CustomTag
          color={
            data?.status?.name ? ticketStatusMap[data?.status?.name]?.color : undefined
          }
        >
          {data?.status?.name ? ticketStatusMap[data?.status?.name]?.label : "-"}
        </CustomTag>
      ),
    },

    {
      key: "4",
      label: "نوع تیکت",
      children: (
        <CustomTag
          color={
            data?.ticketOrigin?.name
              ? ticketTypeMap[data.ticketOrigin.name as keyof typeof ticketTypeMap]?.color
              : undefined
          }
          icon={
            data?.ticketOrigin?.name?.toUpperCase() === "PRIMARY" ? (
              <PiCircleDashed />
            ) : (
              <PiArrowUUpLeft />
            )
          }
        >
          {data?.ticketOrigin?.name
            ? ticketTypeMap[data.ticketOrigin.name as keyof typeof ticketTypeMap]?.label
            : "-"}
        </CustomTag>
      ),
    },
    {
      key: "5",
      label: "اولویت",
      children: (
        <CustomTag
          variant="outlined"
          color={
            data?.priority?.name
              ? priorityMap[data.priority.name as AgentTicketAllTicketPriority].color
              : undefined
          }
        >
          {data?.priority?.name
            ? priorityMap[data.priority.name as AgentTicketAllTicketPriority].label
            : "-"}
        </CustomTag>
      ),
    },
    {
      key: "6",
      label: "سرویس",
      children: data?.service && <SamimServiceTag service={data?.service?.name} />,
    },
    {
      key: "7",
      label: "موضوع",
      children: (
        <CustomTag
          variant="outlined"
          className="white-space-wrap flex items-center gap-1"
          icon={<MdOutlineFolderOpen />}
        >
          <span className="wrap-break-word whitespace-pre-wrap">{data?.topicTitle}</span>
        </CustomTag>
      ),
    },
    ...(data?.status?.name === "UNASSIGNED" || data?.status?.name === "WAITING_FOR_REPLY"
      ? [
          {
            key: "8",
            label: "زمان انتظار",
            children: data?.waitingTime && (
              <CustomConvertTimeToDays seconds={+data?.waitingTime} />
            ),
          },
        ]
      : []),

    {
      key: "9",
      label: "تاریخ و زمان ثبت تیکت",
      children: data?.createdDate
        ? convertDateToPersianTextDateWithTime(data.createdDate)
        : "-",
    },
    ...(data?.status?.name === "ADMIN_CLOSED" ||
    data?.status?.name === "USER_CLOSED" ||
    data?.status?.name === "AUTO_CLOSED"
      ? [
          {
            key: "10",
            label: "تاریخ و زمان بسته شدن تیکت",
            children: data?.closedDate
              ? convertDateToPersianTextDateWithTime(data.closedDate)
              : "-",
          },
        ]
      : []),

    ...(data?.status?.name === "REPLIED" || data?.status?.name === "WAITING_FOR_REPLY"
      ? [
          {
            key: "11",
            label: "تخصیص به",
            children: (
              <div className="flex items-center gap-2">
                <span className="body-regular text-neutral-8">تخصیص به </span>
                <Link
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: data?.assignedToUserStaffId,
                    }),
                  }}
                  className="footnote text-primary-6!"
                >
                  {data?.assignedToUserStaffName}
                </Link>
                {(detailInfoData?.assignedToUserStaffName ||
                  ["ADMIN_CLOSED", "AUTO_CLOSED", "USER_CLOSED"].includes(
                    detailInfoData?.status?.name || ""
                  )) && (
                  <CustomButton type="text" danger onClick={cancelBtnHandle}>
                    لغو تخصیص
                  </CustomButton>
                )}
              </div>
            ),
          },
        ]
      : []),

    ...(data?.status?.name === "ADMIN_CLOSED" ||
    data?.status?.name === "AUTO_CLOSED" ||
    data?.status?.name === "USER_CLOSED"
      ? [
          {
            key: "12",
            label: "بسته شده توسط",
            children: (
              <Link
                to={{
                  pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: data?.closedByUserId,
                  }),
                }}
                className="text-primary-6!"
                color={"geekblue"}
              >
                {data?.closedBy}
              </Link>
            ),
          },
        ]
      : []),
    ...(data?.relatedTicket?.id
      ? [
          {
            key: "13",
            label: " تیکت ضمیمه",
            children: (
              <Link
                className="text-primary-6!"
                to={{
                  pathname:
                    variant === "MY"
                      ? TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE
                      : TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    ticketId: detailInfoData?.relatedTicket?.id,
                  }),
                }}
                onClick={closeDrawerHandler}
              >
                مشاهده
              </Link>
            ),
          },
        ]
      : []),
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenCancelAllocationModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenCancelAllocationModal}
          closeModalHandler={closeCancelAllocationHandler}
          title="لغو تخصیص"
          content={`این تیکت به ${data?.assignedToUserStaffName} تخصیص داده شده است.
             آیا از لغو تخصیص این تیکت اطمینان دارید؟`}
          confirmBtnText="تایید و لغو تخصیص"
          backBtnText="انصراف"
          isDangerous
          onConfirmClickHandler={confirmCancelAllocationHandler}
          isConfirmButtonLoading={
            isAdminCancelAllocationLoading || isManagerCancelAllocationLoading
          }
        />
      )}

      <Div loading={isDetailInfoLoading}>
        {!detailInfoData ? (
          <CustomEmpty description="دیتایی برای نمایش وجود ندارد" />
        ) : (
          <Descriptions
            column={1}
            items={ticketInfoItems}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "190px",
              },
            }}
          />
        )}
      </Div>
    </>
  );
};
export default TicketInfoSegmentContent;
