import { useEffect, useRef } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { ChatMessageModelType } from "@pages/Ticketing/_shared/components/MessageBox/@types/@messageBox";
import MessageBox from "@pages/Ticketing/_shared/components/MessageBox/MessageBox";
import { TicketingAllDetailsNotesResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsNotesResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

import { NotesTabProps } from "./@types/@notesTabTypes";

type NoteItem =
  | TicketingMyDetailsNotesResponse[number]
  | TicketingAllDetailsNotesResponse[number];

const mapAIToChat = (
  aiData: TicketingMyDetailsNotesResponse | TicketingAllDetailsNotesResponse | undefined
): ChatMessageModelType[] | undefined => {
  if (!aiData) return undefined;

  return aiData.map((m: NoteItem) => ({
    content: m?.content,
    attachmentUrl: m?.attachmentUrl,
    firstname: m?.fromUserFirstname,
    lastname: m?.fromUserLastname,
    role: m?.fromUserRole,
    createdUuid: m?.createdDate,
    createDate: m?.createdDate,
    bySelf: false,
    dayChange: false,
  }));
};

const getOnlyDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toDateString();
};

const NotesTab = ({ data, loading }: NotesTabProps) => {
  const mapped = mapAIToChat(data);

  const sortedMapped = [...(mapped || [])].sort(
    (a, b) =>
      new Date(a.createDate ?? "").getTime() - new Date(b.createDate ?? "").getTime()
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  //? ================================ Effects ================================
  //scrolling in latest message
  useEffect(() => {
    if (!loading && sortedMapped.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [loading, sortedMapped.length]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading} className="flex flex-col gap-6">
      {!sortedMapped.length ? (
        <div className="m-20">
          <CustomEmpty description="یادداشتی برای نمایش وجود ندارد..." />
        </div>
      ) : (
        <>
          {sortedMapped.map((message: ChatMessageModelType, index) => {
            const currentDate = getOnlyDate(message.createDate);

            const previousMessage = sortedMapped[index - 1];
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
export default NotesTab;
