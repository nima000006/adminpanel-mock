import { useEffect, useState } from "react";

import { FormInstance, useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
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
import { closeTypesOptions } from "@pages/Ticketing/_shared/utils/utils";

import { AgentTicketClosedAdvanceFilterFormType } from "../../@types/@agentTicketClosedTypes";

const useAgentTicketClosedAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<AgentTicketClosedAdvanceFilterFormType>;
}) => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [origin, setOrigin] = useState<GetAllTicketOriginResponse>();
  const { params } = useQueryParams();

  const selectedServices = useWatch("services", form);

  //? ================================  Api Calls ================================
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

  useEffect(() => {
    if (isAdvanceModalOpen && params?.servicesId) {
      getAllSamimServiceHandler();
    }
  }, [isAdvanceModalOpen]);

  //* ================================ Util Functions ================================
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
      label: "رضایت کاربر",
      name: "rate",
      type: "select",
      mode: "multiple",
      options: [
        { id: 1, title: "1 از 5" },
        { id: 2, title: "2 از 5" },
        { id: 3, title: "3 از 5" },
        { id: 4, title: "4 از 5" },
        { id: 5, title: "5 از 5" },
      ],
    },
    {
      label: "تاریخ ثبت تیکت",
      name: "date",
      type: "range",
    },
    {
      label: "وضعیت تیکت",
      name: "ticketStatus",
      type: "select",
      mode: "multiple",
      options: closeTypesOptions,
      isNeedsName: true,
    },
  ];

  return { filterItemsList };
};

export default useAgentTicketClosedAdvanceFilter;
