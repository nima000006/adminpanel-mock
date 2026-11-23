import { useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  useLazyGetAccountingAllSamimServiceQuery,
  useLazyGetAccountingInvoiceTypeQuery,
} from "@infra/states/redux/Apis/finance/accountingApi";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { GetAccountingAllSamimServiceResponse } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";
const useMyBranchInvoicesAndDocsFactorsAdvanceFilter = () => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [invoiceType, setInvoiceType] = useState<IdTitleName[]>();

  //? ================================ Api Calls ================================
  //services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  // invoice type
  const [
    getInvoiceType,
    { isFetching: isGetInvoiceTypeLoading, isSuccess: isGetInvoiceTypeSuccess },
  ] = useLazyGetAccountingInvoiceTypeQuery();

  //* ================================ Util Functions ================================
  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res: GetAccountingAllSamimServiceResponse) => setServices(res));
    }
  };

  // invoice type
  const invoiceTypeHandler = () => {
    if (!isGetInvoiceTypeSuccess) {
      getInvoiceType()
        .unwrap()
        .then((res) => setInvoiceType(res));
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "نوع فاکتور",
      name: "factorType",
      type: "select",
      mode: "multiple",
      options: invoiceType,
      loading: isGetInvoiceTypeLoading,
      onClick: invoiceTypeHandler,
      isNeedsName: true,
    },
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      options: services,
      loading: isGetAllSamimServiceLoading,
      isNeedsName: true,
      onClick: getAllSamimServiceHandler,
      notFoundContent: selectNotFoundContent,
    },
  ];
  return { filterItemsList };
};
export default useMyBranchInvoicesAndDocsFactorsAdvanceFilter;
