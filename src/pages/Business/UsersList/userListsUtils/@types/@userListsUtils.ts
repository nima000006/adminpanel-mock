//! GENERAL
//! LAYOUT
export type userListTable = {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  nationality: string;
  studentNumber: string;
  createDate: string;
  levelName: string;
  fieldName: string;
  enTerm: string;
  mobile: string;
};

export type UpdateUserInfoForm = {
  name: string | null;
  family: string | null;
  gender: {
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
  nationalCode: string | null;
  fieldName: string | null;
  levelName: string | null;
  studentNumber: string | null;
  branchName: {
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
};
