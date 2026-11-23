//! LAYOUT
export type InsuredIdentityInfoProps = {
  name?: string;
  family?: string;
  fatherName?: string;
  gender?: string;
  baseInsurance?: string;
  nationalCode?: string;
  birthDate?: string;
  studentNumber?: string;
  university?: string;
  relation?: string;
  role: "main" | "partner" | "child";
};
