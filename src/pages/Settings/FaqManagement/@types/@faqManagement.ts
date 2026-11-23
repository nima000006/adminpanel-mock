export type AppFaqTableModelProps = {
  onVisitClickHandler: (id: number) => void;
  onDeleteClickHandler: (id: number) => void;
};

export type FaqTableInfoProps = {
  setIsVisitFaqDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  setIsModifyFaqDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

//! API
export type FaqDetailData = {
  faQuestion: string;
  faAnswer: string;
  enQuestion: string;
  enAnswer: string;
  arQuestion: string;
  arAnswer: string;
  orderId: number;
};

// list
export type FaqRecordType = {
  id: number;
  question: string;
  answer: string;
  orderId: number;
};

export type GetFaqListResponse = FaqRecordType[];

// detail
export type GetFaqDetailResponse = FaqDetailData;

// delete
export type DeleteFaqResponse = void;

// create
export type CreateFaqResponse = number;

export type CreateFaqRequest = {
  faQuestion: string;
  faAnswer: string;
  enQuestion: string;
  enAnswer: string;
  arQuestion: string;
  arAnswer: string;
  orderId: number;
  serviceId: number;
};
