import { FormInstance } from "antd";

// Form values type for the confirm/reject/return modals that have a description field
export interface BaseModalFormValues {
  description: string;
}

// Main form type for edit mode
export interface MainFormValues {
  // Basic Info Fields
  title: string;
  branchId: number;
  dormitoryId: string;
  currencyTypeId: string;
  tax: number;
  toll: number;
  description: string;
  appliedStartDate: string;
  appliedStartTime: string;
  appliedEndDate: string;
  appliedEndTime: string;
  descRequest: string;

  // Pricing Fields
  [key: `price-${number}`]: string; // Dynamic price fields from pricing table
}

// Form prop types for the different forms
export interface ConfirmFormProps {
  form: FormInstance<BaseModalFormValues>;
}

export interface RejectFormProps {
  form: FormInstance<BaseModalFormValues>;
}

export interface ReturnedFormProps {
  form: FormInstance<BaseModalFormValues>;
}

export interface MainFormProps {
  form: FormInstance<MainFormValues>;
}
