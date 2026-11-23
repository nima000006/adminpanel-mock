import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllForeignDetailResponse = {
  id: number;
  status: IdTitleName;
  gender: IdTitleName;
  studentNumber: string;
  regionId: number;
  regionTitle: string;
  internationalCode: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: string;
  mobileNumber: string;
  rejectReason: IdTitleName;
  citizenType: IdTitleName;
  saorgCode: string;
  description: string;
  uploadFiles: { url: string; id: number }[];
  createdDate: string;
  modifiedDate: string;
  modifiedBy: string;
  daysCount: number;
  rejectDescription: string;
};
