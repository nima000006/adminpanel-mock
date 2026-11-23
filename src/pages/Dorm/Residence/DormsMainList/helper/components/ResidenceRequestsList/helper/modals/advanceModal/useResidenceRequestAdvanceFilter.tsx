import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetRequestTypeQuery,
  useLazyGetStatusTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetResidenceTypeQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { UseResidenceRequestAdvanceFilterFormType } from "../../../@types/@residenceRequestsList";

const useResidenceRequestAdvanceFilter = (
  form: FormInstance<UseResidenceRequestAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams();

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
  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityDataSuccess,
    },
  ] = useLazyGetAllBranchesQuery();

  // نوع اقامتگاه
  const [
    getResidenceType,
    {
      data: residenceTypeData,
      isFetching: isResidenceTypeLoading,
      isSuccess: isResidenceTypeSuccess,
    },
  ] = useLazyGetResidenceTypeQuery();

  //نوع درخواست
  const [
    getRequestTypes,
    {
      data: requestTypesData,
      isFetching: isRequestTypesDataLoading,
      isSuccess: isRequestTypesDataSuccess,
    },
  ] = useLazyGetRequestTypeQuery();

  // وضعیت درخواست
  const [
    getStatusTypes,
    {
      data: requestStatusData,
      isFetching: isStatusTypesDataLoading,
      isSuccess: isStatusTypeSuccess,
    },
  ] = useLazyGetStatusTypesQuery();

  //جنسیت خوابگاه
  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    onProvinceChangeHandler(params?.requestProvinceId);
  }, [params?.requestProvinceId]);

  useEffect(() => {
    if (params?.requestProvinceId) getProvinceHandler();

    if (params?.requestResidenceTypeId) getResidenceTypeHandler();

    if (params?.requestGenderId) getGenderHandler();

    if (params?.requestRequestTypeId) getRequestTypeHandler();

    if (params?.requestRequestStatusId) getRequestStatusHandler();
  }, [
    params?.requestProvinceId,
    params?.requestResidenceTypeId,
    params?.requestGenderId,
    params?.requestRequestTypeId,
    params?.requestRequestStatusId,
  ]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => getAllUniversity();

  const getProvinceHandler = () =>
    fetchDataIfNeeded(!isProvinceSuccess, () =>
      getProvince({ firstResult: 0, maxResults: 2000 })
    ); //we should set 0 and 2000 to get data

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
    //!
    form.setFieldsValue({
      requestCity: [],
    });
  };

  //نوع اقامتگاه
  const getResidenceTypeHandler = () =>
    fetchDataIfNeeded(
      !isResidenceTypeSuccess,
      () =>
        getResidenceType({ firstResult: 0, maxResults: 2000, showInActiveData: false }) //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
    );

  //نوع درخواست
  const getRequestTypeHandler = () => {
    if (!isRequestTypesDataSuccess) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // وضعیت درخواست
  const getRequestStatusHandler = () => {
    if (!isStatusTypeSuccess) {
      getStatusTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "requestProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      notFoundContent: !isProvinceSuccess ? selectNotFoundContent : undefined,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "requestCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.requestProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "requestBranch",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      notFoundContent: !isUniversityDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع اقامتگاه",
      name: "requestResidenceType",
      mode: "multiple",
      type: "select",
      options: residenceTypeData?.data || [],
      loading: isResidenceTypeLoading,
      onClick: getResidenceTypeHandler,
      notFoundContent: !isResidenceTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع درخواست",
      name: "requestRequestType",
      type: "select",
      options: requestTypesData?.data || [],
      loading: isRequestTypesDataLoading,
      onClick: getRequestTypeHandler,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "وضعیت درخواست",
      name: "requestRequestStatus",
      type: "select",
      mode: "multiple",
      options: requestStatusData?.data || [],
      loading: isStatusTypesDataLoading,
      onClick: getRequestStatusHandler,
      notFoundContent: !isStatusTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "جنسیت خوابگاه",
      name: "requestGender",
      type: "select",
      options: genderData?.data || [],
      loading: isGenderDataLoading,
      onClick: getGenderHandler,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useResidenceRequestAdvanceFilter;
