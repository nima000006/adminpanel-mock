import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type LabsModifyDrawerContentProps = {
  closeDrawerHandler: () => void;
  modifyData: {
    isOpen: boolean;
    id: number;
  };
  fetchLabsList: () => Promise<void>;
};

export type ModifyLabsFormType = {
  labName: string;
  city: SelectType<IdTitle>;
  province: SelectType<IdTitle>;
  address: string;
  employeeName: string;
  employeePhone: string;
  phone: string;
  survey: SelectType<IdTitle>;
  test: SelectType<IdTitleName>[];
};

export type myDoctorLabsCreateRequest = {
  title: string;
  address: string;
  phone: string;
  cityId: number;
  tests: number[];
  latitude: number;
  longitude: number;
  employeeName: string; // طبق صحبت با اقای جماعتی این کلید اضافه خواد شد
  employeePhone: string; // طبق صحبت با اقای جماعتی این کلید اضافه خواد شد
};

export type GetTestGeneticContentItems = {
  id: number;
  title: string;
  description: string;
  surveyTitle: string;
  surveyId: number;
  price: number;
  discount: number;
  fileUrl: string;
  testType: {
    id: number;
    title: string;
  };
  discountPercentage: number;
  freeConsultant: boolean;
};

export type GetTestGeneticResponse = {
  totalElements: number;
  isLast: boolean;
  content: GetTestGeneticContentItems[];
  totalPages: number;
};

export type GetDetailLabsTestDtoItem = {
  id: number;
  title: string;
  description: string;
  surveyTitle: string;
  surveyId: number;
  price: number;
  discount: number;
  fileUrl: string;
  testType: {
    id: number;
    title: string;
  };
  discountPercentage: number;
  freeConsultant: boolean;
};

export type GetDetailLabsResponse = {
  title: string;
  description: string;
  address: string;
  phone: string;
  cityId: number;
  cityTitle: string;
  provinceTitle: string;
  provinceId: number;
  employee: string;
  employeePhone: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  recordStatus: number;
  latitude: number;
  longitude: number;
  testDto: GetDetailLabsTestDtoItem[];
};

export type myDoctorLabsUpdateRequest = {
  id: number;
  title: string;
  description?: string;
  address: string;
  phone: string;
  cityId: number;
  tests: number[];
  latitude: number;
  longitude: number;
  recordStatus: number;
  employeeName: string;
  employeePhone: string;
};
