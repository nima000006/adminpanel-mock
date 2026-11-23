import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoCityBasedMultipleProvinceQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { ListLabsAdvanceFilterFormType } from "@pages/MyDoctor/Genetics/Labs/LabsList/@types/@labsList";

const useLabsListTableModeAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<ListLabsAdvanceFilterFormType>;
}) => {
  const { params } = useQueryParams();

  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);

  const selectedProvince = useWatch("province", form);

  //? ================================ Api Calls ================================
  // get province and city
  const [
    getProvinceAndCityData,
    { isFetching: isProvinceAndCityDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (isAdvanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }
    }
  }, [isAdvanceModalOpen]);

  // city
  useEffect(() => {
    if (selectedProvince?.length > 0) {
      getProvinceAndCityData({
        ids: selectedProvince?.map((value: any) => value?.code)?.join(","),
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
    }
  }, [selectedProvince]);

  //* ================================ Util Functions ================================
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceAndCityData({ ids: "103" }) // 103 Iran code
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
      getProvinceAndCityData({ ids: event?.map((value) => value)?.join(",") })
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
    form?.setFieldsValue({ city: undefined });
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان (ذینفع)",
      name: "province",
      type: "select",
      options: provinceData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onProvinceChangeHandler(value as number[]),
    },
    {
      label: "شهر (ذینفع)",
      name: "city",
      type: "select",
      options: cityData,
      loading: isProvinceAndCityDataLoading,
      mode: "multiple",
      disabled: selectedProvince?.length > 0 ? false : true,
    },
    {
      label: "وضعیت ",
      name: "status",
      type: "select",
      options: [
        { id: 1, title: "فعال" },
        { id: 2, title: "غیرفعال" },
      ],
    },
    {
      label: "تاریخ ایجاد",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useLabsListTableModeAdvanceFilter;
