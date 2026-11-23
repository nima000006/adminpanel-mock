import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetRefundRequestCountQuery } from "@infra/states/redux/Apis/finance/requestsApi";

import { REQUEST_DEMAND_IDS } from "../../_shared/utils";
import ReturnMonyAllList from "./helper/components/ReturnMonyAllList/ReturnMonyAllList";
import ReturnMonyConfirmList from "./helper/components/ReturnMonyConfirmList/ReturnMonyConfirmList/ReturnMonyConfirmList";
import ReturnMonyPendingList from "./helper/components/ReturnMonyPendingList/ReturnMonyPendingList";
import ReturnMonyRejectList from "./helper/components/ReturnMonyRejectList/ReturnMonyRejectList";
import "./_returnMoneyList.scss";

const ReturnMoneyList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  // const [form] = Form.useForm();

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      {
        title: "درخواست‌ها",
      },
      {
        title: "عودت وجه",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const { data: countData, isFetching: isCountLoading } = useGetRefundRequestCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: REQUEST_DEMAND_IDS.pending });
    }
  }, [url?.status, setSearchParams]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isCountLoading} className="finance-return-money-list-container">
      <div className="demand-wrapper">
        <DemandCard
          title="در انتظار بررسی"
          active={url?.status == REQUEST_DEMAND_IDS.pending}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.pending)}
          badgeColor="transparent"
          className={
            url?.status === REQUEST_DEMAND_IDS.pending
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badge={false}
          badgeTitle={
            countData?.requested !== undefined && countData?.requested !== null
              ? `(${countData.requested})`
              : "-"
          }
        />
        <DemandCard
          title="تایید شده"
          active={url?.status === REQUEST_DEMAND_IDS.confirm}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.confirm)}
          badge={false}
          badgeColor="transparent"
          className={
            url?.status === REQUEST_DEMAND_IDS.confirm
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badgeTitle={
            countData?.approved !== undefined && countData?.approved !== null
              ? `(${countData.approved})`
              : "-"
          }
        />
        <DemandCard
          title="رد شده"
          active={url?.status === REQUEST_DEMAND_IDS.rejected}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.rejected)}
          badge={false}
          badgeColor="transparent"
          className={
            url?.status === REQUEST_DEMAND_IDS.rejected
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badgeTitle={
            countData?.rejected !== undefined && countData?.rejected !== null
              ? `(${countData.rejected})`
              : "-"
          }
        />

        <DemandCard
          title="همه"
          active={url?.status === REQUEST_DEMAND_IDS.all}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.all)}
          badge={false}
          badgeColor="transparent"
          className={
            url?.status === REQUEST_DEMAND_IDS.all ? "text-primary-6" : "text-neutral-7"
          }
          badgeTitle={
            countData?.requested !== undefined && countData?.requested !== null
              ? `(${countData.requested})`
              : "-"
          }
        />
      </div>
      {url?.status === REQUEST_DEMAND_IDS.pending ? (
        <ReturnMonyPendingList />
      ) : url?.status === REQUEST_DEMAND_IDS.confirm ? (
        <ReturnMonyConfirmList />
      ) : url?.status === REQUEST_DEMAND_IDS.rejected ? (
        <ReturnMonyRejectList />
      ) : url?.status === REQUEST_DEMAND_IDS.all ? (
        <ReturnMonyAllList />
      ) : null}
    </Div>
  );
};
export default ReturnMoneyList;
