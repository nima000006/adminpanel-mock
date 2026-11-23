import { useEffect, useState } from "react";

import { FormInstance, useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  useLazyGetAllSamimServiceQuery,
  useLazyGetInnerTopicBySamimServicesQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  GetAllSamimServiceResponse,
  GetAllTopicBySamimServicesResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import { InnerTicketSegmentNotAssignedFormType } from "../../../@types/@innerTicketSubmittedNotAssignedList";

const useMyInnerTicketSegmentNotAssignedTableModeAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<InnerTicketSegmentNotAssignedFormType>;
}) => {
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();

  const selectedServices = useWatch("services", form);

  //? ================================  Api Calls ================================
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
        serviceRequest: selectedServices?.map((value) => value?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  }, [selectedServices]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
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

  // when service selected
  const getTopicsByServiceHandler = (value: unknown) => {
    const selectedValues = Array.isArray(value) ? value : [];

    setTopics([]);
    form.setFieldsValue({ topicIds: undefined });

    if (selectedValues?.length > 0) {
      getInnerTopicBySamimServices({
        serviceRequest: selectedValues?.map((value) => value?.item?.name)?.join(","),
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
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};
export default useMyInnerTicketSegmentNotAssignedTableModeAdvanceFilter;
