import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormListByBranchIdQuery,
  useLazyGetRequestTypeQuery,
  useLazyGetReservationTypeQuery,
  useLazyGetSchedulingTypeQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  UseAdmissionRejectedAdvanceFilterFormType,
  UseAdmissionRejectReviewParamsType,
} from "./@types/@useAdmissionRejectedAdvanceFilter";

const useAdmissionRejectedAdvanceFilter = (
  form: FormInstance<UseAdmissionRejectedAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const { params } = useQueryParams<UseAdmissionRejectReviewParamsType>();

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

  // نوع زمان‌بندی
  const [
    getSchedulingType,
    {
      data: schedulingTypeData,
      isFetching: isSchedulingTypeLoading,
      isSuccess: isSchedulingTypeSuccess,
    },
  ] = useLazyGetSchedulingTypeQuery();

  //نوع درخواست
  const [
    getRequestTypes,
    {
      data: requestTypesData,
      isFetching: isRequestTypesDataLoading,
      isSuccess: isRequestTypesDataSuccess,
    },
  ] = useLazyGetRequestTypeQuery();

  // نوع رزرو
  const [
    getReservationType,
    {
      data: reservationTypeData,
      isFetching: isReservationTypeLoading,
      isSuccess: isReservationTypeSuccess,
    },
  ] = useLazyGetReservationTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.rejectUniId) {
      branchChangeHandler(params?.rejectUniId);
    }
  }, [params?.rejectUniId]);

  useEffect(() => {
    if (params?.rejectSchedulingId)
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });

    if (params?.rejectRequestTypeId)
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });

    if (params?.rejectReservationTypeId)
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
  }, [
    params?.rejectRequestTypeId,
    params?.rejectReservationTypeId,
    params?.rejectSchedulingId,
  ]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
  };

  const getProvinceHandler = () =>
    fetchDataIfNeeded(!isProvinceSuccess, () =>
      getProvince({ firstResult: 0, maxResults: 2000 })
    );

  const onProvinceChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getCityList({ parentId_IN: +id, firstResult: 0, maxResults: 2000 })
        .unwrap()
        .then((value) => {
          setCityList(value?.data);
        });
    } else {
      setCityList([]);
    }
    form.setFieldsValue({
      rejectCity: [],
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
      rejectDormitory: [],
    });
  };

  // نوع زمان‌بندی
  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  //نوع درخواست
  const getRequestTypeHandler = () => {
    if (!isRequestTypesDataSuccess) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // نوع رزرو
  const getReservationTypeHandler = () => {
    if (!isReservationTypeSuccess) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "rejectProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "rejectCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.rejectProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "rejectUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "rejectDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.rejectUni?.length > 0 ? false : true,
    },
    {
      label: "نوع زمان‌بندی",
      name: "rejectScheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
      loading: isSchedulingTypeLoading,
    },
    {
      label: "نوع رزرو",
      name: "rejectReservationType",
      mode: "multiple",
      type: "select",
      options: reservationTypeData?.data || [],
      onClick: getReservationTypeHandler,
      notFoundContent: !isReservationTypeSuccess ? selectNotFoundContent : undefined,
      loading: isReservationTypeLoading,
    },
    {
      label: "نوع درخواست",
      name: "rejectRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useAdmissionRejectedAdvanceFilter;
