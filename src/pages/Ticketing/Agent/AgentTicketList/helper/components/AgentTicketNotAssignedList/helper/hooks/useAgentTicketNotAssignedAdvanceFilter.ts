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
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAllSamimServiceResponse,
  GetAllTicketOriginResponse,
  GetAllTopicBySamimServicesResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import { AgentTicketNotAssignedAdvanceFilterFormType } from "../../@types/@agentTicketNotAssignedTypes";

const useAgentTicketNotAssignedAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  form: FormInstance<AgentTicketNotAssignedAdvanceFilterFormType>;
  isAdvanceModalOpen: boolean;
}) => {
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [Priority, setPriority] = useState<GetPriorityResponse>();
  const [origin, setOrigin] = useState<GetAllTicketOriginResponse>();

  const { params } = useQueryParams();

  const selectedServices = useWatch<
    AgentTicketNotAssignedAdvanceFilterFormType["services"]
  >("services", form);

  //? ================================ API ================================
  const [
    getAllTopicBySamimServices,
    { isFetching: isGetAllTopicBySamimServicesLoading },
  ] = useLazyGetAllTopicBySamimServicesQuery();

  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  const [
    getPriority,
    { isFetching: isGetPriorityLoading, isSuccess: isGetPrioritySuccess },
  ] = useLazyGetPriorityQuery();

  const [getOrigin, { isFetching: isGetOriginLoading, isSuccess: isGetOriginSuccess }] =
    useLazyGetAllTicketOriginQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (selectedServices?.length > 0) {
      getAllTopicBySamimServices({
        serviceRequest: selectedServices
          ?.map((value: SelectType<IdTitleName>) => value?.item?.name)
          ?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  }, [selectedServices]);

  useEffect(() => {
    if (isAdvanceModalOpen && params?.servicesId) {
      getAllSamimServiceHandler();
    }
  }, [isAdvanceModalOpen]);

  //* ================================ Util Functions ================================

  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // وقتی سرویس انتخاب شد
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

  const getPriorityHandler = () => {
    if (!isGetPrioritySuccess) {
      getPriority()
        .unwrap()
        .then((res) => setPriority(res));
    }
  };

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
      label: "اولویت",
      name: "priority",
      type: "select",
      mode: "multiple",
      loading: isGetPriorityLoading,
      isNeedsName: true,
      onClick: getPriorityHandler,
      options: Priority,
    },
    {
      label: "مدت انتظار",
      name: "waitingTime",
      type: "select",
      options: [
        { id: 1, title: "کمتر از یک روز " },
        { id: 2, title: "1 تا 3 روز" },
        { id: 3, title: "بیش از 3 روز" },
      ],
    },
    {
      label: "تاریخ ثبت تیکت",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useAgentTicketNotAssignedAdvanceFilter;
