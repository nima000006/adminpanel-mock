export type GetPreparationStepsResidenceDetailRequest = {
  uuid: string;
};

export type GetPreparationStepsResidenceDetailResponse = {
  structureReady: boolean;
  admissionPlanReady: boolean;
};
