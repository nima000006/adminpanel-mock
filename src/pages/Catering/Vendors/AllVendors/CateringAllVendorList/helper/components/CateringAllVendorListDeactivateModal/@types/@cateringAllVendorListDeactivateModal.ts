import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringAllVendorListRecordType } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";

export type CateringAllVendorListDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type CateringAllVendorListDeactivateModalProps = {
  open: boolean;
  record: CateringAllVendorListRecordType | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: CateringAllVendorListDeactivateModalFormType) => void;
};
