import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetCategoryByServiceListQuery,
  useLazyGetContractEcosystemQuery,
  useLazyGetContractRuleTypeQuery,
  useLazyGetContractServiceQuery,
  useLazyGetContractStatusQuery,
} from "@infra/states/redux/Apis/contracts/general/generalApis";
import { useLazyGetContractBranchTypeQuery } from "@infra/states/redux/Apis/contracts/listOfStakeholders/listOfStakeholders";
import { ContractTemplateServiceType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateInfo/@types/@contractsTemplateInfoStep";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { StakeholdersListAdvanceFilterFormTYpe } from "../../../@types/@listOfStakeholders";

const useListOfStakeholdersAdvanceFilter = ({
  form,
  isModalOpen,
}: {
  form: FormInstance<StakeholdersListAdvanceFilterFormTYpe>;
  isModalOpen: boolean;
}) => {
  const { params } = useQueryParams();

  const selectedServices = Form.useWatch(
    "services",
    form
  ) as unknown as ContractTemplateServiceType[];

  //? ================================ Api ================================
  // ecosystem
  const [triggerEcosystem, { data: EcosystemData, isLoading: ecosystemLoading }] =
    useLazyGetContractEcosystemQuery();

  //status
  const [triggerStatus, { data: statusData, isLoading: statusLoading }] =
    useLazyGetContractStatusQuery();

  //rule type
  const [
    triggerTypeBeneficiary,
    { data: typeBeneficiaryData, isLoading: typeBeneficiaryLoading },
  ] = useLazyGetContractRuleTypeQuery();

  //branch
  const [triggerBranchType, { data: BranchTypeData, isLoading: BranchTypeLoading }] =
    useLazyGetContractBranchTypeQuery();

  //service
  const [triggerService, { data: ServiceData, isLoading: ServiceLoading }] =
    useLazyGetContractServiceQuery();

  //categories
  const [getCategoryList, { data: categoryListData, isFetching: isCategoryListLoading }] =
    useLazyGetCategoryByServiceListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.servicesName && isModalOpen) {
      getCategoryList([params?.servicesName]);
    }
  }, [params?.servicesName, isModalOpen]);

  // ================================ Util functions ================================
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
      options: EcosystemData ?? [],
      loading: ecosystemLoading,
      onClick: () => {
        if (!EcosystemData) {
          triggerEcosystem();
        }
      },
    },
    {
      label: "وضعیت",
      name: "status",
      type: "select",
      options: statusData ?? [],
      loading: statusLoading,
      onClick: () => {
        if (!statusData) {
          triggerStatus();
        }
      },
      isNeedsName: true,
    },
    {
      label: "نوع ذینفع",
      name: "ruleTypes",
      type: "select",
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
      label: "نوع شعبه",
      name: "branchTypes",
      type: "select",
      options: BranchTypeData ?? [],
      loading: BranchTypeLoading,
      onClick: () => {
        if (!BranchTypeData) {
          triggerBranchType();
        }
      },
      isNeedsName: true,
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
      options:
        categoryListData?.map((item) => ({ id: item?.categoryId, title: item?.title })) ??
        [],
      loading: isCategoryListLoading,
      disabled: !selectedServices,
    },
    {
      label: "تاریخ شروع و پایان قرارداد",
      name: "date",
      type: "range",
      col: { lg: 24, md: 24, xs: 24, sm: 24 },
    },
  ];

  return { filterItemsList };
};

export default useListOfStakeholdersAdvanceFilter;
