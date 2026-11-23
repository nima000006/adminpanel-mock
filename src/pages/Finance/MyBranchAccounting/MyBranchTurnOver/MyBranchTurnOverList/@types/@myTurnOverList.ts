import { Moment } from "jalali-moment";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyTurnOverFormType = {
  rangeDate: [Moment, Moment];
  branch: SelectType<IdTitle>;
  service: SelectType<IdTitleName>;
};
