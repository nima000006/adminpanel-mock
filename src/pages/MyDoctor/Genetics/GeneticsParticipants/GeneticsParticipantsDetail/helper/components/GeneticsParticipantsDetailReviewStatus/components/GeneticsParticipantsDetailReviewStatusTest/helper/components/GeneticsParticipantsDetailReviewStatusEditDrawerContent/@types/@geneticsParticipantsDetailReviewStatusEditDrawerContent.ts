import { Dayjs } from "dayjs";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GeneticsParticipantsDetailReviewStatusEditDrawerContentFormType = {
  lab: SelectType<IdTitle>;
  suggestionDate: Dayjs;
  suggestionTime: Dayjs;
};

export type GeneticsParticipantsDetailReviewStatusEditDrawerContentProps = {
  closeDrawerHandler: () => void;
  centerId: string;
  createdDate: string;
  testId: string;
  requestTestId: string;
  statusId: string;
};
