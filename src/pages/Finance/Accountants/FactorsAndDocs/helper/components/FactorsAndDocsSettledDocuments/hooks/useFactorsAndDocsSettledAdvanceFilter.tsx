import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoCityBasedMultipleProvinceQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { FactorsAndDocsSettledDocumentsFormType } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useFactorsAndDocsSettledAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<FactorsAndDocsSettledDocumentsFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [branchData, setBranchData] = useState<{ id: number; title: string }[]>([]);

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedBusiness = useWatch("business", form);
  //? ================================ Api Calls ================================
  //  province and city
  const [
    getProvinceAndCityData,
    { isLoading: isProvinceAndCityDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // business
  const [
    getBusinessData,
    { data: businessData, isLoading: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (advanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }

      //business
      if (params?.businessId) {
        getBusinessData();
      }
    }
  }, [advanceModalOpen]);

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
      setCityData([]);
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
    form.setFieldsValue({ city: undefined });
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

    form.setFieldsValue({ branch: undefined });

    if (businessIds?.length >= 1) {
      setBranchData([]);
      getBranchesData({
        businessIds,
      })
        .unwrap()
        .then((value) => setBranchData(value));
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
      notFoundContent: selectNotFoundContent,
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
      notFoundContent: selectNotFoundContent,
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
      notFoundContent: selectNotFoundContent,
    },
    {
      label: "شعبه/واحد (ذینفع)",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchData,
      loading: isBranchesDataLoading,
      notFoundContent: selectNotFoundContent,
      disabled: selectedBusiness?.length > 0 ? false : true,
    },
    {
      label: "وضعیت پرداخت به ذینفع",
      name: "status",
      type: "select",
      mode: "multiple",
      options: [
        {
          id: 2,
          title: "در صف پرداخت",
          name: "PENDING_FOR_PAYMENT",
        },
        {
          id: 3,
          title: "پرداخت شده",
          name: "PAID",
        },
      ],
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
export default useFactorsAndDocsSettledAdvanceFilter;
