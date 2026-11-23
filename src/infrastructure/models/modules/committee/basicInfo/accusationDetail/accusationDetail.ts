export type BasicInfoNewAccusationDetailsSubmitType = {
  title: string;
  AssociationViiolation: {
    key: string;
    value: string;
    title: string;
    name: string;
    code: number;
    item: {
      regulationsId: string;
      AssociationInfractionType_title: string;
      id: number;
      title: string;
      createDate: string;
    };
  };
  createDate: string;
  desc: string;
};
