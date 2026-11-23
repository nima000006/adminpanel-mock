import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormQualityTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetResidenceTypeQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";
import { dormRecordsStatus } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import { UseResidenceAdvanceFilterFormType } from "../../../@types/residenceDormListTypes";

const useResidenceAdvanceFilter = (
  form: FormInstance<UseResidenceAdvanceFilterFormType>
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

  //جنسیت خوابگاه
  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  //درجه کیفی
  const [
    getQualityTypes,
    { data: qualityData, isFetching: isQualityDataLoading, isSuccess: isQualitySuccess },
  ] = useLazyGetDormQualityTypesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.residenceProvinceId) {
      onProvinceChangeHandler(params?.residenceProvinceId);
    }
  }, [params?.residenceProvinceId]);

  useEffect(() => {
    if (params?.residenceProvinceId) getProvinceHandler();

    if (params?.residenceResidenceTypeId) getResidenceTypeHandler();

    if (params?.residenceGenderId) getGenderHandler();

    if (params?.residenceQualityId) getQualityHandler();
  }, [
    params?.residenceProvinceId,
    params?.residenceResidenceTypeId,
    params?.residenceGenderId,
    params?.residenceQualityId,
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
    form.setFieldsValue({
      residenceCity: [],
    });
  };

  //نوع اقامتگاه
  const getResidenceTypeHandler = () =>
    fetchDataIfNeeded(
      !isResidenceTypeSuccess,
      () =>
        getResidenceType({ firstResult: 0, maxResults: 2000, showInActiveData: false }) //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
    );

  // درجه کیفی
  const getQualityHandler = () => {
    if (!isQualitySuccess) {
      getQualityTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
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
      name: "residenceProvince",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "residenceCity",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.residenceProvince?.length > 0 ? false : true,
    },
    {
      label: "شعبه / واحد",
      name: "residenceBranch",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      notFoundContent: !isUniversityDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "نوع اقامتگاه",
      name: "residenceResidenceType",
      mode: "multiple",
      type: "select",
      options: residenceTypeData?.data || [],
      loading: isResidenceTypeLoading,
      onClick: getResidenceTypeHandler,
      notFoundContent: !isResidenceTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "جنسیت خوابگاه",
      name: "residenceGender",
      type: "select",
      options: genderData?.data || [],
      loading: isGenderDataLoading,
      onClick: getGenderHandler,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "درجه کیفی",
      name: "residenceQuality",
      mode: "multiple",
      type: "select",
      options: qualityData?.data || [],
      loading: isQualityDataLoading,
      onClick: getQualityHandler,
      notFoundContent: !isQualitySuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "وضعیت نمایش",
      name: "residenceRecordStatus",
      mode: "multiple",
      type: "select",
      options: dormRecordsStatus,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useResidenceAdvanceFilter;
