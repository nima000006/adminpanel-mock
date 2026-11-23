import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import {
  useLazyGetActiveBusinessListQuery,
  useLazyGetBranchListByProvinceCityBusinessQuery,
} from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyDormitoryTypesListQuery,
  useLazyGetQualityGradeListQuery,
  useLazyGetResidenceRequestTypeQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { useLazyGetResidenceDropDownListQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { RESIDENCE_TABS_TYPE } from "@pages/Dormitory/Residence/_shared/util";
import { AllResidenceWaitingListAdvanceFilterFormType } from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";

const useAllResidenceAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<AllResidenceWaitingListAdvanceFilterFormType>;
}) => {
  const { params } = useQueryParams();
  const isActiveTab = params?.status === RESIDENCE_TABS_TYPE.active;

  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);

  const selectedBusiness = useWatch("business", form);
  const selectedProvince = useWatch("province", form);
  const selectedResidenceType = useWatch("residenceType", form);

  //? ================================  Api Calls ================================
  // business
  const [
    getActiveBusinessData,
    {
      data: businessData,
      isLoading: isActiveBusinessDataLoading,
      isSuccess: isActiveBusinessSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { data: branchesData, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchListByProvinceCityBusinessQuery();

  // residence types
  const [
    getResidenceType,
    {
      data: residenceTypeData,
      isFetching: isGetResidenceTypeLoading,
      isSuccess: isGetResidenceTypeSuccess,
    },
  ] = useLazyDormitoryTypesListQuery();

  // request types
  const [
    getRequestType,
    {
      data: requestTypeData,
      isFetching: isGetRequestTypeLoading,
      isSuccess: isGetRequestTypeSuccess,
    },
  ] = useLazyGetResidenceRequestTypeQuery();

  // province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // city
  const [getCityData, { isLoading: isCityDataLoading, isSuccess: isCityDataSuccess }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // quality grades
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // residence drop down
  const [
    getResidenceDropDownList,
    { data: residenceDropDownListData, isFetching: isGetResidenceDropDownListLoading },
  ] = useLazyGetResidenceDropDownListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isAdvanceModalOpen) {
      // business
      if (params?.businessId) {
        getActiveBusinessData();
      }

      // request types
      if (params?.requestKindName) {
        getRequestTypeHandler();
      }

      // residence types
      if (params?.residenceTypeName) {
        getResidenceTypeHandler();
      }

      // residence drop down
      if (params?.residenceId) {
        getResidenceDropDownListHandler();
      }

      // province
      if (isActiveTab && params?.provinceId) {
        getProvinceHandler();
      }
    }
  }, [isAdvanceModalOpen]);

  // Restore city options after reload when province is already selected (active tab)
  useEffect(() => {
    if (!isAdvanceModalOpen || !isActiveTab) return;

    if (selectedProvince && selectedProvince.length > 0) {
      getCityData({
        ids: selectedProvince.map((value) => value?.code)?.join(","),
      })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setCityData(cityList);
        });
    } else if (params?.provinceId) {
      getCityData({ ids: params.provinceId })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setCityData(cityList);
        });
    } else {
      setCityData([]);
    }
  }, [isAdvanceModalOpen, selectedProvince, isActiveTab]);

  //* ================================ Util Functions ================================
  // business
  const getBusinessHandler = () => {
    if (!isActiveBusinessSuccess) {
      getActiveBusinessData();
    }
  };

  // when business selected
  const onBusinessChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  // branches
  const getBranchesHandler = () => {
    getBranchesData({
      ...(selectedBusiness && {
        businessIds: selectedBusiness?.map((value) => value?.code)?.join(","),
      }),
    });
  };

  // residence types
  const getResidenceTypeHandler = () => {
    if (!isGetResidenceTypeSuccess) {
      getResidenceType();
    }
  };

  // when residence type selected
  const onResidenceTypeChangeHandler = () => {
    form.setFieldsValue({ quality: undefined });
  };

  // request types
  const getRequestTypeHandler = () => {
    if (!isGetRequestTypeSuccess) {
      getRequestType();
    }
  };

  // province
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
        .unwrap()
        .then((value) => {
          const provinceList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });
          setProvinceData(provinceList);
        });
    }
  };

  // when province selected
  const onProvinceChangeHandler = (event: number[] | undefined) => {
    if (event?.length) {
      setCityData([]);
      getCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setCityData(cityList);
        });
    }
    form.setFieldsValue({ city: undefined });
  };

  // quality grades — like branches (onClick + current residence type)
  const getQualityGradeHandler = () => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      ...(selectedResidenceType && {
        accommodationType: selectedResidenceType
          ?.map((value) => value?.item?.name)
          ?.join(","),
      }),
    });
  };

  // residence drop down
  const getResidenceDropDownListHandler = () => {
    getResidenceDropDownList({
      pageNumber: 0,
      pageSize: 100,
    });
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    ...(isActiveTab
      ? ([
          {
            label: "استان",
            name: "province",
            type: "select",
            options: provinceData,
            loading: isProvinceDataLoading,
            mode: "multiple",
            onClick: getProvinceHandler,
            onChange: (value) => onProvinceChangeHandler(value as number[]),
            notFoundContent: !isProvinceSuccess ? selectNotFoundContent : undefined,
          },
          {
            label: "شهر",
            name: "city",
            type: "select",
            options: cityData,
            loading: isCityDataLoading,
            mode: "multiple",
            disabled: !selectedProvince?.length,
            notFoundContent: !isCityDataSuccess ? selectNotFoundContent : undefined,
          },
        ] as AdvanceFilterItemsListType[])
      : []),
    {
      label: "کسب و کار",
      name: "business",
      type: "select",
      mode: "multiple",
      loading: isActiveBusinessDataLoading,
      options: businessData ? businessData : [],
      onClick: getBusinessHandler,
      onChange: onBusinessChangeHandler,
    },
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchesData,
      loading: isBranchesDataLoading,
      onClick: getBranchesHandler,
    },
    {
      label: "اقامتگاه",
      name: "residence",
      type: "select",
      mode: "multiple",
      options:
        residenceDropDownListData?.content?.map((item) => ({
          id: item?.uuid as unknown as number,
          title: item?.title,
        })) ?? [],
      loading: isGetResidenceDropDownListLoading,
      onClick: getResidenceDropDownListHandler,
    },
    ...(isActiveTab
      ? ([
          {
            label: "وضعیت نمایش به کاربران",
            name: "viewStatusToUser",
            type: "select",
            options: [
              { title: "قابل نمایش", id: 1 },
              { title: "غیر قابل نمایش", id: 2 },
            ],
            mode: "multiple",
          },
        ] as AdvanceFilterItemsListType[])
      : []),
    {
      label: "نوع اقامتگاه",
      name: "residenceType",
      type: "select",
      mode: "multiple",
      options: residenceTypeData,
      loading: isGetResidenceTypeLoading,
      isNeedsName: true,
      onClick: getResidenceTypeHandler,
      onChange: onResidenceTypeChangeHandler,
    },
    ...(isActiveTab
      ? ([
          {
            label: "درجه کیفی",
            name: "quality",
            type: "select",
            options:
              qualityGradeData?.content?.map((item) => ({
                id: item.uuid as unknown as number,
                title: item.title,
              })) ?? [],
            loading: isGetQualityGradeListLoading,
            onClick: getQualityGradeHandler,
            mode: "multiple",
          },
        ] as AdvanceFilterItemsListType[])
      : []),

    ...(!isActiveTab
      ? ([
          {
            label: "نوع درخواست",
            name: "requestKind",
            type: "select",
            mode: "multiple",
            options: requestTypeData,
            loading: isGetRequestTypeLoading,
            isNeedsName: true,
            onClick: getRequestTypeHandler,
          },
        ] as AdvanceFilterItemsListType[])
      : []),
  ];

  return { filterItemsList };
};

export default useAllResidenceAdvanceFilter;
