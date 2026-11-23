import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetRequestTypeQuery,
  useLazyGetStatusTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { dormWaitingTimeOptions } from "@pages/Dorm/_shared/utils/DormUtils";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  UseWorkSpaceDormAdvanceFilterFormType,
  UseWorkSpaceDormParamsType,
} from "./@types/@useWorkSpaceDormAdvanceFilter";

const useWorkSpaceDormAdvanceFilter = (
  form: FormInstance<UseWorkSpaceDormAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseWorkSpaceDormParamsType>();

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

  //نوع درخواست
  const [
    getRequestTypes,
    {
      data: requestTypesData,
      isFetching: isRequestTypesDataLoading,
      isSuccess: isRequestTypesDataSuccess,
    },
  ] = useLazyGetRequestTypeQuery();

  // وضعیت
  const [
    getStatusTypes,
    {
      data: statusData,
      isFetching: isStatusTypesDataLoading,
      isSuccess: isStatusTypesDataSuccess,
    },
  ] = useLazyGetStatusTypesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.dormProvinceId) {
      onProvinceChangeHandler(params?.dormProvinceId);
    }
  }, [params?.dormProvinceId]);

  useEffect(() => {
    if (params?.dormProvinceId) getProvinceHandler();

    if (params?.dormRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.dormStatusId) {
      getStatusTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [params?.dormProvinceId, params?.dormRequestTypeId, params?.dormStatusId]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
  };

  const getProvinceHandler = () =>
    fetchDataIfNeeded(
      !isProvinceSuccess,
      () => getProvince({ maxResults: 2000, firstResult: 0 }) //we should set 0 and 2000 to get data
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
      dormCity: [],
    });
  };

  //نوع درخواست
  const getRequestTypeHandler = () => {
    if (!isRequestTypesDataSuccess) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // وضعیت
  const getStatusHandler = () => {
    if (!isStatusTypesDataSuccess) {
      getStatusTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    //TODO[Atefeh]:uncomment when api got ready
    // {
    //   label: "سمت",
    //   name: "dormPosition",
    //   mode: "multiple",
    //   type: "select",
    //   options: requestTypesData?.data || [],
    //   onClick: getRequestTypeHandler,
    //   loading: isRequestTypesDataLoading,
    //   notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    // {
    //   label: "سازمان",
    //   name: "dormOrgan",
    //   mode: "multiple",
    //   type: "select",
    //   options: requestTypesData?.data || [],
    //   onClick: getRequestTypeHandler,
    //   loading: isRequestTypesDataLoading,
    //   notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    {
      label: "استان",
      name: "dormProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "dormCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.dormProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "dormUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
    },
    {
      label: "نوع درخواست",
      name: "dormRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "وضعیت",
      name: "dormStatus",
      mode: "multiple",
      type: "select",
      options: statusData?.data || [],
      onClick: getStatusHandler,
      loading: isStatusTypesDataLoading,
      notFoundContent: !isStatusTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "مدت انتظار",
      name: "dormWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useWorkSpaceDormAdvanceFilter;
