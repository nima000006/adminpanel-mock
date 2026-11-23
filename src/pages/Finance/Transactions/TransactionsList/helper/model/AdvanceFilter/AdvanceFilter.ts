import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useWatch } from "@components/Renderers/CustomForm/CustomForm";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoCityBasedMultipleProvinceQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAllSamimServiceQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { FinanceTransactionFormType } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useFinanceTransactionAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<FinanceTransactionFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [services, setServices] = useState<GetAllSamimServiceResponse>();

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedBusiness = useWatch("business", form);
  //? ================================ Api Calls ================================
  // get province and city
  const [
    getProvinceAndCityData,
    { isLoading: isProvinceAndCityDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // get branch
  const [getBranchesData, { data: branchesData, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // get business
  const [
    getBusinessData,
    { data: businessData, isLoading: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isAdvanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }

      // business
      if (params?.businessId) {
        getBusinessData();
      }
    }
  }, [isAdvanceModalOpen]);

  // city
  useEffect(() => {
    if (selectedProvince?.length > 0) {
      getProvinceAndCityData({
        ids: selectedProvince?.map((value: any) => value?.code)?.join(","),
      })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setCityData(cityList);
        });
    }
  }, [selectedProvince]);

  //* ================================ Util Functions ================================
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceAndCityData({ ids: "103" }) // 103 Iran code
        .unwrap()
        .then((value) => {
          const provinceList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setProvinceData(provinceList);
        });
    }
  };

  // when province selected
  const onProvinceChangeHandler = (event: number[] | undefined) => {
    if (event?.length) {
      getProvinceAndCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setCityData(cityList);
        });
    }
    form.setFieldsValue({ city: undefined, branch: undefined });
  };

  // when city selected
  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  //  business
  const getBusinessHandler = () => {
    if (!isBusinessSuccess) {
      getBusinessData();
    }
  };

  // when business selected
  const onBusinessChangeHandler = (value: unknown) => {
    const businessIds = (value as string[]).map(Number);
    if (businessIds?.length === 0) {
      form.setFieldsValue({ branch: undefined });
    }

    if (businessIds?.length >= 1) {
      getBranchesData({
        businessIds,
      });
    }
  };

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "province",
      type: "select",
      options: provinceData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onProvinceChangeHandler(value as number[]),
    },
    {
      label: "شهر",
      name: "city",
      type: "select",
      options: cityData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      disabled: selectedProvince?.length > 0 ? false : true,
      onChange: onCityChangeHandler,
    },
    {
      label: "کسب و کار",
      name: "business",
      type: "select",
      mode: "multiple",
      options: businessData ? businessData : [],
      loading: businessLoading,
      onClick: getBusinessHandler,
      onChange: onBusinessChangeHandler,
    },
    {
      label: "شعبه/واحد (کاربر)",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchesData,
      loading: isBranchesDataLoading,
      notFoundContent: selectNotFoundContent,
      disabled: selectedBusiness?.length > 0 ? false : true,
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
    },
  ];

  return { filterItemsList };
};

export default useFinanceTransactionAdvanceFilter;
