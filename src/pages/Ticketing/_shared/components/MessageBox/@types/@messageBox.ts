import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type ChatSenderType = "USER" | "MYSELF" | "OTHER" | "DEFAULT";

export type ChatMessageModelType = {
  content: string;
  attachmentUrl: string;
  firstname: string;
  lastname: string;
  role: IdTitleName;
  createdUuid: string;
  createDate: string;
  bySelf: boolean;
  dayChange: boolean;
  id?: string | number; // بعدا پاک بشه
};
