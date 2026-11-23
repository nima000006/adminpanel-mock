import { useEffect, useState } from "react";

import { Form, FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractPartiesQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import {
  useLazyGetCategoryByServiceListQuery,
  useLazyGetContractEcosystemQuery,
  useLazyGetContractServiceQuery,
  useLazyGetContractStatusQuery,
} from "@infra/states/redux/Apis/contracts/general/generalApis";
import { GetContractStatusResponse } from "@pages/Contract/_shared/@generalContractTypes";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";
import { ContractTemplateServiceType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateInfo/@types/@contractsTemplateInfoStep";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { ContractTemplateListAdvanceFilterFormTYpe } from "../../../@types/ContractsTemplateListTypes";

const useContractsTemplateListAdvanceFilter = ({
  form,
  isModalOpen,
}: {
  form: FormInstance<ContractTemplateListAdvanceFilterFormTYpe>;
  isModalOpen: boolean;
}) => {
  const [statusData, setStatusData] = useState<GetContractStatusResponse | null>(null);

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
  const [triggerStatus, { isLoading: statusLoading }] = useLazyGetContractStatusQuery();

  //service
  const [triggerService, { data: ServiceData, isLoading: ServiceLoading }] =
    useLazyGetContractServiceQuery();

  //categories
  const [getCategoryList, { data: categoryListData, isFetching: isCategoryListLoading }] =
    useLazyGetCategoryByServiceListQuery();

  //parties
  const [triggerParties, { data: PartiesData, isLoading: PartiesLoading }] =
    useLazyGetContractPartiesQuery();

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
      label: "وضعیت",
      name: "statuses",
      type: "select",
      options: statusData ?? [],
      loading: statusLoading,
      onClick: () => {
        if (!statusData) {
          triggerStatus()
            .unwrap()
            .then((value: GetContractStatusResponse) => {
              const tempData = value?.filter(
                (item) => item?.name !== CONTRACT_STATUS_ITEMS.deactivated
              );
              setStatusData(tempData);
            });
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
  ];
  return { filterItemsList };
};
export default useContractsTemplateListAdvanceFilter;
