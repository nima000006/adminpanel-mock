import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! API
export type GetAccusationCategoriesListResponse = BPMS_API_RESPONSE<
  {
    sourceId: number;
    id: number;
    title: string;
    createDate: string;
    desc: null;
  }[]
>;
