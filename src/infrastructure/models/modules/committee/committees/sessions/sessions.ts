//!Creation
export type SessionCreationDataSource = {
  key: string;
  name: string;
  familyName: string;
  role: string;
  userNumber: string;
  mobile: string;
  presence: boolean;
};
export type SessionCreationMembersType = {
  boss: boolean;
  cultural: boolean;
  legal: boolean;
  academic: boolean;
  student: boolean;
  secretary: boolean;
  radioType: number;
  sendingMessage: string;
};
