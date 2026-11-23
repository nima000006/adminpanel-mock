import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import {
  PiFloppyDisk,
  PiMagicWand,
  PiPaperPlaneRight,
  PiPencilLine,
} from "react-icons/pi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { getUploadFilePayload } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  TICKETING_AGENT_TICKET_LIST_PAGE_ROUTE,
  TICKETING_INNER_TICKET_LIST_PAGE_ROUTE,
} from "@infra/router/routes/ticketing";
import { TicketVariants } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/@types/@ticketingDetailTypes";
import TicketingAnsweredDrawerContent from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/drawer/TicketingAnsweredDrawerContent/TicketingAnsweredDrawerContent";
import useTicketingDetail from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/hooks/useTicketingDetail";

import {
  TicketingMyDetailsBannerInfoResponse,
  TicketingMyDetailsHistoryResponse,
  TicketingMyDetailsMessagesAIResponse,
  TicketingMyDetailsMessagesResponse,
  TicketingMyDetailsNotesResponse,
} from "./@types/@myTicketingDetail";
import ConversationsTab from "../_shared/helper/components/ConversationsTab/ConversationsTab";
import HistoryTab from "../_shared/helper/components/HistoryTab/HistoryTab";
import NotesTab from "../_shared/helper/components/NotesTab/NotesTab";
import SmartConversationsTab from "../_shared/helper/components/SmartConversationsTab/SmartConversationsTab";
import TicketBanner from "../_shared/helper/components/TicketBanner/TicketBanner";
import SubmitAnsweredModalContent from "../_shared/helper/modal/SubmitAnsweredModalContent/SubmitAnsweredModalContent";
import SubmitNoteModalContent from "../_shared/helper/modal/SubmitNoteModalContent/SubmitNoteModalContent";

import "../_shared/_ticketingDetail.scss";

const MAX_MIN_LENGTH_RULE = "تعداد کاراکتر وارد شد برای توضیحات صحیح نمی باشد";

const MyTicketingDetail = () => {
  const [bannerInfo, setBannerInfo] = useState<TicketingMyDetailsBannerInfoResponse>();

  const [messageDataInfo, setMessageDataInfo] =
    useState<TicketingMyDetailsMessagesResponse>();

  const [messageAIDataInfo, setMessageAIDataInfo] =
    useState<TicketingMyDetailsMessagesAIResponse>();

  const [noteDataInfo, setNoteDataInfo] = useState<TicketingMyDetailsNotesResponse>();

  const [noteFiles, setNoteFiles] = useState<UploadFile[]>([]);
  const [answeredFiles, setAnsweredFiles] = useState<UploadFile[]>([]);
  const [historyInfo, setHistoryInfo] = useState<TicketingMyDetailsHistoryResponse>();

  const [submitAnsweredIsOpen, setSubmitAnsweredIsOpen] = useState(false);
  const [submitNoteIsOpen, setSubmitNoteIsOpen] = useState(false);
  const [noteForm] = Form.useForm<{ note: string }>();
  const [answeredForm] = Form.useForm<{ description: string }>();
  const [isOpenAnsweredDrawer, setIsOpenAnsweredDrawer] = useState(false);
  const [isOpenSaveAnsweredConfirmationModal, setIsOpenSaveAnsweredConfirmationModal] =
    useState(false);
  const variant: TicketVariants = "MY";

  const { params, setSearchParams } = useQueryParams();
  // dynamic breadcrumb
  const isInnerTicket = params?.from === "innerTicket";
  const sectionTitle = isInnerTicket ? "تیکت های داخلی من" : "تیکت های کاربران من";
  const sectionRoute = isInnerTicket
    ? `${TICKETING_INNER_TICKET_LIST_PAGE_ROUTE}?type=receipt`
    : TICKETING_AGENT_TICKET_LIST_PAGE_ROUTE;

  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={sectionRoute} className="management-breadcrumb-title">
            {sectionTitle}
          </Link>
        ),
      },
      {
        title: "مشاهده تیکت",
      },
    ],
  });

  const answeredDescription = Form.useWatch("description", answeredForm);
  const noteDescription = Form.useWatch("note", noteForm);

  const isAnsweredDisabled = !answeredDescription?.trim() && answeredFiles.length === 0;

  const isNoteDisabled = !noteDescription?.trim() && noteFiles.length === 0;

  //? ================================  Api Calls (via hook) ================================
  const ticketing = useTicketingDetail(variant);

  const {
    getBannerInfo,
    isGetBannerInfoLoading,
    getMessageData,
    isGetMessageDataLoading,
    getMessageAIData,
    isGetMessageAIDataLoading,
    getNoteData,
    isGetNoteDataLoading,
    sendNote,
    isSendNoteLoading,
    sendFiles,
    isSendFilesLoading,
    sendMessage,
    isSendMessageLoading,
    sendFilesMessage,
    isSendFilesMessageLoading,
    saveDefaultAnswers,
    isSaveDefaultAnswersLoading,
    getHistoryInfo,
    isGettingHistoryInfo,
    referralTicket,
    isReferralTicketLoading,
    priorityTicket,
    isPriorityTicketLoading,
    closeTicket,
    isCloseTicketLoading,
    assignToMe,
    isAssignToMeLoading,
  } = ticketing;

  //? ================================ Effects ================================
  // fetch banner info
  useEffect(() => {
    if (!params?.ticketId) return;

    getBannerInfo({ ticketId: params?.ticketId })
      .unwrap()
      .then((res) => {
        setBannerInfo(res);
      });
  }, [params?.ticketId, getBannerInfo]);

  useEffect(() => {
    if (!params?.ticketId) return;
    if (params?.tab === "1") {
      getMessageData({ ticketId: params?.ticketId })
        .unwrap()
        .then((res) => {
          setMessageDataInfo(res);
        });
    }
    if (params?.tab === "2") {
      getMessageAIData({ ticketId: params?.ticketId })
        .unwrap()
        .then((res) => {
          setMessageAIDataInfo(res);
        });
    }
    if (params?.tab === "3") {
      getNoteData({ ticketId: params?.ticketId })
        .unwrap()
        .then((res) => {
          setNoteDataInfo(res);
        });
    }
    if (params?.tab === "4") {
      getHistoryInfo({ ticketId: params.ticketId })
        .unwrap()
        .then((res) => {
          setHistoryInfo(res);
        });
    }
    if (!params?.tab) {
      getMessageData({ ticketId: params?.ticketId })
        .unwrap()
        .then((res) => {
          setMessageDataInfo(res);
        });
    }
  }, [
    getMessageAIData,
    getMessageData,
    getNoteData,
    getHistoryInfo,
    params?.tab,
    params?.ticketId,
  ]);

  //* ================================ Util Functions ================================
  const selectDefaultAnswerHandler = (message: string) => {
    answeredForm.setFieldsValue({
      description: message,
    });

    setIsOpenAnsweredDrawer(false);
  };

  const fetchBannerInfo = async () => {
    getBannerInfo({ ticketId: params?.ticketId })
      .unwrap()
      .then((res) => {
        setBannerInfo(res);
      });
  };

  const activeKey = params?.tab || "1";

  // handler
  const submitNoteBtnHandler = () => {
    setSubmitNoteIsOpen(true);
  };
  const submitAnsweredBtnHandler = () => {
    setSubmitAnsweredIsOpen(true);
  };

  // answered modal
  const answeredModalCloseHandler = () => {
    setSubmitAnsweredIsOpen(false);
  };
  const answeredModalConfirmHandler = async () => {
    const ticketId = params?.ticketId;

    if (!ticketId) return;

    const values = answeredForm.getFieldsValue();
    const messageText = values?.description?.trim();

    const selectedFile = answeredFiles?.[0];

    const textLengthLimit =
      messageText && (messageText?.length < 10 || messageText?.length > 2049)
        ? true
        : false;

    if (textLengthLimit) {
      return toast.error(MAX_MIN_LENGTH_RULE, { toastId: MAX_MIN_LENGTH_RULE });
    }

    // nothing entered
    if (!messageText && !selectedFile) return;

    try {
      // ================= FILE MODE =================
      if (selectedFile) {
        const formData = new FormData();
        const fileToUpload = getUploadFilePayload(selectedFile);
        if (!fileToUpload) return;

        formData.append("file", fileToUpload as Blob);
        formData.append("content", messageText || "");

        await sendFilesMessage({
          ticketId,
          body: formData,
        }).unwrap();
      }
      // ================= MESSAGE MODE =================
      else {
        await sendMessage({
          ticketId,
          body: { message: messageText },
        }).unwrap();
      }

      // refresh messages
      const res = await getMessageData({ ticketId }).unwrap();

      setMessageDataInfo(res);
      // refresh banner info
      await fetchBannerInfo();

      // reset
      setSubmitAnsweredIsOpen(false);
      answeredForm.resetFields();
      setAnsweredFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  // note modal
  const noteModalCloseHandler = () => {
    setSubmitNoteIsOpen(false);
  };
  const noteModalConfirmHandler = async () => {
    const ticketId = params?.ticketId;

    if (!ticketId) return;

    const values = noteForm.getFieldsValue();
    const noteText = values?.note?.trim();

    const selectedFile = noteFiles?.[0];

    const textLengthLimit =
      noteText && (noteText?.length < 10 || noteText?.length > 2049) ? true : false;

    if (textLengthLimit) {
      return toast.error(MAX_MIN_LENGTH_RULE, { toastId: MAX_MIN_LENGTH_RULE });
    }

    // nothing entered
    if (!noteText && !selectedFile) return;

    try {
      // ================= FILE MODE =================
      if (selectedFile) {
        const formData = new FormData();
        const fileToUpload = getUploadFilePayload(selectedFile);
        if (!fileToUpload) return;

        formData.append("file", fileToUpload as Blob);
        formData.append("content", noteText || "");

        await sendFiles({
          ticketId,
          body: formData,
        }).unwrap();
      }
      // ================= NOTE MODE =================
      else {
        await sendNote({
          ticketId,
          content: noteText,
        }).unwrap();
      }

      // refresh notes
      const res = await getNoteData({ ticketId }).unwrap();

      setNoteDataInfo(res);

      // reset
      setSubmitNoteIsOpen(false);
      noteForm.resetFields();
      setNoteFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  // tab items
  const tabItems = [
    {
      label: `مکالمات(${messageDataInfo?.length || "-"})`,
      children: (
        <ConversationsTab data={messageDataInfo} loading={isGetMessageDataLoading} />
      ),
      key: "1",
    },
    {
      label: "مکالمات پشتیبانی هوشمند",
      children: (
        <SmartConversationsTab
          data={messageAIDataInfo}
          loading={isGetMessageAIDataLoading}
        />
      ),
      key: "2",
    },
    {
      label: "یادداشت‌ها",
      children: <NotesTab data={noteDataInfo} loading={isGetNoteDataLoading} />,
      key: "3",
    },
    {
      label: "تاریخچه",
      children: <HistoryTab data={historyInfo} loading={isGettingHistoryInfo} />,
      key: "4",
    },
  ];

  const closeAnsweredDrawer = () => {
    setIsOpenAnsweredDrawer(false);
  };

  const answeredDrawerOpenHandler = () => {
    setIsOpenAnsweredDrawer(true);
  };

  const saveMessageHandler = () => {
    saveDefaultAnswers({
      message: answeredForm.getFieldValue("description"),
    }).unwrap();
    setIsOpenSaveAnsweredConfirmationModal(false);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* SAVE DEFAULT ANSWERS MODAL */}
      <ConfirmationModalWithContent
        showIcon
        title="ذخیره پاسخ"
        content="آیا از ذخیره متن تایپ شده اطمینان دارید؟"
        isModalOpen={isOpenSaveAnsweredConfirmationModal}
        closeModalHandler={() => setIsOpenSaveAnsweredConfirmationModal(false)}
        onConfirmClickHandler={saveMessageHandler}
        confirmBtnText="ذخیره پاسخ"
        backBtnText="انصراف"
        isConfirmButtonLoading={isSaveDefaultAnswersLoading}
      />

      {/* GET DEFAULT ANSWERS DRAWER */}
      <CustomDrawer
        onClose={closeAnsweredDrawer}
        open={isOpenAnsweredDrawer}
        closeIcon={<AiOutlineClose />}
        content={
          <TicketingAnsweredDrawerContent
            closeDrawerHandler={closeAnsweredDrawer}
            isOpen={isOpenAnsweredDrawer}
            selectDefaultAnswerHandler={selectDefaultAnswerHandler}
          />
        }
      />
      {/* SUBMIT ANSWERED MODAL */}
      {submitAnsweredIsOpen && (
        <ConfirmationModalWithContent
          title="ثبت پاسخ"
          hasCustomActionBar
          customActionBar={
            <div className="flex justify-between gap-1 pr-5 pb-5 pl-5">
              <div className="flex gap-2">
                <CustomTooltip title="هوش مصنوعی">
                  <CustomButton
                    disabled
                    className="border-neutral-2 hover:border-primary! hover:text-primary! flex h-10 w-10 items-center justify-center rounded-md border p-0! transition-all"
                    type="default"
                  >
                    <PiMagicWand size={24} />
                  </CustomButton>
                </CustomTooltip>

                <CustomTooltip title="پاسخ‌های ذخیره شده شما">
                  <CustomButton
                    className="border-neutral-2 hover:border-primary! hover:text-primary! flex h-10 w-10 items-center justify-center rounded-md border p-0! transition-all"
                    type="default"
                    onClick={answeredDrawerOpenHandler}
                  >
                    <PiPencilLine size={24} />
                  </CustomButton>
                </CustomTooltip>

                <CustomTooltip title="ذخیره پاسخ">
                  <CustomButton
                    className="border-neutral-2 hover:border-primary! hover:text-primary! flex h-10 w-10 items-center justify-center rounded-md border p-0! transition-all"
                    type="default"
                    onClick={() => setIsOpenSaveAnsweredConfirmationModal(true)}
                  >
                    <PiFloppyDisk size={24} />
                  </CustomButton>
                </CustomTooltip>
              </div>
              <CustomButton
                type="primary"
                htmlType="submit"
                onClick={answeredModalConfirmHandler}
                disabled={isAnsweredDisabled}
                loading={isSendMessageLoading || isSendFilesMessageLoading}
              >
                ارسال پاسخ <PiPaperPlaneRight />
              </CustomButton>
            </div>
          }
          isModalOpen={submitAnsweredIsOpen}
          hasNavigatorButton={false}
          closeModalHandler={answeredModalCloseHandler}
          showIcon={false}
          content={
            <SubmitAnsweredModalContent
              form={answeredForm}
              fileList={answeredFiles}
              setFileList={setAnsweredFiles}
            />
          }
        />
      )}
      {/* SUBMIT NOTE MODAL */}
      {submitNoteIsOpen && (
        <ConfirmationModalWithContent
          title="ثبت یادداشت"
          hasCustomActionBar
          customActionBar={
            <div className="flex justify-end gap-1 pr-5 pb-5 pl-5">
              <CustomButton
                type="primary"
                htmlType="submit"
                onClick={noteModalConfirmHandler}
                disabled={isNoteDisabled}
                loading={isSendNoteLoading || isSendFilesLoading}
              >
                ثبت یادداشت
              </CustomButton>
            </div>
          }
          isModalOpen={submitNoteIsOpen}
          hasNavigatorButton={false}
          closeModalHandler={noteModalCloseHandler}
          showIcon={false}
          content={
            <SubmitNoteModalContent
              form={noteForm}
              fileList={noteFiles}
              setFileList={setNoteFiles}
            />
          }
        />
      )}

      <div className="ticketing-detail-container flex flex-col gap-10">
        <TicketBanner
          data={bannerInfo}
          loading={isGetBannerInfoLoading}
          variant={variant}
          refreshBannerInfo={fetchBannerInfo}
          onCloseTicket={(ticketId: string) => closeTicket?.({ ticketId })?.unwrap?.()}
          onReferralTicket={(args) => referralTicket?.(args)?.unwrap?.()}
          onPriorityChange={(priority: string) =>
            priorityTicket?.({ id: params?.ticketId, params: { priority } })?.unwrap?.()
          }
          onAssignToMe={(ticketId: string) => assignToMe?.(ticketId)?.unwrap?.()}
          isCloseTicketLoading={isCloseTicketLoading}
          isReferralTicketLoading={isReferralTicketLoading}
          isPriorityTicketLoading={isPriorityTicketLoading}
          isAssignToMeLoading={isAssignToMeLoading}
          isAdmin={false} // because of going to banner from my details
          sectionRoute={sectionRoute}
        />

        <CustomTabs
          items={tabItems}
          onChange={(e) => setSearchParams({ ...params, tab: e })}
          activeKey={activeKey}
          type="card"
        />

        <div className="bg-neutral-2 flex flex-wrap justify-center! gap-6 rounded-2xl p-6">
          <CustomButton
            disabled={
              bannerInfo?.status?.name === "ADMIN_CLOSED" ||
              bannerInfo?.status?.name === "AUTO_CLOSED" ||
              bannerInfo?.status?.name === "USER_CLOSED"
            }
            type="default"
            onClick={submitNoteBtnHandler}
          >
            ثبت یادداشت
          </CustomButton>
          <CustomButton
            disabled={
              bannerInfo?.status?.name === "ADMIN_CLOSED" ||
              bannerInfo?.status?.name === "AUTO_CLOSED" ||
              bannerInfo?.status?.name === "USER_CLOSED"
            }
            type="primary"
            onClick={submitAnsweredBtnHandler}
          >
            ثبت پاسخ
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default MyTicketingDetail;
