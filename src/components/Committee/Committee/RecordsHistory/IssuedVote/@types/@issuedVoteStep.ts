//! General
export type IssuedVoteStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type punishmentCountType = {
  preliminaryPunishmentQty: [] | number[];
  appealPunishmentQty: [] | number[];
  centralPunishmentQty: [] | number[];
};
