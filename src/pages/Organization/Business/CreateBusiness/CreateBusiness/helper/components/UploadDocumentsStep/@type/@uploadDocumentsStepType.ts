export type UploadDocumentsStepProps = {
  nextStep: () => void;
  prevStep: () => void;
};

export type CreateUploadFileInBusinessRequest = {
  businessTempId: number;
  unitMandatoryFileId: number | null;
  unitSecondaryFileId: number | null;
  branchMandatoryFileId: number | null;
  branchSecondaryFileId: number | null;
  positionMandatoryFileId: number | null;
  positionSecondaryFileId: number | null;
  topChartMandatoryFileId: number | null;
  topChartSecondaryFileId: number | null;
};
