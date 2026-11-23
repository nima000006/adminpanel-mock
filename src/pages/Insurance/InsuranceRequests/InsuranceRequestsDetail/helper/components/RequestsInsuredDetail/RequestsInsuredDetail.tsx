import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import Div from "@components/Renderers/Div/Div";
import { Tab } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetInsuredRoleListQuery } from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import { GetInsuredRoleListResponse } from "./@types/requestsInsuredDetail";
import RequestInsuranceDetailChild from "./Utils/RequestInsuranceDetailChild/RequestInsuranceDetailChild";
import RequestInsuranceDetailMain from "./Utils/RequestInsuranceDetailMain/RequestInsuranceDetailMain";
import RequestInsuranceDetailPartner from "./Utils/RequestInsuranceDetailPartner/RequestInsuranceDetailPartner";
import "./_requestInsuredDetail.scss";

const RequestsInsuredDetail = () => {
  const [tabs, setTabs] = useState<Tab[] | []>([]);

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getInsuredRoleList, { isFetching: insuredRoleListLoading }] =
    useLazyGetInsuredRoleListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getInsuredRoleList(id).unwrap().then(getInsuredRoleListOnSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================
  const getInsuredRoleListOnSuccess = async (value: GetInsuredRoleListResponse) => {
    if (value?.status === 200) {
      const tabsGenerator = value?.data?.map((tab) => {
        if (tab.role === "MAIN") {
          return {
            key: `${tab?.id}`,
            role: tab?.role,
            label: tab?.label,
            children: <RequestInsuranceDetailMain id={tab?.id} />,
          };
        } else if (tab.role === "SPOUSE") {
          return {
            key: `${tab?.id}`,
            role: tab?.role,
            label: tab?.label,
            children: <RequestInsuranceDetailPartner id={tab?.id} />,
          };
        } else {
          return {
            key: `${tab?.id}`,
            role: tab?.role,
            label: tab?.label,
            children: <RequestInsuranceDetailChild id={tab?.id} />,
          };
        }
      });
      if (tabsGenerator) {
        setTabs(tabsGenerator);
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={insuredRoleListLoading}>
      <Tabs items={tabs} type="card" className="request-insurance-detail-container" />
    </Div>
  );
};

export default RequestsInsuredDetail;
