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
  useLazyGetAllSamimServiceQuery,
  useLazyGetAllTicketOriginQuery,
  useLazyGetAllTopicBySamimServicesQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  GetAllSamimServiceResponse,
  GetAllTicketOriginResponse,
  GetAllTopicBySamimServicesResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import { SuperAgentAssignedTicketStatus } from "../../../../utils";
import { SuperAgentAssignedAdvanceFilterFormType } from "../../@types/@SuperAgentAssignedToListTypes";

const useSuperAgentAssignedToAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<SuperAgentAssignedAdvanceFilterFormType>;
}) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [origin, setOrigin] = useState<GetAllTicketOriginResponse>();

  const { params } = useQueryParams();

  const selectedProvince = useWatch("province", form);
  const selectedCity = useWatch("city", form);
  const selectedBusiness = useWatch("business", form);
  const selectedServices = useWatch("services", form);
  //? ================================  Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

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

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  // topics
  const [
    getAllTopicBySamimServices,
    { isFetching: isGetAllTopicBySamimServicesLoading },
  ] = useLazyGetAllTopicBySamimServicesQuery();

  // ticket type
  const [getOrigin, { isFetching: isGetOriginLoading, isSuccess: isGetOriginSuccess }] =
    useLazyGetAllTicketOriginQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isAdvanceModalOpen) {
      // province
      if (params?.provinceId) {
        getProvinceHandler();
      }

      // business
      if (params?.businessId) {
        getActiveBusinessData();
      }

      // services
      if (params?.servicesId) {
        getAllSamimServiceHandler();
      }
    }
  }, [isAdvanceModalOpen]);

  // city
  useEffect(() => {
    if (selectedProvince?.length > 0) {
      getCityData({ ids: selectedProvince?.map((value) => value?.code)?.join(",") })
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

  // branches
  useEffect(() => {
    if (isAdvanceModalOpen) {
      getBranchesData({
        ...(selectedProvince && {
          provinceIds: selectedProvince?.map((value) => value?.code)?.join(","),
        }),
        ...(selectedCity && {
          cityIds: selectedCity?.map((value) => value?.code)?.join(","),
        }),
        ...(selectedBusiness && {
          businessIds: selectedBusiness?.map((value) => value?.code)?.join(","),
        }),
      });
    }
  }, [selectedProvince, selectedCity, selectedBusiness, isAdvanceModalOpen]);

  // topic
  useEffect(() => {
    if (selectedServices?.length > 0) {
      getAllTopicBySamimServices({
        serviceRequest: selectedServices?.map((value) => value?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  }, [selectedServices]);

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
    form.setFieldsValue({ city: undefined, branch: undefined });
  };

  //  business
  const getBusinessHandler = () => {
    if (!isActiveBusinessSuccess) {
      getActiveBusinessData();
    }
  };

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // when service selected
  const getTopicsByServiceHandler = (value: unknown) => {
    const selectedValues = Array.isArray(value) ? value : [];

    setTopics([]);
    form.setFieldsValue({ topicIds: undefined });

    if (selectedValues?.length > 0) {
      getAllTopicBySamimServices({
        serviceRequest: selectedValues?.map((value) => value?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  };

  // when city selected
  const onCityChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  // when business selected
  const onBusinessChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  // ticket type
  const getOriginHandler = () => {
    if (!isGetOriginSuccess) {
      getOrigin()
        .unwrap()
        .then((res) => setOrigin(res));
    }
  };

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
    },
    {
      label: "شهر",
      name: "city",
      type: "select",
      options: cityData,
      loading: isCityDataLoading,
      mode: "multiple",
      disabled: selectedProvince?.length > 0 ? false : true,
      onChange: onCityChangeHandler,
    },
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
    },
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      loading: isGetAllSamimServiceLoading,
      options: services,
      isNeedsName: true,
      onClick: getAllSamimServiceHandler,
      onChange: (_, value) => getTopicsByServiceHandler(value),
    },
    {
      label: "موضوع",
      name: "topicIds",
      type: "select",
      mode: "multiple",
      loading: isGetAllTopicBySamimServicesLoading,
      options: topics,
      disabled: selectedServices?.length > 0 ? false : true,
    },
    {
      label: "نوع تیکت",
      name: "origin",
      type: "select",
      loading: isGetOriginLoading,
      isNeedsName: true,
      onClick: getOriginHandler,
      options: origin,
    },
    {
      label: "وضعیت تیکت",
      name: "ticketStatus",
      type: "select",
      mode: "multiple",
      options: SuperAgentAssignedTicketStatus,
      isNeedsName: true,
    },
    {
      label: "تاریخ ثبت تیکت",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useSuperAgentAssignedToAdvanceFilter;
