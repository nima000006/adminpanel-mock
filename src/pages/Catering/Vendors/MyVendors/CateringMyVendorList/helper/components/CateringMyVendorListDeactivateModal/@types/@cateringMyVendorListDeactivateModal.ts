import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringMyVendorListRecordType } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

export type CateringMyVendorListDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type CateringMyVendorListDeactivateModalProps = {
  open: boolean;
  record: CateringMyVendorListRecordType | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: CateringMyVendorListDeactivateModalFormType) => void;
};
