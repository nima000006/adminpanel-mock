import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoCityBasedMultipleProvinceQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyGetAccountingAllSamimServiceQuery,
  useLazyGetAccountingInvoiceTypeQuery,
} from "@infra/states/redux/Apis/finance/accountingApi";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { FactorAndDocsFormType } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/@types/@accountingFactors";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useFactorsAndDocsAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<FactorAndDocsFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [branchData, setBranchData] = useState<{ id: number; title: string }[]>([]);

  const [cityBuyerData, setCityBuyerData] = useState<{ id: number; title: string }[]>([]);
  const [buyerBranchData, setBuyerBranchData] = useState<{ id: number; title: string }[]>(
    []
  );

  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [invoiceType, setInvoiceType] = useState<IdTitleName[]>();

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedBusiness = useWatch("business", form);
  const selectedBusinessBuyer = useWatch("businessBuyer", form);
  const selectedProvinceBuyer = useWatch("provinceBuyer", form);

  //? ================================ Api Calls ================================
  // get province and city
  const [
    getProvinceAndCityData,
    { isFetching: isProvinceAndCityDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // get business
  const [
    getBusinessData,
    { data: businessData, isFetching: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  // get branch
  const [getBranchesData, { isFetching: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  // invoice type
  const [
    getInvoiceType,
    { isFetching: isGetInvoiceTypeLoading, isSuccess: isGetInvoiceTypeSuccess },
  ] = useLazyGetAccountingInvoiceTypeQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (advanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }

      // business
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

  //  business
  const getBusinessHandler = () => {
    if (!isBusinessSuccess) {
      getBusinessData();
    }
  };

  // when city selected
  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  // when business selected
  const onBusinessChangeHandler = (value: unknown) => {
    const businessIds = (value as string[]).map(Number);
    setBranchData([]);

    form.setFieldsValue({ branch: undefined });

    if (businessIds?.length >= 1) {
      getBranchesData({
        businessIds,
      })
        .unwrap()
        .then((value) => setBranchData(value));
    }
  };

  // buyer
  // when province Buyer selected
  const onProvinceBuyerChangeHandler = (event: number[] | undefined) => {
    setCityBuyerData([]);
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

          setCityBuyerData(cityList);
        });
    }
    form.setFieldsValue({ cityBuyer: undefined });
  };

  // when city buyer selected
  const onCityBuyerChangeHandler = () => {
    form.setFieldsValue({ branchBuyer: undefined });
  };

  // when business buyer selected
  const onBusinessBuyerChangeHandler = (value: unknown) => {
    setBuyerBranchData([]);
    const businessIds = (value as string[]).map(Number);

    form.setFieldsValue({ branchBuyer: undefined });

    if (businessIds?.length >= 1) {
      getBranchesData({
        businessIds,
      })
        .unwrap()
        .then((value) => setBuyerBranchData(value));
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

  // invoice type
  const invoiceTypeHandler = () => {
    if (!isGetInvoiceTypeSuccess) {
      getInvoiceType()
        .unwrap()
        .then((res) => setInvoiceType(res));
    }
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      type: "divider",
      label: "مشخصات ذینفع",
    },
    {
      label: "استان (ذینفع)",
      name: "province",
      type: "select",
      options: provinceData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onProvinceChangeHandler(value as number[]),
    },
    {
      label: "شهر (ذینفع)",
      name: "city",
      type: "select",
      options: cityData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      disabled: selectedProvince?.length > 0 ? false : true,
      onChange: onCityChangeHandler,
    },
    {
      label: "کسب و کار (ذینفع)",
      name: "business",
      type: "select",
      mode: "multiple",
      options: businessData ? businessData : [],
      loading: businessLoading,
      onClick: getBusinessHandler,
      onChange: onBusinessChangeHandler,
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

    // BUYER
    {
      type: "divider",
      label: "مشخصات خریدار",
    },
    {
      label: "استان (خریدار فاکتور)",
      name: "provinceBuyer",
      type: "select",
      options: provinceData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onProvinceBuyerChangeHandler(value as number[]),
    },
    {
      label: "شهر (خریدار فاکتور)",
      name: "cityBuyer",
      type: "select",
      options: cityBuyerData,
      loading: false,
      mode: "multiple",
      disabled: selectedProvinceBuyer?.length > 0 ? false : true,
      onChange: onCityBuyerChangeHandler,
    },
    {
      label: "کسب و کار (خریدار فاکتور)",
      name: "businessBuyer",
      type: "select",
      mode: "multiple",
      options: businessData ? businessData : [],
      loading: businessLoading,
      onClick: getBusinessHandler,
      onChange: onBusinessBuyerChangeHandler,
    },
    {
      label: "شعبه/واحد (خریدار فاکتور)",
      name: "branchBuyer",
      type: "select",
      mode: "multiple",
      options: buyerBranchData,
      loading: isBranchesDataLoading,
      notFoundContent: selectNotFoundContent,
      disabled: selectedBusinessBuyer?.length > 0 ? false : true,
    },

    // FACTOR DETAIL
    {
      type: "divider",
      label: "مشخصات فاکتور",
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
  ];

  return { filterItemsList };
};

export default useFactorsAndDocsAdvanceFilter;
