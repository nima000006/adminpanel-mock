import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormListByBranchIdQuery,
  useLazyGetRequestTypeQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { dormWaitingTimeOptions } from "@pages/Dorm/_shared/utils/DormUtils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  UseTariffAwaitingParamsType,
  UseTariffAwaitingReviewAdvanceFilterFormType,
} from "./@types/@useTariffAwaitingReviewAdvanceFilter";

const useTariffAwaitingReviewAdvanceFilter = (
  form: FormInstance<UseTariffAwaitingReviewAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const { params } = useQueryParams<UseTariffAwaitingParamsType>();

  //? ================================  Api Calls ================================
  //استان
  const [
    getProvince,
    {
      data: getProvinceListData,
      isFetching: getProvinceListLoading,
      isSuccess: isProvinceSuccess,
    },
  ] = useLazyGetDormProvinceListQuery();

  //شهر
  const [getCityList, { isFetching: getCityListLoading, isSuccess: isCitySuccess }] =
    useLazyGetDormCityListQuery();

  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //خوابگاه
  const [
    getDormListByBranchId,
    { isFetching: isDormListByBranchIdDataLoading, isSuccess: isDormitorySuccess },
  ] = useLazyGetDormListByBranchIdQuery();

  //نوع درخواست
  const [
    getRequestTypes,
    {
      data: requestTypesData,
      isFetching: isRequestTypesDataLoading,
      isSuccess: isRequestTypesDataSuccess,
    },
  ] = useLazyGetRequestTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.awaitingUniId) {
      branchChangeHandler(params?.awaitingUniId);
    }
  }, [params?.awaitingUniId]);

  useEffect(() => {
    if (params?.awaitingRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [params?.awaitingRequestTypeId]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
  };

  const getProvinceHandler = () =>
    fetchDataIfNeeded(
      !isProvinceSuccess,
      () => getProvince({ firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
    );

  const onProvinceChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getCityList({ parentId_IN: +id, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then((value) => {
          setCityList(value?.data);
        });
    } else {
      setCityList([]);
    }
    form.setFieldsValue({
      awaitingCity: [],
    });
  };

  // خوابگاه
  const branchChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getDormListByBranchId({ maxResults: 50, firstResult: 0, branchId: id })
        .unwrap()
        .then((value) => {
          setDormitoryList(value?.data);
        });
    } else {
      setDormitoryList([]);
    }
    form.setFieldsValue({
      awaitingDormitory: [],
    });
  };

  //نوع درخواست
  const getRequestTypeHandler = () => {
    if (!isRequestTypesDataSuccess) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "awaitingProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "awaitingCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.awaitingProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "awaitingUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "awaitingDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.awaitingUni?.length > 0 ? false : true,
    },
    {
      label: "نوع درخواست",
      name: "awaitingRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "مدت انتظار",
      name: "awaitingWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useTariffAwaitingReviewAdvanceFilter;
