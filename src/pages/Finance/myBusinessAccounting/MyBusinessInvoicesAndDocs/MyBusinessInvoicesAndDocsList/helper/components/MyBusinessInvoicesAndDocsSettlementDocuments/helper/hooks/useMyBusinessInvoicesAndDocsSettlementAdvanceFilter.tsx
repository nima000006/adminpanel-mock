import { useEffect, useState } from "react";

import { FormInstance, useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetMyBusinessAccountingBranchQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { beneficiary_payment_status_debit_credit } from "@pages/Finance/Accountants/_shared/utils";
import { MyBusinessInvoicesAndDocsSettlementFormType } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useMyBusinessInvoicesAndDocsSettlementAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<MyBusinessInvoicesAndDocsSettlementFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);

  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [branches, setBranches] = useState<IdTitle[]>();
  const selectedProvince = useWatch("province", form);

  const { params } = useQueryParams();

  //? ================================ Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  //services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //branches
  const [
    getBranches,
    { isFetching: isGetBranchesLoading, isSuccess: isGetBranchesSuccess },
  ] = useLazyGetMyBusinessAccountingBranchQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
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
    form.setFieldsValue({ city: undefined });
  };

  // when city selected
  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // branches
  const getBranchesHandler = () => {
    if (!isGetBranchesSuccess) {
      getBranches()
        .unwrap()
        .then((res) => setBranches(res));
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
      notFoundContent: selectNotFoundContent,
      onChange: onCityChangeHandler,
    },
    {
      label: "شعبه / واحد (ذینفع)",
      name: "branch",
      type: "select",
      mode: "multiple",
      loading: isGetBranchesLoading,
      options: branches,
      onClick: getBranchesHandler,
      notFoundContent: selectNotFoundContent,
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
    {
      label: "وضعیت پرداخت",
      name: "status",
      type: "select",
      mode: "multiple",
      options: beneficiary_payment_status_debit_credit,
      isNeedsName: true,
    },
  ];
  return { filterItemsList };
};
export default useMyBusinessInvoicesAndDocsSettlementAdvanceFilter;
