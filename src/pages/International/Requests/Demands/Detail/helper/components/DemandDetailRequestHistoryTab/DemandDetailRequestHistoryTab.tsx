import { useEffect } from "react";

import { Steps } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDemandDetailRequestsHistoryQuery } from "@infra/states/redux/Apis/international/request/requestApi";

import { GetDemandDetailRequestsHistoryResponse } from "../../../@types/@demandDetail";

// step item
const stepItem = (data: GetDemandDetailRequestsHistoryResponse | undefined) => {
  if (!data) return [];
  return [
    {
      title: "اصلاح موارد خواسته شده توسط متقاضی",
      description: (
        <div className="step-item-description-container">
          <div>
            <span>{}</span>
          </div>
        </div>
      ),
      icon: <AiOutlineClockCircle className="clock-icon" />,
    },
    {
      title: "In Progress",
      description: "This is a description.",
      icon: <AiOutlineClockCircle className="clock-icon" />,
    },
    {
      title: "شروع درخواست",
      description: (
        <div className="step-item-description-container">
          <div>
            <span>درخواست دهنده: </span>
            <span>{data?.requested}</span>
          </div>
          <div>
            <span>تاریخ: </span>
            <span>
              {dataPlaceHolder({
                data: data?.requestDate,
                isDate: true,
                customDateFormat: "YYYY/MM/DD",
              })}
            </span>
          </div>
          <div>
            <span>زمان: </span>
            <span>
              {dataPlaceHolder({
                data: data?.requestDate,
                isDate: true,
                customDateFormat: "HH:mm",
              })}
            </span>
          </div>
        </div>
      ),
      icon: <AiOutlineClockCircle className="clock-icon" />,
    },
  ];
};

const DemandDetailRequestHistoryTab = () => {
  const { params } = useQueryParams();
  //? ================================  Api Calls ================================
  const [getData, { data, isLoading: isDataLoading }] =
    useLazyGetDemandDetailRequestsHistoryQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.id) {
      getData(params?.id);
    }
  }, [params?.id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isDataLoading}>
      <Steps
        orientation="vertical"
        size="small"
        items={stepItem(data)}
        className="international-demand-request-history-page-container"
      />
    </Div>
  );
};

export default DemandDetailRequestHistoryTab;
