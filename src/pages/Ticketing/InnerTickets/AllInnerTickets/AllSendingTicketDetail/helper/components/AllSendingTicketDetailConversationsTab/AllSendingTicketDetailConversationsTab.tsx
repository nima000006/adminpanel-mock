import { useEffect, useRef } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { ChatMessageModelType } from "@pages/Ticketing/_shared/components/MessageBox/@types/@messageBox";
import MessageBox from "@pages/Ticketing/_shared/components/MessageBox/MessageBox";
import { AllSendingTicketDetailConversationsTabProps } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/helper/components/AllSendingTicketDetailConversationsTab/@types/@allSendingTicketDetailConversationsTabTypes";

const AllSendingTicketDetailConversationsTab = ({
  data,
  loading,
}: AllSendingTicketDetailConversationsTabProps) => {
  const getOnlyDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toDateString();
  };
  const bottomRef = useRef<HTMLDivElement>(null);

  const sortedData = [...(data || [])].sort(
    (a, b) =>
      new Date(a.createDate ?? "").getTime() - new Date(b.createDate ?? "").getTime()
  );

  //? ================================ Effects ================================
  //scrolling in latest message
  useEffect(() => {
    if (!loading && sortedData.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [loading, sortedData.length]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading} className="flex flex-col gap-6">
      {!sortedData.length ? (
        <div className="m-20">
          <CustomEmpty description="مکالمه‌ای برای نمایش وجود ندارد..." />
        </div>
      ) : (
        <>
          {sortedData.map((message: ChatMessageModelType, index) => {
            const currentDate = getOnlyDate(message.createDate);

            const previousMessage = sortedData[index - 1];
            const previousDate = getOnlyDate(previousMessage?.createDate);

            const isStartOfDay = currentDate !== previousDate;

            return (
              <div key={message.createdUuid} className="flex flex-col gap-4">
                {isStartOfDay && (
                  <CustomDivider
                    text={convertDateToPersianTextDateWithoutHours(
                      message.createDate ?? ""
                    )}
                    titlePlacement="center"
                  />
                )}

                <MessageBox message={message} />
              </div>
            );
          })}

          <div ref={bottomRef} />
        </>
      )}
    </Div>
  );
};
export default AllSendingTicketDetailConversationsTab;
