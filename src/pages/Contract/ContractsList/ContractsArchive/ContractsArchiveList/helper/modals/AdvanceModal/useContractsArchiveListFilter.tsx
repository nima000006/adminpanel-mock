import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractPartiesQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import {
  useLazyGetCategoryByServiceListQuery,
  useLazyGetContractEcosystemQuery,
  useLazyGetContractRuleTypeQuery,
  useLazyGetContractServiceQuery,
} from "@infra/states/redux/Apis/contracts/general/generalApis";
import { ContractTemplateServiceType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateInfo/@types/@contractsTemplateInfoStep";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { ContractsArchiveListFilterFormType } from "../../../@types/@contractsArchive";

const useContractsArchiveListFilter = ({
  form,
  isModalOpen,
}: {
  form: FormInstance<ContractsArchiveListFilterFormType>;
  isModalOpen: boolean;
}) => {
  const { params } = useQueryParams();
  const selectedServices = Form.useWatch(
    "services",
    form
  ) as unknown as ContractTemplateServiceType[];
  //? ================================ Api Calls ================================
  // ecosystem
  const [triggerEcosystem, { data: EcosystemData, isLoading: ecosystemLoading }] =
    useLazyGetContractEcosystemQuery();

  //parties
  const [triggerParties, { data: PartiesData, isLoading: PartiesLoading }] =
    useLazyGetContractPartiesQuery();

  //service
  const [triggerService, { data: ServiceData, isLoading: ServiceLoading }] =
    useLazyGetContractServiceQuery();

  //categories
  const [getCategoryList, { data: categoryListData, isFetching: isCategoryListLoading }] =
    useLazyGetCategoryByServiceListQuery();

  //rule type
  const [
    triggerTypeBeneficiary,
    { data: typeBeneficiaryData, isLoading: typeBeneficiaryLoading },
  ] = useLazyGetContractRuleTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.servicesName && isModalOpen) {
      getCategoryList([params?.servicesName]);
    }
  }, [params?.servicesName, isModalOpen]);

  //? ================================ Utils function ================================
  const templateServiceChangeHandler = (options: ContractTemplateServiceType[]) => {
    const tempServiceNames: string[] = options
      .map((service) => {
        const filteredServiceValue = serviceOptions.find(
          (s) => s.value === service?.item?.name
        )?.value;

        if (filteredServiceValue) {
          return filteredServiceValue;
        }
      })
      .filter((value): value is string => Boolean(value));

    if (tempServiceNames?.length > 0) {
      getCategoryList(tempServiceNames);
    }

    form.setFieldsValue({
      categoryIds: [],
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "اکوسیستم",
      name: "ecosystemIds",
      type: "select",
      mode: "multiple",
      options: EcosystemData ?? [],
      loading: ecosystemLoading,
      onClick: () => {
        if (!EcosystemData) {
          triggerEcosystem();
        }
      },
    },
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      options: ServiceData ?? [],
      loading: ServiceLoading,
      onClick: () => {
        if (!ServiceData) {
          triggerService();
        }
      },
      onChange: (_, options) =>
        templateServiceChangeHandler(options as ContractTemplateServiceType[]),
      isNeedsName: true,
    },
    {
      label: "خدمت",
      name: "categoryIds",
      type: "select",
      mode: "multiple",
      options:
        categoryListData?.map((item) => ({ id: item?.categoryId, title: item?.title })) ??
        [],
      loading: isCategoryListLoading,
      disabled: !(selectedServices?.length > 0),
    },
    {
      label: "طرفین",
      name: "parties",
      type: "select",
      mode: "multiple",
      options: PartiesData?.content ?? [],
      loading: PartiesLoading,
      onClick: () => {
        if (!PartiesData) {
          triggerParties({ page: 0, size: 1000 });
        }
      },
    },

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
    // TODO: [nima] uncomment when api is ready
    // {
    //   label: "قالب قرارداد",
    //   name: "template",
    //   type: "select",
    //   mode: "multiple",
    //   options: [],
    // },
    {
      label: "تاریخ شروع و پایان",
      name: "date",
      type: "range",
      picker: "date",
      col: { lg: 24, md: 24, xs: 24, sm: 24 },
    },
  ];

  return {
    filterItemsList,
  };
};

export default useContractsArchiveListFilter;
