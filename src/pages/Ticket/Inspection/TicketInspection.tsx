import { useState, useRef, useEffect } from "react";

import { Button, Form, Input, Modal } from "antd";
import { AiFillDelete, AiOutlineSend } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CUSTOM_PRIMARY } from "@infra/VARS/globalColors/globalColors";

import ChatResponseGenerator from "./ChatResponseGenerator/ChatResponseGenerator";
import SendMessageIcon from "../../../assets/icons/SendMessageIcon";
import AttachmentButton from "../../../components/AttachmentButton/AttachmentButton";
import CustomCard from "../../../components/CustomCard/CustomCard";
import CustomInput from "../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelectField from "../../../components/CustomInputs/CustomSelectField/CustomSelectField";
import MainSpinner from "../../../components/MainSpinner/MainSpinner";
import { convertDateToPersianDate } from "../../../infrastructure/helpers/dateConvertor";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { TICKETS_HOME_PAGE_ROUTE } from "../../../infrastructure/router/routes/ticket";
import {
  useAddMessageForUserTicketMutation,
  useCloseTicketMutation,
  useGetTicketDetailMutation,
} from "../../../infrastructure/states/redux/Apis/ticketApi";
import { PADDING_32 } from "../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  TICKETING_CLOSE_SUCCESS_MESSAGE,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_ticketInspection.scss";

const TicketInspection = () => {
  const [form] = Form.useForm();

  //! User entered message and attachment file
  const [enteredText, setEnteredText] = useState<string>("");
  const [attachmentFile, setAttachmentFileFile] = useState<File | null | undefined>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //! When the user comes to the ticket detail's page, see the last message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { TextArea } = Input;

  //! Get the ticket's ID from the Url
  const ticketId = new URLSearchParams(location.search).get("id");

  //! Get the ticket's details from Api
  const [getTicketDetail, { data, isLoading, isError }] = useGetTicketDetailMutation();

  //! Send the user's new message to the API
  const [
    newMessageOfTicket,
    {
      data: newMsgData,
      isLoading: newMessageIsLoading,
      isError: newMessageIsError,
      isSuccess: isNewMessageSuccess,
    },
  ] = useAddMessageForUserTicketMutation();

  //! Send request to the API for closing the user's ticket by admin
  const [closeTicket, { data: closeTicketData, isError: isCloseTicketError }] =
    useCloseTicketMutation();

  //! Get the ticket's details from Api
  useEffect(() => {
    if (ticketId) {
      getTicketDetail(ticketId);
    }
  }, [ticketId, newMessageIsLoading]);

  //!
  useEffect(() => {
    if (data?.status === 200) {
      form.setFieldsValue({
        number: `${data?.ticketDetail?.id}`,
        title: `${data?.ticketDetail?.title}`,
        type: `${data?.ticketDetail?.problemname}`,
        registerDate: `${convertDateToPersianDate(
          data?.ticketDetail?.createdate ? data?.ticketDetail?.createdate?.toString() : ""
        )}`,
      });
    }
  }, [data?.status]);

  //! When the user comes to the ticket's detail page, see the last message
  useEffect(() => {
    scrollToBottom();
  }, [messagesEndRef?.current, isLoading]);

  //! If the request to close the user's ticket to the API has an error, navigate to the ticket's main page
  if (isError) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
    navigate(TICKETS_HOME_PAGE_ROUTE);
  }

  //! If the request of user's new message has an error, show relevant toast
  if (newMessageIsError) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
  }

  //! If the API which close the ticket has an error, show relevant toast and close confirmation modal
  useEffect(() => {
    if (isCloseTicketError) {
      toast.error(GENERAL_ERROR_MESSAGE, {
        toastId: GENERAL_ERROR_MESSAGE,
      });
      setIsModalOpen(false);
    }
  }, [isCloseTicketError]);

  // ! After send new message to API, remove input's content
  useEffect(() => {
    if (isNewMessageSuccess) {
      setEnteredText("");
      setAttachmentFileFile(null);
    }
  }, [isNewMessageSuccess, newMsgData?.status]);

  //! Get data from API after closing the ticket
  useEffect(() => {
    if (closeTicketData?.status === 200 && ticketId) {
      getTicketDetail(ticketId);
      toast.success(TICKETING_CLOSE_SUCCESS_MESSAGE, {
        toastId: TICKETING_CLOSE_SUCCESS_MESSAGE,
      });
    }
    setIsModalOpen(false);
  }, [closeTicketData?.status]);

  useTitle({ text: "بررسی تیکت" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setAttachmentFileFile(e?.target?.files?.[0]);
    }
  };

  //! If the ticket's ID does not exist, navigate to the ticket's main page
  if (!ticketId) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
    return <Navigate to={TICKETS_HOME_PAGE_ROUTE} />;
  }

  //! Send the user's new message to the API
  const onSubmitMessageHandler = () => {
    const formData = new FormData();
    formData.append("formFile", attachmentFile as Blob);
    formData.append("msg", enteredText);
    formData.append("ticketid", ticketId);
    newMessageOfTicket(formData);
  };

  //! Send request to the API for closing the user's ticket by admin
  const closeTicketHandler = () => {
    if (data?.ticketDetail?.status !== 3 && data?.ticketDetail?.id) {
      closeTicket(data?.ticketDetail?.id);
    }
  };

  //! When the user comes to the ticket detail's page, see the last message
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollTo({
        top: 10000,
        behavior: "instant",
      });
    }
  };

  return (
    <>
      <div className="ticket-inspection-page-container">
        <div className="information">
          <CustomCard padding={PADDING_32} className="card-container">
            <h3 className="card-title">اطلاعات</h3>
            <Form form={form}>
              <div className="information-body">
                <CustomInput type="text" label="شماره" name="number" disabled={true} />

                <CustomInput type="text" label="عنوان" name="title" disabled={true} />
                <CustomSelectField
                  label="موضوع"
                  disabled={true}
                  placeholder={`${data?.ticketDetail?.servicename}`}
                  options={[
                    {
                      value: `${data?.ticketDetail?.servicename}`,
                      label: `${data?.ticketDetail?.servicename}`,
                    },
                  ]}
                />
                <CustomInput type="text" label="نوع" name="type" disabled={true} />
                <CustomInput
                  type="text"
                  label="تاریخ ثبت"
                  name="registerDate"
                  disabled={true}
                />
              </div>
            </Form>
            <div>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    data?.ticketDetail?.status === 3 ? "#ff4d4f4d" : "#ff4d4f",
                }}
                icon={<AiFillDelete />}
                size="middle"
                className="ticket-inspection-btn"
                disabled={data?.ticketDetail?.status === 3 ? true : false}
                onClick={() => setIsModalOpen(true)}
              >
                بستن تیکت
              </Button>
            </div>
          </CustomCard>
        </div>
        <div className="refer">
          <CustomCard padding={PADDING_32} className="card-container">
            <h3 className="card-title">ارجاع تیکت</h3>
            <div className="refer-body">
              <CustomInput
                type="text"
                label="واحد مقصد"
                name="refer-unit"
                placeholder="4"
                disabled={true}
              />
              <div className="message-item">
                <span className="message-item-text">توضیحات</span>
                <TextArea showCount maxLength={100} disabled />
              </div>
            </div>
            <div>
              <Button
                type="primary"
                style={{ backgroundColor: CUSTOM_PRIMARY }}
                icon={<AiOutlineSend rotate={180} />}
                size="middle"
                className="ticket-inspection-btn"
                disabled
              >
                ارجاع
              </Button>
            </div>
          </CustomCard>
        </div>
        <div className="change-issue">
          <CustomCard padding={PADDING_32} className="card-container">
            <h3 className="card-title">تغییر موضوع</h3>
            <div className="change-issue-body">
              <div className="inputs-container">
                <CustomInput
                  type="text"
                  label="نوع"
                  name="change-issue-type"
                  placeholder="4"
                  disabled={true}
                />
                <CustomInput
                  type="text"
                  label="محصول"
                  name="change-issue-product"
                  placeholder="4"
                  disabled={true}
                />
              </div>
              <div className="message-item">
                <span className="message-item-text">توضیحات</span>
                <TextArea showCount maxLength={100} disabled />
              </div>
            </div>
            <div>
              <Button
                type="primary"
                style={{ backgroundColor: CUSTOM_PRIMARY }}
                icon={<AiOutlineSend rotate={180} />}
                size="middle"
                className="ticket-inspection-btn"
                disabled
              >
                ثبت
              </Button>
            </div>
          </CustomCard>
        </div>

        <div className="chat-box">
          <div className="response-content-container" ref={messagesEndRef}>
            {newMessageIsLoading ? (
              <MainSpinner />
            ) : (
              <ChatResponseGenerator
                responseData={data?.ticketDetail?.messeages}
                imgname={data?.ticketDetail?.imgname}
              />
            )}
          </div>
          <div className="bottom-action-container">
            <div className="messaging-action-container">
              <Input
                value={enteredText}
                prefix={
                  data?.ticketDetail?.status !== 3 && (
                    <AttachmentButton
                      handleFileChange={(e) => handleFileChange(e)}
                      fillColor={attachmentFile ? "#3e1ac0" : "#7A7A7A"}
                    />
                  )
                }
                onChange={(e) => setEnteredText(e.target.value)}
                // checkTextFormatToBeFarsi(e.target.value, setEnteredText)
                onKeyDown={(e) => e.key === "Enter" && onSubmitMessageHandler()}
                className="message-input"
                disabled={data?.ticketDetail?.status !== 3 ? false : true}
              />
              <div className="submit-button-container">
                <Button
                  type="primary"
                  size="middle"
                  className="ticket-inspection-btn submit-btn"
                  onClick={onSubmitMessageHandler}
                  loading={newMessageIsLoading}
                  disabled={
                    enteredText.trim().length === 0 && !attachmentFile ? true : false
                  }
                >
                  <SendMessageIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title="بستن تیکت"
          open={isModalOpen}
          onOk={closeTicketHandler}
          onCancel={() => setIsModalOpen(false)}
          className="close-ticket-modal"
        >
          <p className="close-ticket-message">آیا از بستن تیکت اطمینان دارید؟</p>
        </Modal>
      )}
    </>
  );
};

export default TicketInspection;
