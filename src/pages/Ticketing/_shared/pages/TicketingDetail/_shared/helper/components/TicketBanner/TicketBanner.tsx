import { useState } from "react";

import { Badge, Dropdown, MenuProps } from "antd";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineFolderOpen } from "react-icons/md";
import { PiArrowUUpLeft, PiCircleDashed } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useTicketingAdminCancelAllocationMutation,
  useTicketingManagerCancelAllocationMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import TicketRate from "@pages/Ticketing/_shared/components/TicketRate/TicketRate";
import { TicketBannerProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/@types/@ticketBanner";
import { TicketingReferralDrawerContentFormValues } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/helper/TicketingReferralDrawerContent/@types/@ticketingReferralDrawerContent";
import TicketingReferralDrawerContent from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/helper/TicketingReferralDrawerContent/TicketingReferralDrawerContent";
import { PRIORITIES } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/helper/TicketingReferralDrawerContent/utils/prioritiesArray";
import {
  priorityMap,
  ticketStatusMap,
  ticketTypeMap,
} from "@pages/Ticketing/_shared/utils/utils";
import CustomConvertTimeToDays from "@pages/Ticketing/Agent/AgentTicketList/helper/components/CustomConvertTimeToDays/CustomConvertTimeToDays";

import TicketingInfoDrawerContent from "../../drawer/TicketingInfoDrawerContent/TicketingInfoDrawerContent";

const CANCEL_ALLOCATION_SUCCESS = "لغو تخصیص با موفقیت انجام شد.";
const TicketBanner = ({
  data,
  loading,
  variant,
  refreshBannerInfo,
  onCloseTicket,
  onReferralTicket,
  onPriorityChange,
  onAssignToMe,
  onAssignToMeAdmin,
  isCloseTicketLoading,
  isReferralTicketLoading,
  isPriorityTicketLoading,
  isAssignToMeLoading,
  isAdmin,
  sectionRoute,
}: TicketBannerProps) => {
  const { params } = useQueryParams();
  const navigate = useNavigate();
  const [isOpenCancelAllocationModal, setIsOpenCancelAllocationModal] = useState(false);
  const [infoDrawerIsOpen, setInfoDrawerIsOpen] = useState(false);
  const [isCloseTicketModalOpen, setIsCloseTicketModalOpen] = useState(false);
  const [isOpenDrawerReferral, setIsOpenDrawerReferral] = useState(false);
  const [isConfirmAssignManagerOpen, setIsConfirmAssignManagerOpen] = useState({
    isOpen: false,
    id: "-1",
  });

  const items: MenuProps["items"] = [
    ...PRIORITIES.map((priority) => ({
      label: priority.label,
      key: priority.value,
      onClick: () => internalOnPriorityChange(priority.value),
    })),
  ];

  const { setSearchParams } = useQueryParams();
  //? ================================  Api Calls ================================

  const [managerCancelAllocation, { isLoading: isManagerCancelAllocationLoading }] =
    useTicketingManagerCancelAllocationMutation();

  const [adminCancelAllocation, { isLoading: isAdminCancelAllocationLoading }] =
    useTicketingAdminCancelAllocationMutation();

  //* ================================ Util Functions ================================

  //priority change handler
  const internalOnPriorityChange = (priority: string) => {
    if (onPriorityChange) {
      Promise.resolve(onPriorityChange(priority)).then(() => refreshBannerInfo());
      return;
    }
  };
  const infoBtnHandler = () => {
    setInfoDrawerIsOpen(true);
  };

  const referralTicketBtnHandler = () => {
    setIsOpenDrawerReferral(true);
  };

  const onReferralSubmit = (values: TicketingReferralDrawerContentFormValues) => {
    if (onReferralTicket) {
      Promise.resolve(
        onReferralTicket({
          ticketId: params?.ticketId,
          params: { topicId: values?.topic, description: values.description },
        })
      ).then(() => {
        setIsOpenDrawerReferral(false);
        if (sectionRoute) {
          navigate({
            pathname: sectionRoute,
          });
        }
      });
    }
  };

  const closeTicketBtnHandler = () => {
    setIsCloseTicketModalOpen(true);
  };

  const confirmClickCloseTicketHandler = () => {
    if (onCloseTicket) {
      Promise.resolve(onCloseTicket(params.ticketId)).then(() => {
        refreshBannerInfo();
        setIsCloseTicketModalOpen(false);
      });
    }
  };

  const closeModalCloseTicketHandler = () => {
    setIsCloseTicketModalOpen(false);
  };

  const viewAttachTicketBtnHandler = () => {
    if (data?.relatedTicket?.id) {
      setSearchParams({ ticketId: data?.relatedTicket?.id });
    }
  };

  // info drawer handler
  const closeInfoDrawer = () => {
    setInfoDrawerIsOpen(false);
  };

  // referral drawer handler
  const closeReferralDrawer = () => {
    setIsOpenDrawerReferral(false);
  };

  // Assign To Me
  const closeAssignToMeHandler = () => {
    setIsConfirmAssignManagerOpen({ isOpen: false, id: "-1" });
  };

  const confirmAssignedToMeHandler = () => {
    if (onAssignToMe) {
      Promise.resolve(onAssignToMe(isConfirmAssignManagerOpen.id)).then(() => {
        closeAssignToMeHandler();
        refreshBannerInfo();
      });
    }
  };
  const assignToMeHandler = (ticketId: string) => {
    if (onAssignToMeAdmin) {
      onAssignToMeAdmin(ticketId);
      return;
    }

    setIsConfirmAssignManagerOpen({ isOpen: true, id: ticketId });
  };

  const openCancelAllocationBtnHandle = () => {
    setIsOpenCancelAllocationModal(true);
  };
  const closeCancelAllocationHandler = () => {
    setIsOpenCancelAllocationModal(false);
  };

  const confirmCancelAllocationHandler = () => {
    if (isAdmin) {
      adminCancelAllocation({
        ticketId: data?.ticketUuid,
      })
        .unwrap()
        .then(() => {
          if (sectionRoute) {
            navigate(sectionRoute);
          }
        });
    } else {
      managerCancelAllocation({
        ticketId: data?.ticketUuid,
      })
        .unwrap()
        .then(() => {
          if (sectionRoute) {
            navigate(sectionRoute);
          }
        });
    }

    setIsOpenCancelAllocationModal(false);

    toast.success(CANCEL_ALLOCATION_SUCCESS, {
      toastId: CANCEL_ALLOCATION_SUCCESS,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/*allocation modal*/}
      {isOpenCancelAllocationModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenCancelAllocationModal}
          closeModalHandler={closeCancelAllocationHandler}
          title="لغو تخصیص"
          content={`این تیکت به ${data?.assignedToUserStaff} تخصیص داده شده است.
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
      {/* ASSIGNED TO ME MANAGER */}
      {isConfirmAssignManagerOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmAssignManagerOpen?.isOpen}
          closeModalHandler={closeAssignToMeHandler}
          title="تخصیص تیکت!"
          content="آیا از تخصیص تیکت به خود اطمینان دارید؟"
          confirmBtnText="تایید و تخصیص"
          backBtnText="انصراف"
          onConfirmClickHandler={confirmAssignedToMeHandler}
          isConfirmButtonLoading={isAssignToMeLoading}
        />
      )}
      {/* CLOSE TICKET MODAL */}
      {isCloseTicketModalOpen && (
        <ConfirmationModalWithContent
          title="بستن تیکت"
          isModalOpen={isCloseTicketModalOpen}
          isConfirmButtonLoading={isCloseTicketLoading}
          confirmBtnText="تایید و بستن تیکت"
          isDangerous
          backBtnText="انصراف"
          onConfirmClickHandler={confirmClickCloseTicketHandler}
          closeModalHandler={closeModalCloseTicketHandler}
          width={420}
          content={
            <>
              <p>آیا مطئنید که می‌خواهید این تیکت به طور کامل بسته شود؟</p>
              <p>لطفا مطمئن شوید که پاسخ شما به تمام سوالات کاربر داده شده است.</p>
            </>
          }
        />
      )}

      {/* INFO DRAWER */}
      {infoDrawerIsOpen && (
        <CustomDrawer
          onClose={closeInfoDrawer}
          open={infoDrawerIsOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <TicketingInfoDrawerContent
              closeDrawerHandler={closeInfoDrawer}
              data={data}
              variant={variant}
              sectionRoute={sectionRoute}
            />
          }
        />
      )}

      {/* REFERRAL DRAWER */}
      {isOpenDrawerReferral && (
        <CustomDrawer
          onClose={closeReferralDrawer}
          open={isOpenDrawerReferral}
          closeIcon={<AiOutlineClose />}
          content={
            <TicketingReferralDrawerContent
              closeDrawerHandler={closeReferralDrawer}
              onFinish={onReferralSubmit}
              isSubmitting={isReferralTicketLoading}
            />
          }
        />
      )}

      {/* REFERRAL DRAWER */}
      {isOpenDrawerReferral && (
        <CustomDrawer
          onClose={closeReferralDrawer}
          open={isOpenDrawerReferral}
          closeIcon={<AiOutlineClose />}
          content={
            <TicketingReferralDrawerContent
              closeDrawerHandler={closeReferralDrawer}
              onFinish={onReferralSubmit}
              isSubmitting={isReferralTicketLoading}
            />
          }
        />
      )}

      <Div
        loading={loading}
        className="border-neutral-5 bg-neutral-2 relative flex flex-col gap-4 rounded-lg border p-6"
      >
        {data?.status && (
          <div className="absolute -top-4 -right-0.5">
            <Badge.Ribbon
              text={ticketStatusMap[data?.status?.name]?.label}
              color={ticketStatusMap[data?.status?.name]?.color}
              placement="start"
            />
          </div>
        )}

        <div className="flex flex-wrap justify-between max-[960px]:flex-col max-[960px]:gap-4">
          <div className="flex gap-2 max-[960px]:flex-col">
            {/* Tag */}
            {data?.samimService && <SamimServiceTag service={data?.samimService?.name} />}
            <CustomTag
              variant="outlined"
              className="flex items-center gap-1"
              icon={<MdOutlineFolderOpen />}
            >
              {data?.topic?.title}
            </CustomTag>

            <CustomTag
              variant="outlined"
              color={
                priorityMap[
                  data?.priority?.name?.toUpperCase() as keyof typeof priorityMap
                ]?.color
              }
            >
              {
                priorityMap[
                  data?.priority?.name?.toUpperCase() as keyof typeof priorityMap
                ]?.label
              }
            </CustomTag>

            {data?.ticketOrigin && (
              <CustomTag
                variant="outlined"
                className="flex items-center gap-1"
                color={ticketTypeMap[data?.ticketOrigin?.name]?.color ?? "default"}
                icon={
                  data?.ticketOrigin?.name === "REFERENCED" ? (
                    <PiArrowUUpLeft />
                  ) : (
                    <PiCircleDashed />
                  )
                }
              >
                {ticketTypeMap[data?.ticketOrigin?.name]?.label ?? "-"}
              </CustomTag>
            )}
            {data?.status?.name === "UNASSIGNED" ||
            data?.status?.name === "WAITING_FOR_REPLY"
              ? (data?.waitingDays || data?.waitingDays?.toString() === "0") && (
                  <CustomConvertTimeToDays seconds={data?.waitingDays} />
                )
              : null}
          </div>

          <div>
            {data?.status?.name === "REPLIED" ||
            data?.status?.name === "WAITING_FOR_REPLY" ? (
              <div className="flex items-center gap-2">
                <span className="body-regular text-neutral-8">تخصیص به </span>

                <Link
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: data?.assignedToUserStaffId,
                    }),
                  }}
                >
                  <span className="footnote text-primary-6!">
                    {data?.assignedToUserStaff}
                  </span>
                </Link>
                {(data?.assignedToUserStaff ||
                  ["ADMIN_CLOSED", "AUTO_CLOSED", "USER_CLOSED"].includes(
                    data?.status?.name
                  )) && (
                  <CustomButton
                    type="text"
                    danger
                    onClick={openCancelAllocationBtnHandle}
                  >
                    لغو تخصیص
                  </CustomButton>
                )}
              </div>
            ) : data?.status?.name === "AUTO_CLOSED" ||
              data?.status?.name === "ADMIN_CLOSED" ||
              data?.status?.name === "USER_CLOSED" ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-regular text-neutral-8">بسته شده توسط</span>
                <Link
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: data?.assignedToUserStaffId,
                    }),
                  }}
                >
                  <span className="footnote text-primary-6!">{data?.modifiedBy}</span>
                </Link>

                <TicketRate value={data?.ticketRating} count={5} isForTable />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-between max-[1200px]:flex-col max-[1200px]:gap-4">
          <div className="flex flex-col">
            <span className="body-regular text-neutral-8 wrap-break-word whitespace-pre-wrap min-[1200px]:max-w-50">
              {data?.title}
            </span>
            <span className="regular text-neutral-12">#{data?.ticketNumber}</span>
          </div>

          <div className="flex gap-2 max-[1200px]:flex-col">
            {data?.status?.name !== "AUTO_CLOSED" &&
              data?.status?.name !== "ADMIN_CLOSED" &&
              data?.status?.name !== "USER_CLOSED" && (
                <Dropdown.Button
                  className="flex justify-end"
                  type="default"
                  menu={{ items }}
                  loading={isPriorityTicketLoading}
                >
                  تغییر اولویت
                </Dropdown.Button>
              )}
            <CustomButton type="default" onClick={infoBtnHandler}>
              <AiOutlineInfoCircle /> اطلاعات
            </CustomButton>

            {data?.status?.name === "UNASSIGNED" && (
              <CustomButton
                type="default"
                onClick={() => assignToMeHandler(data?.ticketUuid)}
                className="border-dashed!"
              >
                تخصیص تیکت
              </CustomButton>
            )}

            {data?.status?.name !== "AUTO_CLOSED" &&
              data?.status?.name !== "ADMIN_CLOSED" &&
              data?.status?.name !== "USER_CLOSED" && (
                <>
                  <CustomButton
                    onClick={referralTicketBtnHandler}
                    className="border-orange-6! [&>span]:text-orange-6! border-dashed!"
                  >
                    ارجاع تیکت
                  </CustomButton>
                  <CustomButton
                    danger
                    onClick={closeTicketBtnHandler}
                    className="border-dustred-6! border-dashed!"
                  >
                    بستن تیکت
                  </CustomButton>
                  {data?.relatedTicket?.id && (
                    <CustomButton
                      onClick={viewAttachTicketBtnHandler}
                      className="border-neutral-5 border-dashed!"
                    >
                      مشاهده تیکت ضمیمه
                    </CustomButton>
                  )}
                </>
              )}
          </div>
        </div>
      </Div>
    </>
  );
};
export default TicketBanner;
