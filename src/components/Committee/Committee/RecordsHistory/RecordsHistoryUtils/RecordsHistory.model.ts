import { FormInstance } from "antd";

export type VoteProps = {
  form: FormInstance<any>;
  isPunishmentListLoading: boolean | undefined;
  punishmentListData: { title: string; id: number }[] | undefined;
  isCertaintyListLoading: boolean | undefined;
  certaintyListDataListData: { title: string; id: number }[] | undefined;
  isExecutionListLoading: boolean | undefined;
  executionListDataListData: { title: string; id: number }[] | undefined;
  // isGetLegalArticleListLoading: boolean | undefined;
  // legalArticleListData: { title: string; id: number }[] | undefined;
  isReasonEscalationListLoading: boolean | undefined;
  reasonEscalationListData: { title: string; id: number }[] | undefined;
  voteStatus?: number;
  voteData: any;
  loadingData: boolean;
};

export type PunishmentGeneratorValueType = {
  certainty: string;
  executionStatus: string;
  legalArticle: string;
  reasonAggravation: string;
  descAggravation: string;
  executionDate: string;
  // تنبیه انضباطی صادره
  AssociationRulings?: {
    id: number;
    title: string;
  };
  AssociationAappealRulings?: {
    id: number;
    title: string;
  };
  AssociationCentralRulings?: {
    id: number;
    title: string;
  };

  //حکم اولیه
  AssociationPunish?: {
    id: number;
    title: string;
  };
  AssociationAappealPunish?: {
    id: number;
    title: string;
  };
  AssociationCentralPunish?: {
    id: number;
    title: string;
  };
};
