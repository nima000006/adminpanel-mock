import { FormInstance } from "antd";

export type OrganizationUnitSectionProps = {
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
  ModifyOrganizationMood?: boolean;
  ModifyTopChartMood?: boolean;
  form: FormInstance<any>;
};
