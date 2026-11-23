import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetContractRuleTypeQuery } from "@infra/states/redux/Apis/contracts/general/generalApis";

const useContractsConnectListFilter = () => {
  //Todo[Atefeh]: implement when api got ready
  // const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  //rule type
  const [
    triggerTypeBeneficiary,
    { data: typeBeneficiaryData, isLoading: typeBeneficiaryLoading },
  ] = useLazyGetContractRuleTypeQuery();

  //categories
  // const [getCategoryList, { data: categoryListData, isFetching: isCategoryListLoading }] =
  //   useLazyGetContractCategoriesQuery();

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "ذینفع",
      name: "ruleBeneficiariesUsernames",
      type: "select",
      mode: "multiple",
      options: typeBeneficiaryData ?? [],
      loading: typeBeneficiaryLoading,
      onClick: () => {
        if (!typeBeneficiaryData) {
          triggerTypeBeneficiary();
        }
      },
      isNeedsName: true,
    },
    {
      label: "فروشنده",
      name: "seller",
      type: "select",
      mode: "multiple",
      options: [],
    },
    // {
    //   label: "خدمت",
    //   name: "categoryIds",
    //   type: "select",
    //   mode: "multiple",
    //   onClick: () => {
    //     if (!categoryListData) {
    //       getCategoryList(params?.templateId);
    //     }
    //   },
    //   options:
    //     categoryListData?.map((item) => ({ id: item?.categoryId, title: item?.title })) ??
    //     [],
    //   loading: isCategoryListLoading,
    // },
    {
      label: "تاریخ شروع و پایان قالب قرارداد",
      name: "templateStartDate",
      type: "range",
      col: { lg: 24, md: 24, xs: 24, sm: 24 },
    },
  ];

  return { filterItemsList };
};

export default useContractsConnectListFilter;
