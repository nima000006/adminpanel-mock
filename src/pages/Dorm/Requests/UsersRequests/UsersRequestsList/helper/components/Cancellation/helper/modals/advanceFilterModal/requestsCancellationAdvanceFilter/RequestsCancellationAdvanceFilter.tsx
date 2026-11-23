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
  useLazyGetStatusTypesQuery,
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
  UseRequestsCancellationAdvanceFilterFormType,
  UseRequestsCancellationParamsType,
} from "./@types/@useRequestsCancellationAdvanceFilter";

const useRequestsCancellationAdvanceFilter = (
  form: FormInstance<UseRequestsCancellationAdvanceFilterFormType>
) => {
  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseRequestsCancellationParamsType>();

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

  // نوع رزرو
  const [
    getReservationType,
    {
      data: reservationTypeData,
      isFetching: isReservationTypeLoading,
      isSuccess: isReservationTypeSuccess,
    },
  ] = useLazyGetReservationTypeQuery();

  // وضعیت درخواست
  const [
    getStatusTypes,
    {
      data: requestStatusData,
      isFetching: isStatusTypesDataLoading,
      isSuccess: isStatusTypeSuccess,
    },
  ] = useLazyGetStatusTypesQuery();

  //خوابگاه
  const [
    getDormListByBranchId,
    { isFetching: isDormListByBranchIdDataLoading, isSuccess: isDormitorySuccess },
  ] = useLazyGetDormListByBranchIdQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.cancellationRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.cancellationGenderId) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }

    if (params?.cancellationUserGroupId) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.cancellationSchedulingId) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.cancellationProvinceId) {
      getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }

    if (params?.cancellationReservationTypeId) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.cancellationRequestStatusId) getRequestStatusHandler();
  }, [
    params?.cancellationRequestTypeId,
    params?.cancellationUserGroupId,
    params?.cancellationSchedulingId,
    params?.cancellationProvinceId,
    params?.cancellationReservationTypeId,
    params?.cancellationRequestStatusId,
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
      cancellationDormitory: [],
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
      cancellationCity: [],
    });
  };

  // نوع رزرو
  const getReservationTypeHandler = () => {
    if (!isReservationTypeSuccess) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // وضعیت درخواست
  const getRequestStatusHandler = () => {
    if (!isStatusTypeSuccess) {
      getStatusTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "cancellationProvince",
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
      name: "cancellationCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCityListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.cancellationProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "cancellationUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "cancellationDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.cancellationUni?.length > 0 ? false : true,
    },
    {
      label: "جنسیت",
      name: "cancellationGender",
      mode: "multiple",
      type: "select",
      options: genderData?.data ? genderData?.data : [],
      loading: isGenderDataLoading,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
      onClick: getGenderHandler,
    },
    {
      label: "نوع رزرو",
      name: "cancellationReservationType",
      mode: "multiple",
      type: "select",
      options: reservationTypeData?.data || [],
      onClick: getReservationTypeHandler,
      notFoundContent: !isReservationTypeSuccess ? selectNotFoundContent : undefined,
      loading: isReservationTypeLoading,
    },
    {
      label: "نوع زمان‌بندی",
      name: "cancellationScheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      loading: isSchedulingTypeLoading,
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع درخواست",
      name: "cancellationRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "گروه کاربری",
      name: "cancellationUserGroup",
      mode: "multiple",
      type: "select",
      options: userGroupData?.data ? userGroupData?.data : [],
      loading: isUserGroupLoading,
      notFoundContent: !isUserGroupSuccess ? selectNotFoundContent : undefined,
      onClick: getUserGroupHandler,
    },
    {
      label: "مدت انتظار",
      name: "cancellationWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
    {
      label: "وضعیت درخواست",
      name: "cancellationRequestStatus",
      type: "select",
      mode: "multiple",
      options: requestStatusData?.data || [],
      loading: isStatusTypesDataLoading,
      onClick: getRequestStatusHandler,
      notFoundContent: !isStatusTypeSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useRequestsCancellationAdvanceFilter;
