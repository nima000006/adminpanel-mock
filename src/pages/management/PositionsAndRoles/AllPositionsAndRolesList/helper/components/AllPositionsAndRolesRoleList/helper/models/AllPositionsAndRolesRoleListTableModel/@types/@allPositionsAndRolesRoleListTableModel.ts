import { ManagementRole } from "@pages/management/PositionsAndRoles/_shared/utils/@types/@managementRole";

export type AllPositionsAndRolesRoleListTableModelProps = {
  switchHandler: (name: string, isActive: boolean) => void;
  data: ManagementRole[];
  onEditClickHandler: (record: ManagementRole) => void;
};
