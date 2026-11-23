export type AdmissionSwitchAlertProps = {
  question: string;
  description?: string;
  valuePropName: string;
  defaultChecked?: boolean;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};
