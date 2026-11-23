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
  useMyDoctorGetGroupsBySurveyIdQuery,
  useMyDoctorGetGroupsStatusQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { GeneticsParticipantsListAdvanceFilterFormType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/@types/@geneticsParticipantsList";

const useGeneticsParticipantsListAdvanceFilter = ({
  advanceModalOpen,
  form,
  selectedSurveyId,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<GeneticsParticipantsListAdvanceFilterFormType>;
  selectedSurveyId: string;
}) => {
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedCity = useWatch("city", form);
  const selectedAxis = useWatch("axis", form);

  //? ================================ Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  //branches
  const [getBranches, { data: branches, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchListByProvinceCityBusinessQuery();

  // axis
  const { data: axisData, isFetching: isGetAxisDataLoading } =
    useMyDoctorGetGroupsBySurveyIdQuery(
      { surveyId: selectedSurveyId },
      { skip: !advanceModalOpen }
    );

  // axis status
  const { data: axisStatusData, isFetching: isGetAxisStatusDataLoading } =
    useMyDoctorGetGroupsStatusQuery(
      {
        groupId: selectedAxis?.code?.toString(),
      },
      {
        skip: !selectedAxis?.code,
      }
    );

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }
    }
  }, [advanceModalOpen]);

  // branches
  useEffect(() => {
    if (advanceModalOpen) {
      getBranches({
        ...(selectedProvince && {
          provinceIds: selectedProvince?.map((value) => value?.code)?.join(","),
        }),
        ...(selectedCity && {
          cityIds: selectedCity?.map((value) => value?.code)?.join(","),
        }),
      });
    }
  }, [selectedProvince, selectedCity, advanceModalOpen]);

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

  // when city selected
  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  const axisOptions =
    axisData?.map((item) => ({
      id: item?.groupId,
      title: item?.title,
    })) ?? [];

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
    //todo[nima] remove when figma will update
    // {
    //   label: "مقطع تحصیلی",
    //   name: "degree",
    //   type: "input",
    // },
    // {
    //   label: "رشته تحصیلی",
    //   name: "field",
    //   type: "input",
    // },
    {
      label: "محور",
      name: "axis",
      type: "select",
      options: axisOptions,
      loading: isGetAxisDataLoading,
    },
    {
      label: "وضعیت محور",
      name: "axisStatus",
      type: "select",
      mode: "multiple",
      options: axisStatusData,
      loading: isGetAxisStatusDataLoading,
      disabled: !selectedAxis,
    },
    {
      label: "تاریخ شرکت در آزمون",
      name: "testDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useGeneticsParticipantsListAdvanceFilter;
