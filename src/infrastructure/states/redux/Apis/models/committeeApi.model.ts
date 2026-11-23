export type BPMS_API_RESPONSE<Data> = {
  msg: string;
  status: number;
  data: Data;
};

export type CreateAccusationRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    desc: string;
    AssociationRegulation_number: number;
  }
>;
type RejectionReason = {
  id: number;
  title: string;
};
export type GetRejectionReasonsResponse = {
  msg: string;
  status: number;
  data: RejectionReason[];
};

export type BPMS_API_REQUEST<Name, Data extends object> = {
  form: Name;
  id?: string;
  id_IN?: string;
  data?: Data;
  _data_?: Data;
  query?: {
    filters: [
      {
        key: "id";
        operator: "IN";
        value: string;
      },
    ];
  };
};
