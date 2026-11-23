import { useEffect, useState } from "react";

import { FormInstance, useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllSamimServiceQuery,
  useLazyGetInnerTopicBySamimServicesQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAllSamimServiceResponse,
  GetAllTopicBySamimServicesResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import { closeTypesOptions } from "@pages/Ticketing/_shared/utils/utils";

import { InnerTicketSendingClosedListAndAdvanceFilterFormType } from "../../../@types/@innerTicketSubmittedClosedTypes";

const useAllInnerTicketSubmittedClosedAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  form: FormInstance<InnerTicketSendingClosedListAndAdvanceFilterFormType>;
  isAdvanceModalOpen: boolean;
}) => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const { params } = useQueryParams();

  const selectedServices = useWatch("services", form);
  //? ================================ API ================================
  // service
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  // topic
  const [
    getInnerTopicBySamimServices,
    { isFetching: isGetInnerTopicBySamimServicesLoading },
  ] = useLazyGetInnerTopicBySamimServicesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (selectedServices?.length > 0) {
      getInnerTopicBySamimServices({
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
    if (!selectedIds.length) {
      setTopics([]);
      form.setFieldsValue({ topicIds: undefined });
    }

    if (selectedIds?.length > 0) {
      getInnerTopicBySamimServices({
        serviceRequest: selectedIds?.map((val) => val?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
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
      loading: isGetInnerTopicBySamimServicesLoading,
      options: topics,
      disabled: selectedServices?.length > 0 ? false : true,
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
      label: "وضعیت تیکت",
      name: "closeType",
      type: "select",
      mode: "multiple",
      options: closeTypesOptions,
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
export default useAllInnerTicketSubmittedClosedAdvanceFilter;
