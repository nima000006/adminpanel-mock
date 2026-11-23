import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type myDoctorLabsListAdvanceFilterRequest = {
  params: {
    page: number;
    size: number;
    sort?: string[];
  };

  body: {
    title?: string;
    mobile?: string;
    employee?: string;
    cityId?: number;
    provinceId?: number;
    fromCreatedDate?: string;
    toCreatedDate?: string;
    recordStatus?: number;
    testIds?: number[];
  };
};

export type testDtoItems = {
  id: number;
  title: string;
  description: string;
  surveyTitle: string;
  surveyId: number;
  price: number;
  discount: number;
  fileUrl: string;
  testType: IdTitle;
  discountPercentage: number;
  freeConsultant: boolean;
};

export type myDoctorLabsListAdvanceFilterContentItems = {
  id: number;
  title: string;
  description: string;
  address: string;
  phone: string;
  cityId: number;
  cityTitle: string;
  provinceTitle: string;
  employee: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  recordStatus: number;
  latitude: number;
  longitude: number;
  testDto: testDtoItems[];
};

export type myDoctorLabsListAdvanceFilterResponse = {
  totalElements: number;
  isLast: boolean;
  content: myDoctorLabsListAdvanceFilterContentItems[];
  totalPages: number;
};

export type ListLabsAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  status: SelectType<IdTitleName>[];
};
