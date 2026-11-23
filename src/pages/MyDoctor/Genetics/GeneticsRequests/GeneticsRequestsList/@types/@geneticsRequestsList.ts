export type myDoctorGeneticAllTypesRequest = {
  surveyId: number;
  testType: number;
  page: number;
  size: number;
  sort?: string[];
};

export type myDoctorGeneticAllTypesResponse = {
  totalElements: number;
  isLast: boolean;
  content: {
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
  }[];
  totalPages: number;
};
