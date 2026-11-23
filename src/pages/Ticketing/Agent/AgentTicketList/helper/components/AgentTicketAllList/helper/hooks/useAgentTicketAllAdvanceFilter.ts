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
  useLazyTicketStatusQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  GetAllSamimServiceResponse,
  GetAllTicketOriginResponse,
  GetAllTopicBySamimServicesResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import { InnerTicketStatusResponse } from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedAllList/@types/@innerTicketSubmittedAllList";

import { AgentTicketAllAdvanceFilterFormType } from "../../@types/@agentTicketAllTypes";

const useAgentTicketAllAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  form: FormInstance<AgentTicketAllAdvanceFilterFormType>;
  isAdvanceModalOpen: boolean;
}) => {
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [ticketOrigin, setTicketOrigin] = useState<GetAllTicketOriginResponse>();
  const [statuses, setStatuses] = useState<InnerTicketStatusResponse>();
  const [priority, setPriority] = useState<GetPriorityResponse>();

  const { params } = useQueryParams();

  const selectedServices = useWatch("services", form);

  //? ================================ API ================================
  // topics
  const [
    getAllTopicBySamimServices,
    { isFetching: isGetAllTopicBySamimServicesLoading },
  ] = useLazyGetAllTopicBySamimServicesQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  // ticket type
  const [
    getAllTicketOrigin,
    { isFetching: isGetAllTicketOriginLoading, isSuccess: isGetAllTicketOriginSuccess },
  ] = useLazyGetAllTicketOriginQuery();

  // priority
  const [
    getPriority,
    { isFetching: isGetPriorityLoading, isSuccess: isGetPrioritySuccess },
  ] = useLazyGetPriorityQuery();

  // status
  const [getStatus, { isFetching: isGetStatusLoading, isSuccess: isGetStatusSuccess }] =
    useLazyTicketStatusQuery();

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

      // status
      if (params?.ticketStatusName) {
        getStatusesHandler();
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
    const selectedIds = Array.isArray(value) ? value : [];
    setTopics([]);
    form.setFieldsValue({ topicIds: undefined });

    if (selectedIds?.length > 0) {
      getAllTopicBySamimServices({
        serviceRequest: selectedIds?.map((val) => val?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  };

  // ticket type
  const getAllTicketOriginHandler = () => {
    if (!isGetAllTicketOriginSuccess) {
      getAllTicketOrigin()
        .unwrap()
        .then((res) => setTicketOrigin(res));
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

  // ticket status
  const getStatusesHandler = () => {
    if (!isGetStatusSuccess) {
      getStatus()
        .unwrap()
        .then((res) => setStatuses(res));
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
      isNeedsName: true,
      loading: isGetAllTicketOriginLoading,
      onClick: getAllTicketOriginHandler,
      options: ticketOrigin,
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
      label: "وضعیت تیکت",
      name: "ticketStatus",
      type: "select",
      mode: "multiple",
      options: statuses,
      onClick: getStatusesHandler,
      loading: isGetStatusLoading,
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

export default useAgentTicketAllAdvanceFilter;
