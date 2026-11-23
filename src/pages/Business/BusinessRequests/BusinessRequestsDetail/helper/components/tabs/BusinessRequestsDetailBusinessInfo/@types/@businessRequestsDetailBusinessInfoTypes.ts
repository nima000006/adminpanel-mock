export type BusinessRequestInformationDetailsResponse = {
  personalityTypeId: number;
  personalityTypeTitle: string;
  businessTempTitle: string;
  legalPersonalityGroupTypeId: string;
  businessTempId: number;
  nationalCodeLegal: string;
  economicNumberLegal: string;
  taxTrackingNumberLegal: string;
  taxType: string;
  businessTitle: string;
  tradeTitle: string;
  economicNumberNatural: string;
  taxTrackingNumberNatural: string;
  licenceNumber: string;
  personalInformation: {
    firstname: string;
    lastname: string;
    birthDate: string;
    nationalCode: string;
    nationality: string;
    gender: string;
    phoneNumber: string;
  };
  filesUrl: {
    [key: string]: string;
  };
};

export type BusinessRequestInformationDetailsParams = {
  businessTempHistoryId: number;
};
