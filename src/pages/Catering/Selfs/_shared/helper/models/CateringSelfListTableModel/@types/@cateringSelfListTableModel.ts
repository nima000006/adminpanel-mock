import { CateringSelfRecordType } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

export type CateringSelfListTableModelProps = {
  onView: (id: number) => void;
  onEdit?: (record: CateringSelfRecordType) => void;
  onDeActive?: (record: CateringSelfRecordType) => void;
  onActive?: (id: number) => void;
  isArchive?: boolean;
};
