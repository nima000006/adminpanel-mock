type DataItem = {
  id: number;
  title: string;
};

export type PreliminaryRecordsType = {
  executionDate: string; // تاریخ اجرا حکم
  descAggravation: string; // توضیح تشدید حکم
  legalArticle: string | null; //ماده قانونی مرتبط
  id: number;
  AssociationPunish?: DataItem;
  AssociationRulings: DataItem;
  AssociationReasonEscalation?: DataItem;
  AssociationExecutionStatus?: DataItem;
  AssociationCertainty?: DataItem;
};
export type AppealRecordsType = {
  executionDate: string; // تاریخ اجرا حکم
  descAggravation: string; // توضیح تشدید حکم
  legalArticle: string | null; //ماده قانونی مرتبط
  id: number;
  AssociationAappealPunish?: DataItem;
  AssociationAappealRulings: DataItem;
  AssociationAappealReasonAggravation?: DataItem;
  AssociationAappealExecutionStatus: DataItem;
  AssociationAappealCertainty: DataItem;
};
export type CentralRecordsType = {
  executionDate: string; // تاریخ اجرا حکم
  descAggravation: string; // توضیح تشدید حکم
  legalArticle: string | null; //ماده قانونی مرتبط
  id: number;
  AssociationCentralPunish?: DataItem;
  AssociationCentralRulings: DataItem;
  AssociationCentralReasonAggravation?: DataItem;
  AssociationCentralExecutionStatus: DataItem;
  AssociationCentralCertainty: DataItem;
};
export type PreliminaryIssuedVoteProps = {
  data: {
    title: string;
    sessionDate: string | undefined;
    sessionNumber: string | undefined;
    punishmentCount: number | null;
    records: PreliminaryRecordsType[] | null;
    description: string | undefined;
  };
};
export type AppealIssuedVoteProps = {
  data: {
    title: string;
    sessionDate: string | undefined;
    sessionNumber: string | undefined;
    punishmentCount: number | null;
    records: AppealRecordsType[] | null;
    description: string | undefined;
  };
};
export type CentralIssuedVoteProps = {
  data: {
    title: string;
    sessionDate: string | undefined;
    sessionNumber: string | undefined;
    punishmentCount: number | null;
    records: CentralRecordsType[] | null;
    description: string | undefined;
  };
};
