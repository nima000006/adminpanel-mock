export type BasicInfoAccusationAndViolationRecord = {
  regulationsId: string;
  AssociationInfractionType_title: string;
  id: number;
  title: string;
  createDate: string;
};
export type BasicInfoCreateOrEditSubmitType = {
  title: string;
  AssociationRegulations: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  AssociationInfractionType: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  AssociationViolationPenalty: [
    {
      key: string;
      value: string;
      children: string;
      name: string;
      code: number;
      item: {
        id: number;
        title: string;
      };
    },
  ];
  AssociationAdditionalViolationPunishment: [
    {
      key: string;
      value: string;
      children: string;
      name: string;
      code: number;
      item: {
        id: number;
        title: string;
      };
    },
  ];
  createDate: string;
  desc: string;
};
