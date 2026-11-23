import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_GENDER_TYPES,
  CATERING_GENDER_TYPES_LABELS,
} from "@pages/Catering/_shared/utils";
import { CateringSelfListAdvanceFilterFormType } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

const GENDER_OPTIONS: IdTitle[] = [
  {
    id: CATERING_GENDER_TYPES.MALE,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.MALE],
  },
  {
    id: CATERING_GENDER_TYPES.FEMALE,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.FEMALE],
  },
  {
    id: CATERING_GENDER_TYPES.UNISEX,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.UNISEX],
  },
];

const useCateringSelfListAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<CateringSelfListAdvanceFilterFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);

  //? ================================ Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading, isSuccess: isCityDataSuccess }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // branches
  const [
    getAllBranches,
    { data: branchData, isLoading: isBranchesDataLoading, isSuccess: isBranchesSuccess },
  ] = useLazyGetBranchByBusinessQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }

      // branch
      if (params?.branchId) {
        getBranchesHandler();
      }
    }
  }, [advanceModalOpen]);

  // Restore city options after reload when province is already selected
  useEffect(() => {
    if (!advanceModalOpen) return;

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
  }, [advanceModalOpen, selectedProvince]);

  //* ================================ Util Functions ================================

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

  const getBranchesHandler = () => {
    if (!isBranchesSuccess) {
      getAllBranches({ businessIds: [4] }); //cto told
    }
  };

  // ================================ Filter Items ================================

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      options: branchData ? branchData : [],
      loading: isBranchesDataLoading,
      onClick: getBranchesHandler,
      notFoundContent: !isBranchesSuccess ? selectNotFoundContent : undefined,
    },
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
    {
      label: "جنسیت",
      name: "gender",
      type: "select",
      options: GENDER_OPTIONS,
    },
  ];

  return { filterItemsList };
};

export default useCateringSelfListAdvanceFilter;
