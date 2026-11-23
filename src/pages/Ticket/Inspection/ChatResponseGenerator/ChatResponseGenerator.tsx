import moment from "jalali-moment";

import { ChatResponseGeneratorProps } from "./@types/@chatResponseGenerator";
import AttachmentIcon from "../../../../assets/icons/AttachmentIcon";
import avatarPlaceHolder from "../../../../assets/images/Avatar.webp";
import { convertDateToPersianDate } from "../../../../infrastructure/helpers/dateConvertor";
import "./_chatResponseGenerator.scss";

const ChatResponseGenerator = ({ responseData, imgname }: ChatResponseGeneratorProps) => {
  if (responseData?.length === 0) return <div></div>;

  //! When the user clicks on the link, the new page on the browser opens and shows the content of the attachment file
  const onClickFileAttachmentHandler = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      {responseData?.map((item) => {
        {
          /* //! The user's message */
        }
        if (item.typemsg === 1) {
          return (
            <div className="request-container" key={item.id}>
              <div className="image-container">
                <img
                  height="35px"
                  width="35px"
                  alt={item.id.toString()}
                  src={avatarPlaceHolder}
                />
              </div>
              <div className="request-text">{item.msg}</div>
              <div>
                {item.filedatas.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      onClickFileAttachmentHandler(
                        `${import.meta.env.VITE_URL_TICKET_BASE}${item.url}`
                      )
                    }
                    className="request-attachment"
                  >
                    <AttachmentIcon size="20" />
                    <p> {item.filename?.split(".")[0]}</p>
                  </div>
                ))}
              </div>
              <div className="request-date-container">
                <div>{convertDateToPersianDate(item?.date?.toString())}</div>
                <div>{moment(item?.date).locale("fa").format("HH:mm")}</div>
              </div>
            </div>
          );
        }
        {
          /* //! The admin's message */
        }
        if (item.typemsg === 2) {
          return (
            <div className="response-container" key={item.id}>
              <div className="image-container">
                <img
                  height="35px"
                  width="35px"
                  alt={item.id.toString()}
                  src={
                    imgname === "uniroom.svg"
                      ? "images/uni-room.svg"
                      : imgname === "unifood.svg"
                        ? "images/uni-food.svg"
                        : "images/uni-super-app.svg"
                  }
                />
              </div>
              <div className="response-text">{item.msg}</div>
              <div>
                {item.filedatas.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      onClickFileAttachmentHandler(
                        `${import.meta.env.VITE_URL_TICKET_BASE}${item.url}`
                      )
                    }
                    className="response-attachment"
                  >
                    <AttachmentIcon size="20" />
                    <p> {item.filename?.split(".")[0]}</p>
                  </div>
                ))}
              </div>
              <div className="response-date-container">
                <div>{convertDateToPersianDate(item.date.toString())}</div>
                <div>{moment(item.date).locale("fa").format("HH:mm")}</div>
              </div>
            </div>
          );
        } else {
          return <div key={item.id}></div>;
        }
      })}
    </>
  );
};

export default ChatResponseGenerator;
