import { useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { beneficiary_payment_status_debit_credit } from "@pages/Finance/Accountants/_shared/utils";
import { GetAccountingAllSamimServiceResponse } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useMyInvoicesAndDocsServiceDocumentsAdvanceFilter = () => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();

  //? ================================ Api Calls ================================
  //services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //* ================================ Util Functions ================================
  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res: GetAccountingAllSamimServiceResponse) => setServices(res));
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "امکان تسویه",
      name: "possibilitySettlement",
      type: "select",
      options: [
        {
          id: 1,
          title: "قابل تسویه",
          name: "SETTLED",
        },
        {
          id: 2,
          title: "غیر قابل تسویه",
          name: "UN_SETTLED",
        },
      ],
      isNeedsName: true,
    },
    {
      label: "وضعیت پرداخت",
      name: "status",
      type: "select",
      mode: "multiple",
      options: beneficiary_payment_status_debit_credit,
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
export default useMyInvoicesAndDocsServiceDocumentsAdvanceFilter;
