import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { PiPaperPlaneRight } from "react-icons/pi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { getUploadFilePayload, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { TICKETING_ALL_INNER_TICKET_LIST_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import {
  useAllInnerTicketsSendingOnlySendMessageMutation,
  useAllInnerTicketsSendingSendMessageAndFileMutation,
  useLazyAllInnerTicketsSendingMessageDetailQuery,
  useLazyAllInnerTicketsSendingStatusDetailQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  AllInnerTicketsSendingMessageDetailResponse,
  AllInnerTicketsSendingStatusDetailResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";

import SendingTicketDetailCard from "./helper/components/AllSendingTicketDetailCard/AllSendingTicketDetailCard";
import AllSendingTicketDetailConversationsTab from "./helper/components/AllSendingTicketDetailConversationsTab/AllSendingTicketDetailConversationsTab";
import SendMassageModalContent from "./helper/modal/AllSendMassageModalContent/AllSendMassageModalContent";

const MAX_MIN_LENGTH_RULE = "تعداد کاراکتر وارد شد برای توضیحات صحیح نمی باشد";

const AllSendingTicketDetail = () => {
  const [cardData, setCardData] = useState<AllInnerTicketsSendingStatusDetailResponse>();

  const [sendMassageIsOpen, setSendMassageIsOpen] = useState(false);

  const [messageData, setMessageData] =
    useState<AllInnerTicketsSendingMessageDetailResponse>();

  const [noteFiles, setNoteFiles] = useState<UploadFile[]>([]);

  const { params, setSearchParams } = useQueryParams();

  const [noteForm] = Form.useForm<{ note: string }>();

  const activeKey = params?.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link
            to={{
              pathname: TICKETING_ALL_INNER_TICKET_LIST_PAGE_ROUTE,
              search: makeSearchParams({
                type: "submitted",
              }),
            }}
          >
            همه تیکت های داخلی
          </Link>
        ),
      },
      {
        title: "مشاهده تیکت",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // card data
  const [getTicketStatusDetail, { isFetching: isGetTicketStatusDetailLoading }] =
    useLazyAllInnerTicketsSendingStatusDetailQuery();

  // message tab
  const [getMessageTabDetail, { isFetching: isGetMessageTabDetailLoading }] =
    useLazyAllInnerTicketsSendingMessageDetailQuery();

  // send message
  const [sendOnlyMessage, { isLoading: isSendOnlyMessageLoading }] =
    useAllInnerTicketsSendingOnlySendMessageMutation();

  // send message and file
  const [sendMessageAndFile, { isLoading: isSendMessageAndFileLoading }] =
    useAllInnerTicketsSendingSendMessageAndFileMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    refreshTicketDetail();

    getMessageTabDetail(params?.id)
      .unwrap()
      .then((value: AllInnerTicketsSendingMessageDetailResponse) => {
        setMessageData(value);
      });
  }, [params?.id]);

  //* ================================ Util Functions ================================
  // tab items
  const tabItems = [
    {
      label: `مکالمات (${messageData?.length})`,
      children: (
        <AllSendingTicketDetailConversationsTab
          data={messageData}
          loading={isGetMessageTabDetailLoading}
        />
      ),
      key: "1",
    },
    // todo[nima] uncomment when api get ready
    // {
    //   label: "تاریخچه",
    //   children: <AllSendingTicketDetailHistoryTab />,
    //   key: "4",
    // },
  ];

  const refreshTicketDetail = async () => {
    getTicketStatusDetail(params?.id)
      .unwrap()
      .then((value: AllInnerTicketsSendingStatusDetailResponse) => {
        setCardData(value);
      });
  };

  // handler
  const sendMassageBtnHandler = () => {
    setSendMassageIsOpen(true);
  };

  const sendMassageModalCloseHandler = () => {
    setSendMassageIsOpen(false);
    noteForm?.resetFields();
    setNoteFiles([]);
  };

  const sendMessageConfirmHandler = async () => {
    const ticketId = params?.id;

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

        await sendMessageAndFile({
          ticketId,
          body: formData,
        }).unwrap();
      }
      // ================= NOTE MODE =================
      else {
        await sendOnlyMessage({
          ticketId,
          body: { message: noteText },
        }).unwrap();
      }

      // refresh notes
      const res = await getMessageTabDetail(params?.id).unwrap();

      setMessageData(res);

      //refresh status of ticket
      await refreshTicketDetail();

      // reset
      setSendMassageIsOpen(false);
      noteForm.resetFields();
      setNoteFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* SUBMIT ANSWERED MODAL */}
      {sendMassageIsOpen && (
        <ConfirmationModalWithContent
          title="ارسال پیام"
          hasCustomActionBar
          customActionBar={
            <div className="flex justify-end gap-1 pr-5 pb-5 pl-5">
              <CustomButton
                type="primary"
                htmlType="submit"
                onClick={sendMessageConfirmHandler}
                loading={isSendOnlyMessageLoading || isSendMessageAndFileLoading}
              >
                <PiPaperPlaneRight /> ارسال پیام
              </CustomButton>
            </div>
          }
          isModalOpen={sendMassageIsOpen}
          hasNavigatorButton={false}
          closeModalHandler={sendMassageModalCloseHandler}
          showIcon={false}
          content={
            <SendMassageModalContent
              form={noteForm}
              fileList={noteFiles}
              setFileList={setNoteFiles}
            />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        <SendingTicketDetailCard
          data={cardData}
          loading={isGetTicketStatusDetailLoading}
          onRefreshTicketStatus={refreshTicketDetail}
        />

        <CustomTabs
          items={tabItems}
          onChange={(e) => setSearchParams({ id: params?.id, tab: e })}
          activeKey={activeKey}
          type="card"
        />

        <div className="bg-neutral-2 flex justify-center! gap-6 rounded-2xl p-6">
          {cardData?.status?.name?.toUpperCase() === "ADMIN_CLOSED" ||
          cardData?.status?.name?.toUpperCase() === "USER_CLOSED" ||
          cardData?.status?.name?.toUpperCase() === "AUTO_CLOSED" ? null : (
            <CustomButton type="primary" onClick={sendMassageBtnHandler}>
              ارسال پیام
            </CustomButton>
          )}
        </div>
      </div>
    </>
  );
};

export default AllSendingTicketDetail;
