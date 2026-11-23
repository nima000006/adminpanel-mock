export type ManagementAllCustomerData = {
  id: number;
  firstName: string;
  enFirstName: string;
  lastName: string;
  enLastName: string;
  username: string;
  mobileNumber: string;
  regionId: number;
  region: string;
  email: string;
  createdDateTime: string;
};

export type ManagementAllCustomerDataResponse = {
  content: ManagementAllCustomerData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type UseAllCustomerListAdvanceFilterFormType = {
  regionsId: SelectTypes[];
  fromCreatedDate: string;
  toCreatedDate: string;
};

export type UseAllCustomerListEmployeeInquiryFormType = {
  nationalCode: string;
  personalCode: SelectTypes;
};

export type UseAllCustomerListStudentInquiryFormType = {
  nationalCode: string;
  studentNumber: string;
  selectStudentNumber: SelectTypes;
};
export type SajedInquiriesSelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    organizationChartId: string;
  };
  code: number;
};

//! APIs
export type SajedInquiriesType = {
  nationalCode: string;
  firstName: string;
  lastName: string;
  genderCode: number;
  jalaliBirthDate: string;
  fatherName: string;
  employeeTypeTitle: string;
  employeeTypeId: null;
  organizationChartId: string;
  organizationTitle: string;
  employeeType: number;
  employmentId: null;
  positionTitle: string;
  personId: string;
  unitCode: string;
  retired: boolean;
};

export type GetSajedInquiriesResponse = SajedInquiriesType[];
