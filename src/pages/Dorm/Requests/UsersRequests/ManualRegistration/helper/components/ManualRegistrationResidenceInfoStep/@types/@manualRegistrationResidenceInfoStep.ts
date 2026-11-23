import { GetAllBranchType } from "@infra/states/redux/Apis/models/studentApi.model";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { AdmissionProgramListType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";
import { GetDormResidenceBuildingListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import { GetDormResidenceFloorListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";

//! LAYOUTs
export type ManualRegistrationResidenceInfoStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

type SelectType<T> = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: T;
  code: number;
};

export type AdmissionSelectType = SelectType<AdmissionProgramListType>;

export type AdmissionBuildingSelectType = SelectType<GetDormResidenceBuildingListTypes>;

export type AdmissionFloorSelectType = SelectType<GetDormResidenceFloorListTypes>;

export type DormitorySelectType = SelectType<GeneralSelectResponse>;

export type BranchSelectType = SelectType<GetAllBranchType>;

export type SelectedBuildingFloorType = {
  buildingData: GetDormResidenceBuildingListTypes | null;
  floorData: GetDormResidenceFloorListTypes | null;
};

export type MainFormDataType = {
  admission: AdmissionSelectType;
  date: [string, string];
  building: AdmissionBuildingSelectType;
  floor: AdmissionFloorSelectType;
  branch: BranchSelectType;
  dormitory: DormitorySelectType;
};

export type RangeDatePickerType =
  | "date"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | undefined;
