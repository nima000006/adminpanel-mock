import { FormInstance, UploadFile } from "antd";

import { GetPendingPaymentDetailType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";

export type ReturnTransactionInfoProps = {
  total: number | undefined;
  loading: boolean;
  setReturnTransactionFileImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  returnTransactionFileImage: UploadFile<any>[];
  data: GetPendingPaymentDetailType | undefined;
  form: FormInstance<{
    transactionNumber: number;
    date: string;
    bankName: string;
    iban: number;
    file: string;
  }>;
};
