import { GetDormRequestPaymentInvoicePaymentStatus } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

export type UsersRequestsFactorReportsMoreDetailsDrawerProps = {
  onClose: () => void;
  data: (GetDormRequestPaymentInvoicePaymentStatus & { title: string }) | null;
};
