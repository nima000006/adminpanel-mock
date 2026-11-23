export type StudentRoleType = {
  id: string;
  studentNumber: string;
  unit: string;
  degree: string;
  major: string;
  entryYear: string;
};

export type EmployeeRoleType = {
  id: string;
  personnelNumber: string;
  unit: string;
  position: string;
};

export type ManualReservationUserType = {
  id: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  nationalCode: string;
  studentRoles: StudentRoleType[];
  employeeRoles: EmployeeRoleType[];
};

export type SelectUserFormType = {
  nationalCode?: string;
  selectedRoleId?: string;
};
