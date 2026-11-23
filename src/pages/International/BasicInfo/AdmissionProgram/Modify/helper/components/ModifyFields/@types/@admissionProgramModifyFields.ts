export type GetAllBranchesByAdvanceFilterResponse = {
  studyGroupId: number;
  studyGroupTitle: string;
  filedId: number;
  filedTitle: string;
  degreeId: number;
  degreeTitle: string;
  branchId: number;
  branchTitle: string;
  branchFieldId: number;
}[];

export type GetAllBranchesByAdvanceFilterRequest = {
  branchIds?: number[];
  degreeIds: number[];
  fieldIds?: number[];
  studyGroupId: number;
};
