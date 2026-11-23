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
  UseWorkSpaceAdmissionAdvanceFilterFormType,
  UseWorkSpaceAdmissionParamsType,
} from "./@types/@useWorkSpaceAdmissionAdvanceFilter";

const useWorkSpaceAdmissionAdvanceFilter = (
  form: FormInstance<UseWorkSpaceAdmissionAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseWorkSpaceAdmissionParamsType>();

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
    if (params?.admissionProvinceId) {
      onProvinceChangeHandler(params?.admissionProvinceId);
    }
  }, [params?.admissionProvinceId]);

  useEffect(() => {
    if (params?.admissionProvinceId) getProvinceHandler();

    if (params?.admissionRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.admissionStatusId) {
      getStatusTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [
    params?.admissionProvinceId,
    params?.admissionRequestTypeId,
    params?.admissionStatusId,
  ]);

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
      admissionCity: [],
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
    //   name: "admissionPosition",
    //   mode: "multiple",
    //   type: "select",
    //   options: requestTypesData?.data || [],
    //   onClick: getRequestTypeHandler,
    //   loading: isRequestTypesDataLoading,
    //   notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    // {
    //   label: "سازمان",
    //   name: "admissionOrgan",
    //   mode: "multiple",
    //   type: "select",
    //   options: requestTypesData?.data || [],
    //   onClick: getRequestTypeHandler,
    //   loading: isRequestTypesDataLoading,
    //   notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    {
      label: "استان",
      name: "admissionProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "admissionCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.admissionProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "admissionUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
    },
    {
      label: "نوع درخواست",
      name: "admissionRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "وضعیت",
      name: "admissionStatus",
      mode: "multiple",
      type: "select",
      options: statusData?.data || [],
      onClick: getStatusHandler,
      loading: isStatusTypesDataLoading,
      notFoundContent: !isStatusTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "مدت انتظار",
      name: "admissionWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useWorkSpaceAdmissionAdvanceFilter;
