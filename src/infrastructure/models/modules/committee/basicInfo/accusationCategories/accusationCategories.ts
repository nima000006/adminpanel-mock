export type BasicInfoAccusationCategoriesInfoRecordsType = {
  sourceId: number;
  id: number;
  title: string;
  createDate: string;
  desc: null;
};
export type BasicInfoNewAccusationCategoriesSubmitType = {
  title: string;
  regulations: {
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
  desc: string;
};
