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
  UseRequestsPendingReviewAdvanceFilterFormType,
  UseRequestsPendingReviewParamsType,
} from "./@types/@useRequestsPendingReviewAdvanceFilter";

const useRequestsPendingReviewAdvanceFilter = (
  form: FormInstance<UseRequestsPendingReviewAdvanceFilterFormType>
) => {
  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseRequestsPendingReviewParamsType>();

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
    if (params?.pendingReviewRequestTypeId) {
      getRequestTypes({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.pendingReviewGenderId) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }

    if (params?.pendingReviewUserGroupId) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.pendingReviewSchedulingId) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }

    if (params?.pendingReviewProvinceId) {
      getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }

    if (params?.pendingReviewReservationTypeId) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [
    params?.pendingReviewRequestTypeId,
    params?.pendingReviewUserGroupId,
    params?.pendingReviewSchedulingId,
    params?.pendingReviewProvinceId,
    params?.pendingReviewReservationTypeId,
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
      pendingReviewDormitory: [],
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
      pendingReviewCity: [],
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
      name: "pendingReviewProvince",
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
      name: "pendingReviewCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCityListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.pendingReviewProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "pendingReviewUni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "pendingReviewDormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.pendingReviewUni?.length > 0 ? false : true,
    },
    {
      label: "جنسیت",
      name: "pendingReviewGender",
      mode: "multiple",
      type: "select",
      options: genderData?.data ? genderData?.data : [],
      loading: isGenderDataLoading,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
      onClick: getGenderHandler,
    },
    {
      label: "نوع رزرو",
      name: "pendingReviewReservationType",
      mode: "multiple",
      type: "select",
      options: reservationTypeData?.data || [],
      onClick: getReservationTypeHandler,
      notFoundContent: !isReservationTypeSuccess ? selectNotFoundContent : undefined,
      loading: isReservationTypeLoading,
    },
    {
      label: "نوع زمان‌بندی",
      name: "pendingReviewScheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      loading: isSchedulingTypeLoading,
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع درخواست",
      name: "pendingReviewRequestType",
      mode: "multiple",
      type: "select",
      options: requestTypesData?.data || [],
      onClick: getRequestTypeHandler,
      loading: isRequestTypesDataLoading,
      notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "گروه کاربری",
      name: "pendingReviewUserGroup",
      mode: "multiple",
      type: "select",
      options: userGroupData?.data ? userGroupData?.data : [],
      loading: isUserGroupLoading,
      notFoundContent: !isUserGroupSuccess ? selectNotFoundContent : undefined,
      onClick: getUserGroupHandler,
    },
    {
      label: "مدت انتظار",
      name: "pendingReviewWaitingTime",
      type: "select",
      options: dormWaitingTimeOptions,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useRequestsPendingReviewAdvanceFilter;
