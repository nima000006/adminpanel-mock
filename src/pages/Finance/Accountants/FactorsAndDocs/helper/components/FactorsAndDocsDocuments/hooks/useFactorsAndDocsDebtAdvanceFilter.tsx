import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { beneficiary_payment_status_debit_credit } from "@pages/Finance/Accountants/_shared/utils";
import { FactorsAndDocsDebtDocumentsFormType } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useFactorsAndDocsDebtAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<FactorsAndDocsDebtDocumentsFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [branchData, setBranchData] = useState<{ id: number; title: string }[]>([]);

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedBusiness = useWatch("business", form);
  //? ================================ Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // business
  const [
    getBusinessData,
    { data: businessData, isLoading: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // payment status
  // const [
  //   getPaymentStatsData,
  //   {
  //     data: paymentStatsData,
  //     isLoading: isPaymentStatsLoading,
  //     isSuccess: isPaymentStatsSuccess,
  //   },
  // ] = useLazyGetAccountingPaymentStatsQuery();

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

  //* ================================ Util Functions ================================
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
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
      getCityData({ ids: event?.map((value) => value)?.join(",") })
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

  // payment status
  // const getPaymentStatsHandler = () => {
  //   if (!isPaymentStatsSuccess) {
  //     getPaymentStatsData();
  //   }
  // };

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
      loading: isProvinceDataLoading,
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
      loading: isCityDataLoading,
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
      label: "امکان تسویه با ذینفع",
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
      label: "وضعیت پرداخت به ذینفع",
      name: "status",
      type: "select",
      mode: "multiple",
      options: beneficiary_payment_status_debit_credit,
      // loading: isPaymentStatsLoading,
      // notFoundContent: selectNotFoundContent,
      isNeedsName: true,
      // onClick: getPaymentStatsHandler,
    },
    {
      label: "علت بدهکاری",
      name: "debtReason",
      type: "select",
      isNeedsName: true,
      options: [
        {
          id: 0,
          name: "REFUND",
          title: "عودت وجه",
        },
        {
          id: 1,
          name: "PARTNERSHIP_COMMISSION",
          title: "کارمزد شراکت",
        },
      ],
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
export default useFactorsAndDocsDebtAdvanceFilter;
