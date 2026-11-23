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

export type ConfirmedRequestBedDeliverModalFormType = {
  essentialPhoneNumber: string;
  fatherName: string;
  fatherFamily: string;
  fatherPhone: string;
  motherName: string;
  motherFamily: string;
  motherPhone: string;
  spouseName: string;
  spouseFamily: string;
  spousePhone: string;
  relativeName: string;
  relativeFamily: string;
  relativePhone: string;
  maritalStatus: SelectType;
  relativeRelative?: string;
  description: string;
};
