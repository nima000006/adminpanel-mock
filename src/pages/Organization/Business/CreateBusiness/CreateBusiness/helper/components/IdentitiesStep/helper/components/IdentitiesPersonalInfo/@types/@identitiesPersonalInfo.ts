import { FormInstance } from "antd";

import { IdentitiesStepFormType } from "../../../../@types/@identitiesStepType";

export type GetGenderTypeResponse = {
  id: number;
  title: string;
}[];

export type IdentitiesPersonalInfoProps = {
  form: FormInstance<IdentitiesStepFormType>;
};
