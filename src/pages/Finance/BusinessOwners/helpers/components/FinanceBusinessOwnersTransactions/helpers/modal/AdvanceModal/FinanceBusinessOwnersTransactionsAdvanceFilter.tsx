import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

const useFinanceBusinessOwnersTransactionsAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "",
      name: "transaction",
      type: "slider",
      min: 10000,
      max: 50000000,
      labelMin: "حداقل مبلغ تراکنش (ت)",
      labelMax: "حداکثر مبلغ تراکنش (ت)",
    },
    //Todo[Nima]: we had from to in main page, so we don't need it here
    // {
    //   label: "بازه زمانی  تراکنش",
    //   name: "date",
    //   type: "range",
    // },
    {
      label: "سرویس",
      name: "serviceName",
      type: "select",
      mode: "multiple",
      options: serviceOptions,
    },
    {
      label: "وضعیت عودت",
      name: "refund",
      type: "select",
      options: [
        { id: 1, title: "عودت داده شده" },
        { id: 2, title: "عودت نشده" },
      ],
    },
    {
      label: "کد ملی / اتباع",
      name: "nationalCode",
      type: "input",
    },

    // {
    //   label: "وضعیت",
    //   name: "status",
    //   type: "select",
    //   options: [
    //     { id: 1, title: "", code: "PENDING" },
    //     { id: 2, title: "تکمیل شده", code: "COMPLETED" },
    //     { id: 3, title: "لغو شده", code: "CANCELLED" },
    //     // ... بقیه status ها
    //   ],
    // },
  ];

  return { filterItemsList };
};

export default useFinanceBusinessOwnersTransactionsAdvanceFilter;
