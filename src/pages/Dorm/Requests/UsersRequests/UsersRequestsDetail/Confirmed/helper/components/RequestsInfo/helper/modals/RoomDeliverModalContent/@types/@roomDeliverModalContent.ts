import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
import { ConfirmedRequestBedDeliverModalFormType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/helper/components/Confirmed/@types/@usersRequestsListConfirmed";

export type RoomDeliverModalContentProps = {
  current: number;
  form: FormInstance<ConfirmedRequestBedDeliverModalFormType>;
  setFirstImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
};

export type GetMaritalStatusResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
