import { useEffect, useState } from "react";

import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchListByProvinceCityBusinessQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { GeneticsRequestsListFreeConsultationTableAdvanceFilterParams } from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListFreeConsultation/helper/components/GeneticsRequestsListFreeConsultationTable/@types/@geneticsRequestsListFreeConsultationTable";

const useGeneticsRequestsListFreeConsultationTableAdvanceFilter = ({
  advanceModalOpen,
  form,
}: GeneticsRequestsListFreeConsultationTableAdvanceFilterParams) => {
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);
  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedCity = useWatch("city", form);

  //? ================================ Api Calls ================================
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  const [getBranches, { data: branches, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchListByProvinceCityBusinessQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen && params?.provinceId) {
      getProvinceHandler();
    }
  }, [advanceModalOpen]);

  useEffect(() => {
    if (!advanceModalOpen) {
      return;
    }

    getBranches({
      ...(selectedProvince?.length && {
        provinceIds: selectedProvince.map((value) => value?.code)?.join(","),
      }),
      ...(selectedCity?.length && {
        cityIds: selectedCity.map((value) => value?.code)?.join(","),
      }),
    });
  }, [selectedProvince, selectedCity, advanceModalOpen, getBranches]);

  //* ================================ Util Functions ================================
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
        .unwrap()
        .then((value) => {
          const provinceList = value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          }));
          setProvinceData(provinceList);
        });
    }
  };

  const onProvinceChangeHandler = (event: number[] | undefined) => {
    if (event?.length) {
      setCityData([]);
      getCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then((value) => {
          const cityList = value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          }));

          setCityData(cityList);
        });
    }
    form.setFieldsValue({ city: undefined, branch: undefined });
  };

  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "province",
      type: "select",
      options: provinceData,
      loading: isProvinceDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onProvinceChangeHandler(value as number[]),
      notFoundContent: selectNotFoundContent,
    },
    {
      label: "شهر",
      name: "city",
      type: "select",
      options: cityData,
      loading: isCityDataLoading,
      mode: "multiple",
      disabled: selectedProvince?.length > 0 ? false : true,
      notFoundContent: selectNotFoundContent,
      onChange: onCityChangeHandler,
    },
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      loading: isBranchesDataLoading,
      options: branches,
    },
    //todo[nima] implement waitingDay options when api will be implemented
    // {
    //   label: "روز شمار",
    //   name: "waitingDay",
    //   type: "select",
    // },
    {
      label: "تاریخ درخواست",
      name: "createDate",
      type: "range",
    },
    {
      label: "تاریخ شرکت در آزمون",
      name: "participantDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useGeneticsRequestsListFreeConsultationTableAdvanceFilter;
