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

import { TicketSubmittedRepliedAdvancedFilterFormType } from "../../../@types/@innerTicketSubmittedAnsweredList";

const useMyInnerTicketSubmittedAnsweredTableModeAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  form: FormInstance<TicketSubmittedRepliedAdvancedFilterFormType>;
  isAdvanceModalOpen: boolean;
}) => {
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const { params } = useQueryParams();

  const selectedServices = useWatch<
    TicketSubmittedRepliedAdvancedFilterFormType["services"]
  >("services", form);

  //? ================================ API ================================
  const [
    getInnerTopicBySamimServices,
    { isFetching: isGetInnerTopicBySamimServicesLoading },
  ] = useLazyGetInnerTopicBySamimServicesQuery();

  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

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
    setTopics([]);
    form.setFieldsValue({ topicIds: undefined });

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
      label: "تاریخ ثبت تیکت",
      name: "ticketDate",
      type: "range",
    },
  ];
  return { filterItemsList };
};
export default useMyInnerTicketSubmittedAnsweredTableModeAdvanceFilter;
