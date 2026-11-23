import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT

//! API
export type GetSubmitterRequestLetterDetailResponse = BPMS_API_RESPONSE<{
  inquirerOrganization: "واحد کرج";
  inquirerPost: "معاون پژوهشی";
  inquirerLastName: "محمدی";
  inquirerFirstName: "محمد";
  signatoryPost: "معاون دانشجویی";
  signatoryLastName: "علوی";
  nationalCodeOffender: "46456456";
  nameOffender: "عاطفه";
  familyOffender: "بخشی";
  inquirerNumber: "5678798978";
  signatoryFirstName: "علی";
  signatoryOrganization: "واحد کرج";
  descRequest: "توضیحات 3";
  inquirerDateRequest: "2024-03-22T20:46:00.000+0330";
  id: number;
  studentNumberOffender: "787768686";
}>;
export type GetSubmitterRequestLetterDetailRequest = {
  _data_: {
    id: string;
  };
};
