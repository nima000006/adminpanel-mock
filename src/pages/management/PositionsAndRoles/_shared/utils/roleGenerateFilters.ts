import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { ManagementRole } from "./@types/@managementRole";
import { AllRoleGroup } from "../../AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleGroupList/@types/@allPositionsAndRolesRoleGroupList";
import { MyRoleGroup } from "../../MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleGroupList/@types/@MypositionsAndRolesRoleGroupList";

export const generateFilters = (
  data: ManagementRole[],
  dataIndex: keyof ManagementRole
) => {
  const uniqueValues = Array.from(
    new Set(
      data
        .map((item) => item[dataIndex])
        .filter((val): val is string => typeof val === "string" && val.trim() !== "")
    )
  );

  return uniqueValues.map((value) => ({
    text: serviceOptions?.find((item) => item?.value === value)?.title,
    value,
  }));
};

export const generateFiltersGroups = (
  data: AllRoleGroup[] | MyRoleGroup[],
  dataIndex: keyof AllRoleGroup
) => {
  const uniqueValues = Array.from(
    new Set(
      data
        .map((item) => item[dataIndex])
        .filter((val): val is string => typeof val === "string" && val.trim() !== "")
    )
  );

  return uniqueValues.map((value) => ({ text: value, value }));
};
