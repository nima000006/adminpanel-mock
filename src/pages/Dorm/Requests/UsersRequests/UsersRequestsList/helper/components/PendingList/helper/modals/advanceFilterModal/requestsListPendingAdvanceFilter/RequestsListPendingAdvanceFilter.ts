import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormListByBranchIdQuery,
  useLazyGetRequestTypeQuery,
  useLazyGetReservationTypeQuery,
  useLazyGetSchedulingTypeQuery,
  useLazyGetUserGroupQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { dormWaitingTimeOptions } from "@pages/Dorm/_shared/utils/DormUtils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  UseRequestsListPendingAdvanceFilterFormType,
  UseRequestsListPendingParamsType,
} from "./@types/@useRequestsListPendingAdvanceFilter";

const useRequestsListPendingAdvanceFilter = (
  form: FormInstance<UseRequestsListPendingAdvanceFilterFormType>
) => {
  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseRequestsListPendingParamsType>();

  //? ================================  Api Calls ================================
  //نوع درخواست
  const [
    getRequestTypes,
    {
      data: requestTypesData,
      isFetching: isRequestTypesDataLoading,
      isSuccess: isRequestTypesDataSuccess,
    },
  ] = useLazyGetRequestTypeQuery();

  // جنسیت
  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  //گروه کاربری
  const [
    getUserGroup,
    {
      data: userGroupData,
      isFetching: isUserGroupLoading,
      isSuccess: isUserGroupSuccess,
    },
  ] = useLazyGetUserGroupQuery();

  //نوع زمان‌بندی
  const [
    getSchedulingType,
    {
      data: schedulingTypeData,
      isFetching: isSchedulingTypeLoading,
      isSuccess: isSchedulingTypeSuccess,
    },
  ] = useLazyGetSchedulingTypeQuery();

  //  استان
  const [
    getProvince,
    {
      data: getProvinceListData,
      isFetching: getProvinceListLoading,
      isSuccess: isProvinceSuccess,
    },
  ] = useLazyGetDormProvinceListQuery();

  // شهر
  const [getCityList, { isFetching: getCityListLoading, isSuccess: isCityListSuccess }] =
    useLazyGetDormCityListQuery();

  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //خوابگاه
  const [
    getDormListByBranchId,
    { isFetching: isDormListByBranchIdDataLoading, isSuccess: isDormitorySuccess },
  ] = useLazyGetDormListByBranchIdQuery();

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
    if (params?.listPendingRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.listPendingGenderId) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }

    if (params?.listPendingUserGroupId) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.listPendingSchedulingId) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.listPendingProvinceId) {
      getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }

    if (params?.listPendingReservationTypeId) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [
    params?.listPendingRequestTypeId,
    params?.listPendingUserGroupId,
    params?.listPendingSchedulingId,
    params?.listPendingProvinceId,
    params?.listPendingReservationTypeId,
  ]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
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
      listPendingDormitory: [],
    });
  };

  //نوع درخواست
  const getRequestTypeHandler = () => {
    if (!isRequestTypesDataSuccess) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  //جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //گروه کاربری
  const getUserGroupHandler = () => {
    if (!isUserGroupSuccess) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // نوع زمان‌بندی
  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  //استان
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }
  };

  const provinceChangeHandler = (id: string) => {
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
      listPendingCity: [],
    });
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
      name: "listPendingProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data ? getProvinceListData?.data : [],
      loading: getProvinceListLoading,
      onClick: getProvinceHandler,
      onChange: (id) => provinceChangeHandler(id as string),
      notFoundContent: !isProvinceSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "شهر",
      name: "listPendingCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCityListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.listPendingProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "listPendingUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "listPendingDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.listPendingUni?.length > 0 ? false : true,
    },
    {
      label: "جنسیت",
      name: "listPendingGender",
      mode: "multiple",
      type: "select",
      options: genderData?.data ? genderData?.data : [],
      loading: isGenderDataLoading,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
      onClick: getGenderHandler,
    },
    {
      label: "نوع رزرو",
      name: "listPendingReservationType",
      mode: "multiple",
      type: "select",
      options: reservationTypeData?.data || [],
      onClick: getReservationTypeHandler,
      notFoundContent: !isReservationTypeSuccess ? selectNotFoundContent : undefined,
      loading: isReservationTypeLoading,
    },
    {
      label: "نوع زمان‌بندی",
      name: "listPendingScheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      loading: isSchedulingTypeLoading,
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع درخواست",
      name: "listPendingRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "گروه کاربری",
      name: "listPendingUserGroup",
      mode: "multiple",
      type: "select",
      options: userGroupData?.data ? userGroupData?.data : [],
      loading: isUserGroupLoading,
      notFoundContent: !isUserGroupSuccess ? selectNotFoundContent : undefined,
      onClick: getUserGroupHandler,
    },
    {
      label: "مدت انتظار",
      name: "listPendingWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useRequestsListPendingAdvanceFilter;
