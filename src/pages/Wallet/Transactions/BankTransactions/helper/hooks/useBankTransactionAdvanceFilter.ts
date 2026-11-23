import { useEffect, useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  gateWayPaymentOptions,
  staffTypeOptions,
  statusOption,
} from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/helper/utils";

const useBankTransactionAdvanceFilter = ({
  advanceModalOpen,
}: {
  advanceModalOpen: boolean;
}) => {
  const [branches, setBranches] = useState<GetAllBranchesResponse>();

  //? ================================  Api Calls ================================
  const [getAllBranches, { isFetching: isGetAllBranchesLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      getAllBranches()
        .unwrap()
        .then((res) => setBranches(res));
    }
  }, [advanceModalOpen]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "شعبه / واحد",
      name: "branchIds",
      type: "select",
      mode: "multiple",
      loading: isGetAllBranchesLoading,
      options: branches,
    },
    {
      label: "گروه کاربری",
      name: "staffType",
      type: "select",
      isNeedsName: true,
      options: staffTypeOptions,
    },
    {
      label: "وضعیت",
      name: "successPayment",
      type: "select",
      options: statusOption,
      isNeedsName: true,
    },
    {
      label: "سرویس",
      name: "samimService",
      type: "select",
      options: serviceOptions,
      isNeedsName: true,
      mode: "multiple",
    },
    {
      label: "درگاه بانکی",
      name: "gateWayPayment",
      type: "select",
      isNeedsName: true,
      options: gateWayPaymentOptions,
    },
    {
      label: "تاریخ",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useBankTransactionAdvanceFilter;
