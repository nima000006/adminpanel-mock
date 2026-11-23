import { UploadChangeParam, UploadFile } from "antd/es/upload";
import dayjs from "dayjs";

import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type IdentitiesStepProps = {
  prevStep: () => void;
  onUploadFileChange: (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => void;
  loading: boolean;
};

export type CreateIdentityInBusinessRequest = {
  businessClerkOwnerUsername: string;
  businessClerkOwnerRegionId: number;
  businessClerkOwnerPersonalityCode: string;
  businessClerkOwnerMobileNumber: string;
  businessClerkOwnerPhoneNumber: string;
  businessClerkOwnerEmail: string;
  businessClerkOwnerStudyFieldId?: number;
  businessClerkOwnerDegreeId?: number;
  businessClerkOwnerZipCode: string;
  businessClerkOwnerAddress: string;
  businessClerkOwnerMandatoryFileId: number;
  businessClerkAdminUsername: string;
  businessClerkAdminRegionId: number;
  businessClerkAdminPersonalityCode: string;
  businessClerkAdminMobileNumber: string;
  businessClerkAdminPhoneNumber: string;
  businessClerkAdminEmail: string;
  businessClerkAdminStudyFieldId?: number;
  businessClerkAdminDegreeId?: number;
  businessClerkAdminZipCode: string;
  businessClerkAdminAddress: string;
  businessClerkAdminMandatoryFileId: number;
  businessTempId: number;
};

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type IdentitiesStepFormType = {
  firstName: string;
  lastName: string;
  genderType: SelectType;
  fatherName: string;
  birthdate: string;
  nationality: string;
  nationalCode: string;
  personalCode: string;
  grade: SelectType;
  field: SelectType;
  mobile: string;
  email: string;
  activityPhone: string;
  province: SelectType;
  city: SelectType;
  postalCode: string;
  address: string;
  adminFirstName: string;
  adminLastName: string;
  adminGenderType: SelectType;
  adminFatherName: string;
  adminBirthdate: string;
  adminNationality: string;
  adminNationalCode: string;
  adminPersonalCode: string;
  adminGrade: SelectType;
  adminField: SelectType;
  adminMobile: string;
  adminEmail: string;
  adminActivityPhone: string;
  adminProvince: SelectType;
  adminCity: SelectType;
  adminPostalCode: string;
  adminAddress: string;
  rangePicker: [dayjs.Dayjs, dayjs.Dayjs];
};
