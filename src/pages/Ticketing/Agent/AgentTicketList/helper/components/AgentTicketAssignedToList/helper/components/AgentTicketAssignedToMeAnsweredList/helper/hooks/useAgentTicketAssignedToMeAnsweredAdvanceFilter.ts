import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllSamimServiceQuery,
  useLazyGetAllTicketOriginQuery,
  useLazyGetAllTopicBySamimServicesQuery,
  useLazyGetPriorityQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  GetAllSamimServiceResponse,
  GetAllTicketOriginResponse,
  GetAllTopicBySamimServicesResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import { TicketingAgentAssignedToMeAnsweredAdvanceFilterFormType } from "../../@types/@agentTicketAssignedToMeAnsweredList";

const useAgentTicketAssignedToMeAnsweredAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<TicketingAgentAssignedToMeAnsweredAdvanceFilterFormType>;
}) => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [origin, setOrigin] = useState<GetAllTicketOriginResponse>();
  const [priority, setPriority] = useState<GetPriorityResponse>();

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

  // priority
  const [
    getPriority,
    { isFetching: isGetPriorityLoading, isSuccess: isGetPrioritySuccess },
  ] = useLazyGetPriorityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isAdvanceModalOpen) {
      // services
      if (params?.servicesId) {
        getAllSamimServiceHandler();
      }

      // priority
      if (params?.priorityName) {
        getPriorityHandler();
      }
    }
  }, [isAdvanceModalOpen]);

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

  // priority
  const getPriorityHandler = () => {
    if (!isGetPrioritySuccess) {
      getPriority()
        .unwrap()
        .then((res) => setPriority(res));
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
      label: "اولویت",
      name: "priority",
      type: "select",
      mode: "multiple",
      loading: isGetPriorityLoading,
      isNeedsName: true,
      onClick: getPriorityHandler,
      options: priority,
    },
    {
      label: "تاریخ ثبت تیکت",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useAgentTicketAssignedToMeAnsweredAdvanceFilter;
