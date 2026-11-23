import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringSelfRecordType } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

export type AllSelfListDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type AllSelfListDeactivateModalProps = {
  open: boolean;
  record: CateringSelfRecordType | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: AllSelfListDeactivateModalFormType) => void;
};

export type GetDeactiveReasonsResponse = {
  id: number;
  title: string;
  faTitle: string;
}[];
