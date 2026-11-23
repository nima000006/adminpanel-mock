import { Key } from "react";

import { FormInstance } from "antd";

import { CreateAdminFormType } from "@pages/management/AdminsList/AllAdminsList/@types/@managementsUserAllAdminListTypes";

export type CreateAdminModalContentProps = {
  step: number;
  form: FormInstance<CreateAdminFormType>;
  onPasswordRulesPassed: (passValue: boolean) => void;
  targetKeys: Key[] | undefined;
  setTargetKeys: React.Dispatch<React.SetStateAction<React.Key[] | undefined>>;
};
