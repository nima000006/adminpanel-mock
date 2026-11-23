//! GENERAL
//! LAYOUT
export type LegalPlaintiffOutsideInfoProps = {
  complainantName: string | undefined;
  complainantFamily: string | undefined;
  position: string | undefined;
  unit: string | undefined;
  letterNo: string | undefined;
  letterDate: string | undefined;
};

export type PartiesInformationStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  violationId: number | null;
};
export type RealPlaintiffInfoProps = {
  complainantNo: string | undefined;
  complainantNationalcode: string | undefined;
  complainantPhoneNumber: string | undefined;
  complainantName: string | undefined;
  complainantFamily: string | undefined;
  field?: string | undefined;
  section?: string | undefined;
};
export type LegalPlaintiffInfoProps = {
  complainantPhoneNumber: string | undefined;
  complainantName: string | undefined;
  complainantFamily: string | undefined;
  personnelId: string | undefined;
  unit: string | undefined;
};
//! API
