import { DormSemesterData } from "../../../@types/@dormSemesterTypes";

export type DormBasicInfoSemesterTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormSemesterData) => void;
};
