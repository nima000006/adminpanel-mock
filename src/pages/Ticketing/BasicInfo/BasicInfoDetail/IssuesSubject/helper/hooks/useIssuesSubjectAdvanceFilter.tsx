import { useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  useLazyGetAllSamimServiceQuery,
  useLazyGetPriorityQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  GetAllSamimServiceResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

const useIssuesSubjectAdvanceFilter = () => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [priority, setPriority] = useState<GetPriorityResponse>();

  //? ================================  Api Calls ================================
  // priority
  const [
    getPriority,
    { isFetching: isGetPriorityLoading, isSuccess: isGetPrioritySuccess },
  ] = useLazyGetPriorityQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  //* ================================ Util Functions ================================
  // priority
  const getPriorityHandler = () => {
    if (!isGetPrioritySuccess) {
      getPriority()
        .unwrap()
        .then((res) => setPriority(res));
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

  const filterItemsList: AdvanceFilterItemsListType[] = [
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
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      loading: isGetAllSamimServiceLoading,
      options: services,
      isNeedsName: true,
      onClick: getAllSamimServiceHandler,
    },
    {
      label: "وضعیت نمایش",
      name: "displayStatus",
      type: "select",
      options: [
        {
          id: 1,
          title: "قابل نمایش",
        },
        {
          id: 2,
          title: "غیرقابل نمایش",
        },
      ],
    },
  ];

  return { filterItemsList };
};

export default useIssuesSubjectAdvanceFilter;
