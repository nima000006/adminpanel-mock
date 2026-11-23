import { FormInstance } from "antd";

//! LAYOUT
export type PendingListConfirmBedAllocationModalContentProps = {
  form: FormInstance<{
    paymentType: {
      label: string;
      value: string;
    };
    description: string;
  }>;
};
