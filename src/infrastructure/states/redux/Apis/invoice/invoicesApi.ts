import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetInvoiceDetailsResponse } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";

import { invoiceApi } from "../invoiceApi";

export const invoicesApi = invoiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceDetailsInfo: builder.query<
      GetInvoiceDetailsResponse,
      { invoiceId: string | undefined }
    >({
      query: (params) => ({
        url: `/invoice/admin/products${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useLazyGetInvoiceDetailsInfoQuery } = invoicesApi;
