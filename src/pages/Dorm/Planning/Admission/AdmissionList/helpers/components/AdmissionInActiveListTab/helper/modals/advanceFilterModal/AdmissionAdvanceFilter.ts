import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormListByBranchIdQuery,
  useLazyGetManagementTypeQuery,
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
  UseAdmissionInactiveAdvanceFilterFormType,
  UseAdmissionInActiveParamsType,
} from "./@types/@useAdmissionAdvanceFilter";

const useAdmissionInactiveAdvanceFilter = (
  form: FormInstance<UseAdmissionInactiveAdvanceFilterFormType>
) => {
  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const { params } = useQueryParams<UseAdmissionInActiveParamsType>();
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

  // نوع رزرو
  const [
    getReservationType,
    {
      data: reservationTypeData,
      isFetching: isReservationTypeLoading,
      isSuccess: isReservationTypeSuccess,
    },
  ] = useLazyGetReservationTypeQuery();

  // نوع مدیریت
  const [
    getManagementType,
    {
      data: managementTypeData,
      isFetching: isManagementTypeLoading,
      isSuccess: isManagementTypeSuccess,
    },
  ] = useLazyGetManagementTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.inactiveUniId) {
      branchChangeHandler(params?.inactiveUniId);
    }
  }, [params?.inactiveUniId]);

  useEffect(() => {
    if (params?.inactiveSchedulingId)
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });

    if (params?.inactiveReservationTypeId)
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });

    if (params?.inactiveManagementTypeId) {
      getManagementType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [
    params?.inactiveSchedulingId,
    params?.inactiveReservationTypeId,
    params?.inactiveManagementTypeId,
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
      inactiveCity: [],
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
      inactiveDormitory: [],
    });
  };
  // نوع زمان‌بندی
  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // نوع رزرو
  const getReservationTypeHandler = () => {
    if (!isReservationTypeSuccess) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // نوع مدیریت
  const getManagementTypeHandler = () => {
    if (!isManagementTypeSuccess) {
      getManagementType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "inactiveProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "inactiveCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.inactiveProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "inactiveUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "inactiveDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.inactiveUni?.length > 0 ? false : true,
    },
    {
      label: "نوع زمان‌بندی",
      name: "inactiveScheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
      loading: isSchedulingTypeLoading,
    },
    {
      label: "نوع رزرو",
      name: "inactiveReservationType",
      mode: "multiple",
      type: "select",
      options: reservationTypeData?.data || [],
      onClick: getReservationTypeHandler,
      notFoundContent: !isReservationTypeSuccess ? selectNotFoundContent : undefined,
      loading: isReservationTypeLoading,
    },
    {
      label: "نوع مدیریت",
      name: "inactiveManagementType",
      mode: "multiple",
      type: "select",
      options: managementTypeData?.data || [],
      onClick: getManagementTypeHandler,
      notFoundContent: !isManagementTypeSuccess ? selectNotFoundContent : undefined,
      loading: isManagementTypeLoading,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useAdmissionInactiveAdvanceFilter;
