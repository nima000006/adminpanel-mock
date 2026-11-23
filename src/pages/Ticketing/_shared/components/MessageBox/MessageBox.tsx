import { UploadFile } from "antd";

import { CustomUploader } from "@components/CustomInputs";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";

import { ChatSenderType, ChatMessageModelType } from "./@types/@messageBox";
import avatarPlaceHolder from "../../../../../assets/images/Avatar.webp";

const getSenderType = (message: ChatMessageModelType): ChatSenderType => {
  if (message.bySelf) return "MYSELF"; // پیام خود

  const roleName = message.role?.name?.toLowerCase() || "";
  if (roleName.includes("user")) return "USER"; // پیام کاربر
  if (roleName.includes("manager") || roleName.includes("admin")) return "OTHER"; // پیام کارشناس و کارشناس ارشد
  return "DEFAULT"; // پیام‌های دیگر (مثل یادداشت هوشمند)
};

const CHAT_THEME: Record<
  ChatSenderType,
  {
    container: string;
    bubble: string;
    border: string;
    align: "left" | "right";
  }
> = {
  USER: {
    //کاربر
    align: "right",
    container: "justify-end",
    bubble: "bg-[#FAFAFA]",
    border: "border border-[#BFBFBF]",
  },
  MYSELF: {
    //پیام خود شما
    align: "left",
    container: "justify-end",
    bubble: "bg-[#40a9ff1a]",
    border: "border border-[#40A9FF]",
  },
  OTHER: {
    // کارشناس ارشد و کارشناس
    align: "right",
    container: "justify-start",
    bubble: "bg-[#ffa9401a]",
    border: "border border-[#FFA940]",
  },
  DEFAULT: {
    //یادداشت هوشمند
    align: "right",
    container: "justify-end",
    bubble: "bg-[#40a9ff1a]",
    border: "border border-[#40A9FF]",
  },
};

const AvatarRenderer = ({ src, alt }: { src?: string; alt?: string }) => {
  return (
    <img
      height="35px"
      width="35px"
      className="border-neutral-3 rounded-full border"
      alt={alt}
      src={src ? src : avatarPlaceHolder}
    />
  );
};

const MessageBox = ({ message }: { message: ChatMessageModelType }) => {
  const senderType = getSenderType(message);
  const theme = CHAT_THEME[senderType];
  const isRight = theme.align === "right";
  const senderName = `${message.firstname} ${message.lastname}`;

  const attachmentFileList: UploadFile[] = message?.attachmentUrl
    ? [
        {
          uid: "1",
          name: message?.attachmentUrl,
          status: "done",
          url: message?.attachmentUrl,
        },
      ]
    : [];

  return (
    <div className={`flex items-start gap-4 ${theme?.container}`}>
      {/* Avatar Left */}
      {!isRight && <AvatarRenderer src="" alt={senderName} />}

      {/* Bubble */}
      <div
        className={`dark:bg-neutral-2 flex w-full flex-col gap-2 rounded-2xl p-6 ${!isRight ? "rounded-tr-sm" : "rounded-tl-sm"} ${theme.bubble} ${theme.border}`}
      >
        {/* Header */}
        <span className="footnote">{senderName}</span>

        {/* Message */}
        <p className="body-medium wrap-break-word whitespace-pre-wrap">
          {message?.content}
        </p>

        {/* Attachment */}
        <CustomUploader
          fileList={attachmentFileList}
          setFileList={() => {}}
          isReadOnly
          hasUploaderIcon={false}
          classNameOuterDiv="!h-auto"
          className="[&_.download-btn-container]:h-25! [&_.download-btn-container]:w-25! [&_.download-btn-container]:overflow-hidden [&_.download-btn-container]:p-0! [&_img]:h-25! [&_img]:w-25! [&_img]:rounded-xl [&_img]:object-cover"
        />

        {/* Footer */}
        <div className="flex justify-between">
          <span className="footnote">{message?.role?.title}</span>
          <span className="footnote">
            {convertDateToPersianTextDateWithTime(message?.createDate)}
          </span>
        </div>
      </div>

      {/* Avatar Right */}
      {isRight && <AvatarRenderer src="" alt={senderName} />}
    </div>
  );
};

export default MessageBox;
