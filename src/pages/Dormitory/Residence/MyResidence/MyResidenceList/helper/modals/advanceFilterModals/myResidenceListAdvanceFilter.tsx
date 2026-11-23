import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchListByProvinceCityBusinessQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyDormitoryTypesListQuery,
  useLazyGetQualityGradeListQuery,
  useLazyGetResidenceRequestTypeQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { useLazyGetMyResidenceDropDownListQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { RESIDENCE_TABS_TYPE } from "@pages/Dormitory/Residence/_shared/util";
import { MyResidenceListAdvanceFilterFormType } from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";

const useMyResidenceListAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<MyResidenceListAdvanceFilterFormType>;
}) => {
  const { params } = useQueryParams();
  const isActiveTab = params?.status === RESIDENCE_TABS_TYPE.active;

  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);

  const selectedProvince = useWatch("province", form);
  const selectedResidenceType = useWatch("residenceType", form);

  //? ================================  Api Calls ================================
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
    getMyResidenceDropDownList,
    {
      data: myResidenceDropDownListData,
      isFetching: isGetMyResidenceDropDownListLoading,
    },
  ] = useLazyGetMyResidenceDropDownListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isAdvanceModalOpen) {
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
        getMyResidenceDropDownListHandler();
      }

      // province
      if (isActiveTab && params?.provinceId) {
        getProvinceHandler();
      }

      // branches
      if (params?.branchId) {
        getBranchesHandler();
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
  // branches
  const getBranchesHandler = () => {
    getBranchesData({});
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

  // quality grades
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
  const getMyResidenceDropDownListHandler = () => {
    getMyResidenceDropDownList({
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
        myResidenceDropDownListData?.content?.map((item) => ({
          id: item?.uuid as unknown as number,
          title: item?.title,
        })) ?? [],
      loading: isGetMyResidenceDropDownListLoading,
      onClick: getMyResidenceDropDownListHandler,
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
      : ([
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
        ] as AdvanceFilterItemsListType[])),
  ];

  return { filterItemsList };
};

export default useMyResidenceListAdvanceFilter;
